import React, { useEffect, useState, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMap = ({ width, height, google, onsetLocation, onChangeAddress, value, setDefult = true, inputclass, isreadOnly = false, className, fullscreenControl = true }) => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [cameraPosition, setCameraPosition] = useState({ lat: 30.0444, lng: 31.2357 }); // Tahrir Square, Cairo
    const [address, setAddress] = useState('');
    const inputRef = useRef(null);
    const markerIcon = "/assets/imgs/theme/googlemarker.svg"
    const containerStyles = {
        width: width || '1000px',
        height: height || '370px',
    };

    const mapStyles = [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        },
    ];

    const mapOptions = {
        disableDefaultUI: false, // Disables all default UI
        zoomControl: false, // Disables zoom control
        mapTypeControl: false, // Disables map type control
        scaleControl: false, // Disables scale control
        streetViewControl: false, // Disables Street View Pegman
        rotateControl: false, // Disables rotate control
        fullscreenControl: fullscreenControl, // Disables fullscreen control
        styles: mapStyles
    };

    useEffect(() => {
        if (value?.lat) {
            setMarkerPosition({ lat: value.lat, lng: value.lng });
        } else if (!isreadOnly) {
            if (setDefult) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        setMarkerPosition(userLocation);
                        if (onsetLocation) {
                            onsetLocation(userLocation);
                        }
                    },
                    () => { }
                );
            }
        }
    }, [value?.lat, setDefult, isreadOnly]);

    useEffect(() => {
        if (markerPosition) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: markerPosition }, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;
                        const shortAddress = addressComponents
                            .filter(component =>
                                component.types.includes("administrative_area_level_1") ||
                                component.types.includes("administrative_area_level_2") ||
                                component.types.includes("locality") ||
                                component.types.includes("street_address") ||
                                component.types.includes("route") ||
                                component.types.includes("premise") ||
                                component.types.includes("subpremise")
                            )
                            .map(component => component.short_name)
                            .join(', ')
                            .replace("Governorate", "");

                        setAddress(shortAddress);
                        if (onChangeAddress) {
                            onChangeAddress({
                                target: {
                                    name: 'address',
                                    value: shortAddress,
                                },
                            });
                        }
                    } else {
                        setAddress('No address found');
                    }
                } else {
                    setAddress('Geocoder failed due to: ' + status);
                }
            });
        }

    }, [markerPosition?.lat, google]);

    useEffect(() => {
        if (!isreadOnly) {
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
                types: ['address'],
            });
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const newLocation = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    };
                    setMarkerPosition(newLocation);
                    setCameraPosition(newLocation);
                    if (onsetLocation) {
                        onsetLocation(newLocation);
                    }
                    if (place.formatted_address) {
                        const addressComponents = place.address_components;
                        const shortAddress = addressComponents
                            .filter(component => component.types.includes(""))
                            .map(component => component.short_name)
                            .join(', ');
                        setAddress(shortAddress);
                        if (onChangeAddress) {
                            onChangeAddress({
                                target: {
                                    name: 'address',
                                    value: shortAddress,
                                },
                            });
                        }
                    }
                }
            });
        }
    }, [google, onsetLocation, onChangeAddress, isreadOnly]);

    const onMapClicked = (mapProps, map, clickEvent) => {
        if (!isreadOnly) {
            const lat = clickEvent.latLng.lat();
            const lng = clickEvent.latLng.lng();

            const newLocation = { lat, lng };
            setMarkerPosition(newLocation);
            if (onsetLocation) {
                onsetLocation(newLocation);
            }
        }
    };

    return (
        <>
            <input
                name='address'
                className={inputclass || "inputStyle1"}
                ref={inputRef}
                rows={2}
                value={address}
                onChange={(e) => {
                    if (!isreadOnly) {
                        setAddress(e.target.value);
                        if (onChangeAddress) {
                            onChangeAddress(e);
                        }
                    }
                }}
                readOnly={isreadOnly}
            />
            <div className='h-2' />
            <div className={`${className}`}>
                {isreadOnly && <a target='_blank' href={`https://www.google.com/maps?q=${markerPosition?.lat},${markerPosition?.lng}`} className={`absolute  z-10 cursor-pointer`} />}
                <Map
                    google={google}
                    zoom={17}
                    style={containerStyles}
                    initialCenter={cameraPosition}
                    center={markerPosition}
                    onClick={onMapClicked}
                    {...mapOptions}

                >
                    {markerPosition && (
                        <Marker position={markerPosition} icon={markerIcon} />
                    )}
                </Map>
            </div>
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.MAP_KEY,
})(GoogleMap);

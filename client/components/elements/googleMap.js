import React, { useEffect, useState, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMap = ({
    width,
    height,
    google,
    onsetLocation,
    onChangeAddress,
    value,
    setDefult = true,
    inputclass,
    isreadOnly = false,
    className,
    fullscreenControl = true
}) => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [cameraPosition, setCameraPosition] = useState({ lat: 30.0444, lng: 31.2357 }); // Tahrir Square
    const [address, setAddress] = useState('');
    const inputRef = useRef(null);

    const markerIcon = "/assets/imgs/theme/googlemarker.svg";
    const containerStyles = {
        width: width || '1000px',
        height: height || '370px',
        position: 'relative',
    };

    const mapStyles = [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        },
    ];

    const mapOptions = {
        disableDefaultUI: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: fullscreenControl,
        styles: mapStyles,
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMarkerPosition(userLocation);
                    setCameraPosition(userLocation);
                    if (onsetLocation) {
                        onsetLocation(userLocation);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation not supported.");
        }
    };

    useEffect(() => {
        if (value?.lat) {
            setMarkerPosition({ lat: value.lat, lng: value.lng });
        } else if (!isreadOnly && setDefult) {
            handleGetCurrentLocation();
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
                    const addressComponents = place.address_components || [];
                    const shortAddress = addressComponents
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
            });
        }
    }, [google, onsetLocation, onChangeAddress, isreadOnly]);

    const onMapClicked = (mapProps, map, clickEvent) => {
        if (!isreadOnly) {
            const lat = clickEvent.latLng.lat();
            const lng = clickEvent.latLng.lng();
            const newLocation = { lat, lng };
            setMarkerPosition(newLocation);
            setCameraPosition(newLocation);
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
            <div className={`${className}`} style={{ position: 'relative' }}>
                {!isreadOnly && (
                    <button
                        type="button"
                        onClick={handleGetCurrentLocation}
                        style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            zIndex: 10,
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            border: '1px solid #fff',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span style={{ fontSize: '14px' }}>📍</span>
                    </button>
                )}
                {isreadOnly && markerPosition && (
                    <a
                        target='_blank'
                        href={`https://www.google.com/maps?q=${markerPosition.lat},${markerPosition.lng}`}
                        rel="noreferrer"
                        className={`absolute z-10 cursor-pointer`}
                    />
                )}
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

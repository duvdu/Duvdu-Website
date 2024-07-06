import React, { useEffect, useState, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMap = ({ width, height, google, onsetLocation, onChangeAddress, value, setDefult = true, inputclass, isreadOnly = false,className }) => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [cameraPosition, setCameraPosition] = useState({ lat: 30.0444, lng: 31.2357 }); // Tahrir Square, Cairo
    const [address, setAddress] = useState('');
    const inputRef = useRef(null);

    const mapStyles = {
        width: width || '1000px',
        height: height || '370px',
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
                        const formattedAddress = results[0].formatted_address;
                        setAddress(formattedAddress);
                        if (onChangeAddress) {
                            onChangeAddress({
                                target: {
                                    name: 'address',
                                    value: formattedAddress,
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
                        const formattedAddress = place.formatted_address;
                        setAddress(formattedAddress);
                        if (onChangeAddress) {
                            onChangeAddress({
                                target: {
                                    name: 'address',
                                    value: formattedAddress,
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
                placeholder='address'
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
            <Map
                google={google}
                zoom={17}
                style={mapStyles}
                initialCenter={cameraPosition}
                center={markerPosition}
                onClick={onMapClicked}
                >
                {markerPosition && (
                    <Marker position={markerPosition} />
                )}
            </Map>
                </div>
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.MAP_KEY,
})(GoogleMap);

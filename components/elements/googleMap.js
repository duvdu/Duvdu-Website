import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const GoogleMap = ({ width, height, google, onsetLocation, value }) => {
    const [markerPosition, setMarkerPosition] = useState(null);
    const defaultPosition = { lat: 30.0444, lng: 31.2357 }; // Tahrir Square, Cairo

    const mapStyles = {
        width: width || '1000px',
        height: height || '370px',
    };

    useEffect(() => {
        if (value?.lat) {
            setMarkerPosition({ lat: value.lat, lng: value.lng });
        } else {
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
                () => {
                    
                }
            );
        }
    }, [value, onsetLocation]);

    const onMapClicked = (mapProps, map, clickEvent) => {
        const lat = clickEvent.latLng.lat();
        const lng = clickEvent.latLng.lng();

        if (onsetLocation) {
            setMarkerPosition({ lat, lng });
            onsetLocation({ lat, lng });
        }
    };

    return (
        <Map
            google={google}
            zoom={17}
            style={mapStyles}
            center={markerPosition}
            initialCenter={defaultPosition}
            onClick={onMapClicked}
        >
            {markerPosition && (
                <Marker
                    position={markerPosition}
                />
            )}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.MAP_KEY
})(GoogleMap);

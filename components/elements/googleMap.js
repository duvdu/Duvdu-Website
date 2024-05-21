import React, { useEffect, useState } from 'react';  // Import useState
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const GoogleMap = ({ width, height, google, onsetLocation, value }) => {
    const [markerPosition, setMarkerPosition] = useState(null); // State to store marker position

    const mapStyles = {
        width: width || '1000px',
        height: height || '370px',
    };
    
    useEffect(() => {
        if (value?.lat) setMarkerPosition({ lat: value.lat, lng: value.lng });
    }, [value])

    const onMapClicked = (mapProps, map, clickEvent) => {
        // Get the latitude and longitude from the map's click event
        const lat = clickEvent.latLng.lat();
        const lng = clickEvent.latLng.lng();

        // Set the new marker position
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
            onClick={onMapClicked} // Set onClick handler
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

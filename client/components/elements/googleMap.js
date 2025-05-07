import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleMapComponent = ({
  width,
  height,
  onsetLocation,
  onChangeAddress,
  value,
  setDefult = true,
  inputclass,
  isreadOnly = false,
  className,
  fullscreenControl = true,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [cameraPosition, setCameraPosition] = useState({ lat: 30.0444, lng: 31.2357 });
  const [address, setAddress] = useState('');
  const inputRef = useRef(null);
  const mapRef = useRef();
  const [autocomplete, setAutocomplete] = useState(null);

  const markerIcon = "/assets/imgs/theme/googlemarker.svg";
  const containerStyle = {
    width: width || '1000px',
    height: height || '370px',
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY,
    libraries,
  });

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: fullscreenControl,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  useEffect(() => {
    if (value?.lat) {
      setMarkerPosition({ lat: value.lat, lng: value.lng });
    } else if (!isreadOnly && setDefult && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(userLocation);
        if (onsetLocation) {
          onsetLocation(userLocation);
        }
      });
    }
  }, [value?.lat, setDefult, isreadOnly]);

  useEffect(() => {
    if (markerPosition && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const shortAddress = results[0].formatted_address;
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
      });
    }
  }, [markerPosition]);

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
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
        setAddress(place.formatted_address);
        if (onChangeAddress) {
          onChangeAddress({
            target: {
              name: 'address',
              value: place.formatted_address,
            },
          });
        }
      }
    }
  };

  const onMapClick = (e) => {
    if (!isreadOnly) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkerPosition(newLocation);
      if (onsetLocation) {
        onsetLocation(newLocation);
      }
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <>
      <Autocomplete
        onLoad={(ac) => setAutocomplete(ac)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          name="address"
          ref={inputRef}
          className={inputclass || "inputStyle1"}
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
      </Autocomplete>
      <div className="h-2" />
      <div className={className}>
        {isreadOnly && markerPosition && (
          <a
            target="_blank"
            href={`https://www.google.com/maps?q=${markerPosition.lat},${markerPosition.lng}`}
            className="absolute z-10 cursor-pointer"
          />
        )}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition || cameraPosition}
          zoom={17}
          onClick={onMapClick}
          options={mapOptions}
          onLoad={(map) => (mapRef.current = map)}
        >
          {markerPosition && (
            <Marker position={markerPosition} icon={markerIcon} />
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default GoogleMapComponent;

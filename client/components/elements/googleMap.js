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
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);

    const markerIcon = "/assets/imgs/theme/googlemarker.svg";
    const containerStyles = {
        width: width || '1000px',
        height: height || '370px',
        position: 'relative',
        color: '#000'
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

    // Enhanced search function to handle multiple results
    const handlePlaceSearch = (searchQuery) => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowSuggestions(false);
            return;
        }

        setIsSearching(true);
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        
        const request = {
            query: searchQuery,
            fields: ['name', 'geometry', 'formatted_address', 'place_id', 'types'],
        };

        service.textSearch(request, (results, status) => {
            
            setIsSearching(false);
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                setSearchResults(results.slice(0, 5)); // Limit to 5 results
                setShowSuggestions(true);
            } else {
                setSearchResults([]);
                setShowSuggestions(false);
            }
        });
    };

    // Function to select a search result
    const handleSelectPlace = (place) => {
        if (place.geometry) {
            const newLocation = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
            setMarkerPosition(newLocation);
            setCameraPosition(newLocation);
            setAddress(place.formatted_address || place.name);
            setShowSuggestions(false);
            setSearchResults([]);
            
            if (onsetLocation) {
                onsetLocation(newLocation);
            }
            if (onChangeAddress) {
                onChangeAddress({
                    target: {
                        name: 'address',
                        value: place.formatted_address || place.name,
                    },
                });
            }
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
                                component.types.includes("street_address") ||
                                component.types.includes("neighborhood") ||
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
        if (!isreadOnly && google && inputRef.current) {
            // Enhanced autocomplete configuration for better search results
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
                types: ['establishment', 'geocode'], // Include both places and addresses
                fields: ['name', 'geometry', 'formatted_address', 'place_id', 'address_components', 'types']
            });
            
            autocompleteRef.current = autocomplete;
            
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
                } else {
                    // If no geometry, search for the text input
                    handlePlaceSearch(inputRef.current.value);
                }
            });
        }

        // Cleanup function
        return () => {
            if (window.searchTimeout) {
                clearTimeout(window.searchTimeout);
            }
        };
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
            <div style={{ position: 'relative' }}>
                <input
                    name='address'
                    className={inputclass || "inputStyle1"}
                    ref={inputRef}
                    value={address}
                    placeholder="Search for a location..."
                    onChange={(e) => {
                        if (!isreadOnly) {
                            setAddress(e.target.value);
                            if (onChangeAddress) {
                                onChangeAddress(e);
                            }
                            // Trigger search with a slight delay
                            clearTimeout(window.searchTimeout);
                            window.searchTimeout = setTimeout(() => {
                                handlePlaceSearch(e.target.value);
                            }, 300);
                        }
                    }}
                    onFocus={() => {
                        if (!isreadOnly && searchResults.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                    onBlur={() => {
                        // Delay hiding suggestions to allow click events
                        setTimeout(() => setShowSuggestions(false), 150);
                    }}
                    readOnly={isreadOnly}
                />
                
                {/* Search suggestions dropdown */}
                {!isreadOnly && showSuggestions && searchResults.length > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            zIndex: 1000,
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}
                    >
                        {searchResults.map((result, index) => (
                            <div
                                key={result.place_id || index}
                                style={{
                                    padding: '12px 16px',
                                    cursor: 'pointer',
                                    borderBottom: index < searchResults.length - 1 ? '1px solid #eee' : 'none',
                                    ':hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f5f5f5';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                }}
                                onClick={() => handleSelectPlace(result)}
                            >
                                <div style={{ fontWeight: '500', fontSize: '14px' }}>
                                    {result.name}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                                    {result.formatted_address}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Loading indicator */}
                {!isreadOnly && isSearching && (
                    <div
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '12px',
                            color: '#666'
                        }}
                    >
                        Searching...
                    </div>
                )}
            </div>
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

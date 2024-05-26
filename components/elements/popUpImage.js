import React, { useState, useEffect, useRef } from 'react';
import Icon from '../Icons';

const PopUpImage = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setShowPopup(false);
        }
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <div onClick={togglePopup}>
                {children}
            </div>
            {showPopup && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative" ref={popupRef}>
                        <img src={children.props.src} alt="popup media" className="max-w-full max-h-full" />
                        <button className="absolute top-0 right-0 m-2 text-white cursor-pointer bg-red-700 rounded-full size-6 flex justify-center items-center" onClick={togglePopup}>
                            <Icon className='p-1' name={"xmark"}/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopUpImage;

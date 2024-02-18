import React, { useState } from 'react';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';

function createnewBoard({ isPopupOpen, setIsPopupOpen }) {
    const [showDirectorConfirmed, setShowDirectorConfirmed] = useState(false);
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [numberError, setNumberError] = useState({ isError: false, message: '' });
    const handleSubmit = (e) => {
        if (PhoneNumber.length < 8) {
            setNumberError({ isError: true, message: 'Password must be at least 8 characters long.' });
        } else {
            setNumberError({ isError: false, message: '' });
        }
    };
    const toggleDirectorConfirmed = () => {
        setShowDirectorConfirmed(true);
    }

    return (
        <>
            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} header={"create new Board"} >
                    <div method="post" onSubmit={handleSubmit} className='mt-12 mx-5'>
                        <div className={`mb-8 ${numberError.isError && 'error'}`}>
                            <input
                                type="text"
                                value={PhoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Board name"
                                className={numberError.isError ? "auth-field error" : "auth-field"}
                            />
                            {numberError.isError && <p className="error-msg">{numberError.message}</p>}
                        </div>
                        <AppButton onClick={toggleDirectorConfirmed} text={'Create'} className={'mt-12 w-full'} color={"#5666F7"} />
                    </div>


                </Popup>
            )}
        </>
    );
}


export default createnewBoard;

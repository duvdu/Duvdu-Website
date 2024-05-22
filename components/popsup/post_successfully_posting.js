import React, { useState, useEffect } from 'react';
import Icon from '../Icons';
import Popup from '../elements/popup';

function Successfully_posting({ id = "Report-sent-successfully",isShow, onCancel , message = 'Posted' }) {
    const [showPopup, setShowPopup] = useState(false);
    
    useEffect(() => {
        setShowPopup(isShow);
    }, [isShow]);

    function Cancel() {
        if (onCancel) {
            onCancel();
        }
        setShowPopup(false);
    }

    if (!showPopup) {
        return null;
    }

    return (
        <>
            <Popup id={id} className='show' onCancel={Cancel}>
                <div className="flex flex-col justify-center w-full sm:w-[604px] h-full my-14">
                    <div className="heading_s1 mb-[88px] text-center">
                        <div className="flex w-full justify-center">
                            <Icon name={"done"} className="mb-9" />
                        </div>
                        <h1 className="text-3xl font-semibold my-5">Successfully {message}</h1>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={Cancel} className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">
                            Close
                        </button>
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default Successfully_posting;

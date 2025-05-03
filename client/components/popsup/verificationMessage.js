import React, { useState, useEffect } from 'react';
import Icon from '../Icons';
import Popup from '../elements/popup';
import { ClosePopUp } from "../../util/util";
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
function VerificationMessage({ id = "verification-message", isError = false, isShow, onCancel , onTryAgain , errorMessage  }) {
    const { t } = useTranslation();
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        setShowPopup(isShow);
    }, [isShow]);

    function Cancel() {
        if (onCancel) {
            onCancel();
            ClosePopUp('face-verification')
        }
        setShowPopup(false);
    }
    function OnTryAgain() {
        if (onTryAgain) {
            onTryAgain();
        }
        setShowPopup(false);
    }


    return (
        <>
            <Popup id={id} className={showPopup ? 'show' : '' } onCancel={isError?OnTryAgain:Cancel}>
                <div className="flex flex-col justify-center w-full sm:w-[604px] h-full my-14">
                    <div className="heading_s1 mb-[48px] text-center">
                        <div className="flex w-full justify-center">
                            {isError ? 
                            <Icon name={"x"} />
                            :
                            <Icon name={"done"} />
                            }
                        </div>
                        <h1 className="text-3xl font-semibold my-5">{t(`${isError ? errorMessage.errors[0].message :"Verification Successful"}`)}</h1>
                        {/* {errorMessage && isError &&  
                            <h3 className="text-xl font-medium mt-5">{errorMessage} {t(`We couldn't verify your identity. Please try again with a clearer image or ensure the lighting is sufficient.`)}</h3>} */}
                        {!isError &&
                            <h3 className="text-xl font-medium mt-5">{t(`Your identity has been successfully verified. Thank you!`)}</h3>
                        }
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={isError?OnTryAgain:Cancel} className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">{t(isError?"Try Again":"Continue")}</button>
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default VerificationMessage;

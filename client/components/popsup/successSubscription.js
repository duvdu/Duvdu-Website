import React, { useState, useEffect } from 'react';
import Icon from '../Icons';
import Popup from '../elements/popup';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ClosePopUp } from "../../util/util";
function SuccessSubscription({ id = "subscription-message", isShow, onCancel }) {
    const { t } = useTranslation();
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        setShowPopup(isShow);
    }, [isShow]);

    function Cancel() {
        if (onCancel) {
            onCancel();
            router.push('/')
        }
        setShowPopup(false);
    }

    return (
        <>
            <Popup id={id} className={showPopup ? 'show' : '' } onCancel={Cancel}>
                <div className="flex flex-col justify-center w-full sm:w-[604px] h-full my-14">
                    <div className="heading_s1 mb-[48px] text-center">
                        <div className="flex w-full justify-center">
                            <Icon name={"done"} />
                        </div>
                        <h1 className="text-3xl font-semibold my-5">{t("Subscription Successfully")}</h1>
                        <h3 className="text-xl font-medium mt-5">{t(`You have successfully subscribed. You now have 5 contracts available.`)}</h3>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={Cancel} className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">{t("Continue")}</button>
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default SuccessSubscription;

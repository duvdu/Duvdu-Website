import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TimeLeft2 = ({ data, msgstatus }) => {
    const { t } = useTranslation();
    const { status, deadline, actionAt, createdAt, stageExpiration } = data;

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [setTimer]);

    const actionOrCreateAt = actionAt || createdAt;

    if (!actionOrCreateAt) return null;

    let calculatedTimeLeft;
    if (status !== 'ongoing') {
        const actionAtTime = new Date(actionOrCreateAt).getTime();
        const nowTime = new Date().getTime();
        const expirationTime =(stageExpiration * 60 * 60 * 1000);
        const futureTimestamp = actionAtTime + expirationTime
        calculatedTimeLeft = futureTimestamp - nowTime;
    } else {
        const deadlineTime = (deadline ? new Date(deadline) : new Date()).getTime();
        const nowTime = new Date().getTime();
        calculatedTimeLeft =(deadlineTime - nowTime); // Convert to seconds
    }


    const days = Math.floor(calculatedTimeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((calculatedTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours after days
    const minutes = Math.floor((calculatedTimeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Minutes after hours
    const seconds = Math.floor((calculatedTimeLeft % (1000 * 60)) / 1000); // Seconds after minutes

    return (
        <div className='text-lg ml-auto mr-auto'>

            {/* <span className='opacity-50 mx-1'>
            {t('left')} 
            </span> */}
            <span className='opacity-50 mx-1'>{t("left")}</span>
            <span className='text-primary'>
            {calculatedTimeLeft && calculatedTimeLeft >0?
            `${days}d ${hours}h ${minutes}m ${seconds}s`:'Expire Date'}
            </span>
               
        </div>
    );
};

export default TimeLeft2;

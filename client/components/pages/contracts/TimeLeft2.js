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
        const stageExpirationHours = stageExpiration || 0;
        const expirationTime = actionAtTime + stageExpirationHours * 3600000;
        calculatedTimeLeft = Math.floor((expirationTime - nowTime) / 1000); // Convert to seconds
    } else {
        const deadlineTime = (deadline ? new Date(deadline) : new Date()).getTime();
        const nowTime = new Date().getTime();
        calculatedTimeLeft = Math.floor((deadlineTime - nowTime) / 1000); // Convert to seconds
    }

    if (calculatedTimeLeft < 0) {
        return (
            <div className='text-lg ml-auto mr-auto'>
                
                    <>
                        <span className='opacity-50 mx-1'>{t("Time Expired")}</span>
                        <span className='text-primary'>
                            for {msgstatus}
                        </span>
                    </>

            </div>
        );
    }

    const seconds = calculatedTimeLeft % 60;
    const minutes = Math.floor((calculatedTimeLeft % 3600) / 60);
    const hours = Math.floor(calculatedTimeLeft / 3600);

    return (
        <div className='text-lg ml-auto mr-auto'>

                    <span className='opacity-50 mx-1'>{t("remain time")}</span>
                    <span className='text-primary'>
                        {`${hours}h ${minutes}m ${seconds}s`}
                    </span>
                    <span className='opacity-50 mx-1'>
                        for {msgstatus}
                    </span>
               
        </div>
    );
};

export default TimeLeft2;

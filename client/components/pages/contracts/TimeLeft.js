import React, { useState, useEffect } from 'react';

const TimeLeft = ({ data, msgstatus }) => {
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
    // if (calculatedTimeLeft < 0) {
    //     return (
    //         <span className='text-4xl'>
    //             <span className='font-semibold capitalize mt-3'>{t("Time Expired")}</span>
    //             <span className='text-lg opacity-40 mx-2'>
    //                 for {msgstatus}
    //             </span>
    //         </span>
    //     );
    // }
    const days = Math.floor(calculatedTimeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((calculatedTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours after days
    const minutes = Math.floor((calculatedTimeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Minutes after hours
    const seconds = Math.floor((calculatedTimeLeft % (1000 * 60)) / 1000); // Seconds after minutes

    return (
        <span className='text-xl md:text-4xl'>
            <span className='font-semibold capitalize mt-3'>
                {calculatedTimeLeft && calculatedTimeLeft >0?
                `${days}d ${hours}h ${minutes}m ${seconds}s`:'Expire Date'}
            </span>
            <span className='text-lg opacity-40 mx-2'>
                left for {msgstatus}
            </span>
        </span>
    );
};

export default TimeLeft;

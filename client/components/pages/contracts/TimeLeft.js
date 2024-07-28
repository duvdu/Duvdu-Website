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
        const stageExpirationHours = stageExpiration || 0;
        const expirationTime = actionAtTime + stageExpirationHours * 3600000;
        calculatedTimeLeft = Math.floor((expirationTime - nowTime) / 1000); // Convert to seconds
    } else {
        const deadlineTime = (deadline ? new Date(deadline) : new Date()).getTime();
        const nowTime = new Date().getTime();
        calculatedTimeLeft = Math.floor((deadlineTime - nowTime) / 1000); // Convert to seconds
    }
console.log(calculatedTimeLeft)
    // if (calculatedTimeLeft < 0) {
    //     return (
    //         <span className='text-4xl'>
    //             <span className='font-semibold capitalize mt-3'>Time Expired</span>
    //             <span className='text-lg opacity-40 mx-2'>
    //                 for {msgstatus}
    //             </span>
    //         </span>
    //     );
    // }

    const seconds = calculatedTimeLeft % 60;
    const minutes = Math.floor((calculatedTimeLeft % 3600) / 60);
    const hours = Math.floor(calculatedTimeLeft / 3600);

    return (
        <span className='text-4xl'>
            <span className='font-semibold capitalize mt-3'>{`${hours}h ${minutes}m ${seconds}s`}</span>
            <span className='text-lg opacity-40 mx-2'>
                left for {msgstatus}
            </span>
        </span>
    );
};

export default TimeLeft;

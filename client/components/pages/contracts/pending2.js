import React, { useEffect, useState } from 'react';
import dateFormat from "dateformat";
import { formatRemainingTime } from '../../../util/util';
import Selector from '../../elements/CustomSelector';
import { connect } from 'react-redux';
import { takeAction } from '../../../redux/action/apis/contracts/takeaction';
import { formattedCreatedAt } from '../../../util/format-date';

const Pending2 = ({ data,takeAction_respond,takeAction,onClick }) => {
    const statuses = [
        { value: 'accept' },
        { value: 'reject' },
    ];
    const [timeLeft, setTimeLeft] = useState("");

    const handleDropdownSelect = (value) => {
        takeAction({id: data._id, data : {"action": value}})
    };

    const CreatedAt = formattedCreatedAt(data?.contract?.createdAt)
    useEffect(() => {
        if (!data?.contract?.deadline) return
        const interval = setInterval(() => {
            const now = new Date();
            const deadline = new Date(data?.contract.deadline);
            const timeRemaining = deadline - now;

            if (timeRemaining <= 0) {
                setTimeLeft("Time's up");
                clearInterval(interval);
            } else {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                days > 0 ? setTimeLeft(`${days}d ${hours}h ${minutes}m`) : setTimeLeft(`${hours}:${minutes < 10 ? "0" : ""}${minutes}`);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [data?.contract?.deadline]);

    return (
        <div onClick={onClick} className='flex justify-between w-[370px] sm:w-full mx-auto items-center border border-[#00000033] dark:border-[#FFFFFF33] rounded-[50px] p-6 cursor-pointer'>
            <div className='flex flex-col gap-2 sm:gap-0 sm:flex-row justify-center items-center sm:w-full'>
                {/* profile */}
                <div className='flex gap-3 items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.sp.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold capitalize'>
                            {data.sp.name || 'Unknown User'}
                        </h3>
                        <span className='opacity-50'>
                            {CreatedAt}
                        </span>
                    </div>
                </div>
                {/*********/}
                {/* deadline */}
                
                <div className='text-lg ml-auto mr-auto'>
                {
                !data.contract.status?.includes("waiting-for-pay") ?
                <>
                    <span className='opacity-50 mx-1'>
                        will respond in
                    </span>
                    <span className='text-primary'>
                        {timeLeft}
                    </span>
                </> :
                    <span className='opacity-50 mx-1'>
                        wait for payment
                    </span>
                }
                </div>
            </div>
            {/*********/}
            {/* dropdown */}
            <Selector 
            options={statuses} 
            onSelect={handleDropdownSelect}
            className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer hidden" />
            {/*********/}
        </div>
    );
};

const mapStateToProps = (state) => ({
    takeAction_respond: state.api.takeAction
});

const mapDispatchToProps = {
    takeAction
};




export default connect(mapStateToProps, mapDispatchToProps)(Pending2);
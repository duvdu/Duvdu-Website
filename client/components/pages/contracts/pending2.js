import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { takeAction } from '../../../redux/action/apis/contracts/takeaction';
import { formattedCreatedAt } from '../../../util/format-date';
import TimeLeft2 from './TimeLeft2';
import { useTranslation } from 'react-i18next';

const Pending2 = ({ data, takeAction_respond, takeAction, onClick }) => {
  
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState("");


    const NormalState = ({ value }) => (
        <span className='text-4xl'>
            {value}
        </span>
    );

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

    const uiStatus = () => {
        const items = {
            status: data.contract.status,
            stageExpiration: data?.contract?.stageExpiration,
            deadline: data?.contract?.deadline,
            actionAt: data?.contract?.actionAt,
            createdAt: data?.contract?.createdAt,
        };

        switch (items.status) {
            case 'pending':
                return <TimeLeft2 data={items} msgstatus={"pending"} />;
            case 'waiting-for-payment':
                return <TimeLeft2 data={items} msgstatus={"waiting for payment"} />;
            case 'waiting-for-pay-10':
                return <TimeLeft2 data={items} msgstatus={"waiting for pay 10"} />;
            case 'update-after-first-Payment':
                return <TimeLeft2 data={items} msgstatus={"update after first Payment"} />;
            case 'waiting-for-total-payment':
                return <TimeLeft2 data={items} msgstatus={"waiting for total payment"} />;
            case 'ongoing':
                return <TimeLeft2 data={items} msgstatus={"complate task"} />;
            case 'completed':
                return <NormalState value={"Completed"} />;
            case 'rejected':
                return <NormalState value={"Rejected"} />;
            case 'canceled':
                return <NormalState value={"Canceled"} />;
            default:
                return "Unknown"; // Handle unknown cases as needed
        }
    };

    return (
        <div onClick={onClick} className='flex justify-between w-full mx-auto items-center border border-[#00000033] dark:border-[#FFFFFF33] rounded-[50px] p-6 cursor-pointer'>
            <div className='flex flex-col gap-2 sm:gap-0 sm:flex-row justify-center items-center sm:w-full'>
                {/* profile */}
                <div className='flex gap-3 items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.sp.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold capitalize'>
                            {data?.sp?.name?.split(' ')[0].length>6?data?.sp?.name?.split(' ')[0].slice(0,6):data?.sp?.name?.split(' ')[0] || 'Unknown User'}
                        </h3>
                        <span className='opacity-50'>
                            {CreatedAt}
                        </span>
                    </div>
                </div>
                {/*********/}
                {/* deadline */}
                {uiStatus()}
            </div>
            {/*********/}
            {/* dropdown */}

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
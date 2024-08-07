import { connect } from "react-redux";
import Selector from "../../elements/CustomSelector";
import { takeAction } from "../../../redux/action/apis/contracts/takeaction";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import Icon from "../../Icons";
import TimeLeft from "./TimeLeft";
import { useTranslation } from 'react-i18next';

const Pending = ({ data, takeAction_respond, contractDetails, takeAction, onClick }) => {
    const { t } = useTranslation();

    // const [<TimeLeft/>, setTimeLeft] = useState("");
    const status = data.contract.status

    const statuses = [
        { value: 'accept' },
        { value: 'reject' },
    ];
    const handleDropdownSelect = (value) => {
        takeAction({ id: data._id, data: { "action": value } })
    };

    const NormalState = ({ value }) => (
        <span className='text-4xl'>
            {value}
        </span>
    );


    // useEffect(() => {
    //     if (!data?.contract?.deadline) return
    //     const interval = setInterval(() => {
    //         const now = new Date();
    //         const deadline = new Date(data?.contract.deadline);
    //         const timeRemaining = deadline - now;

    //         if (timeRemaining <= 0) {
    //             setTimeLeft("Time's up");
    //             clearInterval(interval);
    //         } else {
    //             const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    //             const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //             const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    //             days > 0 ? setTimeLeft(`${days}d ${hours}h ${minutes}m`) : setTimeLeft(`${hours}:${minutes < 10 ? "0" : ""}${minutes}`);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);

    // }, [data?.contract?.deadline]);

    const uiStatus = () => {
        const items = {
            status: status,
            stageExpiration: data?.contract?.stageExpiration,
            deadline: data?.contract?.deadline,
            actionAt: data?.contract?.actionAt,
            createdAt: data?.contract?.createdAt,
        };

        switch (status) {
            case 'pending':
                return <TimeLeft data={items} msgstatus={"pending"} />;
            case 'waiting-for-payment':
                return <TimeLeft data={items} msgstatus={"waiting for payment"} />;
            case 'waiting-for-pay-10':
                return <TimeLeft data={items} msgstatus={"waiting for pay 10"} />;
            case 'update-after-first-Payment':
                return <TimeLeft data={items} msgstatus={"update after first Payment"} />;
            case 'waiting-for-total-payment':
                return <TimeLeft data={items} msgstatus={"waiting for total payment"} />;
            case 'ongoing':
                return <TimeLeft data={items} msgstatus={"complate task"} />;
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

    const getType = () => {
        if (data?.ref.includes("copyright"))
            return "copyrights"
        else if (data?.ref.includes("rental"))
            return "rental"
        else if (data?.ref.includes("producer"))
            return "producer"
        else if (data?.ref.includes("project"))
            return "project"
        else if (data?.ref.includes("team"))
            return "team"
    }

    return (
        <div onClick={onClick} className='flex justify-between w-full mx-auto border border-[#00000033] dark:border-[#FFFFFF33] rounded-[50px] p-6 relative cursor-pointer'>
            <div className='flex flex-col gap-11 items-start justify-between w-full'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.customer?.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold capitalize'>{data.customer?.name}</h3>
                        <span className='opacity-50'>{dateFormat(data?.contract?.createdAt, 'dddd')}</span>
                    </div>
                </div>
                {/*********/}
                {/* time */}

                <div className='flex flex-col xl:flex-row justify-between items-center w-full'>
                    {uiStatus()}
                    <div className={`border-2 border-primary text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer hidden`}>{t("respond")}</div>
                </div>
                {/*********/}
            </div>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 h-min rounded-3xl mr-3">
                {getType()}
            </div>
            {(status == 'pending' || status?.includes("waiting-for-pay")) && <Icon name="waiting" />}
            {status == 'rejected' && <Icon name="circle-exclamation" className={"border border-[#D72828] text-[#D72828] rounded-full p-2 size-11"} />}
            {status == 'available' && <Icon className={"border text-[#50C878] border-[#50C878] rounded-full p-2 size-11"} name="circle-check" />}
            <div className='absolute top-5 right-5 hidden'>
                {/* dropdown */}
                <Selector
                    options={statuses}
                    onSelect={handleDropdownSelect}
                    className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer" />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    takeAction_respond: state.api.takeAction,
    contractDetails: state.ContractDetails,
});

const mapDispatchToProps = {
    takeAction
};




export default connect(mapStateToProps, mapDispatchToProps)(Pending);
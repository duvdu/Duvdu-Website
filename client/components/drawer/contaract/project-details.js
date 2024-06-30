import React, { useEffect, useState } from 'react';
import Popup from '../../elements/popup';
import Button from '../../elements/button';
import Icon from '../../Icons';
import Drawer from '../../elements/drawer';
import { connect } from 'react-redux';
import { toggleContractData } from '../../../redux/action/contractDetails';
import dateFormat from "dateformat";
import { takeAction } from '../../../redux/action/apis/contracts/takeaction';
import SuccessfullyPosting from '../../popsup/post_successfully_posting';
import { payment } from '../../../redux/action/apis/contracts/pay';
import SelectDate from '../../elements/selectDate';

function ReceiveProjectFiles({ contractDetails, toggleContractData, user, takeAction, takeAction_respond, payment, payment_respond }) {
    const contract = contractDetails?.contract;
    const customer = contractDetails?.customer;
    const sp = contractDetails?.sp;
    const [timeLeft, setTimeLeft] = useState("");
    const [actionSuccess, setActionSuccess] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [chnagedappointmentDate, setChnagedAppointmentDate] = useState(null);

    console.log(contractDetails)
    const IsImSp = () => {
        return sp.username == user.username
    }
    const getType = () => {
        if (contractDetails?.ref.includes("copyright"))
            return "copyrights"
        else if (contractDetails?.ref.includes("rental"))
            return "rental"
        else if (contractDetails?.ref.includes("producer"))
            return "producer"
        else if (contractDetails?.ref.includes("project"))
            return "project"
    }
    useEffect(() => {
        if (takeAction_respond)
            setActionSuccess(true)
    }, [takeAction_respond]);

    useEffect(() => {
        if (getType() == "producer") {
            setAppointmentDate(contract.appointmentDate)
            setChnagedAppointmentDate(contract.appointmentDate)
        }
        else {
            setChnagedAppointmentDate(null)
            setAppointmentDate(null)
        }

    }, [contractDetails?._id]);

    useEffect(() => {
        if (payment_respond)
            setPaymentSuccess(true)
    }, [payment_respond]);

    useEffect(() => {
        if (!contract?.deadline) return
        const interval = setInterval(() => {
            const now = new Date();
            const deadline = new Date(contract.deadline);
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

    }, [contract?.deadline]);

    const handleAccept = () => {
        if (!contractDetails?.ref) return
        const type = getType()
        takeAction({ id: contract._id, data: true, type: type })
    };

    const handleUpdate = () => {
        if (!contractDetails?.ref) return
        const type = getType()
        takeAction({ id: contract._id, data: chnagedappointmentDate, type: type })
    };

    const handlePayment = () => {
        const type = getType()
        payment({ id: contract._id, type: type })
    };
    const handleRefuse = () => {
        if (!contractDetails?.ref) return
        const type = getType()
        takeAction({ id: contract._id, data: false, type: type })
    };
    const toggleDrawer = () => {
        toggleContractData(null)
        takeAction({ id: -1 })      // for remove respond state
        payment({ id: -1 })         // for remove respond state
    };
    // console.log(takeAction_respond)
    // console.log(contractDetails)
    // console.log(contract)
    // console.log(customer)
    // console.log(sp)
    // console.log("=============")
    const status = contract?.status
    console.log(status)

    return (
        <>
            <SuccessfullyPosting isShow={actionSuccess} onCancel={toggleDrawer} message="" />
            <SuccessfullyPosting isShow={paymentSuccess} onCancel={toggleDrawer} message="Payment" />
            <Drawer isOpen={!!contractDetails} toggleDrawer={toggleDrawer} name="booking details" header={"booking details"}>

                {
                    contract &&
                    <>
                        <div className='flex flex-col justify-start items-center px-0 gap-6 mt-10 h-drawer'>
                            <section>
                                <span className='text-4xl my-5'>{status == "pending" ? timeLeft : "waiting for payment"}
                                    {status == "pending" &&
                                        <span className='text-lg opacity-40 mx-2'>
                                            {timeLeft ? "left" : "Time's up"}
                                        </span>
                                    }
                                </span>
                            </section>
                            <section className='w-full flex-col'>
                                <h2 className='opacity-60 capitalize mb-3'> original gig </h2>
                                <div className='w-full'>
                                    <div className="h-20 w-full rounded-full relative overflow-hidden">
                                        <img className="absolute -translate-y-1/2 blur-sm" src='/assets/imgs/projects/2.jpeg' />
                                        <div className="absolute z-20 flex items-center w-full h-full p-7">
                                            <div className="w-full text-center p-20">
                                                <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{contract.project}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className='w-full hidden'>
                                <h2 className='opacity-60 capitalize mb-3'> project type </h2>
                                <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                    {contract.details}
                                </span>
                            </section>
                            {contractDetails.ref &&
                                <section className='w-full'>
                                    <h2 className='opacity-60 capitalize mb-3'> service type </h2>
                                    <span className='flex flex-col border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                        {getType()}
                                    </span>
                                </section>}

                            {
                                contract.details &&
                                <section className='w-full'>
                                    <h2 className='opacity-60 capitalize mb-3'> project details </h2>
                                    <p className='font-semibold capitalize max-w-[543px]'>
                                        {contract.details}
                                    </p>
                                </section>
                            }
                            {contract.attachments &&
                                <section className='w-full'>
                                    <h2 className='opacity-60 capitalize'> alike media </h2>
                                    {contract.attachments.map((attachment, index) =>
                                        <div key={index} className='flex gap-3 items-start p-4 bg-DS_white rounded-md border border-[#CACACA] mt-3'>
                                            <Icon key={index} name={'file'} className='size-5' />
                                            <div className='flex flex-col'>
                                                <span className='text-[#353535] text-[14px] font-medium'> {attachment.split('/').pop()} </span>
                                                <span className='text-[#989692] text-[12px]'> </span>
                                                <a href={attachment} target="_blank" rel="noopener noreferrer" className='text-primary font-semibold text-[14px]'> Click to view </a>
                                            </div>
                                        </div>
                                    )}
                                </section>}
                            <section className='w-full flex flex-col sm:flex-row justify-between items-center gap-10 sm:gap-3'>
                                <div className='w-full'>
                                    <div className='w-full'>
                                        <h2 className='opacity-60 capitalize mb-3'> custom requirements </h2>
                                        <span className='font-semibold capitalize mt-3'> {contract.stageExpiration} minutes </span>
                                    </div>
                                    <div className='w-full mt-5'>
                                        <h2 className='opacity-60 capitalize mb-3'> shooting days </h2>
                                        <div className='flex gap-4'>
                                            <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                                                <Icon className='text-primary text-2xl size-5' name={"location-dot"} />
                                            </div>
                                            <div>
                                                <div>
                                                    <span className='opacity-85 text-base'>
                                                        {contract.address}
                                                    </span>
                                                </div>
                                                <div className='hidden'>
                                                    <span className='text-xs text-[#747688]'>
                                                        Cairo, Egypt
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='w-full'>
                                        <h2 className='opacity-60 capitalize mb-3'> shooting days </h2>
                                        <span className='font-semibold capitalize mt-3'> {contract.totalPrice} days </span>
                                    </div>
                                    <div className='w-full mt-5'>
                                        <h2 className='opacity-60 capitalize mb-3'> start date </h2>
                                        <div className='flex gap-4'>
                                            <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                                                <Icon name={"bag"} />
                                            </div>
                                            <div>
                                                <div>
                                                    <span className='opacity-85 text-base'>
                                                        {dateFormat(contract.appointmentDate, 'd mmmm , yyyy')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className='text-xs text-[#747688]'>
                                                        {new Date(contract.appointmentDate).toLocaleDateString('en-US', { weekday: 'long' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                status == "pending" &&
                                getType() == "producer" &&
                                IsImSp() &&
                                <section className="my-11 w-full">
                                    <h3 className="capitalize opacity-60 mb-4">appointment Date</h3>
                                    <SelectDate value={chnagedappointmentDate} onChange={(value) => setChnagedAppointmentDate(value)} />
                                </section>
                            }
                            <div className='h-full' />
                            <section className='w-full '>
                                {
                                    IsImSp() ||
                                        status == "accepted with update"
                                        ?
                                        <>

                                            {
                                                <div className='flex mx-5 gap-7 mb-10 mt-16'>
                                                    <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handleAccept}>
                                                        <span className='text-white font-bold capitalize text-lg'>
                                                            Accept
                                                        </span>
                                                    </Button>
                                                    {
                                                        getType() == "producer" &&
                                                        appointmentDate &&
                                                        chnagedappointmentDate != appointmentDate &&
                                                        <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handleUpdate}>
                                                            <span className='text-white font-bold capitalize text-lg'>
                                                                Update Appointment
                                                            </span>
                                                        </Button>}
                                                    <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                                        refuse
                                                    </button>
                                                </div>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                status == "waiting-for-pay-10" &&
                                                <div className='flex items-center justify-center mx-5 gap-7 mb-10 mt-16'>
                                                    <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                                        <span className='text-white font-bold capitalize text-lg'>
                                                            Pay Now 10%
                                                        </span>
                                                    </Button>
                                                </div>
                                            }
                                            {
                                                status == "waiting-for-total-payment" &&
                                                <div className='flex items-center justify-center mx-5 gap-7 mb-10 mt-16'>
                                                    <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                                        <span className='text-white font-bold capitalize text-lg'>
                                                            Pay Now remain ( 90 % )
                                                        </span>
                                                    </Button>
                                                </div>
                                            }
                                            {
                                                !status?.includes("waiting-for-pay") &&
                                                <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-16 max-w-[345px] mx-auto flex items-center justify-center">
                                                    Cancel
                                                </button>
                                            }
                                        </>
                                }
                            </section>
                        </div>
                    </>

                }
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    contractDetails: state.ContractDetails,
    takeAction_respond: state.api.takeAction,
    payment_respond: state.api.payment,

});

const mapDispatchToProps = {
    toggleContractData,
    takeAction,
    payment
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveProjectFiles);

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
import { getAllContracts } from '../../../redux/action/apis/contracts/getall';
import CountdownTimer from '../../elements/CounterDownTimer';

function ReceiveProjectFiles({ getAllContracts,contractDetails, toggleContractData, user, takeAction, takeAction_respond, payment, payment_respond }) {
    const contract = contractDetails?.contract;
    const customer = contractDetails?.customer;
    const sp = contractDetails?.sp;
    const status = contract?.status
    const [timeLeft, setTimeLeft] = useState("");
    const [actionSuccess, setActionSuccess] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [appointmentDate, setdAppointmentDate] = useState(null);
    const [details, setDetails] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [deadline, setDeadline] = useState(null);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'details') {
            setDetails(value);
        } else if (name === 'totalPrice') {
            setTotalPrice(value);
        }
    };
    // const [chnagedappointmentDate, setChnagedAppointmentDate] = useState(null);

    const IsImSp = () => {
        return sp?.username == user?.username
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

    const uiStatus = () => {
        switch (status) {
            case 'canceled':
                return "Canceled";
            case 'pending':
                return timeLeft;
            case 'waiting-for-pay-10':
                return "Waiting For First Payment";
            case 'waiting-for-payment':
                return "Waiting For payment";
            case 'update-after-first-Payment':
                return "Update After First Payment";
            case 'waiting-for-total-payment':
                return "Waiting For Total Payment";
            case 'ongoing':
                return "Ongoing";
            case 'completed':
                return "Completed";
            case 'rejected':
                return "Rejected";
            default:
                return "Unknown"; // Handle unknown cases as needed
        }
    }

    useEffect(() => {
        if (takeAction_respond){
            getAllContracts()
            setActionSuccess(true)
        }
    }, [takeAction_respond]);

    useEffect(() => {
        if (payment_respond){
            getAllContracts()
            setPaymentSuccess(true)
        }
    }, [payment_respond]);
    
    useEffect(() => {
        if (getType() == "producer") {
            setdAppointmentDate(contract.appointmentDate)
        }
        else {
            setdAppointmentDate(null)
        }

    }, [contractDetails?._id]);


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

        const data = {}
        if (appointmentDate) data.appointmentDate = appointmentDate;
        if (details) data.details = details;
        if (totalPrice) data.totalPrice = totalPrice;
        if (deadline) data.deadline = deadline;

        takeAction({ id: contract._id, data: data, type: type, isUpdate: true })
    };

    const handlePayment = () => {
        const type = getType()
        payment({ id: contract.paymentLink, type: type })
    };
    const handleRefuse = () => {
        if (!contractDetails?.ref) return
        const type = getType()
        takeAction({ id: contract._id, data: false, type: type })
    };
    const toggleDrawer = () => {
        toggleContractData(null)
        setActionSuccess(false)
        setPaymentSuccess(false)
        setdAppointmentDate(null)
        setDetails(null)
        setTotalPrice(null)
        setDeadline(null)
        takeAction({ id: -1 })      // for remove respond state
        payment({ id: -1 })         // for remove respond state
    };
    // console.log(takeAction_respond)
    // console.log(contractDetails)
    // console.log(contract)
    // console.log(customer)
    // console.log(sp)
    // console.log("=============")

    

    const acceptBtn = (IsImSp() && status === "pending") || (IsImSp() && status === "update-after-first-Payment") || (!IsImSp() && status === "accepted with update")
    const refuse = (IsImSp() && status === "pending") || (IsImSp() && status === "update-after-first-Payment") || (!IsImSp() && status === "accepted with update")
    const UpdateBtn =
        (getType() === "producer" &&
            IsImSp() &&
            status === "pending" &&
            appointmentDate && 
            appointmentDate !== contract?.appointmentDate) ||
        (getType() === "copyrights" &&
            !IsImSp() &&
            status === "update-after-first-Payment" &&
            (
                details && details !== contract?.details ||
                totalPrice && totalPrice !== contract?.totalPrice ||
                (deadline && deadline !== contract?.deadline && new Date(deadline) > new Date(contract.deadline))
            ))


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
                                <span className='text-4xl my-5'>{uiStatus()}
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
                            <section className='w-full flex flex-col sm:flex-row justify-between items-start gap-10 sm:gap-3'>
                                <div className='w-full'>
                                    <div className='w-full'>
                                        <h2 className='opacity-60 capitalize mb-3'> Stage Expiration </h2>
                                        <CountdownTimer time={contract?.actionAt}/>
                                    </div>
                                    <div className='w-full mt-5'>
                                        <h2 className='opacity-60 capitalize mb-3'> Address </h2>
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
                                        <h2 className='opacity-60 capitalize mb-3'> Total Price </h2>
                                        <span className='font-semibold capitalize mt-3'> {contract.totalPrice} $ </span>
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
                                                        {dateFormat(contract.appointmentDate, 'dddd')}
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
                                    <SelectDate value={appointmentDate} onChange={(value) => setdAppointmentDate(value)} />
                                </section>
                            }

                            {
                                status == "update-after-first-Payment" &&
                                getType() == "copyrights" &&
                                !IsImSp() &&
                                <>
                                    <section className='w-full'>
                                        <h3 className="capitalize opacity-60">job details</h3>
                                        <textarea
                                            name="details"
                                            value={details || contract.details}
                                            onChange={handleInputChange}
                                            placeholder="requirements, conditions At least 6 char"
                                            className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32"
                                        />
                                    </section>
                                    <section className="my-11 w-full">
                                        <h3 className="capitalize opacity-60 mb-4">deadline</h3>
                                        <SelectDate value={deadline || contract.deadline} onChange={(value) => setDeadline(value)} />
                                        {deadline && new Date(deadline) < new Date(contract.deadline) &&
                                        <span className="error-msg" >
                                             Deadline must be on or after the execution day.
                                        </span>
                                        }
                                    </section>
                                    <div className='mb-4 w-full'>
                                        <input
                                            placeholder='Total price'
                                            type='text'
                                            name='totalPrice'
                                            value={totalPrice || contract.totalPrice}
                                            onChange={handleInputChange}
                                            className="edit app-field"
                                        />
                                    </div>
                                </>

                            }

                            <div className='h-full' />
                            <section className='w-full '>
                                <div className='flex mx-5 gap-7 mb-10 mt-16 justify-center'>
                                    {
                                        acceptBtn &&
                                        <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handleAccept}>
                                            <span className='text-white font-bold capitalize text-lg'>
                                                Accept
                                            </span>
                                        </Button>
                                    }
                                    {
                                        UpdateBtn &&
                                        <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handleUpdate}>
                                            <span className='text-white font-bold capitalize text-lg'>
                                                Update Appointment
                                            </span>
                                        </Button>
                                    }
                                    {
                                        refuse &&
                                        <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                            Refuse
                                        </button>
                                    }
                                </div>


                                {
                                    !IsImSp() &&
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
                                    !IsImSp() && status == "waiting-for-total-payment" &&
                                    <div className='flex items-center justify-center mx-5 gap-7 mb-10 mt-16'>
                                        <Button isEnabled={new Date(appointmentDate).getDate() === new Date().getDate()} className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                            <span className='text-white font-bold capitalize text-lg'>
                                                Pay Now remain ( 90 % )
                                            </span>
                                        </Button>
                                    </div>
                                }
                                {
                                    !IsImSp() && status == "waiting-for-payment" &&
                                    <div className='flex items-center justify-center mx-5 gap-7 mb-10 mt-16'>
                                        <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                            <span className='text-white font-bold capitalize text-lg'>
                                                Pay Now
                                            </span>
                                        </Button>
                                    </div>
                                }
                                {
                                    !status?.includes("waiting-for-pay") && false &&
                                    <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-16 max-w-[345px] mx-auto flex items-center justify-center">
                                        Cancel
                                    </button>
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
    getAllContracts,
    payment
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveProjectFiles);

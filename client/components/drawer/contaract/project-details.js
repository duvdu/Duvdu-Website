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
import FunctionUsed from '../../popsup/create/FunctionsUsed';
import AddToolUsed from '../../popsup/create/addToolUsed';
import { InsertToArray, UpdateFormData, resetForm } from '../../../redux/action/logic/forms/Addproject';
import TimeLeft from '../../pages/contracts/TimeLeft';

function ReceiveProjectFiles({
    getAllContracts,
    contractDetails,
    toggleContractData,
    takeAction,
    takeAction_respond,
    payment,
    payment_respond,
    addprojectState,
    UpdateFormData,
    InsertToArray,
    resetForm,
    user }) {
    const formData = addprojectState?.formData
    const contract = contractDetails?.contract;
    const customer = contractDetails?.customer;
    const sp = contractDetails?.sp;
    const status = contract?.status
    const [timeLeft, setTimeLeft] = useState("");
    const [actionSuccess, setActionSuccess] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [appointmentDate, setdAppointmentDate] = useState(null);
    

    const [canEdit, setCanEdit] = useState(null);


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
        const items = {
            status: status,
            stageExpiration: contract?.stageExpiration,
            deadline: contract?.deadline,
            actionAt: contract?.actionAt,
            createdAt: contract?.createdAt,
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value)
    };
    const handleToolChange = (e, index) => {
        let value = e.target.value;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        const tools = [...formData.tools];
        tools[index]['unitPrice'] = value;
        UpdateFormData("tools", tools);
    };

    const handleFunctionChange = (e, index) => {
        let value = e.target.value;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        const tools = [...formData.functions];
        tools[index]['unitPrice'] = value;
        UpdateFormData("functions", tools);
    };


    useEffect(() => {
        if (takeAction_respond) {
            getAllContracts()
            setActionSuccess(true)
        }
    }, [takeAction_respond]);

    useEffect(() => {
        UpdateFormData("functions", contract?.functions)
        UpdateFormData("tools", contract?.tools)
    }, [contract?.tools, contract?.functions]);

    useEffect(() => {
        if (payment_respond) {
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
        if (type == "copyrights") {
           data['details'] = formData['details']
           data['totalPrice'] = formData['totalPrice']
           data['duration'] = {
            value:formData['duration'],
            unit:contract.duration.unit
           }
        }
        else {
            if (formData['numberOfUnits']) data['projectScale.numberOfUnits'] = formData['numberOfUnits'];
            if (formData['tools'] || formData['functions']) data['equipment'] = {}
            if (formData['tools']) {
                data['equipment']['tools'] = formData['tools'].map((value) => ({
                    unitPrice: value.unitPrice,
                    id: value._id
                }));
            }
            if (formData['functions']) {
                data['equipment']['functions'] = formData['functions'].map((value) => ({
                    unitPrice: value.unitPrice,
                    id: value._id
                }));
            }
            if (formData['duration']) data.duration = formData['duration'];
            if (formData['unitPrice']) data.unitPrice = formData['unitPrice'];
        }

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
        if (canEdit) {
            setCanEdit(false)
            return
        }

        toggleContractData(null)
        setActionSuccess(false)
        setPaymentSuccess(false)
        setdAppointmentDate(null)
        takeAction({ id: -1 })      // for remove respond state
        payment({ id: -1 })         // for remove respond state
        resetForm()
    };

    const removeFromArray = (arrayName, index) => {
        const newArray = [...formData[arrayName]];
        newArray.splice(index, 1);
        UpdateFormData(arrayName, newArray);
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
            IsImSp() &&
            status === "update-after-first-Payment" &&
            (
                formData['totalPrice'] && formData['totalPrice'] != contract.totalPrice||
                formData['details'] && formData['details'] != contract.details ||
                formData['duration'] && formData['duration'] != contract.duration.value 
            )) ||
        (getType() === "project" &&
            IsImSp() &&
            status === "update-after-first-Payment" &&
            (
                formData['numberOfUnits'] ||
                formData['tools'] ||
                formData['functions'] ||
                formData['duration'] ||
                formData['unitPrice']
            ))


    return (
        <>
            <AddToolUsed onSubmit={(value) => InsertToArray('tools', value)} />
            <FunctionUsed onSubmit={(value) => InsertToArray('functions', value)} />
            <SuccessfullyPosting isShow={actionSuccess} onCancel={toggleDrawer} message="" />
            <SuccessfullyPosting isShow={paymentSuccess} onCancel={toggleDrawer} message="Payment" />
            <Drawer isOpen={!!contractDetails} toggleDrawer={toggleDrawer} name="booking details" header={"booking details"}>
                {
                    contract &&
                    <>
                        <div className='flex flex-col justify-between h-drawer'>
                            <div className={`flex flex-col justify-start items-center px-0 gap-6 mt-10 ${canEdit ? 'hidden' : ''}`}>
                                <section>
                                    {uiStatus()}
                                </section>
                                {
                                    (getType() == "project" || getType() == "rental") &&
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
                                    </section>}
                                <section className='w-full hidden'>
                                    <h2 className='opacity-60 capitalize mb-3'> project type </h2>
                                    <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                        {contract.details}
                                    </span>
                                </section>
                                {
                                    contractDetails.ref &&
                                    <section className='w-full'>
                                        <h2 className='opacity-60 capitalize mb-3'> service type </h2>
                                        <span className='flex flex-col border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                            {getType()}
                                        </span>
                                    </section>
                                }
                                {
                                    contract.details &&
                                    <section className='w-full'>
                                        <h2 className='opacity-60 capitalize mb-3'> project details </h2>
                                        <p className='font-semibold capitalize max-w-[543px]'>
                                            {contract.details}
                                        </p>
                                    </section>
                                }
                                {
                                    contract.attachments?.length > 0 &&
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
                                    </section>
                                }

                                <section className='w-full flex flex-col sm:flex-row justify-between items-start gap-10 sm:gap-3'>
                                    <div className='w-full'>

                                        <div className='w-full'>
                                            <h2 className='opacity-60 capitalize mb-3'> Stage Expiration </h2>
                                            {contract?.actionAt ? <CountdownTimer time={contract?.actionAt} /> : "UNKOWN"}
                                        </div>
                                        
                                            <a
                                                href={contract.address ?`https://www.google.com/maps?q=${contract.location?.lat},${contract.location?.lng}`:null}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='opacity-85 text-base'
                                            >
                                                <div className='w-full mt-5'>
                                                    <h2 className='opacity-60 capitalize mb-3'> Address </h2>
                                                    <div className='flex gap-4'>
                                                        <div>
                                                            <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                                                                <Icon className='text-primary text-2xl size-5' name={"location-dot"} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <span className='opacity-85 text-base line-clamp-2'>
                                                                    { contract.address ? contract.address : "No Address To show"}
                                                                    
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                    </div>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <h2 className='opacity-60 capitalize mb-3'> Total Price </h2>
                                            <span className='font-semibold capitalize mt-3'> {contract.totalPrice} $ </span>
                                        </div>
                                        <div className='w-full mt-5'>
                                            <h2 className='opacity-60 capitalize mb-3'> start date </h2>
                                            <div className='flex gap-4'>
                                                <div>

                                                    <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                                                        <Icon name={"bag"} />
                                                    </div>
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

                            </div>
                            <div className={'flex mx-5 gap-7 mb-10 mt-16 justify-center' + (canEdit ? ' hidden' : '')}>
                                {
                                    (
                                        (status == "pending" && getType() == "producer" && IsImSp()) ||
                                        (status == "update-after-first-Payment" && getType() == "copyrights" && IsImSp()) ||
                                        (status == "update-after-first-Payment" && getType() === "project" && IsImSp())
                                    ) &&
                                    < Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={() => setCanEdit(true)}>
                                        <span className='text-white font-bold capitalize text-lg'>
                                            Edit some Details
                                        </span>
                                    </Button>
                                }
                            </div>
                            {canEdit &&
                                <div>
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
                                        IsImSp() &&
                                        <>
                                            <section className='w-full mt-4'>
                                                <h3 className="capitalize opacity-60">job details</h3>
                                                <textarea
                                                    name="details"
                                                    value={formData.details || contract.details}
                                                    onChange={handleInputChange}
                                                    placeholder="requirements, conditions At least 6 char"
                                                    className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32"
                                                />
                                            </section>
                                            <section className="my-11 w-full">
                                                <section className='mb-4 mt-14'>
                                                    <h3 className="capitalize opacity-60 mb-4">duration by {contract.duration.unit} </h3>
                                                    <input placeholder='duration' type="number" min={0} className={"edit app-field"} value={formData["duration"] || contract.duration.value || ""} onChange={handleInputChange} name="duration" />
                                                </section>
                                                <div className='mb-4 w-full hidden'>
                                                    <h3 className="capitalize opacity-60 mb-4">unit</h3>
                                                    <input
                                                        placeholder='unit'
                                                        type='text'
                                                        name='unit'
                                                        value={formData["unit"] || contract.duration.unit}
                                                        onChange={handleInputChange}
                                                        className="edit app-field"
                                                    />
                                                </div>
                                            </section>
                                            <div className='mb-4 w-full'>
                                                <h3 className="capitalize opacity-60 mb-4">total price</h3>
                                                <input
                                                    placeholder='Total price'
                                                    type='number'
                                                    name='totalPrice'
                                                    value={formData.totalPrice || contract.totalPrice}
                                                    onChange={handleInputChange}
                                                    className="edit app-field"
                                                />
                                            </div>
                                        </>
                                    }
                                    {
                                        status == "update-after-first-Payment" &&
                                        getType() === "project" &&
                                        IsImSp() &&
                                        <>
                                            <section className='mb-4 mt-14'>
                                                <h3 className="capitalize opacity-60 mb-4">duration</h3>
                                                <input placeholder='duration' type="number" min={0} className={"edit app-field"} value={formData["duration"] || contract.duration || ""} onChange={handleInputChange} name="duration" />
                                            </section>
                                            <div className='mb-4 w-full'>
                                                <h3 className="capitalize opacity-60 mb-4">unit Price</h3>
                                                <input
                                                    placeholder='unit price'
                                                    type='text'
                                                    name='unitPrice'
                                                    value={formData["unitPrice"] || contract.projectScale.unitPrice}
                                                    onChange={handleInputChange}
                                                    className="edit app-field"
                                                />
                                            </div>
                                            <section>
                                                <h3 className="capitalize opacity-60 mb-4">number Of Units</h3>
                                                <input placeholder='number Of Units' type="number" min={0} className={"edit app-field"} value={formData["numberOfUnits"] || contract.projectScale.numberOfUnits || ""} onChange={handleInputChange} name="numberOfUnits" />
                                            </section>
                                            <div className='h-divider my-6' />
                                            <section>
                                                <h3 className="capitalize opacity-60 mb-4">Tools Used</h3>
                                                {formData?.tools?.map((tool, i) => (
                                                    <div key={i} className='mb-2'>
                                                        <div className='flex justify-between'>
                                                            <label><strong>Tool: {tool.name}</strong></label>
                                                            <div onClick={() => removeFromArray('tools', i)} className='cursor-pointer'>
                                                                <Icon name='remove' className="size-6 p-1 text-white bg-primary rounded-full" />
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            className="edit app-field"
                                                            value={tool.unitPrice}
                                                            onChange={(e) => handleToolChange(e, i)}
                                                            placeholder="Price"
                                                            min={0}
                                                        />
                                                    </div>
                                                ))}
                                            </section>
                                            <div className='h-divider my-6' />
                                            <section className='mb-4'>
                                                <h3 className="capitalize opacity-60 mb-4">Functions Used</h3>
                                                {formData?.functions?.map((func, i) => (
                                                    <div key={i} className='mb-2'>
                                                        <div className='flex justify-between'>
                                                            <label><strong>Tool: {func.name}</strong></label>
                                                            <div onClick={() => removeFromArray('functions', i)} className='cursor-pointer'>
                                                                <Icon name='remove' className="size-6 p-1 text-white bg-primary rounded-full" />
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            className="edit app-field"
                                                            value={func.unitPrice}
                                                            onChange={(e) => handleFunctionChange(e, i)}
                                                            placeholder="Price"
                                                            min={0}
                                                        />
                                                    </div>
                                                ))}
                                            </section>
                                        </>
                                    }
                                </div>}
                            {canEdit &&
                                <section className='flex mx-5 gap-7 mb-10 mt-16 justify-center'>
                                    <Button isEnabled={UpdateBtn} className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handleUpdate}>
                                        <span className='text-white font-bold capitalize text-lg'>
                                            Update Appointment
                                        </span>
                                    </Button>
                                </section>
                            }

                            {!canEdit &&
                                <section className="w-full">
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
                            }
                        </div>
                    </>

                }
            </Drawer >
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    contractDetails: state.ContractDetails,
    takeAction_respond: state.api.takeAction,
    payment_respond: state.api.payment,
    addprojectState: state.addproject,

});

const mapDispatchToProps = {
    toggleContractData,
    takeAction,
    getAllContracts,
    payment,
    UpdateFormData,
    InsertToArray,
    resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveProjectFiles);

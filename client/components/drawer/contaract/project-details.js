import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Popup from '../../elements/popup';
import Button from '../../elements/button';
import Icon from '../../Icons';
import Drawer from '../../elements/drawer';
import { connect } from 'react-redux';
import { toggleContractData } from '../../../redux/action/contractDetails';
import dateFormat from "dateformat";
import { takeAction } from '../../../redux/action/apis/contracts/takeaction';
import { acceptFiles } from '../../../redux/action/apis/contracts/acceptFiles';
import SuccessfullyPosting from '../../popsup/post_successfully_posting';
import { payment } from '../../../redux/action/apis/contracts/pay';
import SelectDate from '../../elements/selectDate';
import { getAllContracts } from '../../../redux/action/apis/contracts/getall';
import CountdownTimer from '../../elements/CounterDownTimer';
import FunctionUsed from '../../popsup/create/FunctionsUsed';
import AddToolUsed from '../../popsup/create/addToolUsed';
import { InsertToArray, UpdateFormData, resetForm } from '../../../redux/action/logic/forms/Addproject';
import TimeLeft from '../../pages/contracts/TimeLeft';
import { RateContract } from '../../../redux/action/apis/rateContract';
import { GetContract } from '../../../redux/action/apis/contracts/getOne';
import RatingProject from '../../popsup/ratingProject';
import { OpenPopUp,ClosePopUp  } from '../../../util/util';
import { useTranslation } from 'react-i18next';
import ProjectView from './ProjectView'
import RentalView from './RentalView'
import ProducerView from './ProducerView'
import CopywriterView from './CopywriterView'
import TeamView from './TeamView'
import ReportContract from '../../popsup/report-contract';
import Loading from '../../elements/loading';
import DuvduLoading from '../../elements/duvduLoading';
import ErrorMessage from '../../elements/ErrorMessage';
import Uploading from '../../../components/popsup/uploading_project_files';

function ReceiveProjectFiles({
    getAllContracts,
    contractDetails,
    toggleContractData,
    takeAction,
    takeAction_respond,
    GetContract,
    contract_respond,
    payment,
    payment_respond,
    addprojectState,
    UpdateFormData,
    InsertToArray,
    resetForm,
    submitFile_respond,
    acceptFiles_respond,
    acceptFiles,
    report_respond,
    user }) {
    const router = useRouter();
    const contractId  = router.query
    useEffect(() => {
        if (contractId.contract) {
            GetContract(contractId.contract);
        }
    }, [contractId.contract]);

    const { t } = useTranslation();
    const formData = addprojectState?.formData
    const contract = contract_respond?.data?.contract;
    const customer = contract_respond?.data?.customer;
    const sp = contract_respond?.data?.sp;
    const status = contract?.status
    const [timeLeft, setTimeLeft] = useState("");
    const [paymentError ,setPaymentError] = useState(null)
    const [actionError ,setActionError] = useState(null)
    const [actionSuccess, setActionSuccess] = useState(false);
    const [submitFileSuccess, setSubmitFileSuccess] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [appointmentDate, setdAppointmentDate] = useState(null);
    const [actionAccept , setActionAccept] = useState(false)
    console.log({paymentError , contract , actionError})
    const [canEdit, setCanEdit] = useState(null);

    const NormalState = ({ value }) => (
        <span className='text-4xl'>
            {value}
        </span>
    );
    const IsImSp = () => {
        return sp?.username == user?.username
    }
    const getType = () => {
        if (contract_respond?.data?.ref.includes("copyright"))
            return "copyrights"
        else if (contract_respond?.data?.ref.includes("rental"))
            return "rental"
        else if (contract_respond?.data?.ref.includes("producer"))
            return "producer"
        else if (contract_respond?.data?.ref.includes("project"))
            return "project"
        else if (contract_respond?.data?.ref.includes("team"))
            return "team"
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
                return getType() == "rental" && <TimeLeft data={items} msgstatus={status} />;
            case 'waiting-for-pay-10':
                return (getType() == "project" || getType() == "copyrights")&& <TimeLeft data={items} msgstatus={status} />;
            case 'update-after-first-Payment':
                return (getType() == "project" || getType() == "copyrights")&& <TimeLeft data={items} msgstatus={status} />;
            case 'waiting-for-total-payment':
                return (getType() == "project" || getType() == "copyrights" || getType()==='team')&&  <TimeLeft data={items} msgstatus={status} />;
            case 'accepted-with-update':
                return (getType() == "producer") && <TimeLeft data={items} msgstatus={status} />;
            case 'ongoing':
                return (getType() !== "producer") && <TimeLeft data={items} msgstatus={status} />;
            // case 'completed':
            //     return <NormalState value={"Completed"} />;
            // case 'rejected':
            //     return <NormalState value={"Rejected"} />;
            // case 'canceled':
            //     return <NormalState value={"Canceled"} />;
            // case 'accepted':
            //     return <NormalState value={"Accepted"} />;
            default:
                return "";
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
        if (takeAction_respond?.message) {
            getAllContracts()
            toggleDrawer()
            setActionSuccess(true)
        }
    }, [takeAction_respond?.message]);
    useEffect(() => {
        if (submitFile_respond?.message) {
            getAllContracts()
            toggleDrawer()
            ClosePopUp('uploading_project_files')
            setSubmitFileSuccess(true)
        }
    }, [submitFile_respond?.message]);
    useEffect(() => {
        UpdateFormData("functions", contract?.functions)
        UpdateFormData("tools", contract?.tools)
    }, [contract?.tools, contract?.functions]);
    useEffect(()=>{
        if(payment_respond?.error){
            const convertPaymentError = JSON.parse(payment_respond?.error ?? null)
            setPaymentError(convertPaymentError)
            const timer = setTimeout(() => {
                setPaymentError(null)
            },5000)
            return () => clearTimeout(timer);
        }
        if(takeAction_respond?.error){
            var convertActionError = JSON.parse(takeAction_respond?.error ?? null)
            setActionError(convertActionError)
            const timer2 = setTimeout(() => {
                setActionError(null)
            },5000)
            return () => clearTimeout(timer2);
        }   
    },[payment_respond?.error , takeAction_respond?.error])
    useEffect(() => {
        if (payment_respond?.data || payment_respond?.message) {
            getAllContracts()
            toggleDrawer()
            setPaymentSuccess(true)
        }
    }, [payment_respond?.data || payment_respond?.message]);
    useEffect(() => {
        if (acceptFiles_respond?.data || acceptFiles_respond?.message) {
            toggleDrawer()
        }
    }, [acceptFiles_respond?.data || acceptFiles_respond?.message]);
    useEffect(() => {
        if (report_respond?.data || report_respond?.message) {
            toggleDrawer()
            ClosePopUp('report-contract')
        }
    }, [report_respond?.data || report_respond?.message]);

    useEffect(() => {
        if (getType() == "producer") {
            setdAppointmentDate(contract?.appointmentDate)
        }
        else {
            setdAppointmentDate(null)
        }

    }, [contract_respond?.data?._id]);


    useEffect(() => {
        if (!contract?.deadline) return
        const interval = setInterval(() => {
            const now = new Date();
            const deadline = new Date(contract?.deadline);
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
        setActionAccept(true)
        if (!contract_respond?.data?.ref) return
        const type = getType()
        takeAction({ id: contract?._id, data: true, type: type })
    };
    const handleAcceptFiles = () => {
        if (!contract_respond?.data?.ref) return
        acceptFiles({ id: contract?._id, data:{reference: contract_respond?.data?.ref}})
    };
    
    const handleCancel = () => {
        setActionAccept(true)
        if (!contract_respond?.data?.ref) return
        const type = getType()
        takeAction({ id: contract?._id, data: 'cancel', type: type })
    };

    const handleUpdate = () => {
        setActionAccept(false)
        if (!contract_respond?.data?.ref) return
        const type = getType()

        const data = {}
        if (type === 'producer'){
            if(appointmentDate !== contract?.appointmentDate)
            data['appointmentDate'] = appointmentDate
        }
        if (type == "copyrights") {
            data['details'] = formData['details']
            data['totalPrice'] = formData['totalPrice']
            data['duration'] = {
                value: formData['duration'],
                unit: contract?.duration.unit
            }
        }
        else {
            if (formData['numberOfUnits']) data['projectScale.numberOfUnits'] = formData['numberOfUnits'];
            if (formData['tools'] || formData['functions']) data['equipment'] = {}
            if (formData['tools'] && formData['tools'].length>0) {
                data['equipment']['tools'] = formData['tools'].map((value) => ({
                    unitPrice: value.unitPrice,
                    id: value._id
                }));
            }
            if (formData['functions']  && formData['functions'].length>0) {
                data['equipment']['functions'] = formData['functions'].map((value) => ({
                    unitPrice: value.unitPrice,
                    id: value._id
                }));
            }
            if (formData['duration']) data.duration = formData['duration'];
            if (formData['unitPrice']) data.unitPrice = formData['unitPrice'];
        }

        takeAction({ id: contract?._id, data: data, type: type, isUpdate: true })
    };

    const handlePayment = () => {
        setActionAccept(true)
        const type = getType()
        payment({ id: contract?.paymentLink, type: type })
    };

    const openReview = () => {
        OpenPopUp('Rating-project')
    };
    const openComplain = () => {
        OpenPopUp('report-contract')
    };
    const openSubmitFiles = ()=>{
        OpenPopUp('uploading_project_files')
    }
    const handleRefuse = () => {
        if (!contract_respond?.data?.ref) return
        const type = getType()
        takeAction({ id: contract?._id, data: false, type: type })
    };
    const toggleDrawer = () => {
        if (canEdit) {
            setCanEdit(false)
            return
        }
        router.push('/contracts')
        toggleContractData(null)
        setActionSuccess(false)
        setSubmitFileSuccess(false)
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

    const acceptBtn = (IsImSp() && status === "pending") || (IsImSp() && status === "update-after-first-Payment") || (!IsImSp() && status === "accepted with update")
    const refuse = (IsImSp() && status === "pending") || (IsImSp() && status === "update-after-first-Payment") || (!IsImSp() && status === "accepted with update")
    const cancle = (!IsImSp() && status === "pending")
    const canReview = (!IsImSp() && (status === "completed" || status === "accepted"))
    const canSubmitFile = (IsImSp() && status === "ongoing" && !contract?.submitFiles?.link && (getType() === "project"  || getType() === "copyrights"  || getType() === "team" ))
    const canAnswerSubmitFile = (!IsImSp() && status === "ongoing" && contract?.submitFiles?.link && (getType() === "project"  || getType() === "copyrights"  || getType() === "team" ))
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
                formData['totalPrice'] && formData['totalPrice'] != contract?.totalPrice ||
                formData['details'] && formData['details'] != contract?.details ||
                formData['duration'] && formData['duration'] != contract?.duration.value
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
            <SuccessfullyPosting isShow={paymentSuccess} onCancel={toggleDrawer} message="Payment" />
            {/* <SuccessfullyPosting isShow={actionSuccess} onCancel={toggleDrawer} message="Action" /> */}
            <SuccessfullyPosting isShow={submitFileSuccess} onCancel={toggleDrawer} message="Submit File" />
            <RatingProject data={contract}/>
            <ReportContract data={contract} />
            <Uploading type={getType()} id={contractId.contract} />
            
            <Drawer isOpen={contractId.contract} toggleDrawer={toggleDrawer} name={t("booking details")} header={t("booking details")}>
                {
                    contract_respond?.loading?
                    <DuvduLoading loadingIn={""} type={'contractDetails'}/>:
                    <>
                        <div className='flex flex-col justify-between h-drawer'>
                            <div className={`flex flex-col justify-start items-center px-0 gap-6 ${canEdit ? 'hidden' : ''}`}>
                                <section>
                                    {uiStatus()}
                                </section>
                                {
                                    (getType() == "project" || getType() == "rental") &&
                                    <section className='w-full flex-col'>
                                        <h2 className='opacity-60 capitalize mb-3'>{t("original project")}</h2>
                                        <div className='w-full'>
                                            <div className="h-20 w-full rounded-full relative overflow-hidden">
                                                <img className="absolute -translate-y-1/2 blur-sm" src='/assets/imgs/projects/2.jpeg' />
                                                <div className="absolute z-20 flex items-center w-full h-full p-7">
                                                    <div className="w-full text-center p-20">
                                                        <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{contract?.project}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>}
                                <section className='grid md:grid-cols-2 w-full'>
                                <div>
                                    <h2 className='opacity-60 capitalize mb-3'>{t("status")}</h2>
                                    <span className='font-semibold capitalize max-w-[543px]'>
                                    {t(status)}
                                    </span>
                                </div>
                                {status ==='rejected' && 
                                <div>
                                    <h2 className='opacity-60 capitalize mb-3'>{t("rejected by")}</h2>
                                    <span className='font-semibold capitalize max-w-[543px]'>
                                    {contract?.rejectedBy}
                                    </span>
                                </div>
                                }
                                </section>

                                <section className='grid md:grid-cols-2 w-full'>
                                {contract_respond?.data?.ref &&
                                    <div>
                                        <h2 className='opacity-60 capitalize mb-3'>{t("contract type")}</h2>
                                        <span className='font-semibold capitalize max-w-[543px]'>
                                        {getType()}
                                        </span>
                                    </div>
                        }
                                {(getType() == "project" || getType() == "rental") &&
                                    <div>
                                        <h2 className='opacity-60 capitalize mb-3'>{t("Custom Requirements")}</h2>
                                        <span className='font-semibold max-w-[543px]'>
                                        {contract?.projectScale.numberOfUnits} {contract?.projectScale.unit}
                                        </span>
                                    </div>
                                }
                                </section>   
                                 {/* Project  */}
                                {(getType() == "project") && 
                                <>
                                <ProjectView contract={contract}/>
                                </>
                                }
                                {(getType() == "rental") && 
                                <>
                                <RentalView contract={contract}/>
                                </>
                                }
                                {(getType() == "producer") && 
                                <>
                                <ProducerView contract={contract}/>
                                </>
                                }
                                {(getType() == "copyrights") && 
                                <>
                                <CopywriterView contract={contract}/>
                                </>
                                }
                                {(getType() == "team") && 
                                <>
                                <TeamView contract={contract}/>
                                </>
                                }
                                {contract?.submitFiles?.link && 
                                <section className='w-full'>
                                    <h2 className='opacity-60 capitalize mb-3'>{t("Submit Files Link")}</h2>
                                    <a className='font-semibold max-w-[543px]' href={contract?.submitFiles.link} target="_blank">
                                        {contract?.submitFiles.link}
                                    </a>
                                </section>                                
                                }
                                {contract?.submitFiles?.notes && 
                                <section className='w-full'>
                                    <h2 className='opacity-60 capitalize mb-3'>{t("Submit Files Notes")}</h2>
                                    <span className='font-semibold capitalize max-w-[543px]'>
                                    {contract?.submitFiles?.notes}
                                    </span>
                                </section>                                
                                }
                                {
                                    contract?.attachments?.length > 0 &&
                                    <section className='w-full'>
                                        <h2 className='opacity-60 capitalize'>{t("Project Attachments")}</h2>
                                        {contract?.attachments.map((attachment, index) =>
                                            <div key={index} className='flex gap-3 items-start p-4 bg-white dark:bg-[#1A2024] rounded-md border border-[#CACACA] dark:border-opacity-25 mt-3'>
                                                <Icon key={index} name={'file'} className='size-5' />
                                                <div className='flex flex-col'>
                                                    <span className='text-[#353535] dark:text-white text-[14px] font-medium'> {attachment.split('/').pop()} </span>
                                                    <span className='text-[#989692] text-[12px]'> </span>
                                                    <a href={attachment} target="_blank" rel="noopener noreferrer" className='text-primary font-semibold text-[14px]'>{t("Click to view")}</a>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                }

                            </div>
                            <div className={'flex mx-5 gap-7 mt-16 justify-center' + (canEdit ? ' hidden' : '')}>
                                {
                                    (
                                        (status == "pending" && getType() == "producer" && IsImSp()) ||
                                        (status == "update-after-first-Payment" && getType() == "copyrights" && IsImSp()) ||
                                        (status == "update-after-first-Payment" && getType() === "project" && IsImSp())
                                    ) &&
                                    < button className="rounded-full border-2 border-solid border-primary w-full h-[66px] text-primary text-lg font-bold mt-2" shadow={true} shadowHeight={"14"} onClick={() => setCanEdit(true)}>
                                        {t("Edit some Details")}
                                    </button>
                                }
                            </div>
                            {canEdit &&
                                <div>
                                    {
                                        status == "pending" &&
                                        getType() == "producer" &&
                                        IsImSp() &&
                                        <section className="my-11 w-full">
                                            <h3 className="capitalize opacity-60 mb-4">{t("appointment Date")}</h3>
                                            <SelectDate value={appointmentDate} onChange={(value) => setdAppointmentDate(value)} />
                                        </section>
                                    }
                                    {
                                        status == "update-after-first-Payment" &&
                                        getType() == "copyrights" &&
                                        IsImSp() &&
                                        <>
                                            <section className='w-full mt-4'>
                                                <h3 className="capitalize opacity-60">{t("job details")}</h3>
                                                <textarea
                                                    name="details"
                                                    value={formData.details || contract?.details}
                                                    onChange={handleInputChange}
                                                    placeholder={t("requirements, conditions")}
                                                    className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32"
                                                />
                                            </section>
                                            <section className="my-11 w-full">
                                                <section className='mb-4 mt-14'>
                                                    <h3 className="capitalize opacity-60 mb-4">duration by {contract?.duration.unit} </h3>
                                                    <input placeholder={t("duration")} type="number" min={0} className={"edit app-field"} value={formData["duration"] || contract?.duration.value || ""} onChange={handleInputChange} name="duration" />
                                                </section>
                                                <div className='mb-4 w-full hidden'>
                                                    <h3 className="capitalize opacity-60 mb-4">{t("unit")}</h3>
                                                    <input
                                                        placeholder={t("unit")}
                                                        type='text'
                                                        name='unit'
                                                        value={formData["unit"] || contract?.duration.unit}
                                                        onChange={handleInputChange}
                                                        className="edit app-field"
                                                    />
                                                </div>
                                            </section>
                                            <div className='mb-4 w-full'>
                                                <h3 className="capitalize opacity-60 mb-4">{t("total price")}</h3>
                                                <input
                                                    placeholder={t("Total price")}
                                                    type='number'
                                                    name='totalPrice'
                                                    value={formData.totalPrice || contract?.totalPrice}
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
                                                <h3 className="capitalize opacity-60 mb-4">{t("duration")}</h3>
                                                <input placeholder={t("duration")} type="number" min={0} className={"edit app-field"} value={formData["duration"] || contract?.duration || ""} onChange={handleInputChange} name="duration" />
                                            </section>
                                            <div className='mb-4 w-full'>
                                                <h3 className="capitalize opacity-60 mb-4">{t("unit Price")}</h3>
                                                <input
                                                    placeholder={t("unit price")}
                                                    type='text'
                                                    name='unitPrice'
                                                    value={formData["unitPrice"] || contract?.projectScale.unitPrice}
                                                    onChange={handleInputChange}
                                                    className="edit app-field"
                                                />
                                            </div>
                                            <section>
                                                <h3 className="capitalize opacity-60 mb-4">{t("number Of Units")}</h3>
                                                <input placeholder={t("number Of Units")} type="number" min={0} className={"edit app-field"} value={formData["numberOfUnits"] || contract?.projectScale.numberOfUnits || ""} onChange={handleInputChange} name="numberOfUnits" />
                                            </section>
                                            {formData?.tools?.length>0 && 
                                            <>
                                            <div className='h-divider my-6' />
                                            <section>
                                                <h3 className="capitalize opacity-60 mb-4">{t("Tools Used")}</h3>
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
                                                            placeholder={t("Price")}
                                                            min={0}
                                                        />
                                                    </div>
                                                ))}
                                            </section>
                                            </>
                                            }
                                            {formData?.functions?.length>0 && 
                                            <>
                                            <div className='h-divider my-6' />
                                            <section className='mb-4'>
                                                <h3 className="capitalize opacity-60 mb-4">{t("Functions Used")}</h3>
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
                                                            placeholder={t("Price")}
                                                            min={0}
                                                        />
                                                    </div>
                                                ))}
                                            </section>
                                            </>
                                            }
                                        </>
                                    }
                                </div>}
                                {(paymentError?.errors || actionError?.errors) && 
                                <div className='text-center'>
                                    {paymentError?.errors && 
                                    <ErrorMessage ErrorMsg={paymentError?.errors[0]?.message}/>
                                    }
                                    {actionError?.errors && 
                                    <ErrorMessage ErrorMsg={actionError?.errors[0]?.message}/>
                                    }
                                </div>
                                }
                            {canEdit &&
                                <section className='flex mx-5 gap-7 mb-10 mt-16 justify-center'>
                                    <Button isEnabled={UpdateBtn} className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handleUpdate}>
                                        {takeAction_respond?.loading?
                                        <Loading/>
                                        :
                                        <span className='text-white font-bold capitalize text-lg'>{t("Update Appointment")}</span>
                                        }
                                    </Button>
                                </section>
                            }
                            {canReview &&
                                <section className='flex mx-5 gap-7 justify-center'>
                                    <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={openReview}>
                                        <span className='text-white font-bold capitalize text-lg'>{t("review")}</span>
                                    </Button>
                                </section>
                            }

                            {!canEdit &&
                                <section className="w-full">
                                    <div className='flex mx-5 gap-7 mb-10 mt-10 justify-center'>
                                        {
                                            acceptBtn &&
                                            <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handleAccept}>
                                                {takeAction_respond?.loading && actionAccept?
                                                    <Loading/>
                                                :
                                                    <span className='text-white font-bold capitalize text-lg'>{t("Accept")}</span>
                                                }
                                            </Button>
                                        }
                                        {
                                            refuse &&
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                               {takeAction_respond?.loading && !actionAccept ? 
                                                <Loading/>
                                                :
                                                t("Refuse")}
                                                </button>
                                        }
                                        {cancle && 
                                         <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleCancel}>
                                         {takeAction_respond?.loading  ? 
                                            <Loading/>
                                            :
                                            t("Cancel")}
                                            </button>
                                            }
                                    </div>
                                    {
                                        !IsImSp() &&
                                        status == "waiting-for-pay-10"&&
                                        <div className='flex mx-5 gap-7 mb-10 mt-10 justify-center'>
                                            <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                            {payment_respond?.loading && actionAccept ? 
                                                <Loading/>
                                                :
                                                <span className='text-white font-bold capitalize text-lg'>{t("Pay Now 10%")}</span>
                                                }

                                            </Button>
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                            {takeAction_respond?.loading && !actionAccept ? 
                                                <Loading/>
                                                :
                                                t("Refuse")}
                                            </button>
                                        </div>
                                    }
                                    {
                                        !IsImSp() && getType() !== 'team' && status == "waiting-for-total-payment" &&
                                        <div className='flex items-center justify-center mx-5 gap-7 mb-10 mt-10'>
                                            <Button isEnabled={(new Date(appointmentDate).getDate() >= new Date().getDate())|| true} className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                                {payment_respond?.loading && actionAccept ? 
                                                    <Loading/>
                                                    :
                                                    <span className='text-white font-bold capitalize text-lg'>{t("Pay Now remain ( 90 % )")}</span>
                                                }
                                            </Button>
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                            {takeAction_respond?.loading && !actionAccept ? 
                                                <Loading/>
                                                :
                                                t("Refuse")}
                                            </button>
                                        </div>
                                    }
                                    {
                                        !IsImSp() && getType() === 'team' && status == "waiting-for-total-payment" &&
                                        <div className='flex items-center justify-center mx-5 gap-7 mb-10 mt-10'>
                                            <Button isEnabled={(new Date(appointmentDate).getDate() >= new Date().getDate())||true} className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                                {payment_respond?.loading && actionAccept ? 
                                                    <Loading/>
                                                    :
                                                <span className='text-white font-bold capitalize text-lg'>{t("Pay Now remain ( 100 % )")}</span>
                                                }
                                            </Button>
                                        </div>
                                    }
                                    {
                                        !IsImSp() && status == "waiting-for-payment" &&
                                        <div className='flex mx-5 gap-7 mb-10 mt-10 justify-center'>
                                            <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                            {payment_respond?.loading && actionAccept ? 
                                                <Loading/>
                                                :
                                                <span className='text-white font-bold capitalize text-lg'>{t("Pay Now")}</span>
                                            }
                                            </Button>
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                            {takeAction_respond?.loading && !actionAccept ? 
                                                <Loading/>
                                                :
                                                t("Refuse")
                                            }
                                            </button>
                                        </div>

                                    }
                                    {
                                        !status?.includes("waiting-for-pay") && false &&
                                        <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-16 max-w-[345px] mx-auto flex items-center justify-center">{t("Cancel")}</button>
                                    }
                                    {canAnswerSubmitFile &&
                                        <section className='flex mx-5 gap-7 mb-10 justify-center'>
                                            <Button className="w-full" shadow={true} shadowHeight={"14"} onClick={handleAcceptFiles}>
                                                {acceptFiles_respond?.loading ?
                                                    <Loading/>
                                                :
                                                    <span className='text-white font-bold capitalize text-lg'>{t("Accept Files")}</span>
                                                }
                                            </Button>
                                        </section>
                                    }
                                    {canSubmitFile && !contract?.submitFiles?.link && 
                                    <section className='flex mx-5 gap-7 mb-10 justify-center'>
                                        <Button className="w-full" shadow={true} shadowHeight={"14"} color={"#5666F7"}  onClick={openSubmitFiles}>
                                            <span className='text-white font-bold capitalize text-lg'>{t("submit files")}</span>
                                        </Button>
                                    </section>
                                    }

                                    {
                                    <section className='flex mx-5 gap-7 mb-10 justify-center'>
                                        <Button className="w-full" shadow={true} shadowHeight={"14"} color={"#D30000"}  onClick={openComplain}>
                                            <span className='text-white font-bold capitalize text-lg'>{t("Report")}</span>
                                        </Button>
                                    </section>
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
    contract_respond: state.api.GetContract,
    contractDetails: state.contractDetails,
    takeAction_respond: state.api.takeAction,
    payment_respond: state.api.payment,
    addprojectState: state.addproject,
    rateContract_respond: state.api.RateContract,
    submitFile_respond:state.api.submitFile,
    acceptFiles_respond:state.api.acceptFiles,
    report_respond: state.api.contractReport,

});

const mapDispatchToProps = {
    toggleContractData,
    takeAction,
    acceptFiles,
    getAllContracts,
    payment,
    UpdateFormData,
    InsertToArray,
    RateContract,
    resetForm,
    GetContract
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveProjectFiles);

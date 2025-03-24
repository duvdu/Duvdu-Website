import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Popup from '../../elements/popup';
import Button from '../../elements/button';
import Icon from '../../Icons';
import Drawer from '../../elements/drawer';
import { connect } from 'react-redux';
import { toggleContractData } from '../../../redux/action/contractDetails';
import dateFormat from "dateformat";
import { takeAction } from '../../../redux/action/apis/contracts/takeaction';
import { resNewDeadline } from '../../../redux/action/apis/contracts/resNewDeadline';
import { acceptFiles , acceptAllFiles } from '../../../redux/action/apis/contracts/acceptFiles';
import SuccessfullyPosting from '../../popsup/post_successfully_posting';
import { payment } from '../../../redux/action/apis/contracts/pay';
import SelectDate from '../../elements/selectDate';
import { getAllContracts } from '../../../redux/action/apis/contracts/getall';
import CountdownTimer from '../../elements/CounterDownTimer';
import FunctionUsed from '../../popsup/create/FunctionsUsed';
import AddToolUsed from '../../popsup/create/addToolUsed';
import QrCode from '../../popsup/QR_code';
import { InsertToArray, UpdateFormData, resetForm } from '../../../redux/action/logic/forms/Addproject';
import TimeLeft from '../../pages/contracts/TimeLeft';
import { GetContract } from '../../../redux/action/apis/contracts/getOne';
import { GetComplaint } from '../../../redux/action/apis/contracts/complaint';
import RatingContract from '../../popsup/ratingcontract';
import { OpenPopUp,ClosePopUp  } from '../../../util/util';
import { useTranslation } from 'react-i18next';
import ProjectView from './ProjectView'
import RentalView from './RentalView'
import ProducerView from './ProducerView'
import CopywriterView from './CopywriterView'
import TeamView from './TeamView'
import ReportContract from '../../popsup/report-contract';
import AskForCancelContract from '../../popsup/askForCancel';
import AskForNewDeadline from '../../popsup/askForNewDeadline';
import Loading from '../../elements/loading';
import DuvduLoading from '../../elements/duvduLoading';
import ErrorMessage from '../../elements/ErrorMessage';
import Uploading from '../../../components/popsup/uploading_project_files';
import SendReason from '../../../components/popsup/sendReason';

function ReceiveProjectFiles({
    getAllContracts,
    contractDetails,
    toggleContractData,
    takeAction,
    resNewDeadline,
    resNewDeadline_respond,
    takeAction_respond,
    GetContract,
    GetComplaint,
    contract_respond,
    complaint_respond,
    payment,
    payment_respond,
    addprojectState,
    UpdateFormData,
    InsertToArray,
    resetForm,
    submitFile_respond,
    acceptFiles_respond,
    acceptAllFiles_respond,
    acceptFiles,
    acceptAllFiles,
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
    const complaint = complaint_respond?.data
    const sp = contract_respond?.data?.sp;
    const status = contract?.status
    const [timeLeft, setTimeLeft] = useState("");
    const [textCopied, setTextCopied] = useState("");
    const [paymentError ,setPaymentError] = useState(null)
    const [actionError ,setActionError] = useState(null)
    const [resNewDeadlineError ,setResNewDeadlineError] = useState(null)
    const [actionSuccess, setActionSuccess] = useState(false);
    const [submitFileSuccess, setSubmitFileSuccess] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [appointmentDate, setdAppointmentDate] = useState(null);
    const [actionAccept , setActionAccept] = useState(null)
    const [canEdit, setCanEdit] = useState(null);
    const [field, setField] = useState(null);
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

    useEffect(() => {
        if (contractId?.contract && status==='complaint') {
            GetComplaint(contractId.contract)
        }
    }, [contractId.contract , status]);
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
            case 'accepted with update':
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
        if (resNewDeadline_respond?.message) {
            getAllContracts()
            toggleDrawer()
            setActionSuccess(true)
        }
    }, [resNewDeadline_respond?.message]);
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
        if(resNewDeadline_respond?.error){
            var convertResNewDeadlineError = JSON.parse(resNewDeadline_respond?.error ?? null)
            console.log({convertResNewDeadlineError})
            setResNewDeadlineError(convertResNewDeadlineError?.data)
            const timer2 = setTimeout(() => {
                setResNewDeadlineError(null)
            },5000)
            return () => clearTimeout(timer2);
        }   
    },[payment_respond?.error , takeAction_respond?.error , resNewDeadline_respond?.error])
    useEffect(() => {
        if (payment_respond?.data || payment_respond?.message) {
            getAllContracts()
            toggleDrawer()
            setPaymentSuccess(true)
        }
    }, [payment_respond?.data || payment_respond?.message]);
    useEffect(() => {
        if (acceptFiles_respond?.data || acceptFiles_respond?.message) {
            getAllContracts()
            toggleDrawer()
            ClosePopUp('send_reason')
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
      if(!user.faceRecognition){
            OpenPopUp("face-verification");
        }else if(user?.avaliableContracts==0){
            OpenPopUp("contract_subscription")
        }else{
            setActionAccept('accept')
            if (!contract_respond?.data?.ref) return
            const type = getType()
            takeAction({ id: contract?._id, data: true, type: type })
        }
    };
    const handleResNewDeadline = (type)=>{
        if(type === 'accept'){
            setActionAccept('accept')
            resNewDeadline({id:contract?._id,data:{status:"approved"},type: getType()})
        }else{
            setActionAccept('reject')
            resNewDeadline({id:contract?._id,data:{status:"rejected"},type: getType()})
        }
    }
    const handleAcceptFiles = (field) => {
        setActionAccept('accept')
        acceptFiles({ id: contract?._id, field ,type:getType(), data:{ status:'approved' }})
    };    
    const handleAcceptAllFiles = (field) => {
        setActionAccept('accept')
        acceptAllFiles({ id: contract?._id})
    };    
    const handleCancel = () => {
        setActionAccept('cancel')
        if (!contract_respond?.data?.ref) return
        const type = getType()
        takeAction({ id: contract?._id, data: 'cancel', type: type })
    };
    
    const handleUpdate = () => {
        setActionAccept('update')
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
            if (formData['numberOfUnits']) data['numberOfUnits'] = formData['numberOfUnits'];
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
            if(!formData['tools'] && !formData['functions']) delete data['equipment']
            if (formData['duration']) data.duration = formData['duration'];
            if (formData['unitPrice']) data.unitPrice = formData['unitPrice'];
        }

        takeAction({ id: contract?._id, data: data, type: type, isUpdate: true })
    };

    const handlePayment = () => {
        setActionAccept('payment')
        const type = getType()
        payment({ id: contract?.paymentLink, type: type })
    };

    const openSendReason = (id) => {
        setField(id)
        OpenPopUp('send_reason')
    };
    const openReview = () => {
        OpenPopUp('Rating-contract')
    };
    const openAskForNewDeadline = () => {
        OpenPopUp('ask-for-new-deadline')
    };
    const openAskForCancel = () => {
        OpenPopUp('ask-for-cancel')
    };
    const openComplain = () => {
        OpenPopUp('report-contract')
    };
    const openSubmitFiles = ()=>{
        OpenPopUp('uploading_project_files')
    }
    const openQR = ()=>{
        OpenPopUp('QR-code')
    }
    const handleRefuse = () => {
        setActionAccept('refuse')
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
    const cancel = (!IsImSp() && status === "pending")
    const canReview = (!IsImSp() && (status === "completed" || status === "accepted") && !contract_respond?.data?.hasReview)
    const canSubmitFile = (IsImSp() && status === "ongoing" && (getType() === "project"  || getType() === "copyrights"  || getType() === "team" ))
    const canAnswerSubmitFile = (!IsImSp() && status === "ongoing" && (getType() === "project"  || getType() === "copyrights"  || getType() === "team" ))
    const canAnswerViewQR = (IsImSp() && getType() === "rental" && status === "ongoing" && !contract?.qrCodeVerification)
    const canUpdateData = (
        (status == "pending" && getType() == "producer" && IsImSp()) ||
        (status == "update-after-first-Payment" && getType() == "copyrights" && IsImSp()) ||
        (status == "update-after-first-Payment" && getType() === "project" && IsImSp())
    )

    const canHeightData = (
        (status == "waiting-for-total-payment" && getType() === "project" && !IsImSp()) ||
        (status == "accepted with update" && getType() === "producer" && !IsImSp()) ||
        (status == "waiting-for-total-payment" && getType() === "copyrights" && !IsImSp())
    )

    const canViewUserInfo =
        (getType() === "producer" && (
            status !== "pending" ||
            status !== "canceled" ||
            status !== "rejected" ||
            status !== "complaint" 
        ))||
        (getType() === "copyrights" && (
            status !== "pending" ||
            status !== "canceled" ||
            status !== "waiting-for-pay-10" ||
            status !== "rejected" ||
            status !== "complaint" 
        ))||
        (getType() === "project" && (
            status !== "pending" ||
            status !== "canceled" ||
            status !== "waiting-for-pay-10" ||
            status !== "rejected" ||
            status !== "complaint" 
        ))||
        (getType() === "rental" && (
            status !== "pending" ||
            status !== "canceled" ||
            status !== "waiting-for-payment" ||
            status !== "rejected" ||
            status !== "complaint" 
        ))||
        (getType() === "team" && (
            status !== "pending" ||
            status !== "canceled" ||
            status !== "waiting-for-total-payment" ||
            status !== "rejected" ||
            status !== "complaint" 
        ))
    
    const casAskForNewDeadline = !IsImSp() && contract?.requestedDeadline?.deadline == null && (getType() === "project" || getType() === "copyrights" || getType() === "team")
    const canResToNewDeadline = !IsImSp() && contract?.requestedDeadline?.deadline == !null && contract?.requestedDeadline?.status == 'pending' && (getType() === "project" || getType() === "copyrights" || getType() === "team")
    const canAskCancel =
    !contract_respond?.data?.haveCancleRequest &&(
        (getType() === "copyrights" && (
            status == "update-after-first-Payment" ||
            status == "waiting-for-total-payment" ||
            status == "ongoing"
        ))||
        (getType() === "project" && (
            status == "update-after-first-Payment" ||
            status == "waiting-for-total-payment" ||
            status == "ongoing" 
        ))||
        (getType() === "rental" && (
            status == "ongoing"
        ))||
        (getType() === "team" && (
            status == "ongoing" 
        ))
    )

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
            const formatDate = (isoString) => {
                const date = new Date(isoString);
              
                // Extract components
                const day = String(date.getUTCDate()).padStart(2, "0");
                const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
                const year = date.getUTCFullYear();
                let hours = date.getUTCHours();
                const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                const ampm = hours >= 12 ? "PM" : "AM";
              
                // Convert to 12-hour format
                hours = hours % 12 || 12;
              
                return `${day}/${month}/${year} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
            };
              const copyToClipboard = (text) => {
                navigator.clipboard.writeText(text).then(() => {
                    setTextCopied(text)
                    setTimeout(()=>{
                        setTextCopied('')
                    },3000)
                });
            };
            
            
    return (
        <>
            <AddToolUsed onSubmit={(value) => InsertToArray('tools', value)} />
            <FunctionUsed onSubmit={(value) => InsertToArray('functions', value)} />
            <SuccessfullyPosting isShow={paymentSuccess} onCancel={toggleDrawer} message="Payment" />
            {/* <SuccessfullyPosting isShow={actionSuccess} onCancel={toggleDrawer} message="Action" /> */}
            <SuccessfullyPosting isShow={submitFileSuccess} onCancel={toggleDrawer} message="Submit File" />
            <RatingContract data={contract}/>
            <ReportContract data={contract} />
            <AskForCancelContract data={contract} />
            <AskForNewDeadline data={contract} type={getType()} />
            <Uploading type={getType()} id={contractId.contract} />
            <SendReason field={field} type={getType()} id={contractId.contract} />
            <QrCode value={contractId?.contract} />
            <Popup id='face_recognition_img'>
                <div className="flex flex-col justify-around w-full sm:w-[604px]">
                    <img className="w-full" src={IsImSp() ? (customer?.faceRecognition):(sp?.faceRecognition)}/>
                </div>
            </Popup>
            {textCopied && 
            <div
                className="fixed z-[1000] bg-green-300 p-2 rounded-md boredr-2 flex items-center  top-5 end-5"
            >
                <p class="mb-0">"{textCopied}" {t('is copied')}</p>
            </div>
            }
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
                                {canViewUserInfo && 
                                    <section className='w-full'>
                                        <div className='flex gap-3 items-center justify-between'>
                                            <div className='flex gap-3 items-center justify-between'>
                                                <img className='size-16 rounded-full' src={IsImSp() ? customer?.profileImage : sp?.profileImage} />
                                                <div className='flex flex-col gap-1 overflow-hidden'>
                                                    <span className='font-semibold capitalize max-w-[543px]'>
                                                        {IsImSp() ? (customer?.name?.split(' ')[0].length > 6 ? customer?.name?.split(' ')[0].slice(0, 6) : customer?.name?.split(' ')[0]) : (sp?.name?.split(' ')[0].length > 6 ? sp?.name?.split(' ')[0].slice(0, 6) : sp?.name?.split(' ')[0])}
                                                    </span>
                                                    <div onClick={()=> OpenPopUp('face_recognition_img')} className='px-1 cursor-pointer font-semibold text-[#353535] rounded-md bg-gray-200 dark:bg-gray-400'>
                                                        {t('show verification')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-end gap-1 overflow-hidden'>
                                                <div 
                                                    className='cursor-pointer flex items-center gap-2 text-[12px] font-semibold rounded-md text-primary' 
                                                    title={IsImSp() ? (customer?.phoneNumber?.number):(sp?.phoneNumber?.number)}
                                                >
                                                    {IsImSp() ? (customer?.phoneNumber?.number):(sp?.phoneNumber?.number)} <Icon onClick={() => copyToClipboard(IsImSp() ? (customer?.phoneNumber?.number):(sp?.phoneNumber?.number))} name={'copy'} className='size-4'/>
                                                </div>
                                                {(IsImSp() ? customer?.email:sp?.email) &&
                                                <div 
                                                    className='cursor-pointer flex items-center gap-2 text-[12px] font-semibold rounded-md text-primary' 
                                                    title={IsImSp() ? customer?.email:sp?.email} 
                                                >
                                                    {/* <Icon name={'envelope'} className='size-4' /> */}
                                                     {IsImSp() ? customer?.email:sp?.email}  <Icon onClick={() => copyToClipboard(IsImSp() ? customer?.email:sp?.email)} name={'copy'} className='size-4'/>
                                                </div>
                                                 }
                                            </div>
                                        </div>
                                    </section>        
                                }
                                {
                                    (getType() == "project" || getType() == "rental") &&
                                    <Link href={`/${getType() == "project"?'project':(getType() == "rental"?'rentals':'teams')}/${contract.project}`}>
                                    <section className='w-full cursor-pointer flex-col'>
                                        <h2 className='opacity-60 capitalize mb-3'>{t("original project")}</h2>
                                        <div className='w-full'>
                                            <div className="h-20 w-full rounded-full relative overflow-hidden">
                                                <img className="absolute -translate-y-1/2 blur-sm" src='/assets/imgs/projects/2.jpeg' />
                                                <div className="absolute z-20 flex items-center w-full h-full p-7">
                                                    <div className="w-full text-center p-20">
                                                        <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{t('view original project')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    </Link>}
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
                                {canHeightData && 
                                <section className='grid w-full'>
                                    <div className='flex gap-3 items-center'>
                                        <Icon name={'info'} className='size-5 border p-[1px] rounded-full' />
                                        <span className='capitalize max-w-[543px]'>
                                        {t("please review updated data before pay")}
                                        </span>
                                    </div>
                                </section>
                                }
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
                                {complaint && 
                                <>
                                <section className='w-full'>
                                    <div>
                                        <h2 className='opacity-60 capitalize mb-3'>{t("contract complaint reasons")}</h2>
                                        <span className='font-semibold max-w-[543px]'>
                                            {complaint?.desc}
                                        </span>
                                    </div>
                                </section>   
                                {complaint?.attachments?.length > 0 &&
                                <section className='w-full'>
                                    <h2 className='opacity-60 capitalize mb-3'>{t("contract complaint attachments")}</h2>
                                    {complaint?.attachments.map((attachment, index) =>
                                        <div key={index} className='flex gap-3 items-center p-4 bg-white dark:bg-[#1A2024] rounded-md border border-[#CACACA] dark:border-opacity-25 mt-3'>
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
                                </>
                                }
                                 {/* Project  */}
                                {(getType() == "project") && 
                                <>
                                <ProjectView canUpdateData={canHeightData} contract={contract}/>
                                </>
                                }
                                {(getType() == "rental") && 
                                <>
                                <RentalView canUpdateData={canHeightData} contract={contract}/>
                                </>
                                }
                                {(getType() == "producer") && 
                                <>
                                <ProducerView canUpdateData={canHeightData} contract={contract}/>
                                </>
                                }
                                {(getType() == "copyrights") && 
                                <>
                                <CopywriterView canUpdateData={canHeightData} contract={contract}/>
                                </>
                                }
                                {(getType() == "team") && 
                                <>
                                <TeamView canUpdateData={canHeightData} contract={contract}/>
                                </>
                                }
                                
                                {
                                    contract?.attachments?.length > 0 &&
                                    <section className='w-full'>
                                        <h2 className='opacity-60 capitalize'>{t("Project Attachments")}</h2>
                                        {contract?.attachments.map((attachment, index) =>
                                            <div key={index} className='flex gap-3 items-center p-4 bg-white dark:bg-[#1A2024] rounded-md border border-[#CACACA] dark:border-opacity-25 mt-3'>
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
                                {contract?.submitFiles?.length>0 && 
                                <section className='w-full'>
                                    <h2 className='opacity-60 capitalize mb-3'>{t("Submit Files")}</h2>
                                    {contract?.submitFiles?.map(item=>
                                    <div key={item._id} className='flex flex-col px-4 py-2 bg-white dark:bg-[#1a2024] rounded-md border border-[#cacaca] dark:border-opacity-25 mt-3'>
                                        <div className='flex gap-3 items-start justify-between'>
                                            <div className='flex gap-3 items-center justify-between'>
                                                <Icon name={'link'} className='size-5' />
                                                <div className='flex flex-col overflow-hidden'>
                                                    <a className='font-semibold overflow-hidden line-clamp-1 max-w-[300px] underline' href={item.link} target="_blank">
                                                        {item.link}
                                                    </a>
                                                    <div className='flex flex-col leading-5'>
                                                        <span className='text-md text-[#747688]'>
                                                        {item?.notes}
                                                        </span>
                                                        <span className='text-xs text-[#747688]'>
                                                        {formatDate(item?.dateOfSubmission)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='p-1 rounded-md bg-gray-200'>
                                                {item?.status}
                                            </div>
                                        </div>
                                        {item.reason && 
                                        <div>
                                            <span className='text-md text-red'>
                                                {item?.reason}
                                            </span>
                                        </div>
                                        }
                                        {canAnswerSubmitFile && item.status ==='pending' &&
                                        <div className='grid grid-cols-2 gap-2'>
                                            <button onClick={()=> handleAcceptFiles(item._id)} className="rounded-md  py-1 border-solid bg-green-500 w-full text-[#EB1A40] text-lg font-bold mt-2">
                                                {acceptFiles_respond?.loading && actionAccept ==='accept'?
                                                <Loading size='md'/>
                                                :
                                                <span className='text-white font-bold capitalize text-lg'>{t("Accept")}</span>
                                                }
                                            </button>
                                            <button onClick={()=> openSendReason(item._id)} className="rounded-md  py-1 border-solid bg-[#EB1A40] w-full text-[#EB1A40] text-lg font-bold mt-2">
                                                <span className='text-white font-bold capitalize text-lg'>{t("reject")}</span>
                                            </button>
                                        </div>
                                        }
                                    </div>
                                    )}
                                </section>
                                }
                                

                            </div>
                            <div className={'flex mx-5 gap-7 mt-16 justify-center' + (canEdit ? ' hidden' : '')}>
                                {
                                    canUpdateData &&
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
                                </div>
                            }
                                {(paymentError?.errors || actionError?.errors || resNewDeadlineError?.errors) && 
                                <div className='text-center'>
                                    {paymentError?.errors && 
                                    <ErrorMessage ErrorMsg={paymentError?.errors[0]?.message}/>
                                    }
                                    {actionError?.errors && 
                                    <ErrorMessage ErrorMsg={actionError?.errors[0]?.message}/>
                                    }
                                    {resNewDeadlineError?.errors && 
                                    <ErrorMessage ErrorMsg={resNewDeadlineError?.errors[0]?.message}/>
                                    }
                                </div>
                                }
                            {canResToNewDeadline &&
                                <div className='grid grid-cols-2 gap-2'>
                                    <button onClick={()=> handleResNewDeadline('accept')} className="rounded-md  py-1 border-solid bg-green-500 w-full text-[#EB1A40] text-lg font-bold mt-2">
                                        {resNewDeadline_respond?.loading && actionAccept ==='accept'?
                                        <Loading size='md'/>
                                        :
                                        <span className='text-white font-bold capitalize text-lg'>{t("Accept")}</span>
                                        }
                                    </button>
                                    <button onClick={()=> handleResNewDeadline('reject')} className="rounded-md  py-1 border-solid bg-[#EB1A40] w-full text-[#EB1A40] text-lg font-bold mt-2">
                                        {resNewDeadline_respond?.loading && actionAccept ==='reject'?
                                        <Loading size='md'/>
                                        :
                                        <span className='text-white font-bold capitalize text-lg'>{t("reject")}</span>
                                        }

                                    </button>
                                </div>
                                }
                            {canEdit &&
                                <section className='flex mx-5 gap-7 mb-10 mt-16 justify-center'>
                                    <Button isEnabled={UpdateBtn} className="w-full" shadow={true} shadowHeight={"14"} onClick={handleUpdate}>
                                        {takeAction_respond?.loading && actionAccept ==='update'?
                                        <Loading/>
                                        :
                                        <span className='text-white font-bold capitalize text-lg'>{t("Update")}</span>
                                        }
                                    </Button>
                                </section>
                            }
                            {canReview &&
                                <section className='flex mx-5 gap-7 justify-center'>
                                    <Button className="w-full" shadow={true} shadowHeight={"14"} onClick={openReview}>
                                        <span className='text-white font-bold capitalize text-lg'>{t("review")}</span>
                                    </Button>
                                </section>
                            }
                            {canAnswerSubmitFile && contract?.submitFiles?.length>0 &&
                                <section className='flex mx-5 gap-7 justify-center'>
                                    <Button className="w-full" shadow={true} shadowHeight={"14"} onClick={handleAcceptAllFiles}>
                                        {acceptAllFiles_respond?.loading && actionAccept ==='accept'?
                                            <Loading size='md'/>
                                            :
                                            <span className='text-white font-bold capitalize text-lg'>{t("accept all files")}</span>
                                        }
                                    </Button>
                                </section>
                            }

                            {!canEdit &&
                                <section className="w-full">
                                    <div className='flex mx-5 gap-7 mb-10 mt-10 justify-center'>
                                        {
                                            acceptBtn &&
                                            <Button className="w-full" shadow={true} shadowHeight={"14"} onClick={handleAccept}>
                                                {takeAction_respond?.loading && actionAccept==='accept'?
                                                    <Loading/>
                                                :
                                                    <span className='text-white font-bold capitalize text-lg'>{t("Accept")}</span>
                                                }
                                            </Button>
                                        }
                                        {
                                            refuse &&
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                               {takeAction_respond?.loading && actionAccept === 'refuse' ? 
                                                <Loading/>
                                                :
                                                t("Refuse")}
                                                </button>
                                        }
                                        {cancel && 
                                         <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleCancel}>
                                         {takeAction_respond?.loading  && actionAccept === 'cancel'? 
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
                                            <Button className="w-full" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                            {payment_respond?.loading && actionAccept==='payment' ? 
                                                <Loading/>
                                                :
                                                <span className='text-white font-bold capitalize text-lg'>{t("Pay Now 10%")}<br/>{contract?.firstPaymentAmount} {'EGP'}</span>
                                                }

                                            </Button>
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                            {takeAction_respond?.loading && actionAccept === 'refuse' ? 
                                                <Loading/>
                                                :
                                                t("Refuse")}
                                            </button>
                                        </div>
                                    }
                                    {
                                        !IsImSp() && getType() !== 'team' && status == "waiting-for-total-payment" &&
                                        <div className='grid grid-cols-2 mx-5 gap-5 mb-10 mt-10'>
                                            <Button isEnabled={(new Date(appointmentDate).getDate() >= new Date().getDate())|| true} className="w-full !h-[100px]" shadow={true}   onClick={handlePayment}>
                                                {payment_respond?.loading && actionAccept==='payment' ? 
                                                    <Loading/>
                                                    :
                                                    <span className='text-white font-bold capitalize text-lg flex items-center justify-center p-2'>{t("Pay Now remain ( 90 % )")} <br/> {contract?.secondPaymentAmount} {'EGP'}</span>
                                                }
                                            </Button>
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                            {takeAction_respond?.loading && actionAccept === 'refuse' ? 
                                                <Loading/>
                                                :
                                                t("Refuse")}
                                            </button>
                                        </div>
                                    }
                                    {
                                        !IsImSp() && getType() === 'team' && status == "waiting-for-total-payment" &&
                                        <div className='flex items-center justify-center mx-5 gap-7 mb-10 mt-10'>
                                            <Button isEnabled={(new Date(appointmentDate).getDate() >= new Date().getDate())||true} className="w-full" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                                {payment_respond?.loading && actionAccept==='payment' ? 
                                                    <Loading/>
                                                    :
                                                <span className='text-white font-bold capitalize text-lg'>{t("Pay Now remain ( 100 % )")}<br/>{contract?.totalPrice} {'EGP'}</span>
                                                }
                                            </Button>
                                        </div>
                                    }
                                    {
                                        !IsImSp() && status == "waiting-for-payment" &&
                                        <div className='flex mx-5 gap-7 mb-10 mt-10 justify-center'>
                                            <Button className="w-full" shadow={true} shadowHeight={"14"} onClick={handlePayment}>
                                            {payment_respond?.loading && actionAccept==='payment' ? 
                                                <Loading/>
                                                :
                                                <span className='text-white font-bold capitalize text-lg'>{t("Check Out")}<br/>{contract?.totalPrice} {'EGP'}</span>
                                            }
                                            </Button>
                                            <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={handleRefuse}>
                                            {takeAction_respond?.loading && actionAccept === 'refuse' ? 
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
                                    {canAnswerViewQR && 
                                    <section className='flex mx-5 gap-7 mb-10 justify-center'>
                                        <Button className="w-full" shadow={true} shadowHeight={"14"} color={"#5666F7"}  onClick={openQR}>
                                            <span className='text-white font-bold capitalize text-lg'>{t("show your qr code")}</span>
                                        </Button>
                                    </section>
                                    }
                                    {canSubmitFile && 
                                    <section className='flex mx-5 gap-7 mb-10 justify-center'>
                                        <Button className="w-full" shadow={true} shadowHeight={"14"} color={"#5666F7"}  onClick={openSubmitFiles}>
                                            <span className='text-white font-bold capitalize text-lg'>{contract?.submitFiles?.length>0 ? t('add another submit files'):t("submit files")}</span>
                                        </Button>
                                    </section>
                                    }
                                    {canAskCancel &&
                                        <section className='flex mx-5 gap-7 mb-10 justify-center'>
                                            <button className="rounded-full border-2 border-solid border-[#5666F7] w-full h-[66px] text-[#5666F7] hover:bg-primary hover:text-white text-lg font-bold flex items-center justify-center">
                                                <span className='text-white font-bold capitalize text-lg'>{t("ask system for cancel")}</span>
                                            </button>
                                        </section>
                                    }
                                    {casAskForNewDeadline &&
                                        <section className='flex mx-5 gap-7 mb-10 justify-center'>
                                            <button className="rounded-full border-2 border-solid border-[#5666F7] w-full h-[66px] text-[#5666F7] hover:bg-primary hover:text-white text-lg font-bold flex items-center justify-center">
                                                <span className='text-white font-bold capitalize text-lg'>{t("ask client new deadline")}</span>
                                            </button>
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
    resNewDeadline_respond: state.api.resNewDeadline,
    payment_respond: state.api.payment,
    addprojectState: state.addproject,
    submitFile_respond:state.api.submitFile,
    acceptAllFiles_respond:state.api.acceptAllFiles,
    acceptFiles_respond:state.api.acceptFiles,
    report_respond: state.api.contractReport,
    complaint_respond: state.api.GetComplaint
});

const mapDispatchToProps = {
    toggleContractData,
    takeAction,
    resNewDeadline,
    acceptFiles,
    acceptAllFiles,
    getAllContracts,
    payment,
    UpdateFormData,
    InsertToArray,
    resetForm,
    GetContract,
    GetComplaint
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveProjectFiles);

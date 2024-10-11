import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import dateFormat from "dateformat";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import { StudopBooking } from "../../../redux/action/apis/cycles/rental/book";
import { useTranslation } from 'react-i18next';
import CustomSlider from "../../elements/customSlider";
import ErrorMessage from '../../elements/ErrorMessage';
import AddAttachment from "../../elements/attachment";
import { UpdateKeysAndValues } from "../../../util/util";

const StudioBooking = ({ StudopBooking_respond, addprojectState, UpdateFormData, StudopBooking, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {
    const { t } = useTranslation();
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const formData = addprojectState.formData
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [attachmentValidation, setAttachmentValidation] = useState(false);
    let dates = formData?.timeDate?.split(':');
    let date = new Date(formData.startDate);
    const validateRequiredFields = () => {
        const errors = {};
        if (!formData.startDate) errors.startDate = 'Start date is required';
        if (!formData.timeDate) errors.timeDate = 'Time date is required';
        // if ((formData.details?.length || 0) < 6) errors.details = 'Details must be at least 6 characters long';
        // if (!formData.details) errors.details = 'Details is required';
        if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment is required';
        return errors;
    };
    const CheckNext=()=>{
        setValidFormCheck(true)
        validateRequiredFields()
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) setErrorMsg(validateRequiredFields())
        else return onsubmit()
    }
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
    },[formData])

    useEffect(() => {
        if (
            formData.details?.length > 5 &&
            formData.startDate &&
            formData['projectScale.numberOfUnits'] > data.projectScale.minimum
        ) setEnableBtn(true)
        else setEnableBtn(false)
    }, [formData])

    function ontoggleDrawer() {
        if (preview)
            setPreview(false)
        else if (toggleDrawer) {
            resetForm()
            toggleDrawer()
        }
        else
            resetForm()
    }

    function OnSucess() {
        StudopBooking(null)
        setPost_success(false)
        resetForm()
        toggleDrawer()
        ontoggleDrawer()
    }
    var convertError = JSON.parse(StudopBooking_respond?.error ?? null)

    useEffect(() => {
        if (StudopBooking_respond?.message === "success")
            setPost_success(true)
    }, [StudopBooking_respond?.message])

    function onsubmit() {
        if (!preview) {
            setPreview(true)
            return
        }
        if (submit)
            submit()
        const form = new FormData()
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['attachments' , 'timeDate' ,'startDate'])
        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i];
                form.append(`attachments`, file.file);
            }
            if(formData.startDate && formData.timeDate){
                // date.setUTCHours(dates?.hours);
                // date.setUTCMinutes(dates?.minutes);
                let [datePart, _] = formData.startDate.split('T');

                let newDate = `${datePart}T${formData.timeDate}:00.000Z`;
                form.append(`startDate`, newDate);
            }
        StudopBooking(data._id, form)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };


    if (!isOpen) {
        return <Drawer name={data.user.name?.split(' ')[0].length>6?data.user.name?.split(' ')[0].slice(0,6):data.user.name?.split(' ')[0]} img={data.user.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
        </Drawer >
    }

    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Booking" />
            <Drawer name={preview ? 'Review Booking' : data.user.name?.split(' ')[0].length>6?data.user.name?.split(' ')[0].slice(0,6):data.user.name?.split(' ')[0]} img={data.user.profileImage} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-y-scroll" padding={false}>
                <div className={preview ? ' hidden p-8 pt-0' : 'p-8 pt-0'}>
                    <div className="mt-11" />
                    <section>
                        <h3 className="capitalize opacity-60">{t("job details")}</h3>
                        <textarea name="details" value={formData.details || ""} onChange={handleInputChange} placeholder={t("requirements, conditions")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                        {/* <ErrorMessage ErrorMsg={ErrorMsg.details}/> */}
                    </section>
                    {data.insurance && 
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">{t("extra payments")}</h3>
                        <div className="flex gap-2">
                            <div className="border border-[#00000040] dark:border-[#ffffff40] px-3 py-1 rounded-full">{t("insurance")}</div>
                            <div className="border border-[#00000040] dark:border-[#ffffff40] px-3 py-1 rounded-full">$ {data.insurance}</div>
                        </div>
                    </section>
                    }
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mt-11">{t("upload alike project")}</h3>
                        <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.attachments}/>
                    </section>
                    <section className="my-11">
                        <div className="flex justify-between">
                            <h3 className="capitalize opacity-60 mb-4">set number of {data.projectScale.unit}</h3>
                            <span className="capitalize opacity-60 mb-4">{formData['projectScale.numberOfUnits']} {data.projectScale.unit}</span>
                        </div>
                        <CustomSlider initValue={data.projectScale.minimum} values={data.projectScale.maximum} onValueChange={(v) => UpdateFormData('projectScale.numberOfUnits', v)} />
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">{t("select Booking date")}</h3>
                        <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.startDate}/>
                        <input type='time' name="timeDate" value={formData.timeDate || ""} onChange={handleInputChange} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 px-2 py-5 w-full"/>
                        <ErrorMessage ErrorMsg={ErrorMsg.timeDate}/>
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                        <div className="flex justify-center">
                            <ArrowBtn onClick={CheckNext} className="cursor-pointer w-full sm:w-96" text='continue' />
                        </div>
                    </section>
                </div>

                <div className={preview ? 'h-full ' : ' hidden'}>
                    <div className="h-full">
                        <div className="p-8">
                            <section className="w-full">
                                <h2 className='opacity-60 capitalize mb-3'>{t("project type")}</h2>
                                <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] dark:border-[#fff] dark:text-[#fff] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>{t("shooting permits")}</span>
                            </section>
                            <section className="w-full">
                                <h2 className='opacity-60 capitalize mb-2'>{t("project details")}</h2>
                                <span className='capitalize mb-8 opacity-80 w-min font-bold'>
                                    {formData.details}
                                </span>
                            </section>
                            <div className="mt-4">
                                <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 cursor-pointer">
                                    <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] dark:border-[#1A73EB26] border-8 dark:border-black aspect-square">
                                        <Icon className='text-primary' name={"calendar"} />
                                    </div>
                                    <div className="flex gap-2 items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 cursor-pointer">
                                    <span className="font-normal text-base capitalize">{t("Booking Date")}</span>
                                    <span className="font-normal text-base">{dateFormat(formData.startDate, 'd mmmm , yyyy')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 cursor-pointer">
                                    <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] dark:border-[#1A73EB26] border-8 dark:border-black aspect-square">
                                    <Icon className='text-primary w-6' name={"location-dot"} />
                                    </div>
                                    <div className="flex gap-2 items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 cursor-pointer">
                                        <span className="font-normal text-base capitalize">{t("project location")}</span>
                                        <span className="font-normal text-base">{data.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 bg-[#F7F9FB] dark:bg-[#080604] border-t border-[#00000033]`}>
                        <div className='text-center'>
                            <ErrorMessage ErrorMsg={convertError?.data.errors[0].message}/>
                        </div>
                        <div className="w-full flex px-8 justify-between">
                            <span className="text-2xl opacity-50 font-semibold">{t("Total Amount")}</span>
                            <span className="text-2xl font-bold">${data.projectScale.pricerPerUnit * formData['projectScale.numberOfUnits']}</span>
                        </div>
                        <div className="flex justify-center">
                            <ArrowBtn loading={StudopBooking_respond?.loading} onClick={CheckNext} className="cursor-pointer w-full sm:w-96" text='Appointment Now' />
                        </div>
                    </section>
                </div>
            </Drawer >
        </>
    );
};

const mapStateToProps = (state) => ({
    StudopBooking_respond: state.api.StudopBooking,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    StudopBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(StudioBooking);

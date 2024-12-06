import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { UpdateKeysAndValues, handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import { BookProject } from "../../../redux/action/apis/cycles/projects/book";
import dateFormat from "dateformat";
import { useTranslation } from 'react-i18next';
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import BookTeam from "../../elements/teams";
import AddAttachment from "../../elements/attachment";
import CustomSlider from "../../elements/customSlider";
import ErrorMessage from '../../elements/ErrorMessage';
import PopupErrorMessage from '../../elements/PopupErrorMessage';
const ProjectBooking = ({ respond, addprojectState, UpdateFormData, BookProject, resetForm, data = {}, isOpen, toggleDrawer, submit, user }) => {
    const { t } = useTranslation();

    const formData = addprojectState.formData
    const [openMap, setOpenMap] = useState(false);
    const [preview, setPreview] = useState(false);
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});

    const [post_success, setPost_success] = useState(false);
    const [creatives, setCreatives] = useState([]);
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    function calculateTotalPrice() {
        // Extract project scale information from formdata
        const numberOfUnits = formData['projectScale[numberOfUnits]'];
        // Extract price per unit from data
        const pricePerUnit = data.projectScale.pricerPerUnit;

        // Calculate the tools cost
        let toolsCost = 0;
        if (formData.tools && formData.tools.length > 0) {
            const toolIds = formData?.tools?.map(item=>item._id);
            toolsCost = data.tools.reduce((total, tool) => {
                if (toolIds?.includes(tool._id)) {
                    return total + tool.unitPrice;
                }
                return total;
            }, 0);
        }
        // Calculate the functions cost
        let functionsCost = 0;
        if (formData.functions && formData.functions.length > 0) {
            const functionIds = formData.functions.map(item=>item._id);
            functionsCost = data.functions.reduce((total, func) => {
                if (functionIds?.includes(func._id)) {
                    return total + func.unitPrice;
                }
                return total;
            }, 0);
        }
        console.log(pricePerUnit + toolsCost + functionsCost)

        // Calculate the total price
        const totalPrice = (pricePerUnit + toolsCost + functionsCost) * numberOfUnits;
        return totalPrice;
    }

    const validateRequiredFields = () => {
        const errors = {};

        // if (!formData.details) errors.details = 'Details is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData['location[lat]'] || !formData['location[lng]']) errors.location = 'Location is required';
        // if ((formData.details?.length || 0) < 6) errors.details = 'Details must be at least 6 characters long';
        // if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment is required';
        if (!formData.appointmentDate) errors.appointmentDate = 'appointmentDate is required';
        if (!formData.startDate) errors.startDate = 'StartDate is required';
        return errors;
    };
    const CheckNext=()=>{
        setValidFormCheck(true)
        setErrorPopup(true)
        const timer = setTimeout(() => {
            setErrorPopup(false);
        }, 3000); // Hide after 3 seconds
        validateRequiredFields()
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) {
            setErrorMsg(validateRequiredFields())
            return () => clearTimeout(timer);
        }else{
            onsubmit()
            clearTimeout(timer)
        }
    }
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
        setErrorPopup(false);
    },[formData])

    // const enableBtn = Object.keys(validateRequiredFields()).length == 0
    // let ErrorMsg = ""
    // if(!enableBtn) ErrorMsg = Object.values(validateRequiredFields())[0]

    function ontoggleDrawer(all) {
        if (preview)
            setPreview(false)
        else if (openMap)
            setOpenMap(false)
        else if (toggleDrawer) {
            resetForm()
            toggleDrawer()
        }
        else{
            resetForm()
        }
    }
    function OnSucess() {
        BookProject(null)
        setPost_success(false)
        setErrorMsg({})
        resetForm()
        toggleDrawer()
        ontoggleDrawer()
    }

    useEffect(() => {
        // UpdateFormData('creatives', creatives.map(item => item._id))
    }, [creatives.length])

    useEffect(() => {
        // UpdateFormData('totalPrice', data.projectBudget)
        if (data.creatives) {
            setCreatives([{ ...data.user, removable: true }])
        }
        UpdateFormData('tools', data?.tools || [])
        UpdateFormData('functions', data?.functions || [])
        UpdateFormData('projectScale[numberOfUnits]', data?.projectScale?.current)
    }, [isOpen])

    var convertError = JSON.parse(respond?.error ?? null)
    useEffect(() => {
        if (respond?.message === "success"){
            setPost_success(true)
            // toggleDrawer()
        }
    }, [respond?.message])


    function onsubmit() {
        if (!preview) {
            setPreview(true)
            return
        }
        if (submit)
            submit()
        const form = new FormData()
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['attachments', 'tools', 'functions'])
        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i];
                form.append(`attachments`, file.file);
            }

        if (formData.functions)
            for (var i = 0; i < formData.functions.length; i++) {

                form.append(`equipment[functions][${i}][id]`, formData.functions[i]._id);
            }

        if (formData.tools)
            for (var i = 0; i < formData.tools.length; i++) {
                form.append(`equipment[tools][${i}][id]`, formData.tools[i]._id);
            }
        BookProject(data._id, form)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };
    const handlelocationChange = (location) => {
        UpdateFormData('location[lat]', location.lat)
        UpdateFormData('location[lng]', location.lng)
    };
    console.log({formData ,data})
    const inputStyle = "bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 p-5 w-full";
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Booking" secondMessage="You will be answered within 24 hours" />

            <Drawer name={preview ? 'Review Booking' : data.user?.name} img={data.user?.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} padding={false}>
                {!isOpen ?
                    <></> :
                    <>
                        <div className={preview ? ' hidden' : 'p-8 pt-0'}>
                            {
                                (data?.tools || data?.functions)?.length > 0 &&
                                <section className="my-11">
                                    <BookTeam current={formData["projectScale[numberOfUnits]"]} pricerPerUnit={data.projectScale.pricerPerUnit} team={creatives.map(i => ({ ...i, name: i.name }))} />
                                    <BookTeam current={formData["projectScale[numberOfUnits]"]} team={(formData?.tools)} onChange={(value) => UpdateFormData('tools', value)} />
                                    <BookTeam current={formData["projectScale[numberOfUnits]"]} team={(formData?.functions)} onChange={(value) => UpdateFormData('functions', value)} />
                                </section>
                            }
                            <section className="mt-7">
                                <h3 className="capitalize opacity-60">{t("job details")}</h3>
                                <textarea name="details" value={formData.details || ""} onChange={handleInputChange} placeholder={t("requirements, conditions")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                                <ErrorMessage ErrorMsg={ErrorMsg.details}/>
                            </section>
                            <section className="my-11 gap-7 h-96 relative overflow-hidden">
                                <h3 className="capitalize opacity-60 mb-4">{t("location")}</h3>
                                <GoogleMap
                                    width={'100%'}
                                    isreadOnly={false}
                                    value={{ 'lat': formData['location[lat]'], 'lng': formData['location[lng]'] }}
                                    inputclass={inputStyle}
                                    className={"relative rounded-md overflow-hidden h-[250px] border-2 border-[#E5E5E5]"}
                                    onChangeAddress={handleInputChange}
                                    onsetLocation={handlelocationChange} />
                            </section>
                            <section className="my-11 gap-7 hidden">
                                <div className="w-full">
                                    <h3 className="capitalize opacity-60 mb-4">{t("location")}</h3>
                                    <div onClick={() => setOpenMap(true)} className="flex items-center rounded-2xl border border-gray-300 bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                                        <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                                            <Icon className='text-primary w-4' name={"location-dot"} />
                                        </div>
                                        <span className="pl-5 w-full">{t("New Yourk, USA")}</span>
                                        <Icon name={"angle-right"} className={"mr-2 w-2 text-primary"} />
                                    </div>
                                </div>
                            </section>
                            <section className="w-full">
                                <h3 className="capitalize opacity-60 mt-11">{t("upload alike project")}</h3>
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                                <ErrorMessage ErrorMsg={ErrorMsg.attachments}/>
                            </section>
                            <section className="my-11">
                                <div className="flex justify-between">
                                    <h3 className="capitalize opacity-60 mb-4">set number of {data.projectScale.unit}</h3>
                                    <span className="capitalize opacity-60 mb-4">{formData['projectScale[numberOfUnits]']} {data.projectScale.unit}</span>
                                </div>
                                <CustomSlider minimum={data.projectScale.minimum} initValue={data.projectScale.current} values={data.projectScale.maximum} onValueChange={(v) => UpdateFormData('projectScale[numberOfUnits]', v)} />
                            </section>
                            <section className="my-11">
                                <h3 className="capitalize opacity-60 mb-4">{t("appointment Date")}</h3>
                                <SelectDate onChange={(value) => UpdateFormData('appointmentDate', value)} />
                                <ErrorMessage ErrorMsg={ErrorMsg.appointmentDate}/>
                            </section>
                            <section className="my-11">
                                <h3 className="capitalize opacity-60 mb-4">{t("Start Date")}</h3>
                                <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                                <ErrorMessage ErrorMsg={ErrorMsg.startDate}/>
                            </section>
                            <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                                <div className="flex justify-center w-full">
                                    <div className='relative'>
                                        <PopupErrorMessage errorPopup={errorPopup} ErrorMsg={Object.values(validateRequiredFields())[0]}/>
                                        <ArrowBtn onClick={CheckNext} className="cursor-pointer w-full sm:w-96" text='continue' />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {preview &&
                            <div className='flex flex-col gap-9 h-full'>
                                <div className="flex flex-col gap-9 overflow-y-scroll overflow-x-hidden p-8 h-full">
                                    <section>
                                        <BookTeam current={formData["projectScale[numberOfUnits]"]} pricerPerUnit={data.projectScale.pricerPerUnit} team={creatives.map(i => ({ ...i, name: i.name }))} mainremovable={false} />
                                        <BookTeam current={formData["projectScale[numberOfUnits]"]} team={formData?.tools} mainremovable={false} />
                                        <BookTeam current={formData["projectScale[numberOfUnits]"]} team={formData?.functions} mainremovable={false} />
                                    </section>
                                    <section className="w-full hidden">
                                        <h2 className='opacity-60 mb-3'>{t("project type")}</h2>
                                        <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>{t("shooting permits")}</span>
                                    </section>
                                    {formData.details && 
                                    <section className="w-full">
                                        <h2 className='opacity-60 capitalize mb-3'>{t("project details")}</h2>
                                        <span className='capitalize mb-8 opacity-80 w-min font-bold'>
                                            {formData.details}
                                        </span>
                                    </section>
                                    }

                                    <section className="w-full">
                                        <h2 className='opacity-60 capitalize mb-3'>{t("Custom Requirements")}</h2>
                                        <span className='capitalize mb-8 opacity-80 w-min whitespace-nowrap font-bold'>
                                            {formData['projectScale[numberOfUnits]']} {data.projectScale.unit}
                                        </span>
                                    </section>

                                    <section className="w-full h-16 sm:w-96 p-2 mt-4">
                                        <h2 className='opacity-60 capitalize mb-3'>  </h2>
                                        <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                                            <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] dark:border-[#1A2024] border-8 aspect-square">
                                                <Icon className='text-primary' name={"calendar"} />
                                            </div>
                                            <div className="flex flex-col pl-5 w-full">
                                                <span className="font-normal text-base capitalize">{t("Appointment Date")}</span>
                                                <span className="text-[#747688] text-xs">{dateFormat(formData.appointmentDate, 'd mmmm , yyyy')}</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="w-full h-16 sm:w-96 p-2 mt-4">
                                        <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                                            <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] dark:border-[#1A2024] border-8 aspect-square">
                                                <Icon className='text-primary' name={"calendar"} />
                                            </div>
                                            <div className="flex flex-col pl-5 w-full">
                                                <span className="font-normal text-base capitalize">{t("Start Date")}</span>
                                                <span className="text-[#747688] text-xs">{dateFormat(formData.startDate, 'd mmmm , yyyy')}</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="w-full h-16 sm:w-96 p-2 mt-4">
                                        <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                                            <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] dark:border-[#1A2024] border-8 aspect-square">
                                                <Icon className='text-primary w-4' name={"location-dot"} />
                                            </div>
                                            <div className="flex flex-col pl-5 w-full">
                                                <span className="font-normal text-base capitalize">{t("project location")}</span>
                                                <span className="font-normal text-base">{formData.address}</span>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 bg-white dark:bg-[#1A2024] border-t border-[#00000033]`}>
                                    <div className='text-center'>
                                        <ErrorMessage ErrorMsg={convertError?.data.errors[0].message}/>
                                    </div>
                                    <div className="w-full flex px-8 justify-between">
                                        <span className="text-2xl opacity-50 font-semibold">{t("Total Amount")}</span>
                                        <span className="text-2xl font-bold">${calculateTotalPrice()}</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <PopupErrorMessage errorPopup={errorPopup} ErrorMsg={Object.values(validateRequiredFields())[0]}/>
                                        <ArrowBtn loading={respond?.loading} onClick={CheckNext} className="cursor-pointer w-full sm:w-96" text='Appointment Now' />
                                    </div>
                                </section>
                            </div>}
                    </>

                }
            </Drawer >
        </>

    );
};


const mapStateToProps = (state) => ({
    respond: state.api.BookProject,
    addprojectState: state.addproject,
    user: state.auth.user,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    BookProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBooking);

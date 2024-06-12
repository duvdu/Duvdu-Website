import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import dateFormat from "dateformat";
import Successfully_posting from "../../popsup/post_successfully_posting";
import BookTeam from "../../elements/teams";
import { StudopBooking } from "../../../redux/action/apis/cycles/studio/book";
import AddAttachment from "../../elements/attachment";

const StudioBooking = ({ respond, addprojectState, UpdateFormData, StudopBooking, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {

    const formData = addprojectState.formData
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [creatives, setCreatives] = useState([]);
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    useEffect(() => {
        if (
            formData.address?.length > 0 &&
            formData.jobDetails?.length > 5 &&
            formData.bookingHours &&
            formData.appointmentDate &&
            attachmentValidation
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
    useEffect(() => {
        UpdateFormData('creatives', creatives.map(item => item._id))
    }, [creatives.length])

    useEffect(() => {
        UpdateFormData('totalPrice', data.projectBudget)
        if (data.creatives)
            setCreatives([...data.creatives])
    }, [isOpen])

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])

    const converting = (formData) => {
        const data = new FormData();
        const avoidFeilds = ['receiver']
        Object.keys(formData).forEach(key => {
            // Append each key-value pair to the FormData instance
            if (avoidFeilds.includes(key)) return
            data.append(key, formData[key]);
        });

        return data;
    }

    function onsubmit() {
        if (!preview) {
            setPreview(true)
            return
        }
        if (submit)
            submit()
        StudopBooking(data._id, formData)
    }

    const attachmentsUpload = (e) => {
        UpdateFormData('attachments', handleMultipleFileUpload(e))
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };

    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    if (!isOpen) {
        return <Drawer name={data.user.name} img={data.user.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
        </Drawer >
    }
    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={OnSucess} message="Booking" />
            <Drawer name={preview ? 'Review Booking' : data.user.name} img={data.user.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-y-scroll" padding={false}>
                {
                    creatives.length > 0 &&
                    <section className="my-11 p-8 pt-0">
                        <h3 className="capitalize opacity-60 mb-4">team</h3>
                        <BookTeam team={creatives.map(i => ({ ...i, name: i.creative.name }))} onChange={(value) => UpdateFormData('creative', value)} />
                    </section>
                }
                {
                    (data?.tools || data?.equipments)?.length > 0 &&
                    <section className="my-11 p-8 pt-0">
                        <h3 className="capitalize opacity-60 mb-4">equipments   </h3>
                        <BookTeam team={(data?.tools || data?.equipments)} onChange={(value) => UpdateFormData('equipments', value)} />
                    </section>
                }
                <div className="mt-11" />
                <div className={preview ? ' hidden p-8 pt-0' : 'p-8 pt-0'}>
                    <section>
                        <h3 className="capitalize opacity-60">job details</h3>
                        <textarea name="jobDetails" value={formData.jobDetails} onChange={handleInputChange} placeholder="requirements, conditions At least 6 char" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section className="my-11 max-w-64">
                        <h3 className="capitalize opacity-60 mb-4">appointment Date</h3>
                        <SelectDate onChange={(value) => UpdateFormData('appointmentDate', value)} />
                    </section>
                    <section className="my-11 max-w-64">
                        <h3 className="capitalize opacity-60 mb-4">deadline Date</h3>
                        <SelectDate onChange={(value) => UpdateFormData('deadline', value)} />
                    </section>
                    <section className="my-11 gap-7 mr-24 ${ispreview">
                        <h3 className="capitalize opacity-60 mb-4">address</h3>
                        <input placeholder='address' className={inputStyle} value={formData.address} onChange={handleInputChange} name="address" />
                    </section>
                    <section className="my-11 gap-7 hidden">
                        <div className="w-full">
                            <h3 className="capitalize opacity-60 mb-4">location</h3>
                            <div onClick={() => { setOpenMap(true) }} className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                                <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                                    <Icon className='text-primary w-4' name={"location-dot"} />
                                </div>
                                <span className="pl-5 w-full">New Yourk, USA</span>
                                <Icon name={"angle-right"} className={"mr-2 w-2 text-primary"} />
                            </div>
                        </div>
                    </section>
                    <section className="my-11 gap-7 mr-24 h-96 relative overflow-hidden">
                        <h3 className="capitalize opacity-60 mb-4">location</h3>
                        <GoogleMap width={'90%'} value={formData.location}
                            onsetLocation={(value) => {
                                UpdateFormData('location[Lat]', value.Lat)
                                UpdateFormData('location[Lng]', value.Lng)
                            }}
                        />
                    </section>
                    <section className="w-full">
                        <h3 className="capitalize opacity-60 mt-11">upload alike project</h3>
                        <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">booking Hours</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type="number" name="bookingHours" onChange={handleInputChange} value={formData.bookingHours} placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                            <span>
                                Hours
                            </span>
                        </div>
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'continue'} />
                        </div>
                    </section>
                </div>

                <div className={preview ? 'pt-0' : ' hidden'}>
                    <div className="p-8">

                        <section className="w-full">
                            <h2 className='opacity-60 capitalize mb-3'> project type </h2>
                            <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                shooting permits
                            </span>
                        </section>
                        <section className="w-full">
                            <h2 className='opacity-60 capitalize mb-3'> project details </h2>
                            <span className='capitalize mb-8 opacity-80 w-min whitespace-nowrap font-bold'>
                                {formData.jobDetails}
                            </span>
                        </section>

                        <div className="flex items-center rounded-2xl bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                            <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                <Icon className='text-primary' name={"calendar"} />
                            </div>
                            <div className="flex flex-col pl-5 w-full">
                                <span className="font-normal text-base">{dateFormat(formData.appointmentDate, 'd mmmm , yyyy')}</span>
                                <span className="text-[#747688] text-xs">{dateFormat(formData.appointmentDate, 'dddd , h:mm TT')}</span>
                            </div>
                        </div>
                        <div className="flex items-center rounded-2xl bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                            <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                <Icon className='text-primary' name={"calendar"} />
                            </div>
                            <div className="flex flex-col pl-5 w-full">
                                <span className="font-normal text-base">{dateFormat(formData.deadline, 'd mmmm , yyyy')}</span>
                                <span className="text-[#747688] text-xs">{dateFormat(formData.deadline, 'dddd , h:mm TT')}</span>
                            </div>
                        </div>


                        <div className="flex items-center rounded-2xl bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                            <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                <Icon className='text-primary w-4' name={"location-dot"} />
                            </div>
                            <div className="flex flex-col pl-5 w-full">
                                <span className="font-normal text-base">{formData.address}</span>
                            </div>
                        </div>
                    </div>

                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 bg-[#F7F9FB] border-t border-[#00000033]`}>
                        <div className="w-full flex px-8 justify-between">
                            <span className="text-2xl opacity-50 font-semibold">Total Amount</span>
                            <span className="text-2xl font-bold">${formData.totalPrice}</span>
                        </div>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'check-out'} />
                        </div>
                    </section>
                </div>
            </Drawer >
        </>
    );
};

const mapStateToProps = (state) => ({
    respond: state.api.StudopBooking,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    StudopBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(StudioBooking);

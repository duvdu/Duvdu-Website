import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { BookCopyrights } from "../../../redux/action/apis/cycles/copywriter/book";
import dateFormat from "dateformat";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import AddAttachment from "../../elements/attachment";


const CopyRigtherBooking = ({ bookCopyrights_respond, allstates , addprojectState, UpdateFormData, BookCopyrights, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {
    const formData = addprojectState.formData
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [attachmentValidation, setAttachmentValidation] = useState(true);
    let duration = 0
    if (formData.appointmentDate && formData.deadline)
        duration = new Date(formData.deadline) - new Date(formData.appointmentDate)


    if (
        formData.details?.length > 5 &&
        formData.deadline &&
        formData.appointmentDate &&
        formData['location.lat'] &&
        formData['location.lng'] &&
        duration > 0
    ) {
        if (!enableBtn)
            setEnableBtn(true)
    }
    else {
        if (enableBtn)
            setEnableBtn(false)
    }

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
        BookCopyrights(null)
        setPost_success(false)
        resetForm()
        toggleDrawer()
        ontoggleDrawer()
    }
    useEffect(() => {
        UpdateFormData("address", "Cairo (this's a defult value)")
    }, [isOpen])

    useEffect(() => {
        if (bookCopyrights_respond)
            setPost_success(true)
    }, [bookCopyrights_respond?.message])

    const converting = (formData) => {
        const data = new FormData();
        const avoidFeilds = ['receiver', 'attachments']
        Object.keys(formData).forEach(key => {
            // Append each key-value pair to the FormData instance
            if (avoidFeilds.includes(key)) return
            data.append(key, formData[key]);
        });

        for (let i = 0; i < formData.attachments?.length; i++) {
            const file = formData.attachments[i];
            data.append(`attachments`, file.file);
        }
        return data;
    }

    function onsubmit() {
        if (!preview) {
            setPreview(true)
            return
        }
        if (submit)
            submit()

        BookCopyrights(data._id, converting(formData))
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };

    const handlelocationChange = (location) => {
        UpdateFormData('location.lat', location.lat)
        UpdateFormData('location.lng', location.lng)
    };


    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    if (!isOpen) {
        return <Drawer name={data.name} img={data.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
        </Drawer >
    }
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Booking" />
            <Drawer name={preview ? 'Review Booking' : data?.user?.name} img={data?.user?.profileImage} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll" padding={false}>
                <div className={preview ? ' hidden p-8 pt-8' : 'p-8 pt-8'}>
                    <section>
                        <h3 className="capitalize opacity-60">job details</h3>
                        <textarea name="details" value={formData.details || ""} onChange={handleInputChange} placeholder="requirements, conditions At least 6 char" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">select appointmentDate  date</h3>
                        <SelectDate onChange={(value) => UpdateFormData('appointmentDate', value)} />
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">select deadline</h3>
                        <SelectDate onChange={(value) => UpdateFormData('deadline', value)} />
                    </section>
                    <section className="gap-7">
                        <h3 className="capitalize opacity-60 mb-4">address</h3>
                        <input placeholder='address' className={inputStyle} value={formData.address || ""} onChange={handleInputChange} name="address" />
                    </section>
                    <section className="h-96 relative overflow-hidden w-full mt-5">
                        <h3 className="capitalize opacity-60  mb-3">location</h3>
                        <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => handlelocationChange(value)} />
                    </section>
                    <section className="w-full">
                        <h3 className="capitalize opacity-60 mt-11">upload alike project</h3>
                        <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'continue'} />
                        </div>
                    </section>
                </div>

                <div className={preview ? ' flex flex-col gap-9 h-full justify-between' : ' hidden'}>
                    <div className="flex flex-col gap-9 overflow-y-scroll overflow-x-hidden p-8">
                        <section className="w-full">
                            <h2 className='opacity-60 capitalize mb-3'> project type </h2>
                            <span className='flex flex-col border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                shooting permits
                            </span>
                        </section>
                        <section className="w-full">
                            <h2 className='opacity-60 capitalize mb-3'> project details </h2>
                            <span className='capitalize mb-8 opacity-80 w-min font-bold'>
                                {formData.details}
                            </span>
                        </section>

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
                            <span className="text-2xl font-bold">${data.duration * data.price}</span>
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
    bookCopyrights_respond: state.api.BookCopyrights,
    allstates: state.api,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    BookCopyrights
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyRigtherBooking);

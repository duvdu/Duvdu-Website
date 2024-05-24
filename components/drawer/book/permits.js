import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import { BookCopyrights } from "../../../redux/action/apis/cycles/copywriter/book";
import dateFormat from "dateformat";
import Successfully_posting from "../../popsup/post_successfully_posting";


const PermitsBooking = ({ respond, addprojectState, UpdateFormData, BookCopyrights, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {
    const formData = addprojectState.formData
    const [openMap, setOpenMap] = useState(false);
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);

    useEffect(() => {
        if (
            formData.address?.length > 0 &&
            formData.jobDetails?.length > 5 &&
            formData.startDate
        ) setEnableBtn(true)
        else setEnableBtn(false)
    }, [formData.address?.length > 0, formData.jobDetails?.length > 5, formData.startDate])

    function ontoggleDrawer() {
        if (preview)
            setPreview(false)
        else if (openMap)
            setOpenMap(false)
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
        UpdateFormData('location[lat]', 50)
        UpdateFormData('location[lng]', 50)
        UpdateFormData('totalPrice', data.pricing)
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

        BookCopyrights(data._id, converting(formData))
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
        return <Drawer name={data.name} img={data.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
        </Drawer >
    }
    if (openMap)
        return <Drawer name={data.name} img={data.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
            <div className="py-10">
                <GoogleMap width={'90%'} value={formData.location}
                    onsetLocation={(value) => {
                        UpdateFormData('location[Lat]', value.Lat)
                        UpdateFormData('location[Lng]', value.Lng)
                    }}
                />
            </div>
        </Drawer >
    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={OnSucess} message="Booking" />
        <Drawer name={preview ? 'Review Booking' : data.name} img={data.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
            <div className="mt-11" />
            <div className={preview ? ' hidden' : ''}>
                <section>
                    <h3 className="capitalize opacity-60">job details</h3>
                    <textarea name="jobDetails" value={formData.jobDetails} onChange={handleInputChange} placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                </section>
                <section className="my-11 flex justify-between gap-7">
                    <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
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
                <section className="w-full">
                    <h3 className="capitalize opacity-60 mt-11">upload alike project</h3>
                    <label htmlFor="attachment-upload" className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                        <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                            <Icon className="text-primary w-4" name={"image"} />
                        </div>
                        <span className="pl-5 w-full text-blue-600">Open gallery</span>
                        <Icon name={"angle-right"} className={"mr-2 w-2 text-primary"} />
                    </label>
                    <input  onClick={handleRemoveEvent} onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
                    {
                        formData.attachments &&
                        formData.attachments.length > 0 &&
                        formData.attachments.map((file, key) => (
                            <div key={key} className='flex bg-[#EEF1F7] dark:bg-[#18140c] rounded-3xl items-center gap-4 p-2 mt-5'>
                                <Icon name={'file'} className="size-10" />
                                <div>
                                    <span className=''>{file.fileName}</span>
                                    <br />
                                    <span className='text-[#A9ACB4]'>{file.formattedFileSize}</span>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </div>

            <div className={preview ? '' : ' hidden'}>
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
                        <span className="font-normal text-base">{dateFormat(formData.startDate, 'd mmmm , yyyy')}</span>
                        <span className="text-[#747688] text-xs">{dateFormat(formData.startDate, 'dddd , h:mm TT')}</span>
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

            <div className="h-24" />
            <section className={`absolute left-0 bottom-0 w-full flex flex-col gap-7 py-6 ${ preview ? ' bg-[#F7F9FB] border-t border-[#00000033]':''}`}>
                {
                    preview &&
                    <div className="w-full flex px-8 justify-between">
                        <span className="text-2xl opacity-50 font-semibold">Total Amount</span>
                        <span className="text-2xl font-bold">${formData.totalPrice}</span>
                    </div>
                }
                <div className="flex justify-center">
                    <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-min sm:w-96" text={preview ? 'check-out' : 'continue'} />
                </div>
            </section>

        </Drawer >
        </>
    );
};


const mapStateToProps = (state) => ({
    respond: state.api.BookCopyrights,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    BookCopyrights
};

export default connect(mapStateToProps, mapDispatchToProps)(PermitsBooking);

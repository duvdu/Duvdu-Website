import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { handleMultipleFileUpload } from "../../../util/util";
import dateFormat from "dateformat";
import Successfully_posting from "../../popsup/post_successfully_posting";
import BookTeam from "../../elements/teams";
import { StudopBooking } from "../../../redux/action/apis/cycles/studio/book";

const StudioBooking = ({ respond, addprojectState, UpdateFormData, StudopBooking, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {

    const formData = addprojectState.formData
    const [openMap, setOpenMap] = useState(false);
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [creatives, setCreatives] = useState([]);

    useEffect(() => {
        if (
            formData.address?.length > 0 &&
            formData.jobDetails?.length > 5 &&
            formData.bookingHours &&
            formData.deadline
        ) setEnableBtn(true)
        else setEnableBtn(false)
    }, [formData])

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

    useEffect(() => {
        UpdateFormData('creatives', creatives.map(item => item._id))
    }, [creatives.length])

    useEffect(() => {
        UpdateFormData('location', {"lat": 50, "lng":50},)
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
    if (openMap)
        return <Drawer name={data.user.name} img={data.user.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
            <div className="py-10">
                <GoogleMap width={'90%'} value={formData.location}
                    onsetLocation={(value) => {
                        UpdateFormData('location[Lat]', value.Lat)
                        UpdateFormData('location[Lng]', value.Lng)
                    }}
                />
            </div>
        </Drawer >
    console.log("data = ", data)
    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={ontoggleDrawer} message="Booking"/>
            <Drawer name={preview ? 'Review Booking' : data.user.name} img={data.user.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
                <section className="my-11">
                    <BookTeam team={data.booktools} onChange={(value) => UpdateFormData('equipments', value)} />
                </section>
                <div className="mt-11" />
                <div className={preview ? ' hidden' : ''}>
                    <section>
                        <h3 className="capitalize opacity-60">job details</h3>
                        <textarea name="jobDetails" value={formData.jobDetails} onChange={handleInputChange} placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section className="my-11 flex justify-between gap-7">
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
                    <section className="w-full">
                        <h3 className="capitalize opacity-60 mt-11">upload alike project</h3>
                        <label htmlFor="attachment-upload" className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                            <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                                <Icon className="text-primary w-4" name={"image"} />
                            </div>
                            <span className="pl-5 w-full text-blue-600">Open gallery</span>
                            <Icon name={"angle-right"} className={"mr-2 w-2 text-primary"} />
                        </label>
                        <input onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
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
                    <section>
                        <p className="capitalize opacity-60 mt-11">booking Hours</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type="number" name="bookingHours" onChange={handleInputChange} value={formData.bookingHours} placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                            <span>
                                Hours
                            </span>
                        </div>
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 `}>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-min sm:w-96" text={'continue'} />
                        </div>
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
                    <section className={`left-0 bottom-0 absolute w-full flex flex-col gap-7 py-6 bg-[#F7F9FB] border-t border-[#00000033]`}>
                        <div className="w-full flex px-8 justify-between">
                            <span className="text-2xl opacity-50 font-semibold">Total Amount</span>
                            <span className="text-2xl font-bold">${formData.totalPrice}</span>
                        </div>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-min sm:w-96" text={'check-out'} />
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

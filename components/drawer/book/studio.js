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
import CustomSlider from "../../elements/customSlider";
import Ruler from "../../elements/Ruls";

const StudioBooking = ({ respond, addprojectState, UpdateFormData, StudopBooking, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {

    const formData = addprojectState.formData
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [creatives, setCreatives] = useState([]);
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    useEffect(() => {
        if (
            formData.jobDetails?.length > 5 &&
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
        UpdateFormData('totalPrice', data.projectBudget)
        if (data.creatives)
            setCreatives([...data.creatives])
    }, [isOpen])

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])

    function onsubmit() {
        if (!preview) {
            setPreview(true)
            return
        }
        if (submit)
            submit()
        StudopBooking(data._id, formData)
    }

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
            <Drawer name={preview ? 'Review Booking' : data.user.name} img={data.user.profileImage} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-y-scroll" padding={false}>
                <div className={preview ? ' hidden p-8 pt-0' : 'p-8 pt-0'}>
                    {
                        creatives.length > 0 &&
                        <section className="mt-11 p-8 pt-0">
                            <h3 className="capitalize opacity-60 mb-4">team</h3>
                            <BookTeam team={creatives.map(i => ({ ...i, name: i.creative.name }))} onChange={(value) => UpdateFormData('creative', value)} />
                        </section>
                    }
                    {
                        (data?.tools || data?.equipments)?.length > 0 &&
                        <section className="p-8 pt-0">
                            <h3 className="capitalize opacity-60 mb-4">equipments   </h3>
                            <BookTeam team={(data?.tools || data?.equipments)} onChange={(value) => UpdateFormData('equipments', value)} />
                        </section>
                    }
                    <div className="mt-11" />
                    <section>
                        <h3 className="capitalize opacity-60">job details</h3>
                        <textarea name="jobDetails" value={formData.jobDetails} onChange={handleInputChange} placeholder="requirements, conditions At least 6 char" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">extra payments</h3>
                        <div className="flex gap-2">
                            <div className="border border-[#00000040] px-3 py-1 rounded-full"> insurance </div>
                            <div className="border border-[#00000040] px-3 py-1 rounded-full">$ {data.insurance}</div>
                        </div>
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">number of {data.unit}</h3>
                        <CustomSlider initValue={5} values={10} onValueChange={(v)=> UpdateFormData('time',v) }/>
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">select Booking date</h3>
                        <SelectDate onChange={(value) => UpdateFormData('appointmentDate', value)} />
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={true} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'continue'} />
                        </div>
                    </section>
                </div>

                <div className={preview ? 'h-full ' : ' hidden'}>
                    <div className="h-full">
                        <div className="p-8">
                            {
                                creatives.length > 0 &&
                                <section className="mt-11 py-8 pt-0">
                                    <h3 className="capitalize opacity-60 mb-4">team</h3>
                                    <BookTeam team={creatives.map(i => ({ ...i, name: i.creative.name }))} onChange={(value) => UpdateFormData('creative', value)} />
                                </section>
                            }
                            {
                                (data?.tools || data?.equipments)?.length > 0 &&
                                <section className="py-8 pt-0">
                                    <h3 className="capitalize opacity-60 mb-4">equipments   </h3>
                                    <BookTeam team={(data?.tools || data?.equipments)} onChange={(value) => UpdateFormData('equipments', value)} />
                                </section>
                            }
                            <section className="w-full">
                                <h2 className='opacity-60 capitalize mb-3'> project type </h2>
                                <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                    shooting permits
                                </span>
                            </section>
                            <section className="w-full">
                                <h2 className='opacity-60 capitalize mb-2'> project details </h2>
                                <span className='capitalize mb-8 opacity-80 w-min font-bold'>
                                    {formData.jobDetails}
                                </span>
                            </section>
                            <div className="mt-4">
                                <h2 className='opacity-60 capitalize mb-2'> appointment date</h2>
                                <div className="flex items-center rounded-2xl bg-DS_white h-16 sm:w-96 p-2 cursor-pointer">
                                    <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                        <Icon className='text-primary' name={"calendar"} />
                                    </div>
                                    <div className="flex flex-col pl-5 w-full">
                                        <span className="font-normal text-base">{dateFormat(formData.appointmentDate, 'd mmmm , yyyy')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h2 className='opacity-60 capitalize mb-2'> location</h2>
                                <div className="flex items-center rounded-2xl bg-DS_white h-16 sm:w-96 p-2 cursor-pointer">
                                    <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                        <Icon className='text-primary w-4' name={"location-dot"} />
                                    </div>
                                    <div className="flex flex-col pl-5 w-full">
                                        <span className="font-normal text-base">{formData.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 bg-[#F7F9FB] border-t border-[#00000033]`}>
                        <div className="w-full flex px-8 justify-between">
                            <span className="text-2xl opacity-50 font-semibold">Total Amount</span>
                            <span className="text-2xl font-bold">${data.pricePerHour * formData.time}</span>
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

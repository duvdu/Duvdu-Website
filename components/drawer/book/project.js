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
import Successfully_posting from "../../popsup/post_successfully_posting";
import BookTeam from "../../elements/teams";
import AddAttachment from "../../elements/attachment";

const ProjectBooking = ({ respond, addprojectState, UpdateFormData, BookProject, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {

    const formData = addprojectState.formData
    const [openMap, setOpenMap] = useState(false);
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [creatives, setCreatives] = useState([]);
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    useEffect(() => {
        if (
            formData.address?.length > 0 &&
            formData.jobDetails?.length > 5 &&
            formData['customRequirement[measure]']?.length > 0 &&
            formData['customRequirement[unit]']?.length > 0 &&
            formData.shootingDays?.length > 0 &&
            
            formData.startDate
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
    function OnSucess() {
        BookProject(null)
        setPost_success(false)
        resetForm()
        toggleDrawer()
        ontoggleDrawer()
    }

    

    useEffect(() => {
        UpdateFormData('creatives', creatives.map(item => item._id))
    }, [creatives.length])

    useEffect(() => {
        UpdateFormData('location[lat]', 50)
        UpdateFormData('location[lng]', 50)
        UpdateFormData('numberOfHours', 1)
        UpdateFormData('customRequirement[unit]', 'minute')
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
        const form = new FormData()
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['receiver'])
        BookProject(data._id, form)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };


    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    if (openMap)
        return <Drawer name={data.user?.name} img={data.user?.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
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

            <Drawer name={preview ? 'Review Booking' : data.user?.name} img={data.user?.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} padding={false}>
                {!isOpen ?
                    <></> :
                    <>
                        <div className={preview ? ' hidden p-8 pt-0' : 'p-8 pt-0'}>
                            {
                                creatives.length > 0 &&
                                <section className="my-11">
                                    <h3 className="capitalize opacity-60 mb-4">team</h3>
                                    <BookTeam team={creatives.map(i => ({ ...i, name: i.creative.name }))} onChange={(value) => UpdateFormData('creative', value)} />
                                </section>
                            }
                            {
                                data.booktools?.length > 0 &&
                                <section className="my-11">
                                    <h3 className="capitalize opacity-60 mb-4">tools</h3>
                                    <BookTeam team={data.booktools} onChange={(value) => UpdateFormData('tools', value)} />
                                </section>
                            }
                            <section>
                                <h3 className="capitalize opacity-60">job details</h3>
                                <textarea name="jobDetails" value={formData.jobDetails} onChange={handleInputChange} placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                            </section>
                            <section className="my-11 max-w-64">
                                <h3 className="capitalize opacity-60 mb-4">Start Date</h3>
                                <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                            </section>
                            <section className="my-11 max-w-64">
                                <h3 className="capitalize opacity-60 mb-4">appointment Date</h3>
                                <SelectDate onChange={(value) => UpdateFormData('appointmentDate', value)} />
                            </section>
                            <section className="my-11 gap-7 mr-24 ${ispreview">
                                <h3 className="capitalize opacity-60 mb-4">address</h3>
                                <input placeholder='address' className={inputStyle} value={formData.address} onChange={handleInputChange} name="address" />
                            </section>
                            <section className="my-11 gap-7 hidden">
                                <div className="w-full">
                                    <h3 className="capitalize opacity-60 mb-4">location</h3>
                                    <div onClick={() => setOpenMap(true)} className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
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
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v)=>setAttachmentValidation(v)} />
                            </section>
                            <section>
                                <p className="capitalize opacity-60 mt-11">Custom requirements</p>
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" name="customRequirement[measure]" onChange={handleInputChange} value={formData['customRequirement[measure]']} placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                                    <select
                                        className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalize"
                                        value={formData['customRequirement[unit']}
                                        onChange={handleInputChange}
                                        name="customRequirement[unit]"
                                        required
                                    >
                                        
                                        {['minute', 'hour'].map((value, index) => (
                                            <option key={index} value={value.toLowerCase()}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                            </section>
                            <section>
                                <p className="capitalize opacity-60 mt-11">shooting days</p>
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" name="shootingDays" onChange={handleInputChange} value={formData.shootingDays} placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                                    <span>
                                        Days
                                    </span>
                                </div>
                            </section>
                            <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 `}>
                                <div className="flex justify-center">
                                    <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'continue'} />
                                </div>
                            </section>
                        </div>

                        <div className={preview ? ' flex flex-col gap-9' : ' hidden'}>
                            <div className="flex flex-col gap-9 overflow-y-scroll overflow-x-hidden p-8">
                                {
                                    creatives.length > 0 &&
                                    <section className="">
                                        <h3 className="capitalize opacity-60 mb-4">team</h3>
                                        <BookTeam team={creatives.map(i => ({ ...i, name: i.creative.name, removable: true }))} onChange={(value) => UpdateFormData('creative', value)} />
                                    </section>
                                }
                                {
                                    data.booktools?.length > 0 &&
                                    <section className="">
                                        <h3 className="capitalize opacity-60 mb-4">tools</h3>
                                        <BookTeam team={data.booktools.map(i => ({ ...i, removable: true }))} onChange={(value) => UpdateFormData('tools', value)} />
                                    </section>
                                }
                                <section className="w-full">
                                    <h2 className='opacity-60 mb-3'> project type </h2>
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

                                <section className="w-full">
                                    <h2 className='opacity-60 capitalize mb-3'> Custom Requirements </h2>
                                    <span className='capitalize mb-8 opacity-80 w-min whitespace-nowrap font-bold'>
                                        {formData['customRequirement[measure]']} {formData['customRequirement[unit]']}
                                    </span>
                                </section>

                                <section className="w-full">
                                    <h2 className='opacity-60 capitalize mb-3'> Shooting Days </h2>
                                    <span className='capitalize mb-8 opacity-80 w-min whitespace-nowrap font-bold'>
                                        {formData.shootingDays}
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
                            <section className={`w-full flex flex-col gap-7 py-6 bg-[#F7F9FB] border-t border-[#00000033]`}>
                                <div className="w-full flex px-8 justify-between">
                                    <span className="text-2xl opacity-50 font-semibold">Total Amount</span>
                                    <span className="text-2xl font-bold">${formData.totalPrice}</span>
                                </div>
                                <div className="flex justify-center">
                                    <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'check-out'} />
                                </div>
                            </section>
                        </div>
                    </>

                }
            </Drawer >
        </>

    );
};


const mapStateToProps = (state) => ({
    respond: state.api.BookProject,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    BookProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBooking);

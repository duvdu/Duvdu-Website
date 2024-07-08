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
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import BookTeam from "../../elements/teams";
import AddAttachment from "../../elements/attachment";
import CustomSlider from "../../elements/customSlider";

const ProjectBooking = ({ respond, addprojectState, UpdateFormData, BookProject, resetForm, data = {}, isOpen, toggleDrawer, submit, user }) => {

    const formData = addprojectState.formData
    const [openMap, setOpenMap] = useState(false);
    const [preview, setPreview] = useState(false);

    const [post_success, setPost_success] = useState(false);
    const [creatives, setCreatives] = useState([]);
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    function calculateTotalPrice() {
        // Extract project scale information from formdata
        const numberOfUnits = formData['projectScale[numberOfUnits]'];

        // Extract price per unit from data
        const pricePerUnit = data.projectScale.pricerPerUnit;

        // Calculate the project scale cost
        const projectScaleCost = numberOfUnits * pricePerUnit;

        // Calculate the tools cost
        let toolsCost = 0;
        if (formData.tools && formData.tools.length > 0) {
            const toolIds = formData.tools;
            toolsCost = data.tools.reduce((total, tool) => {
                if (toolIds.includes(tool._id)) {
                    return total + tool.unitPrice;
                }
                return total;
            }, 0);
        }

        // Calculate the functions cost
        let functionsCost = 0;
        if (formData.functions && formData.functions.length > 0) {
            const functionIds = formData.functions;
            functionsCost = data.functions.reduce((total, func) => {
                if (functionIds.includes(func._id)) {
                    return total + func.unitPrice;
                }
                return total;
            }, 0);
        }

        // Calculate the total price
        const totalPrice = projectScaleCost + toolsCost + functionsCost;

        return totalPrice;
    }

    const validateRequiredFields = () => {
        const errors = {};

        if (!formData.startDate) errors.startDate = 'startDate is required';
        if ((formData.details?.length || 0) < 5) errors.details = 'details is required';
        if (!formData.appointmentDate) errors.appointmentDate = 'appointmentDate is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData['location[lat]'] || !formData['location[lng]']) errors.location = 'Location is required';
        if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment not valid';

        return errors;
    };

    const enableBtn = Object.keys(validateRequiredFields()).length == 0

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
        UpdateFormData('totalPrice', data.projectBudget)
        if (data.creatives) {
            setCreatives([{ ...data.user, removable: true }])
        }
        UpdateFormData('tools', data?.tools || [])
        UpdateFormData('functions', data?.functions || [])
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
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['attachments', 'tools', 'functions'])
        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i];
                form.append(`attachments`, file.file);
            }

        if (formData.functions)
            for (var i = 0; i < formData.functions.length; i++) {
                form.append(`equipment[functions][${i}][id]`, formData.functions[i]);
            }

        if (formData.tools)
            for (var i = 0; i < formData.tools.length; i++) {
                form.append(`equipment[tools][${i}][id]`, formData.tools[i]);
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
    
    
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Booking" />

            <Drawer name={preview ? 'Review Booking' : data.user?.name} img={data.user?.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} padding={false}>
                {!isOpen ?
                    <></> :
                    <>
                        <div className={preview ? ' hidden' : 'p-8 pt-0'}>
                            {/* {
                                false &&
                                creatives.length > 0 &&
                                <section className="my-11">
                                    <h3 className="capitalize opacity-60 mb-4">team</h3>
                                    <BookTeam team={creatives.map(i => ({ ...i, name: i.name }))} onChange={(value) => UpdateFormData('creative', value)} />
                                </section>
                            } */}
                            {
                                (data?.tools || data?.equipments)?.length > 0 &&
                                <section className="my-11">
                                    <BookTeam team={creatives.map(i => ({ ...i, name: i.name }))} />
                                    <BookTeam team={(formData?.tools || formData?.equipments)} onChange={(value) => UpdateFormData('tools', value)} />
                                    <BookTeam team={(formData?.functions)} onChange={(value) => UpdateFormData('functions', value)} />
                                </section>
                            }
                            <section className="mt-7">
                                <h3 className="capitalize opacity-60">job details</h3>
                                <textarea name="details" value={formData.details || ""} onChange={handleInputChange} placeholder="requirements, conditions At least 6 char" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                            </section>
                            <section className="my-11 gap-7 h-96 relative overflow-hidden">
                                <h3 className="capitalize opacity-60 mb-4">location</h3>
                                <GoogleMap 
                                width={'100%'} 
                                value={{ 'lat': formData['location[lat]'], 'lng': formData['location[lng]'] }} 
                                onChangeAddress={handleInputChange} 
                                onsetLocation={handlelocationChange} />
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
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                            </section>
                            <section className="my-11">
                                <div className="flex justify-between">
                                    <h3 className="capitalize opacity-60 mb-4">set number of {data.projectScale.unit}</h3>
                                    <span className="capitalize opacity-60 mb-4">{formData['projectScale[numberOfUnits]']} {data.projectScale.unit}</span>
                                </div>
                                <CustomSlider initValue={data.projectScale.minimum} values={data.projectScale.maximum} onValueChange={(v) => UpdateFormData('projectScale[numberOfUnits]', v)} />
                            </section>
                            <section className="my-11">
                                <h3 className="capitalize opacity-60 mb-4">appointment Date</h3>
                                <SelectDate onChange={(value) => UpdateFormData('appointmentDate', value)} />
                            </section>
                            <section className="my-11">
                                <h3 className="capitalize opacity-60 mb-4">Start Date</h3>
                                <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                            </section>
                            <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                                <div className="flex justify-center">
                                    <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'continue'} />
                                </div>
                            </section>
                        </div>

                        {preview &&
                        <div className='flex flex-col gap-9 h-full'>
                            <div className="flex flex-col gap-9 overflow-y-scroll overflow-x-hidden p-8 h-full">
                                <section>
                                    <BookTeam team={creatives.map(i => ({ ...i, name: i.name }))} mainremovable={false} />
                                    <BookTeam team={(formData?.tools || formData?.equipments || [])} mainremovable={false} />
                                    <BookTeam team={(formData?.functions || [])} mainremovable={false} />
                                </section>
                                <section className="w-full hidden">
                                    <h2 className='opacity-60 mb-3'> project type </h2>
                                    <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>
                                        shooting permits
                                    </span>
                                </section>
                                <section className="w-full">
                                    <h2 className='opacity-60 capitalize mb-3'> project details </h2>
                                    <span className='capitalize mb-8 opacity-80 w-min font-bold'>
                                        {formData.details}
                                    </span>
                                </section>

                                <section className="w-full">
                                    <h2 className='opacity-60 capitalize mb-3'> Custom Requirements </h2>
                                    <span className='capitalize mb-8 opacity-80 w-min whitespace-nowrap font-bold'>
                                        {formData['projectScale[numberOfUnits]']} {data.projectScale.unit}
                                    </span>
                                </section>

                                <section className="w-full h-16 sm:w-96 p-2 mt-4">
                                    <h2 className='opacity-60 capitalize mb-3'> Custom Requirements </h2>
                                    <div className="flex items-center rounded-2xl bg-DS_white">
                                        <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                            <Icon className='text-primary' name={"calendar"} />
                                        </div>
                                        <div className="flex flex-col pl-5 w-full">
                                            <span className="font-normal text-base">{dateFormat(formData.appointmentDate, 'd mmmm , yyyy')}</span>
                                            <span className="text-[#747688] text-xs">{dateFormat(formData.appointmentDate, 'dddd , h:mm TT')}</span>
                                        </div>
                                    </div>
                                </section>

                                <section className="w-full h-16 sm:w-96 p-2 mt-4">
                                    <h2 className='opacity-60 capitalize mb-3'> Custom Requirements </h2>
                                    <div className="flex items-center rounded-2xl bg-DS_white">
                                        <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                            <Icon className='text-primary' name={"calendar"} />
                                        </div>
                                        <div className="flex flex-col pl-5 w-full">
                                            <span className="font-normal text-base">{dateFormat(formData.startDate, 'd mmmm , yyyy')}</span>
                                            <span className="text-[#747688] text-xs">{dateFormat(formData.startDate, 'dddd , h:mm TT')}</span>
                                        </div>
                                    </div>
                                </section>

                                <section className="w-full h-16 sm:w-96 p-2 mt-4">
                                    <h2 className='opacity-60 capitalize mb-3'> address </h2>
                                    <div className="flex items-center rounded-2xl bg-DS_white">
                                        <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                            <Icon className='text-primary w-6' name={"location-dot"} />
                                        </div>
                                        <div className="flex flex-col pl-5 w-full">
                                            <span className="font-normal text-base">{formData.address}</span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 bg-[#F7F9FB] border-t border-[#00000033]`}>
                                <div className="w-full flex px-8 justify-between">
                                    <span className="text-2xl opacity-50 font-semibold">Total Amount</span>
                                    <span className="text-2xl font-bold">${calculateTotalPrice()}</span>
                                </div>
                                <div className="flex justify-center">
                                    <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text={'Appointment Now'} />
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

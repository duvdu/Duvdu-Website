import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { UpdateKeysAndValues } from "../../../util/util";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import { BookProducer } from "../../../redux/action/apis/cycles/producer/book";
import AddAttachment from "../../elements/attachment";

const ProducerBooking = ({ respond, addprojectState, UpdateFormData, BookProducer, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {

    const formData = addprojectState.formData
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [attachmentValidation, setAttachmentValidation] = useState(true);

    if (
        formData.producer?.length > 0 &&
        formData.projectDetails?.length > 0 &&
        formData.episodesDuration?.length > 0 &&
        formData.expectedBudget?.length > 0 &&
        formData.episodesNumber?.length > 0 &&
        formData.expectedProfits?.length > 0 &&
        formData.platform?.length > 0 &&
        formData.appointmentDate &&
        formData.attachments &&
        attachmentValidation > 0
    ) {
        if (!enableBtn)
            setEnableBtn(true)
    }
    else {
        if (enableBtn)
            setEnableBtn(false)
    }

    function OnSucess() {
        reset()
    }
    function reset() {
        BookProducer(null)
        setPost_success(false)
        resetForm()
        if(isOpen)
        toggleDrawer()
    }




    useEffect(() => {
        UpdateFormData('producer', data._id)
    }, [isOpen])

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])

    
    function onSubmit() {
        if (submit)
            submit()
        const form = new FormData()
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['attachments'])
        
        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i].file;
                form.append(`attachments`, file);
            }
        BookProducer(data._id, form)
    }

    const handlelocationChange = (location) => {
        UpdateFormData('location.lat', location.lat)
        UpdateFormData('location.lng', location.lng)
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value)) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value)
    };

    
    // const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";
    const inputStyle = "bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 p-5 w-full";
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Booking" />
            <Drawer name={data.user?.name} img={data.user?.profileImage} isOpen={isOpen} toggleDrawer={reset} className="overflow-scroll">
                <div className='flex flex-col gap-7 container mx-auto'>

                    <section>
                        <h3 className="capitalize opacity-60 mt-10">Platform</h3>
                        <input type="text" placeholder='Enter Platform...' className={inputStyle} value={formData.platform || ""} onChange={handleInputChange} name="platform" />
                    </section>

                    <section>
                        <h3 className="capitalize opacity-60">Project Details</h3>
                        <textarea name="projectDetails" value={formData.projectDetails || ""} onChange={handleInputChange} placeholder="Main Idea" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>

                    <section className="h-96 relative overflow-hidden">
                        <span> Project Location </span>
                        <GoogleMap width={'100%'} value={{ 'lat': formData['location.lat'], 'lng': formData["location.lng"] }} onChangeAddress={handleInputChange} onsetLocation={handlelocationChange} />
                    </section>
                    <div className="flex w-full justify-between gap-3">
                        <section className="w-full">
                            <p className="capitalize opacity-60">Episodes Number</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={0} value={formData.episodesNumber || ""} onChange={handleInputChange} name='episodesNumber' placeholder="Ex. 5" className={inputStyle} />
                            </div>
                        </section>
                        <section className="w-full">
                            <p className="capitalize opacity-60">Episode Duration</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={0} value={formData.episodesDuration || ""} onChange={handleInputChange} name='episodesDuration' placeholder="Ex. 15 minutes" className={inputStyle} />
                            </div>
                        </section>
                    </div>

                    <section>
                        <h3 className="capitalize opacity-60 mb-4">budget range</h3>
                        <div className="flex gap-2">
                            <div className="border border-[#00000040] px-3 py-1 rounded-full"> {data.minBudget} to {data.maxBudget} </div>
                        </div>
                    </section>

                    <div className="flex w-full justify-between gap-3">
                        <section className="w-full">
                            <p className="capitalize opacity-60">Expected Budget</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={0} value={formData.expectedBudget || ""} onChange={handleInputChange} name='expectedBudget' placeholder="Ex. 10$" className={inputStyle} />
                            </div>
                        </section>

                        <section className="w-full">
                            <p className="capitalize opacity-60">Expected Profits</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={0} value={formData.expectedProfits || ""} onChange={handleInputChange} name='expectedProfits' placeholder="Ex. 10$" className={inputStyle} />
                            </div>
                        </section>
                    </div>

                    <section className="w-full ">
                        <h3 className="capitalize opacity-60">Upload Media</h3>
                        <AddAttachment name="attachments" value={formData.attachments || ""} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />

                    </section>

                    <section className="justify-between gap-7">
                        <h3 className="capitalize opacity-60 mb-5">Select Appointment Date</h3>
                        <SelectDate value={formData.appointmentDate} onChange={(value) => UpdateFormData('appointmentDate', value)} />
                    </section>
                    <ArrowBtn isEnable={enableBtn} onClick={onSubmit} className="left-0 bottom-10 sticky w-auto mb-7 mt-14 mx-14" text={"Submit"} shadow={true} shadowHeight={"14"} />

                </div>
            </Drawer >
        </>

    );
};


const mapStateToProps = (state) => ({
    respond: state.api.BookProducer,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    BookProducer
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerBooking);

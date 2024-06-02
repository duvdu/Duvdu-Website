import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { UpdateKeysAndValues, handleMultipleFileUpload, handleRemoveEvent, parseFileSize } from "../../../util/util";
import dateFormat from "dateformat";
import Successfully_posting from "../../popsup/post_successfully_posting";
import BookTeam from "../../elements/teams";
import { BookProducer } from "../../../redux/action/apis/cycles/producer/book";
import AddAttachment from "../../elements/attachment";

const ProducerBooking = ({ respond, addprojectState, UpdateFormData, BookProducer, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {

    const formData = addprojectState.formData
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    const [attachmentValidation, setAttachmentValidation] = useState(true);
    
    useEffect(() => {
        if (
            formData.details?.length > 0 &&
            formData.episodeduration?.length > 0 &&
            formData.expectedbudget?.length > 0 &&
            formData.episodes?.length > 0 &&
            formData.expectedprofits?.length > 0 &&
            formData.platform?.length > 0 &&
            attachmentValidation > 0 &&
            formData.producer?.length > 0 
        ) setEnableBtn(true)
        else setEnableBtn(false)
    }, [formData])

    function ontoggleDrawer() {

        if (toggleDrawer) {
            resetForm()
            toggleDrawer()
        }
        else
            resetForm()
    }
    function OnSucess() {
        BookProducer(null)
        setPost_success(false)
        resetForm()
        toggleDrawer()
        ontoggleDrawer()
    }

    

    useEffect(() => {

        UpdateFormData('producer', data?.user?._id)
        
    }, [isOpen])

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])


    function onsubmit() {

        if (submit)
            submit()
        const form = new FormData()
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['receiver'])
    }

    const attachmentsUpload = (e) => {
        console.log(e)
        UpdateFormData('attachments', handleMultipleFileUpload(e))
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };


    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={OnSucess} message="Booking" />
            <Drawer name={data.user?.username} img={data.user?.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">

                <div className="mt-11" />
                <div>
                   
                    <section>
                        <h3 className="capitalize opacity-60">details</h3>
                        <textarea name="details" value={formData.details || ""} onChange={handleInputChange} placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section section className="my-11 max-w-64">
                        <p className="capitalize opacity-60">budget</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' value={formData.expectedbudget || ""} onChange={handleInputChange} name='expectedbudget' placeholder="Ex. 10$" className={inputStyle}/>
                        </div>
                    </section>
                    <section section className="my-11 max-w-64">
                        <p className="capitalize opacity-60">profits</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' value={formData.expectedprofits || ""} onChange={handleInputChange} name='expectedprofits' placeholder="Ex. 10$" className={inputStyle}/>
                        </div>
                    </section>
                    <section section className="my-11 max-w-64">
                        <p className="capitalize opacity-60">episodes</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' value={formData.episodes || ""} onChange={handleInputChange} name='episodes' placeholder="Ex. 5" className={inputStyle}/>
                        </div>
                    </section>
                    <section section className="my-11 max-w-64">
                        <p className="capitalize opacity-60">duration</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' value={formData.episodeduration || ""} onChange={handleInputChange} name='episodeduration' placeholder="Ex. 15 minutes" className={inputStyle} />
                        </div>
                    </section>
                    <section section className="my-11">
                        <p className="capitalize opacity-60">platform</p>
                        <textarea name='platform' value={formData.platform || ""} onChange={handleInputChange} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4" />
                    </section>
                    <section className="w-full">
                        <h3 className="capitalize opacity-60 mt-11">attachments</h3>
                        <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v)=>setAttachmentValidation(v)} />
                        {/* 
                        <label htmlFor="attachment-upload" className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                            <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                                <Icon className="text-primary w-4" name={"image"} />
                            </div>
                            <span className="pl-5 w-full text-blue-600">Open gallery</span>
                            <Icon name={"angle-right"} className={"mr-2 w-2 text-primary"} />
                        </label>

                        <input onClick={handleRemoveEvent} onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
                        {
                            formData.attachments &&
                            formData.attachments.length > 0 &&
                            formData.attachments.map((file, key) => (
                                parseFileSize(file.formattedFileSize) <= parseFileSize('3 MB') ?
                                <div key={key} className='flex bg-[#EEF1F7] dark:bg-[#18140c] rounded-3xl items-center gap-4 p-2 mt-5'>
                                    <Icon name={'file'} className="size-10" />
                                    <div>
                                        <span className=''>{file.fileName}</span>
                                        <br />
                                        <span className='text-[#A9ACB4]'>{file.formattedFileSize}</span>
                                    </div>
                                </div>: 
                                <div key={key} className='flex bg-[#EEF1F7] dark:bg-[#18140c] rounded-3xl items-center gap-4 p-2 mt-5'>
                                <Icon name={'file-error'} className="size-10" />
                                <div>
                                    <span className='text-[#C92519] font-bold'>{file.fileName}</span>
                                    <br />
                                    <span className='text-[#C92519]'> {"File Over Size : "}{file.formattedFileSize}</span>
                                    <br />
                                </div>
                            </div>
                            ))
                        } */}
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 `}>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-min sm:w-96" text={'continue'} />
                        </div>
                    </section>
                    
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

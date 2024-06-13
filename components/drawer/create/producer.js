import Layout from "../../layout/Layout";
import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Button from '../../elements/button';

import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { filterByCycle, gettFileUploaded, handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import Successfully_posting from "../../popsup/post_successfully_posting";
import Drawer from "../../elements/drawer";
import { CreateProducer } from "../../../redux/action/apis/cycles/producer/create";
import ArrowBtn from "../../elements/arrowBtn";
import AddAttachment from "../../elements/attachment";
import SelectDate from "../../elements/selectDate";
import GoogleMap from "../../elements/googleMap";


const AddProducer = ({ CreateProducer, resetForm, addprojectState, respond, auth }) => {
    const formData = addprojectState.formData
    const router = useRouter();

    const [post_success, setPost_success] = useState(false);
    const [attachmentValidation, setAttachmentValidation] = useState(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };
    const onSubmit = (e) => {
        return;
        CreateProducer()
    }

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])


    useEffect(() => {
        if (auth.login === false)
            router.push({ pathname: "/" });
    }, [auth.login])

    const toggleDrawer = () => {
        setPost_success(false)

        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }


    const inputStyle = "bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 p-5 w-full";

    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Drawer isOpen={true} name={'add producer'} toggleDrawer={toggleDrawer}>
                <div className='flex flex-col gap-7 container mx-auto'>

                    <section>
                        <h3 className="capitalize opacity-60 mt-10">Platform</h3>
                        <input type="text" placeholder='Enter Platform...' className={inputStyle} value={formData.platform} onChange={handleInputChange} name="platform" />
                    </section>

                    <section>
                        <h3 className="capitalize opacity-60">Project Details</h3>
                        <textarea name="projectDetails" value={formData.projectDetails} onChange={handleInputChange} placeholder="Main Idea" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>

                    <section className="h-96 relative overflow-hidden">
                        <span> Project Location </span>
                        <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)} />
                    </section>
                    <div className="flex w-full justify-between gap-3">
                        <section className="w-full">
                            <p className="capitalize opacity-60">Episodes Number</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type='number' value={formData.episodes} onChange={handleInputChange} name='episodes' placeholder="Ex. 5" className={inputStyle} />
                            </div>
                        </section>
                        <section className="w-full">
                            <p className="capitalize opacity-60">Episode Duration</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type='number' value={formData.episodeDuration} onChange={handleInputChange} name='episodeDuration' placeholder="Ex. 15 minutes" className={inputStyle} />
                            </div>
                        </section>
                    </div>

                    <div className="flex w-full justify-between gap-3">
                    <section className="w-full">
                        <p className="capitalize opacity-60">Expected Budget</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' value={formData.expectedBudget} onChange={handleInputChange} name='expectedBudget' placeholder="Ex. 10$" className={inputStyle} />
                        </div>
                    </section>

                    <section className="w-full">
                        <p className="capitalize opacity-60">Expected Profits</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' value={formData.expectedProfits} onChange={handleInputChange} name='expectedProfits' placeholder="Ex. 10$" className={inputStyle} />
                        </div>
                    </section>
                    </div>

                    <section className="w-full ">
                        <h3 className="capitalize opacity-60">Upload Media</h3>
                        <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />

                    </section>

                    <section className="justify-between gap-7">
                        <h3 className="capitalize opacity-60 mb-5">Select Appointment Date</h3>
                        <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                    </section>
                    <ArrowBtn onClick={onSubmit} className="left-0 bottom-10 sticky w-auto mb-7 mt-14 mx-14" text={"Submit"} shadow={true} shadowHeight={"14"} />

                </div>
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    respond: state.api.CreateProducer,
    addprojectState: state.addproject,

});

const mapDispatchToProps = {
    CreateProducer,
    resetForm,
};


export default connect(mapStateToProps, mapDispatchToProps)(AddProducer);


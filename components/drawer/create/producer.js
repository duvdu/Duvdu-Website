import Layout from "../../layout/Layout";
import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Button from '../../elements/button';

import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { ClosePopUp, OpenPopUp, filterByCycle, gettFileUploaded, handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import Successfully_posting from "../../popsup/post_successfully_posting";
import Drawer from "../../elements/drawer";
import { CreateProducer } from "../../../redux/action/apis/cycles/producer/create";
import ArrowBtn from "../../elements/arrowBtn";
import ListInput from "../../elements/listInput";
import CategorySelection from "./assets/CategorySelection";

const AddProducer = ({ CreateProducer, resetForm, addprojectState, respond, auth }) => {
    const formData = addprojectState.formData
    const router = useRouter();
    const SuccessfullyPopupId = "Producer-Booking"
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
            OpenPopUp(SuccessfullyPopupId)
    }, [respond?.message])


    useEffect(() => {
        if (auth.login === false)
            router.push({ pathname: "/" });
    }, [auth.login])

    const toggleDrawer = () => {
        ClosePopUp(SuccessfullyPopupId)

        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }


    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    return (
        <>
            <Successfully_posting id={SuccessfullyPopupId} onCancel={toggleDrawer} message="Booking" />
            <Drawer isOpen={true} name={'add producer'} toggleDrawer={toggleDrawer}>
                <div className='flex flex-col gap-14 container mx-auto mt-20'>
                    <div>
                        <CategorySelection
                            value={{
                                'category': formData.category,
                                'subCategory': formData.subCategory,
                                'tags': formData.tags,
                            }}
                            onChange={(value) => {
                                UpdateFormData('category', value.category)
                                UpdateFormData('subCategory', value.subCategory)
                                UpdateFormData('tags', value.tags)
                            }} />
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
                    <div>
                    <ListInput name={'searchKeyword'} placeholder={'Search keywords'} onChange={(keys) => UpdateFormData('searchKeywords', keys)} />
                    </div>

                    <ArrowBtn onClick={onSubmit} className="left-0 bottom-10 sticky w-auto mb-7 mt-14 mx-14" text={"Publish"} shadow={true} shadowHeight={"14"} />

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


import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { ClosePopUp, OpenPopUp } from "../../../util/util";
import Successfully_posting from "../../popsup/post_successfully_posting";
import Drawer from "../../elements/drawer";
import { CreateProducer } from "../../../redux/action/apis/cycles/producer/create";
import ArrowBtn from "../../elements/arrowBtn";
import ListInput from "../../elements/listInput";
import ProducerCategorySelection from "./assets/producerCategorySelection";

const AddProducer = ({ CreateProducer, resetForm, UpdateFormData, addprojectState, respond, auth }) => {
    const formData = addprojectState.formData
    const router = useRouter();
    const SuccessfullyPopupId = "Producer-Booking"

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name == "maxBudget" || name == "minBudget")
            value = parseInt(value)
        UpdateFormData(name, value)
    };
    const onSubmit = (e) => {
        CreateProducer(formData)
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
        CreateProducer(-1)
        resetForm()
        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }
    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";
    
    return (
        <>
            <Successfully_posting id={SuccessfullyPopupId} onCancel={toggleDrawer} message="Booking" />
            <Drawer isOpen={true} name={'add producer'} toggleDrawer={toggleDrawer}>
                <div className='flex flex-col gap-14 container mx-auto mt-8'>
                    <div>
                        <ProducerCategorySelection
                            filterIn={"producer"}
                            value={{
                                "category": formData.category,
                                "subCategories": formData.subcategory
                            }}
                            onChange={(value) => {
                                UpdateFormData('category', value.category)
                                UpdateFormData('subcategory', value.subCategories)
                            }} />
                    </div>

                    <div className="flex w-full justify-between gap-3">
                        <section className="w-full">
                            <p className="capitalize opacity-60">Min Budget</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type='number' value={formData.minBudget || ""} onChange={handleInputChange} name='minBudget' placeholder="Ex. 5$" className={inputStyle} />
                            </div>
                        </section>

                        <section className="w-full">
                            <p className="capitalize opacity-60">Max Budget</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type='number' value={formData.maxBudget || ""} onChange={handleInputChange} name='maxBudget' placeholder="Ex. 10$" className={inputStyle} />
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
    UpdateFormData
};


export default connect(mapStateToProps, mapDispatchToProps)(AddProducer);


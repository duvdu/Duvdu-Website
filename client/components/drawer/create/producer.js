import React, { useCallback, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { UpdateFormData, resetForm, setSubmitt } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { ClosePopUp, OpenPopUp } from "../../../util/util";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import Drawer from "../../elements/drawer";
import ArrowBtn from "../../elements/arrowBtn";
import { useTranslation } from 'react-i18next';

import ListInput from "../../elements/listInput";
import ProducerCategorySelection from "./assets/producerCategorySelection";
import { GetIsLoggedProducer } from '../../../redux/action/apis/cycles/producer/islogged';
import { CreateProducer } from "../../../redux/action/apis/cycles/producer/create";
import { DeleteProducer } from '../../../redux/action/apis/cycles/producer/delete';
import { UpdateProducer } from '../../../redux/action/apis/cycles/producer/update';

const transformKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(transformKeys);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = key === 'subCategory' ? 'subcategory' : key;
            acc[newKey] = transformKeys(obj[key]);
            return acc;
        }, {});
    }
    return obj;
};

function convertSubCategoryData(data) {
    if (!Array.isArray(data)) {
        return data;
    }

    // Check if the data is already in the desired format
    const isAlreadyFormatted = data.every(item =>
        item.subCategory &&
        Array.isArray(item.tags) &&
        item.tags.every(tag => typeof tag === 'string')
    );

    if (isAlreadyFormatted) {
        return data;
    }

    // Convert to the desired format
    return data.map(item => ({
        subCategory: item._id,
        tags: item.tags.map(tag => tag?._id)
    }));
}



const AddProducer = ({
    GetIsLoggedProducer,
    getIsLoggedProducer_respond,
    resetForm,
    UpdateFormData,
    addprojectState,

    CreateProducer,
    createProducer_respond,

    UpdateProducer,
    updateProducer_respond,

    DeleteProducer,
    deleteProducer_respond,
    auth }) => {
    const { t } = useTranslation();
    const formData = addprojectState.formData
    const router = useRouter();
    const SuccessfullyCreatePopupId = "Producer-Booking"
    const SuccessfullyDeletePopupId = "Producer-delete"
    const SuccessfullyUpdatePopupId = "Producer-update"
    const [isProducer, setIsProducer] = useState(false);
    const [validateTags, setValidateTags] = useState(false);
    const producerData = getIsLoggedProducer_respond?.data;

    if (producerData && Array.isArray(producerData.subCategories)) {
        producerData.subCategories = convertSubCategoryData(producerData.subCategories);
    }

    const handleInputChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            if (!isNaN(value) && parseInt(value) < 0) {
                value = Math.abs(Number(value));
            }
            UpdateFormData(name, name === 'maxBudget' || name === 'minBudget' ? parseInt(value) : value);
        },
        [UpdateFormData]
    );

    useEffect(() => {
        GetIsLoggedProducer()
    }, [GetIsLoggedProducer])

    useEffect(() => {
        if (producerData) {
            setIsProducer(true);
        }
    }, [producerData, UpdateFormData]);

    useEffect(() => {
        if (createProducer_respond?.data) OpenPopUp(SuccessfullyCreatePopupId);
    }, [createProducer_respond]);

    useEffect(() => {
        if (deleteProducer_respond?.data) OpenPopUp(SuccessfullyDeletePopupId);
    }, [deleteProducer_respond]);

    useEffect(() => {
        if (updateProducer_respond?.data) OpenPopUp(SuccessfullyUpdatePopupId);
    }, [updateProducer_respond]);

    useEffect(() => {
        if (auth.login === false) router.push({ pathname: '/' });
    }, [auth.login, router]);


    const handleSubmit = () => {
        if (formData.subcategory) formData.subcategory = transformKeys(formData.subcategory);
        CreateProducer(formData);
    };

    const handleUpdate = () => {
        if (formData.subcategory) formData.subcategory = transformKeys(formData.subcategory);
        if (formData.minBudget || formData.maxBudget) {
            formData.maxBudget = formData.maxBudget || producerData?.maxBudget
            formData.minBudget = formData.minBudget || producerData?.minBudget
        }
        UpdateProducer(formData);
    };

    const handleDelete = () => {
        DeleteProducer();
    };

    const toggleDrawer = () => {
        [SuccessfullyCreatePopupId, SuccessfullyDeletePopupId, SuccessfullyUpdatePopupId].forEach(ClosePopUp);
        [CreateProducer, DeleteProducer, UpdateProducer].forEach((action) => action(-1));
        router.replace({ pathname: `/creative/${auth.username}` });
        resetForm();
    };


    const isFormValidForSubmit = () => {
        return (formData.category || false) &&
            (formData.minBudget || false) &&
            (formData.maxBudget || false) &&
            validateTags &&
            formData.searchKeywords?.length > 0 &&
            formData.subcategory?.length > 0;
    };

    const isFormValidForUpdate = () => {
        return formData.category ||
            formData.minBudget ||
            formData.maxBudget ||
            formData.searchKeywords?.length > 0 ||
            (formData.subcategory?.length > 0 && validateTags);

    };


    const canDelete = true;


    return (
        <>
            <SuccessfullyPosting id={SuccessfullyUpdatePopupId} onCancel={toggleDrawer} message="Update" />
            <SuccessfullyPosting id={SuccessfullyDeletePopupId} onCancel={toggleDrawer} message="Delete" />
            <SuccessfullyPosting id={SuccessfullyCreatePopupId} onCancel={toggleDrawer} message="Create" />
            <Drawer isOpen={true} name={'add producer'} toggleDrawer={toggleDrawer} padding={false}>
                <div className='flex flex-col justify-between h-full container mx-auto'>
                    <div className='flex flex-col h-full gap-14 container mx-auto mt-8'>
                        <div>
                            <ProducerCategorySelection
                                filterIn={"producer"}
                                value={{
                                    "category": formData.category || producerData?.category,
                                    "subCategories": formData.subcategory || producerData?.subCategories
                                }}
                                onValidateChange={(v) => setValidateTags(v.length == 0)}
                                onChange={(value) => {
                                    if (producerData?.category != value.category && value.category || JSON.stringify(producerData?.subcategory) != JSON.stringify(value.subCategories) && value.subCategories.length) {
                                        UpdateFormData('category', value.category)
                                        UpdateFormData('subcategory', value.subCategories)
                                    }
                                }} />
                        </div>

                        <div className="flex w-full justify-between gap-3">
                            <section className="w-full">
                                <p className="capitalize opacity-60">{t("Min Budget")}</p>
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} value={formData.minBudget || producerData?.minBudget || ""} onChange={handleInputChange} name='minBudget' placeholder={t("Ex. 5$")} className={"inputStyle1"} />
                                </div>
                            </section>

                            <section className="w-full">
                                <p className="capitalize opacity-60">{t("Max Budget")}</p>
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} value={formData.maxBudget || producerData?.maxBudget || ""} onChange={handleInputChange} name='maxBudget' placeholder={t("Ex. 10$")} className={"inputStyle1"} />
                                </div>
                            </section>
                        </div>
                        <div>
                            <ListInput
                                name={'searchKeywords'}
                                placeholder={t("Search keywords")}
                                onChange={(keys) =>
                                    JSON.stringify(keys) !== JSON.stringify(producerData?.searchKeywords) && keys.length
                                        ? UpdateFormData('searchKeywords', keys)
                                        : null
                                }
                                value={
                                    formData?.searchKeywords?.length
                                        ? formData.searchKeywords
                                        : producerData?.searchKeywords
                                }
                            />
                        </div>
                    </div>

                    {
                        !isProducer ?
                            <ArrowBtn isEnable={isFormValidForSubmit()} onClick={handleSubmit} className="left-0 bottom-10 sticky w-auto mb-7 mt-14 mx-14" text="Publish" shadow={true} shadowHeight={"14"} /> :
                            <div className='flex flex-col left-0 bottom-10 sticky w-auto mx-14 gap-3'>
                                <ArrowBtn isEnable={canDelete} onClick={handleDelete} className="w-full bg-red" text="delete" shadow={true} shadowHeight={"14"} />
                                <ArrowBtn isEnable={isFormValidForUpdate()} onClick={handleUpdate} className="w-full" text="update" shadow={true} shadowHeight={"14"} />
                            </div>
                    }

                </div>
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    getIsLoggedProducer_respond: state.api.GetIsLoggedProducer,
    addprojectState: state.addproject,
    createProducer_respond: state.api.CreateProducer,
    updateProducer_respond: state.api.UpdateProducer,
    deleteProducer_respond: state.api.DeleteProducer,

});

const mapDispatchToProps = {
    GetIsLoggedProducer,
    resetForm,
    UpdateFormData,

    CreateProducer,
    UpdateProducer,
    DeleteProducer
};


export default connect(mapStateToProps, mapDispatchToProps)(AddProducer);
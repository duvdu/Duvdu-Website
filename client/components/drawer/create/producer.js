import React, { useCallback, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { UpdateFormData, resetForm, setSubmitt } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { ClosePopUp, OpenPopUp } from "../../../util/util";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import Drawer from "../../elements/drawer";
import ArrowBtn from "../../elements/arrowBtn";
import { useTranslation } from 'react-i18next';
import ErrorPopUp from '../../popsup/errorPopUp';
import ErrorMessage from '../../elements/ErrorMessage';
import DuvduLoading from '../../elements/duvduLoading';
import ListInput from "../../elements/listInput";
import ListInputSearchAPI from "../../elements/listInputSearchAPI";
import ProducerCategorySelection from "./assets/producerCategorySelection";
import { GetIsLoggedProducer } from '../../../redux/action/apis/cycles/producer/islogged';
import { CreateProducer } from "../../../redux/action/apis/cycles/producer/create";
import { DeleteProducer } from '../../../redux/action/apis/cycles/producer/delete';
import { UpdateProducer } from '../../../redux/action/apis/cycles/producer/update';
import PlatformMultiSelection from '../../elements/platformMultiSelection';

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
    const [ErrorMsg, setErrorMsg] = useState({});
    const [validFormCheck, setValidFormCheck] = useState(false);
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
        if (getIsLoggedProducer_respond?.data) {
            setIsProducer(true);
        }else{
            setIsProducer(false);
        }
    }, [getIsLoggedProducer_respond, UpdateFormData]);

    useEffect(() => {
        if (createProducer_respond?.data) OpenPopUp(SuccessfullyCreatePopupId);
    }, [createProducer_respond]);

    useEffect(() => {
        if (deleteProducer_respond?.message==="success") OpenPopUp(SuccessfullyDeletePopupId);
    }, [deleteProducer_respond?.message]);

    useEffect(() => {
        if (updateProducer_respond?.data) OpenPopUp(SuccessfullyUpdatePopupId);
    }, [updateProducer_respond]);

    useEffect(() => {
        if (auth.login === false) router.push({ pathname: '/' });
    }, [auth.login, router]);


    const handleSubmit = () => {
            CheckNext()
    };
    useEffect(() => {
        GetIsLoggedProducer()
    }, [updateProducer_respond?.data , deleteProducer_respond?.data])
    const handleUpdate = () => {
        if (formData.subcategory?.length>0) formData.subcategory = transformKeys(formData.subcategory);
        if(formData.subcategory?.length === 0) formData.subcategory = null;
        if (formData.platforms?.length>0){
            formData.platforms != producerData?.platforms?.map(item=>item._id)
        }

        if (formData.minBudget || formData.maxBudget) {
            formData.maxBudget = formData.maxBudget || producerData?.maxBudget
            formData.minBudget = formData.minBudget || producerData?.minBudget
        }
        if(formData.subcategory?.length===0) delete formData.subcategory;
        formData?.subcategory?.map(item=>
            (item.tags?.length===0)? delete item.tags: item.tags
        )
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
        return (formData.category) &&
            (formData.minBudget) &&
            (formData.maxBudget) &&
            // validateTags &&
            formData.platforms?.length > 0&&
            formData.searchKeywords?.length > 0
            // formData.subcategory?.length > 0;
    };
    const isFormValidForUpdate = () => {
        return formData.category ||
            formData.minBudget ||
            formData.maxBudget ||
            formData.platforms?.length>0 ||
            formData.searchKeywords?.length > 0
            // (formData.subcategory?.length > 0 && validateTags);

    };

    const validateRequiredFields = () => {
        const errors = {};
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.minBudget || !formData.minBudget) errors.minBudget = 'MinBudget are required';
        if (!formData.maxBudget) errors.maxBudget = 'MaxBudget is required';
        if (parseInt(formData.minBudget) > parseInt(formData.maxBudget)) errors.minBudget = 'Minimum value should not be greater than maximum value';
        // if (!formData.platforms || !formData.platforms.length) errors.platforms = 'platforms is required';
        if (!formData.searchKeywords || !formData.searchKeywords.length) errors.searchKeywords = 'Search keywords are required';
        return errors;
    };
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
    },[formData])
    const CheckNext=()=>{
        setValidFormCheck(true)
        validateRequiredFields()
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) setErrorMsg(validateRequiredFields())
            else {
                if(formData.subcategory?.length===0) delete formData.subcategory;
                formData?.subcategory?.map(item=>
                    (item.tagsId?.length===0)? delete item.tagsId: item.tagsId
                )
                CreateProducer(formData);
        
            }
    }
    const canDelete = true;
    var convertError = JSON.parse(deleteProducer_respond?.error ?? null)
    return (
        <>
            <ErrorPopUp id="image_size_error" errorMsg={deleteProducer_respond?.error} />
            <SuccessfullyPosting id={SuccessfullyUpdatePopupId} onCancel={toggleDrawer} message="Update" />
            <SuccessfullyPosting id={SuccessfullyDeletePopupId} onCancel={toggleDrawer} message="Delete" />
            <SuccessfullyPosting id={SuccessfullyCreatePopupId} onCancel={toggleDrawer} message="Create" />
            <Drawer isOpen={true} name={'add producer'} toggleDrawer={toggleDrawer} padding={false}>
                {
                (getIsLoggedProducer_respond?.loading?
                <DuvduLoading loadingIn={''} type=''/>
                :
                <div className='flex flex-col justify-between h-full container mx-auto'>
                    <div className='flex flex-col h-full gap-14 container mx-auto mt-8'>
                        <div>
                            <ProducerCategorySelection
                                filterIn={"producer"}
                                value={{
                                    "category": formData.category || producerData?.category._id,
                                    "subCategories":  formData.subcategory?.tags? formData.subcategory : producerData?.subCategories
                                }}
                                onValidateChange={(v) => setValidateTags(v.length == 0)}
                                onChange={(value) => {
                                    if (producerData?.category != value.category && value.category || JSON.stringify(producerData?.subcategory) != JSON.stringify(value.subCategories) && value.subCategories.length) {
                                        UpdateFormData('category', value.category)
                                        UpdateFormData('subcategory', value.subCategories)
                                    }
                                }} />
                                <ErrorMessage ErrorMsg={ErrorMsg.category}/>
                        </div>

                        <section className="w-full flex flex-col gap-3">
                            <p className="capitalize opacity-60">{t("platforms")}</p>
                            <PlatformMultiSelection value={formData?.platforms?.length>0?[...formData?.platforms]:producerData?.platforms?.map(item=>item._id)} onChange={(v) => { UpdateFormData('platforms', v) }} />
                            <ErrorMessage ErrorMsg={ErrorMsg.platforms}/>
                        </section>
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
                        <ErrorMessage ErrorMsg={ErrorMsg.maxBudget}/>
                        <ErrorMessage ErrorMsg={ErrorMsg.minBudget}/>
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
                            <ErrorMessage ErrorMsg={ErrorMsg.searchKeywords}/>
                        </div>
                    </div>
                    <ErrorMessage ErrorMsg={convertError?.data?.errors[0].message}/>
                    {
                        !isProducer ?
                            <ArrowBtn loading={createProducer_respond?.loading} isEnable={isFormValidForSubmit()} onClick={handleSubmit} className="left-0 bottom-10 sticky w-auto mb-7 mt-14 mx-14" text="Publish" shadow={true} shadowHeight={"14"} /> :
                            <div className='flex flex-col left-0 bottom-10 sticky mt-14 w-auto mx-14 gap-3'>
                                <ArrowBtn loading={deleteProducer_respond?.loading} isEnable={canDelete} onClick={handleDelete} className="w-full bg-red" text="delete" shadow={true} shadowHeight={"14"} />
                                <ArrowBtn loading={updateProducer_respond?.loading} isEnable={isFormValidForUpdate()} onClick={handleUpdate} className="w-full" text="update" shadow={true} shadowHeight={"14"} />
                            </div>
                    }

                </div>
                )}
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
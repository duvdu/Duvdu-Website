import Layout from "../../layout/Layout";
import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import Button from '../../elements/button';
import ErrorMessage from '../../elements/ErrorMessage';

import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { UpdateKeysAndValues, filterByCycle } from "../../../util/util";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import SetCover from "./assets/addCover";
import ListInput from "../../elements/listInput";
import { useTranslation } from 'react-i18next';

import Drawer from "../../elements/drawer";
import { CreateProject } from "../../../redux/action/apis/cycles/projects/create";
import CategorySelection from "./assets/projectCategorySelection";
import AddAttachment from "../../elements/attachment";
import GoogleMap from "../../elements/googleMap";
import PopupErrorMessage from '../../elements/PopupErrorMessage';
import { GetUserProject } from '../../../redux/action/apis/auth/profile/getUserProjects';


const AddPost = ({ CreateProject, auth, respond, UpdateFormData, addprojectState, GetUserProject, categories, resetForm }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const formData = addprojectState.formData;
    const [errors, setErrors] = useState({});
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const [post_success, setPost_success] = useState(false);
    const [nextstep, setNextstep] = useState(1);
    const [attachmentValidation, setAttachmentValidation] = useState(false);
    categories = filterByCycle(categories, 'project')
    const categoryDetails = categories.find(i => i._id == formData.category)

    const listDropDown =
        categoryDetails ? (categoryDetails?.media === 'image'
            ? ['image']
            : (categoryDetails?.media === 'video' || categoryDetails?.media === 'audio'
                ? ['seconds','minutes', 'hours','episodes']
                : [])) : ['unit'];

    useEffect(() => {
        UpdateFormData("projectScale[unit]", listDropDown[0])
    }, [categoryDetails?.media])
    useEffect(()=>{
        UpdateFormData('attachments' , null)
    },[formData.category])

    useEffect(() => {
        UpdateFormData('showOnHome', true)
    }, [])
    
    const convertToFormData = () => {
        const data = new FormData();

        // Append simple string and number values directly from the state
        UpdateKeysAndValues(formData, (key, value) => data.append(key, value), ['attachments','subCategoryId', 'location', 'tools','tagsId', 'creatives','invitedCreatives' , 'searchKeyWords','audioCover', 'functions' , 'relatedCategory' , 'relatedSubCategory','relatedTags'])
        // data.append('projectBudget', formData.projectBudget);
        // data.append('projectScale[scale]', formData.duration);
        // if(formData.subCategoryId?.length===0) delete formData.subCategoryId;
        // formData?.subcategory?.map(item=>
        //     (item.tags?.length===0)? delete item.tags: item.tags
        // )
        if(formData.subCategoryId)
            data.append('subCategoryId',formData.subCategoryId)
        if (formData.tagsId)
            formData.tagsId.forEach((tag, index) => {
                data.append(`tagsId[${index}]`, tag);
            });
        if(formData.relatedCategory)
            data.append('relatedCategory[0][category]',formData.relatedCategory)
        if(formData.relatedSubCategory)
            data.append('relatedCategory[0][subCategories][0][subCategory]',formData.relatedSubCategory)
        if (formData.relatedTags.length>0)
            formData.relatedTags.forEach((tag, index) => {
                data.append(`relatedCategory[0][subCategories][0][tags][${index}][tag]`, tag);
            });
            
        if (formData.searchKeyWords)
            formData.searchKeyWords.forEach((searchKeyWords, index) => {
                data.append(`searchKeyWords[${index}]`, searchKeyWords);
            });
        // Append searchKeyWords

        if (formData.cover) {
            data.append('cover', formData.cover);
        }

        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i];
                data.append(`attachments`, file.file);
        }

        if (formData.audioCover)
            for (let i = 0; i < formData.audioCover.length; i++) {
                const file = formData.audioCover[i];
                data.append(`audioCover`, file.file);
            }

        if (formData.location) {
            data.append('location[lat]', formData.location.lat);
            data.append('location[lng]', formData.location.lng);
        };


        if (formData.creatives) {
            formData.creatives.forEach((item, index) => {
                data.append(`creatives[${index}][creative]`, item._id);
                if (item) {
                    if(item.category)
                        data.append(`creatives[${index}][mainCategory][category]`,item.category)
                    if(item.subCategoryId)
                        data.append(`creatives[${index}][mainCategory][subCategories][subCategory]`,item.subCategoryId)
                    if (item.tagsId)
                        item.tagsId.forEach((tag, tagIndex) => {
                            data.append(`creatives[${index}][mainCategory][subCategories][tags][${tagIndex}][tag]`, tag);
                        });
                    if(item.relatedCategory)
                        data.append(`creatives[${index}][mainCategory][relatedCategory][category]`,item.relatedCategory)
                    if(item.relatedSubCategory)
                        data.append(`creatives[${index}][mainCategory][relatedCategory][subCategories][subCategory]`,item.relatedSubCategory)
                    if (item.relatedTags.length>0)
                        item.relatedTags.forEach((tag, tagIndex) => {
                            data.append(`creatives[${index}][mainCategory][relatedCategory][subCategories][tags][${tagIndex}][tag]`, tag);
                        });
                }
            });
        }

        if (formData.invitedCreatives) {
            formData.invitedCreatives.forEach((item, index) => {
                data.append(`invitedCreatives[${index}][number]`, item._id);
                if(item.category)
                    data.append(`invitedCreatives[${index}][mainCategory][category]`,item.category)
                if(item.subCategoryId)
                    data.append(`invitedCreatives[${index}][mainCategory][subCategories][subCategory]`,item.subCategoryId)
                if (item.tagsId)
                    item.tagsId.forEach((tag, tagIndex) => {
                        data.append(`invitedCreatives[${index}][mainCategory][subCategories][tags][${tagIndex}][tag]`, tag);
                    });
                if(item.relatedCategory)
                    data.append(`invitedCreatives[${index}][mainCategory][relatedCategory][category]`,item.relatedCategory)
                if(item.relatedSubCategory)
                    data.append(`invitedCreatives[${index}][mainCategory][relatedCategory][subCategories][subCategory]`,item.relatedSubCategory)
                if (item.relatedTags.length>0)
                    item.relatedTags.forEach((tag, tagIndex) => {
                        data.append(`invitedCreatives[${index}][mainCategory][relatedCategory][subCategories][tags][${tagIndex}][tag]`, tag);
                    });
            });
        }

        if (formData.tools) {
            formData.tools.forEach((item, index) => {
                data.append(`tools[${index}][name]`, item.name);
                data.append(`tools[${index}][unitPrice]`, item.unitPrice);
            });
        }

        if (formData.functions) {
            formData.functions.forEach((item, index) => {
                data.append(`functions[${index}][name]`, item.name);
                data.append(`functions[${index}][unitPrice]`, item.unitPrice);
            });
        }
        return data;
    }
    const validateRequiredFields = () => {
        const errors = {};

        if (!formData.category) errors.category = 'Category is required';
        // if (!formData.subCategoryId) errors.subCategory = 'Subcategory is required';
        // if (!formData.tagsId || !formData.tagsId.length) errors.tags = 'Tags are required';
        // if (!formData.tools || !formData.tools.length) errors.tools = 'Tools is required';
        // if (!formData.functions || !formData.functions.length) errors.functions = 'Functions is required';
        // if (!formData.creatives || !formData.creatives.length) errors.creatives = 'Creatives is required';
        if (!formData.name) errors.title = 'Title is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.duration) errors.duration = 'Duration is required';
        if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment is required';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
        // if (!formData.searchKeyWords || !formData.searchKeyWords.length) errors.searchKeyWords = 'Search keywords are required';
        const minimum = parseFloat(formData['projectScale[minimum]']);
        const current = parseFloat(formData['projectScale[current]']);
        const maximum = parseFloat(formData['projectScale[maximum]']);

        if (!formData['projectScale[unit]'] || 
            !formData['projectScale[pricerPerUnit]'] || 
            !formData['projectScale[minimum]'] || 
            !formData['projectScale[current]'] || 
            !formData['projectScale[maximum]']) {
            errors.projectScale = 'Project Scale is required';
        } else {
            if (minimum <= 0) {
                errors.minimum = 'Minimum should be greater than 0';
            }
            if (current < minimum) {
                errors.current = 'Current should be greater than or equal to minimum';
            }
            if (maximum < current) {
                errors.maximum = 'Maximum should be greater than or equal to current';
            }
            if (maximum == minimum) {
                errors.maximum = 'Maximum should be not equal to minimum';
            }
        }
        if(categoryDetails?.media === 'audio'){
            if(!formData.audioCover || !formData.audioCover.length) errors.audioCover = 'Audio cover is required';
        }

        return errors;
    };
    const CheckNext=()=>{
        setValidFormCheck(true)
        setErrorPopup(true)
        validateRequiredFields()
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) {
            setErrorMsg(validateRequiredFields())
            return
        }
        else{
            setCover()
        }
    }
    useEffect(()=>{
        if(validFormCheck){
        setErrorMsg(validateRequiredFields())
        setErrorPopup(false);
    }
    },[formData])
    const setCover = () => {
        setNextstep(2)
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value);
    };

    const removeFromArray = (arrayName, index) => {
        const newArray = [...formData[arrayName]]; // Create a new array to avoid mutating the original state
        newArray.splice(index, 1); // Remove the item at the specified index
        UpdateFormData(arrayName, newArray);
    };
    const Publish = (e) => {
        // setNextstep(1)
        CreateProject(convertToFormData())
    };

    useEffect(() => {
        if (respond?.data)
            setPost_success(true)
    }, [respond?.message])

    useEffect(() => {
        if (auth.login === false)
            router.push({ pathname: "/" });
    }, [auth.login])

    const toggleDrawer = () => {
        CreateProject(-1)
        setPost_success(false)
        if (nextstep == 2) {
            setNextstep(1)
            return
        }
        setValidFormCheck(false)
        setErrorMsg({})
        resetForm()
        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }
    const AudioIndex = categories.indexOf(categories.map(item=> item.title).includes('Audio'))
    const AudioId =  (AudioIndex===-1 ? categories[categories.length -1] : categories[AudioIndex])?._id
    const CreatedSuccessfully = ()=>{
        setNextstep(1)
        toggleDrawer()
        GetUserProject({ username: auth?.username });
    }

    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <PopupErrorMessage errorPopup={errorPopup} CloseToast={()=>setErrorPopup(false)} ErrorMsg={Object.values(validateRequiredFields())[0]}/>
            <Drawer isOpen={true} name={t('add project')} toggleDrawer={toggleDrawer}>
                <div className={nextstep == 1 && 'hidden'}>
                    <SetCover coverType={categoryDetails?.media} Publish={Publish} respond={respond} oncancel={() => setNextstep(1)} />
                </div>
                <form className={`${nextstep == 2 && 'hidden'} flex flex-col gap-5 mx-5 sm:mx-auto`} >
                    <div className="my-5">
                        <CategorySelection
                            filterIn={'project'}
                            value={{
                                'category': formData.category,
                                'subCategoryId': formData.subCategoryId,
                                'tagsId': formData.tagsId,
                                'relatedCategory': formData.relatedCategory,
                                'relatedSubCategory':formData.relatedSubCategory,
                                'relatedTags': formData.relatedTags
                            }}
                            onChange={(value) => {
                                UpdateFormData('category', value.category)
                                UpdateFormData('subCategoryId', value.subCategory)
                                UpdateFormData('tagsId', value.tags)
                                UpdateFormData('relatedCategory', value.relatedCategory)
                                UpdateFormData('relatedSubCategory', value.relatedSubCategory)
                                UpdateFormData('relatedTags', value.relatedTags)
                            }}
                        />
                        <ErrorMessage ErrorMsg={ErrorMsg.category}/>
                    </div>
                    <section>
                        <h3 className="capitalize opacity-60">{t("attachments")}</h3>
                        <AddAttachment id={'attachments'} name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} media={categoryDetails?.media} />
                        <ErrorMessage ErrorMsg={ErrorMsg.attachments}/>
                    </section>
                    <section>
                        <input placeholder={t("name")} className={"inputStyle1"} value={formData.name || ""} onChange={handleInputChange} name="name" />
                        <ErrorMessage ErrorMsg={ErrorMsg.title}/>
                    </section>
                    <section>
                        <input placeholder={t("description")} className={"inputStyle1"} value={formData.description || ""} onChange={handleInputChange} name="description" />
                        <ErrorMessage ErrorMsg={ErrorMsg.description}/>
                    </section>
                    <section>
                        <input placeholder={t("duration")} type="number" min={0} className={"inputStyle1"} value={formData.duration || ""} onChange={handleInputChange} name="duration" />
                        <ErrorMessage ErrorMsg={ErrorMsg.duration}/>
                    </section>
                    <section>
                        <ListInput
                            placeholder={t("tools used")}
                            target="AddToolUsed"
                            name={"tools"}
                            listdiv={formData.tools && formData.tools.map((e, i) => (
                                <span className='mx-2' key={i}>
                                    <span><strong>{t("tool :")}</strong> {e.name} </span>
                                    <br />
                                    <span> <strong>{t("price :")}</strong> {e.unitPrice} $ </span>
                                </span>
                            ))}
                            remove={(value) => removeFromArray('tools', value)}
                            enable={false}
                        />
                        <ErrorMessage ErrorMsg={ErrorMsg.tools}/>
                    </section>
                    <section>
                        <ListInput
                            placeholder={t("Functions used")}
                            target="Addfunctions"
                            name={"functions"}
                            listdiv={formData.functions && formData.functions.map((e, i) =>
                                <span className='mx-2' key={i}>
                                    <span><strong>{t("function :")}</strong> {e.name} </span>
                                    <br />
                                    <span> <strong>{t("price :")}</strong> {e.unitPrice} $ </span>
                                </span>
                            )}
                            remove={(value) => removeFromArray('functions', value)}
                            enable={false}
                        />
                        <ErrorMessage ErrorMsg={ErrorMsg.functions}/>
                    </section>
                    <section>
                        <ListInput
                            placeholder={t("tag creatives")}
                            target="addOtherCreatives"
                            enable={false}
                        >
                            <div className="flex flex-wrap gap-3">
                                {formData?.invitedCreatives?.length>0 && formData?.invitedCreatives?.map((e, i) => (
                                    <div key={i} className="border border-primary rounded-2xl px-1 mt-2 py-1 flex gap-2 items-start justify-between min-w-40 text-primary">
                                    <div className="flex gap-2 items-center">
                                        {e.name}
                                    </div>
                                    <div onClick={() => removeFromArray('invitedCreatives',i)} className='cursor-pointer'>
                                        <Icon name='remove' className="size-6 p-1 text-white bg-primary rounded-full" />
                                    </div>
                                </div>
                            ))}
                                {formData?.creatives && formData.creatives?.map((e, i) => (
                                    <div key={i} className="border border-primary rounded-2xl px-1 mt-2 py-1 flex gap-2 items-start justify-between min-w-40 text-primary">
                                        <a href={`/creative/${e.username}`} target="_blank" rel="noopener noreferrer">
                                            <div className="flex gap-2 items-center">
                                                <img className="size-6 rounded-full" src={e.profileImage} alt={`${e.name}'s profile image`} />
                                                {e.name}
                                            </div>
                                        </a>
                                    <div onClick={() => removeFromArray('creatives',i)} className='cursor-pointer'>
                                        <Icon name='remove' className="size-6 p-1 text-white bg-primary rounded-full" />
                                    </div>
                                </div>
                            ))}
                            </div>
                        </ListInput>
                        <ErrorMessage ErrorMsg={ErrorMsg.creatives}/>
                    </section>

                    <section>
                        <ListInput name={'searchKeyword'} placeholder={t("Search keywords")} value={formData.searchKeyWords} onChange={(value) => UpdateFormData('searchKeyWords', value)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.searchKeyWords}/>
                    </section>
                    <section className="h-96 relative overflow-hidden">
                        <span>{t("Set location")}</span>
                        <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)} onChangeAddress={handleInputChange} />
                    </section>

                    <section className="flex flex-col gap-8">
                        <section className="hidden">
                            <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Select Project Media")}</h3>
                            <div className="flex gap-3 flex-wrap">
                                {[
                                    'Videos',
                                    'Photos',
                                    'Audios'
                                ].map((media, index) => (
                                    <div key={index}
                                        className={`py-1 px-2 border ${formData.media ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                        onClick={() => UpdateFormData('media', media)}>
                                        <div className={`whitespace-nowrap font-medium ${formData.media ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                            {media}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <div className='flex items-center justify-between'>
                            <h3 className='font-bold text-lg'>{t("Project Scale Unit")}</h3>
                            <select
                                className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalizez"
                                value={formData['projectScale[unit]']}
                                onChange={handleInputChange}
                                name="projectScale[unit]"
                                required
                            >
                                {listDropDown.map((value, index) => (
                                    <option key={index} value={value.toLowerCase()}>{t(value)}</option>
                                ))}
                            </select>
                        </div>
                        <input placeholder={t(`price per ${formData['projectScale[unit]'] || 'unit'}`)} name="projectScale[pricerPerUnit]" value={formData['projectScale[pricerPerUnit]'] || ""} onChange={handleInputChange} className={"inputStyle1"} />
                        <div className="flex w-full justify-between gap-3">
                            <div className="w-full">
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} name='projectScale[minimum]' value={formData['projectScale[minimum]'] || ""} onChange={handleInputChange} placeholder={t(`minimum ${formData['projectScale[unit]'] || 'unit'}`)} className={"inputStyle1"} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} name='projectScale[current]' value={formData['projectScale[current]'] || ""} onChange={handleInputChange} placeholder={t("current")} className={"inputStyle1"} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} name='projectScale[maximum]' value={formData['projectScale[maximum]'] || ""} onChange={handleInputChange} placeholder={t(`maximum ${formData['projectScale[unit]'] || 'unit'}`)} className={"inputStyle1"} />
                                </div>
                            </div>
                        </div>
                        <div>
                        <ErrorMessage ErrorMsg={ErrorMsg.projectScale}/>
                        <ErrorMessage ErrorMsg={ErrorMsg.current}/>
                        <ErrorMessage ErrorMsg={ErrorMsg.maximum}/>
                        </div>
                    </section>

                    <div className='flex gap-3 mt-1'>
                        <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} />
                        <p className='opacity-70'>{t("Show on home feed & profile")}</p>
                    </div>
                    <div className='relative'>
                        <Button onClick={CheckNext} className="w-auto mb-7 mx-20" shadow={true} shadowHeight={"14"}>
                            <span className='text-white font-bold capitalize text-lg'>{t("Next")}</span>
                        </Button>
                    </div>
                </form>
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    respond: state.api.CreateProject,
    addprojectState: state.addproject,
    categories: state.categories
});

const mapDispatchToProps = {
    UpdateFormData,
    InsertToArray,
    GetUserProject,
    CreateProject,
    resetForm
};


export default connect(mapStateToProps, mapDispatchToProps)(AddPost);



import Layout from "../../layout/Layout";
import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import Button from '../../elements/button';
import Loading from '../../elements/loading';
import ErrorMessage from '../../elements/ErrorMessage';

import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { UpdateKeysAndValues, filterByCycle } from "../../../util/util";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import ListInput from "../../elements/listInput";
import { useTranslation } from 'react-i18next';
import { GetProject } from "../../../redux/action/apis/cycles/projects/getOne";
import Drawer from "../../elements/drawer";
import { UpdateProject } from "../../../redux/action/apis/cycles/projects/edit";
import CategorySelection from "./../create/assets/projectCategorySelection";
import AddAttachment from "../../elements/attachment";
import GoogleMap from "../../elements/googleMap";
import SetCover from './../create/assets/addCover';
import AddToolUsed from '../../popsup/create/addToolUsed';
import AddOtherCreatives from '../../popsup/create/addOtherCreatives';
import FunctionUsed from '../../popsup/create/FunctionsUsed';


const EditProject = ({ UpdateProject ,InsertToArray, data,isOpen, auth,id, update_respond,GetProject,setIsOpenEdit, UpdateFormData, addprojectState, categories, resetForm }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { project: projectId } = router.query;
    const formData = addprojectState.formData;
    const [errors, setErrors] = useState({});
    const [validFormCheck, setValidFormCheck] = useState(false);
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
        UpdateFormData('category' , data.category._id)
    },[data])
    const AreObjectsEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
      
        for (let i = 0; i < arr1.length; i++) {
          const obj1 = arr1[i];
          const obj2 = arr2[i];
      
          if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
            return false;
          }
        }
        return true;
    };
      
    const convertToFormData = () => {
        const UpdatedData = new FormData();

        // Append simple string and number values directly from the state
        // UpdateKeysAndValues(formData, (key, value) => UpdatedData.append(key, value), ['attachments','subCategory', 'location', 'tools', 'creatives','invitedCreatives','searchKeywords','audioCover', 'functions'])
        // UpdatedData.append('projectBudget', formData.projectBudget);
        // UpdatedData.append('projectScale[scale]', formData.duration);
        // if(formData.subCategory?.length===0) delete formData.subCategory;
        // formData?.subcategory?.map(item=>
        //     (item.tags?.length===0)? delete item.tags: item.tags
        // )
        if(formData.name && (data.name!==formData.name)){
            UpdatedData.append('name',formData.name)
        }
        if(formData.description && (data.description!==formData.description))
            UpdatedData.append('description',formData.description)
        if(formData.duration)
            UpdatedData.append('duration',formData.duration)
        if(formData.address && (data.address!==formData.address))
            UpdatedData.append('address',formData.address)
        if(formData['projectScale[unit]'] && (data.projectScale.unit!==formData['projectScale[unit]']))
            UpdatedData.append('projectScale[unit]',formData['projectScale[unit]'])
        if(formData['projectScale[minimum]']  && (data.projectScale.minimum!==formData['projectScale[minimum]']))
            UpdatedData.append('projectScale[minimum]',formData['projectScale[minimum]'])
        if(formData['projectScale[maximum]']  && (data.projectScale.maximum!==formData['projectScale[maximum]']))
            UpdatedData.append('projectScale[maximum]',formData['projectScale[maximum]'])
        if(formData['projectScale[current]']  && (data.projectScale.current!==formData['projectScale[current]']))
            UpdatedData.append('projectScale[current]',formData['projectScale[current]'])
        if(formData['projectScale[pricerPerUnit]']  && (data.projectScale.pricerPerUnit!==formData['projectScale[pricerPerUnit]']))
            UpdatedData.append('projectScale[pricerPerUnit]',formData['projectScale[pricerPerUnit]'])
        if(formData.category && (data.category._id!==formData.category))
            UpdatedData.append('category',formData.category)
        if(formData.subCategory && (data.subCategory?._id!==formData.subCategory))
            UpdatedData.append('subCategoryId',formData.subCategory)
        if (formData.tags)
            formData.tags.forEach((tag, index) => {
                UpdatedData.append(`tagsId[${index}]`, tag);
            });

        if (formData.searchKeyWords && !AreObjectsEqual(formData.searchKeyWords, data.searchKeyWords))
                formData.searchKeyWords.forEach((searchKeywords, index) => {
                UpdatedData.append(`searchKeywords[${index}]`, searchKeywords);
            });
    
        if (formData.cover && (data.name!==formData.name)) {
            UpdatedData.append('cover', formData.cover);
        }

        // if (formData.attachments)
        //     for (let i = 0; i < formData.attachments.length; i++) {
        //         const file = formData.attachments[i];
        //         UpdatedData.append(`attachments`, file.file);
        // }

        if (formData.audioCover)
            for (let i = 0; i < formData.audioCover.length; i++) {
                const file = formData.audioCover[i];
                UpdatedData.append(`audioCover`, file.file);
            }

        if (formData.location && (data.name!==formData.name)) {
            UpdatedData.append('location[lat]', formData.location.lat);
            UpdatedData.append('location[lng]', formData.location.lng);
        };


        // if (formData.creatives && !AreObjectsEqual(formData.creatives, data.creatives)) {
        //     formData.creatives.forEach((item, index) => {
        //         // UpdatedData.append(`creatives[${index}]`, item.name);
        //         UpdatedData.append(`creatives[${index}][creative]`, item._id);
        //     });
        // }

        // if (formData.invitedCreatives) {
        //     formData.invitedCreatives.forEach((item, index) => {
        //         UpdatedData.append(`number[${index}]`, item._id);
        //     });
        // }

        if (formData.tools  && !AreObjectsEqual(formData.tools, data.tools)) {
            formData.tools.forEach((item, index) => {
                UpdatedData.append(`tools[${index}][name]`, item.name);
                UpdatedData.append(`tools[${index}][unitPrice]`, item.unitPrice);
            });
        }

        if (formData.functions  && !AreObjectsEqual(formData.functions, data.functions)) {
            formData.functions.forEach((item, index) => {
                UpdatedData.append(`functions[${index}][name]`, item.name);
                UpdatedData.append(`functions[${index}][unitPrice]`, item.unitPrice);
            });
        }
        return UpdatedData;
    }
    const validateRequiredFields = () => {
        const errors = {};

        if (!formData.category) errors.category = 'Category is required';
        // if (!formData.subCategory) errors.subCategory = 'Subcategory is required';
        // if (!formData.tagsId || !formData.tagsId.length) errors.tags = 'Tags are required';
        if (!formData.name) errors.title = 'Title is required';
        // if (!formData.tools || !formData.tools.length) errors.tools = 'Tools is required';
        // if (!formData.functions || !formData.functions.length) errors.functions = 'Functions is required';
        // if (!formData.creatives || !formData.creatives.length) errors.creatives = 'Creatives is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.duration) errors.duration = 'Duration is required';
        // if (!formData.searchKeyWords || !formData.searchKeyWords.length) errors.searchKeywords = 'Search keywords are required';
        if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment is required';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
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
        return errors;
    };
    const CheckNext=()=>{
        // setValidFormCheck(true)
        // validateRequiredFields()
        // const isEnable = Object.keys(validateRequiredFields()).length == 0
        // if (!isEnable) setErrorMsg(validateRequiredFields())
        // else 
    return setCover()
    }
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
    },[formData])

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value);
    };
    const setCover = () => {
        // const validationErrors = validateRequiredFields();
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }
        // setErrors({});
        setNextstep(2)
    };

    const removeFromArray = (arrayName, index) => {
        const newArray = [...formData[arrayName]]; // Create a new array to avoid mutating the original state
        newArray.splice(index, 1); // Remove the item at the specified index
        UpdateFormData(arrayName, newArray);
    };
    const Publish = (e) => {
        // setNextstep(1)
        UpdateProject(projectId,convertToFormData()).then(async()=>{
            setPost_success(true)
        })
    };


    console.log({formData , data})
    useEffect(() => {
        UpdateFormData("name", data.name)
        UpdateFormData("description", data.description)
        UpdateFormData("subCategory", data.subCategory._id)
        UpdateFormData("tags", data.tags.map(item=>item._id))
        UpdateFormData("duration", data.duration)
        UpdateFormData("category", data?.category?._id)
        UpdateFormData("cover", data.cover)
        UpdateFormData("creatives", data.creatives)
        UpdateFormData("address", data.address)
        UpdateFormData("showOnHome", data.showOnHome)
        UpdateFormData("functions", data.functions)
        UpdateFormData("tools", data.tools)
        UpdateFormData('location', {
            lat:data.location.lat,
            lng:data.location.lng
        })
        UpdateFormData("searchKeyWords", data.searchKeyWords)
        UpdateFormData("projectScale[pricerPerUnit]", data.projectScale.pricerPerUnit)
        UpdateFormData("projectScale[unit]", data.projectScale.unit)
        UpdateFormData("projectScale[minimum]", data.projectScale.minimum)
        UpdateFormData("projectScale[maximum]", data.projectScale.maximum)
        UpdateFormData("projectScale[current]", data.projectScale.current)
        // 
        // 
        UpdateFormData("relatedCategory" , data.relatedCategory?.[0]?.category?._id)
        UpdateFormData("relatedSubCategory" , data.relatedCategory?.[0]?.category?.subCategories?.[0]?._id)
        UpdateFormData("relatedTags" , data?.relatedCategory?.[0]?.category?.subCategories?.[0]?.tags?.map(item=>item?._id))
    }, [data])
    
    // useEffect(() => {
    //     if (auth.login === false)
    //         router.push({ pathname: "/" });
    // }, [auth.login])

    const toggleDrawer = () => {        
        setPost_success(false)
        if (nextstep == 2) {
            setNextstep(1)
            return
        }
        setIsOpenEdit(false)
    }
    const AudioIndex = categories.indexOf(categories.map(item=> item.title).includes('Audio'))
    const AudioId =  (AudioIndex===-1 ? categories[categories.length -1] : categories[AudioIndex])?._id
    const closeDrawer = ()=>{
        setPost_success(false)
        setIsOpenEdit(false)
        GetProject(projectId)
    }
    return (
        <>
            <AddToolUsed onSubmit={(value) => InsertToArray('tools', value)} />
            <FunctionUsed onSubmit={(value) => InsertToArray('functions', value)} />
            <AddOtherCreatives onSubmit={(value) =>{
             value.invitedCreatives?InsertToArray('invitedCreatives', value) :InsertToArray('creatives', value)}} />

            <SuccessfullyPosting isShow={post_success} onCancel={closeDrawer} message="Creating" />
            <Drawer isOpen={isOpen} id={id} name={t('edit project')} toggleDrawer={toggleDrawer}>
                <div className={nextstep == 1 && 'hidden'}>
                    <SetCover coverType={categoryDetails?.media} Publish={Publish} respond={update_respond} oncancel={() => setNextstep(1)} />
                </div>
                <form className={`${nextstep == 2 && 'hidden'} flex flex-col gap-5 container mx-auto`}>
                    <div className="my-5">
                        <CategorySelection
                            filterIn={'project'}
                            isRemove={true}
                            value={{
                                'category':formData.category|| data?.category._id ,
                                'subCategory': formData.subCategory || data.subCategory._id ,
                                'tags': formData.tags || data.tags.map(item => item._id),
                                'relatedCategory': formData.relatedCategory || data.relatedCategory?.[0]?.category?._id,
                                'relatedSubCategory':formData.relatedSubCategory || data.relatedCategory?.[0]?.category?.subCategories?.[0]?._id,
                                'relatedTags': formData.relatedTags || data?.relatedCategory?.[0]?.category?.subCategories?.[0]?.tags?.map(item=>item?._id)
                            }}
                            onChange={(value) => {
                                UpdateFormData('category', value.category)
                                UpdateFormData('subCategory', value.subCategory)
                                UpdateFormData('tags', value.tags)
                                UpdateFormData('relatedCategory', value.relatedCategory)
                                UpdateFormData('relatedSubCategory', value.relatedSubCategory)
                                UpdateFormData('relatedTags', value.relatedTags)
                            }}
                        />
                        <ErrorMessage ErrorMsg={ErrorMsg.category}/>
                    </div>
                    <section>
                        <input placeholder={t("name")} className={"inputStyle1"} value={formData.name || data.name } onChange={handleInputChange} name="name" />
                        <ErrorMessage ErrorMsg={ErrorMsg.title}/>
                    </section>
                    <section>
                        <input placeholder={t("description")} className={"inputStyle1"} value={formData.description || data.description } onChange={handleInputChange} name="description" />
                        <ErrorMessage ErrorMsg={ErrorMsg.description}/>
                    </section>
                    <section>
                        <input placeholder={t("duration")} type="number" min={0} className={"inputStyle1"} value={formData.duration || data.duration} onChange={handleInputChange} name="duration" />
                        <ErrorMessage ErrorMsg={ErrorMsg.duration}/>
                    </section>
                    <section>
                        <ListInput
                            placeholder={t("tools used")}
                            target="AddToolUsed"
                            name={"tools"}
                            listdiv={formData.tools && formData.tools.map((e, i) => (
                                <span className='mx-2' key={i}>
                                    <span><strong>{t("tool :")}</strong> {e?.name} </span>
                                    <br />
                                    <span> <strong>{t("price :")}</strong> {e?.unitPrice} $ </span>
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
                        <ListInput name={'searchKeyword'} placeholder={t("Search keywords")} value={formData.searchKeyWords } onChange={(value) => UpdateFormData('searchKeyWords', value)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.searchKeywords}/>
                    </section>
                    <section className="h-96 relative overflow-hidden">
                        <span>{t("Set location")}</span>
                        <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat || data.location.lat, 'lng': formData.location?.lng || data.location.lng }} onsetLocation={(value) => UpdateFormData('location', value)} onChangeAddress={handleInputChange} />
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
                                value={formData['projectScale[unit]'] || data.projectScale.unit}
                                onChange={handleInputChange}
                                name="projectScale[unit]"
                                required
                            >
                                {listDropDown.map((value, index) => (
                                    <option key={index} value={value.toLowerCase()}>{t(value)}</option>
                                ))}
                            </select>
                        </div>
                        <input placeholder={`price per ${formData['projectScale[unit]'] || 'unit'}`} name="projectScale[pricerPerUnit]" value={formData['projectScale[pricerPerUnit]'] || data.projectScale.pricerPerUnit } onChange={handleInputChange} className={"inputStyle1"} />
                        <div className="flex w-full justify-between gap-3">
                            <div className="w-full">
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} name='projectScale[minimum]' value={formData['projectScale[minimum]']  || data.projectScale.minimum } onChange={handleInputChange} placeholder={t(`minimum ${formData['projectScale[unit]'] || 'unit'}`)} className={"inputStyle1"} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} name='projectScale[current]' value={formData['projectScale[current]']  || data.projectScale.current} onChange={handleInputChange} placeholder={t("current")} className={"inputStyle1"} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className='flex items-center justify-start gap-4'>
                                    <input type="number" min={0} name='projectScale[maximum]' value={formData['projectScale[maximum]']  || data.projectScale.maximum} onChange={handleInputChange} placeholder={t(`maximum ${formData['projectScale[unit]'] || 'unit'}`)} className={"inputStyle1"} />
                                </div>
                            </div>
                        </div>
                        <div>
                        <ErrorMessage ErrorMsg={ErrorMsg.projectScale}/>
                        <ErrorMessage ErrorMsg={ErrorMsg.current}/>
                        <ErrorMessage ErrorMsg={ErrorMsg.maximum}/>
                        </div>
                    </section>

                    <div className='flex justify-center gap-3 mt-1'>
                    <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} />
                    <p className='opacity-70'>{t("Show on home feed & profile")}</p>
                    </div>
                    
                    <Button isEnabled={!update_respond?.loading} onClick={Publish} className="w-auto mb-7 mx-20" shadow={true} shadowHeight={"14"}>
                    {update_respond?.loading?<Loading/>:<span className='text-white font-bold capitalize text-lg'>{t("Update")}</span>}
                    </Button>

                </form>
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    update_respond: state.api.UpdateProject,
    addprojectState: state.addproject,
    categories: state.categories
});

const mapDispatchToProps = {
    UpdateFormData,
    InsertToArray,
    UpdateProject,
    GetProject,
    resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
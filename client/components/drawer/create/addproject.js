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
import CategorySelection from "./assets/CategorySelection";
import AddAttachment from "../../elements/attachment";
import GoogleMap from "../../elements/googleMap";


const AddPost = ({ CreateProject, auth, respond, UpdateFormData, addprojectState, categories, resetForm }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const formData = addprojectState.formData;
    console.log(formData)
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
                ? ['minutes', 'hours']
                : [])) : ['unit'];

    useEffect(() => {
        UpdateFormData("projectScale[unit]", listDropDown[0])
    }, [categoryDetails?.media])
    useEffect(()=>{
        if(formData.category == undefined)
            UpdateFormData('attachments' , null)
    },[formData.category])
    const convertToFormData = () => {
        const data = new FormData();

        // Append simple string and number values directly from the state
        UpdateKeysAndValues(formData, (key, value) => data.append(key, value), ['attachments', 'location', 'tools', 'creatives', 'functions'])
        // data.append('projectBudget', formData.projectBudget);
        // data.append('projectScale[scale]', formData.duration);

        if (formData.tags)
            formData.tags.forEach((tag, index) => {
                data.append(`tags[${index}]`, tag);
            });

        // Append searchKeywords

        if (formData.cover) {
            data.append('cover', formData.cover);
        }

        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i];
                data.append(`attachments`, file.file);
            }

        if (formData.location) {
            data.append('location[lat]', formData.location.lat);
            data.append('location[lng]', formData.location.lng);
        };


        if (formData.creatives) {
            formData.creatives.forEach((item, index) => {
                // data.append(`creatives[${index}]`, item.name);
                data.append(`creatives[${index}]`, item._id);
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
        if (!formData.subCategoryId) errors.subCategory = 'Subcategory is required';
        if (!formData.tagsId || !formData.tagsId.length) errors.tags = 'Tags are required';
        if (!formData.name) errors.title = 'Title is required';
        if (!formData.tools || !formData.tools.length) errors.tools = 'Tools is required';
        if (!formData.functions || !formData.functions.length) errors.functions = 'Functions is required';
        if (!formData.creatives || !formData.creatives.length) errors.creatives = 'Creatives is required';
        if ((formData.description?.length || 0) < 6) errors.description = 'Description must be at least 6 characters long';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.duration) errors.duration = 'Duration is required';
        if (!formData.searchKeywords || !formData.searchKeywords.length) errors.searchKeywords = 'Search keywords are required';
        if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment is required';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
        if (!formData['projectScale[unit]'] || !formData['projectScale[pricerPerUnit]'] || !formData['projectScale[minimum]'] || !formData['projectScale[current]'] || !formData['projectScale[maximum]']) errors.projectScale = 'Project Scale is required';
        if (parseFloat(formData['projectScale[minimum]']) >= parseFloat(formData['projectScale[current]'])) errors.current = 'current should be greater than minimum';
        if (parseFloat(formData['projectScale[current]']) >= parseFloat(formData['projectScale[maximum]'])) errors.maximum = 'maximum should be greater than current';
        return errors;
    };
    const CheckNext=()=>{
        setValidFormCheck(true)
        validateRequiredFields()
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        console.log(isEnable)
        if (!isEnable) setErrorMsg(validateRequiredFields())
        else return setCover()
    }
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
    },[formData])
    const setCover = (e) => {
        const validationErrors = validateRequiredFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        // setNextstep(2)
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
        UpdateFormData(arrayName, index);
    };
    const Publish = (e) => {
        setNextstep(1)
        CreateProject(convertToFormData())
    };

    useEffect(() => {
        if (respond?.data)
            setPost_success(true)
    }, [respond?.message])


    useEffect(() => {
        // UpdateFormData("duration", 10)

    }, [])

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
        resetForm()
        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }

    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Drawer isOpen={true} name={'add project'} toggleDrawer={toggleDrawer}>
                {nextstep == 2 ? (
                    <SetCover coverType={categoryDetails?.media} Publish={Publish} oncancel={() => setNextstep(1)} />
                ) :
                    (
                        <form className='flex flex-col gap-5 mx-5 sm:mx-auto' >
                            <div className="my-5">
                                <CategorySelection
                                    filterIn={'project'}
                                    value={{
                                        'category': formData.category,
                                        'subCategoryId': formData.subCategory,
                                        'tagsId': formData.tags,
                                    }}
                                    onChange={(value) => {
                                        UpdateFormData('category', value.category)
                                        UpdateFormData('subCategoryId', value.subCategory)
                                        UpdateFormData('tagsId', value.tags)
                                    }} />
                                    {ErrorMsg.category ?
                                    <ErrorMessage ErrorMsg={ErrorMsg.category}/>:(
                                        ErrorMsg.subCategory?<ErrorMessage ErrorMsg={ErrorMsg.subCategory}/>:
                                        <ErrorMessage ErrorMsg={ErrorMsg.tags}/>
                                    )}
                            </div>
                            <section>
                                <h3 className="capitalize opacity-60">{t("attachments")}</h3>
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} media={categoryDetails?.media} />
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
                                    name={"creatives"}
                                    listdiv={formData.creatives && formData.creatives.map((e, i) => (
                                        <a href={`/creative/${e.username}`} target="_blank" rel="noopener noreferrer">
                                            <div className="flex gap-2 items-center">
                                                <img className="size-6 rounded-full" src={e.profileImage} alt={`${e.name}'s profile image`} />
                                                {e.name}
                                            </div>
                                        </a>
                                    ))}
                                    remove={(value) => removeFromArray('creatives', value)}
                                    enable={false}
                                />
                                <ErrorMessage ErrorMsg={ErrorMsg.creatives}/>
                            </section>

                            <section>
                                <ListInput name={'searchKeyword'} placeholder={t("Search keywords")} onChange={(value) => UpdateFormData('searchKeywords', value)} />
                                <ErrorMessage ErrorMsg={ErrorMsg.searchKeywords}/>
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
                                            <option key={index} value={value.toLowerCase()}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                                <input placeholder={`price per ${formData['projectScale[unit]'] || 'unit'}`} name="projectScale[pricerPerUnit]" value={formData['projectScale[pricerPerUnit]'] || ""} onChange={handleInputChange} className={"inputStyle1"} />
                                <div className="flex w-full justify-between gap-3">
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type="number" min={0} name='projectScale[minimum]' value={formData['projectScale[minimum]'] || ""} onChange={handleInputChange} placeholder={`minimum ${formData['projectScale[unit]'] || 'unit'}`} className={"inputStyle1"} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type="number" min={0} name='projectScale[current]' value={formData['projectScale[current]'] || ""} onChange={handleInputChange} placeholder={t("current")} className={"inputStyle1"} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type="number" min={0} name='projectScale[maximum]' value={formData['projectScale[maximum]'] || ""} onChange={handleInputChange} placeholder={`maximum ${formData['projectScale[unit]'] || 'unit'}`} className={"inputStyle1"} />
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
                            
                            <Button onClick={CheckNext} className="w-auto mb-7 mx-20" shadow={true} shadowHeight={"14"}>
                                <span className='text-white font-bold capitalize text-lg'>{t("Next")}</span>
                            </Button>

                        </form>
                    )}
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
    CreateProject,
    resetForm
};


export default connect(mapStateToProps, mapDispatchToProps)(AddPost);


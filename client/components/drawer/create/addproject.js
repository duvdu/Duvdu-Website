import Layout from "../../layout/Layout";
import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import Button from '../../elements/button';

import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { UpdateKeysAndValues, filterByCycle, gettFileUploaded, handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import SetCover from "./assets/addCover";
import ListInput from "../../elements/listInput";
import Drawer from "../../elements/drawer";
import { CreateProject } from "../../../redux/action/apis/cycles/projects/create";
import CategorySelection from "./assets/CategorySelection";
import AddAttachment from "../../elements/attachment";
import GoogleMap from "../../elements/googleMap";


const AddPost = ({ CreateProject, auth, respond, InsertToArray, UpdateFormData, addprojectState, categories, resetForm }) => {
    const router = useRouter();
    const formData = addprojectState.formData;

    const [errors, setErrors] = useState({});
    const [post_success, setPost_success] = useState(false);
    const [nextstep, setNextstep] = useState(1);
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    categories = filterByCycle(categories, 'project')
    const categoryDetails = categories.find(i => i._id == formData.category)

    const listDropDown =
        categoryDetails?.media === 'image'
            ? ['image']
            : (categoryDetails?.media === 'video' || categoryDetails?.media === 'audio'
                ? ['minutes', 'hours']
                : []);
                
    useEffect(() => {
        UpdateFormData("projectScale[unit]", listDropDown[0])
    }, [categoryDetails?.media])

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
                data.append(`tools[${index}][unitPrice]`, item.fees);
            });
        }

        if (formData.functions) {
            formData.functions.forEach((item, index) => {
                data.append(`functions[${index}][name]`, item.name);
                data.append(`functions[${index}][unitPrice]`, item.fees);
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
        // if (!formData.tools || !formData.tools.length) errors.title = 'tools is required';
        // if (!formData.functions || !formData.functions.length) errors.title = 'functions is required';
        // if (!formData.creatives || !formData.creatives.length) errors.title = 'creatives is required';
        if ((formData.description?.length || 0) < 6) errors.desc = 'Description is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.duration) errors.duration = 'duration is required';
        // if (!formData.searchKeywords || !formData.searchKeywords.length) errors.searchKeywords = 'Search keywords are required';
        if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment not valid';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
        if (!formData['projectScale[unit]'] || !formData['projectScale[minimum]'] || !formData['projectScale[current]'] || !formData['projectScale[maximum]']) errors.location = 'projectScale is required';
        if (parseFloat(formData['projectScale[minimum]']) >= parseFloat(formData['projectScale[current]'])) errors.location = 'current should be greater than minimum';
        if (parseFloat(formData['projectScale[current]']) >= parseFloat(formData['projectScale[maximum]'])) errors.location = 'maximum should be greater than current';
        return errors;
    };
    const isEnable = Object.keys(validateRequiredFields()).length == 0
console.log(validateRequiredFields())
    const setCover = (e) => {
        const validationErrors = validateRequiredFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setNextstep(2)
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value)) {
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
        if (respond)
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


    // console.log(categoryDetails)
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
                            </div>
                            <section>
                                <h3 className="capitalize opacity-60">attachments</h3>
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                            </section>
                            <section>
                                <input placeholder='name' className={"inputStyle1"} value={formData.name || ""} onChange={handleInputChange} name="name" />
                            </section>
                            <section>
                                <input placeholder='description' className={"inputStyle1"} value={formData.description || ""} onChange={handleInputChange} name="description" />
                            </section>
                            <section>
                                <input placeholder='duration' type="number" min={0} className={"inputStyle1"} value={formData.duration || ""} onChange={handleInputChange} name="duration" />
                            </section>
                            <section>
                                <ListInput
                                    placeholder={'tools used'}
                                    target="AddToolUsed"
                                    name={"tools"}
                                    listdiv={formData.tools && formData.tools.map((e, i) => (`<span> <strong>tool : </strong> ${e.name} </span> <br/>  <span> <strong>fees : </strong> ${e.fees} </span>`))}
                                    remove={(value) => removeFromArray('tools', value)}
                                    enable={false}
                                />
                            </section>
                            <section>
                                <ListInput
                                    placeholder={'Functions used'}
                                    target="Addfunctions"
                                    name={"functions"}
                                    listdiv={formData.functions && formData.functions.map((e, i) => (`<span> <strong>tool : </strong> ${e.name} </span> <br/>  <span> <strong>fees : </strong> ${e.fees} </span>`))}
                                    remove={(value) => removeFromArray('functions', value)}
                                    enable={false}
                                />
                            </section>
                            <section>
                                <ListInput
                                    placeholder={'tag creatives'}
                                    target="addOtherCreatives"
                                    name={"creatives"}
                                    listdiv={formData.creatives && formData.creatives.map((e, i) => (`<span> <strong>name : </strong> ${e.name} </span> <br/> `))}
                                    remove={(value) => removeFromArray('creatives', value)}
                                    enable={false}
                                />
                            </section>

                            <section>
                                <ListInput name={'searchKeyword'} placeholder={'Search keywords'} onChange={(value) => UpdateFormData('searchKeywords', value)} />
                            </section>
                            <section className="h-96 relative overflow-hidden">
                                <span> Set location </span>
                                <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)}  onChangeAddress={handleInputChange}/>
                            </section>

                            <section className="flex flex-col gap-8">
                                <section className="hidden">
                                    <h3 className='opacity-60 my-2 text-lg font-bold'>Select Project Media</h3>
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
                                    <h3 className='font-bold text-lg'> Project Scale Unit </h3>
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
                                            <input type="number" min={0} name='projectScale[current]' value={formData['projectScale[current]'] || ""} onChange={handleInputChange} placeholder={`current`} className={"inputStyle1"} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type="number" min={0} name='projectScale[maximum]' value={formData['projectScale[maximum]'] || ""} onChange={handleInputChange} placeholder={`maximum ${formData['projectScale[unit]'] || 'unit'}`} className={"inputStyle1"} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className='flex justify-center gap-3 mt-1'>
                                <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} />
                                <p className='opacity-70'> Show on home feed & profile </p>
                            </div>
                            <Button isEnabled={isEnable} onClick={setCover} className="w-auto mb-7 mt-4 mx-20" shadow={true} shadowHeight={"14"}>
                                <span className='text-white font-bold capitalize text-lg'>
                                    Next
                                </span>
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


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



    const convertToFormData = () => {
        const data = new FormData();

        // Append simple string and number values directly from the state
        UpdateKeysAndValues(formData, (key, value) => data.append(key, value), ['attachments'])
        // data.append('projectBudget', formData.projectBudget);
        data.append('projectScale[scale]', formData.duration);

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
        }
        return data;
    };

    const validateRequiredFields = () => {
        const errors = {};

        if (!formData.category) errors.category = 'Category is required';
        if (!formData.subCategoryId) errors.subCategory = 'Subcategory is required';
        if (!formData.tagsId || !formData.tagsId.length) errors.tags = 'Tags are required';
        if (!formData.name) errors.title = 'Title is required';
        if ((formData.description?.length || 0) < 6) errors.desc = 'Description is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.searchKeywords || !formData.searchKeywords.length) errors.searchKeywords = 'Search keywords are required';
        if (!formData.attachments || !formData.attachments.length) errors.attachments = 'Attachments are required';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
        // if (!formData.duration) errors.duration = 'Project scale is required';

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
        UpdateFormData(name, value);
        // if (name == "durationUnit" || name == "duration") {
        //     UpdateFormData(prevState => ({ ...prevState, ["duration"]: (formData['duration'] + formData['durationUnit']) }));
        // }
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
        UpdateFormData("projectScale[unit]","minute")
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


    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Drawer isOpen={true} name={'add project'} toggleDrawer={toggleDrawer}>
                {nextstep == 2 ? (
                    <SetCover Publish={Publish} oncancel={() => setNextstep(1)} />
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
                                <input placeholder='Name your project' className={inputStyle} value={formData.name || ""} onChange={handleInputChange} name="name" />
                            </section>
                            <section>
                                <input placeholder='Project description' className={inputStyle} value={formData.description || ""} onChange={handleInputChange} name="description" />
                            </section>
                            <section>
                                <input placeholder='address' className={inputStyle} value={formData.address || ""} onChange={handleInputChange} name="address" />
                            </section>
                            <section>
                                <ListInput name={'searchKeyword'} placeholder={'Search keywords'} onChange={(value) => UpdateFormData('searchKeywords', value)} />
                            </section>
                            {/* <section>
                                <input type="number" placeholder='Project budget' className={inputStyle} value={formData.projectBudget || ""} onChange={handleInputChange} name="projectBudget" />
                                {
                                    errors.projectBudget && <div style={{ color: 'red' }}>{errors.projectBudget}</div>
                                }
                            </section> */}
                            <section>
                                <div className='flex justify-center items-center gap-9'>
                                    <input type="number" placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" value={formData.duration} onChange={handleInputChange} name="duration" />
                                    {errors.duration && <div style={{ color: 'red' }}>{errors.duration}</div>}
                                    <select
                                        className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalize"
                                        value={formData.durationUnit}
                                        onChange={handleInputChange}
                                        name="durationUnit"
                                        required
                                    >
                                        {['minute', 'hour'].map((value, index) => (
                                            <option key={index} value={value.toLowerCase()}>{value}</option>
                                        ))}
                                    </select>
                                </div>

                            </section>
                            <section className="h-96 relative overflow-hidden">
                                <span> Set location </span>
                                <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)} />
                            </section>
                            <section className="flex flex-col gap-8">
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-bold text-lg'> Project Scale Unit </h3>
                                    <select
                                        className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalizez"
                                        value={formData['projectScale[unit]']}
                                        onChange={handleInputChange}
                                        name="projectScale[unit]"
                                        required
                                    >
                                        {['minutes', 'hours', 'days', 'weeks', 'months'].map((value, index) => (
                                            <option key={index} value={value.toLowerCase()}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                                <input placeholder={`price per ${formData['projectScale[unit]'] || 'unit'}`} name="projectScale[pricerPerUnit]" value={formData['projectScale[pricerPerUnit]']|| ""} onChange={handleInputChange} className={inputStyle} />
                                <div className="flex w-full justify-between gap-3">
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type='number' name='projectScale[minimum]' value={formData['projectScale[minimum]']|| ""} onChange={handleInputChange} placeholder={`minimum ${formData['projectScale[unit]'] || 'unit'}`} className={inputStyle} />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type='number' name='projectScale[maximum]' value={formData['projectScale[maximum]']|| ""} onChange={handleInputChange} placeholder={`maximum ${formData['projectScale[unit]'] || 'unit'}`} className={inputStyle} />
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


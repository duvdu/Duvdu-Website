import Layout from "../../layout/Layout";
import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import Button from '../../elements/button';

import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { filterByCycle, gettFileUploaded, handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import Successfully_posting from "../../popsup/post_successfully_posting";
import SetCover from "./assets/addCover";
import ListInput from "../../elements/listInput";
import Drawer from "../../elements/drawer";
import { CreateProject } from "../../../redux/action/apis/cycles/projects/create";
import CategorySelection from "./assets/selectCategory";
import AddAttachment from "../../elements/attachment";


const AddPost = ({ CreateProject, auth, respond, InsertToArray, UpdateFormData, addprojectState, categories, resetForm }) => {
    const router = useRouter();
    const formData = addprojectState.formData;

    const [errors, setErrors] = useState({});
    const [post_success, setPost_success] = useState(false);
    const [nextstep, setNextstep] = useState(1);
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    categories = filterByCycle(categories, 'portfolio-post')

    useEffect(() => {
        UpdateFormData('projectScale[time]', 'minute')
    }, [])

    const convertToFormData = () => {
        const data = new FormData();

        // Append simple string and number values directly from the state
        data.append('title', formData.title);
        data.append('desc', formData.desc);
        data.append('address', formData.address);
        data.append('projectBudget', formData.projectBudget);
        data.append('projectScale[scale]', formData.durationnum);

        data.append('location.lat', formData['location.lat']);
        data.append('location.lng', formData['location.lng']);

        data.append('projectScale[time]', formData.durationUnit || "minute");
        data.append('showOnHome', formData.showOnHome || false);

        data.append('category', formData.category);
        data.append('subCategory', formData.subCategory);
        if (formData.tags)
            formData.tags.forEach((tag, index) => {
                data.append(`tags[${index}]`, tag);
            });

        // Append searchKeywords
        if (formData.searchKeywords)
            formData.searchKeywords.forEach((keyword, index) => {
                data.append(`searchKeywords[${index}]`, keyword);
            });

        // Append tools
        if (formData.tools)
            formData.tools.forEach((tool, index) => {
                data.append(`tools[${index}][name]`, tool.name);
                data.append(`tools[${index}][fees]`, tool.fees);
            });

        // Append creatives
        if (formData.creatives)
            formData.creatives.forEach((creative, index) => {
                data.append(`creatives[${index}][creative]`, creative._id);
                data.append(`creatives[${index}][fees]`, creative.fees);
            });

        if (formData.cover) {
            data.append('cover', formData.cover);
        }
        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i].file;
                data.append(`attachments`, file);
            }

        return data;
    };

    const validateRequiredFields = () => {
        const errors = {};

        if (!formData.title) errors.title = 'Title is required';
        if (!formData.desc) errors.desc = 'Description is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.durationnum) errors.durationnum = 'Project scale is required';
        if (!formData.durationUnit) errors.durationUnit = 'Project time is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.subCategory) errors.subCategory = 'Subcategory is required';
        if (!formData.tags || !formData.tags.length) errors.tags = 'Tags are required';
        if (!formData.searchKeywords || !formData.searchKeywords.length) errors.searchKeywords = 'Search keywords are required';
        if (!formData.tools || !formData.tools.length) errors.tools = 'Tools are required';
        if (!formData.creatives || !formData.creatives.length) errors.creatives = 'Creatives are required';
        if (!formData.attachments || !formData.attachments.length) errors.attachments = 'Attachments are required';
        
        return errors;
    };
    const isEnable = Object.keys(validateRequiredFields()).length == 0
    
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
        //     UpdateFormData(prevState => ({ ...prevState, ["duration"]: (formData['durationnum'] + formData['durationUnit']) }));
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
            <Successfully_posting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Drawer isOpen={true} name={'add project'} toggleDrawer={toggleDrawer}>
                {nextstep == 2 ? (
                    <SetCover Publish={Publish} oncancel={() => setNextstep(1)} />
                ) :
                    (
                        <form className='flex flex-col gap-5 mx-5 sm:mx-auto' >
                            <div className="my-5">
                                <CategorySelection
                                    categories={categories}
                                    value={{
                                        'category': formData.category,
                                        'subCategory': formData.subCategory,
                                        'tags': formData.tags,
                                    }}
                                    categorie
                                    onChange={(value) => {
                                        UpdateFormData('category', value.category)
                                        UpdateFormData('subCategory', value.subCategory)
                                        UpdateFormData('tags', value.tags)
                                    }} />
                            </div>
                            <section>
                                <h3 className="capitalize opacity-60 mt-11">attachments</h3>
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                            </section>
                            <section>
                                <input placeholder='Name your project' className={inputStyle} value={formData.title} onChange={handleInputChange} name="title" />
                            </section>
                            <section>
                                <input placeholder='Project description' className={inputStyle} value={formData.desc} onChange={handleInputChange} name="desc" />
                            </section>
                            {/* <section>
                                <input placeholder="Add creative’s functions" className={inputStyle} value={formData.creativeFunctions} onChange={handleInputChange} name="creativeFunctions" />
                            </section> */}
                            <section>
                                <input placeholder='address' className={inputStyle} value={formData.address} onChange={handleInputChange} name="address" />
                            </section>
                            <section>
                                <ListInput name={'searchKeyword'} placeholder={'Search keywords'} onChange={(value) => UpdateFormData('searchKeywords', value)} />
                            </section>
                            <section>
                                <ListInput
                                    placeholder={'add tool used'}
                                    target="AddToolUsed"
                                    name={"tools"}
                                    listdiv={formData.tools && formData.tools.map((e, i) => (`<span> <strong>tool : </strong> ${e.name} </span> <br/>  <span> <strong>fees : </strong> ${e.fees} </span>`))}
                                    remove={(value) => removeFromArray('tools', value)}
                                    enable={false}
                                />
                            </section>
                            <section>
                                <ListInput
                                    placeholder={'add other creatives'}
                                    target="addOtherCreatives"
                                    name={"creatives"}
                                    listdiv={formData.creatives && formData.creatives.map((e, i) => (`<span> <strong>name : </strong> ${e.name} </span> <br/>  <span> <strong>fees : </strong> ${e.fees} </span>`))}
                                    remove={(value) => removeFromArray('creatives', value)}
                                    enable={false}
                                />
                            </section>
                            {/* 
                            <section>
                                <ListInput
                                    placeholder={'equipment available'}
                                    target="EquipmentAvailable"
                                    listdiv={equipments}
                                />
                                <EquipmentAvailable onSubmit={hadleAddEQquip} />
                            </section>
                         */}
                            <section>
                                <input type="number" placeholder='Project budget' className={inputStyle} value={formData.projectBudget} onChange={handleInputChange} name="projectBudget" />
                                {errors.projectBudget && <div style={{ color: 'red' }}>{errors.projectBudget}</div>}
                            </section>
                            <section>
                                <div className='flex justify-center items-center gap-9'>
                                    <input type="number" placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" value={formData.durationnum} onChange={handleInputChange} name="durationnum" />
                                    {errors.durationnum && <div style={{ color: 'red' }}>{errors.durationnum}</div>}
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


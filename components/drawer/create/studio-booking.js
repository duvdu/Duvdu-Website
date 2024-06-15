import Drawer from '../../elements/drawer';

import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import { CreateStudio } from '../../../redux/action/apis/cycles/studio/create';
import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';

import { useRouter } from "next/router";
import { filterByCycle as filterByCycleCategory, handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import ListInput from "../../elements/listInput";
import EquipmentAvailable from "../../popsup/create/equipmentAvailable";
import AddOtherCreatives from "../../popsup/create/addOtherCreatives";
import Successfully_posting from "../../popsup/post_successfully_posting";
import GoogleMap from "../../elements/googleMap";
import SetCover from "./assets/addCover";
import CategorySelection from './assets/CategorySelection';
import AppButton from '../../elements/button';
import AddAttachment from '../../elements/attachment';


const AddStudioBooking = ({ CreateStudio, user, auth, respond, categories, addprojectState, UpdateFormData, InsertToArray, resetForm }) => {

    const router = useRouter();
    const formData = addprojectState.formData;
    const [errors, setErrors] = useState({});
    const [post_success, setPost_success] = useState(false);
    const [nextstep, setNextstep] = useState(1);
    const [attachmentValidation, setAttachmentValidation] = useState(false);
    categories = filterByCycleCategory(categories, 'studio-booking')

    const convertToFormData = () => {
        const data = new FormData();

        data.append('desc', formData.description);
        data.append('studioEmail', formData.studioEmail);
        data.append('studioNumber', formData.studioNumber);
        data.append('studioName', formData.studioName);

        if (formData.searchKeywords)
            formData.searchKeywords.forEach((keyword, index) => {
                data.append(`searchKeywords[${index}]`, keyword);
            });
        if (formData.location) {
            data.append('location.lat', formData.location.lat);
            data.append('location.lng', formData.location.lng);
        }
        data.append('category', formData.category);
        data.append('subCategory', formData.subCategory);
        data.append('showOnHome', formData.showOnHome || false);
        data.append('insurance', formData.insurance);
        data.append('pricePerHour', formData.pricePerHour);

        if (formData.tags)
            formData.tags.forEach((tag, index) => {
                data.append(`tags[${index}]`, tag);
            });

        // Append equipment
        if (formData.equipments)
            formData.equipments.forEach((equipment, index) => {
                data.append(`equipments[${index}][name]`, equipment.name);
                data.append(`equipments[${index}][fees]`, equipment.fees);
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
                const file = formData.attachments[i];
                data.append(`attachments`, file.file);
            }


        return data;
    };
    const validateRequiredFields = () => {
        const errors = {};
        const egyptianPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    
        if ((formData.description?.length || 0) < 6) errors.description = 'Description is required';
        if (!formData.studioEmail) errors.studioEmail = 'Studio email is required';
        if (!formData.studioNumber) errors.studioNumber = 'Studio number is required';
        if (!formData.studioName) errors.studioName = 'Studio name is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.subCategory) errors.subCategory = 'Subcategory is required';
        if (!formData.pricePerHour) errors.pricePerHour = 'Price per hour is required';
        if (!formData.location || !formData.location.lat || !formData.location.lng) errors.location = 'Location is required';
        if (!formData.insurance) errors.insurance = 'Insurance is required';
        if (!attachmentValidation && !formData.attachments?.length) errors.attachments = 'Attachment not valid';
        if (!formData.Min) errors.Min = 'Minimum value is required';
        if (!formData.Max) errors.Max = 'Maximum value is required';
        if (!formData.studioNumber) {
            errors.studioNumber = 'Studio number is required';
        } else if (!egyptianPhoneRegex.test(formData.studioNumber)) {
            errors.studioNumber = 'Invalid Egyptian phone number.';
        }
    
        return errors;
    };

    const setCover = (e) => {
        const validationErrors = validateRequiredFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setNextstep(2)
    }

    const Publish = () => {
        setNextstep(1)
        const validationErrors = validateRequiredFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        CreateStudio(convertToFormData());
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        UpdateFormData(name, value);
    };

    const removeFromArray = (arrayName, index) => {
        const newArray = [...formData[arrayName]]; // Create a new array to avoid mutating the original state

        newArray.splice(index, 1); // Remove the item at the specified index
        UpdateFormData(arrayName, newArray);
    };

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])


    useEffect(() => {
        if (auth.login === false)
            router.push({
                pathname: "/",
            });
    }, [auth.login])


    const toggleDrawer = () => {
        CreateStudio(-1)
        if (nextstep == 2) {
            setNextstep(1)
            return
        }
        resetForm()
        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }
    const hasErrors = Object.keys(validateRequiredFields()).length > 0;
    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";
    return (
        <>
            <EquipmentAvailable onSubmit={(value) => InsertToArray('equipments', value)} />
            <Successfully_posting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Drawer isOpen={true} name={'studio booking'} toggleDrawer={toggleDrawer}>
                {nextstep == 2 ? (
                    <SetCover Publish={Publish} oncancel={() => setNextstep(1)} />
                ) :
                    (
                        <form className='flex flex-col gap-5 container mx-auto'>
                            <div className="my-5">
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
                            <section className="w-full ">
                                <h3 className="capitalize opacity-60">attachments</h3>
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                            </section>
                            <section className='gap-8'>
                                <input placeholder='Name' value={formData.studioName} onChange={handleInputChange} name="studioName" className={inputStyle} />
                                <input placeholder='Phone number' type="tel" value={formData.studioNumber} onChange={handleInputChange} name="studioNumber" className={inputStyle} />
                                <input placeholder='Email' type="email" value={formData.studioEmail} onChange={handleInputChange} name="studioEmail" className={inputStyle} />
                                <input placeholder='Description' value={formData.description} onChange={handleInputChange} name="description" className={inputStyle} />
                                <input placeholder='Location' className={inputStyle} readOnly />
                                <ListInput name={'searchKeyword'} placeholder={'Search keywords'} onChange={(value) => UpdateFormData('searchKeywords', value)} />
                                <input type="number" placeholder='insurance' value={formData.insurance} onChange={handleInputChange} name="insurance" className={inputStyle} />
                            </section>
                            <section className="h-96 relative overflow-hidden">
                                <h3> location </h3>
                                <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)} />
                            </section>
                            <section className="flex flex-col gap-8">
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-bold text-lg'> Project Scale Unit </h3>
                                    <select
                                        className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalizez"
                                        value={formData['customRequirement[unit]']}
                                        onChange={handleInputChange}
                                        name="customRequirement[unit]"
                                        required
                                    >

                                        {['minute', 'hour', 'day', 'week', 'month'].map((value, index) => (
                                            <option key={index} value={value.toLowerCase()}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                                <input placeholder={`price per ${formData['customRequirement[unit]'] || 'unit'}`} value={formData.pricePerHour} onChange={handleInputChange} name="pricePerHour" className={inputStyle} />
                                <div className="flex w-full justify-between gap-3">
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type='number' value={formData.Min} onChange={handleInputChange} name='Min' placeholder="Min" className={inputStyle} />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type='number' value={formData.Max} onChange={handleInputChange} name='Max' placeholder="Max" className={inputStyle} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className='flex justify-center gap-3 mt-10'>
                                <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} />
                                <p className='opacity-70'> Show on home feed & profile </p>
                            </section>

                            <AppButton isEnabled={!hasErrors} onClick={setCover} className="w-full mb-7 mt-4" shadow={true} shadowHeight={"14"}>
                                <span className='text-white font-bold capitalize text-lg'>
                                    Next
                                </span>
                            </AppButton>

                        </form>
                    )}
            </Drawer>
        </>

    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    respond: state.api.CreateStudio,
    categories: state.categories,
    addprojectState: state.addproject,

});

const mapDispatchToProps = {
    CreateStudio,
    InsertToArray,
    resetForm,
    UpdateFormData
};


export default connect(mapStateToProps, mapDispatchToProps)(AddStudioBooking);
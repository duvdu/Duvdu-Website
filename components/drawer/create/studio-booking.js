import Drawer from '../../elements/drawer';

import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import Button from '../../elements/button';
import { CreateStudio } from '../../../redux/action/apis/cycles/studio/create';
import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';

import { useRouter } from "next/router";
import { filterByCycle as filterByCycleCategory, handleMultipleFileUpload } from "../../../util/util";
import ListInput from "../../elements/listInput";
import EquipmentAvailable from "../../popsup/create/equipmentAvailable";
import AddOtherCreatives from "../../popsup/create/addOtherCreatives";
import Successfully_posting from "../../popsup/post_successfully_posting";
import GoogleMap from "../../elements/googleMap";
import SetCover from "./assets/addCover";
import CategorySelection from './assets/selectCategory';


const AddStudioBooking = ({ CreateStudio, user, auth, respond, categories, addprojectState, UpdateFormData, InsertToArray ,resetForm}) => {

    const router = useRouter();
    const formData = addprojectState.formData;
    const { category, tags } = router.query
    const [errors, setErrors] = useState({});
    const [post_success, setPost_success] = useState(false);
    const [nextstep, setNextstep] = useState(1);
    categories = filterByCycleCategory(categories, 'studio-booking')

    const convertToFormData = () => {
        const data = new FormData();

        // Append simple string and number values directly from the state
        data.append('desc', formData.description);
        data.append('studioEmail', formData.studioEmail);
        data.append('studioNumber', formData.studioNumber);
        data.append('studioName', formData.studioName);

        // Append searchKeywords
        if (formData.searchKeywords)
            formData.searchKeywords.forEach((keyword, index) => {
                data.append(`searchKeywords[${index}]`, keyword);
            });
        if (formData.location) {
            data.append('location.lat', formData.location.lat);
            data.append('location.lng', formData.location.lng);
        }
        data.append('category', formData.category || categories[0]._id);
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
                data.append(`creatives[${index}][creative]`, creative.creative);
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

        if (tags)
            tags.forEach((creative, index) => {
                data.append(`tags[${index}]`, creative.tags);
            });
        return data;
    };

    const validateRequiredFields = () => {
        return {}
        const errors = {};

        return errors;
    }
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
        console.log(newArray)
        newArray.splice(index, 1); // Remove the item at the specified index
        UpdateFormData(arrayName, newArray);
    };

    const attachmentsUpload = (e) => {
        const files = e.target.files;
        UpdateFormData('attachments', handleMultipleFileUpload(e))
        // setAttachments(handleMultipleFileUpload(e))
    };

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])

    const reset = () => {
        setPost_success(false)
    }
    
    useEffect(() => {
        if (auth.login === false)
            router.push({
                pathname: "/",
            });
    }, [auth.login])


    const toggleDrawer = () => {
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
    console.log(formData)
    return (
        <>
            <EquipmentAvailable onSubmit={(value) => InsertToArray('equipments', value)} />
            <Successfully_posting isShow={post_success} onCancel={reset} message="Creating" />
            <Drawer isOpen={true} name={'studio booking'} toggleDrawer={toggleDrawer}>
                {nextstep == 2 ? (
                    <SetCover Publish={Publish} oncancel={() => setNextstep(1)} />
                ) :
                    (
                        <form className='flex flex-col gap-5 container mx-auto'>
                            <div className="my-5">
                                <CategorySelection 
                                value={{
                                    'category' :formData.category,
                                    'subCategory':formData.subCategory,
                                    'tags':formData.tags,
                                }} 
                                categories={categories} 
                                onChange={(value) => {
                                    UpdateFormData('category', value.category)
                                    UpdateFormData('subCategory', value.subCategory)
                                    UpdateFormData('tags', value.tags)
                                }} />
                            </div>
                            <section className="w-full ">
                                {
                                    <>
                                        <label htmlFor="attachment-upload" >
                                            <div className='border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 bg-DS_white'>
                                                <div className='rounded-full size-14 flex justify-center items-center bg-[#F5F5F5]'>
                                                    <Icon name={"add-file"} className='size-7' />
                                                </div>
                                                <span className="text-primary text-sm font-bold mt-3">Click to Upload</span>
                                            </div>
                                        </label>
                                        <input onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
                                    </>

                                }
                                {
                                    formData.attachments &&
                                    formData.attachments.length > 0 &&
                                    formData.attachments.map((file, key) => (
                                        <div key={key} className='flex bg-[#EEF1F7] dark:bg-[#18140c] rounded-3xl items-center gap-4 p-2 mt-5'>
                                            <Icon name={'file'} className="size-10" />
                                            <div>
                                                <span className=''>{file.fileName}</span>
                                                <br />
                                                <span className='text-[#A9ACB4]'>{file.formattedFileSize}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                            <section >
                                <input placeholder='studio name' value={formData.studioName} onChange={handleInputChange} name="studioName" className={inputStyle} />
                                <input placeholder='studio number' type="tel" value={formData.studioNumber} onChange={handleInputChange} name="studioNumber" className={inputStyle} />
                                <input placeholder='studio email' type="email" value={formData.studioEmail} onChange={handleInputChange} name="studioEmail" className={inputStyle} />
                                <input placeholder='description' value={formData.description} onChange={handleInputChange} name="description" className={inputStyle} />
                                <ListInput
                                    placeholder={'equipment available'}
                                    target="EquipmentAvailable"
                                    name={"EquipmentsUsed"}
                                    listdiv={formData.equipments && formData.equipments.map((e, i) => (`<span> <strong>tool : </strong> ${e.name} </span> <br/>  <span> <strong>fees : </strong> ${e.fees} </span>`))}
                                    remove={(value) => removeFromArray('equipments', value)}
                                    enable={false}
                                />
                                <ListInput name={'searchKeyword'} placeholder={'Search keywords'} onChange={(value) => UpdateFormData('searchKeywords', value)} />
                                <input placeholder='price per hour' value={formData.pricePerHour} onChange={handleInputChange} name="pricePerHour" className={inputStyle} />
                                <input type="number" placeholder='insurance' value={formData.insurance} onChange={handleInputChange} name="insurance" className={inputStyle} />
                            </section>
                            <section className="h-96 relative overflow-hidden">
                                <span> Set location </span>
                                <GoogleMap width={'100%'} onsetLocation={(value) => UpdateFormData('location', value)} />
                            </section>
                            <section className='flex justify-center gap-3 mt-1'>
                                <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData( 'showOnHome', checked )} />
                                <p className='opacity-70'> Show on home feed & profile </p>
                            </section>

                            <Button onClick={setCover} className="w-full mb-7 mt-4" shadow={true} shadowHeight={"14"}>

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
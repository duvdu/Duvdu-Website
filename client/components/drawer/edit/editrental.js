import Drawer from '../../elements/drawer';

import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import { UpdateRental } from '../../../redux/action/apis/cycles/rental/edit';
import { Getstudio } from "../../../redux/action/apis/cycles/rental/getOne";
import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import ErrorMessage from '../../elements/ErrorMessage';
import { useRouter } from "next/router";
import { convertToFormData, filterByCycle as filterByCycleCategory, printFormData} from "../../../util/util";
import ListInput from "../../elements/listInput";
import EquipmentAvailable from "../../popsup/create/equipmentAvailable";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import GoogleMap from "../../elements/googleMap";
import SetCover from './../create/assets/addCover';
import CategorySelection from './../create/assets/CategorySelection';
import AppButton from '../../elements/button';
import Button from '../../elements/button';
import Loading from '../../elements/loading';
import AddAttachment from '../../elements/attachment';
import Share from '../../popsup/Share';
import { useTranslation } from 'react-i18next';


const EditRental = ({ UpdateRental, data , Getstudio,user,isOpen,setIsOpenEdit, auth, update_respond, categories, addprojectState, UpdateFormData, InsertToArray, resetForm }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { studio: studioId } = router.query;
    const formData = addprojectState.formData;
    const [errors, setErrors] = useState({});
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const [post_success, setPost_success] = useState(false);
    const [nextstep, setNextstep] = useState(1);
    const [attachmentValidation, setAttachmentValidation] = useState(false);
    categories = filterByCycleCategory(categories, 'rentals')
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
    const isArrayEqual = (arr1, arr2) => {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) return false;
        }
        return true;
      };
    const converting = () => {
        const UpdatedData = new FormData();
        // const data = convertToFormData(formData, ['location', 'tags', 'attachments', 'searchKeywords'])
        if(formData.title && (data.title!==formData.title)){
            UpdatedData.append('title',formData.title)
        }
        if(formData.description && (data.description!==formData.description))
            UpdatedData.append('description',formData.description)
        if(formData.address && (data.address!==formData.address))
            UpdatedData.append('address',formData.address)
        if(
            (formData['projectScale.unit'] && (data.projectScale.unit!==formData['projectScale.unit'])) ||
            (formData['projectScale.minimum']  && (data.projectScale.minimum!==formData['projectScale.minimum'])) ||
            (formData['projectScale.maximum']  && (data.projectScale.maximum!==formData['projectScale.maximum'])) ||
            (formData['projectScale.current']  && (data.projectScale.current!==formData['projectScale.current'])) ||
            (formData['projectScale.pricerPerUnit']  && (data.projectScale.pricerPerUnit!==formData['projectScale.pricerPerUnit']))
        ){
            UpdatedData.append('projectScale.unit',formData['projectScale.unit'])
            UpdatedData.append('projectScale.minimum',formData['projectScale.minimum'])
            UpdatedData.append('projectScale.maximum',formData['projectScale.maximum'])
            UpdatedData.append('projectScale.current',formData['projectScale.current'])
            UpdatedData.append('projectScale.pricerPerUnit',formData['projectScale.pricerPerUnit'])
        }
        if(formData.category && (data.category._id!==formData.category))
            UpdatedData.append('category',formData.category)
        if(formData.subCategory && (data.subCategory!==formData.subCategory))
            UpdatedData.append('subCategory',formData.subCategory)
        if (formData.tags)
            formData.tags.forEach((tag, index) => {
                UpdatedData.append(`tags[${index}]`, tag);
            });
        if (formData.searchKeywords && !isArrayEqual(formData.searchKeywords, data.searchKeywords))
            formData.searchKeywords.forEach((searchKeywords, index) => {
                UpdatedData.append(`searchKeywords[${index}]`, searchKeywords);
            });
    
        if (formData.cover && (data.name!==formData.name)) {
            UpdatedData.append('cover', formData.cover);
        }

        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i];
                UpdatedData.append(`attachments`, file.file);
        }

        if (formData.audioCover)
            for (let i = 0; i < formData.audioCover.length; i++) {
                const file = formData.audioCover[i];
                UpdatedData.append(`audioCover`, file.file);
            }

        if (formData.location && (data.name!==formData.name)) {
            UpdatedData.append('location[lat]', formData.location.lat);
            UpdatedData.append('location[lng]', formData.location.lng);
        };



        return UpdatedData;
    };
    const validateRequiredFields = () => {
        const errors = {};
        const egyptianPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

        if (!formData.category) errors.category = 'Category is required';
        // if (!formData.subCategory) errors.subCategory = 'Subcategory is required';
        // if (!formData.tags || !formData.tags.length) errors.tags = 'Tags are required';
        if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment not valid';
        if (!formData.title) errors.title = 'Studio name is required';
        if (!formData.phoneNumber) {
            errors.phoneNumber = 'Studio number is required';
        } else if (!egyptianPhoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Invalid Egyptian phone number';
        }
        if (!formData.email) errors.email = 'Studio email is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.location || !formData.location.lat || !formData.location.lng) errors.location = 'Location is required';
        if (!formData.searchKeywords || !formData.searchKeywords.length) errors.searchKeywords = 'At least one search keyword is required';
        // if (!formData.insurance) errors.insurance = 'Insurance is required';
        // showOnHome
        if (!formData['projectScale.unit']) errors.projectScaleunit = 'Project Scale Unit is required';
        if (!formData['projectScale.pricerPerUnit']) errors.pricerPerUnit = 'Price Per Unite is required';
        if (!formData['projectScale.minimum']) errors.minimum = 'Minimum value is required';
        if (!formData['projectScale.maximum']) errors.maximum = 'Maximum value is required';
        if (parseInt(formData['projectScale.minimum']) >= parseInt(formData['projectScale.maximum'])) errors.minimum = 'Maximum value should be greater than minimum value';

        // cover
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
    
    const setCover = (e) => {
        // const validationErrors = validateRequiredFields();
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }
        // setErrors({});
        setNextstep(2)
    }
    var convertError = JSON.parse(update_respond?.error ?? null)
    const Publish = () => {
        // setNextstep(1)
        // const validationErrors = validateRequiredFields();
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }
        // setErrors({});
        UpdateRental(studioId, converting()).then(()=>{
            if(!convertError){
                setPost_success(true)
                setNextstep(1)
            }
        });
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value);
    };

    // useEffect(() => {
    //     if (auth.login === false)
    //         router.push({
    //             pathname: "/",
    //         });
    // }, [auth.login])

    // useEffect(() => {
    //     UpdateFormData("projectScale.unit", "hours")
    // }, [])

    const hasErrors = Object.keys(validateRequiredFields()).length > 0;

    useEffect(() => {
        UpdateFormData("title", data.title)
        UpdateFormData("description", data.description)
        UpdateFormData("category", data.category._id)
        UpdateFormData("subCategory", data?.subCategory?._id)
        UpdateFormData("tags", data.tags.map(item => item._id))
        UpdateFormData("phoneNumber", data.phoneNumber)
        UpdateFormData("email", data.email)
        UpdateFormData("address", data.address)
        UpdateFormData("insurance", data.insurance)
        UpdateFormData("showOnHome", data.showOnHome)
        UpdateFormData('location', {
            lat:data.location.lat,
            lng:data.location.lng
        })
        UpdateFormData("searchKeywords", data.searchKeywords)
        UpdateFormData("projectScale.pricerPerUnit", data.projectScale.pricerPerUnit)
        UpdateFormData("projectScale.unit", data.projectScale.unit)
        UpdateFormData("projectScale.minimum", data.projectScale.minimum)
        UpdateFormData("projectScale.maximum", data.projectScale.maximum)
    }, [data])
    const toggleDrawer = () => {
              
        setPost_success(false)
        if (nextstep == 2) {
            setNextstep(1)
            return
        }
        setIsOpenEdit(false)
    }
    const closeDrawer = ()=>{
        setPost_success(false)
        setIsOpenEdit(false)
        Getstudio(studioId)
    }

    return (
        <>
            <EquipmentAvailable onSubmit={(value) => InsertToArray('equipments', value)} />
            <SuccessfullyPosting isShow={post_success} onCancel={closeDrawer} message="updating" />
            <Share url={window.location.href} title={'See that 👀'} />
            <Drawer isOpen={isOpen} name={t('edit rental')} toggleDrawer={toggleDrawer}>
                    <div className={nextstep == 1 && 'hidden'}>
                        <SetCover Publish={Publish} respond={update_respond} oncancel={() => setNextstep(1)} />
                    </div>
                    <form className={`${nextstep == 2 && 'hidden'} flex flex-col gap-5 container mx-auto`}>
                        {data.canEdit && 
                        <>

                            <div className="my-5">
                                <CategorySelection
                                    filterIn={"rentals"}
                                    value={{
                                        'category':formData.category|| data?.category?._id ,
                                        'subCategory': formData.subCategory || data.subCategory?._id ,
                                        'tags': formData.tags || data.tags,
                                    }}
                                    onChange={(value) => {
                                        UpdateFormData('category', value.category)
                                        UpdateFormData('subCategory', value.subCategory)
                                        UpdateFormData('tags', value.tags)
                                    }} />
                                    {/* {ErrorMsg.category ? */}
                                    <ErrorMessage ErrorMsg={ErrorMsg.category}/>
                                    {/* :(
                                        ErrorMsg.subCategory?<ErrorMessage ErrorMsg={ErrorMsg.subCategory}/>:
                                        <ErrorMessage ErrorMsg={ErrorMsg.tags}/>
                                    )} */}
                            </div>
                            <section className='gap-8'>
                                <section>
                                    <h3 className="capitalize opacity-60">{t("attachments")}</h3>
                                    <AddAttachment id={'attachments'} name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                                    <ErrorMessage ErrorMsg={ErrorMsg.attachments}/>
                                </section>
                                <section>
                                    <input placeholder={t("Name")} name="title" value={formData.title || ""} onChange={handleInputChange} className={"inputStyle1"} />
                                    <ErrorMessage ErrorMsg={ErrorMsg.title}/>
                                </section>
                                <section>
                                    <input placeholder={t("Phone number")} type="tel" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleInputChange} className={"inputStyle1"} />
                                    <ErrorMessage ErrorMsg={ErrorMsg.phoneNumber}/>
                                </section>
                                <section>
                                    <input placeholder={t("Email")} type="email" name="email" value={formData.email || ""} onChange={handleInputChange} className={"inputStyle1"} />
                                    <ErrorMessage ErrorMsg={ErrorMsg.email}/>
                                </section>
                                <section>
                                    <input placeholder={t("Description")} name="description" value={formData.description || ""} onChange={handleInputChange} className={"inputStyle1"} />
                                    <ErrorMessage ErrorMsg={ErrorMsg.description}/>
                                </section>
                                <section className="h-96 relative overflow-hidden mt-5">
                                    <h3>{t("location")}</h3>
                                    <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)} onChangeAddress={handleInputChange} />
                                </section>
                                <section>
                                    <ListInput name={'searchKeyword'} placeholder={t("Search keywords")} value={(formData.searchKeywords>0 && data.searchKeywords.length>0) ? formData.searchKeywords : data.searchKeywords} onChange={(value) => UpdateFormData('searchKeywords', value)} />
                                    <ErrorMessage ErrorMsg={ErrorMsg.searchKeywords}/>
                                </section>
                                <section>
                                    <input type="number" min={0} placeholder={t("insurance")} name="insurance" value={formData.insurance || ""} onChange={handleInputChange} className={"inputStyle1"} />
                                    {/* <ErrorMessage ErrorMsg={ErrorMsg.insurance}/> */}
                                </section>
                            </section>
                            <section className="flex flex-col gap-8">
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-bold text-lg'>{t("Project Scale Unit")}</h3>
                                    <select
                                        className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalizez"
                                        value={formData.projectScale?.unit || data.projectScale.unit}
                                        onChange={handleInputChange}
                                        name="projectScale.unit"
                                        required
                                    >

                                        {['hours', 'days'].map((value, index) => (
                                            <option key={index} value={value.toLowerCase()}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                                <section>
                                    <input placeholder={`price per ${formData['projectScale.unit'] || 'unit'}`} name="projectScale.pricerPerUnit" value={formData['projectScale.pricerPerUnit'] || ""} onChange={handleInputChange} type='number' className={"inputStyle1"} />
                                    <ErrorMessage ErrorMsg={ErrorMsg.pricerPerUnit}/>
                                </section>
                                <div className="flex w-full justify-between gap-3">
                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type="number" min={0} name='projectScale.minimum' value={formData['projectScale.minimum'] || data.projectScale.minimum} onChange={handleInputChange} placeholder={`minimum ${formData['projectScale.unit'] || 'unit'}`} className={"inputStyle1"} />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type="number" min={0} name='projectScale.maximum' value={formData['projectScale.maximum'] || data.projectScale.maximum} onChange={handleInputChange} placeholder={`maximum ${formData['projectScale.unit'] || 'unit'}`} className={"inputStyle1"} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ErrorMessage ErrorMsg={ErrorMsg.maximum}/>
                                    <ErrorMessage ErrorMsg={ErrorMsg.minimum}/>
                                </div >
                            </section>
                        </>}
                            <section className='flex justify-center gap-3 mt-10'>
                                <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} />
                                <p className='opacity-70'>{t("Show on home feed & profile")}</p>
                            </section>
                            <ErrorMessage ErrorMsg={convertError?.data.errors[0].message}/>
                            <Button isEnabled={!update_respond?.loading} onClick={data.canEdit?CheckNext:Publish} className="w-auto mb-7 mx-20" shadow={true} shadowHeight={"14"}>
                            {update_respond?.loading?<Loading/>:<span className='text-white font-bold capitalize text-lg'>{t(data.canEdit?"Next":"Update")}</span>}
                            </Button>
                        </form>
            </Drawer>
        </>

    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    update_respond: state.api.UpdateRental,
    categories: state.categories,
    addprojectState: state.addproject,

});

const mapDispatchToProps = {
    UpdateRental,
    InsertToArray,
    resetForm,
    Getstudio,
    UpdateFormData
};


export default connect(mapStateToProps, mapDispatchToProps)(EditRental);
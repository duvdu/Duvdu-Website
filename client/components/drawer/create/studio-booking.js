import Drawer from '../../elements/drawer';

import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import Switch from '../../elements/switcher'
import { connect } from "react-redux";
import { CreateStudio } from '../../../redux/action/apis/cycles/rental/create';
import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import ErrorMessage from '../../elements/ErrorMessage';
import { useRouter } from "next/router";
import { convertToFormData, filterByCycle as filterByCycleCategory, printFormData} from "../../../util/util";
import ListInput from "../../elements/listInput";
import EquipmentAvailable from "../../popsup/create/equipmentAvailable";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import GoogleMap from "../../elements/googleMap";
import SetCover from "./assets/addCover";
import CategorySelection from './assets/CategorySelection';
import AppButton from '../../elements/button';
import AddAttachment from '../../elements/attachment';
import Share from '../../popsup/Share';
import { useTranslation } from 'react-i18next';


const AddStudioBooking = ({ CreateStudio, user, auth, respond, categories, addprojectState, UpdateFormData, InsertToArray, resetForm }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const formData = addprojectState.formData;
    const [errors, setErrors] = useState({});
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const [post_success, setPost_success] = useState(false);
    const [nextstep, setNextstep] = useState(1);
    const [attachmentValidation, setAttachmentValidation] = useState(false);
    categories = filterByCycleCategory(categories, 'rentals')

    const converting = () => {
        const data = convertToFormData(formData, ['location', 'tags', 'attachments', 'searchKeywords'])
        if (formData.location) {
            data.append('location[lat]', formData.location.lat);
            data.append('location[lng]', formData.location.lng);
        }

        if (formData.tags)
            formData.tags.forEach((tag, index) => {
                data.append(`tags[${index}]`, tag);
            });

        if (formData.searchKeywords)
            formData.searchKeywords.forEach((keyword, index) => {
                data.append(`searchKeywords[${index}]`, keyword);
            });
        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i].file;
                data.append(`attachments`, file);
            }
        printFormData(data)
        return data;
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
            errors.phoneNumber = 'Invalid Egyptian phone number.';
        }
        if (!formData.email) errors.email = 'Studio email is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.location || !formData.location.lat || !formData.location.lng) errors.location = 'Location is required';
        if (!formData.searchKeywords || !formData.searchKeywords.length) errors.searchKeywords = 'Search keywords are required';
        // if (!formData.insurance) errors.insurance = 'Insurance is required';
        // showOnHome
        if (!formData['projectScale.unit']) errors.projectScaleunit = 'Project Scale Unit is required';
        if (!formData['projectScale.pricerPerUnit']) errors.pricerPerUnit = 'Price Per Unite is required';
        if (!formData['projectScale.minimum']) errors.minimum = 'Minimum value is required';
        if (!formData['projectScale.maximum']) errors.maximum = 'Maximum value is required';
        if (parseInt(formData['projectScale.minimum']) > parseInt(formData['projectScale.maximum'])) errors.minimum = 'Minimum value should not be greater than maximum value';

        // cover
        return errors;
    };
    const CheckNext=()=>{
        setValidFormCheck(true)
        validateRequiredFields()
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) setErrorMsg(validateRequiredFields())
        else return setCover()
    }
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
    },[formData])
    const setCover = (e) => {
        setNextstep(2)
    }
    useEffect(() => {
        UpdateFormData('showOnHome', true)
    }, [])

    const Publish = () => {
        // setNextstep(1)
        // const validationErrors = validateRequiredFields();
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }
        // setErrors({});
        CreateStudio(converting());
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value);
    };

    useEffect(() => {
        if (respond?.data)
            setPost_success(true)
    }, [respond?.message])


    useEffect(() => {
        if (auth.login === false)
            router.push({
                pathname: "/",
            });
    }, [auth.login])

    useEffect(() => {
        UpdateFormData("projectScale.unit", "minutes")
    }, [])


    const toggleDrawer = () => {
        CreateStudio(-1)
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
    const hasErrors = Object.keys(validateRequiredFields()).length > 0;

    return (
        <>
            <EquipmentAvailable onSubmit={(value) => InsertToArray('equipments', value)} />
            <SuccessfullyPosting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Share url={window.location.href} title={'See that 👀'} />
            <Drawer isOpen={true} name={'Create Rental'} toggleDrawer={toggleDrawer}>
                {nextstep == 2 ? (
                    <SetCover Publish={Publish} oncancel={() => setNextstep(1)} />
                ) :
                    (
                        <form className='flex flex-col gap-5 container mx-auto'>
                            <div className="my-5">
                                <CategorySelection
                                    filterIn={"rentals"}
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
                                    {/* {ErrorMsg.category ? */}
                                    <ErrorMessage ErrorMsg={ErrorMsg.category}/>
                                    {/* :(
                                        ErrorMsg.subCategory?<ErrorMessage ErrorMsg={ErrorMsg.subCategory}/>:
                                        <ErrorMessage ErrorMsg={ErrorMsg.tags}/>
                                    )} */}
                            </div>
                            <section className="w-full ">
                                <h3 className="capitalize opacity-60">{t("attachments")}</h3>
                                <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                                <ErrorMessage ErrorMsg={ErrorMsg.attachments}/>
                            </section>
                            <section className='gap-8'>
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
                                    <ListInput name={'searchKeyword'} placeholder={t("Search keywords")} value={formData.searchKeywords} onChange={(value) => UpdateFormData('searchKeywords', value)} />
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
                                        value={formData.projectScale?.unit}
                                        onChange={handleInputChange}
                                        name="projectScale.unit"
                                        required
                                    >

                                        {['minutes', 'hours', 'days', 'weeks', 'months'].map((value, index) => (
                                            <option key={index} value={value}>{value}</option>
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
                                            <input type="number" min={0} name='projectScale.minimum' value={formData['projectScale.minimum'] || ""} onChange={handleInputChange} placeholder={`minimum ${formData['projectScale.unit'] || 'unit'}`} className={"inputStyle1"} />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <div className='flex items-center justify-start gap-4'>
                                            <input type="number" min={0} name='projectScale.maximum' value={formData['projectScale.maximum'] || ""} onChange={handleInputChange} placeholder={`maximum ${formData['projectScale.unit'] || 'unit'}`} className={"inputStyle1"} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ErrorMessage ErrorMsg={ErrorMsg.maximum}/>
                                    <ErrorMessage ErrorMsg={ErrorMsg.minimum}/>
                                </div >
                            </section>
                            <section className='flex justify-center gap-3 mt-10'>
                                <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} />
                                <p className='opacity-70'>{t("Show on home feed & profile")}</p>
                            </section>

                            <AppButton onClick={CheckNext} className="w-full mb-7 mt-4" shadow={true} shadowHeight={"14"}>
                                <span className='text-white font-bold capitalize text-lg'>{t("Next")}</span>
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
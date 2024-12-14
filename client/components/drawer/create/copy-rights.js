import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Button from '../../elements/button';
import { useRouter } from "next/router";
import ListInput from "../../elements/listInput";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import Switch from "../../elements/switcher";
import Drawer from "../../elements/drawer";
import CategorySelection from "./assets/CategorySelection";
import { filterByCycle } from "../../../util/util";
import { CreateCopyrights } from '../../../redux/action/apis/cycles/copywriter/create';
import GoogleMap from '../../elements/googleMap';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../elements/ErrorMessage';
import PopupErrorMessage from '../../elements/PopupErrorMessage';


const AddCopyrights = ({ CreateCopyrights, user, auth, respond, addprojectState, UpdateFormData, InsertToArray, categories, resetForm }) => {
    const { t } = useTranslation();

    const formData = addprojectState.formData;
    const router = useRouter();
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const [post_success, setPost_success] = useState(false);
    useEffect(() => {
        // if (categories.length)
        //     UpdateFormData('category', categories[0]._id)
        UpdateFormData('showOnHome', true)
    }, [])
    
    const handlelocationChange = (location) => {
        UpdateFormData('location.lat', location.lat)
        UpdateFormData('location.lng', location.lng)
    };
    const validateRequiredFields = () => {
        const errors = {};
        if (!formData.category) errors.category = 'Category is required';
        // if (!formData.subCategory) errors.subCategory = 'subCategory is required';
        // if (!formData.tags?.length) errors.tags = 'tags is required';
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.duration) errors.duration = 'Duration is required';
        if (!formData.address) errors.address = 'Address is required';
        if (!formData.searchKeywords || formData.searchKeywords.length === 0) errors.searchKeywords = 'At least one search keyword is required';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
        return errors;
    };

    const handleSubmit = (e) => {
        const durationValue = formData.duration
        e.preventDefault();
        setValidFormCheck(true)
        setErrorPopup(true)
        const timer = setTimeout(() => {
            setErrorPopup(false);
        }, 3000); // Hide after 3 seconds
        const validationErrors = validateRequiredFields();
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) {
            setErrorMsg(validateRequiredFields())
            return () => clearTimeout(timer);
        }
        formData.duration = {
            value : durationValue,
            unit: "days"
        }
        CreateCopyrights(formData);
    };
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
        setErrorPopup(false);
    },[formData])

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


    const toggleDrawer = () => {
        CreateCopyrights(-1);
        setPost_success(false)
        setErrorMsg({})
        resetForm()
        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }

    
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Drawer isOpen={true} name={t('copy right')} toggleDrawer={toggleDrawer}>
                <form className='flex flex-col gap-5 container mx-auto' onSubmit={handleSubmit}>
                    <section>
                        <div className="my-5">
                            <CategorySelection
                            filterIn={'copy-rights'}
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
                                {/* {ErrorMsg.category? */}
                                <ErrorMessage ErrorMsg={ErrorMsg.category}/>
                                {/* :(
                                    ErrorMsg.subCategory?<ErrorMessage ErrorMsg={ErrorMsg.subCategory}/>:
                                    <ErrorMessage ErrorMsg={ErrorMsg.tags}/>
                                )} */}

                        </div>
                        <div>
                            <input placeholder={t("price")} type="number" min={0} value={formData.price|| ""} onChange={handleInputChange} name="price" className={"inputStyle1"} />
                            <ErrorMessage ErrorMsg={ErrorMsg.price}/>
                        </div>
                        <input type="number" min={0} placeholder={t("duration Days")} value={formData.duration|| ""} onChange={handleInputChange} name="duration" className={"inputStyle1"} />
                        <ErrorMessage ErrorMsg={ErrorMsg.duration}/>
                        <ListInput name={'searchKeyword'} placeholder={t("Search keywords")} onChange={(keys) => UpdateFormData('searchKeywords', keys)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.searchKeywords}/>
                    </section>
                    <section className="h-96 relative overflow-hidden w-full">
                        <h3 className="capitalize opacity-60 mb-3">{t("Set location")}</h3>
                        <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)}  onChangeAddress={handleInputChange}/>
                    </section>
                    <section className='flex justify-center gap-3 mt-1'>
                        <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} id='showOnHome' />
                        <p className='opacity-70'>{t("Show on home feed & profile")}</p>
                    </section>
                    <div className='relative'>
                        <PopupErrorMessage errorPopup={errorPopup} ErrorMsg={Object.values(validateRequiredFields())[0]}/>
                        <Button onClick={handleSubmit} className="w-full mb-7 mt-4" shadow={true} shadowHeight={"14"}>
                            {respond?.loading ? 
                            <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />
                            :
                            <span className='text-white font-bold capitalize text-lg'>{t("Publish")}</span>
                            }
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
    respond: state.api.CreateCopyrights,
    addprojectState: state.addproject,
    categories: state.categories,
});

const mapDispatchToProps = {
    InsertToArray,
    UpdateFormData,
    resetForm,
    CreateCopyrights
};


export default connect(mapStateToProps, mapDispatchToProps)(AddCopyrights);


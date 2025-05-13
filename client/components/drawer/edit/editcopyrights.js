import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Button from '../../elements/button';
import { useRouter } from "next/router";
import ListInput from "../../elements/listInput";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import Switch from "../../elements/switcher";
import Drawer from "../../elements/drawer";
import CategorySelection from "../create/assets/CategorySelection";
import { filterByCycle } from "../../../util/util";
import { CreateCopyrights } from '../../../redux/action/apis/cycles/copywriter/create';
import GoogleMap from '../../elements/googleMap';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../elements/ErrorMessage';
import { UpdateCopyrights } from '../../../redux/action/apis/cycles/copywriter/edit';
import { GetCopyrights } from '../../../redux/action/apis/cycles/copywriter/get';


const EditCopyrights = ({ GetCopyrights  ,UpdateCopyrights ,InsertToArray, QueryString, respond, data,isOpen, auth,id, update_respond,setIsOpenEdit, UpdateFormData, addprojectState, categories, resetForm }) => {
    const { t } = useTranslation();
    const formData = addprojectState.formData;
    const router = useRouter();
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const [post_success, setPost_success] = useState(false);
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

    useEffect(() => {
        // if (categories.length)
        //     UpdateFormData('category', categories[0]._id)
        UpdateFormData('showOnHome', true)
    }, [])
    
    const handlelocationChange = (location) => {
        UpdateFormData('location.lat', location.lat)
        UpdateFormData('location.lng', location.lng)
    };
    const convertToFormData = () => {
        const UpdatedData ={

        }
        const durationValue = formData.duration
        if(formData.duration && (data.duration.value!==formData.duration)){
            formData.duration = {
                value : durationValue,
                unit: "days"
            }    
            UpdatedData.duration=formData.duration
        }
        if(formData.price && (data.price!==formData.price))
            UpdatedData.price=formData.price
        if(formData.address && (data.address!==formData.address))
            UpdatedData.address=formData.address
        if(formData.category && (data.category._id!==formData.category))
            UpdatedData.category=formData.category
        if(formData.subCategory && (data.subCategory?._id!==formData.subCategory))
            UpdatedData.subCategoryId=formData.subCategory
        if (formData.tags && !AreObjectsEqual(formData.tags, data.tags))
            UpdatedData.tags = formData.tags
        if (formData.searchKeyWords && !AreObjectsEqual(formData.searchKeyWords, data.searchKeyWords))
            UpdatedData.searchKeywords =formData.searchKeyWords
        if (formData.location && (data.location.lat!==formData.location.lat) && (data.location.lng!==formData.location.lng)) {
            UpdatedData.location={
                lat:formData.location.lat,
                lng:formData.location.lng
            }   
        };
        return UpdatedData;
    }

    const validateRequiredFields = () => {
        const errors = {};
        if (!formData.category) errors.category = 'Category is required';
        // if (!formData.subCategory) errors.subCategory = 'subCategory is required';
        // if (!formData.tags?.length) errors.tags = 'tags is required';
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.duration) errors.duration = 'Duration is required';
        if (!formData.address) errors.address = 'Address is required';
        // if (!formData.searchKeywords || formData.searchKeywords.length === 0) errors.searchKeywords = 'At least one search keyword is required';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidFormCheck(true)
        const validationErrors = validateRequiredFields();
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) return setErrorMsg(validateRequiredFields())
        UpdateCopyrights(data._id , convertToFormData()).then(async()=>{
            setPost_success(true)
        });
    };
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

    const closeDrawer = () => {        
        setPost_success(false)
        setIsOpenEdit(false)
        GetCopyrights(QueryString)
    }

    const toggleDrawer = () => {
        setPost_success(false)
        setIsOpenEdit(false)
    }

    useEffect(() => {
        if(isOpen){

            UpdateFormData("price", data.price)
            UpdateFormData("subCategory", data.subCategory._id)
            UpdateFormData("tags", data.tags.map(item=>item._id))
            UpdateFormData("duration", data.duration?.value)
            UpdateFormData("category", data?.category?._id)
            UpdateFormData("address", data.address)
            UpdateFormData('location', {
                lat:data.location.lat,
                lng:data.location.lng
            })
            UpdateFormData("searchKeywords", data.searchKeywords)
        }
    }, [data , isOpen])
    
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={closeDrawer} message="Updated" />

            <Drawer isOpen={isOpen} name={t('edit copy right')} toggleDrawer={toggleDrawer}>
                <form className='flex flex-col gap-5 container mx-auto' onSubmit={handleSubmit}>
                {data.canEdit && 
                <>  
                    <section>
                        <div className="my-5">
                                <CategorySelection
                                    filterIn={'copy-rights'}
                                    isRemove={true}
                                    value={{
                                        'category':formData.category|| data?.category._id ,
                                        'subCategory': formData.subCategory || data.subCategory._id ,
                                        'tags': formData.tags || data.tags.map(item => item._id),
                                    }}
                                    onChange={(value) => {
                                        UpdateFormData('category', value.category)
                                        UpdateFormData('subCategory', value.subCategory)
                                        UpdateFormData('tags', value.tags)
                                    }}
                                />

                                {/* {ErrorMsg.category? */}
                                <ErrorMessage ErrorMsg={ErrorMsg.category}/>
                                {/* :(
                                    ErrorMsg.subCategory?<ErrorMessage ErrorMsg={ErrorMsg.subCategory}/>:
                                    <ErrorMessage ErrorMsg={ErrorMsg.tags}/>
                                )} */}

                        </div>
                        <div>
                            <input placeholder={t("price")} type="number" min={0} value={formData.price|| (formData.price!=="" ? data.price:formData.price)} onChange={handleInputChange} name="price" className={"inputStyle1"} />
                            <ErrorMessage ErrorMsg={ErrorMsg.price}/>
                        </div>
                        <input type="number" min={0} placeholder={t("duration Days")} value={formData.duration|| (formData.duration!=="" ? data.duration.value:formData.duration)} onChange={handleInputChange} name="duration" className={"inputStyle1"} />
                        <ErrorMessage ErrorMsg={ErrorMsg.duration}/>

                        <ListInput name={'searchKeyword'} placeholder={t("Search keywords")} value={formData.searchKeywords } onChange={(value) => UpdateFormData('searchKeywords', value)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.searchKeywords}/>
                    </section>
                    <section className="h-96 relative overflow-hidden w-full">
                        <h3 className="capitalize opacity-60 mb-3">{t("Set location")}</h3>
                        <GoogleMap width={'100%'} value={{ 'lat': formData.location?.lat, 'lng': formData.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)}  onChangeAddress={handleInputChange}/>
                    </section>
                    </>
                    }
                    <section className='flex justify-center gap-3 mt-1'>
                        <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} id='showOnHome' />
                        <p className='opacity-70'>{t("Show on home feed & profile")}</p>
                    </section>
                    <Button onClick={handleSubmit} className="w-full mb-7 mt-4" shadow={true} shadowHeight={"14"}>
                        {respond?.loading ? 
                         <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />
                        :
                        <span className='text-white font-bold capitalize text-lg'>{t("Publish")}</span>
                        }
                    </Button>
                </form>
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    respond: state.api.UpdateCopyrights,
    addprojectState: state.addproject,
    categories: state.categories,
});

const mapDispatchToProps = {
    InsertToArray,
    UpdateFormData,
    resetForm,
    UpdateCopyrights,
    GetCopyrights
};


export default connect(mapStateToProps, mapDispatchToProps)(EditCopyrights);


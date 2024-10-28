import AppButton from '../elements/button';
import Comment from '../elements/comment';
import Controller from '../elements/controllers';
import Icon from '../Icons';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { updateProfile } from "../../redux/action/apis/auth/profile/updateprofile";
import { OpenPopUp, errorConvertedMessage, gettFileURL, gettFileUploaded, handleFileUpload, handleRemoveEvent, parseFileSize, } from '../../util/util';
import { UpdateFormData, resetForm } from '../../redux/action/logic/forms/Addproject';
import Drawer from '../elements/drawer';
import ErrorPopUp from '../popsup/errorPopUp';
import { useTranslation } from 'react-i18next';

import GoogleMap from '../elements/googleMap';
import CategorySelectOne from '../elements/CategorySelectOne';
import CategoryMultiSelection from '../elements/CategoryMultiSelection';
import { useRouter } from 'next/router';



function EditDrawer({ user, updateProfile, isOpen, onClose, UpdateFormData, resetForm, formData, updateProfile_respond }) {

    if (!user) return <></>
    const { t } = useTranslation();

    const [userInfo, setUserInfo] = useState(user);
    const [error, setError] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [cover, setCover] = useState(null);
    const router = useRouter();
    // "isAvaliableToInstantProjects": user.isAvaliableToInstantProjects || false,
    useEffect(() => {
        if (isOpen) {
            UpdateFormData("profileImage", userInfo?.profileImage);
            UpdateFormData("coverImage", userInfo?.coverImage);
            UpdateFormData("name", userInfo?.name);
            UpdateFormData('categories', userInfo?.categories?.map(item=> item._id))
            UpdateFormData("address", userInfo?.address);
            UpdateFormData("pricePerHour", userInfo?.pricePerHour);
            UpdateFormData("about", userInfo?.about);
            UpdateFormData("location[lat]", userInfo?.location?.lat);
            UpdateFormData("location[lng]", userInfo?.location?.lang || userInfo?.location?.lng);
        }
        else {
            resetForm()
            setProfileImage(null)
            setCover(null)
        }
    }, [isOpen, userInfo])

    useEffect(() => {
        setUserInfo(user)
    }, [user])

    useEffect(() => {
        if (updateProfile_respond) {
            setUserInfo(updateProfile_respond.data)
        }
    }, [updateProfile_respond])

    
    const converting = () => {

        const data = new FormData();
        const avoidFeilds = [
            'profileImage',
            'coverImage',
            'username',
            'isVerified',
            'acceptedProjectsCounter',
            'profileViews',
            'isOnline',
            'categories',
            'avaliableContracts'
        ]
        Object.keys(formData).forEach(key => {
            // Append each key-value pair to the FormData instance
            if (avoidFeilds.includes(key)) return
            if (formData[key] !== user[key] && formData[key]) {
                data.append(key, formData[key]);
            }
        });

        if (cover)
            data.append('coverImage', cover)
        if (profileImage)
            data.append('profileImage', profileImage)
        
        formData?.categories?.forEach((category, index) => {
            const categoryKey = `categories[${index}]`;
            data.append(categoryKey, category?._id || category);
        });
            // data.append('category', formData?.category?._id || formData?.category)
        return data;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)

    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile(converting()).then(()=>{
            router.push({ pathname: "/creative/" + user.username });
        })
        
    };


    const profileUpload = (e) => {
        const image = handleFileUpload(e)
        if (parseFileSize(image.formattedFileSize) <= parseFileSize("3 MB"))
            setProfileImage(image.file ?? null)
        else {
            setError(errorConvertedMessage(`<div class="error-msg" >{t("Sorry, the image you're trying to upload exceeds the maximum file size limit of 3 MB. Please choose a smaller image and try again.")}</div>`))
            OpenPopUp("image_size_error")
        }
    };
    const coverUpload = (e) => {
        const image = handleFileUpload(e)
        if (parseFileSize(image.formattedFileSize) <= parseFileSize("3 MB"))
            setCover(image.file ?? null)
        else {
            setError(errorConvertedMessage(`<div class="error-msg" >{t("Sorry, the image you're trying to upload exceeds the maximum file size limit of 3 MB. Please choose a smaller image and try again.")}</div>`))
            OpenPopUp("image_size_error")
        }
    };


    const reset = () => {
        setError(false);
        // resetForm()
    };

    const close = () => {
        reset()
        onClose()
    };

    return (
        <>
            <ErrorPopUp id="image_size_error" errorMsg={error} />
            <Drawer name={t('Edit Details')} addWhiteShadow={true} isOpen={isOpen} toggleDrawer={close}>
                <div className='relative'>
                    <label htmlFor="cover-file-upload" >
                        <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center  border-[#0000001A]" >
                            <Icon className='text-white' name={'pen'} />
                        </Controller>
                    </label>
                    <input onClick={handleRemoveEvent} onChange={coverUpload} className='hidden' id="cover-file-upload" type="file" accept="image/*" />

                    <img className='card w-full h-52 mt-5 object-cover bg-bottom bg-gray-300 dark:bg-[#ffffff20]' src={gettFileURL(cover) || formData.coverImage} alt="" />

                    <div className='absolute bottom-0 edit size-28 transform translate-y-1/2 rtl:-translate-x-1/2 ltr:translate-x-1/2'>
                        <img className='rounded-full w-full h-full object-cover object-top bg-gray-300 dark:bg-[#ffffff20]' src={gettFileURL(profileImage) || formData.profileImage} alt="" />

                        <label htmlFor="profile-file-upload" >
                            <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center border-[#0000001A]" >
                                <Icon className='text-white' name={'pen'} />
                            </Controller>
                        </label>
                        <input onClick={handleRemoveEvent} onChange={profileUpload} className='hidden' id="profile-file-upload" type="file" accept="image/*" />
                    </div>
                </div>
                <form className='pb-0 flex flex-col items-center py-20' onSubmit={handleSubmit}>
                    <div className='mb-4 w-full'>
                    <span className='text-base font-medium opacity-50 leading-10 capitalize'>{t("services")}</span>
                    <CategoryMultiSelection value={formData?.categories?.length>0?[...formData?.categories]:[]} onChange={(v) => { UpdateFormData('categories', v) }} />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>{t("name")}</span>
                        <input
                            type='text'
                            name='name'
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div>
                    {/* <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>{t("address")}</span>
                        <input
                            type='text'
                            name='address'
                            value={formData.address|| ""}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div> */}
                    <div className='mb-4 w-full hidden'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>{t("price per hour")}</span>
                        <input
                            type='text'
                            name='pricePerHour'
                            value={formData.pricePerHour || ""}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>{t("about")}</span>
                        <textarea
                            name='about'
                            value={formData.about || ""}
                            onChange={handleInputChange}
                            className="edit app-field h-[400px]"
                            style={{ height: '120px' }}
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <section className="h-96 relative overflow-hidden">
                            <span>{t("Set location")}</span>
                            <GoogleMap
                                width={'100%'}
                                setDefult={false}
                                value={{ 'lat': formData['location[lat]'] , 'lng': formData['location[lng]']  }}
                                // value={{ 'lat': formData['location[lat]'], 'lng': formData['location[lng]'] }}
                                onChangeAddress={handleInputChange}
                                onsetLocation={(value) => { 
                                    UpdateFormData('location[lat]', value.lat);
                                     UpdateFormData('location[lng]', value.lng) }}
                                inputclass="edit app-field"
                            />
                        </section>
                    </div>
                    <button className='w-full flex justify-center mt-12 max-w-96' type="submit">
                        <AppButton className='sticky bottom-10 w-full z-10' shadow={true}>{updateProfile_respond?.loading?<div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />:t("Done")}</AppButton>
                    </button>

                </form>

                {
                    error &&
                    <p className="error-msg mt-10" >{error}</p>
                }
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isDark: state.setting.ISDARK,
    getheaderpopup: state.setting.headerpopup,
    updateProfile_respond: state.api.updateProfile,
    formData: state.addproject.formData,
});

const mapDispatchToProps = {
    updateProfile,
    UpdateFormData,
    resetForm
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDrawer);

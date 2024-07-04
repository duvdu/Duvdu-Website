import AppButton from '../elements/button';
import Comment from '../elements/comment';
import Controller from '../elements/controllers';
import Icon from '../Icons';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { updateProfile } from "../../redux/action/apis/auth/profile/updateprofile";
import { OpenPopUp, errorConvertedMessage, gettFileURL, gettFileUploaded, handleFileUpload, handleRemoveEvent, parseFileSize } from '../../util/util';
import { UpdateFormData, resetForm } from '../../redux/action/logic/forms/Addproject';
import Drawer from '../elements/drawer';
import ErrorPopUp from '../popsup/errorPopUp';
import GoogleMap from '../elements/googleMap';
import CategorySelectOne from '../elements/CategorySelectOne';
import { useRouter } from 'next/router';



function EditDrawer({ user, updateProfile, isOpen, onClose, UpdateFormData, resetForm, formData }) {

    if (!user) return <></>

    const [error, setError] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [cover, setCover] = useState(null);
    const router = useRouter();
    // "isAvaliableToInstantProjects": user.isAvaliableToInstantProjects || false,
    useEffect(() => {
        if (isOpen) {
            UpdateFormData("profileImage", user.profileImage);
            UpdateFormData("coverImage", user.coverImage);
            UpdateFormData("name", user.name);
            UpdateFormData('category', user.category)
            UpdateFormData("address", user.address);
            UpdateFormData("pricePerHour", user.pricePerHour);
            UpdateFormData("about", user.about);
            UpdateFormData("location[lat]", user.location?.lat);
            UpdateFormData("location[lng]", user.location?.lng);
        }
        else {
            resetForm()
            setProfileImage(null)
            setCover(null)
        }
    }, [isOpen])


    function UpdateKeysAndValues(obj, prefix = '') {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const prefixedKey = `${prefix}${prefix ? '.' : ''}${key}`;
            if (value && typeof value === 'object' && !Array.isArray(value) && value !== null) {
                UpdateKeysAndValues(value, prefixedKey);
            } else {
                UpdateFormData(prefixedKey, value)
            }
        });

    }
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
        return data;
    }
console.log(formData)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)

    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile(converting())
        router.push({pathname: "/creative/"+user.username});
    };


    const profileUpload = (e) => {
        const image = handleFileUpload(e)
        if (parseFileSize(image.formattedFileSize) <= parseFileSize("3 MB"))
            setProfileImage(image.file ?? null)
        else {
            setError(errorConvertedMessage(`<div class="error-msg" >Sorry, the image you're trying to upload exceeds the maximum file size limit of 3 MB. Please choose a smaller image and try again.</div>`))
            OpenPopUp("image_size_error")
        }
    };
    const coverUpload = (e) => {
        const image = handleFileUpload(e)
        if (parseFileSize(image.formattedFileSize) <= parseFileSize("3 MB"))
            setCover(image.file ?? null)
        else {
            setError(errorConvertedMessage(`<div class="error-msg" >Sorry, the image you're trying to upload exceeds the maximum file size limit of 3 MB. Please choose a smaller image and try again.</div>`))
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
            <Drawer name={'Edit Details'} addWhiteShadow={true} isOpen={isOpen} toggleDrawer={close}>
                <div className='relative'>
                    <label htmlFor="cover-file-upload" >
                        <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center  border-[#0000001A]" >
                            <Icon className='text-white' name={'pen'} />
                        </Controller>
                    </label>
                    <input onClick={handleRemoveEvent} onChange={coverUpload} className='hidden' id="cover-file-upload" type="file" accept="image/*" />

                    <img className='card w-full h-52 mt-5 object-cover bg-bottom' src={gettFileURL(cover) || formData.coverImage} alt="cover pic" />

                    <div className='absolute bottom-0 edit size-28 transform translate-y-1/2 translate-x-1/2'>
                        <img className='rounded-full w-full h-full object-cover object-top' src={gettFileURL(profileImage) || formData.profileImage} alt="profile picture" />

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
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            services
                        </span>
                        <CategorySelectOne value={formData.category} onChange={(v) => { UpdateFormData('category', v) }} />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            name
                        </span>
                        <input
                            type='text'
                            name='name'
                            value={formData.name|| ""}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div>
                    {/* <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            address
                        </span>
                        <input
                            type='text'
                            name='address'
                            value={formData.address|| ""}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div> */}
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            price per hour
                        </span>
                        <input
                            type='text'
                            name='pricePerHour'
                            value={formData.pricePerHour|| ""}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            about
                        </span>
                        <textarea
                            name='about'
                            value={formData.about|| ""}
                            onChange={handleInputChange}
                            className="edit app-field h-[400px]"
                            style={{ height: '120px' }}
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <section className="h-96 relative overflow-hidden">
                            <span> Set location </span>
                            <GoogleMap width={'100%'} setDefult={false} value={{ 'lat': formData['location[lat]'], 'lng': formData['location[lng]'] }}  onChangeAddress={handleInputChange} onsetLocation={(value) => {UpdateFormData('location[lat]', value.lat) ; UpdateFormData('location[lng]', value.lng)} } />
                        </section>
                    </div>
                    <button className='w-full flex justify-center' type="submit">

                        <AppButton className='sticky bottom-10 w-full max-w-96 mt-12 z-10' shadow={true}>
                            Done
                        </AppButton>
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
    formData: state.addproject.formData,
});

const mapDispatchToProps = {
    updateProfile,
    UpdateFormData,
    resetForm
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDrawer);

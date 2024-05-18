import AppButton from '../elements/button';
import Comment from '../elements/comment';
import Controller from '../elements/controllers';
import Icon from '../Icons';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { updateProfile } from "../../redux/action/apis/auth/profile/updateprofile";
import { gettFileUploaded, handleFileUpload } from '../../util/util';
import { UpdateFormData, resetForm } from '../../redux/action/logic/forms/Addproject';
import Drawer from '../elements/drawer';



function EditDrawer({ user, updateProfile, respond, isOpen, onClose, UpdateFormData, resetForm, formData }) {

    if (!user) return <></>

    const [error, setError] = useState(false);
    // "isAvaliableToInstantProjects": user.isAvaliableToInstantProjects || false,
    useEffect(() => {
        if (isOpen)
            UpdateKeysAndValues(user)
    }, [isOpen])

    if (respond && isOpen)
        window.location.reload()
    
useEffect(()=>{
    UpdateFormData("location.lat",30)
    UpdateFormData("location.lng",30)
},[])

    function UpdateKeysAndValues(obj, prefix = '') {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const prefixedKey = `${prefix}${prefix ? '.' : ''}${key}`;
            if (value && typeof value === 'object' && !Array.isArray(value) && value !== null) {
                UpdateKeysAndValues(value, prefixedKey);
            } else {
                if (prefixedKey == 'profileImage')
                    {
                        UpdateFormData("_profileImage", value)
                        UpdateFormData("profileImage", value)
                    }
                    if (prefixedKey == 'coverImage')
                    {
                        UpdateFormData("_coverImage", value)
                        UpdateFormData("_coverImage", value)
                    }

                UpdateFormData(prefixedKey, value)
            }
        });

    }
    const converting = () => {
        const data = new FormData();
        const avoidFeilds = [
            '_profileImage',
            '_coverImage',
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
            data.append(key, formData[key]);
        });

        return data;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)

    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile(converting())
    };
 

    const profileUpload = (e) => {
        UpdateFormData('_profileImage', gettFileUploaded(e))
        UpdateFormData('profileImage', handleFileUpload(e).file)
    };
    const coverUpload = (e) => {
        UpdateFormData('_coverImage', gettFileUploaded(e))
        UpdateFormData('coverImage', handleFileUpload(e).file)
    };


    const reset = () => {
        setError(false);
        resetForm()
    };

    const close = () => {
        reset()
        onClose()
    };

    return (
        <>
            <Drawer name={'Edit Details'} addWhiteShadow={true} isOpen={isOpen} toggleDrawer={close}>
                <div className='relative'>
                    <label htmlFor="cover-file-upload" >
                        <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center  border-[#0000001A]" >
                            <Icon className='text-white' name={'pen'} />
                        </Controller>
                    </label>
                    <input onChange={coverUpload} className='hidden' id="cover-file-upload" type="file" />

                    <img className='card w-full h-52 mt-5 object-cover bg-bottom' src={formData._coverImage || process.env.DEFULT_COVER_PATH} alt="cover pic" />

                    <div className='absolute bottom-0 edit size-28 transform translate-y-1/2 translate-x-1/2'>
                        <img className='rounded-full w-full h-full' src={"https://duvdu-s3.s3.eu-central-1.amazonaws.com/"+formData._profileImage || process.env.DEFULT_PROFILE_PATH} alt="profile picture" />

                        <label htmlFor="profile-file-upload" >
                            <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center border-[#0000001A]" >
                                <Icon className='text-white' name={'pen'} />
                            </Controller>
                        </label>
                        <input onChange={profileUpload} className='hidden' id="profile-file-upload" type="file" />
                    </div>
                </div>

                <form className='pb-0 flex flex-col items-center py-20' onSubmit={handleSubmit}>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            name
                        </span>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            services
                        </span>
                        <input
                            type='text w-full'
                            name='service'
                            value={formData.service}
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                        address
                        </span>
                        <input
                            type='text'
                            name='address'
                            value={formData.address }
                            onChange={handleInputChange}
                            className="edit app-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            price per hour
                        </span>
                        <input
                            type='text'
                            name='pricePerHour'
                            value={formData.pricePerHour}
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
                            value={formData.about}
                            onChange={handleInputChange}
                            className="edit app-field h-[400px]"
                            style={{ height: '120px' }}
                        />
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
    respond: state.api.updateProfile,
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

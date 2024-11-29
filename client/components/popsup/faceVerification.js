
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import Icon from '../Icons';
import { handleFileUpload, gettFileUploaded, handleRemoveEvent, } from '../../util/util';
import { useTranslation } from 'react-i18next';
import Loading from '../elements/loading';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { resetForm, UpdateFormData } from '../../redux/action/logic/forms/Addproject';
import { ClosePopUp, UpdateKeysAndValues } from '../../util/util';
import { faceVerification } from './../../redux/action/apis/auth/faceVerification/faceVerification';
import VerificationMessage from './verificationMessage';

function FaceVerification({ faceVerification , face_verification_response , user}) {
    const { t } = useTranslation();
    const [post_success, setPost_success] = useState(false);
    const [showPopup, setShowPopup] = useState(true);

    const [file, setFile] = useState(null);
    const [prev, setPrev] = useState(null);

    const profileUpload = (e) => {
        const file = handleFileUpload(e)?.file;
        const fileUrl = gettFileUploaded(e);

        setFile(file);
        setPrev(fileUrl);
    };
    const renderMediaPreview = () => {
        if (!prev) return null;
        return <div className='card w-full h-96 mt-5 bg-bottom' >
            <img src={prev} alt="" className='w-full h-full rounded-xl'/>
        </div>;
    };
    function onsubmit() {

        const form = new FormData()

        if(file)
            form.append('faceRecognition' , file)    
        faceVerification({ data: form })
    }
    useEffect(() => {
        if (face_verification_response?.message || face_verification_response?.error){
            setShowPopup(false)
            setPost_success(true)
        }
    }, [face_verification_response?.message , face_verification_response?.error])
    
    function OnSucess() {
        setPost_success(false)
        setShowPopup(false)
        setFile(null)
        setPrev(null)
    }
    var convertError = JSON.parse(face_verification_response?.error ?? null)
    function onTryAgain(){
        setShowPopup(true)
        setPost_success(false)
    }

    return (
        <>
            <Popup id='face-verification' onCancel={OnSucess} className={`w-full lg:w-[942px]`}>
                <section className='mt-9'>
                    <span className='font-semibold text-2xl capitalize'>{t("Face Verification Required")}</span>
                    <br />
                    <span className='font-medium text-lg'>{t("To proceed, we need to verify your identity. Please upload a clear image of your face.")}</span>
                    <div className='bg-white dark:bg-[#1A2024] border-dashed border-4 border-[#CBD0DC] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 p-4'>
                        <div className='rounded-full p-4 bg-[#F5F5F5]'>
                            <Icon className='w-10' name={"add-file2"} />
                        </div>
                        <span className="font-medium text-2xl">{t("Choose a file or drag & drop it here")}</span>
                        <span className="text-[#A9ACB4] font-medium text-xl">{t("JPEG, PNG, PDG, and MP4 formats, up to 50MB")}</span>
                        {renderMediaPreview()}
                        <div className='relative  my-4 px-8 py-4'>
                            <label htmlFor="file-upload" className='text-[#54575C] rounded-2xl border-2 border-[#CBD0DC] text-2xl font-semibold px-4 py-2'>{t(`${prev ? 'Change' : 'Browse'} File`)}</label>
                            <input onClick={handleRemoveEvent} id="file-upload" type="file" className="opacity-0 absolute inset-0 " onChange={profileUpload} accept={'image/*'} />
                        </div>

                    </div>
                </section>
                <div className='flex justify-center w-full '>
                    <AppButton onClick={onsubmit} className={'mt-9 mb-3 w-full'} color={"#5666F7"}>{face_verification_response?.loading?<Loading/>:t("Upload Face Image")}</AppButton>
                </div>
            </Popup>
            <VerificationMessage onTryAgain={onTryAgain} isShow={post_success} isError={face_verification_response?.error} errorMessage={convertError?.errors[0]?.message} onCancel={OnSucess} message="Verification" />
        </>
    );
}
const mapStateToProps = (state) => ({
    face_verification_response: state.api.faceVerification,
    formData: state.addproject.formData,
});

const mapDispatchToProps = {
    UpdateFormData,
    faceVerification,
    resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(FaceVerification);

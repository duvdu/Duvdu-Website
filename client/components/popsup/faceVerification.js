import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from 'react-redux';
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import Icon from '../Icons';
import { useTranslation } from 'react-i18next';
import Loading from '../elements/loading';
import { resetForm, UpdateFormData } from '../../redux/action/logic/forms/Addproject';
import { faceVerification } from './../../redux/action/apis/auth/faceVerification/faceVerification';
import VerificationMessage from './verificationMessage';
import Webcam from 'react-webcam';

function FaceVerification({ faceVerification , face_verification_response }) {
    const { t } = useTranslation();
    const [post_success, setPost_success] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [file, setFile] = useState(null);
    const [prev, setPrev] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State to track visibility

    const webcamRef = useRef(null);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPrev(imageSrc);
        
        // Convert base64 to file
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "face-verification.jpg", { type: "image/jpeg" });
                setFile(file);
            });
    }, [webcamRef]);

    function onsubmit() {
        const form = new FormData();
        if (file) {
            form.append('faceRecognition', file);
        }
        faceVerification({ data: form });
    }

    useEffect(() => {
        if (face_verification_response?.message || face_verification_response?.error) {
            setShowPopup(false);
            setPost_success(true);
        }
    }, [face_verification_response?.message, face_verification_response?.error]);

    function OnSucess() {
        setPost_success(false);
        setShowPopup(false);
        setFile(null);
        setPrev(null);
    }

    function onTryAgain() {
        setShowPopup(true);
        setPost_success(false);
        setFile(null);
        setPrev(null);
    }

    // Use MutationObserver to track class changes on #face-verification
    useEffect(() => {
        const target = document.getElementById('face-verification');
        if (!target) return;

        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.attributeName === 'class') {
                    const isVisible = target.classList.contains('show');
                    setIsPopupVisible(isVisible);
                }
            }
        });

        observer.observe(target, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Popup id='face-verification' onCancel={OnSucess} className={`w-full lg:w-[942px]`}>
                <section className='mt-9'>
                    <span className='font-semibold text-2xl capitalize'>{t("Face Verification Required")}</span>
                    <br />
                    <span className='font-medium text-lg'>{t("To proceed, we need to verify your identity. Please upload a clear image of your face.")}</span>
                    <div className='bg-white dark:bg-[#1A2024] border-dashed border-4 border-[#CBD0DC] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 p-4'>
                        {isPopupVisible && !prev ? (
                            <>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    className='w-full h-96 rounded-xl'
                                />
                                <button 
                                    onClick={capture} 
                                    className='mt-4 text-white bg-primary p-2 rounded-xl'
                                >
                                    <Icon className='w-5 h-5' name="camera" />
                                </button>
                            </>
                        ) : (
                            <>
                                <div className='card w-full h-96 bg-bottom'>
                                    <img src={prev} alt="" className='w-full h-full rounded-xl'/>
                                </div>
                                <button 
                                    onClick={() => {
                                        setFile(null);
                                        setPrev(null);
                                    }} 
                                    className='mt-4 text-white bg-primary p-2 rounded-xl'
                                >
                                    <Icon className='w-5 h-5' name="rotate-right" />
                                </button>
                            </>
                        )}
                    </div>
                </section>
                <div className='flex justify-center w-full'>
                    <AppButton 
                        onClick={onsubmit} 
                        className={'mt-9 mb-3 w-full'} 
                        color={"#5666F7"}
                        disabled={!file}
                    >
                        {face_verification_response?.loading ? 
                            <Loading /> : 
                            t("Upload Face Image")
                        }
                    </AppButton>
                </div>
            </Popup>
            <VerificationMessage onTryAgain={onTryAgain} isShow={post_success} isError={face_verification_response?.error} onCancel={OnSucess} message="Verification" />
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

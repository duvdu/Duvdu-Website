
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from "../Icons";
import { connect } from "react-redux";
import { OpenPopUp } from "../../util/util";

function FaceVerification({CloseProfile , isLogin , user }) {
    const { t } = useTranslation();
    const handleOpen=()=>{
        if(CloseProfile)
            CloseProfile()
        OpenPopUp("face-verification")
    }
    return (isLogin && !user?.faceRecognition &&
        <>
        <div className="p-3 bg-white dark:bg-[#1A2024] rounded-[15px]">
            <button data-popup-toggle="popup" data-popup-target={'face-verification'} onClick={handleOpen} className="flex !text-start !items-start gap-3">
                <div className='bg-[#FFE7E7] rounded-md h-14 min-w-14 flex items-center justify-center'>
                    <Icon className='w-[18px]' name="exclamation" />
                </div>
                <div className="flex flex-col w-full ">
                    <p className="font-semibold"> {t('Face Verification Required')}</p>
                    <p className="text-[#808080] text-sm leading-4">{t('To accept contracts, we need to verify your identity.')}</p>

                </div>
            </button>
        </div>
        </>
    );
}
const mapStateToProps = (state) => ({
    isLogin: state.auth.login,
    user: state.user.profile,
});


export default connect(mapStateToProps)(FaceVerification);


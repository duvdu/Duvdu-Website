import Popup from '../elements/popup';
import AppButton from '../elements/button';
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { resendCode } from '../../redux/action/apis/auth/OTP/resend';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

function Verify({ auth, showpopup, resendCode }) {
    const { t } = useTranslation();

    const router = useRouter();

    const [shouldShowVerify, setShouldShowVerify] = useState("");

    useEffect(() => {
        const noPopupPath = `/register/${auth.username}`;

        if (location.pathname !== noPopupPath) {
            const timer = setTimeout(() => {
                setShouldShowVerify((auth.username && auth.isVerify === false) ? "show" : "");
            }, 10000);

            return () => clearTimeout(timer);
        } else {
            setShouldShowVerify("");
        }
    }, [auth.username, auth.isVerify]);
    const handleverifyClick = () => {
        resendCode({ username: auth.username })
        router.push(`/register/${auth.username}`);
    }
    return (
        <>
            <Popup id='verify-account-now' className={shouldShowVerify} header={'Verify Account Now'}>
                <div className='flex h-full flex-col mt-24 items-center mb-20 max-w-[604px]'>
                    <span className='mb-12 text-center text-xl font-semibold'>
                        Your account hasn't been verified.
                        <br />{t("Please verify your account now.")}</span>
                    <div className="max-w-96 w-full" onClick={handleverifyClick}>
                        <AppButton>{t("Verify")}</AppButton>
                    </div>
                </div>
            </Popup>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = {
    resendCode
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);

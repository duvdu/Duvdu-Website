import Auth from '../components/layout/Auth';
import React, { useEffect, useState } from 'react';
import Button from '../components/elements/button';
import Icon from '../components/Icons';
import OTP from '../components/elements/otp';
import { errorConvertedMessage } from '../util/util';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { forgetpassword } from "../redux/action/apis/auth/forgetpassword/forgetpassword";

function ForgetPassword({ api, forgetpassword , respond_forgetpassword }) {
    const { t } = useTranslation();
    const [username, setUsername] = useState(null);
    const router = useRouter();
    const { query } = router;

    // Determine which component to render based on the "page" query parameter
    const getPageComponent = () => {
        switch (query.page) {
            case 'OTP':
                return <OTP onSuccess={() => handleNextStep('ResetPassword')} username={username} />;
            case 'ResetPassword':
                return <ResetPassword />;
            case 'PasswordChanged':
                return <PasswordChanged />;
            default:
                return <EnterYourUserName />;
        }
    };

    // Handle next step navigation
    const handleNextStep = (nextPage) => {
        router.replace({
            pathname: router.pathname,
            query: { page: nextPage },
        });
    };
    useEffect(() => {
        if (respond_forgetpassword?.message==='success')
            handleNextStep('OTP');
    }, [respond_forgetpassword?.message])

    const EnterYourUserName = () => {
        const [userName, setUserName] = useState('');
        const [nameError, setNameError] = useState({ isError: false, message: '' });

        if (respond_forgetpassword?.error && !nameError.isError) {
            const errorMessage = errorConvertedMessage(respond_forgetpassword?.error)
            setNameError({ isError: true, message: errorMessage });
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            if (userName.length < 1) {
                setNameError({ isError: true, message: 'Enter your username' });
            } else {
                setNameError({ isError: false, message: '' });
                // You can add your own logic here to handle the username submission
                forgetpassword({login:userName})
                setUsername(userName);
            }
        };

        const handleChange = (value) => {
            setUserName(value);
        };

        return (
            <form method="post" onSubmit={handleSubmit}>
                <div className="heading_s1 mb-8">
                    <h1 className="auth-title text-center">{t("Enter your username")}</h1>
                </div>
                <div className={` ${nameError.isError || respond_forgetpassword?.error ? 'error':'mb-8'}`}>
                    <input
                        type="text"
                        placeholder={t("@username")}
                        className={nameError.isError ? "app-field error" : "app-field"}
                        value={userName || ""}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                {nameError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(nameError.message) }} />}
                </div>
                <div className="h-10" />
                <button className="w-full" type="submit">
                  <Button name="reset-password" shadow={true} className="w-full ">{respond_forgetpassword?.loading ?<div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />:t("Next")}</Button>

                </button>
            </form>
        );
    };

    const ResetPassword = () => {
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
        const [confirmPasswordError, setConfirmPasswordError] = useState({ isError: false, message: '' });
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);

        const handleSubmit = (e) => {
            e.preventDefault();

            if (password.length < 8) {
                setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
            } else if (password !== confirmPassword) {
                setConfirmPasswordError({ isError: true, message: 'Passwords do not match' });
            } else {
                setPasswordError({ isError: false, message: '' });
                setConfirmPasswordError({ isError: false, message: '' });
                // Add logic to handle password reset here
                handleNextStep('PasswordChanged');
            }
        };

        const toggleShowPassword = () => setShowPassword(!showPassword);
        const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

        return (
            <form method="post" onSubmit={handleSubmit}>
                <div className="heading_s1 mb-20 text-center">
                    <h1 className="auth-title">{t("Reset Password")}</h1>
                    <p className="text-lg text-[#455154]">{t("Please type something you’ll remember")}</p>
                </div>
                <div className={`mb-4 ${passwordError.isError && 'error'}`}>
                    <div className="relative password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password || ""}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("Password *")}
                            autoComplete="on"
                            className={passwordError.isError ? "app-field error" : "app-field"}
                        />
                        <div className="w-5 icon" onClick={toggleShowPassword}>
                            <Icon className="opacity-40" name={showPassword ? "eye-slash" : "eye"} />
                        </div>
                    </div>
                    {passwordError.isError && <span className="error-msg">{passwordError.message}</span>}
                </div>
                <div className={`mb-20 ${confirmPasswordError.isError && 'error'}`}>
                    <div className="relative password-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword || ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t("Confirm Password *")}
                            autoComplete="on"
                            className={confirmPasswordError.isError ? "app-field error" : "app-field"}
                        />
                        <div className="w-5 icon" onClick={toggleShowConfirmPassword}>
                            <Icon className="opacity-40" name={showConfirmPassword ? "eye-slash" : "eye"} />
                        </div>
                    </div>
                    {confirmPasswordError.isError && <span className="error-msg">{confirmPasswordError.message}</span>}
                </div>
                <button className="w-full" type="submit">
                    <Button name="reset-password" shadow={true}>{t("Next")}</Button>
                </button>
            </form>
        );
    };

    const PasswordChanged = () => (
        <div className="flex flex-col justify-center h-full">
            <div className="heading_s1 mb-[88px] text-center">
                <div className="flex w-full justify-center">
                    <Icon name={"done"} className="mb-9" />
                </div>
                <h1 className="auth-title mb-2">{t("Password changed")}</h1>
                <p>{t("Your password has been changed successfully")}</p>
            </div>
        </div>
    );

    return <Auth>{getPageComponent()}</Auth>;
}

const mapStateToProps = (state) => ({
    api: state.api,
    respond_forgetpassword: state.api.forgetpassword,
    
});

const mapDispatchToProps = {
    forgetpassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);


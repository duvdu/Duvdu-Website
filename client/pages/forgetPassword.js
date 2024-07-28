import Auth from '../components/layout/Auth';
import React, { useEffect, useState } from 'react';
import Button from '../components/elements/button';
import Icon from '../components/Icons';
import { connect } from "react-redux";
import OTP from '../components/elements/otp';
import { ASKforgetpassword } from "../redux/action/apis/auth/forgetPassword/askForgetPassword";
import { errorConvertedMessage } from '../util/util';
import { resetpassword } from '../redux/action/apis/auth/forgetPassword/resetPassword';

function Page({ api, ASKforgetpassword, ask_respond, Change_respond, resetpassword }) {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState(null);
    const pages = ['', 'OTP', 'ResetPassword', 'PasswordChanged'];

    useEffect(() => {
        const handlePopstate = () => {
            const queryParams = new URLSearchParams(window.location.search);
            const page = queryParams.get('page');
            const newStep = pages.indexOf(page);
            setStep(newStep !== -1 ? newStep : 1);
        };

        window.addEventListener('popstate', handlePopstate);
        return () => window.removeEventListener('popstate', handlePopstate);
    }, []);

    useEffect(() => {
        if (ask_respond) handleNextStep(2);
    }, [ask_respond?.message]);

    useEffect(() => {
        if (Change_respond) handleNextStep(4);
    }, [Change_respond?.message]);

    const handleNextStep = (value) => {
        if (value <= pages.length) {
            setStep(value);
            const newURL = `${window.location.pathname}?page=${pages[step]}`;
            window.history.pushState({ path: newURL }, '', newURL);
        }
    };

    const EnterYourUserName = () => {
        const [userName, setUserName] = useState('');
        const [nameError, setNameError] = useState({ isError: false, message: '' });

        const handleSubmit = (e) => {
            e.preventDefault();
            if (userName.length < 1) {
                setNameError({ isError: true, message: 'Enter your username' });
            } else {
                setNameError({ isError: false, message: '' });
                ASKforgetpassword({ username: userName });
                setUsername(userName);
            }
        };

        const handleChange = (value) => {
            setUserName(value);
        };

        useEffect(() => {
            if (api.req === "ASKforgetpassword" && api.error) {
                const errorMessage = errorConvertedMessage(api.error);
                setNameError({ isError: true, message: errorMessage });
            }
        }, [api.error]);

        return (
            <form method="post" onSubmit={handleSubmit}>
                <div className="heading_s1 mb-8">
                    <h1 className="auth-title text-center">Enter your username</h1>
                </div>
                <div className={`mb-8 ${nameError.isError && 'error'}`}>
                    <input
                        type="text"
                        placeholder="@username"
                        className={nameError.isError ? "app-field error" : "app-field"}
                        value={userName|| ""}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    {nameError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(nameError.message) }} />}
                </div>
                <div className="h-10" />
                <button className="w-full" type="submit">
                    <Button name="reset-password" shadow={true}>Next</Button>
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
            let pError = password.length < 8;
            let pcError = password !== confirmPassword;
            const uppercaseRegex = /[A-Z]/;
            const lowercaseRegex = /[a-z]/;
            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;        
              if (password.length < 8) {
                setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
              } else if (!uppercaseRegex.test(password)) {
                  setPasswordError({ isError: true, message: 'Password must contain at least one uppercase letter.' });
              } else if (!lowercaseRegex.test(password)) {
                  setPasswordError({ isError: true, message: 'Password must contain at least one lowercase letter.' });
              } else if (!specialCharRegex.test(password)) {
                  setPasswordError({ isError: true, message: 'Password must contain at least one special character.' });
              } else if(password !== confirmPassword) {
                setPasswordError({ isError: false, message: '' });
                 setConfirmPasswordError({ isError: pcError, message: pcError ? 'Passwords do not match' : '' });
              }else {
                resetpassword({ newPassword: password, username: username });
                    setConfirmPasswordError({ isError: false, message: '' });
              }

        };

        useEffect(() => {
            if (api.req === "ChangePassword" && api.error) {
                const errorMessage = errorConvertedMessage(api.error);
                setPasswordError({ isError: true, message: errorMessage });
            }
        }, [api.req, api.error]);

        const toggleShowPassword = () => setShowPassword(!showPassword);
        const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

        return (
            <form method="post" onSubmit={handleSubmit}>
                <div className="heading_s1 mb-20 text-center">
                    <h1 className="auth-title">Reset Password</h1>
                    <p className="text-lg text-[#455154]">Please type something you’ll remember</p>
                </div>
                <div className={`mb-4 ${passwordError.isError && 'error'}`}>
                    <div className="relative password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password|| ""}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password *"
                            autoComplete="on"
                            className={passwordError.isError ? "app-field error" : "app-field"}
                        />
                        <div className="w-5 icon" onClick={toggleShowPassword}>
                            <Icon className="opacity-40" name={showPassword ? "eye-slash" : "eye"} />
                        </div>
                    </div>
                    {passwordError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(passwordError.message) }} />}
                </div>
                <div className={`mb-20 ${confirmPasswordError.isError && 'error'}`}>
                    <div className="relative password-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword|| ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password *"
                            autoComplete="on"
                            className={confirmPasswordError.isError ? "app-field error" : "app-field"}
                        />
                        <div className="w-5 icon" onClick={toggleShowConfirmPassword}>
                            <Icon className="opacity-40" name={showConfirmPassword ? "eye-slash" : "eye"} />
                        </div>
                    </div>
                    {confirmPasswordError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(confirmPasswordError.message) }} />}
                </div>
                <button className="w-full" type="submit">
                    <Button name="reset-password" shadow={true}>Next</Button>
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
                <h1 className="auth-title mb-2">Password changed</h1>
                <p>Your password has been changed successfully</p>
            </div>
        </div>
    );

    return (
        <Auth>
            {step === 1 && <EnterYourUserName />}
            {step === 2 && <OTP onSuccess={() => handleNextStep(3)} username={username} />}
            {step === 3 && <ResetPassword />}
            {step === 4 && <PasswordChanged />}
        </Auth>
    );
}

const mapStateToProps = (state) => ({
    api: state.api,
    ask_respond: state.api.ASKforgetpassword,
    Change_respond: state.api.resetpassword
});

const mapDispatchToProps = {
    ASKforgetpassword,
    resetpassword
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

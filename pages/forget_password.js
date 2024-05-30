import Auth from '../components/layout/Auth'
import React, { useEffect, useState } from 'react';
import Button from '../components/elements/button';
import Icon from '../components/Icons';
import { connect } from "react-redux";
import OTP from '../components/elements/otp';
import { ASKforgetpassword } from "../redux/action/apis/auth/changePassword/askForgetPassword";
import { ChangePassword } from "../redux/action/apis/auth/changePassword/changePassword";
import { errorConvertedMessage } from '../util/util';



function Page({ api, ASKforgetpassword, ChangePassword, ask_respond, Change_respond }) {
    const [step, setStep] = useState(1);
    const pages = ['', 'OTP', 'ResetPassword', 'PasswordChanged'];
    const [username, setUsername] = useState(null);


    useEffect(() => {
        const handlePopstate = () => {
            const queryParams = new URLSearchParams(window.location.search);
            const page = queryParams.get('page');
            const newStep = pages.indexOf(page);
            setStep(newStep !== -1 ? newStep : 1);
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);
    const handleNextStep = (value) => {
        if (value <= pages.length) {
            setStep(value);
            const newURL = `${window.location.pathname}?page=${pages[step]}`;
            window.history.pushState({ path: newURL }, '', newURL);
        }
    };
    useEffect(() => {
        console.log(ask_respond)
        if (ask_respond)
            handleNextStep(2)
    }, [ask_respond?.message])

    useEffect(() => {
        if (Change_respond)
            handleNextStep(4)
    }, [Change_respond?.message])

    function EnterYourPhoneNumber() {
        const [username, setPhoneNumber] = useState('');

        const [nameError, setUserError] = useState({ isError: false, message: '' });

        const handleSubmit = (e) => {

            e.preventDefault();
            if (username.length < 1) {
                setUserError({ isError: true, message: 'Enter your username' });
            } else {
                setUserError({ isError: false, message: '' });
                ASKforgetpassword({ username: username })
                setUsername(username)
            }
        };

        const handleChange = (value) => {
            setPhoneNumber(value);
        };
        useEffect(() => {

            if (api.req == "ASKforgetpassword" && api.error) {
                const errorMessage = errorConvertedMessage(api.error)
                setUserError({ isError: true, message: errorMessage });
            }
        }, [api.error])

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
                        value={username}
                        onChange={(e) => handleChange(e.target.value)}

                    />
                    {nameError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(nameError.message) }} />}

                </div>
                <div className="h-10" />
                <button className="w-full" type="submit" >
                    <Button name="reset-password" shadow={true}>
                        Next
                    </Button>
                </button>

            </form>
        )
    }

    function ResetPassword({ onNextStep }) {
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
        const [confirmPasswordError, setConfirmPasswordError] = useState({ isError: false, message: '' });

        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);


        const handleSubmit = (e) => {
            e.preventDefault();

            // Validation for password
            var pError = true, pcError = true

            pError = password.length < 8
            if (pError) {
                setPasswordError({ isError: true, message: 'Password must be at least 8 characters long' });
            } else {
                setPasswordError({ isError: false, message: '' });
            }

            pcError = password !== confirmPassword
            if (pcError) {
                setConfirmPasswordError({ isError: true, message: 'Passwords do not match' });
            } else {
                setConfirmPasswordError({ isError: false, message: '' });
            }

            // Continue with form submission or other actions if no errors
            if (!pError && !pcError) {
                ChangePassword({ newPassword: password, username: username })
                // onNextStep();
            }
        };

        useEffect(() => {
            if (api.req == "ChangePassword" && api.error) {
                const errorMessage = errorConvertedMessage(api.error)
                setPasswordError({ isError: true, message: errorMessage });
            }
        }, [api.req, api.error && api.error.message]);
        const toggleShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const toggleShowConfirmPassword = () => {
            setShowConfirmPassword(!showConfirmPassword);
        };

        return (
            <>
                <form method="post" action="/password_changed" onSubmit={handleSubmit}>
                    <div className="heading_s1 mb-20 text-center">
                        <h1 className="auth-title">Reset Password</h1>
                        <p className="text-lg text-[#455154]">Please type something you’ll remember</p>
                    </div>
                    <div className={`mb-4 ${passwordError.isError && 'error'}`}>

                        <div className="relative password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password *"
                                autoComplete="on"
                                className={passwordError.isError ? "app-field error" : "app-field"}
                            />
                            {
                                !showPassword &&
                                <div className="w-5 icon" onClick={toggleShowPassword} >
                                    <Icon className="opacity-40" name={"eye"} />
                                </div>
                            }
                            {
                                showPassword &&
                                <div className="w-5 icon" onClick={toggleShowPassword}>
                                    <Icon className="opacity-40" name={"eye-slash"} />
                                </div>
                            }
                        </div>
                        {passwordError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(passwordError.message) }} />}
                    </div>
                    <div className={`mb-20 ${confirmPasswordError.isError && 'error'}`}>
                        <div className="relative password-container">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password *"
                                autoComplete="on"
                                className={passwordError.isError ? "app-field error" : "app-field"}
                            />
                            {
                                !showConfirmPassword &&
                                <div className="w-5 icon" onClick={toggleShowConfirmPassword} >
                                    <Icon className="opacity-40" name={"eye"} />
                                </div>
                            }
                            {
                                showConfirmPassword &&
                                <div className="w-5 icon" onClick={toggleShowConfirmPassword}>
                                    <Icon className="opacity-40" name={"eye-slash"} />
                                </div>
                            }
                        </div>
                        {confirmPasswordError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(confirmPasswordError.message) }}/>}
                    </div>
                    <button className="w-full" type="submit" >
                        <Button name="reset-password" shadow={true}>
                            Next
                        </Button>
                    </button>
                </form>
            </>
        );
    }

    return (
        <Auth>
            {step === 1 && <EnterYourPhoneNumber />}
            {step === 2 && <OTP oNsucess={()=>handleNextStep(3)} username={username} />}
            {step === 3 && <ResetPassword />}
            {step === 4 && <PasswordChanged />}
            {/* 
            <div className="mb-4 relative">
                {step < pages.length - 1 && (
                    <button className="w-full" type="button" onClick={handleNextStep}>
                        <Button name="reset-password" shadow={true}>
                            Next
                        </Button>
                    </button>
                )}
                {step == pages.length - 1 && (
                    <div className="mb-4 relative">
                        <Link href={"/login"}>
                            <Button type="submit" name="login" shadow={true}>
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                )}
            </div> */}
        </Auth>
    );
}






const PasswordChanged = () => <div className="flex flex-col justify-center h-full">
    <div className="heading_s1 mb-[88px] text-center">
        <div className="flex w-full justify-center">
            <Icon name={"done"} className="mb-9" />
        </div>
        <h1 className="auth-title mb-2">Password changed</h1>
        <p>Your password has been changed successfully</p>
    </div>
</div>

const mapStateToProps = (state) => ({
    api: state.api,
    ask_respond: state.api.ASKforgetpassword,
    Change_respond: state.api.ChangePassword
});

const mapDispatchToProps = {
    ASKforgetpassword,
    ChangePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);


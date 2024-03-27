import Link from "next/link";
import Auth from '../components/layout/Auth'
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import Button from '../components/elements/button';
import { useRouter } from 'next/router';
import Icon from '../components/Icons';

function Page() {
    const [step, setStep] = useState(1);
    const pages = ['', 'EnterPhoneNumber', 'ResetPassword', 'OTP', 'PasswordChanged'];

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

    const handleNextStep = () => {
        if (step < pages.length - 1) {
            setStep(step + 1);
            const newURL = `${window.location.pathname}?page=${pages[step + 1]}`;
            window.history.pushState({ path: newURL }, '', newURL);
        }
    };


    return (
        <Auth>
            {step === 1 && <EnterYourPhoneNumber />}
            {step === 2 && <ResetPassword />}
            {step === 3 && <OTP />}
            {step === 4 && <PasswordChanged />}
            <div className="mb-4 relative">
                {step < pages.length - 1 && (
                    <button className="w-full" type="button" onClick={handleNextStep}>
                        <Button name="reset-password" shadow={true}>
                            Next
                        </Button>
                    </button>
                )}
                {step == pages.length - 1&& (
                    <div className="mb-4 relative">
                        <a href={"/"}>
                            <Button type="submit" name="login" shadow={true}>
                                Back to Login
                            </Button>
                        </a>
                    </div>
                )}
            </div>
        </Auth>
    );
}

function EnterYourPhoneNumber({ onNextStep }) {
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [numberError, setNumberError] = useState({ isError: false, message: '' });



    const handleSubmit = (e) => {

        if (PhoneNumber.length < 8) {
            setNumberError({ isError: true, message: 'Password must be at least 8 characters long.' });
        } else {
            setNumberError({ isError: false, message: '' });
        }

    };
    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="heading_s1 mb-8">
                <h1 className="auth-title">Enter phone number</h1>
            </div>
            <div className={`mb-8 ${numberError.isError && 'error'}`}>
                <input
                    type="text"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone number"
                    className={numberError.isError ? "auth-field error" : "auth-field"}
                />
                {numberError.isError && <p className="error-msg">{numberError.message}</p>}
            </div>

        </form>
    )
}



function OTP({ onNextStep }) {
    const [otp, setOtp] = useState('');
    const [counter, setcount] = useState(59);
    const [error, seterror] = useState(false);
    useEffect(() => {
        if (counter > 0) {
            const intervalId = setInterval(() => {
                setcount((prevCount) => prevCount - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [counter]);
    return (
        <>

            <form className="flex flex-col items-center">
                <div className="max-w-96 flex flex-col items-center justify-center">
                    <div className="w-353">
                        <div className="heading_s1 mb-11 text-center">
                            <h1 className="auth-title">Enter code</h1>
                            <p className="otpnews" >Enter the verification code we just sent to your phone +20 12* **** *74</p>
                        </div>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={5}
                            renderSeparator={<span style={{ width: "100%" }} > </span>}
                            renderInput={(props) => <input {...props} className={`${error ? "OTP error" : "OTP"} bg-transparent border dark:border-[#2F3234] text-3xl text-center`} style={{ width: "63px", height: "72px" }} />}
                        />

                        {
                            error &&
                            <p className="error-msg mt-10" >Wrong code, please try again</p>
                        }
                        <div className="mt-14 mb-28">

                            {
                                counter > 0 ?
                                    <p className="resendMSG">
                                        <span className="msg"> Send code again </span><span className="counter"> 00:{counter}</span>
                                    </p> :
                                    <p className="resendMSG2 text-center cursor-pointer" onClick={() => { setcount(59) }}>
                                        Send code again
                                    </p>
                            }
                        </div>
                    </div>
                </div>

            </form>


        </>
    );
}
function ResetPassword({ onNextStep }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
    const [confirmPasswordError, setConfirmPasswordError] = useState({ isError: false, message: '' });
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation for password
        if (password.length < 8) {
            setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
        } else {
            setPasswordError({ isError: false, message: '' });
        }

        // Validation for confirmPassword
        if (password !== confirmPassword) {
            setConfirmPasswordError({ isError: true, message: 'Passwords do not match.' });
        } else {
            setConfirmPasswordError({ isError: false, message: '' });
        }

        // Continue with form submission or other actions if no errors
        if (!passwordError.isError && !confirmPasswordError.isError) {
            console.log('Form submitted');
            // Add logic for password reset here
            onNextStep();
            console.log("reset password")
        }


    };

    return (
        <>
            <form method="post" action="/password_changed" onSubmit={handleSubmit}>
                <div className="heading_s1 mb-20 text-center">
                    <h1 className="auth-title">Reset Password</h1>
                    <p className="text-lg text-[#455154]">Please type something you’ll remember</p>
                </div>
                <div className={`mb-4 ${passwordError.isError && 'error'}`}>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password *" className={passwordError.isError ? "auth-field error" : "auth-field"} />
                    {passwordError.isError && <p className="error-msg">{passwordError.message}</p>}
                </div>
                <div className={`mb-20 ${confirmPasswordError.isError && 'error'}`}>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password *" className={confirmPasswordError.isError ? "auth-field error" : "auth-field"} />
                    {confirmPasswordError.isError && <p className="error-msg">{confirmPasswordError.message}</p>}
                </div>
                <div className="login_footer"></div>

            </form>
        </>
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


export default Page;


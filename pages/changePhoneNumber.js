import Link from "next/link";
import Auth from '../components/layout/Auth';
import Button from '../components/elements/button';
import { useState, useEffect } from 'react';
import Layout from "../components/layout/Layout";
import OtpInput from 'react-otp-input';
import Icon from '../components/Icons';

function ChangePassword() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };
    return (
        <>
            <Layout shortheader={true}>
                <div className="container">
                    <div className="mx-auto flex justify-center items-center text-center my-9 h-changePhoneNumber bg-DS_white max-w-[749px]">
                        {currentStep === 1 && <Step1 onNextStep={handleNextStep} />}
                        {currentStep === 2 && <Step2 onNextStep={handleNextStep} />}
                        {currentStep === 3 && <Step3 />}
                    </div>
                </div>
            </Layout>
        </>
    );
}


function Step1({ onNextStep }) {
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
        <form className="w-[521px]" method="post" onSubmit={handleSubmit}>
            <div className="heading_s1 mb-8">
                <h1 className="auth-title capitalize">change phone number</h1>
            </div>
            <div className={`mb-8 ${numberError.isError && 'error'}`}>
                <input
                    type="text"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="new number"
                    className={numberError.isError ? "auth-field error" : "auth-field"}
                />
                {numberError.isError && <p className="error-msg">{numberError.message}</p>}
            </div>
            <Button name="login" shadow={true} className="w-full " onClick={onNextStep}>
                confirm
            </Button>
        </form>
    )
}
function Step2({ onNextStep }) {
    const [otp, setOtp] = useState('');
    const [counter, setcount] = useState(100);
    const [error, seterror] = useState(false);

    const handlechange = (value)=> {
        setOtp(value)
        if(value.length == 6) onNextStep()
    }
    useEffect(() => {
        if (counter > 0) {
            const intervalId = setInterval(() => {
                setcount((prevCount) => prevCount - 1);
            }, 1000);

            // Cleanup interval on component unmount or when counter reaches 0
            return () => clearInterval(intervalId);
        }
    }, [counter]);

    return (
        <form className="flex flex-col items-center">
            <div class="max-w-96 flex flex-col items-center justify-center">
                <div class="w-353">
                    <div className="heading_s1 mb-11 text-center">
                        <h1 className="auth-title">Enter code</h1>
                        <p className="otpnews" >Enter the verification code we just sent to your phone +20 12* **** *74</p>
                    </div>
                    <OtpInput
                        value={otp}
                        onChange={handlechange}
                        numInputs={6}
                        renderSeparator={<span style={{ width: "100%" }} > </span>}
                        renderInput={(props) => <input {...props} className={`${error ? "OTP error" : "OTP"} bg-transparent border dark:border-[#2F3234] text-3xl text-center`} style={{ width: "53px", height: "62px" }} />}
                    />

                    {
                        error &&
                        <p className="error-msg mt-10" >Wrong code, please try again</p>
                    }
                    <div className="mt-40">

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
    )
}

function Step3() {
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
        <div className="flex flex-col justify-center h-full">
            <div className="heading_s1 mb-[88px] text-center">
                <div className="flex w-full justify-center">
                    <Icon name={"done"} className="mb-9" />
                </div>
                <h1 className="auth-title mb-2">number changed</h1>
                <p>Your phone number has been changed successfully</p>
            </div>
            <div className="mb-4 relative">
                <a href={"/login"}>
                    <Button type="submit" name="login" shadow={true}>
                        done
                    </Button>
                </a>
            </div>
        </div>
    )
}
export default ChangePassword;

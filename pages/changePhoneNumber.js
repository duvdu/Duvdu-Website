import Link from "next/link";
import Auth from '../components/layout/Auth';
import Button from '../components/elements/submitButton';
import { useState, useEffect } from 'react';
import Layout from "../components/layout/Layout";
import OtpInput from 'react-otp-input';
import Icon from '../components/Icons';

function ChangePassword() {
    return (
        <>
            <Layout>
                <div className="container flex justify-center items-center text-center w-1/2 bg-DS_white mt-9 h-[878px]">
                    {/* <Step1 />
                    <Step2 /> */}
                    <Step3 />
                </div>
            </Layout>
        </>
    );
}


function Step1() {
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [numberError, setNumberError] = useState({ isError: false, message: '' });



    const handleSubmit = (e) => {
        //   e.preventDefault();

        //   var eError = true, pError = true
        //   if (email.trim() === '') {
        //     setEmailError({ isError: true, message: 'Email is required.' });
        //   } else {
        //     eError = false
        //     setEmailError({ isError: false, message: '' });
        //   }

        if (PhoneNumber.length < 8) {
            setNumberError({ isError: true, message: 'Password must be at least 8 characters long.' });
        } else {
            setNumberError({ isError: false, message: '' });
        }

        //   if (!eError && !pError) {
        //     console.log('Form submitted');
        //     setIsloading(true)
        //     setTimeout(() => {
        //       setIsloading(false);
        //     }, 2000);

        //   }
    };
    return (
        <form method="post" onSubmit={handleSubmit} className="w-full px-[114px]">
            <div className="heading_s1 mb-8">
                <h1 className="auth-title">change phone number</h1>
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
            <Button type="submit" name="login" shadow={true} className="w-full">
                confirm
            </Button>
        </form>
    )
}
function Step2() {
    const [otp, setOtp] = useState('');
    const [counter, setcount] = useState(59);
    const [error, seterror] = useState(false);

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
        <form>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "353px" }}>
                    <div className="heading_s1 mb-11 text-center">
                        <h1 className="auth-title">Enter code</h1>
                        <p className="otpnews" >Enter the verification code we just sent to your phone +20 12* **** *74</p>
                    </div>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={5}
                        renderSeparator={<span style={{ width: "100%" }} > </span>}
                        renderInput={(props) => <input {...props} className={error ? "OTP error" : "OTP"} style={{ width: "63px", height: "72px" }} />}
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
            <div className="mb-4 relative mb-30 mt-55">
                <Button type="submit" name="reset-password">
                    Reset
                </Button>
                <div className="submit-btn"></div>
            </div>
        </form>
    )
}

function Step3() {
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [numberError, setNumberError] = useState({ isError: false, message: '' });



    const handleSubmit = (e) => {
        //   e.preventDefault();

        //   var eError = true, pError = true
        //   if (email.trim() === '') {
        //     setEmailError({ isError: true, message: 'Email is required.' });
        //   } else {
        //     eError = false
        //     setEmailError({ isError: false, message: '' });
        //   }

        if (PhoneNumber.length < 8) {
            setNumberError({ isError: true, message: 'Password must be at least 8 characters long.' });
        } else {
            setNumberError({ isError: false, message: '' });
        }

        //   if (!eError && !pError) {
        //     console.log('Form submitted');
        //     setIsloading(true)
        //     setTimeout(() => {
        //       setIsloading(false);
        //     }, 2000);

        //   }
    };
    return (
        <div className="flex flex-col justify-center h-full w-full">
            <div className="heading_s1 mb-[88px] text-center">
                <div className="flex w-full justify-center">
                    <Icon name={"done"} className="mb-9" />
                </div>
                <h1 className="auth-title mb-2">number changed</h1>
                <p>Your phone number has been changed successfully</p>
            </div>
            <div className="mb-4 relative mx-[114px]">
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

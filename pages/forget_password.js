import Link from "next/link";
import Auth from '../components/layout/Auth'
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import Button from '../components/elements/submitButton';

function Register() {
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
        <>
            <Auth>
                <form className="flex flex-col items-center">
                    <div class="max-w-96 flex flex-col items-center justify-center">
                        <div class="w-353">
                            <div className="heading_s1 mb-11 text-center">
                                <h1 className="auth-title">Enter code</h1>
                                <p className="otpnews" >Enter the verification code we just sent to your phone +20 12* **** *74</p>
                            </div>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={5}
                                renderSeparator={<span style={{ width: "100%" }} > </span>}
                                renderInput={(props) => <input {...props} className={"w-16 h-20 " + (error ? "OTP error" : "OTP")} style={{ width: "63px", height: "72px" }} />}
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
                    <div className="mb-4 relative mb-30 mt-55 w-full">
                        <Button type="submit" name="reset-password">
                            Reset
                        </Button>
                        <div className="submit-btn"></div>
                    </div>
                    {/* <div className="have-account">
                        <span>Don't have an account ?</span>
                        <Link href="/register">
                            <a> Register now</a>
                        </Link>
                    </div> */}
                </form>

            </Auth>

        </>
    );
}

export default Register;

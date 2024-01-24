import Link from "next/link";
import Auth from '../components/layout/Auth'
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

function register() {
    const [otp, setOtp] = useState('');
    const [counter, setcount] = useState(59);
    const [error, seterror] = useState(true);
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
                <form>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: "353px" }}>
                            <div className="heading_s1 mb-42 text-center">
                                <h1 className="auth-title">Enter code</h1>
                                <p className="otpnews" >Enter the verification code we just sent to your phone +20 12* **** *74</p>
                            </div>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={5}
                                renderSeparator={<span style={{ width: "100%" }} > </span>}
                                renderInput={(props) => <input {...props} className={ error? "OTP error":"OTP"} style={{ width: "63px", height: "72px" }} />}
                            />

                            {
                                error &&
                                <p className="error-msg mt-10" >Wrong code, please try again</p>
                            }
                            {
                                counter > 0 ?
                                    <p className="resendMSG mt-55">
                                        <span className="msg"> Send code again </span><span className="counter"> 00:{counter}</span>
                                    </p> :
                                    <p className="resendMSG2 mt-55 text-center">
                                        Send code again
                                    </p>
                            }








                        </div>
                    </div>
                    <div className="mb-4 relative mb-30 mt-55">
                        <button type="submit" className="btn btn-heading btn-block hover-up" name="Reset">Reset</button>
                        <div className="submit-btn"></div>
                    </div>
                    <div className="have-account">
                        <span>Don't have an account ?</span>
                        <Link href="/register">
                            <a> Register now</a>
                        </Link>
                    </div>
                </form>

            </Auth>

        </>
    );
}

export default register;

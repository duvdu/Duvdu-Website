import OtpInput from 'react-otp-input';
import React, { useEffect, useState } from 'react';
import { resendCode } from "../../redux/action/apis/auth/OTP/resend";
import { verify} from "../../redux/action/apis/auth/OTP/verify";
import { login } from "../../redux/action/auth";
import { connect } from "react-redux";
import Auth from '../../components/layout/Auth';
import { useRouter } from 'next/router';
import { convertDuration, errorConvertedMessage } from '../../util/util';

function OTP({ api, verify, resendCode }) {

    const router = useRouter();
    const { username } = router.query;

    const [otp, setOtp] = useState('');
    const [counter, setcount] = useState(100);
    const [local_error, setlocal_error] = useState(false);

    useEffect(() => {
        if (api.data && api.data.code) {
            if (api.data.message == "success") {
                setcount(100)
                api.data = null
            }
        }
        if (api.data && api.data.username) {
            if (api.data.message == "success") {
                window.location.href = "/login"
            }
        }
    }, [api.loading, api.error, api.data])

    useEffect(() => {
        if (api.error) {
            const errorMessage = errorConvertedMessage(api.error)
            setlocal_error(errorMessage)
        }
        else {
            setlocal_error(null)
        }
    }, [api.error])

    useEffect(() => {
        if (counter > 0) {
            const intervalId = setInterval(() => {
                setcount((prevCount) => prevCount - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [counter]);

    useEffect(() => {
        if (otp.length == 6) verify({ username, code: otp });
    }, [otp])


    return (
        <>
            <Auth>
                <form className="flex flex-col items-center">
                    <div className="max-w-96 flex flex-col items-center justify-center">
                        <div className="w-353">
                            <div className="heading_s1 mb-11 text-center">
                                <h1 className="auth-title">Enter code</h1>
                                <p className="otpnews" >Enter the verification code we just sent to your phone </p>
                            </div>
                            <OtpInput
                                value={otp}
                                onChange={(value) => setOtp(value)}
                                numInputs={6}
                                renderSeparator={<span style={{ width: "100%" }} > </span>}
                                renderInput={(props) => <input {...props} className={`${local_error ? "OTP error" : "OTP"} bg-transparent border dark:border-[#2F3234] text-3xl text-center`} style={{ width: "53px", height: "62px" }} />}
                            />

                            {
                                local_error &&
                                <p className="error-msg mt-10" >{local_error}</p>
                            }
                            <div className="mt-14 mb-28">

                                {
                                    counter > 0 ?
                                        <p className="resendMSG">
                                            <span className="msg"> Send code again </span><span className="counter"> {convertDuration(counter * 1000)} </span>
                                        </p> :
                                        <p className="resendMSG2 text-center cursor-pointer" onClick={() => { resendCode({ username }); }}>
                                            Send code again
                                        </p>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </Auth>
        </>
    );
}

const mapStateToProps = (state) => ({
    api: state.api,
});

const mapDispatchToProps = {
    verify,
    resendCode,
    login,
};
export default connect(mapStateToProps, mapDispatchToProps)(OTP);

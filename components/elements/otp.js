import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { convertDuration, errorConvertedMessage } from "../../util/util";
import { connect } from "react-redux";
import { verify } from "../../redux/action/apis/auth/OTP/verify";
import { resendCode } from "../../redux/action/apis/auth/OTP/resend";

function OTP({
    api,
    username,
    verify,
    resendCode,
    oNsucess,
    resendCode_respond,
    verify_respond,
    initcount = 100
}) {

    const [otp, setOtp] = useState('');
    const [counter, setcount] = useState(120);
    const [local_error, setlocal_error] = useState(false);

    useEffect(() => {
    }, [resendCode_respond?.message])

    useEffect(() => {
        if (resendCode_respond) {
            setcount(100)
        }
    }, [resendCode_respond?.message])

    useEffect(() => {
        if (verify_respond) {
            oNsucess()
            verify({ username: username, code: -1 })
        }
    }, [verify_respond?.message])


    useEffect(() => {
        if (api.error && (api.req == "resendCode" || api.req == "verify")) {
            const errorMessage = errorConvertedMessage(api.error);
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
        if (otp.length == 6) verify({ username: username, code: otp });
    }, [otp])

    return (
        <>
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
                            <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(local_error) }} />
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
        </>
    );
}

const mapStateToProps = (state) => ({
    resendCode_respond: state.api.resendCode,
    verify_respond: state.api.verify,
    api: state.api,

});

const mapDispatchToProps = {
    verify,
    resendCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);


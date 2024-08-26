import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { convertDuration, errorConvertedMessage, OpenPopUp,  } from "../../util/util";
import { useTranslation } from 'react-i18next';

import { connect } from "react-redux";
import { verify } from "../../redux/action/apis/auth/OTP/verify";
import { resendCode } from "../../redux/action/apis/auth/OTP/resend";

function OTP({
    api,
    username,
    verify,
    resendCode,
    onSuccess,
    resendCode_respond,
    verify_respond,
    initcount = 100
}) {
    const { t } = useTranslation();

    const [otp, setOtp] = useState('');
    const [counter, setcount] = useState(120);
    const [local_error, setlocal_error] = useState(false);

    useEffect(() => {
        console.log(resendCode_respond?.code)
    }, [resendCode_respond?.message])

    // useEffect(() => {
    //     if (resendCode_respond) {
    //         setcount(100)
    //     }
    // }, [resendCode_respond?.message])

    useEffect(() => {
        if (verify_respond) {
            onSuccess()
            verify({ username: username, code: -1 })
        }
    }, [verify_respond?.message])

    useEffect(() => {
        OpenPopUp('OTP-tester')
    }, [])


    useEffect(() => {
        if (api.error && (api.req == "resendCode" || api.req == "verify")) {
            const errorMessage = errorConvertedMessage(api.error);
            if(api.req == "resendCode" ) setcount(errorMessage)
            if(api.req == "verify"){
                setlocal_error(t('Invalid Code'))
            }
        }
        else {
            setlocal_error(null)
            setOtp('')
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
            <form className="flex flex-col items-center" dir='ltr'>
                <div className="max-w-96 flex flex-col items-center justify-center">
                    <div className="w-353">
                        <div className="heading_s1 mb-11 text-center">
                            <h1 className="auth-title">{t("Enter code")}</h1>
                            <p className="otpnews" >{t("Enter the verification code we just sent to your phone")}</p>
                        </div>
                        <OtpInput
                            value={otp|| ""}
                            onChange={(value) => setOtp(value)}
                            numInputs={6}
                            renderSeparator={<span style={{ width: "100%" }} > </span>}
                            renderInput={(props) => <input {...props} className={`${local_error ? "OTP error" : "OTP"} bg-transparent border dark:border-[#2F3234] text-3xl text-center mx-1`} style={{ width: "53px", height: "62px" }} />}
                        />

                        {
                            local_error &&
                            <div className="error-msg text-center" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(local_error) }} />
                        }
                        <div className="mt-14 mb-28">

                            {
                                counter > 0 ?
                                    <p className="resendMSG">
                                        <span className="msg">{t("Send code again")}</span><span className="counter"> {convertDuration(counter * 1000)} </span>
                                    </p> :
                                    <p className="resendMSG2 text-center cursor-pointer" onClick={() => { 
                                        setcount(120)
                                        resendCode({ username });
                                        }}>
                                        {t("Send code again")}
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


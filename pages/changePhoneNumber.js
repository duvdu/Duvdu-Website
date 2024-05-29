import Link from "next/link";
import Auth from '../components/layout/Auth';
import Button from '../components/elements/button';
import { useState, useEffect } from 'react';
import Layout from "../components/layout/Layout";
import { connect } from "react-redux";
import Icon from '../components/Icons';

import { askChangePhone } from "../redux/action/apis/auth/changephone/askupdatePhone";
import { UpdatePhone } from "../redux/action/apis/auth/changephone/updatePhone";
import { errorConvertedMessage } from '../util/util';
import OTP from "../components/elements/otp";

function ChangePhoneNumber({ api, respond_Ask, respond_Update, askChangePhone, UpdatePhone, username }) {
    const [step, setStep] = useState(0);
    const [error, setError] = useState('');
    const pages = ['', 'OTP', 'EnterPhoneNumber', 'OTP', 'PhoneChanged'];

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


    useEffect(() => {
        if (api.error && JSON.parse(api.error).status == 423) {
            window.location.href = "/"
        }
        else if (api.error) {
            setError(api.error)
        }
    }, [api.error]);


    useEffect(() => {
        askChangePhone()
    }, []);

    const handleNextStep = (value) => {
        console.log(value)
        if (value < pages.length) { // Update this line to use the passed value
            setStep(value);
            const newURL = `${window.location.pathname}?page=${pages[value]}`; // Update this line to use the passed value
            window.history.pushState({ path: newURL }, '', newURL);
        }
    };

    if (respond_Update)
        console.log("respond_Update = ", respond_Update);
    else if (respond_Ask)
        console.log("respond_Ask = ", respond_Ask);

    useEffect(() => {
        if (respond_Update)
            handleNextStep(3);
        else if (respond_Ask)
            handleNextStep(1);
    }, [respond_Update, respond_Ask])



    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };


    function EnterNewPhone() {
        const [PhoneNumber, setPhoneNumber] = useState('');
        const [numberError, setNumberError] = useState({ isError: false, message: '' });

        if (api.req == "UpdatePhone" && api.error && !numberError.isError) {
            const errorMessage = errorConvertedMessage(api.error)
            setNumberError({ isError: true, message: errorMessage });
        }


        const handleSubmit = (e) => {
            e.preventDefault();

            if (PhoneNumber.length < 1) {
                setNumberError({ isError: true, message: 'Enter new phone number' });
            } else {
                setNumberError({ isError: false, message: '' });
                UpdatePhone({ phoneNumber: PhoneNumber })
            }
        };


        return (
            <form className="w-[521px]" method="post" onSubmit={handleSubmit}>
                <div className="heading_s1 mb-8">
                    <h1 className="auth-title capitalize">Change Phone Number</h1>
                </div>
                <div className={`mb-8 ${numberError.isError && 'error'}`}>
                    <input
                        type="text"
                        value={PhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="new number"
                        className={numberError.isError ? "app-field error" : "app-field"}
                    />
                    {numberError.isError && <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(numberError.message) }} />}
                </div>
                <button className="w-full" type="submit" >
                    <Button name="login" shadow={true} className="w-full " >
                        confirm
                    </Button>
                </button>
            </form>
        )
    }


    function Message() {

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
                <Link href={"/login"}>
                    <Button type="submit" name="login" shadow={true}>
                        Done
                    </Button>
                </Link>
                </div>
            </div>
        )
    }


    return (
        <>
            <Layout shortheader={true}>
                <div className="container">
                    <div className="mx-auto flex flex-col justify-center items-center text-center my-9 h-changePhoneNumber bg-DS_white max-w-[749px]">
                        {step === 1 && <OTP key={0} oNsucess={() => handleNextStep(2)} username={username} />}
                        {step === 2 && <EnterNewPhone />}
                        {step === 3 && <OTP key={1} oNsucess={() => handleNextStep(4)} username={username} />}
                        {step === 4 && <Message />}
                        <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(error) }} />
                    </div>
                </div>
            </Layout>
        </>
    );
}



const mapStateToProps = (state) => ({
    api: state.api,
    respond_Ask: state.api.askChangePhone,
    respond_Update: state.api.UpdatePhone,
    username: state.auth.username
});

const mapDispatchToProps = {
    askChangePhone,
    UpdatePhone
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePhoneNumber);

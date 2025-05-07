import Link from "next/link";
import Button from '../components/elements/button';
import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Icon from '../components/Icons';
import { getMyprofile } from "../redux/action/apis/auth/profile/getProfile";
import { addPhone } from "../redux/action/apis/auth/changephone/addPhone";
import { errorConvertedMessage } from '../util/util';
import { useTranslation } from 'react-i18next';
import OTP from "../components/elements/otp";
import { useRouter } from "next/router";
import { LogOut } from "../redux/action/apis/auth/logout";

function AddPhoneNumber({ LogOut, api, respond_addPhone, addPhone, username, getMyprofile }) {
    const { i18n, t } = useTranslation();
    const [step, setStep] = useState(2);
    const [error, setError] = useState('');
    const pages = ['', 'OTP', 'EnterPhoneNumber', 'OTP', 'PhoneChanged'];
    const router = useRouter();

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
        if (respond_addPhone?.error && JSON.parse(respond_addPhone?.error).status == 423) {
            window.location.href = '/';
        } else if (respond_addPhone?.error) {
            setError(respond_addPhone?.error);
        }
    }, [respond_addPhone?.error]);

    const handleNextStep = (value) => {
        if (value < pages.length) {
            setStep(value);
            const newURL = `${window.location.pathname}?page=${pages[value]}`;
            window.history.pushState({ path: newURL }, '', newURL);
        }
    };

    useEffect(() => {
        if (!username) return;
        if (respond_addPhone?.message === 'success') {
            handleNextStep(3);
        }
    }, [respond_addPhone?.message, username]);

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    function EnterNewPhone() {
        const [PhoneNumber, setPhoneNumber] = useState('');
        const [numberError, setNumberError] = useState({ isError: false, message: '' });

        if (respond_addPhone?.error && !numberError.isError) {
            const errorMessage = errorConvertedMessage(respond_addPhone?.error);
            setNumberError({ isError: true, message: errorMessage });
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            const egyptianPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

            if (PhoneNumber.length < 1) {
                setNumberError({ isError: true, message: 'Enter new phone number' });
            } else if (!egyptianPhoneRegex.test(PhoneNumber)) {
                setNumberError({ isError: true, message: 'Invalid Egyptian phone number.' });
            } else {
                setNumberError({ isError: false, message: '' });
                addPhone({ phoneNumber: PhoneNumber });
            }
        };

        const handleLogout = async () => {
            try {
                await LogOut();
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/'; // reload page and clear all state
            } catch (err) {
                console.error("Logout failed:", err);
            }
        };

        return (
            <form className="md:w-[521px] relative pt-32" method="post" onSubmit={handleSubmit}>
                <div onClick={handleLogout} className="flex gap-2 items-center text-red-950 cursor-pointer absolute top-3 left-3">
                    <img className="icon size-6" src={`/assets/imgs/theme/logout-icon.svg`} />
                    <p className="text-[12px] font-semibold text-red-500">{t('Logout')}</p>
                </div>
                <div className="heading_s1 mb-8">
                    <h1 className="auth-title capitalize">{t("Add Phone Number")}</h1>
                </div>
                <div className={numberError.isError ? 'error' : 'mb-8'}>
                    <input
                        type="text"
                        value={PhoneNumber || ""}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={t("new number")}
                        className={numberError.isError ? "app-field error" : "app-field"}
                    />
                    {numberError.isError &&
                        <span className="error-msg" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(numberError.message) }} />}
                </div>
                <button className="w-full" type="submit">
                    <Button name="login" shadow={true} className="w-full">
                        {respond_addPhone?.loading
                            ? <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />
                            : t("confirm")}
                    </Button>
                </button>
            </form>
        );
    }

    function Message() {
        return (
            <div className="flex flex-col justify-center h-full">
                <div className="heading_s1 mb-[88px] text-center">
                    <div className="flex w-full justify-center">
                        <Icon name={"done"} className="mb-9" />
                    </div>
                    <h1 className="auth-title mb-2">{t("number changed")}</h1>
                    <p>{t("Your phone number has been changed successfully")}</p>
                </div>
                <div className="mb-4 relative">
                    <Link href={"/"}>
                        <Button type="submit" name="login" shadow={true}>{t("Done")}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('lang') === 'Arabic' ? 'Arabic' : 'English');
    }, []);

    return (
        <div className="container">
            <div className="mx-auto py-[100px] md:py-[200px] flex flex-col justify-center items-center text-center my-9 h-changePhoneNumber bg-white dark:bg-[#1A2024] max-w-[749px]">
                {step === 2 && <EnterNewPhone />}
                {step === 3 && <OTP key={1} onSuccess={() => {
                    getMyprofile();
                    handleNextStep(4);
                }} username={username} />}
                {step === 4 && <Message />}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    api: state.api,
    respond_addPhone: state.api.addPhone,
    username: state.auth.username
});

const mapDispatchToProps = {
    LogOut,
    addPhone,
    getMyprofile
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoneNumber);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Switch from '../../elements/switcher'
import Icon from "../../Icons";
import Button from '../../elements/button';
import { useTranslation } from 'react-i18next';
import { toggleDarkMode, toggleLanguage } from "../../../redux/action/setting";
import { logout } from "../../../redux/action/auth";
import * as Types from '../../../redux/constants/actionTypes'
import ContactUs from "./contactUs";
import { LogOut } from "../../../redux/action/apis/auth/logout";
import { useRouter } from "next/router";
import { updateProfile } from "../../../redux/action/apis/auth/profile/updateprofile";
import SendMoney from "./sendMoney";
import ReceiveMoney from "./receiveMoney";
import TransactionDetails from "../../popsup/TransactionDetails";
import { ClosePopUp, OpenPopUp } from "../../../util/util";


function Setting({
    isDark,
    toggleDarkMode,
    toggleLanguage,
    getheaderpopup,
    LogOut,
    user,
    isLogin,
    updateProfile,
    onChoose,
    updateProfile_respond

}) {
    const { t } = useTranslation();
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isRefunded, setIsRefunded] = useState(true);
    const [open, setOpened] = useState(0);
    // Determine mobile view only on client
    const [isMob, setIsMob] = useState(typeof window !== 'undefined' && window.innerWidth < 1024);
    const [instantLocal, setInstantLocal] = useState(false);
    useEffect(() => {
        if (getheaderpopup === Types.SHOWMONEYSEND) {
            setOpened(3);
        } else if (getheaderpopup === Types.SHOWMONEYRECEIVE) {
            setOpened(4);
        } else {
            setOpened(0);
        }
    }, [getheaderpopup]);

    useEffect(() => {
        const serverValue = updateProfile_respond?.data?.isAvaliableToInstantProjects;
        if (serverValue !== undefined && serverValue !== null) {
            setInstantLocal(!!serverValue);
            return;
        }
        setInstantLocal(!!user?.isAvaliableToInstantProjects);
    }, [user?.isAvaliableToInstantProjects, updateProfile_respond?.data?.isAvaliableToInstantProjects]);

    function handleResize() {
        setIsMob(window.innerWidth < 1024);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const router = useRouter();

    function toggle() {
        const body = document.body;
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode);
        toggleDarkMode(isDarkMode)
    }

    function updateInstantState(checked) {
        setInstantLocal(checked)
        const data = new FormData();
        data.append('isAvaliableToInstantProjects', checked)
        updateProfile(data, false)
    }
    const Language = () => {
        const { i18n } = useTranslation();

        const [selectedLanguage, setSelectedLanguage] = useState('English');



        const Save = () => {
            localStorage.setItem('lang', selectedLanguage);
            i18n.changeLanguage(selectedLanguage);
            toggleLanguage(selectedLanguage)
            document.documentElement.dir = selectedLanguage === 'Arabic' ? 'rtl' : 'ltr';
            window.location.reload();
        };

        useEffect(() => {
            if (localStorage.getItem('lang') == 'Arabic')
                setSelectedLanguage('Arabic')
        }, [])
        return (
            <>
                <div className='flex gap-3'>
                    <div onClick={() => setOpened(0)} className='rounded-full header-border min-w-14 size-14 flex justify-center items-center cursor-pointer'>
                        <Icon className="text-xl" name={'x-icon'} />
                    </div>
                    <span className='flex justify-center items-center rounded-full header-border px-7 h-14 text-lg font-medium'>{t('Language')}</span>
                </div>
                <div className="flex flex-col gap-5 mt-6">
                    <div className="flex justify-between items-center cursor-pointer " onClick={() => setSelectedLanguage('Arabic')}>
                        <span>{t('Arabic')}</span>
                        {selectedLanguage === 'Arabic' && (
                            <div className="flex justify-between items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                                    <path d="M1 4.63636L7.22222 11L17 1" stroke="#4F5E7B" strokeWidth="2" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="opacity-15 bg-black h-[1px]" />
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setSelectedLanguage('English')}>
                        <span>{t('English')}</span>
                        {selectedLanguage === 'English' && (
                            <div className="flex justify-between items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                                    <path d="M1 4.63636L7.22222 11L17 1" stroke="#4F5E7B" strokeWidth="2" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
                <Button className="w-full mb-7 mt-7" shadow={true} onClick={() => Save()}>
                    {t('Save')}
                </Button>
            </>
        );
    }

    const Main = ({ }) => (
        <>
            {isLogin &&
                [
                    {
                        img: 'mode-icon.svg',
                        name: 'Dark mode',
                        login: false,
                        action: <Switch id={"dark_mode"} value={isDark} onSwitchChange={() => { toggle() }} />,
                    },
                    {
                        img: 'power-icon.svg',
                        name: 'Instant projects',
                        login: false,
                        subName: 'short delivery time, More money',
                        action: <Switch id="instant_projects" loading={updateProfile_respond?.loading} onSwitchChange={updateInstantState} value={instantLocal} />,
                    },
                    {
                        img: 'money-sent.svg',
                        name: 'Money Sent',
                        action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"}  />,
                        onClick: () => setOpened(3)
                    },
                    {
                        img: 'money-receive.svg',
                        name: 'Money Received',
                        action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"}  />,
                        onClick: () => setOpened(4)
                    },
                    {
                        img: 'world-icon.svg',
                        name: 'Language',
                        login: false,
                        action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"} />,
                        onClick: () => setOpened(2)
                    },
                    {
                        img: 'number-icon.svg',
                        name: 'Change number',
                        login: false,
                        action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"} />,
                        onClick: () => router.push("/changePhoneNumber")
                    },
                    {
                        img: 'lock-icon.svg',
                        name: 'Change password',
                        isLogin: true,
                        action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"} />,
                        onClick: () => router.push("/changepassword")
                    },
                    {
                        img: 'chat-icon.svg',
                        name: 'Let’s connect',
                        login: false,
                        action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"} />,
                        onClick: () => router.push("/contact_us")
                    },
                    {
                        img: 'delete-icon.svg',
                        name: 'Delete Account',
                        login: true,
                        color: 'text-[#eb1a40]',
                        action: '',
                        onClick: () => OpenPopUp('delete-popup-account')
                    },
                    // {
                    //     img: 'about-icon.svg',
                    //     name: 'About',
                    //     action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"}  />,
                    // },

                ].map((e, i) => (
                    <div onClick={e.onClick} className="flex items-center py-3 gap-4 cursor-pointer" key={i}>
                        <img icon='icon' className="icon size-6" src={`/assets/imgs/theme/${e.img}`} />
                        <span className={`text-[12px] ${e.color ? e.color : 'text-[#4F5E7B]'} w-full font-semibold`}>{t(e.name)}</span>
                        <div className="action rtl:rotate-180 flex items-center"> {e.action} </div>
                    </div>
                ))
            }
            {!isLogin && 
                            [
                                {
                                    img: 'mode-icon.svg',
                                    name: 'Dark mode',
                                    login: false,
                                    action: <Switch value={isDark} onSwitchChange={() => { toggle() }} />,
                                },
                                
                                // {
                                //     img: 'notification-icon.svg',
                                //     name: 'Notification',
                                //     action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"}  />,
                                // },
                                {
                                    img: 'world-icon.svg',
                                    name: 'Language',
                                    login: false,
                                    action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"} />,
                                    onClick: () => setOpened(2)
                                },
                                {
                                    img: 'chat-icon.svg',
                                    name: 'Let’s connect',
                                    login: true,
                                    action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"} />,
                                    onClick: () => router.push("/contact_us")
                                },
                                // {
                                //     img: 'about-icon.svg',
                                //     name: 'About',
                                //     action: <Icon className="text-[#4F5E7B] opacity-40 w-2" name={"angle-right"}  />,
                                // },
            
                            ].map((e, i) => (
                                <div onClick={e.onClick} className="flex py-3 gap-4 cursor-pointer" key={i}>
                                    <img icon='icon' className="icon size-6" src={`/assets/imgs/theme/${e.img}`} />
                                    <span className="text-[12px] text-[#4F5E7B] w-full font-semibold">{t(e.name)}</span>
                                    <div className="action rtl:rotate-180"> {e.action} </div>
                                </div>
                            ))            
            }
            {isLogin && 
            <div onClick={() => LogOut().then(()=> onChoose && onChoose())} className="flex py-4 gap-4 text-red-950 cursor-pointer">
                <img icon='icon' className="icon size-6" src={`/assets/imgs/theme/logout-icon.svg`} />
                <p className="text-[12px] w-full font-semibold text-red-500"> {t('Logout')} </p>
            </div>
            }
        </>
    )

    // On desktop, hide unless one of the allowed setting popups is open
    if ((getheaderpopup !== Types.SHOWSETTING && getheaderpopup !== Types.SHOWMONEYSEND && getheaderpopup !== Types.SHOWMONEYRECEIVE) && !isMob) return null;
    const handleTransactionClick = (transaction , isRefunded = true) => {
        setSelectedTransaction(transaction);
        setIsRefunded(isRefunded);
        OpenPopUp('transaction-details')
    };

    const closeDetails = () => {
        setSelectedTransaction(null);
        ClosePopUp('transaction-details')
    };

    return (
        <>
        <TransactionDetails info={selectedTransaction} id={selectedTransaction?._id}  onClick={closeDetails} isRefunded={isRefunded}/>
        <div className={isMob ? "" : "cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown active"}>
            <div className={isMob ? "" : "dialog flex flex-col"}>
                <div className={"overflow-y-scroll rounded-b-[60px] p-3"}>
                    <div className={`p-6 sm:bg-white sm:dark:bg-[#1A2024] w-full ${open === 3 || open === 4 ? 'lg:w-96' : 'lg:w-72'} rounded-[45px]`}>
                        {open === 0 && <Main />}
                        {open === 1 && <ContactUs setOpened={setOpened} />}
                        {open === 2 && <Language />}
                        {open === 3 && <SendMoney handleTransactionClick={(transaction) => handleTransactionClick(transaction, false)} setOpened={setOpened} />}
                        {open === 4 && <ReceiveMoney handleTransactionClick={(transaction) => handleTransactionClick(transaction, true)} setOpened={setOpened} />}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}


const mapStateToProps = (state) => ({
    isDark: state.setting.ISDARK,
    language: state.setting.LANGUAGE,
    getheaderpopup: state.setting.headerpopup,
    logout_respond: state.api.LogOut,
    updateProfile_respond: state.api.updateProfile,
    isLogin: state.auth.login,
    user: state.auth.user,
});

const mapDispatchToProps = {
    toggleDarkMode,
    toggleLanguage,
    LogOut,
    updateProfile,

};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
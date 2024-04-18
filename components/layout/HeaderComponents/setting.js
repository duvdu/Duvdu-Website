import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Switch from '../../elements/switcher'
import Icon from "../../Icons";
import Button from '../../elements/button';
import { useTranslation } from 'react-i18next';
import { toggleDarkMode, toggleLanguage } from "../../../redux/action/setting";
import { logout } from "../../../redux/action/auth";
import * as Types from '../../../redux/constants/actionTypes'


function Setting({ isDark, toggleDarkMode, toggleLanguage, logout, getheaderpopup, language }) {
    const { t } = useTranslation();

    const [open, setOpened] = useState(0);

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

        // window.location.reload();
    }

    const ContactUs = () => (
        <>
            <div className='flex gap-3 z-50'>
                <div onClick={() => setOpened(0)} className='rounded-full header-border h-14 w-14 flex justify-center items-center cursor-pointer'>
                    <Icon className="text-xl size-5" name={'xmark'} useinvert={true} />
                </div>
                <span className='flex justify-center items-center rounded-full header-border px-7 h-14 text-lg font-medium'>
                    {t('contact us')}
                </span>
            </div>
            <div className="capitalize opacity-60 mt-8">{t('your message')}</div>
            <textarea placeholder="start typing..." className="bg-[#9999991A] rounded-3xl h-48 border-none mt-5" />
            <Button className="w-full mb-7 mt-7" shadow={true}>
                {t('Send')}

            </Button>
        </>
    )
    const Language = () => {
        const { i18n } = useTranslation();

        const [selectedLanguage, setSelectedLanguage] = useState('English');



        const Save = () => {
            localStorage.setItem('lang', selectedLanguage);
            i18n.changeLanguage(selectedLanguage);
            toggleLanguage(selectedLanguage)
            document.documentElement.dir = selectedLanguage === 'Arabic' ? 'rtl' : 'ltr';
            // window.location.reload();
        };

        useEffect(() => {
            if (localStorage.getItem('lang') == 'Arabic')
                setSelectedLanguage('Arabic')
        }, [])
        return (
            <>
                <div className='flex gap-3'>
                    <div onClick={() => setOpened(0)} className='rounded-full header-border min-w-14 size-14 flex justify-center items-center cursor-pointer'>
                        <Icon className="text-xl" name={'x-icon'} useinvert={true} />
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
            {
                [
                    {
                        img: 'mode-icon.svg',
                        name: 'Dark mode',
                        action: <Switch defaultValue={isDark} onSwitchChange={() => { toggle() }} />,
                    },
                    {
                        img: 'power-icon.svg',
                        name: 'Instant projects',
                        subName: 'short delivery time, More money',
                        action: <Switch onSwitchChange={() => { }} />,
                    },
                    {
                        img: 'notification-icon.svg',
                        name: 'Notification',
                        action: <Icon className="text-[#4F5E7B] opacity-40" name={"angle-right"} invert={true} />,
                    },
                    {
                        img: 'world-icon.svg',
                        name: 'Language',
                        action: <Icon className="text-[#4F5E7B] opacity-40" name={"angle-right"} invert={true} />,
                        onClick: () => setOpened(2)
                    },
                    {
                        img: 'number-icon.svg',
                        name: 'Change number',
                        action: <a href="/changePhoneNumber"> <Icon className="text-[#4F5E7B] opacity-40" name={"angle-right"} invert={true} /></a>,
                    },
                    {
                        img: 'lock-icon.svg',
                        name: 'Terms & Conditions',
                        action: <Icon className="text-[#4F5E7B] opacity-40" name={"angle-right"} invert={true} />,
                    },
                    {
                        img: 'chat-icon.svg',
                        name: 'Contact Us',
                        action: <Icon className="text-[#4F5E7B] opacity-40" name={"angle-right"} />,
                        onClick: () => setOpened(1)
                    },
                    {
                        img: 'about-icon.svg',
                        name: 'About',
                        action: <Icon className="text-[#4F5E7B] opacity-40" name={"angle-right"} invert={true} />,
                    },

                ].map((e, i) => (
                    <div onClick={e.onClick} className="flex py-3 gap-4 cursor-pointer" key={i}>
                        <img icon='icon' className="icon size-6" src={`/assets/imgs/theme/${e.img}`} />
                        <span className="text-[12px] text-[#4F5E7B] w-full font-semibold">{t(e.name)}</span>
                        <div className="action rtl:rotate-180"> {e.action} </div>
                    </div>
                ))
            }
            <div onClick={() => logout()} className="flex py-4 gap-4 text-red-950 cursor-pointer">
                <img icon='icon' className="icon size-6" src={`/assets/imgs/theme/logout-icon.svg`} />
                <p className="text-[12px] w-full font-semibold text-red-500"> {t('Logout')} </p>
            </div>
        </>
    )


    return (
        <div className={"cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown" + (getheaderpopup == Types.SHOWSETTING ? " active" : "")}  >
            <div className="dialog flex flex-col">
                <div className="overflow-y-scroll rounded-b-[60px] p-3">
                    <div className="p-6 bg-white dark:bg-[#1A2024] w-72 rounded-[45px]" >
                        {open == 0 && <Main />}
                        {open == 1 && <ContactUs />}
                        {open == 2 && <Language />}
                        {/* <Main /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isDark: state.setting.ISDARK,
    language: state.setting.LANGUAGE,
    getheaderpopup: state.setting.headerpopup,

});

const mapDispatchToProps = {
    toggleDarkMode,
    toggleLanguage,
    logout,

};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
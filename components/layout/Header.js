import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../elements/Search";
import Menu from '../elements/menu'
import Icon from "../Icons";
import { useTranslation } from 'react-i18next';
import { toggleDarkMode, headerPopUp } from "../../redux/action/setting";
import MessageAndNotofication from "./HeaderComponents/messageAndNotofication";
import Profile from "./HeaderComponents/Profile";
import Setting from "./HeaderComponents/setting";
import { login, logout } from "../../redux/action/auth";
import * as Types from "../../redux/constants/actionTypes";
import { login as setlogin } from "../../redux/action/apis/auth/signin/signin";
import { getMyprofile } from "../../redux/action/apis/auth/profile/getProfile";
import PopUp from "../elements/addMyprofile";
import { errorConvertedMessage } from "../../util/util";
import Popup from "../elements/popup";

// toggleDarkMode

const Header = ({
    api,
    fromlayout,
    toggleClick,
    isDark,
    islogin,
    headerPopUp,
    getheaderpopup,
    toggleDarkMode,
    setlogin,
    getMyprofile }) => {

    const { i18n, t } = useTranslation();

    if (api.error && JSON.parse(api.error).status == 423) {
        logout()
    }

    useEffect(() => {
        getMyprofile()
    }, []);

    useEffect(() => {

        var root = document.documentElement;

        i18n.changeLanguage(localStorage.getItem('lang') == 'Arabic' ? 'Arabic' : 'English');

        function getHeaderHeight() {
            try {
                var header = document.getElementsByTagName('header')[0];
                var headerHeight = header.offsetHeight;
                root.style.setProperty('--header-height', headerHeight + 'px');
                root.style.setProperty('--body-height', (window.innerHeight - headerHeight) + 'px');
            }
            catch (err) {
            }
        }

        const timeoutId = setTimeout(() => {
            getHeaderHeight();
        }, 50);

        window.addEventListener('resize', getHeaderHeight);


        if (fromlayout.iswhite)
            root.style.setProperty('--body-background', 'white');
        else
            root.style.setProperty('--body-background', '#f8f4f4');
    }, [islogin]);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        toggleDarkMode(isDarkMode)
        const body = document.body;
        if (isDarkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }

        document.documentElement.dir = localStorage.getItem('lang') == 'Arabic' ? 'rtl' : 'ltr';


        const dismissPopupOnEsc = (event) => {
            if (event.key === 'Escape') {
                headerPopUp(Types.NONEPOPUP)
            }
        };

        document.addEventListener('keydown', dismissPopupOnEsc);

    }, []);
    
    return (
        <>
            {
                api.loading &&
                <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                    <img src="/assets/imgs/theme/loading-icon.png" />
                </div>
            }
            {
                process.env.NODE_ENV != "production" &&
                <button onClick={() => setlogin({ username: "ahmed_magdy", password: "Ahmed!123" })} className="mx-5">
                    login
                </button>
            }
            {
                process.env.NODE_ENV != "production" &&
                <button onClick={() => getMyprofile()} >
                    getMyprofile
                </button>
            }

            {
                api.error &&
                <Popup className="show">
                    <div className="h-20 flex flex-col justify-center">

                    <span className="m-10">
                        {errorConvertedMessage(api.error)}
                    </span>
                    </div>
                </Popup>
            }
            <div onClick={() => headerPopUp(Types.NONEPOPUP)} className={`w-full h-full bg-black transition-opacity ${(getheaderpopup != Types.NONEPOPUP) ? 'opacity-60 visible' : 'opacity-0 invisible'} 
            left-0 right-0 fixed z-10`} />
            <header className={`bg-DS_white w-full z-10 ${fromlayout.iSsticky ? "sticky top-0" : ""}`}>
                <div className="py-3 hidden lg:block">
                    <div className="container">
                        <div className="header-wrap">

                            <div className="logo logo-width-1 mr-12">
                                {
                                    <a href="/">
                                        <img
                                            src={isDark ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                            className="min-h-9"
                                            alt="main logo"
                                        />
                                    </a>

                                }
                            </div>

                            <div className="header-right">
                                {fromlayout.showTabs && islogin
                                    &&
                                    <div className="header-tabs">

                                        <a href="/dashboard">
                                            <Icon name={"dashboard"} useinvert={true} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                            <span className="text-nowrap">
                                                {t('dashboard')}
                                            </span>
                                        </a>


                                        <a href="/contracts">
                                            <Icon name={"contracts"} useinvert={true} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                            <span>
                                                {t('contracts')}
                                            </span>
                                        </a>

                                        <a href="/teams" className="capitalize whitespace-nowrap">
                                            <Icon name={"teams"} useinvert={true} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                            <span>
                                                {t('team projects')}

                                            </span>
                                        </a>

                                    </div>
                                }

                                <div className="search-style-2 flex justify-end">
                                    <Search />
                                </div>
                                <div className="hidden lg:flex min-w-max">
                                    {
                                        islogin &&
                                        <div className="header-action-2 flex items-center ">
                                            <div className="header-action-icon-2 z-10" >
                                                <div className="icon-holder cursor-pointer" onClick={() => headerPopUp(getheaderpopup != Types.SHOWNOTOFICATION ? Types.SHOWNOTOFICATION : Types.NONEPOPUP)}>
                                                    <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">3</span>
                                                    <Icon className={"dark:text-[#B3B3B3] "} name={"bell"} type="far" />
                                                </div>
                                                <MessageAndNotofication />
                                            </div>
                                            <div className="header-action-icon-2 mx-6 z-50"  >
                                                <div className="icon-holder cursor-pointer" onClick={() => headerPopUp(getheaderpopup != Types.SHOWSETTING ? Types.SHOWSETTING : Types.NONEPOPUP)}>
                                                    <Icon className={"dark:text-[#B3B3B3]"} name={"gear"} useinvert={true} />
                                                </div>
                                                <Setting />
                                            </div>
                                            <div className="header-action-icon-2"  >
                                                <div className="icon-holder cursor-pointer" onClick={() => headerPopUp(getheaderpopup != Types.SHOWPROFILE ? Types.SHOWPROFILE : Types.NONEPOPUP)}>
                                                    <div className="flex justify-center items-center h-[18px]">
                                                        <div className="border border-[#B3B3B3] rounded-full p-2">
                                                            <Icon className={"dark:text-[#B3B3B3] "} name={"user"} type="far" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Profile />
                                            </div>
                                        </div>
                                    }
                                    {
                                        !islogin &&
                                        <div className="header-action-2 flex gap-6 items-center">
                                            <a href="/login" className="text-sm font-semibold capitalize hover:text-hover_primary">{t('log-in')}</a>
                                            <a href="/register" className="px-5 py-2 rounded-full bg-primary hover:bg-hover_primary text-sm text-white font-semibold capitalize">{t('register')}</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"border-borderColor header-bottom-bg-color py-2 lg:py-0 " + (!fromlayout.shortheader ? " border-y" : "")}>
                    <div className="container">
                        <div className="header-wrap header-space-between relative">
                            <div className="logo block lg:hidden w-full">
                                <a href="/">
                                    <img
                                        src={isDark ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                        alt="main logo"
                                    />
                                </a>
                            </div>
                            {
                                !fromlayout.shortheader &&
                                <div className="header-nav w-full">
                                    <div className="main-menu main-menu-lh-2 font-heading hidden lg:block">
                                        <nav>
                                            <Menu />
                                        </nav>
                                    </div>
                                </div>
                            }
                            <div className="flex lg:hidden items-center justify-center gap-2">
                                <div className="p-3 rounded-full border border-[#C6C8C9] cursor-pointer " onClick={() => toggleClick(3)}>
                                    <Icon className="size-6 flex items-center justify-center" name={'search-menu'} />
                                </div>
                                <div className="p-3 rounded-full border border-[#C6C8C9] cursor-pointer " onClick={() => toggleClick(2)}>
                                    <Icon className="size-6 flex items-center justify-center" name={'burger-menu'} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

        </>
    );
};



const mapStateToProps = (state) => ({
    isDark: state.setting.ISDARK,
    getheaderpopup: state.setting.headerpopup,
    islogin: state.auth.login,

    api: state.api,
});

const mapDispatchToProps = {
    toggleDarkMode,
    headerPopUp,
    setlogin,
    getMyprofile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
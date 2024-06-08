import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../elements/Search";
import Menu from '../elements/menu'
import Icon from "../Icons";
import { useTranslation } from 'react-i18next';
import { toggleDarkMode, SetheaderPopUp } from "../../redux/action/setting";
import MessageAndNotofication from "./HeaderComponents/messageAndNotofication";
import Profile from "./HeaderComponents/Profile";
import Setting from "./HeaderComponents/setting";
import { verify } from "../../redux/action/auth";
import * as Types from "../../redux/constants/actionTypes";
import { OpenPopUp, errorConvertedMessage, exclude_error, exclude_loading, noScroll } from "../../util/util";
import { MarkNotificationsAsRead } from "../../redux/action/apis/realTime/notification/markasread";
import Verify_acount from "../popsup/verify_account_now";
import Chat from "../elements/chat";
import Link from "next/link";
import ErrorPopUp from "../popsup/errorPopUp";
import { LogOut } from "../../redux/action/apis/auth/logout";
import { useRouter } from "next/router";
import auth from "../../redux/reducer/auth";


// toggleDarkMode

const Header = ({
    api,
    fromlayout,
    toggleClick,
    isDark,
    islogin,
    SetheaderPopUp,
    getheaderpopup,
    toggleDarkMode,
    MarkNotificationsAsRead,
    LogOut,
    user,
    verify }) => {

    const router = useRouter();
    const { i18n, t } = useTranslation();
    if (api.error && JSON.parse(api.error).status == 423) {
        LogOut()
    }
    useEffect(() => {
        SetheaderPopUp(Types.NONEPOPUP)
    }, [router.events]);
console.log(getheaderpopup)
    useEffect(() => {
        noScroll(getheaderpopup != Types.NONEPOPUP)
    }, [getheaderpopup]);

    useEffect(() => {
        if (getheaderpopup == Types.SHOWNOTOFICATION) {
            MarkNotificationsAsRead()
        }
    }, [getheaderpopup]);



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
                SetheaderPopUp(Types.NONEPOPUP)
            }
        };

        document.addEventListener('keydown', dismissPopupOnEsc);

    }, []);
    const clearErrors = () => {
        setrrorMsg(null)
        setrrorReq(null)
    }
    const [errorMsg, setrrorMsg] = useState(null)
    const [errorReq, setrrorReq] = useState(null)
    useEffect(() => {

        if (api.error && !exclude_error(api.req)) {
            setrrorMsg(errorConvertedMessage(api.error))
            setrrorReq(api.req)
        }
    }, [api.error && !exclude_error(api.req)]);

    useEffect(() => {
        if (errorMsg && errorReq)
            OpenPopUp('main_error_message')
    }, [errorMsg && errorReq]);

    const totalUnreadMessages = api?.GetAllChats?.data?.reduce((total, item) => total + item.unreadMessageCount, 0) || 0;
    const totalUnwatchedNotification = api?.GetNotifications?.data?.filter(message => !message.watched).length;
    const totalNews = totalUnreadMessages + totalUnwatchedNotification

    return (
        <>
            <Chat />
            <ErrorPopUp id="main_error_message" onCancel={clearErrors} errorReq={errorReq} errorMsg={errorMsg} />
            {
                api.loading && !exclude_loading(api.req) &&
                <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                    <img src="/assets/imgs/theme/loading-icon.png" />
                </div>
            }
            <Verify_acount />
            <div onClick={() => SetheaderPopUp(Types.NONEPOPUP)} className={`w-full h-full bg-black transition-opacity ${(getheaderpopup != Types.NONEPOPUP) ? 'opacity-60 visible' : 'opacity-0 invisible'} 
            left-0 right-0 fixed z-10`} />
            {
                islogin != null &&
                <header className={`bg-DS_white w-full z-10 ${fromlayout.iSsticky ? "sticky top-0" : ""}`}>
                    <div className="py-3 hidden lg:block">
                        <div className="container">
                            <div className="header-wrap">
                                <div className="logo logo-width-1 mr-12 cursor-pointer">
                                    <Link href="/">
                                        <img
                                            src={isDark ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                            className="min-h-9 cursor-pointer"
                                            alt="main logo"
                                        />
                                    </Link>
                                </div>
                                <div className="header-right">
                                    {fromlayout.showTabs && islogin &&
                                        <div className="header-tabs">

                                            <Link href="/dashboard">
                                                <div className="header-link">
                                                    <Icon name={"dashboard"} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                                    <span className="text-nowrap">
                                                        {t('dashboard')}
                                                    </span>
                                                </div>
                                            </Link>


                                            <Link href="/contracts">
                                                <div className="header-link">
                                                    <Icon name={"contracts"} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                                    <span>
                                                        {t('contracts')}
                                                    </span>
                                                </div>
                                            </Link>

                                            <Link href="/teams" className="capitalize">
                                                <div className="header-link whitespace-nowrap">
                                                    <Icon name={"teams"} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                                    <span>
                                                        {t('team projects')}
                                                    </span>
                                                </div>
                                            </Link>

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
                                                    <div className="icon-holder cursor-pointer" onClick={() =>
                                                        SetheaderPopUp(getheaderpopup != Types.SHOWNOTOFICATION ? Types.SHOWNOTOFICATION : Types.NONEPOPUP)

                                                    }>
                                                        {totalNews > 0 &&
                                                            <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">{totalNews}</span>
                                                        }
                                                        <Icon className={"dark:text-[#B3B3B3] "} name={"bell"} type="far" />
                                                    </div>
                                                    <MessageAndNotofication />
                                                </div>
                                                <div className="header-action-icon-2 mx-6 z-50"  >
                                                    <div className="icon-holder cursor-pointer" onClick={() => SetheaderPopUp(getheaderpopup != Types.SHOWSETTING ? Types.SHOWSETTING : Types.NONEPOPUP)}>
                                                        <Icon className={"dark:text-[#B3B3B3]"} name={"gear"} />
                                                    </div>
                                                    <Setting />
                                                </div>
                                                <div className="header-action-icon-2"  >
                                                    <div className="icon-holder cursor-pointer" onClick={() => SetheaderPopUp(getheaderpopup != Types.SHOWPROFILE ? Types.SHOWPROFILE : Types.NONEPOPUP)}>
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
                                                <Link href="/login">
                                                    <div className="cursor-pointer text-sm font-semibold capitalize hover:text-hover_primary">{t('log-in')}</div>
                                                </Link>
                                                <Link href="/register">
                                                    <div className="cursor-pointer px-5 py-2 rounded-full bg-primary hover:bg-hover_primary text-sm text-white font-semibold capitalize">{t('register')}</div>
                                                </Link>
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
                                    <Link href="/">
                                        <div className="cursor-pointer">
                                            <img
                                                src={isDark ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                                alt="main logo"
                                            />
                                        </div>
                                    </Link>
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
                </header>}

        </>
    );
};



const mapStateToProps = (state) => ({
    isDark: state.setting.ISDARK,
    getheaderpopup: state.setting.headerpopup,
    islogin: state.auth.login,
    api: state.api,
    error: state.errors,
    user: state.auth.user,
});

const mapDispatchToProps = {
    toggleDarkMode,
    SetheaderPopUp,
    MarkNotificationsAsRead,
    LogOut,
    verify
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
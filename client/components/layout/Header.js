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
import * as Types from "../../redux/constants/actionTypes";
import { OpenPopUp, errorConvertedMessage, exclude_error, exclude_loading, noScroll } from "../../util/util";
import { MarkNotificationsAsRead } from "../../redux/action/apis/realTime/notification/markasread";
import { GetNotifications } from "../../redux/action/apis/realTime/notification/getAllNotification";
import { UnReadNotification } from "../../redux/action/apis/realTime/notification/unread";
import { GetAllChats } from "../../redux/action/apis/realTime/chat/chats";
import { AvailableUserChat } from "../../redux/action/apis/realTime/messages/availableUserChat";
import { GetBoards } from "../../redux/action/apis/bookmarks/bookmark/get";
import { GetFavList } from "../../redux/action/apis/bookmarks/fav/getAll";
import { getMyprofile } from "../../redux/action/apis/auth/profile/getProfile";
import { GetAllMessageInChat } from "../../redux/action/apis/realTime/messages/getAllMessageInChat";
import Link from "next/link";
import ErrorPopUp from "../popsup/errorPopUp";
import { LogOut } from "../../redux/action/apis/auth/logout";
import { useRouter } from "next/router";
import auth from "../../redux/reducer/auth";
import { useSocket } from "../../util/socketContext";


// toggleDarkMode

const CustomToast = ({ toast ,goToMessage , type, CloseToast }) => {
    useEffect(() => {
        // Set a timer to close the toast after 5 seconds
        if(CloseToast) {
            const timer = setTimeout(() => {
                CloseToast();
            }, 5000);
    
            // Cleanup timer when the component unmounts
            return () => clearTimeout(timer);
        }
    }, [CloseToast]);
    const handleGoMessage=()=>{
        if(toast.type='message')
            goToMessage()
        CloseToast()
    }
    return (    
        <div
        className={`transition ${toast ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full d-none'} cursor-pointer duration-700 ease-in-out max-w-md w-full bg-white dark:bg-[#1A2024] z-[500000] fixed top-5 end-5 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div onClick={handleGoMessage} className="flex items-start">
                    {toast?.image &&
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={toast?.image}
                            alt=""
                        />
                    </div>
                    }
                    <div className="ms-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {toast?.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                            {toast?.message}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200 dark:border-gray-700">
                <button
                    onClick={CloseToast}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const Header = ({
    api,
    fromlayout,
    toggleClick,
    isDark,
    isLogin,
    SetheaderPopUp,
    getheaderpopup,
    toggleDarkMode,
    MarkNotificationsAsRead,
    GetNotifications,
    UnReadNotification,
    UnReadNotification_respond,
    GetAllMessageInChat,
    GetAllChats_respond,
    GetNotifications_respond,
    GetAllChats,
    AvailableUserChat,
    LogOut,
    GetBoards,
    getMyprofile,
    GetFavList,
    GetFavList_respond,
    GetBoards_respond,
    user,
}) => {
    const { i18n, t } = useTranslation();
    const { socket, notifications, newMessages, unreadCount, resetUnreadCount } = useSocket();

    const [width, setWidth] = useState(0);
    const [countUnRead, setCountUnRead] = useState(0);
    const [toast, setToast] = useState(null);

    if (api.error && JSON.parse(api.error).status == 423) {
        LogOut()
    }
    try {
        useEffect(() => {
            SetheaderPopUp(Types.NONEPOPUP)
        }, [window.location.href]);
    }
    catch (error) {

    }
    useEffect(() => {
        noScroll(getheaderpopup != Types.NONEPOPUP)
    }, [getheaderpopup]);
    useEffect(()=>{
        if(isLogin===true)
            UnReadNotification()
    },[isLogin])
    useEffect(()=>{
        if(UnReadNotification_respond?.data?.count)
            setCountUnRead(UnReadNotification_respond?.data?.count)
    },[UnReadNotification_respond?.data?.count])
    
    useEffect(() => {
        if (getheaderpopup == Types.SHOWNOTOFICATION) {
            MarkNotificationsAsRead().then(()=>{
                if(isLogin===true)
                    UnReadNotification()
            })
            GetNotifications()
            // if(!GetAllChats_respond?.data){
            AvailableUserChat()
            GetAllChats()
            // }
        }
        if(getheaderpopup===Types.SHOWPROFILE){
            if (!GetBoards_respond)
                GetBoards({})
        }
        if(getheaderpopup===Types.SHOWPROFILE){
            if(isLogin===true)
                getMyprofile()
        }
    }, [getheaderpopup , isLogin]);

    useEffect(() => {
        if (socket) {
            // Listen for notification events
            socket.on('notification', (data) => {
                setCountUnRead((prev) => prev + 1);
                setToast({
                    type: 'notification',
                    id: data.data.sourceUser._id,
                    image: data.data.sourceUser.profileImage,
                    title: data.data.title,
                    message: data.data.message
                });
            });

            // Listen for new message events
            socket.on('new_message', (data) => {
                setCountUnRead((prev) => prev + 1);
                setToast({
                    type: 'message',
                    id: data.data.target,
                    image: data.data.sourceUser.profileImage,
                    title: data.data.sourceUser.name,
                    message: 'New message received'
                });
            });
        }
    }, [socket]);

    useEffect(() => {

        var root = document.documentElement;

        i18n.changeLanguage(localStorage.getItem('lang') == 'Arabic' ? 'Arabic' : 'English');

        function getHeaderHeight() {
            try {
                var header = document.getElementsByTagName('header')[0];
                var headerHeight = header.offsetHeight;
                root.style.setProperty('--header-height', headerHeight + 'px');
                root.style.setProperty('--header-height2', headerHeight+ 20 + 'px');
                root.style.setProperty('--body-height', (window.innerHeight - headerHeight) + 'px');
                root.style.setProperty('--drawer-height', (window.innerHeight - 160) + 'px');
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
    }, [isLogin]);

    useEffect(() => {
        const dark = localStorage.getItem('darkMode')
        if(!dark){
            localStorage.setItem('darkMode','true')
        }
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

    const totalUnreadMessages = GetAllChats_respond?.data?.reduce((total, item) => total + item.unreadMessageCount, 0) || 0;
    const totalUnwatchedNotification = GetNotifications_respond?.unWatchiedCount
    // .data?.filter(message => !message.watched).length;
    const totalNews = totalUnreadMessages + totalUnwatchedNotification


    return (
        <>
            {/* {toast &&  */}
                <CustomToast
                    goToMessage={()=>GetAllMessageInChat(toast.id)}
                    toast={toast}
                    type={toast?.type}
                    CloseToast={()=>setToast(null)}
                />
            {/* } */}
            <div onClick={() => SetheaderPopUp(Types.NONEPOPUP)} className={`w-full h-full bg-black transition-opacity ${(getheaderpopup != Types.NONEPOPUP) ? 'opacity-60 visible' : 'opacity-0 invisible'} 
            left-0 right-0 fixed z-20`} />
            {
                <header className={`bg-white dark:bg-[#1A2024] w-full !z-20 ${fromlayout.iSsticky ? "sticky top-0" : ""}`}>
                    <div className="py-3 hidden lg:block">
                        <div className="container">
                            <div className="header-wrap" >
                                <div className="logo logo-width-1 ltr:mr-12 rtl:ml-12 cursor-pointer">
                                    <Link href="/">
                                        <img
                                            src={isDark ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                            className="min-h-9 cursor-pointer"
                                            alt="main logo"
                                        />
                                    </Link>
                                </div>
                                <div className="header-right">
                                    {fromlayout.showTabs && isLogin === true &&
                                        <div className="header-tabs">
                                            <div className="">
                                                <Link href="/dashboard">
                                                    <div className="header-link">
                                                        <Icon name={"dashboard"} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                                        <span className="text-nowrap">
                                                            {t('Performance Hub')}
                                                        </span>
                                                    </div>
                                                </Link>

                                            </div>

                                            <Link href="/contracts">
                                                <div className="header-link">
                                                    <Icon name={"contracts"} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                                    <span>
                                                        {t('contracts')}
                                                    </span>
                                                </div>
                                            </Link>
                                            {/* <div className="">
                                                <Link href="/teams" className="capitalize">
                                                    <div className="header-link whitespace-nowrap">
                                                        <Icon name={"teams"} className="mx-1 text-[#666666] dark:text-[#B3B3B3]" />
                                                        <span>
                                                            {t('team projects')}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div> */}
                                        </div>
                                    }

                                    <div className="search-style-2 flex justify-end">
                                        <Search onSearch={() => toggleClick(1)} />
                                    </div>
                                    <div className="hidden lg:flex min-w-max">

                                        
                                            
                                            <div className="header-action-2 flex items-center ">
                                                {isLogin === true&&
                                                <div className="header-action-icon-2 z-10" >
                                                    <div className="icon-holder cursor-pointer" onClick={() =>
                                                        SetheaderPopUp(getheaderpopup != Types.SHOWNOTOFICATION ? Types.SHOWNOTOFICATION : Types.NONEPOPUP)

                                                    }>
                                                        {countUnRead > 0 &&
                                                            <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">{countUnRead}</span>
                                                        }
                                                        <Icon className={"dark:text-[#B3B3B3] "} name={"bell"} type="far" />
                                                    </div>
                                                    <MessageAndNotofication />
                                                </div>
                                                }
                                                
                                                <div className="header-action-icon-2 mx-6 z-50"  >
                                                    <div className="icon-holder cursor-pointer" onClick={() => SetheaderPopUp(getheaderpopup != Types.SHOWSETTING ? Types.SHOWSETTING : Types.NONEPOPUP)}>
                                                        <Icon className={"dark:text-[#B3B3B3]"} name={"gear"} />
                                                    </div>
                                                    <Setting />
                                                </div>
                                                {isLogin === true&&
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
                                                }
                                            </div>
                                        
                                        {
                                            isLogin === false &&
                                            <div className="header-action-2 flex gap-6 items-center">
                                                <Link href="/login">
                                                    <div className="cursor-pointer text-sm font-semibold capitalize hover:text-hover_primary">{t('Access your space')}</div>
                                                </Link>
                                                <Link href="/register">
                                                    <div className="cursor-pointer px-5 py-2 rounded-full bg-primary hover:bg-hover_primary text-sm text-white font-semibold capitalize">{t('Join Us')}</div>
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"border-borderColor header-bottom-bg-color pt-2 lg:py-0 " + (!fromlayout.shortheader ? " border-y" : "")}>
                        <div className="container">
                            <div className="header-wrap header-space-between pb-2 lg:pb-0 relative">
                                <div className="logo block lg:hidden w-full">
                                    <Link href="/">
                                        <div className="cursor-pointer">
                                            <img
                                                src={isDark ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                                className="min-w-32"
                                                alt="main logo"
                                            />
                                        </div>
                                    </Link>
                                </div>
                                {/* 1A2024 */}
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
                                    {isLogin === true &&
                                        <div className="p-3 size-[50px] rounded-full border border-[#C6C8C9] dark:border-[#FFFFFF33] cursor-pointer flex items-center justify-center" onClick={() => toggleClick(4)}>
                                            <div className='relative'>  
                                                    {countUnRead > 0 &&
                                                <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">{countUnRead}</span>
                                                }
                                                <Icon className="items-center justify-center" name={'bell'} />
                                            </div> 
                                        </div>}

                                    <div className="p-3 rounded-full border border-[#C6C8C9] dark:border-[#FFFFFF33] cursor-pointer " onClick={() => toggleClick(3)}>
                                        <Icon className="size-6 flex items-center justify-center dark:text-white" name={'search-menu'} />
                                    </div>
                                    <div className="p-3 rounded-full border border-[#C6C8C9] dark:border-[#FFFFFF33] cursor-pointer " onClick={() => toggleClick(2)}>
                                        <Icon className="size-6 flex items-center justify-center dark:text-white" name={'burger-menu'} />
                                    </div>
                                </div>
                            </div>
                            {
                                !fromlayout.shortheader &&
                                <div className="header-nav w-full">
                                    <div className="main-menu main-menu-lh-2 font-heading block lg:hidden">
                                        <nav>
                                            <Menu />
                                        </nav>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </header>}

        </>
    );
};



const mapStateToProps = (state) => ({
    isDark: state.setting.ISDARK,
    getheaderpopup: state.setting.headerpopup,
    isLogin: state.auth.login,
    GetAllChats_respond: state.api.GetAllChats,
    GetNotifications_respond:state.api.GetNotifications,
    UnReadNotification_respond:state.api.UnReadNotification,
    api: state.api,
    error: state.errors,
    user: state.auth.user,
    GetBoards_respond: state.api.GetBoards,
    GetFavList_respond: state.api.GetFavList,

});

const mapDispatchToProps = {
    toggleDarkMode,
    SetheaderPopUp,
    MarkNotificationsAsRead,
    UnReadNotification,
    GetNotifications,
    GetAllChats,
    AvailableUserChat,
    GetAllMessageInChat,
    LogOut,
    GetBoards,
    GetFavList,
    getMyprofile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
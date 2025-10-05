import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../Icons";
import headerMen from '../../public/static/header_content.json';
import Search from "../elements/SearchMobile";
import Menu from '../elements/menu';
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Notifications from "./HeaderComponents/notofications";
import Setting from "./HeaderComponents/setting";
import { useTranslation } from 'react-i18next';
import { GetAllChats } from "../../redux/action/apis/realTime/chat/chats";
import { AvailableUserChat } from "../../redux/action/apis/realTime/messages/availableUserChat";
import { MarkNotificationsAsRead } from "../../redux/action/apis/realTime/notification/markasread";
import { GetNotifications } from "../../redux/action/apis/realTime/notification/getAllNotification";
import * as Types from '../../redux/constants/actionTypes'
import FaceVerification from "../elements/FaceVerification";
import Subscription from "../elements/Subscription";
import { UnReadNotification } from "../../redux/action/apis/realTime/notification/unread";
import { IsPopUpOpen } from "../../util/util";
import Messages from "./HeaderComponents/messages";


const MobileMenu = ({ isToggled, toggleClick, categories, isLogin, user,fromlayout,
    MarkNotificationsAsRead,
    GetNotifications,
    GetAllChats,
    AvailableUserChat,
    UnReadNotification_respond,
    UnReadNotification
 }) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(isToggled);
    const [countUnRead, setCountUnRead] = useState({
        notificationsCount:0,
        messagesCount:0,
        count:0
    });
    const router = useRouter();
    useEffect(() => {

        if (isToggled != page) setPage(isToggled)
    }, [isToggled])
    useEffect(()=>{
        if(isLogin)
            UnReadNotification()
    },[isLogin])
    useEffect(()=>{
        if(UnReadNotification_respond?.data?.count)
            setCountUnRead(UnReadNotification_respond?.data)
    },[UnReadNotification_respond?.data?.count])
    useEffect(()=>{
        if(page ===4){
            MarkNotificationsAsRead().then(()=>{
                if(isLogin)
                    UnReadNotification()
            })
            GetNotifications({
                page: 1,
                limit: 10
            })
        }
        if(page ===6){
            MarkNotificationsAsRead().then(()=>{
                if(isLogin)
                    UnReadNotification()
            })
            AvailableUserChat()
            GetAllChats({
                page: 1,
                limit: 10
            })
        }
    },[page , isLogin])
    const togglePage = () => setPage(prev => prev == 2 ? 3 : 2)
    const Header = ({ onClose, toggleOpenSearch, openSearch }) => {
        const [isDarkMode, setIsDarkMode] = useState(true);
        useEffect(() => {
            isDarkMode = localStorage.getItem('darkMode') === 'true';
            setIsDarkMode(isDarkMode)
        }, [])

        return <div className="container">
            <div className="flex items-center py-2">
                <div className="flex justify-start w-full">
                    <Link href="/">
                        <a>
                            <img key={isDarkMode}
                                src={isDarkMode ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                className="w-32"
                                alt="main logo"
                            />
                        </a>
                    </Link>
                </div>


                <div className="flex items-center justify-center gap-2">

                    {isLogin === true &&
                        <div className="p-3 size-[50px] rounded-full border border-[#C6C8C9] dark:border-[#FFFFFF33] cursor-pointer flex items-center justify-center" onClick={() => setPage(6)}>
                           <div className='relative'>  
                            {countUnRead.messagesCount > 0 &&
                            <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">{countUnRead.messagesCount}</span>
                            }
                            <Icon className="items-center justify-center" name={'chat18'} />
                           </div> 
                        </div>}
                    {isLogin === true &&
                        <div className="p-3 size-[50px] rounded-full border border-[#C6C8C9] dark:border-[#FFFFFF33] cursor-pointer flex items-center justify-center" onClick={() => setPage(4)}>
                           <div className='relative'>  
                            {countUnRead.notificationsCount > 0 &&
                            <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">{countUnRead.notificationsCount}</span>
                            }
                            <Icon className="items-center justify-center" name={'bell'} />
                           </div> 
                        </div>}

                    <div className="p-3 rounded-full border border-[#C6C8C9] dark:border-[#FFFFFF33] cursor-pointer" onClick={toggleOpenSearch}>
                        <Icon className="size-6 flex items-center justify-center" name={openSearch == 2 ? 'search-menu' : 'burger-menu'} />
                    </div>
                    <div className="p-3 rounded-full border border-[#C6C8C9] dark:border-[#FFFFFF33] cursor-pointer" onClick={onClose}>
                        <Icon className="size-6 items-center justify-center" name={'x-icon'} />
                   </div>
               </div>
            </div>
        </div>
    }

    const SearchBody = () => <div className="h-body bg-[#F7F9FB] dark:bg-[#1A2024] " >
        <div className="p-5">
            <Search close={() => toggleClick()} />
        </div>
    </div>

    const Tabs2 = ({onClose}) => {    
        return (
            <div className="flex flex-col justify-center items-center gap-11 py-10 border-b dark:border-b-[#FFFFFF33]">
                   
                   {isLogin ? 
                    [
                        {
                            url: `/creative/${user?.username}`,
                            icon: 'user',
                            name: 'profile',
                        },
                        {
                            click: () => setPage(5),
                            icon: 'gear',
                            name: 'settings',
                        },
                    ].map(({ url, icon, name, click }, index) => (
                        url ? (
                            <Link key={`${name}-${index}`} href={url}>
                                <div onClick={onClose} className="flex gap-1 items-center cursor-pointer">
                                    <Icon className="text-[#666666] dark:text-[#B3B3B3]" name={icon} />
                                    <span className="text-base font-bold capitalize text-[#3E3E3E] dark:text-[#B3B3B3] leading-[1]">{t(name)}</span>
                                </div>
                            </Link>
                        ) : (
                            <div key={`${name}-${index}`} className="flex gap-1 items-center cursor-pointer" onClick={click}>
                                <Icon className="text-[#666666] dark:text-[#B3B3B3]" name={icon} />
                                <span className="text-base font-bold capitalize text-[#3E3E3E] dark:text-[#B3B3B3] leading-[1]">{t(name)}</span>
                            </div>
                        )
                    ))
                    :[
                        {
                            click: () => setPage(5),
                            icon: 'gear',
                            name: 'settings',
                        },
                    ].map(({ url, icon, name, click }, index) => (
                        url ? (
                            <Link key={`${name}-${index}`} href={url}>
                                <div onClick={onClose} className="flex gap-1 items-center cursor-pointer">
                                    <Icon className="text-[#666666] dark:text-[#B3B3B3]" name={icon} />
                                    <span className="text-base font-bold capitalize text-[#3E3E3E] dark:text-[#B3B3B3] leading-[1]">{t(name)}</span>
                                </div>
                            </Link>
                        ) : (
                            <div key={`${name}-${index}`} className="flex gap-1 items-center cursor-pointer" onClick={click}>
                                <Icon className="text-[#666666] dark:text-[#B3B3B3]" name={icon} />
                                <span className="text-base font-bold capitalize text-[#3E3E3E] dark:text-[#B3B3B3] leading-[1]">{t(name)}</span>
                            </div>
                        )
                    ))}
                
            </div>
        )
    }
    const Tabs = ({onClose}) => {
        return (
            <div className="flex flex-col justify-center items-center gap-11 py-10 border-b dark:border-b-[#FFFFFF33] border-t dark:border-t-[#FFFFFF33]">

                {
                    [
                        // {
                        //     url: '/dashboard',
                        //     icon: 'dashboard',
                        //     name: 'Performance Hub',
                        // },
                        {
                            url: '/contracts',
                            icon: 'contracts',
                            name: 'contracts',
                        },
                        // {
                        //     url: '/teams',
                        //     icon: 'teams',
                        //     name: 'team projects',
                        // },
                        {
                            url: '/saved',
                            icon: 'saved',
                            name: 'saved',
                        },
                    ].map((item, index) =>
                        <Link key={index} href={item.url}>
                            <div onClick={onClose} className="flex justify-center items-center cursor-pointer">
                                <Icon className="mx-1 text-[#666666] dark:text-[#B3B3B3]" name={item.icon} />
                                <span className="text-base font-bold capitalize text-[#3E3E3E] dark:text-[#B3B3B3]">{t(item.name)}</span>
                            </div>
                        </Link>
                    )
                }
            </div>
        )
    }
    const Menu = () => {
        const [openCategories, setOpenCategories] = useState(null);
        const [openSubCategories, setOpenSubCategories] = useState(null);

        const toggleCategory = (category) => {
            setOpenCategories(prev => prev === category ? null : category);

            setOpenSubCategories(null);
        };

        const toggleSubcategory = (subcategory) => {
            {
                setOpenSubCategories(prev => prev == subcategory ? null : subcategory)
            }
        };
        return (
            <ul>
                {categories?.data?.map((category, index) => {
                    const isOurStation = openCategories && openCategories.title === category.title; // Check for null
                    let h = 0;
                    let maxh = isOurStation ? category.subCategories.length * 64 + (openSubCategories ? openSubCategories.tags.length * 64 : 0) : 0

                    return (
                        <li key={index} className="cursor-pointer">
                            <div className="flex  w-full justify-between items-center p-5">
                                <div className="w-3" />
                                <Link href={`/${category.cycle}`}>
                                    <span className="text-[#4F5E7B] dark:text-[#B3B3B3] font-semibold text-sm" >
                                        {category.title}
                                    </span>
                                </Link>

                                <div className={`transition-all duration-300 ${isOurStation ? 'rotate-90' : 'rotate-0'}`} onClick={() => toggleCategory(category)}>
                                    <SpeficIcon name={`${isOurStation ? 'minus' : 'plus'}`} />
                                </div>
                            </div>
                            <ul className="transition-all duration-300 overflow-hidden"
                                style={{ maxHeight: maxh }}
                            >
                                {category.subCategories.map((subcategory, subIndex) => {

                                    const isOurStation = openSubCategories && openSubCategories.title === subcategory.title;

                                    return (
                                        <li key={subcategory.title} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleSubcategory(subcategory) }}>
                                            <div className="flex w-full bg-[#F7F9FB] dark:bg-transparent justify-between items-center p-5">
                                                <div className="text-[#4F5E7B] dark:text-[#B4BBC8] font-semibold text-sm">
                                                    {subcategory.title}
                                                </div>
                                                <Icon className={`text-[#B4BBC8] text-lg transform transition-all duration-300 ${isOurStation ? 'rotate-180' : ''}`} name={'angle-down-menu'} />
                                            </div>
                                            <ul className="transition-all duration-300 overflow-hidden"
                                                style={{ maxHeight: isOurStation ? subcategory.tags.length * 64 : 0 }}
                                            >
                                                {subcategory.tags.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="p-5 bg-[#E6E9ED] dark:bg-black">{item.title}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                }
                                )}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        );
    };


    const Auth = ({onClose}) =>
        <div className="flex px-5 gap-3 my-8 max-w-[470px] mx-auto">
            <Link href="/login">
                <div onClick={onClose} className="flex justify-center items-center w-full aspect-[3.1] rounded-full border border-[#00000033] text-primary text-sm font-semibold cursor-pointer">{t("log-in")}</div>
            </Link>
            <Link href="/register">
                <div onClick={onClose} className="flex justify-center items-center w-full aspect-[3.1] rounded-full bg-primary text-white font-semibold text-sm cursor-pointer">{t("register")}</div>
            </Link>
        </div>

    const DownLoadApp = () =>
        <div className="grad-card bg-gradient-to-b from-[#D5D5D5] dark:from-black to-transparent border-50 p-6 mx-5">
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-xl"> Get <span className="text-primary">{t("duvdu")}</span> on your mobile phone Now! </h3>
                <div className='flex items-center w-full gap-2'>
                    <a className='w-1/2 sm:w-1/3 rounded-lg'  href="https://play.google.com/store/apps/details?id=com.duvdu.duvdu_app" target="_blank">
                        <img src="/assets/imgs/theme/tab/android.png" />
                    </a>
                    <a className='w-1/2 sm:w-1/3 rounded-lg'  href="https://apps.apple.com/us/app/duvdu/id6743176883" target="_blank">
                        <img src="/assets/imgs/theme/tab/IOS.png" />
                    </a>
                </div>
            </div>
        </div>
    const SpeficIcon = ({ name }) => {
        return (
            <div className="size-4 flex justify-center items-center">
                <div className="relative">
                    <div className="-translate-x-[.85px] absolute top-0 left-0 w-[1.7px] h-[6px] bg-[#B4BBC8]"></div>    {/* top */}
                    <div className={`translate-y-[.85px] absolute bottom-0 left-0 h-[1.7px] w-[6px] transform transition-all duration-300 ${name === 'minus' ? "bg-transparent" : "bg-[#B4BBC8]"}`}></div>     {/* left */}

                    <div className="-translate-x-[.85px] absolute bottom-0 left-0 w-[1.7px] h-[6px] bg-[#B4BBC8]"></div> {/* bottom */}
                    <div className={`translate-y-[.85px] absolute bottom-0 right-0 h-[1.7px] w-[6px] transform transition-all duration-300 ${name === 'minus' ? "bg-transparent" : "bg-[#B4BBC8]"}`}></div>     {/* right */}
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (router.query) {
            const action = router.query.action
            if (action == "settings")
                setPage(5)
            else if (action == "notifications")
                setPage(4)
        }
    }, [router.query])


    return (
        <>
            <div
                className={
                    isToggled > 1
                        ? "mobile-header-active mobile-header-wrapper-style sidebar-visible bg-[#F7F9FB] dark:bg-[#1A2024]"
                        : "mobile-header-active mobile-header-wrapper-style"
                }
            >
                <div className="h-full scroll-w-0 scroll-m-0 overflow-y-scroll">

                    <Header onClose={() => toggleClick(1)} toggleOpenSearch={togglePage} openSearch={page} />
                    {page == 2 &&
                        <>
                            {
                                isLogin ===  true&&
                                <>
                                    <Tabs onClose={() => toggleClick(1)} />
                                </>
                                
                            }
                                <Tabs2 onClose={() => toggleClick(1)} />
                            <Menu />
                            {
                                isLogin ===  false&&
                                <Auth onClose={() => toggleClick(1)}/>
                            }
                        <div className='mx-5'>
                        <FaceVerification CloseProfile={() => toggleClick(1)} />
                        <Subscription CloseProfile={() => toggleClick(1)}/>
                        {isLogin && 
                        <div className="p-3 bg-white dark:bg-[#1A2024] rounded-[15px]">
                            <Link href={'/withdraw-methods'}>
                                <button className="flex items-center gap-3">
                                    <div className='rounded-md h-14 min-w-14 flex items-center justify-center'>
                                        <Icon className='w-[18px]' name="wallet" />
                                    </div>
                                    <p className="font-semibold"> {t('withdraw methods')}</p>
                                </button>
                            </Link>
                        </div>
                        }
                        </div>
                        <DownLoadApp />
                        </>
                    }
                    {page == 3 &&
                        <SearchBody />
                    }

                    {page == 4 &&
                        <Notifications onChoose={() => toggleClick(1)} />
                    }
                    {page == 6 &&
                        <Messages onChoose={() => toggleClick(1)} />
                    }

                    {page == 5 &&
                        <Setting onChoose={() => toggleClick(1)} />
                    }
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    categories: state.api.getCategory,
    isLogin: state.auth.login,
    user: state.user.profile,
    GetAllChats_respond: state.api.GetAllChats,
    UnReadNotification_respond: state.api.UnReadNotification,
    getheaderpopup: state.setting.headerpopup,

});

const mapDispatchToProps = {
    GetNotifications,
    GetAllChats,
    AvailableUserChat,
    UnReadNotification,
    MarkNotificationsAsRead,

};
export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
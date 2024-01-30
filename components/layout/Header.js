import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../elements/Search";
import Menu from '../elements/menu'
import Switch from '../elements/switcher'

const Header = ({
    fromlayout
}) => {
    const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(1);
    const [islogin, setIslogin] = useState(false);

    const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
    const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
    const [settingvisible, setSettingvisible] = useState(false);

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                // setScroll(scrollCheck);
            }
        });

        function getHeaderHeight() {
            var root = document.documentElement;
            var header = document.getElementsByTagName('header')[0];
            var headerHeight = header.offsetHeight+ (!fromlayout.shortlayout ? 44 : 0);
            
            root.style.setProperty('--header-height', headerHeight + 'px');
        }

        getHeaderHeight();

        window.addEventListener('resize', getHeaderHeight);

    }, []);


    const toggleNotificationDropdown = () => {
        falseall()
        setNotificationDropdownVisible(!notificationDropdownVisible);
    };

    const toggleProfileDropdown = () => {
        falseall()
        setProfileDropdownVisible(!profileDropdownVisible);
    };

    const toggleSettingDropdown = () => {
        falseall()
        setSettingvisible(!settingvisible);
    };

    const falseall = () => {
        setProfileDropdownVisible(false);
        setNotificationDropdownVisible(false);
        setSettingvisible(false);

    }

    // const handleToggle = () => setToggled(!isToggled);
    return (
        <>

            <div className={`w-full h-full bg-black transition-opacity ${(notificationDropdownVisible || profileDropdownVisible || settingvisible) ? 'opacity-60 visible' : 'opacity-0 invisible'} 
            left-0 right-0 fixed z-10`} />
            <header className={scroll ? "header-area header-style-1 header-height-2 sticky-bar stick" : "header-area header-style-1 header-height-2 sticky-bar"}>
                <div className="header-middle header-middle-ptb-1 hidden lg:block">
                    <div className="container">
                        <div className="header-wrap">
                            <div className="logo logo-width-1 mr-16">
                                <Link href="/">
                                    <a>
                                        <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                                    </a>
                                </Link>
                            </div>
                            <div className="header-right">
                                <div className="header-tabs">
                                    <Link href="/dashboard">
                                        <a>
                                            <img src="/assets/imgs/theme/icons/dashboard.svg" alt="logo" />
                                            Dashboard
                                        </a>
                                    </Link>
                                    <Link href="/">
                                        <a className="ml-5">
                                            <img src="/assets/imgs/theme/icons/contracts.svg" alt="logo" />
                                            contracts
                                        </a>
                                    </Link>
                                    <Link href="/saved">
                                        <a className="ml-5">
                                            <img src="/assets/imgs/theme/icons/saved.svg" alt="logo" />
                                            saved
                                        </a>
                                    </Link>
                                </div>

                                <div className="search-style-2 flex justify-end">
                                    <Search />
                                </div>
                                <div className="header-action-right">
                                    {
                                        islogin &&
                                        <div className="header-action-2 flex items-center ">
                                            <div className="header-action-icon-2 ml-2" >
                                                <div className="icon-holder" onClick={toggleNotificationDropdown}>
                                                    <img className="svgInject" alt="notofication-icon" src="/assets/imgs/theme/icons/notofication-icon.svg" />
                                                    <span className="pro-count blue">3</span>
                                                </div>
                                                <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (notificationDropdownVisible ? " active" : "")}>
                                                    <div className="dialog dialog-1">
                                                        <div className="notifications">
                                                            <div className="header">
                                                                <h2>notifications</h2>
                                                                <a href="">view all</a>
                                                            </div>
                                                            <div className="list">
                                                                <div className="profile">
                                                                    <img src="/assets/imgs/profile/contact-2.png" alt="user" width="45" height="45" />
                                                                    <p>
                                                                        <span className="name">Ali Haider</span>
                                                                        <span className="event">saved your project to the moodboard “the good mode...</span>
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="messages">
                                                            <div className="header">
                                                                <h2>messages</h2>
                                                                <a href="">view all</a>
                                                            </div>
                                                            <div className="list">
                                                                <div className="profile">
                                                                    <img src="/assets/imgs/profile/contact-2.png" alt="user" width="45" height="45" />
                                                                    <p>
                                                                        <span className="name">Ali Haider</span>
                                                                        <span className="event">saved your project to the moodboard “the good mode...</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="header-action-icon-2 mx-8"  >
                                                <div className="icon-holder" onClick={toggleProfileDropdown}>
                                                    <img className="svgInject" alt="user" src="/assets/imgs/theme/icons/icon-user.svg" />
                                                </div>
                                                <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (profileDropdownVisible ? " active" : "")}  >
                                                    <div className="dialog dialog-2">
                                                        <div className="card h-72 flex flex-col" style={{ backgroundImage: "url(/assets/imgs/profile/about-9.png)" }}>
                                                            <div />
                                                            <div className="info">
                                                                <img className="img" src="/assets/imgs/profile/contact-2.png" alt="profile picture"></img>
                                                                <p >
                                                                    <span className="name"> youseff abdulla </span>
                                                                    <br />
                                                                    <span className="flex items-center">
                                                                        <img className="h-3" alt="profile cover" src="/assets/imgs/theme/icons/location.svg" />
                                                                        <span className="location">
                                                                            5th settlement
                                                                        </span>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            
                                                                <a href="/profile" id="profile-btn">
                                                                    view profile
                                                                </a>
                                                            
                                                        </div>
                                                        <div className="card bottom-section">
                                                            <h4 className="opacity-70 text-lg mb-2">
                                                                saved projects
                                                            </h4>
                                                            <div className="flex justify-between">
                                                                <div className="project">
                                                                    <img src="/assets/imgs/projects/1.jpeg" />
                                                                </div>
                                                                <div className="project">
                                                                    <img src="/assets/imgs/projects/3.jpeg" />
                                                                </div>


                                                            </div>
                                                        </div>

                                                        {/* <div id="settings">
                                                        <div></div>
                                                        <span>settings</span>
                                                        <img alt="profile cover" src="/assets/imgs/theme/icons/setting.svg" />
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="header-action-icon-2"  >
                                                <div className="icon-holder" onClick={toggleSettingDropdown}>
                                                    <img className="svgInject" alt="setting" src="/assets/imgs/theme/icons/icon-setting.svg" />
                                                </div>
                                                <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (settingvisible ? " active" : "")}  >
                                                    <div className="dialog dialog-3">
                                                        <div className="card w-80" >
                                                            {
                                                                [
                                                                    {
                                                                        img: 'mode-icon.svg',
                                                                        name: 'Dark mode',
                                                                        action: <Switch onSwitchChange={()=>{}} />,
                                                                    },
                                                                    {
                                                                        img: 'power-icon.svg',
                                                                        name: 'Instant projects',
                                                                        subName: 'short delivery time, More money',
                                                                        action: <Switch onSwitchChange={()=>{}} />,
                                                                    },
                                                                    {
                                                                        img: 'notification-icon.svg',
                                                                        name: 'Notification',
                                                                        action: <div />,
                                                                    },
                                                                    {
                                                                        img: 'world-icon.svg',
                                                                        name: 'Language',
                                                                        action: <div />,
                                                                    },
                                                                    {
                                                                        img: 'number-icon.svg',
                                                                        name: 'Change number',
                                                                        action: <div />,
                                                                    },
                                                                    {
                                                                        img: 'lock-icon.svg',
                                                                        name: 'Terms & Conditions',
                                                                        action: <div />,
                                                                    },
                                                                    {
                                                                        img: 'chat-icon.svg',
                                                                        name: 'Contact Us',
                                                                        action: <div />,
                                                                    },
                                                                    {
                                                                        img: 'about-icon.svg',
                                                                        name: 'About',
                                                                        action: <div />,
                                                                    },

                                                                ].map((e, i) => (
                                                                    <div className="flex p-4" key={i}>
                                                                        <img icon='icon' className="icon w-6 h-6 mr-4" src={`/assets/imgs/theme/${e.img}`} />
                                                                        <p className="text w-full font-semibold">{e.name}</p>
                                                                        <div className="action"> {e.action} </div>
                                                                    </div>
                                                                ))
                                                            }
                                                            <div className="flex p-4 text-red-950">
                                                                <img icon='icon' className="icon w-6 h-6 mr-4" src={`/assets/imgs/theme/logout-icon.svg`} />
                                                                <p className="text w-full font-semibold text-red-500"> Logout </p>
                                                                <div className="action"> <div /> </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        !islogin &&
                                        <div className="header-action-2 flex gap-3 items-center pl-5">
                                            <Link href="#">
                                                <a onClick={() => { setIslogin(true) }} className="px-5 py-2 rounded-full border border-solid border-blue-500 p-4 text-sm">log-in</a>
                                            </Link>
                                            <Link href="/register">
                                                <a className="px-5 py-2 rounded-full border border-solid bg-blue-500 p-4 text-white">register</a>
                                            </Link>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom header-bottom-bg-color">
                    <div className="container">
                        <div className="header-wrap header-space-between relative">
                            <div className="logo logo-width-1 block lg:hidden">
                                <Link href="/">
                                    <a>
                                        <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                                    </a>
                                </Link>
                            </div>
                            {
                                !fromlayout.shortlayout &&
                                <div className="header-nav">
                                    <div className="main-menu main-menu-padding-1 main-menu-lh-2 font-heading hidden lg:block">
                                        <nav>
                                            <Menu />
                                        </nav>
                                    </div>
                                </div>
                            }

                            <div className="header-action-icon-2 block lg:hidden">
                                <div className="burger-icon burger-icon-white" >
                                    {/* onClick={toggleClick}>    OPEN MOBILE MENU  */}
                                    <span className="burger-icon-top"></span>
                                    <span className="burger-icon-mid"></span>
                                    <span className="burger-icon-bottom"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={scroll ? "fake-height active" : "fake-height"} />
        </>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Header);

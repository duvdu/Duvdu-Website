import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../elements/Search";
import Menu from '../elements/menu'

const Header = ({
    fromlayout
}) => {
    const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(0);

    const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
    const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });

        function getHeaderHeight() {
            var root = document.documentElement;
            var header = document.getElementsByTagName('header')[0];
            var headerHeight = header.offsetHeight;

            root.style.setProperty('--header-height', headerHeight+'px');
        }
    
        getHeaderHeight();
    
        window.addEventListener('resize', getHeaderHeight);
        
    });


    const toggleNotificationDropdown = () => {
        setNotificationDropdownVisible(!notificationDropdownVisible);
        // Close the profile dropdown when opening the notification dropdown
        setProfileDropdownVisible(false);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownVisible(!profileDropdownVisible);
        // Close the notification dropdown when opening the profile dropdown
        setNotificationDropdownVisible(false);
    };

    const closeDropdowns = () => {
        setNotificationDropdownVisible(false);
        setProfileDropdownVisible(false);
    };

    const handleToggle = () => setToggled(!isToggled);

    return (
        <>
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
                                    <a href="/">
                                        <img src="/assets/imgs/theme/icons/dashboard.svg" alt="logo" />
                                        Dashboard
                                    </a>
                                    <a className="ml-5" href="/">
                                        <img src="/assets/imgs/theme/icons/contracts.svg" alt="logo" />
                                        contracts
                                    </a>
                                    <a className="ml-5" href="/saved">
                                        <img src="/assets/imgs/theme/icons/saved.svg" alt="logo" />
                                        saved
                                    </a>
                                </div>

                                <div className="search-style-2">
                                    <Search />
                                </div>
                                <div className="header-action-right">
                                    <div className="header-action-2 flex items-center space-x-2">
                                        <div className="header-action-icon-2" onClick={toggleNotificationDropdown}>
                                            <div className="icon-holder">
                                                <img className="svgInject" alt="notofication-icon" src="/assets/imgs/theme/icons/notofication-icon.svg" />
                                                <span className="pro-count blue">3</span>
                                            </div>
                                            <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (notificationDropdownVisible ? " active" : "")}>
                                                <div className="dialog">
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
                                        <div className="header-action-icon-2" onClick={toggleProfileDropdown} >
                                            <div className="icon-holder">
                                                <img className="svgInject" alt="Nest" src="/assets/imgs/theme/icons/icon-user.svg" />
                                            </div>
                                            <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (profileDropdownVisible ? " active" : "")}  >
                                                <div className="pr-dialog">
                                                    <div className="card" style={{ backgroundImage: "url(/assets/imgs/profile/about-9.png)" }}>
                                                        <div/>
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

                                                    <div id="settings">
                                                        <div></div>
                                                        <span>settings</span>
                                                        <img alt="profile cover" src="/assets/imgs/theme/icons/setting.svg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

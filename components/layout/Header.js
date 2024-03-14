import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../elements/Search";
import Menu from '../elements/menu'
import Switch from '../elements/switcher'
import Icon from "../Icons";
import Button from '../elements/submitButton';

const Header = ({ fromlayout, toggleClick }) => {
    const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(1);
    const [islogin, setIslogin] = useState(false);
    const [isDarkMode, setisDarkMode] = useState(false);

    const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
    const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
    const [settingvisible, setSettingvisible] = useState(false);

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


    useEffect(() => {
        var root = document.documentElement;

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
    }, []);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setisDarkMode(isDarkMode)
        const body = document.body;

        if (isDarkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }

        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                // setScroll(scrollCheck);
            }
        });

    }, []);

    return (
        <>
            <div onClick={falseall} className={`w-full h-full bg-black transition-opacity ${(notificationDropdownVisible || profileDropdownVisible || settingvisible) ? 'opacity-60 visible' : 'opacity-0 invisible'} 
            left-0 right-0 fixed z-10`} />
            <header className={`bg-DS_white w-full z-10 ${fromlayout.iSsticky ? "sticky top-0" : ""}`}>
                <div className="py-4 hidden lg:block">
                    <div className="container">
                        <div className="header-wrap">

                            <div className="logo logo-width-1 mr-16">
                                {
                                    <Link href="/">
                                        <a>
                                            <img key={isDarkMode}
                                                src={isDarkMode ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                                alt="main logo"
                                            />
                                        </a>
                                    </Link>
                                }
                            </div>

                            <div className="header-right">
                            {fromlayout.showTabs
                            &&
                                <div className="header-tabs">
                                    <Link href="/dashboard">
                                        <a>
                                            <Icon name={"dashboard"} useinvert={true} className="mx-2" />
                                            <span>
                                                Dashboard
                                            </span>
                                        </a>
                                    </Link>
                                    <Link href="/contracts">
                                        <a className="">
                                            <Icon name={"contracts"} useinvert={true} className="mx-2" />
                                            <span>
                                                contracts
                                            </span>
                                        </a>
                                    </Link>
                                    <Link href="/teams">
                                        <a className="capitalize whitespace-nowrap">
                                            <Icon name={"saved"} useinvert={true} className="" />
                                            <span>
                                                team projects
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                                }

                                <div className="search-style-2 flex justify-end">
                                    <Search />
                                </div>
                                <div className="header-action-right">
                                    {
                                        islogin &&
                                        <div className="header-action-2 flex items-center ">
                                            <div className="header-action-icon-2" >
                                                <div className="icon-holder" onClick={toggleNotificationDropdown}>
                                                    <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">3</span>
                                                    <Icon className={notificationDropdownVisible ? " text-DS_black" : ""} name={"bell"} type="far" />
                                                </div>
                                                <MessageAndNotofication useState={{ notificationDropdownVisible, setNotificationDropdownVisible }} />
                                            </div>
                                            <div className="header-action-icon-2 mx-8"  >
                                                <div className="icon-holder" onClick={toggleSettingDropdown}>
                                                    <Icon className={settingvisible ? " text-DS_black" : ""} name={"gear"} useinvert={true} />
                                                </div>
                                                <Setting data={{ settingvisible, setSettingvisible, isDarkMode, setisDarkMode, setIslogin: setIslogin }} />
                                            </div>
                                            <div className="header-action-icon-2"  >
                                                <div className="icon-holder" onClick={toggleProfileDropdown}>
                                                    <Icon className={profileDropdownVisible ? " text-DS_black" : ""} name={"user"} type="far" />
                                                </div>
                                                <Profile useState={{ profileDropdownVisible, setProfileDropdownVisible }} />

                                            </div>
                                        </div>
                                    }
                                    {
                                        !islogin &&
                                        <div className="header-action-2 flex gap-6 items-center">
                                            <Link href="#">
                                                <a onClick={() => { setIslogin(true) }} className="text-sm font-semibold capitalize hover:text-hover_primary">log-in</a>
                                            </Link>
                                            <Link href="/register">
                                                <a className="px-5 py-2 rounded-full bg-primary hover:bg-hover_primary p-4 text-DS_white font-semibold capitalize">register</a>
                                            </Link>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"border-borderColor header-bottom header-bottom-bg-color" + (!fromlayout.shortheader ? " border-y" : "")}>
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
                                !fromlayout.shortheader &&
                                <div className="header-nav w-full">
                                    <div className="main-menu main-menu-lh-2 font-heading hidden lg:block">
                                        <nav>
                                            <Menu />
                                        </nav>
                                    </div>
                                </div>
                            }

                            <div className="header-action-icon-2 block lg:hidden">
                                <div className="burger-icon burger-icon-DS_white" onClick={toggleClick}>
                                    <span className="burger-icon-top"></span>
                                    <span className="burger-icon-mid"></span>
                                    <span className="burger-icon-bottom"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
        </>
    );
};


function MessageAndNotofication({ useState }) {
    var notification = [
        {
            "img_url": "/assets/imgs/profile/contact-2.png",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
        {
            "img_url": "/assets/imgs/profile/contact-2.png",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
        {
            "img_url": "/assets/imgs/profile/contact-2.png",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
        {
            "img_url": "/assets/imgs/profile/contact-2.png",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
    ]

    var messages = [
        {
            "img_url": "/assets/imgs/profile/1.jpg",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
        {
            "img_url": "/assets/imgs/profile/2.jpg",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
        {
            "img_url": "/assets/imgs/profile/3.jpg",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
        {
            "img_url": "/assets/imgs/profile/4.jpg",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        }
    ]

    return (
        <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (useState.notificationDropdownVisible ? " active" : "")}>
            <div className="dialog dialog-1">
                <div className="notifications">
                    <div className="header">
                        <h2>notifications</h2>
                        <a href="">view all</a>
                    </div>
                    <div className="flex flex-col gap-4 mt-10 overflow-y-scroll">
                        {notification.map((profile, index) => (
                            <div key={index} className="profile">
                                <img src={profile.img_url} alt="user" width="45" height="45" />
                                <p>
                                    <span className="name">{profile.name} </span>
                                    <span className="event">{profile.event}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="messages">
                    <div className="header">
                        <h2>messages</h2>
                        <a href="">view all</a>
                    </div>
                    <div className="flex flex-col gap-4 mt-10 overflow-y-scroll">
                        {messages.map((profile, index) => (
                            <div key={index} className="profile">
                                <img src={profile.img_url} alt="user" width="45" height="45" />
                                <p>
                                    <span className="name">{profile.name} </span>
                                    <span className="event">{profile.event}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
function Profile({ useState }) {
    const badge = 63;
    const states = [
        {
            "state": true,
            "text": "Add Profile Picture"
        },
        {
            "state": true,
            "text": "Add your Category"
        },
        {
            "state": false,
            "text": "Verify your Email"
        },
    ]
    return (
        <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (useState.profileDropdownVisible ? " active" : "")}  >
            <div className="dialog dialog-2">

                {/* first card  */}

                <div className="card h-72 flex flex-col" style={{ backgroundImage: "url(/assets/imgs/profile/about-9.png)" }}>
                    <div />
                    <div className="info">
                        <img className="img" src="/assets/imgs/profile/1.jpg" alt="profile picture"></img>
                        <p >
                            <span className="name"> youseff abdulla </span>
                            <br />
                            <span className="flex items-center">
                                <Icon className='opacity-50 mr-2 text-sm w-3' name='location-dot' />
                                <span className="location">
                                    5th settlement
                                </span>
                            </span>
                        </p>
                    </div>

                    <a href='/creative/youseff_abdulla' id="profile-btn">
                        view profile
                    </a>

                </div>

                {/* middle card  */}

                <div className="mx-5 p-6 bg-DS_white rounded-[45px] bottom-section">
                    <h4 className="opacity-70 text-lg mb-2">
                        Complete your Profile
                    </h4>
                    <div className='flex items-center'>

                        {/* progress bar  */}

                        <div className="header-progress-bar relative w-full">
                            <div className="absolute h-5 inset-0 rounded-lg bg-gradient-to-l from-purple-700 via-purple-500 to-blue-500 blur" style={{ width: `${badge}%` }}></div>
                            <div className="relative h-full overflow-hidden">
                                <div className="absolute inset-0 rounded-lg bg-primary" style={{ width: `${badge}%` }}></div>
                            </div>
                        </div>

                        <span className="text-primary font-semibold text-sm right-0 bottom-full ml-2 whitespace-nowrap">{badge}%</span>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        {states.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.state ? (
                                    <div className="flex items-center gap-3">
                                        <div className="text-green">
                                            {item.text}
                                        </div>
                                        <Icon name="greenCheck" />
                                    </div>
                                ) : (
                                    <a className="no-underline text-lg font-semibold">{item.text}</a>
                                )}
                                {index !== states.length - 1 && <hr className="border-gray-300" />}
                            </React.Fragment>
                        ))}
                    </div>


                </div>

                {/* end card  */}
                <a href="/saved">
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
                </a>

                {/*
                <div id="settings"> <div></div>
                <span>settings</span>
                <img alt="profile cover" src="/assets/imgs/theme/icons/setting.svg" /> </div> */}
            </div>
        </div>
    )
}
function Setting({ data }) {

    const [contactUs, setcontactUs] = useState(false);



    function toggle() {
        const body = document.body;
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        data.setisDarkMode(isDarkMode)
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode);
    }

    const ContactUs = () => (
        <>
            <div className='flex gap-3'>
                <div onClick={() => setcontactUs(false)} className='rounded-full header-border h-14 w-14 flex justify-center items-center cursor-pointer'>
                    
                    <Icon className="text-xl" name={'xmark'} useinvert={true} />
                    
                </div>
                <span className='flex justify-center items-center rounded-full header-border px-7 h-14 text-lg font-medium'>
                    contact us
                </span>
            </div>
            <div className="capitalize opacity-60 mt-8">your message</div>
            <textarea placeholder="start typing..." className="bg-[#9999991A] rounded-3xl h-48 border-none mt-5" />
            <Button className="w-full mb-7 mt-7" shadow={true}>
                Send
            </Button>
        </>
    )
    const Main = ({ setIslogin }) => (
        <>
            {
                [
                    {
                        img: 'mode-icon.svg',
                        name: 'Dark mode',
                        action: <Switch defaultValue={data.isDarkMode} onSwitchChange={() => { toggle() }} />,
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
                        action: <Icon name={"angle-right"} invert={true} />,
                    },
                    {
                        img: 'world-icon.svg',
                        name: 'Language',
                        action: <Icon name={"angle-right"} invert={true} />,
                    },
                    {
                        img: 'number-icon.svg',
                        name: 'Change number',
                        action: <a href="/changePhoneNumber"> <Icon name={"angle-right"} invert={true} /></a>,
                    },
                    {
                        img: 'lock-icon.svg',
                        name: 'Terms & Conditions',
                        action: <Icon name={"angle-right"} invert={true} />,
                    },
                    {
                        img: 'chat-icon.svg',
                        name: 'Contact Us',
                        action: <Icon name={"angle-right"} invert={true} />,
                        onClick: () => setcontactUs(true)
                    },
                    {
                        img: 'about-icon.svg',
                        name: 'About',
                        action: <Icon name={"angle-right"} invert={true} />,
                    },

                ].map((e, i) => (
                    <div onClick={e.onClick} className="flex p-4 cursor-pointer" key={i}>
                        <img icon='icon' className="icon w-6 h-6 mr-4" src={`/assets/imgs/theme/${e.img}`} />
                        <p className="text w-full font-semibold">{e.name}</p>
                        <div className="action"> {e.action} </div>
                    </div>
                ))
            }
            <div onClick={() => setIslogin(false)} className="flex p-4 text-red-950 cursor-pointer">
                <img icon='icon' className="icon w-6 h-6 mr-4" src={`/assets/imgs/theme/logout-icon.svg`} />
                <p className="text w-full font-semibold text-red-500"> Logout </p>
                <div className="action"> <div /> </div>
            </div>
        </>
    )


    return (
        <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (data.settingvisible ? " active" : "")}  >
            <div className="dialog dialog-3">
                <div className="card w-80" >
                    {contactUs && <ContactUs />}
                    {!contactUs && <Main setIslogin={data.setIslogin} />}
                    {/* <Main /> */}
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Header);
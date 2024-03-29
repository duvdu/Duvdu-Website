import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../elements/Search";
import Menu from '../elements/menu'
import Switch from '../elements/switcher'
import Icon from "../Icons";
import Button from '../elements/button';

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
                <div className="py-3 hidden lg:block">
                    <div className="container">
                        <div className="header-wrap">

                            <div className="logo logo-width-1 mr-12">
                                {

                                    <a href="/">
                                        <img key={isDarkMode}
                                            src={isDarkMode ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                            className="min-h-9"
                                            alt="main logo"
                                        />
                                    </a>

                                }
                            </div>

                            <div className="header-right">
                                {fromlayout.showTabs
                                    &&
                                    <div className="header-tabs">

                                        <a href="/dashboard">
                                            <Icon name={"dashboard"} useinvert={true} className="mr-1 text-[#666666] dark:text-[#B3B3B3]" />
                                            <span>
                                                Dashboard
                                            </span>
                                        </a>


                                        <a href="/contracts">
                                            <Icon name={"contracts"} useinvert={true} className="mr-1 text-[#666666] dark:text-[#B3B3B3]" />
                                            <span>
                                                contracts
                                            </span>
                                        </a>


                                        <a href="/teams" className="capitalize whitespace-nowrap">
                                            <Icon name={"teams"} useinvert={true} className="mr-1 text-[#666666] dark:text-[#B3B3B3]" />
                                            <span>
                                                team projects
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
                                            <div className="header-action-icon-2" >
                                                <div className="icon-holder cursor-pointer" onClick={toggleNotificationDropdown}>
                                                    <span className="absolute -right-[7px] -top-[7px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[9px] border border-white leading-[0]">3</span>
                                                    <Icon className={"dark:text-[#B3B3B3] "} name={"bell"} type="far" />
                                                </div>
                                                <MessageAndNotofication useState={{ notificationDropdownVisible, setNotificationDropdownVisible }} />
                                            </div>
                                            <div className="header-action-icon-2 mx-6"  >
                                                <div className="icon-holder cursor-pointer" onClick={toggleSettingDropdown}>
                                                    <Icon className={"dark:text-[#B3B3B3]"} name={"gear"} useinvert={true} />
                                                </div>
                                                <Setting data={{ settingvisible, setSettingvisible, isDarkMode, setisDarkMode, setIslogin: setIslogin }} />
                                            </div>
                                            <div className="header-action-icon-2"  >
                                                <div className="icon-holder cursor-pointer" onClick={toggleProfileDropdown}>
                                                    <div className="flex justify-center items-center h-[18px]">
                                                        <div className="border border-[#B3B3B3] rounded-full p-2">
                                                            <Icon className={"dark:text-[#B3B3B3] "} name={"user"} type="far" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Profile PathuseState={{ profileDropdownVisible, setProfileDropdownVisible }} />
                                            </div>
                                        </div>
                                    }
                                    {
                                        !islogin &&
                                        <div className="header-action-2 flex gap-6 items-center">
                                            <a onClick={() => { setIslogin(true) }} className="text-sm font-semibold capitalize hover:text-hover_primary">log-in</a>
                                            <a href="/register" className="px-5 py-2 rounded-full bg-primary hover:bg-hover_primary text-sm text-white font-semibold capitalize">register</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"border-borderColor header-bottom-bg-color" + (!fromlayout.shortheader ? " border-y" : "")}>
                    <div className="container">
                        <div className="header-wrap header-space-between relative">
                            <div className="logo logo-width-1 block lg:hidden my-4">
                                <a href="/">
                                    <img key={isDarkMode}
                                        src={isDarkMode ? "/assets/imgs/theme/dark-logo.svg" : "/assets/imgs/theme/logo.svg"}
                                        className="min-h-9"
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

                            <div className="flex gap-2 lg:hidden my-4" >
                                <div className="h-9 w-9" name={'search-2'} >
                                    <Icon className="size-full" name={'search-2'} />
                                </div>
                                <div className="h-9 w-9 " name={'burgerMenu'} onClick={toggleClick}>
                                    <Icon className="size-full" name={'burgerMenu'} onClick={toggleClick} />

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
            "event": "followed your work"
        },
        {
            "img_url": "/assets/imgs/profile/contact-2.png",
            "name": "Ali Haider",
            "event": "saved your project to the moodboard “the good mode..."
        },
        {
            "img_url": "/assets/imgs/profile/contact-2.png",
            "name": "Ali Haider",
            "event": "followed your work"
        },
        {
            "img_url": "/assets/imgs/profile/contact-2.png",
            "name": "Ali Haider",
            "event": "followed your work"
        },
    ]

    var messages = [
        {
            "img_url": "/assets/imgs/profile/1.jpg",
            "name": "Ali Haider",
            "event": "Hello, thank you for sharing yo...",
            "date": 'now',
            'messagesNum': 5,
            'isNew': true,
            "isActive": true,
        },
        {
            "img_url": "/assets/imgs/profile/2.jpg",
            "name": "Ali Haider",
            "event": "Hello, thank you for sharing yo...",
            "date": '2:54 pm',
            'messagesNum': 1,
            "isActive": true,
        },
        {
            "img_url": "/assets/imgs/profile/3.jpg",
            "name": "Ali Haider",
            "event": "Hello, thank you for sharing yo...",
            "date": '',
            'messagesNum': 1,
            "isActive": false,
        },
        {
            "img_url": "/assets/imgs/profile/4.jpg",
            "name": "Ali Haider",
            "event": "Hello, thank you for sharing yo...",
            "date": '6:15 am',
            'messagesNum': 1,
            "isActive": false,
        }
    ]

    return (
        <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (useState.notificationDropdownVisible ? " active" : "")}>
            <div className="dialog dialog-1">
                <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between gap-2">
                    <div className="w-auto rounded-[45px] border-[#00000026] bg-DS_white dark:bg-[#1A2024] p-7">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold capitalize">messages</h2>
                            <a className="underline font-semibold capitalize" href="">view all</a>
                        </div>
                        <div className="flex flex-col gap-4 mt-8 overflow-y-scroll">
                            {notification.map((profile, index) => (
                                <div key={index} className="w-64 flex gap-4">
                                    <img className="size-9 rounded-full" src={profile.img_url} alt="user" width="45" height="45" />
                                    <div className="flex flex-col justify-center">
                                        <span className="leading-[1px]">
                                            <span className="font-bold">{profile.name} </span>
                                            <span className="text-xs opacity-60">{profile.event}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-auto rounded-[45px] border-[#00000026] bg-DS_white dark:bg-[#1A2024] p-7">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold capitalize">messages</h2>
                            <a className="underline font-semibold capitalize" href="">view all</a>
                        </div>
                        <div className="flex flex-col gap-4 mt-8 overflow-y-scroll">
                            {messages.map((profile, index) => (
                                <div key={index} className="w-64 flex gap-4">
                                    <div className="relative">
                                        <div className="size-9 rounded-full bg-black overflow-hidden">
                                            <img className="" src={profile.img_url} alt="user" width="37" height="37" />
                                        </div>

                                        <div className={`absolute bottom-1 right-[2px] rounded-full size-[10px] border-[1.68px] border-white ${profile.isActive ? 'bg-[#4CE417]' : 'bg-[#BDBDBD]'}`} />

                                    </div>

                                    <div className="flex flex-col w-full">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-xs">{profile.name} </span>
                                            <span className="text-[#333] text-[10px] opacity-60">{profile.date} </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs opacity-60">{profile.event}</span>
                                            {profile.isNew &&
                                                <span className="text-white bg-primary text-[10px] font-medium rounded-full size-5 flex items-center justify-center">{profile.messagesNum} </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Profile({ PathuseState }) {
    const [showMiddleCard, setShowMiddleCard] = useState(true);
    const handleCloseMiddleCard = () => {
        setShowMiddleCard(false);
    };
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
        <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (PathuseState.profileDropdownVisible ? " active" : "")}  >
            <div className="dialog dialog-2 flex flex-col">
                <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between w-[320px] gap-3 h-full">
                    <div className="bg-DS_white dark:bg-[#1A2024] border dark:border-[#FFFFFF33] rounded-[45px] overflow-hidden min-h-[242px]">
                        <div className="flex w-full overflow-hidden h-20">
                            {["/assets/imgs/projects/1.jpeg",
                                "/assets/imgs/projects/6.jpeg",
                                "/assets/imgs/projects/3.jpeg",
                                "/assets/imgs/projects/4.jpeg"].map((image, index) => (
                                    <img key={index} className="w-1/4" src={image} alt={`Image ${index}`} />
                                ))}
                        </div>
                        <div className='p-5'>
                            <div className='flex items-start gap-4 -translate-y-4 h-12'>
                                <div className='size-[72px] bg-cover relative bg-no-repeat'>
                                    <img className='w-full h-full rounded-full border-2 shadow -translate-y-8' src={"/assets/imgs/profile/1.jpg"} alt="profile picture" />
                                </div>
                                <div className='flex-2 flex-col'>
                                    <span className='text-base font-bold capitalize'>{'youseff abdulla'}</span>
                                    <span className='flex items-center gap-1 opacity-40'>
                                        <Icon className="w-2 ml-2" name="location-dot" />
                                        <span className="text-xs font-semibold capitalize">{'5th settlement'}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-3">
                                <div className="flex items-center justify-center py-4 capitalize w-full rounded-full text-center border-2 border-primary cursor-pointer">
                                    <span className="text-primary font-bold text-base">
                                        view profile
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* middle card  */}
                    {
                        showMiddleCard &&
                        <div className="p-6 bg-DS_white dark:bg-[#1A2024] rounded-[45px]">
                            <div className="flex">
                                <div className="w-full">

                                    <h4 className="opacity-82 font-semibold text-sm mb-2">
                                        Complete your Profile
                                    </h4>
                                    <div className='flex items-center'>
                                        <div className="flex w-full">
                                            <div className="header-progress-bar relative w-full">
                                                <div className="absolute inset-0 rounded-lg h-full" style={{
                                                    width: `${badge}%`,
                                                    background: 'linear-gradient(270deg, #711AEB 7.19%, #226BEB 100%)',
                                                    filter: 'blur(10.547093391418457px)'
                                                }}></div>

                                                <div className="relative h-full overflow-hidden">
                                                    <div className="absolute inset-0 rounded-lg bg-primary" style={{ width: `${badge}%` }}></div>
                                                </div>
                                            </div>
                                            <span className="text-primary font-semibold text-xs right-0 bottom-full ml-2 whitespace-nowrap">{badge}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={handleCloseMiddleCard} className='ml-3 flex justify-center items-center cursor-pointer'>
                                    <div className="h-min rounded-full header-border p-3">
                                        <Icon className="size-5 " name={'xmark'} useinvert={true} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-4">
                                {states.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item.state ? (
                                            <div className="flex items-center gap-3">
                                                <div className="text-[#999999] text-sm font-semibold">
                                                    {item.text}
                                                </div>
                                                <Icon name="greenCheck" />
                                            </div>
                                        ) : (
                                            <a className="no-underline text-sm font-semibold">{item.text}</a>
                                        )}
                                        {index !== states.length - 1 && <hr className="border-[#E6E6E6]" />}
                                    </React.Fragment>
                                ))}
                            </div>


                        </div>}

                    {/* end card  */}
                    <a href="/saved">
                        <div className="p-3 bg-DS_white dark:bg-[#1A2024] rounded-[45px] mb-2">
                            <h4 className="opacity-70 text-sm font-semibold m-2">
                                saved projects
                            </h4>
                            <div className="flex justify-between gap-3">
                                <div className="aspect-square rounded-[30px] w-1/2 overflow-hidden">
                                    <img src="/assets/imgs/projects/1.jpeg" />
                                </div>
                                <div className="aspect-square rounded-[30px] w-1/2 overflow-hidden">
                                    <img src="/assets/imgs/projects/3.jpeg" />
                                </div>
                            </div>
                        </div>
                    </a>

                </div>
            </div>
        </div>
    )
}
function Setting({ data }) {

    const [contactUs, setcontactUs] = useState(false);

    function toggle() {
        const body = document.body;
        body.classList.toggle('dark');
        
        const event = new CustomEvent('darkModeToggled', {
            bubbles: true,
            cancelable: true,
        });
        body.dispatchEvent(event);
        
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
                    <Icon className="text-xl size-5" name={'xmark'} useinvert={true} />
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
                        action: <Icon name={"angle-right"} />,
                        onClick: () => setcontactUs(true)
                    },
                    {
                        img: 'about-icon.svg',
                        name: 'About',
                        action: <Icon name={"angle-right"} invert={true} />,
                    },

                ].map((e, i) => (
                    <div onClick={e.onClick} className="flex py-3 cursor-pointer" key={i}>
                        <img icon='icon' className="icon size-6 mr-4" src={`/assets/imgs/theme/${e.img}`} />
                        <span className="text-[12px] text-[#4F5E7B] w-full font-semibold">{e.name}</span>
                        <div className="action"> {e.action} </div>
                    </div>
                ))
            }
            <div onClick={() => setIslogin(false)} className="flex py-4 text-red-950 cursor-pointer">
                <img icon='icon' className="icon size-6 mr-4" src={`/assets/imgs/theme/logout-icon.svg`} />
                <p className="text-[12px] w-full font-semibold text-red-500"> Logout </p>
                <div className="action"> <div /> </div>
            </div>
        </>
    )


    return (
        <div className={"cart-dropdown-wrap cart-dropdown-hm2 account-dropdown" + (data.settingvisible ? " active" : "")}  >
            <div className="dialog flex flex-col">
                <div className="overflow-y-scroll rounded-b-[60px] p-3">
                    <div className="p-6 bg-white dark:bg-[#1A2024] w-72 rounded-[45px]" >
                        {contactUs && <ContactUs />}
                        {!contactUs && <Main setIslogin={data.setIslogin} />}
                        {/* <Main /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Header);
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import { headerPopUp } from '../../../redux/action/setting';
import * as Types from '../../../redux/constants/actionTypes';


function MessageAndNotofication({ getheaderpopup }) {
    const { t } = useTranslation();

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
        <div className={"cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown" + (getheaderpopup == Types.SHOWNOTOFICATION ? " active" : "")}>
            <div className="dialog dialog-1">
                <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between gap-2">
                    <div className="w-auto rounded-[45px] border-[#00000026] bg-DS_white dark:bg-[#1A2024] p-7">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold capitalize">{t('notification')}</h2>
                            <a className="underline font-semibold capitalize" href="">{t('view all')}</a>
                        </div>
                        <div className="flex flex-col gap-4 mt-8 overflow-y-scroll">
                            {notification.map((profile, index) => (
                                <div key={index} className="w-64 flex gap-4">
                                    <img className="size-9 rounded-full" src={profile.img_url} alt="user" width="45" height="45" />
                                    <div className="flex flex-col justify-center">
                                        <span className="leading-[1px]">
                                            <span className="rtl:hidden font-bold">{profile.name} </span>
                                            <span className="text-xs opacity-60">{profile.event}</span>
                                            <span className="ltr:hidden font-bold">{profile.name} </span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-auto rounded-[45px] border-[#00000026] bg-DS_white dark:bg-[#1A2024] p-7">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold capitalize">{t('messages')}</h2>
                            <a className="underline font-semibold capitalize" href="">{t('view all')}</a>
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

const mapStateToProps = (state) => ({
    isOpend: state.setting.ISDARK,
    getheaderpopup: state.setting.headerpopup,
  
});

export default connect(mapStateToProps)(MessageAndNotofication);
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import * as Types from '../../../redux/constants/actionTypes';
import { useEffect, useState } from "react";
import MessageTile from "../../elements/MessageTile";
import DuvduLoading from "../../elements/duvduLoading.js";
import DraggableList from "../../../components/pages/home/dragList";
import { GetAllMessageInChat } from "../../../redux/action/apis/realTime/messages/getAllMessageInChat";

import Link from 'next/link';


function MessageAndNotofication({ getheaderpopup,chats , GetNotifications_resond , GetAllMessageInChat  , AvailableUserChat_resond , onChoose  }) {
    const { t } = useTranslation();
    const [viewAllState, setViewAllState] = useState(0);
    const [isMob, setIsMob] = useState(window.innerWidth < 1024);
    function handleResize() {
        setIsMob(window.innerWidth < 1024);
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setViewAllState(0)
    }, [getheaderpopup == Types.SHOWNOTOFICATION])

    if (getheaderpopup != Types.SHOWNOTOFICATION && window.innerWidth > 1024) return
  
    return (
        <div className={isMob ? " dark:bg-black h-screen" : "cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown active"} >
            <div className={isMob ? "" : "dialog dialog-1"}>
                <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between gap-2 ps-2 py-4">
                    {
                        viewAllState == 0 &&
                        <>
                            {GetNotifications_resond?.loading?
                            <DuvduLoading loadingIn={""} type='notification' />
                            :
                            <ViewFew Type={'notification'} GetAllMessageInChat={GetAllMessageInChat} AvailableUserChat_resond={AvailableUserChat_resond} list={GetNotifications_resond?.data || []} t={t} onViewAll={() => setViewAllState(1)} />
                        }
                        {chats?.loading?
                            <DuvduLoading loadingIn={""} type='notification' />
                        :
                        <ViewFew Type={'messages'} GetAllMessageInChat={GetAllMessageInChat} AvailableUserChat_resond={AvailableUserChat_resond} onChoose={onChoose} list={chats?.data || []} t={t} onViewAll={() => setViewAllState(2)} />
                        }
                        </>
                    }
                    {
                        (viewAllState == 1) &&
                        <ViewAll Type={'notification'} list={GetNotifications_resond?.data || []} t={t} />
                    }
                    {
                        (viewAllState == 2 ) &&
                        <ViewAll Type={'messages'} list={chats?.data || []} t={t} onChoose={onChoose}/>
                    }
                </div>
            </div>
        </div>
    )
}

const ViewAll = ({ Type, list, t , onChoose }) =>
    <div className="w-auto rounded-[45px] border-[#00000026] bg-white dark:bg-[#1A2024] sm:dark:bg-[#1A2024] p-7">
        <div className="flex items-center justify-between">
            <h2 className="text-base font-bold capitalize">{t(Type)}</h2>
        </div>
        {list.length > 0 ?
            <div className="flex flex-col gap-4 mt-8 overflow-y-scroll">
                {list.map((tile, index) => (
                    Type == 'notification' ? <NotificationTile key={index + 'not'} tile={tile} /> : <MessageTile key={tile._id} message={tile} onChoose={onChoose}/>
                ))}
            </div> : <div className="flex flex-col gap-4 mt-8 overflow-y-hidden"> <span className="whitespace-nowrap w-64">{t("There's No Messages")}</span></div>}
    </div>

const ViewFew = ({ Type, list, t, onViewAll ,GetAllMessageInChat,AvailableUserChat_resond, onChoose }) => (

    <div className="w-auto rounded-[45px] border-[#00000026] bg-white dark:bg-[#1A2024] p-7">
        <div className="flex items-center justify-between">
            <h2 className="text-base font-bold capitalize">{t(Type)}</h2>
            {list.length > 4 &&
                <div onClick={onViewAll} className="underline font-semibold capitalize text-primary cursor-pointer">{t('view all')}</div>
            }
        </div>
        {Type === "messages" && AvailableUserChat_resond?.data?.length>0 &&
        <div className="overflow-auto max-w-64 mt-8 hide-scrollable-container">
            <div className="flex">
                <DraggableList>
                    {AvailableUserChat_resond?.data?.map(item=>
                        <div className="me-2 flex flex-col items-center gap-1">
                            <img onClick={()=>{
                                GetAllMessageInChat(item._id)
                                onChoose?.()
                                }} className="size-12 rounded-full cursor-pointer object-cover object-top" src={item.profileImage} alt="user" width="45" height="45" />
                            <div className="font-semibold text-xs">{item.name?.split(' ')[0].length>6?item.name?.split(' ')[0].slice(0,6):item.name?.split(' ')[0]} </div>
                        </div>
                    )}
                </DraggableList>
            </div>
        </div>
        }
        {list.length > 0 ?
            <div className={`flex flex-col gap-4 ${Type === "messages"?'mt-4':' mt-8'} overflow-y-hidden`}>
                {list.slice(0, 4).map((tile, index) => (
                    Type === 'notification' ? <NotificationTile key={index + 'not'} tile={tile} /> : <MessageTile key={tile._id} message={tile} onChoose={onChoose}/>
                ))}
            </div> : <div className="flex flex-col gap-4 mt-8 overflow-y-hidden"> <span className="whitespace-nowrap w-64">{t(`There's No ${Type}`)}</span> </div>}
    </div>
);

const NotificationTypeLink = (type , target ,username)=>{
    switch(type){
        case ('new tag'):
            return '/project/projectInvitations';
        case ('new_follower'):
            return `/creative/${username}`
        default:
            return `/contracts?contract=${target}`
    }
}
const NotificationTile = ({ tile }) =>
    <Link href={NotificationTypeLink(tile.type ,tile.target , tile.sourceUser?.username )}>
        <div className="w-full lg:w-64 flex gap-4">
            <img className="size-9 rounded-full object-cover object-top" src={tile.sourceUser?.profileImage} alt="user" width="45" height="45" />
            <div className="flex flex-col justify-center">
                <span className="line-clamp-2 cursor-pointer">
                    <span className="rtl:hidden font-bold">{tile.sourceUser?.name?.split(' ')[0].length>6?tile.sourceUser?.name?.split(' ')[0].slice(0,6):tile.sourceUser?.name?.split(' ')[0] || 'DUVDU'} </span>
                    <span className="text-xs opacity-60 mx-2">{tile.title}</span>
                    <div className="font-bold">{tile.message} </div>
                </span>
            </div>
        </div>
    </Link>



const mapStateToProps = (state) => ({
    getheaderpopup: state.setting.headerpopup,
    chats: state.api.GetAllChats,
    GetNotifications_resond: state.api.GetNotifications,    
    AvailableUserChat_resond: state.api.AvailableUserChat,    
});
const mapDispatchToProps = {
    GetAllMessageInChat
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageAndNotofication);
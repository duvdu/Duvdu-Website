import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import * as Types from '../../../redux/constants/actionTypes';
import { useEffect, useState } from "react";
import MessageTile from "../../elements/MessageTile";
import { GetNotifications } from "../../../redux/action/apis/realTime/notification/getAllNotification";


function MessageAndNotofication({ getheaderpopup, chats, GetNotifications, GetNotifications_resond, MarkNotificationsAsRead_resond, chats_resond }) {

    const { t } = useTranslation();
    const [viewAllState, setViewAllState] = useState(0);
    
    useEffect(() => {
        setViewAllState(0)
    }, [getheaderpopup == Types.SHOWNOTOFICATION])


    useEffect(() => {
        GetNotifications()
    }, [MarkNotificationsAsRead_resond])

    if (getheaderpopup != Types.SHOWNOTOFICATION) return
    return (
        <div className="cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown active" >
            <div className="dialog dialog-1">
                <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between gap-2">
                    {
                        viewAllState == 0 &&
                        <>
                            <ViewFew Type={'notification'} list={GetNotifications_resond?.data || []} t={t} onViewAll={() => setViewAllState(1)} />
                            <ViewFew Type={'messages'} list={chats || []} t={t} onViewAll={() => setViewAllState(2)} />
                        </>
                    }
                    {
                        viewAllState == 1 &&
                        <ViewAll Type={'notification'} list={GetNotifications_resond?.data || []} t={t} />
                    }
                    {
                        viewAllState == 2 &&
                        <ViewAll Type={'messages'} list={chats || []} t={t} />
                    }
                </div>
            </div>
        </div>
    )
}

const ViewAll = ({ Type, list, t }) =>
    <div className="w-auto rounded-[45px] border-[#00000026] bg-DS_white dark:bg-[#1A2024] p-7">
        <div className="flex items-center justify-between">
            <h2 className="text-base font-bold capitalize">{t(Type)}</h2>

        </div>
        {list.length > 0 ?
            <div className="flex flex-col gap-4 mt-8 overflow-y-scroll">
                {list.map((tile, index) => (
                    Type == 'notification' ? <NotificationTile key={index + 'not'} tile={tile} /> : <MessageTile key={tile._id} message={tile} />
                ))}
            </div> : <div className="flex flex-col gap-4 mt-8 overflow-y-hidden"> <span className="whitespace-nowrap w-64">There's No Messages</span></div>}

    </div>

const ViewFew = ({ Type, list, t, onViewAll }) => (

    <div className="w-auto rounded-[45px] border-[#00000026] bg-DS_white dark:bg-[#1A2024] p-7">
        <div className="flex items-center justify-between">
            <h2 className="text-base font-bold capitalize">{t(Type)}</h2>
            {list.length > 4 &&
                <div onClick={onViewAll} className="underline font-semibold capitalize text-primary cursor-pointer">{t('view all')}</div>
            }
        </div>
        {list.length > 0 ?
            <div className="flex flex-col gap-4 mt-8 overflow-y-hidden">
                {list.slice(0, 4).map((tile, index) => (
                    Type === 'notification' ? <NotificationTile key={index + 'not'} tile={tile} /> : <MessageTile key={tile._id} message={tile} />
                ))}
            </div> : <div className="flex flex-col gap-4 mt-8 overflow-y-hidden"> <span className="whitespace-nowrap w-64">There's No Notification</span> </div>}
    </div>
);


const NotificationTile = ({ tile }) =>
    <div className="w-64 flex gap-4">
        <img className="size-9 rounded-full" src={tile.sourceUser.profileImage} alt="user" width="45" height="45" />
        <div className="flex flex-col justify-center">
            <span className="leading-[1px]">
                <span className="rtl:hidden font-bold">{tile.sourceUser.name || 'NONE'} </span>
                <span className="text-xs opacity-60">{tile.title}</span>
                <span className="ltr:hidden font-bold">{tile.message} </span>
            </span>
        </div>
    </div>



const mapStateToProps = (state) => ({
    getheaderpopup: state.setting.headerpopup,
    chats: state.chats.list,
    chats_resond: state.api.GetAllChats,
    GetNotifications_resond: state.api.GetNotifications,
    MarkNotificationsAsRead_resond: state.api.MarkNotificationsAsRead,
});
const mapDispatchToProps = {
    GetNotifications,
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageAndNotofication);
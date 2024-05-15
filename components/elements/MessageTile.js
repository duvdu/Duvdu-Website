import { connect } from "react-redux"
import dateFormat from "dateformat";
import { GetAllMessageInChat } from "../../redux/action/apis/realTime/messages/getAllMessageInChat";

function MessageTile({ GetAllMessageInChat, message }) {
    const lastMSG = message.newestMessage
    const unreadedcount = message.unreadMessageCount;
    // Start from the last element and move backwards

    return (
        <div className="w-64 flex gap-4 cursor-pointer" onClick={() => GetAllMessageInChat(message._id)}>
            <div className="relative">
                <div className="size-9 rounded-full bg-black overflow-hidden">
                    <img src={lastMSG.sender.profileImage || process.env.DEFULT_PROFILE_PATH} alt="user" width="37" height="37" />
                </div>
                <div className={`absolute bottom-1 right-[2px] rounded-full size-[10px] border-[1.68px] border-white ${lastMSG.sender.isOnline ? 'bg-[#4CE417]' : 'bg-[#BDBDBD]'}`} />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <span className="font-semibold text-xs">{lastMSG.sender.name} </span>
                    <span className="text-[#333] text-[10px] opacity-60">{dateFormat(lastMSG.updatedAt, 'hh:mm')} </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs opacity-60">{lastMSG.content}</span>
                    {unreadedcount > 0 &&
                        <span className="text-white bg-primary text-[10px] font-medium rounded-full size-5 flex items-center justify-center">{unreadedcount} </span>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    getheaderpopup: state.setting.headerpopup,
})
const mapDispatchToProps = {
    GetAllMessageInChat
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageTile);
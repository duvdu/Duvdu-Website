import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Controller from '../../elements/controllers';
import { GetAllMessageInChat } from '../../../redux/action/apis/realTime/messages/getAllMessageInChat';
import { SwapProjectToFav } from '../../../redux/action/apis/savedProject/fav/favAction';
import AddToSaved from '../../popsup/addToSaved';
import Share from '../../popsup/Share';
import { OpenPopUp } from '../../../util/util';
import Icon from '../../Icons';
import ArrowBtn from '../../elements/arrowBtn';
import { useRouter } from 'next/router';

const ProjectController = ({ initialData, toggleDrawer, GetAllMessageInChat, messages, SwapProjectToFav, auth, swapProjectToFav_respond,canBook , api }) => {
    const router = useRouter()
    const { studio: projectId } = router.query;
    const [data, setData] = useState(initialData);
    const [loveIconName, setLoveIconName] = useState(data?.isFavourite ? 'fas' : 'far');
    const online = data?.user?.isOnline;
    // console.log(initialData)
    // console.log(data?.isFavourite)
    // console.log(swapProjectToFav_respond)
    // console.log(data)
    
    useEffect(() => {
        setLoveIconName(data?.isFavourite ? 'fas' : 'far');
    }, [data?.isFavourite]);
    
    useEffect(() => {
        if (swapProjectToFav_respond?.projectId == projectId ) {
            setData(prevData => ({
                ...prevData,
                isFavourite: !prevData?.isFavourite
            }));
        }
    }, [swapProjectToFav_respond?.projectId]);
    // console.log(swapProjectToFav_respond)
    const handleLoveIconClick = () => {
        if (data?._id)
            SwapProjectToFav({ projectId: data?._id, action: data?.isFavourite ? "remove" : "add" });
    };

    const handleOpenChat = () => {
        GetAllMessageInChat(data?.user?._id);
    };

    const openShare = () => {
        OpenPopUp("Share");
    };

    return (
        messages.openchat?
        <></>:
        <>
            <div className='sticky h-32 bottom-0 z-20 max-w-full'>
                <div className="sm:container flex justify-between items-end">
                    {auth.login ? (
                        <div onClick={handleOpenChat} className="hidden message-shadow lg:flex rounded-full p-2 h-16 bg-white dark:bg-[#1A2024] cursor-pointer">
                            <div className="relative">
                                <img
                                    className="h-full aspect-square rounded-full object-cover object-top"
                                    src={data?.user?.profileImage || process.env.DEFAULT_PROFILE_PATH}
                                    alt="user"
                                />
                                <div className={`absolute w-4 h-4 border-2 border-white rounded-full right-0 -translate-y-3 ${online ? 'bg-green-500' : 'bg-gray-500'}`} />
                            </div>
                            <div className="px-3">
                                <span className="capitalize font-bold">
                                    {data?.user?.name || 'NONE'}
                                </span>
                                <div />
                            </div>
                        </div>
                    ) : (
                        <div className="w-1" />
                    )}

                    <Controller className="mr-auto ml-auto lg:m-0">
                        <div onClick={openShare} className="bg-[#0000001A] dark:bg-[#3028281a] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer flex justify-center items-center">
                            <Icon name="share" />
                        </div>
                        {auth.login && (
                            <>
                                <div data-popup-toggle="popup" data-popup-target="add-to-saved-project" className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer hidden sm:flex justify-center items-center">
                                    <Icon className="text-white text-xl" name="plus" />
                                </div>
                                <div onClick={handleLoveIconClick} className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer flex justify-center items-center">
                                    <Icon className={`${loveIconName === 'far' ? 'text-white' : 'text-primary'} w-6 text-xl`} name="heart" type={loveIconName} />
                                </div>
                                {
                                canBook &&
                                <ArrowBtn onClick={toggleDrawer} className="cursor-pointer w-full sm:w-96 max-w-[211px]" text="book now" />
                                }
                            </>
                        )}
                    </Controller>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    messages: state.messages,
    swapProjectToFav_respond: state.api.SwapProjectToFav,
    api: state.api,
    auth: state.auth,
});

const mapDispatchToProps = {
    GetAllMessageInChat,
    SwapProjectToFav,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectController);

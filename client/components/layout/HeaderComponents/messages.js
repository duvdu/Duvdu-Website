import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import * as Types from '../../../redux/constants/actionTypes';
import { useEffect, useState , useRef, useCallback } from "react";
import MessageTile from "../../elements/MessageTile";
import DuvduLoading from "../../elements/duvduLoading.js";
import DraggableList from "../../../components/pages/home/dragList";
import { GetAllMessageInChat } from '../../../redux/action/apis/realTime/messages/getAllMessageInChat';

import Link from 'next/link';


function Messages({ getheaderpopup,chats  , AvailableUserChat_resond , onChoose, GetAllMessageInChat }) {
    const { t } = useTranslation();
    const [viewAllState, setViewAllState] = useState(0);
    const [isMob, setIsMob] = useState(window.innerWidth < 1024);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const scrollRef = useRef(null);
    
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
        setViewAllState(0);
        // Reset pagination when component mounts
        setPage(1);
        setHasMore(true);
    }, [getheaderpopup == Types.SHOWMESSAGE]);

    // Check if we can load more data
    useEffect(() => {
        if (chats?.pagination) {
            const { currentPage, totalPages } = chats.pagination;
            setHasMore(currentPage < totalPages);
        }
    }, [chats]);

    const loadMoreMessages = useCallback(async () => {
        if (!hasMore || isLoadingMore) return;
        
        setIsLoadingMore(true);
        const nextPage = page + 1;
        
        try {
            // You'll need to implement this API call to load more messages
            // await GetAllMessageInChat(chatId, nextPage);
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more messages:', error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [page, hasMore, isLoadingMore]);

    if (getheaderpopup != Types.SHOWMESSAGE && window.innerWidth > 1024) return

    return (
        <div className={isMob ? " dark:bg-black h-screen" : "cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown active"} >
            <div className={isMob ? "" : "dialog dialog-1"}>
                <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between gap-2 ps-2 py-4 max-h-[80vh]">
                    {
                        viewAllState == 0 &&
                        <>
                        
                        {chats?.loading?
                            <DuvduLoading loadingIn={""} type='notification' />
                        :
                        <ViewFew 
                            Type={'messages'} 
                            GetAllMessageInChat={GetAllMessageInChat} 
                            AvailableUserChat_resond={AvailableUserChat_resond} 
                            onChoose={onChoose} 
                            list={chats?.data || []} 
                            t={t} 
                            onViewAll={() => setViewAllState(2)}
                        />
                        }
                        </>
                    }
                    
                    {
                        (viewAllState == 2 ) &&
                        <ViewAll 
                            Type={'messages'} 
                            list={chats?.data || []} 
                            t={t} 
                            onChoose={onChoose}
                            isLoadingMore={isLoadingMore}
                            hasMore={hasMore}
                            scrollRef={scrollRef}
                            loadMoreMessages={loadMoreMessages}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

const ViewAll = ({ Type, list, t , onChoose, isLoadingMore, hasMore, scrollRef, loadMoreMessages }) => {
    const scrollContainerRef = useRef(null);

    // Intersection Observer for infinite scroll within ViewAll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    loadMoreMessages();
                }
            },
            { 
                threshold: 0.1,
                root: scrollContainerRef.current // Use the scroll container as root
            }
        );

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        return () => {
            if (scrollRef.current) {
                observer.unobserve(scrollRef.current);
            }
        };
    }, [hasMore, isLoadingMore, loadMoreMessages]);

    return (
        <div className="w-auto rounded-[45px] border-[#00000026] bg-white dark:bg-[#1A2024] sm:dark:bg-[#1A2024] p-7 mt-2 md:mt-0">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold capitalize">{t(Type)}</h2>
            </div>
            {list.length > 0 ? (
                <div 
                    ref={scrollContainerRef}
                    className="flex flex-col gap-4 mt-8 overflow-y-auto max-h-[60vh]"
                >
                    {list.map((tile, index) => (
                        <MessageTile key={tile._id} message={tile} onChoose={onChoose}/>
                    ))}
                    
                    {/* Loading more indicator */}
                    {isLoadingMore && (
                        <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}
                    
                    {/* Intersection observer target */}
                    {hasMore && !isLoadingMore && (
                        <div ref={scrollRef} className="h-10" />
                    )}
                    
                    {/* End of data indicator */}
                    {!hasMore && list.length > 0 && (
                        <div className="flex items-center justify-center py-4 text-gray-500">
                            <span className="text-sm">{t('No more messages')}</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-4 mt-8 overflow-y-hidden"> 
                    <span className="whitespace-nowrap w-64">{t("There's No Messages")}</span>
                </div>
            )}
        </div>
    );
};

const ViewFew = ({ Type, list, t, onViewAll ,GetAllMessageInChat,AvailableUserChat_resond, onChoose }) => (

    <div className="w-auto rounded-[45px] border-[#00000026] bg-white dark:bg-[#1A2024] p-7 mt-2 md:mt-0">
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
                        <div key={item._id} className="me-2 flex flex-col items-center gap-1">
                            <img onClick={()=>{
                                GetAllMessageInChat(item._id)
                                onChoose?.()
                                }} className="w-10 h-10 rounded-full cursor-pointer object-cover object-top" src={item.profileImage} alt="user" />
                            <div className="font-semibold text-xs">{item.name?.split(' ')[0].length>6?item.name?.split(' ')[0].slice(0,6):item.name?.split(' ')[0]} </div>
                        </div>
                    )}
                </DraggableList>
            </div>
        </div>
        }
        {list.length > 0 ?
            <div className={`flex flex-col gap-4 ${Type === "messages"?'mt-4':' mt-8'} overflow-y-hidden max-h-[50vh] overflow-y-auto`}>
                {list.slice(0, 4).map((tile, index) => (
                    Type === 'notification' ? <NotificationTile t={t} key={index + 'not'} tile={tile} /> : <MessageTile key={tile._id} message={tile} onChoose={onChoose}/>
                ))}
            </div> : <div className="flex flex-col gap-4 mt-8 overflow-y-hidden"> <span className="whitespace-nowrap w-64">{t(`There's No ${Type}`)}</span> </div>}
    </div>
);

const TypeCase = (type) =>{
    switch(type){
        case ('contract_subscription'):
            return 'popup';
        default:
            return 'link'
    }
}
const NotificationTile = ({ tile , t }) => {
    const [showAll, setShowAll] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const paragraphRef = useRef(null);
    
    useEffect(() => {
        if (paragraphRef.current) {
          const lineHeight = parseInt(window.getComputedStyle(paragraphRef.current).lineHeight || '18', 10);
          const maxHeight = lineHeight * 1;
          if (paragraphRef.current.scrollHeight > maxHeight) {
            setHasMore(true);
          }
        }
      }, [tile.message]);
      
    const toggleLines = () => {
        setShowAll(!showAll);
    };
          
    const name = tile.sourceUser?.name?.split(' ')[0];
    const shortName = name?.length > 6 ? name.slice(0, 6) : name || 'DUVDU';
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
    
    const content = (
        <div className="flex flex-col justify-center text-start">
            {TypeCase(tile.type) === "link" ? 
            <Link href={NotificationTypeLink(tile.type, tile.target, tile.sourceUser?.username)}>
                <div className='cursor-pointer'>
                    <div className="cursor-pointer">
                        <span className="rtl:hidden font-bold">{shortName}</span>
                        <span className="text-xs opacity-60 mx-2">{tile.title}</span>
                    </div>
                    <div ref={paragraphRef} className={`font-bold text-sm ${!showAll ? 'line-clamp-1' : ''}`}>
                        {tile.message}
                    </div>
                </div>
            </Link>:
            <button data-popup-toggle="popup" data-popup-target={tile.type} className="w-full lg:w-64 flex gap-4 text-start">
                <div className="cursor-pointer">
                    <span className="rtl:hidden font-bold">{shortName}</span>
                    <span className="text-xs opacity-60 mx-2">{tile.title}</span>
                </div>
                <div ref={paragraphRef} className={`font-bold text-sm ${!showAll ? 'line-clamp-1' : ''}`}>
                    {tile.message}
                </div>
            </button>
            }
            {hasMore && (
                <button onClick={toggleLines} className="text-xs text-blue-500 mt-1 underline self-start">
                    {showAll ? t('View less') : t('View more')}
                </button>
            )}
        </div>
    );

    return <div className="w-full lg:w-64 flex gap-4">
                <img className="size-9 rounded-full object-cover object-top" src={tile.sourceUser?.profileImage} alt="user" />
                {content}
            </div>
};

const mapStateToProps = (state) => ({
    getheaderpopup: state.setting.headerpopup,
    chats: state.api.GetAllChats,
    AvailableUserChat_resond: state.api.AvailableUserChat,    
});
const mapDispatchToProps = {
    GetAllMessageInChat
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
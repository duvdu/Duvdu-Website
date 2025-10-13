import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import * as Types from '../../../redux/constants/actionTypes.js';
import { useEffect, useState , useRef, useCallback } from "react";
import DuvduLoading from "../../elements/duvduLoading.js";
import Link from 'next/link';
import { GetNotifications } from "../../../redux/action/apis/realTime/notification/getAllNotification.js";
import { SetheaderPopUp } from "../../../redux/action/setting";
import Icon from "../../Icons.js";


function Notifications({ getheaderpopup, GetNotifications_resond, GetNotifications, SetheaderPopUp }) {
    const { t } = useTranslation();
    const [notificationDetails, setNotificationDetails] = useState(null);
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
    }, [getheaderpopup == Types.SHOWNOTOFICATION]);

    // Check if we can load more data
    useEffect(() => {
        if (GetNotifications_resond?.pagination) {
            const { currentPage, totalPages } = GetNotifications_resond.pagination;
            setHasMore(currentPage < totalPages);
        }
    }, [GetNotifications_resond]);

    const loadMoreNotifications = useCallback(async () => {
        if (!hasMore || isLoadingMore) return;
        
        setIsLoadingMore(true);
        const nextPage = page + 1;
        
        try {
            await GetNotifications({
                page: nextPage,
                limit: 10
            });
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more notifications:', error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [page, hasMore, isLoadingMore, GetNotifications]);

    if (getheaderpopup != Types.SHOWNOTOFICATION && window.innerWidth > 1024) return

    return (
        <div className={isMob ? " dark:bg-black h-screen" : "cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown active"} >
            <div className={isMob ? "" : "dialog dialog-1"}>
                <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between gap-2 max-h-[80vh]">
                    {notificationDetails && viewAllState == 3 && (
                            <NotificationDetails notificationDetails={notificationDetails} t={t} setViewAllState={setViewAllState} />
                    )}
                    {
                        viewAllState == 0 &&
                        <>
                            {GetNotifications_resond?.loading?
                            <DuvduLoading loadingIn={""} type='notification' />
                            :
                            <ViewFew 
                                Type={'notification'} 
                                list={GetNotifications_resond?.data || []} 
                                t={t} 
                                setNotificationDetails={setNotificationDetails}
                                onViewAll={() => setViewAllState(1)}
                                setViewAllState={setViewAllState}
                            />
                        }
                        </>
                    }
                    {
                        (viewAllState == 1) &&
                        <ViewAll 
                            SetheaderPopUp={SetheaderPopUp}
                            Type={'notification'} 
                            list={GetNotifications_resond?.data || []} 
                            t={t}
                            isLoadingMore={isLoadingMore}
                            hasMore={hasMore}
                            scrollRef={scrollRef}
                            loadMoreNotifications={loadMoreNotifications}
                            setNotificationDetails={setNotificationDetails}
                            setViewAllState={setViewAllState}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

const ViewAll = ({ Type, list, t, isLoadingMore, hasMore, scrollRef, loadMoreNotifications , SetheaderPopUp , setNotificationDetails , setViewAllState }) => {
    const scrollContainerRef = useRef(null);

    // Intersection Observer for infinite scroll within ViewAll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    loadMoreNotifications();
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
    }, [hasMore, isLoadingMore, loadMoreNotifications]);

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
                        <NotificationTile setNotificationDetails={setNotificationDetails} setViewAllState={setViewAllState} t={t} key={index + 'not'} tile={tile} SetheaderPopUp={SetheaderPopUp} />
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
                            <span className="text-sm">{t('No more notifications')}</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-4 mt-8 overflow-y-hidden">
                    <span className="whitespace-nowrap w-64">{t("There's No Notifications")}</span>
                </div>
            )}
        </div>
    );
};

const ViewFew = ({ Type, list, t, onViewAll , setNotificationDetails , setViewAllState }) => (
    <div className="w-auto rounded-[45px] border-[#00000026] bg-white dark:bg-[#1A2024] p-7 mt-2 md:mt-0">
        <div className="flex items-center justify-between">
            <h2 className="text-base font-bold capitalize">{t(Type)}</h2>
            {list.length > 4 &&
                <div onClick={onViewAll} className="underline font-semibold capitalize text-primary cursor-pointer">{t('view all')}</div>
            }
        </div>
        {list.length > 0 ?
            <div className={`flex flex-col gap-4 mt-4 overflow-y-hidden max-h-[50vh] overflow-y-auto`}>
                {list.slice(0, 4).map((tile, index) => (
                    <NotificationTile setNotificationDetails={setNotificationDetails} setViewAllState={setViewAllState} t={t} key={index + 'not'} tile={tile} SetheaderPopUp={SetheaderPopUp} />
                ))}
                
            </div> : <div className="flex flex-col gap-4 mt-8 overflow-y-hidden"> <span className="whitespace-nowrap w-64">{t(`There's No ${Type}`)}</span> </div>}
    </div>
);

const NotificationDetails = ({ notificationDetails , t , setViewAllState }) => {
    const convertTime = (timestamp) => {
        const utcDate = new Date(timestamp);

        // convert to local time (browser timezone)
        const localDate = new Date(utcDate);

        // format
        const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        };

        // format with Intl.DateTimeFormat
        const formatted = new Intl.DateTimeFormat('en-GB', options).format(localDate);
        return formatted;
    };
    return (
        <div className="w-auto rounded-[45px] border-[#00000026] bg-white dark:bg-[#1A2024] sm:dark:bg-[#1A2024] p-7 mt-2 md:mt-0">
            <div className={'flex gap-3 mb-5'} >
                <div className='flex justify-center items-center rounded-full border px-4 cursor-pointer aspect-square' onClick={() => setViewAllState(0)}>
                    <Icon className='w-5 h-5 text-black dark:text-white rtl:rotate-180' name={'angle-left'} />
                </div>
                <div className='flex rounded-full border font-medium items-center'>
                    <span className='capitalize mx-5 text-lg whitespace-nowrap'>{t('notification details')}</span>
                </div>
            </div>
            {notificationDetails.title &&
            <div className="mb-3">
                <h2 className='opacity-60 capitalize'>{t("title")}</h2>
                <span className='text-sm font-semibold'>
                {notificationDetails.title}
                </span>
            </div>
            }
            {notificationDetails.message &&
            <div className="mb-3">
                <h2 className='opacity-60 capitalize'>{t("message")}</h2>
                <span className='text-sm font-semibold'>
                {notificationDetails.message}
                </span>
            </div>
            }
            {notificationDetails.createdAt &&
            <div className="mb-3">
                <h2 className='opacity-60 capitalize'>{t("createdAt")}</h2>
                <span className='text-sm font-semibold'>
                {convertTime(notificationDetails.createdAt)}
                </span>
            </div>
            }
        </div>
    );
}

const TypeCase = (type) =>{
    switch(type){
        case ('contract_subscription'):
            return 'popup';
        case ('transaction'):
            return 'transaction';
        case ('funding'):
            return 'funding';
        case ('project'):
            return 'link';
        case ('new tag'):
            return 'link';
        case ('new_follower'):
            return 'link';
        case ('newFavorite'):
            return 'link';
        case ('contract'):
            return 'link';
        default:
            return 'details';
    }
}

const NotificationTile = ({ tile , t, SetheaderPopUp , setNotificationDetails , setViewAllState }) => {
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
    const shortName = name?.length > 6 ? name.slice(0, 6) : name || 'System';
    
    const NotificationTypeLink = (type , target ,username)=>{
        switch(type){
            case ('project'):
                return `/project/${target}`;
            case ('new tag'):
                return '/project/projectInvitations';
            case ('new_follower'):
                return `/creative/${username}`
            case ('newFavorite'):
                return '/save/favorites'
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
                        {/* <span className="rtl:hidden font-bold">{shortName}</span> */}
                        <span className="text-xs font-semibold">{tile.title}</span>
                    </div>
                    <div ref={paragraphRef} className={`opacity-60 text-xs ${!showAll ? 'line-clamp-1' : ''}`}>
                        {tile.message}
                    </div>
                </div>
            </Link>:TypeCase(tile.type) === 'popup' ?
            <button data-popup-toggle="popup" data-popup-target={tile.type} className="flex flex-col justify-center text-start">
                <div className="cursor-pointer">
                    {/* <span className="rtl:hidden font-bold">{shortName}</span> */}
                    <span className="text-xs font-semibold">{tile.title}</span>
                </div>
                <div ref={paragraphRef} className={`opacity-60 text-xs ${!showAll ? 'line-clamp-1' : ''}`}>
                    {tile.message}
                </div>
            </button>
            : TypeCase(tile.type) === 'details' ?
            <button onClick={() => {
                setNotificationDetails(tile);
                setViewAllState(3);
            }} className="flex flex-col justify-center text-start">
                <span className="text-xs font-semibold">{tile.title}</span>
                <div ref={paragraphRef} className={`opacity-60 text-xs ${!showAll ? 'line-clamp-1' : ''}`}>
                    {tile.message}
                </div>
            </button>
            :       
            <button
                onClick={() => {
                    if (TypeCase(tile.type) === 'transaction') {
                        SetheaderPopUp(Types.SHOWMONEYSEND);
                } else if (TypeCase(tile.type) === 'funding') {
                        SetheaderPopUp(Types.SHOWMONEYRECEIVE);
                    }
                }}
                data-popup-toggle="popup"
                data-popup-target={tile.type}
                className="flex flex-col justify-center text-start"
            >
                <div className="flex items-center">
                    {/* <span className="rtl:hidden font-bold">{shortName}</span> */}
                    <span className="text-xs opacity-60">{tile.title}</span>
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
        {tile.sourceUser ?
                <img className="size-9 rounded-full object-cover object-top" src={tile.sourceUser?.profileImage} alt="user" />
                :
                <div className="size-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                    <img className="size-6"
                    src={"/assets/imgs/theme/system.svg"}
                    alt="user" />
                </div>
                }
                {content}
            </div>
};

const mapStateToProps = (state) => ({
    getheaderpopup: state.setting.headerpopup,
    GetNotifications_resond: state.api.GetNotifications,    
});

const mapDispatchToProps = {
    GetNotifications,
    SetheaderPopUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
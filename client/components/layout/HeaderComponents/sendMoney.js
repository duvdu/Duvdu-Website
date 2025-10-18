import Icon from "../../Icons";
import { connect } from "react-redux";
import { SendMoney } from '../../../redux/action/apis/transactions/SendMoney';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef, useCallback } from 'react';

const SendMyMoney = ({ setOpened, SendMoney, user, api, respond, handleTransactionClick }) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const scrollRef = useRef(null);
        
    useEffect(() => {
        // Reset pagination when component mounts
        setPage(1);
        setHasMore(true);
        SendMoney({
            page: 1,
            limit: 10
        });
    }, []);

    // Check if we can load more data
    useEffect(() => {
        if (respond?.pagination) {
            const { currentPage, totalPages } = respond.pagination;
            setHasMore(currentPage < totalPages);
        }
    }, [respond]);

    const loadMoreData = useCallback(async () => {
        if (!hasMore || isLoadingMore) {
            return;
        }
        
        setIsLoadingMore(true);
        const nextPage = page + 1;
        
        try {
            await SendMoney({
                page: nextPage,
                limit: 10
            });
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [page, hasMore, isLoadingMore, SendMoney]);

    const renderTransactionItem = (transaction) => (
        <div 
            key={transaction._id}
            onClick={() => handleTransactionClick(transaction)}
            className="flex items-center justify-between py-3 px-1 cursor-pointer  transition-colors"
        >
            <div className="flex items-center gap-x-3">
                {/* Profile Image or Bank Transfer Icon */}
                <div className="relative">
                    {transaction.type === 'deposit' && !transaction.user?.profileImage ? (
                        // Bank transfer icon
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <Icon name="building-bank" className="text-white text-sm" />
                        </div>
                    ) : (
                        // User profile image
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                            {transaction.user?.profileImage ? (
                                <img 
                                    src={transaction.user.profileImage} 
                                    alt={transaction.user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Icon name="user" className="text-gray-500 text-sm" />
                            )}
                        </div>
                    )}
                </div>

                {/* Transaction Details */}
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900 dark:text-gray-200 text-sm">
                            {transaction.type === 'deposit' && !transaction.user?.name 
                                ? 'Transfer To Bank' 
                                : transaction.user?.name || 'Unknown User'
                            }
                        </p>
                        {/* Status indicator */}
                    </div>
                    <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 mt-0.5">
                        #{transaction.ticketNumber}
                    </p>
                    </div>
                </div>
            </div>

            {/* Amount */}
            <div className="text-right">
                <p className="font-semibold text-blue-500 text-sm">
                    +{transaction.amount || transaction.fundAmount} {transaction.currency || t('egp_currency')}
                </p>
            </div>
        </div>
    );

    return (
        <>
            {/* Header */}
            <div className='flex gap-3 z-50'>
                <div onClick={() => setOpened(0)} className='rounded-full header-border h-14 w-14 flex justify-center items-center cursor-pointer'>
                    <Icon className="text-xl size-5" name={'xmark'} />
                </div>
                <span className='flex justify-center capitalize items-center rounded-full header-border px-7 h-14 text-lg font-medium'>
                    {t('sent transactions')}
                </span>
            </div>
            
            {/* Transaction List */}
            <div className="  shadow-sm max-h-[70vh] overflow-y-auto">
                {respond?.loading && page === 1 ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : respond?.error ? (
                    <div className="text-center py-12 text-red-500">
                        <Icon name="exclamation-circle" className="text-3xl mb-3" />
                        <p className="text-sm">{t('Failed to load transactions')}</p>
                    </div>
                ) : respond?.data?.length > 0 ? (
                    <ViewAll 
                        list={respond.data}
                        renderItem={renderTransactionItem}
                        isLoadingMore={isLoadingMore}
                        hasMore={hasMore}
                        scrollRef={scrollRef}
                        loadMoreData={loadMoreData}
                        t={t}
                    />
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <Icon name="inbox" className="text-4xl mb-3" />
                        <p className="text-sm">{t('No transactions found')}</p>
                    </div>
                )}
            </div>
        </>
    )
}

const ViewAll = ({ list, renderItem, isLoadingMore, hasMore, scrollRef, loadMoreData, t }) => {
    const scrollContainerRef = useRef(null);

    // Intersection Observer for infinite scroll within ViewAll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    console.log('Loading more transactions in ViewAll...');
                    loadMoreData();
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
    }, [hasMore, isLoadingMore, loadMoreData]);

    return (
        <div 
            ref={scrollContainerRef}
            className="divide-y divide-gray-100 min-h-[200px] overflow-y-auto max-h-[60vh]"
        >
            {list.map(renderItem)}
            
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
                    <span className="text-sm">{t('No more transactions')}</span>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.SendMoney,
    user: state.user.profile
});

const mapDispatchToProps = {
    SendMoney,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMyMoney);
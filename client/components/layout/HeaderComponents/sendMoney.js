import Icon from "../../Icons";
import { connect } from "react-redux";
import { SendMoney } from '../../../redux/action/apis/transactions/SendMoney';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const SendMyMoney = ({ setOpened, SendMoney, user, api, respond, handleTransactionClick }) => {
    const { t } = useTranslation();
    
    useEffect(() => {
        SendMoney()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success':
                return 'text-green-500';
            case 'pending':
                return 'text-yellow-500';
            case 'denied':
            case 'failed':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return 'check-circle';
            case 'pending':
                return 'clock';
            case 'denied':
            case 'failed':
                return 'x-circle';
            default:
                return 'question-circle';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'success':
                return 'Success';
            case 'pending':
                return 'Pending';
            case 'denied':
                return 'Denied';
            case 'failed':
                return 'Failed';
            default:
                return 'Unknown';
        }
    };

    const renderTransactionItem = (transaction) => (
        <div 
            key={transaction._id}
            onClick={() => handleTransactionClick(transaction)}
            className="flex items-center justify-between py-3 px-1 cursor-pointer  transition-colors rounded-lg"
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
                        {formatDate(transaction.timeStamp || transaction.createdAt)}
                    </p>
                    {transaction.status !== 'success' && (
                            <div className="flex items-center space-x-1">
                                <div className={`w-2 h-2 rounded-full ${
                                    transaction.status === 'pending' ? 'bg-yellow-500' : 
                                    transaction.status === 'denied' ? 'bg-red-500' : 'bg-gray-500'
                                }`}></div>
                                <span className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                    {getStatusText(transaction.status)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Amount */}
            <div className="text-right">
                <p className="font-semibold text-blue-500 text-sm">
                    +{transaction.amount || transaction.fundAmount} {transaction.currency || 'US$'}
                </p>
            </div>
        </div>
    );

    return (
        <>
            {/* Header */}
            <div className='flex gap-3 z-50 mb-5'>
            <div onClick={() => setOpened(0)} className='rounded-full header-border h-14 w-14 flex justify-center items-center cursor-pointer'>
                    <Icon className="text-xl size-5" name={'xmark'} />
                </div>
                <span className='flex justify-center items-center rounded-full header-border px-6 h-14 text-base font-medium '>
                    {t('Money Sent')}
                </span>
            </div>
            
            {/* Transaction List */}
            <div className=" rounded-2xl shadow-sm">
                {respond?.loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : respond?.error ? (
                    <div className="text-center py-12 text-red-500">
                        <Icon name="exclamation-circle" className="text-3xl mb-3" />
                        <p className="text-sm">{t('Failed to load transactions')}</p>
                    </div>
                ) : respond?.data?.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {respond.data.map(renderTransactionItem)}
                    </div>
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

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.SendMoney,
    user: state.user.profile
});

const mapDispatchToProps = {
    SendMoney,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMyMoney);
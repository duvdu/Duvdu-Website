import Icon from "../../Icons";
import { connect } from "react-redux";
import { ReceiveMoney } from '../../../redux/action/apis/transactions/ReceiveMoney';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const ReceiveMyMoney = ({ setOpened, ReceiveMoney, user, api, respond , handleTransactionClick }) => {
    const { t } = useTranslation();
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    useEffect(() => {
        ReceiveMoney()
    }, [])


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };


    const renderTransactionItem = (transaction) => (
        <div 
            key={transaction._id}
            onClick={() => handleTransactionClick(transaction)}
            className="flex items-center justify-between rounded-lg mb-3 cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {transaction.createdBy?.profileImage ? (
                        <img 
                            src={transaction.createdBy.profileImage} 
                            alt={transaction.createdBy.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Icon name="user" className="text-gray-500 text-xl" />
                    )}
                </div>
                <div>
                    <p className="font-medium ">{transaction.createdBy?.name || 'Unknown User'}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                    {transaction.status !== 'success' && (
                        <div className="flex items-center space-x-1 mt-1">
                            <Icon 
                                name={getStatusIcon(transaction.status)} 
                                className={`text-sm ${getStatusColor(transaction.status)}`} 
                            />
                            <span className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-right">
                <p className={`font-semibold ${transaction.status === 'success' ? 'text-blue-600' : 'text-gray-600'}`}>
                    +{transaction.fundAmount} {transaction.currency || 'US$'}
                </p>
            </div>
        </div>
    );

    return (
        <>
            <div className='flex gap-3 z-50'>
                <div onClick={() => setOpened(0)} className='rounded-full header-border h-14 w-14 flex justify-center items-center cursor-pointer'>
                    <Icon className="text-xl size-5" name={'xmark'} />
                </div>
                <span className='flex justify-center items-center rounded-full header-border px-7 h-14 text-lg font-medium'>
                    {t('Money Received')}
                </span>
            </div>
            
            <div className="mt-6">
                {respond?.loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : respond?.error ? (
                    <div className="text-center py-8 text-red-600">
                        <Icon name="exclamation-circle" className="text-2xl mb-2" />
                        <p>{t('Failed to load transactions')}</p>
                    </div>
                ) : respond?.data?.length > 0 ? (
                    <div className="space-y-3">
                        {respond.data.map(renderTransactionItem)}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <Icon name="inbox" className="text-3xl mb-2" />
                        <p>{t('No transactions found')}</p>
                    </div>
                )}
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.ReceiveMoney,
    user: state.user.profile
});

const mapDispatchToProps = {
    ReceiveMoney,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveMyMoney); 
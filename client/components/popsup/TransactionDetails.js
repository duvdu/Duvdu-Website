import React, { useState } from 'react';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';
import Loading from '../elements/loading';


function TransactionDetails({onClick,id ,info}) {
    const { t } = useTranslation();
    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return 'check-circle';
            case 'pending':
                return 'clock';
            case 'denied':
            case 'failed':
                return 'exclamation-circle';
            default:
                return 'question-circle';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'success':
                return 'text-blue-600';
            case 'pending':
                return 'text-yellow-600';
            case 'denied':
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };





    return (
        <>
            <Popup id={'transaction-details'} header={t('Transaction Details')  } className='w-full h-full text-center z-[100]' onCancel={onClick} >
                
                {info && (
                    <div className="md:w-96 mt-5">
                        <div className="flex items-center gap-x-4 mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                                {info.createdBy?.profileImage || info.user?.profileImage ? (
                                    <img 
                                        src={info.createdBy?.profileImage || info.user?.profileImage} 
                                        alt={info.createdBy?.name || info.user?.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Icon name="user" className="text-gray-500 text-2xl" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{info.createdBy?.name || info.user?.name}</h3>
                                {info.createdBy?.username || info.user?.username && (
                                    <p className="text-gray-500">@{info.createdBy?.username || info.user?.username}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-[#1A2030] rounded-lg">
                                <span className="text-gray-600">{t('Amount')}</span>
                                <span className="font-semibold text-lg text-blue-600">
                                    +{info.fundAmount || info.amount} {info.currency || 'US$'}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">{t('Status')}</span>
                                <div className="flex items-center space-x-2">
                                    <Icon 
                                        name={getStatusIcon(info.status)} 
                                        className={`${getStatusColor(info.status)}`} 
                                    />
                                    <span className={`font-medium ${getStatusColor(info.status)}`}>
                                        {info.status.charAt(0).toUpperCase() + info.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                            {info.createdAt && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">{t('Date')}</span>
                                <span className="text-gray-900 dark:text-gray-600">{formatDate(info.createdAt)}</span>
                            </div>
                            )}
                            {info.ticketNumber && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">{t('Ticket #')}</span>
                                    <span className="text-gray-900 dark:text-gray-600 font-mono">{info.ticketNumber}</span>
                                </div>
                            )}

                            {info.withdrawMethod && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">{t('Method')}</span>
                                    <span className="text-gray-900 dark:text-gray-600">{info.withdrawMethod.name}</span>
                                </div>
                            )}

                            {info.fundAttachment.length > 0 && (
                                <div className="mt-4">
                                    <a 
                                        href={info.fundAttachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-x-2 w-full p-3  text-blue-600 rounded-lg transition-colors"
                                    >
                                        <Icon name="file-pdf" className="w-5 h-5" />
                                        <span>{t('View Attachment')}</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Popup>


        </>
    );
}


export default TransactionDetails;

import React, { useState } from 'react';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';
import Loading from '../elements/loading';


function TransactionDetails({onClick,id ,info , isRefunded = true}) {
    const { t } = useTranslation();
    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
      
        let hours = date.getUTCHours();
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;
        const formattedHour = String(hours).padStart(2, '0');
      
        return `${year}-${month}-${day} ${formattedHour}:${minutes}${ampm}`;      
    };
    

    return (
        <>
            <Popup id={'transaction-details'} header={t('Transaction Details')  } className='w-full h-full text-center z-[100]' onCancel={onClick} >
                {!isRefunded ? (
                    <>
                    {info && (
                        <div className="md:w-96 mt-5">
                            <div className="flex items-center gap-x-4 mb-6">
                            <section className='flex flex-col gap-4 w-full'>
                            {info.user.name && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("client info")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                {info.user.name}
                                </span>
                            </div>
                            }
                            {info.status && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("status")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                {info.status}
                                </span>
                            </div>
                            }
                            {info.ticketNumber && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("transaction number")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                {info.ticketNumber}
                                </span>
                            </div>
                            }
                            {info.amount && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("amount")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                    {info.amount} {info.currency ?? t('egp_currency')}
                                </span>
                            </div>
                            }
                            {info?.fundedBy?.name && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("refunded by")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                    {info.fundedBy.name}
                                </span>
                            </div>
                            }
                            {info.fundedAt && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("refunded at")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                    {formatDate(info.fundedAt)}
                                </span>
                            </div>
                            }
                            {info?.fundingAmount > 0 && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("funding amount")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                    {info.fundingAmount} {info.currency ?? t('egp_currency')}
                                </span>
                            </div>
                            }
                               {info.fundAttachment && info.fundAttachment.length > 0 && (
                                <AppButton className='w-full' onClick={() => window.open(info.fundAttachment, '_blank')}>
                                    {t('View Attachment')}
                                </AppButton>
                                )}
                               {info.contract&& (
                                <AppButton className='w-full' onClick={() => window.open(`/contracts?contract=${info.contract}`, '_blank')}>
                                    {t('View Contract')}
                                </AppButton>
                                )}
    
                            </section>   
                            </div>
                        </div>
                    )}
                    </>
                ) : (
                    <>
                    {info && (
                        <div className="md:w-96 mt-5">
                            <div className="flex items-center gap-x-4 mb-6">
                            <section className='flex flex-col gap-4 w-full'>
                            {info.user?.name && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("client info")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                {info.user.name}
                                </span>
                            </div>
                            }
                            {info.createdBy?.name && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("transferred by")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                {info.createdBy.name}
                                </span>
                            </div>
                            }
                            {info.status && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("status")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                {info.status}
                                </span>
                            </div>
                            }
                            {info.ticketNumber && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("transaction number")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                {info.ticketNumber}
                                </span>
                            </div>
                            }
                            {info.createdAt && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("transferred date")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                    {formatDate(info.createdAt)}
                                </span>
                            </div>
                            }
                            {info.withdrawMethod && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("transferred method")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                    {info.withdrawMethod?.name} / {info.withdrawMethod?.number}
                                </span> 
                            </div>
                            }
                            {info.fundAmount > 0 && 
                            <div className='flex flex-col gap-2'>
                                <h2 className={`text-start  capitalize`}>
                                    <span className='text-[#747688]'>
                                        {t("amount")}
                                    </span>
                                </h2>
                                <span className={`text-start font-semibold capitalize`}>
                                    {info.fundAmount} {info.currency ?? t('egp_currency')}
                                </span>
                            </div>
                            }
                               {info.fundAttachment && info.fundAttachment.length > 0 && (
                                <AppButton className='w-full' onClick={() => window.open(info.fundAttachment, '_blank')}>
                                    {t('View Attachment')}
                                </AppButton>
                                )}
                               {info.contract&& (
                                <AppButton className='w-full' onClick={() => window.open(`/contracts?contract=${info.contract}`, '_blank')}>
                                    {t('View Contract')}
                                </AppButton>
                                )}
    
                            </section>   
                            </div>
                        </div>
                    )}
                    </>
                )}
            </Popup>


        </>
    );
}


export default TransactionDetails;


import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from "../Icons";
import { connect } from "react-redux";

function Subscription({CloseProfile , isLogin , user}) {
    const { t } = useTranslation();
    return (isLogin &&
        ( user?.avaliableContracts == 0 ? 
        <div className="p-3 bg-white dark:bg-[#1A2024] rounded-[15px]">
            <button data-popup-toggle="popup" data-popup-target={'contract_subscription'} onClick={CloseProfile ? CloseProfile : null} className="flex !text-start !items-start gap-3">
                <div className='bg-[#FFE7E7] rounded-md h-14 min-w-14 flex items-center justify-center'>
                    <Icon className='w-[18px]' name="exclamation" />
                </div>
                <div className="flex flex-col w-full">
                    <p className="font-semibold"> {t('Contract Subscription Required')}</p>
                    <p className="text-[#808080] text-sm leading-4">{t('To accept contracts, we need to subscribe to get new 5 contracts.')}</p>
                </div>
            </button>
        </div>:
        <div className="p-3 bg-white dark:bg-[#1A2024] rounded-[15px]">
            <button data-popup-toggle="popup" data-popup-target={'contract_subscription'} onClick={CloseProfile ? CloseProfile : null} className="flex !text-start !items-start gap-3">
                <div className='bg-[#FFE7E7] rounded-md h-14 min-w-14 flex items-center justify-center'>
                    <Icon className='w-[18px]' name="done" />
                </div>
                <div className="flex flex-col w-full">
                    <p className="font-semibold"> {t('Contracts Subscription')}</p>
                    <p className="text-[#808080] text-sm leading-4">{t('Now you have')} {user?.avaliableContracts} {t('available contracts')}</p>
                </div>
            </button>
        </div>)
    );
}
const mapStateToProps = (state) => ({
    isLogin: state.auth.login,
    user: state.user.profile,
});


export default connect(mapStateToProps)(Subscription);


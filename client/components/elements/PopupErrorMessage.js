import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icons';

const PopupErrorMessage = ({ ErrorMsg , errorPopup , CloseToast }) => {
        const { t } = useTranslation();
    useEffect(() => {
        if(CloseToast) {
            const timer = setTimeout(() => {
                CloseToast();
            }, 5000);
    
            // Cleanup timer when the component unmounts
            return () => clearTimeout(timer);
        }
    }, [CloseToast]);
    return (
        errorPopup && ErrorMsg &&(
        <div
            className={`transition ${(errorPopup) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full d-none'}  absloute  duration-700  ease-in-out max-w-md w-full bg-[#fb2c36] z-[500000] fixed top-5 right-5 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 pt-0.5">
                            <Icon name='circle-exclamation' className="size-6 p-1 text-white" />
                        </div>
                        <div className="ms-3 flex-1">
                            <p className="mt-1 text-white">
                                {t(ErrorMsg)} 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex py-4 pl-4 items-center border-l border-gray-200 dark:border-gray-700">
                    <button
                        onClick={CloseToast}
                        className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                    >
                        {/* {t('Close')} */}
                        <Icon name='xmark' className="size-6 p-1 text-white" />
                    </button>
                </div>
            </div>
        )
    );
}

export default PopupErrorMessage;

import React from "react";
import Icon from '../Icons';
import { useTranslation } from 'react-i18next';

const ArrowBtn = ({ className , loading, children, text, onClick, isEnable = true, IconName = "angle-right", ...rest }) => {
    const { t } = useTranslation();

    const handleClick = () => {
        if (isEnable && onClick) {
            onClick();
        }
    };


    return (
        <div
            onClick={handleClick}
            className={`${isEnable ? 'bg-primary' : 'bg-[#677A93]'} flex rounded-full p-1 ${className}`}
            {...rest}
            style={{ cursor: isEnable ? 'pointer' : 'not-allowed' }}
        >
            <div className="w-full flex justify-center items-center">
                <span className="capitalize flex mx-2 lg:mx-5 items-center text-base sm:text-lg font-bold text-DS_white text-center text-white whitespace-nowrap">{t(text)}</span>
            </div>
            <div className={`flex aspect-square items-center justify-center rounded-full bg-white bg-opacity-25 h-16 sm:h-20 ${isEnable ? 'opacity-100' : 'opacity-50'}`}>
                {loading ? 
                <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />:
                <Icon className="rtl:rotate-180 text-white text-3xl w-3 " name={IconName} />
                }
            </div>
        </div>
    );
};

export default ArrowBtn;

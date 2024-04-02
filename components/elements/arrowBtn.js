import React from "react";
import Icon from '../Icons';

const ArrowBtn = ({ className, children, text, Click, isEnable = true, IconName = "angle-right", ...rest }) => {

    const handleClick = () => {
        if (isEnable && Click) {
            Click();
        }
    };


    return (
        <div
            onClick={handleClick}
            className={`${isEnable ? 'bg-primary' : 'bg-[#677A93]'} flex rounded-full p-1 w-min sm:w-96 ${className}`}
            {...rest}
            style={{ cursor: isEnable ? 'pointer' : 'not-allowed' }}
        >
            <div className="w-full flex justify-center items-center">
                <span className="capitalize flex mx-5 items-center text-lg font-bold text-DS_white text-center text-white whitespace-nowrap">{text}</span>
            </div>
            <div className={`flex aspect-square items-center justify-center rounded-full bg-white bg-opacity-25 h-20 ${isEnable ? 'opacity-100' : 'opacity-50'}`}>
                <Icon className="text-white text-3xl" name={IconName} />
            </div>
        </div>
    );
};

export default ArrowBtn;

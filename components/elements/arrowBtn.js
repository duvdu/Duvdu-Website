import React from "react";
import Icon from '../Icons';


const arrowBtn = ({className,children,text,Click, ...rest}) => {
    return (
        <>
        <div onClick={Click} className={`bg-primary flex rounded-full p-1 ${className}`} {...rest}>
            <div className="w-full flex justify-center items-center">
            <span className="capitalize flex mx-5 items-center text-lg font-bold text-DS_white text-center">{text}</span>
            </div>
            <div className="flex aspect-square items-center justify-center rounded-full bg-white bg-opacity-25 h-20 w-20">
                <Icon name={'right-arrow'}/>
            </div>
        </div>
        </>
    );
};

export default arrowBtn;

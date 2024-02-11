import React from "react";
import Icon from '../Icons';


const arrowBtn = ({className,children, ...rest}) => {
    return (
        <>
        <div className={`bg-primary flex rounded-full p-1 ${className}`} {...rest}>
            <span className="capitalize flex mx-5 items-center text-lg font-bold text-DS_white">book now</span>
            <div className="flex aspect-square items-center justify-center rounded-full bg-white bg-opacity-25 h-20 w-20">
                <Icon name={'right-arrow'}/>
            </div>
        </div>
        </>
    );
};

export default arrowBtn;

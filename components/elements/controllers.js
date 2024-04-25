import React from "react";


const controllers = ({ children,className,...rest }) => {
    return (
        <>
        <div className={`controller-holder flex p-[5px] gap-1 lg:p-2 items-center ${className}`} {...rest}>
            {children}
        </div>
        </>
    );
};



export default controllers;

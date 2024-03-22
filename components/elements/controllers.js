import React from "react";


const controllers = ({ children,className }) => {
    return (
        <>
        <div className={`controller-holder flex gap-[5px] p-[5px] lg:gap-2 lg:p-2 items-center ${className}`}>
            {children}
        </div>
        </>
    );
};



export default controllers;

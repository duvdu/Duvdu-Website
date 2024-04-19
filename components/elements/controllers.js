import React from "react";


const controllers = ({ children,className }) => {
    return (
        <>
        <div className={`controller-holder flex p-[5px] gap-1 lg:p-2 items-center ${className}`}>
            {children}
        </div>
        </>
    );
};



export default controllers;

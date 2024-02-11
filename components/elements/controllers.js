import React from "react";


const controllers = ({ children,className }) => {
    return (
        <>
        <div className={`controller-holder flex gap-2 p-2 items-center ${className}`}>
            {children}
        </div>
        </>
    );
};



export default controllers;

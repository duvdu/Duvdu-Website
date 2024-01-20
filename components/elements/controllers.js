import React from "react";


const controllers = ({ children }) => {
    return (
        <>
        <div className="controller-holder w-min flex gap-2 p-2">
            {children}
        </div>
        </>
    );
};



export default controllers;

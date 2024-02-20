import React, { useState } from 'react';
import Icon from '../Icons';

const Popup = ({ isOpen, onClose, children, header, className }) => {

    return (
        <div className={`popup z-30 ${isOpen ? 'open' : ''} ${className}`}>
            <div className="overlay blur" onClick={onClose}></div>
            <div className='card content bg-[#F7F9FB] dark:bg-[#131313] py-3 mx-10 '>
                <div className='flex gap-3'>
                    <div onClick={onClose} className='flex rounded-full header-border p-4 cursor-pointer'>
                        <Icon name={'x'} useinvert={true} />
                    </div>
                    {
                        header &&
                        <span className='flex rounded-full header-border px-7 py-4 text-lg font-medium'>
                            {header}
                        </span>
                    }
                </div>
                {children}
            </div>

        </div>
    );
};

export default Popup;

import React, { useState } from 'react';
import Icon from '../Icons';

const Popup = ({ isOpen, onClose, children, header,className }) => {
    
    return (
        <div className={`popup ${isOpen ? 'open' : ''} ${className}`}>
            <div className="overlay blur" onClick={onClose}></div>
            <div className='card content py-3 mx-10 '>
                <div className='flex gap-3'>
                    <div onClick={onClose} className='flex rounded-full header-border p-4 cursor-pointer'>
                        <Icon name={'x'} useinvert={true}/>
                    </div>
                    <span className='flex rounded-full header-border px-7 py-4 text-lg font-medium'>
                        {header}
                    </span>
                </div>
                {children}
            </div>

        </div>
    );
};

export default Popup;

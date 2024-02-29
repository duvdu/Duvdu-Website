import React, { useState } from 'react';
import Icon from '../Icons';

const Popup = ({ id, children, header, className = "" ,img}) => {

    return (
        <div id={id} className={`popup z-30 ${className}`}>
            <div data-popup-dismiss="popup" className="flex overlay blur" ></div>
            <div className='card content p-5 bg-[#F7F9FB] dark:bg-[#131313] mx-10 ' style={img ? { backgroundImage: `url(${img})` } : {}}>
                <div className='flex gap-3 sticky top-0'>
                    <div data-popup-dismiss="popup" className='flex rounded-full header-border p-4 cursor-pointer justify-center items-center'>
                        <Icon name={'x'} useinvert={true} className='w-6 h-6' />
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

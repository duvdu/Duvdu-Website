
import React from 'react';
import Icon from '../Icons';
import { useState } from 'react';

const Drawer = ({ isOpen, toggleDrawer, img, name, children, className = "" }) => {

    return (
        <>
            {isOpen && <div onClick={toggleDrawer} className='z-10 fixed w-screen h-screen bg-DS_black opacity-60 top-0 left-0' />}
            <div className={`z-20 fixed top-0 right-0 h-full bg-DS_white shadow-lg transform transition-transform ease-in-out duration-300  w-full md:w-2/3 lg:w-1/2 xl:w-1/3  ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${className}`}>
                <div className="p-8">
                    <div className='flex gap-3'>
                        <div className='flex justify-center items-center rounded-full border px-5 cursor-pointer aspect-square' onClick={toggleDrawer}>
                            <Icon className='text-xl' name={'angle-left'} />
                        </div>
                        <div className='flex rounded-full border font-medium items-center'>
                            {img &&
                                <img className="h-11 m-1" src={img} />}
                            {name &&
                                <span className='capitalize mx-5 text-lg'>{name}</span>}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Drawer;

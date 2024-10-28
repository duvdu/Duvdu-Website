import React, { useEffect } from 'react';
import Icon from '../Icons';
import { noScroll } from '../../util/util';

const Drawer = ({ isOpen, step,returnToOne,toggleDrawer, img, name, children, className = "", padding = true }) => {
    useEffect(() => {
        noScroll(isOpen)

        // Function to handle key press
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && isOpen) {
                toggleDrawer();  // Assume toggleDrawer is designed to close the drawer if it's open
            }
        };

        // Add event listener for the Escape key
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function
        return () => {
            noScroll(false)
            window.removeEventListener('keydown', handleKeyDown);  
        };
    }, [isOpen, toggleDrawer]);  

    return (
        <>
            {isOpen && <div onClick={step===2? ()=> returnToOne :toggleDrawer} className='z-10 fixed w-screen h-screen bg-black opacity-60 top-0 left-0' />}
            <div className={`z-30 fixed top-0 right-0 h-full bg-white dark:bg-[#0D0D0D] shadow-lg transform transition-transform ease-in-out duration-300 overflow-y-scroll w-full md:w-2/3 lg:w-1/2 xl:w-1/3  ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${className}`}>
                <div className={padding ? "p-8" : " h-full"}>
                    <div className={'flex gap-3 w-full p-8 h-full' + (!padding ? "p-8 pb-0" : "")} >
                    
                        <div className='flex justify-center items-center rounded-full border px-4 cursor-pointer aspect-square' onClick={toggleDrawer}>
                            <Icon className='w-5 h-5 text-black dark:text-white rtl:rotate-180' name={'angle-left'} />
                        </div>
                            <div className='flex rounded-full border font-medium items-center'>
                            {img &&
                                <img className="size-11 m-1 rounded-full object-cover object-top" src={img} alt='user' />}
                            {name &&
                                <span className='capitalize mx-5 text-lg whitespace-nowrap'>{name}</span>}
                        </div>
                    </div>

                    {children}

                </div>
            </div>
        </>
    );
};

export default Drawer;

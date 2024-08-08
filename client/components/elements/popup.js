import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icons';

const Popup = ({ id, children, onCancel, onOpen, header, className = "", img, addWhiteShadow = false }) => {
    const { t } = useTranslation();

    const popupRef = useRef(null);

    const throttle = (func, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    };


    useEffect(() => {
        const popupElement = popupRef.current;

        if (!popupElement) return;
        
        const handleMutation = mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (popupElement.classList.contains('show')) {
                        if (onOpen) onOpen();
                    } else {
                        if (onCancel) onCancel();
                    }
                    break;
                }
            }
            
        };

        const observer = new MutationObserver(throttle(handleMutation, 200));

        observer.observe(popupElement, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={popupRef} id={id} className={`popup z-30 ${className}`}>
            <div onClick={onCancel} data-popup-dismiss="popup" className="flex overlay blur" />
            <div className='card content bg-[#F7F9FB] dark:bg-[#1A2024] sm:w-auto sm:mx-auto w-full mx-5' style={img ? { backgroundImage: `url(${img})` } : {}}>
                <div className='p-5 pl-[31px]'>
                    <div className='flex gap-3 top-0 -translate-x-4'>
                        <div onClick={onCancel} data-popup-dismiss="popup" className='flex rounded-full header-border p-4 cursor-pointer justify-center items-center'>
                            <Icon name={'xmark'} className='size-6' />
                        </div>
                        {
                            header &&
                            <span className='flex rounded-full header-border px-7 py-4 text-sm sm:text-lg font-medium'>
                                {t(header)}
                            </span>
                        }
                    </div>
                    {children}
                </div>
                {
                    addWhiteShadow &&
                    <div className='h-0 w-full sticky bottom-0 -translate-y-32' >
                        <div className='bottomeffect h-32' />
                    </div>
                }
            </div>
        </div>
    );
};

export default Popup;

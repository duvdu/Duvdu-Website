

import Icon from '../Icons';
import Popup from '../elements/popup';
import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useTranslation } from 'react-i18next';


function MYQRCode({value=''}) {
    const { t } = useTranslation();
    console.log({value})
    return (
        <>
            <Popup id='QR-code'>
            <div className="flex flex-col justify-around w-full sm:w-[604px] py-20">
            {/* <div className="heading_s1 text-center">
                <h1 className="auth-title">{t("My QR Code")}</h1>
            </div> */}
            <div className='w-full flex justify-center'>
                <div className='relative p-9'>
                    <div className='absolute w-9 h-9 top-0 left-0 border-t-4 border-l-4 border-t-primary border-l-primary '></div>
                    <div className='absolute w-9 h-9 bottom-0 left-0 border-b-4 border-l-4 border-b-primary border-l-primary'></div>
                    <div className='absolute w-9 h-9 top-0 right-0 border-t-4 border-r-4 border-t-primary border-r-primary'></div>
                    <div className='absolute w-9 h-9 bottom-0 right-0 border-b-4 border-r-4 border-b-primary border-r-primary'></div>

                    <QRCode
                        size={256}
                        className=''
                        value={value}
                    />
                </div>
            </div>
        </div>
            </Popup>
        </>
    );
}
export default MYQRCode;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icons';

function PopupErrorMessage({ ErrorMsg, errorPopup }) {
    const { t } = useTranslation();
    return (
        errorPopup && ErrorMsg &&(
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-20"> 
                <div className="">
                    <div className="bg-rose-700 text-base p-2 rounded-full">
                        {t(ErrorMsg)}
                    </div>
                </div>
            </div>
        )
    );
}

export default PopupErrorMessage;

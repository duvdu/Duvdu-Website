import React, { useState } from 'react';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';
import Loading from '../elements/loading';


function DeletePopup({onClick,id ,respond ,  header , message}) {
    const { t } = useTranslation();

    const toggleDirectorConfirmed = () => {
        onClick?.(id)
    }
    return (
        <>
            <Popup id={'delete-popup-'+id} header={header} >
                <div method="post" className='mt-12 mx-5'>
                    <span className="text-lg font-[#2F2F2F]"> {t('Are you sure you want to delete')} <span className="text-[#2F2F2F] dark:text-white">{t(message)}</span></span>
                    <div className='mt-12'/>
                    <AppButton isEnabled={!respond?.loading} onClick={toggleDirectorConfirmed} className={'w-full'} color={"#D30000"} >{respond?.loading?<Loading/>:t("Delete")}</AppButton>

                    <div data-popup-dismiss="popup" className='text-[#4C4C4C] dark:text-white text-lg text-center mt-8 cursor-pointer'>{t("Cancel")}</div>
                </div>
            </Popup>

        </>
    );
}


export default DeletePopup;

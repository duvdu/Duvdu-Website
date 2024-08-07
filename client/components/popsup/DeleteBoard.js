import React, { useState } from 'react';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';
import { ClosePopUp,  } from '../../util/util';
import { useTranslation } from 'react-i18next';


function DeleteBoard({onClick,id}) {
    const { t } = useTranslation();

    const toggleDirectorConfirmed = () => {
        ClosePopUp("delete-board-"+id)
        onClick?.(id)
    }

    return (
        <>
            <Popup id={'delete-board-'+id} header={"Delete Board"} >
                <div method="post" className='mt-12 mx-5'>
                    <span className="text-lg font-[#2F2F2F]"> Are you sure you want to delete <span className="text-[#2F2F2F] dark:text-white">{t("the board?")}</span></span>
                    <div className='mt-12'/>
                    <AppButton onClick={toggleDirectorConfirmed} className={'w-full'} color={"#D30000"} >{t("Delete")}</AppButton>

                    <div data-popup-dismiss="popup" className='text-[#4C4C4C] dark:text-white text-lg text-center mt-8 cursor-pointer'>{t("Cancel")}</div>
                </div>
            </Popup>

        </>
    );
}


export default DeleteBoard;

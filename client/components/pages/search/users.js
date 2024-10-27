import Icon from "../../Icons";
import React, { useEffect, useState, useRef } from 'react';
import Filter from "../../elements/filter";
import { convertToK,getRankStyle} from '../../../util/util';
import { connect } from "react-redux";
import { FindUser } from "../../../redux/action/apis/auth/profile/FindUser";
import Popup from "../../elements/popup";
import SelectDate from "../../elements/selectDate";
import AppButton from "../../elements/button";
import DuvduLoading from "../../elements/duvduLoading";
import AddAttachment from "../../elements/attachment";
import { useTranslation } from 'react-i18next';
import DraggableList from "../home/dragList";
import Link from 'next/link';

const User = ({ info }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-[#1A2024] border dark:border-[#FFFFFF33] rounded-[45px] overflow-hidden w-[350px]" >
            <div className="flex w-full overflow-hidden h-32">
                <img className="w-full bg-gray-300 dark:bg-[#ffffff20]" src={info?.coverImage} />
            </div>
            <div className='p-5'>
                <div className='flex items-start gap-4 -translate-y-4 h-11'>
                    <div className='w-[85px] h-[85px] bg-cover relative bg-no-repeat'>
                        <img className='w-full h-full rounded-full border-2 shadow -translate-y-8 object-cover object-top' src={info?.profileImage || process.env.DEFULT_PROFILE_PATH} alt="profile picture" />
                    </div>
                    <div className='flex-2 flex-col gap-1'>
                        <span className='text-2xl font-bold capitalize'>{info?.name?.length > 10?`${info?.name.slice(0,10)}...`:info?.name}</span>
                        {info.location && (
                            <span className='flex items-center gap-2 opacity-40'>
                                <div className='w-3'>
                                    <Icon name="location-dot" />
                                </div>
                                <span className="location">{info.location}</span>
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 mt-6 justify-center items-center">
                    <Link href={`/creative/${info?.username}`}>
                        <div className="flex items-center justify-center capitalize w-full rounded-full text-center border-2 border-primary cursor-pointer">
                            <span className="text-primary font-bold text-lg my-5">{t("view profile")}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const UserSearch = ({ users }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className=''>  
            <h2 className=" text-2xl font-semibold opacity-60 capitalize mb-3 lg:mb-5">{t("creatives")}</h2>
             <DraggableList>
            <div className="flex gap-5">
                {users?.map((value, index) => (
                    <User info={value} key={index} />
                ))}
            </div>
             </DraggableList>
                
        </div>
    )
    
};
export default (UserSearch);

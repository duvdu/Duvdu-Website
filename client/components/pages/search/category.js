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
import { useRouter } from "next/router";

const Category = ({ info }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const handleNavigation = (path, query) => {
        const url = query ? `${path}?${query}` : path;
        router.push(url);
      };
    
    return (
            <button onClick={() => handleNavigation(`/${info.cycle}?category=${info._id}`)} className="bg-white dark:bg-[#1A2024] border p-2 dark:border-[#FFFFFF33] text-center  w-[150px] rounded-[45px] overflow-hidden" >
                <span>{info?.title}</span>
            </button>
    );
}

const CategorySearch = ({ category }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className=''>  
            <h2 className=" text-2xl font-semibold opacity-60 capitalize mb-3 lg:mb-5">{t("creatives")}</h2>
             <DraggableList>
            <div className="flex gap-5">
                {category?.map((value, index) => (
                    <Category info={value} key={index} />
                ))}
            </div>
             </DraggableList>
                
        </div>
    )
    
};
export default (CategorySearch);

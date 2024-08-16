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
import ProjectItem from "../home/projectItem";

const ProjectSearch = ({ users }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="grid md:grid-cols-3 gap-5 w-[85%] md:w-full">
            {users.map((item,i)=>
                <ProjectItem key={i} cardData={item} className={ ' ' } />
            )}
    </div>    
    )
};

export default (ProjectSearch);

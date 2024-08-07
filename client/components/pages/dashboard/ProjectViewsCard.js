// ProjectViewsCard.js
import React from 'react';
import { convertToK } from '../../../util/util';
import Icon from '../../Icons';
import { useTranslation } from 'react-i18next';

const ProjectViewsCard = ({ recieved, userData }) => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col justify-around card green-gradient recieved w-full p-4 sm:p-8 border border-[#97C39E] dark:border-[#577E61]'>
            <div className='flex items-center gap-5'>
                <div className='text-lg capitalize font-semibold opacity-70'>{t("you have recieved")}</div>
                <div className="gap-1 rounded-full px-4 hidden sm:flex items-center dashboard_padge">
                    <span>
                        {/* {
                            !(recieved.rate.isUp) &&
                            <Icon className='text-[#B41D38]' name={'arrow-down-long'} />
                        }
                        {
                            recieved.rate.isUp &&
                            <Icon className='text-[#289C34] dark:text-[#2DB03A]' name={'arrow-up-long'} />
                        } */}
                    </span>
                    <span className={`${recieved ? 'text-[#289C34] dark:text-[#2DB03A]' : 'text-[#B41D38]'}`}>{recieved}%</span>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center pt-5'>
                <div className='text-center'>
                    <span className='text-4xl sm:text-6xl text-DS_black font-semibold sm:font-normal'>{convertToK(userData?.projectsView, 2)}</span>
                    <br />
                    <span className='text-DS_black font-bold'>{t("project views")}</span>
                </div>
                <div className='text-center'>
                    <span className='text-4xl sm:text-6xl text-DS_black font-semibold sm:font-normal'>{convertToK(userData?.likes, 2)}</span>
                    <br />
                    <span className='text-DS_black font-bold'>{t("likes")}</span>
                </div>
                <div className='text-center'>
                    <span className='text-4xl sm:text-6xl text-DS_black font-semibold sm:font-normal'>{convertToK(userData?.profileViews, 2)}</span>
                    <br />
                    <span className='text-DS_black font-bold'>{t("profile views")}</span>
                </div>
            </div>
            <div className='flex'>
                <div className="gap-1 rounded-full px-4 flex sm:hidden items-center dashboard_padge mt-2">
                    <span>
                        {/* {
                            !(recieved.rate.isUp) &&
                            <Icon className='text-[#B41D38]' name={'arrow-down-long'} />
                        }
                        {
                            recieved.rate.isUp &&
                            <Icon className='text-[#289C34] dark:text-[#2DB03A]' name={'arrow-up-long'} />
                        } */}
                    </span>
                    <span className={`${recieved ? 'text-[#289C34] dark:text-[#2DB03A]' : 'text-[#B41D38]'}`}>{recieved}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectViewsCard;

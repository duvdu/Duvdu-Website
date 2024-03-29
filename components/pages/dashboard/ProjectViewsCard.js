// ProjectViewsCard.js
import React from 'react';
import { convertToK } from '../../../util/util';
import Icon from '../../Icons';

const ProjectViewsCard = ({ recieved }) => (
    <div className='flex flex-col justify-around card green-gradient recieved w-full p-8 border border-[#97C39E] dark:border-[#577E61] h-full'>
        <div className='flex items-center gap-5'>
            <div className='text-lg capitalize font-semibold opacity-70'>
                you have recieved
            </div>
            <div className="gap-1 rounded-full px-4 flex items-center dashboard_padge">
                <span >
                    {
                        !(recieved.rate.isUp) &&
                        <Icon className='text-[#B41D38]' name={'arrow-down-long'} />
                    }
                    {
                        recieved.rate.isUp &&
                        <Icon className='text-[#289C34] dark:text-[#2DB03A]' name={'arrow-up-long'} />
                    }
             </span>
                <span className={`${recieved.rate.isUp ? 'text-[#289C34] dark:text-[#2DB03A]' : 'text-[#B41D38]'}`} > {recieved.rate.number}%</span>

            </div>

        </div>
        <div className='flex flex-col lg:flex-row justify-between items-center pt-5'>
            {
                recieved.data.map((e, index) => (
                    <div className='text-center' key={index}>
                        <span className='text-6xl text-DS_black'>{convertToK(e.number, 2)}</span>
                        <br />
                        <span className='text-DS_black'>{e.title}</span>
                    </div>

                ))}
        </div>
        <div />
    </div>
);

export default ProjectViewsCard;

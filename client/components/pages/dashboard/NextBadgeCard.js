import React from 'react';

const NextBadgeCard = ({ badge , next , title }) => (
    <div className='card flex flex-col justify-around blue-gradient w-full text-DS_white text-lg p-6 min-h-36'>
        <div className='capitalize text-lg opacity-70 text-white'>
             {title}
        </div>
        <div className='flex items-center'>
            <div className="progress-bar w-full">
                <div className="progress relative" style={{ width: `${badge}%` }}>
                    <div className="progress blur-12px"></div>
                    <span className="text-DS_white text-sm absolute right-0 bottom-full mb-1 dark:text-white dark:opacity-70">{badge}%</span>
                </div>
            </div>
            <div className='text-[#F5D16B] text-center text-lg rounded-full min-w-max px-3 mx-3 border border-white border-opacity-50 capitalize'>
                {next}
            </div>
        </div>
    </div>
);

export default NextBadgeCard;

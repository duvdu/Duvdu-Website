import React from 'react';

const NextBadgeCard = ({ badge }) => (
    <div className='card flex flex-col justify-around blue-gradient w-full text-DS_white text-lg p-6 min-h-36'>
        <div className='capitalize text-lg opacity-70 text-white'>
            next badge
        </div>
        <div className='flex items-center'>
            <div className="progress-bar w-full">
                <div className="progress relative" style={{ width: `${badge}%` }}>
                    <div className="progress blur-12px"></div>
                    <span className="text-DS_white text-sm absolute right-0 bottom-full mb-1">{badge}%</span>
                </div>
            </div>
            <div className='text-yellow-300 text-center text-lg rounded-full min-w-max px-3 mx-3 text-border capitalize'>
                mid level
            </div>
        </div>
    </div>
);

export default NextBadgeCard;

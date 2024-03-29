// ActivityCard.js
import { convertToK } from '../../../util/util';
import React from 'react';

const ActivityCard = ({ activity }) => (
    <div className='rounded-[45px] flex flex-col justify-around cardborder-3 bg-white dark:bg-[#1A2024] p-6 pt-16 h-full'>
        <div className='flex justify-between'>
            <p className='capitalize text-lg font-bold mb-5'>activity</p>
            <span className='bg-[#D9D9D9] dark:bg-[#333333] rounded-2xl w-5 h-5 flex justify-center cursor-pointer aspect-square items-center'>
                ?
            </span>
        </div>
        {
            activity.map((e, index) => (
                <div className='activity' key={index}>
                    <div className='mb-2'>
                        <span className='text-5xl font-medium'>{convertToK(e.count)} </span>
                        <span className='text-3xl capitalize font-medium opacity-50'>{e.title}</span>
                    </div>
                    <div className='flex'>
                        <div className='dashboard_padge text-sm mx-1 px-2 text-DS_black opacity-70'> {e.state} </div>
                    </div>
                </div>
            ))
        }
    </div>
);

export default ActivityCard;

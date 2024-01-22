// ActivityCard.js
import React from 'react';

const ActivityCard = ({ activity }) => (
    <div className='card cardborder-3 white-gradient p-6 pt-16'>
        <div className='flex justify-between'>
            <p className='capitalize text-lg font-bold mb-5'>activity</p>
            <div className='bg-slate-200 rounded-2xl w-5 h-5 flex justify-center cursor-pointer'>
                <p>?</p>
            </div>
        </div>
        {
            activity.map((e, index) => (
                <div className='activity' key={index}>
                    <div className='mb-2'>
                        <span className='text-5xl font-medium'>{convertToK(e.count)} </span>
                        <span className='text-3xl capitalize font-medium'>{e.title}</span>
                    </div>
                    <div className='flex'>
                        <div className='bg-gray-200 text-sm mx-1 px-2 rounded-2xl'> {e.state} </div>
                    </div>
                </div>
            ))
        }
    </div>
);

export default ActivityCard;

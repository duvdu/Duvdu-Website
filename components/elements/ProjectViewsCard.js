// ProjectViewsCard.js
import React from 'react';
import {convertToK} from '../../util/util';

const ProjectViewsCard = ({ recieved }) => (
    <div className='card green-gradient recieved w-full p-8 cardborder-1 mt-6'>
        <div className='flex items-center gap-5'>
            <div className='text-lg opacity-70 capitalize font-semibold'>
                project views
            </div>
            <div className={`gap-1 rounded-full px-4 flex items-center bg-gray-300 ${recieved.rate.isUp ? 'text-green-700' : 'text-red-700'}`}>
                <span >
                    {
                        !(recieved.rate.isUp) &&
                        <img src='/assets/imgs/theme/icons/downArrow.svg' />
                    }
                    {
                        recieved.rate.isUp &&
                        <img src='/assets/imgs/theme/icons/upArrow.svg' />
                    }

                </span>
                <span> {recieved.rate.number}%</span>
            </div>

        </div>
        <div className='flex justify-between'>
            {
                recieved.data.map((e, index) => (
                    <div key={index}>
                        <span className='text-6xl'>{convertToK(e.number)}</span>
                        <br />
                        <span>{e.title}</span>
                    </div>

                ))}
        </div>
    </div>
);

export default ProjectViewsCard;

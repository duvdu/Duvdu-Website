// ProjectViewsCard.js
import React from 'react';
import {convertToK} from '../../util/util';
import Icon from '../Icons';

const ProjectViewsCard = ({ recieved }) => (
    <div className='card green-gradient recieved w-full p-8 cardborder-1 mt-6'>
        <div className='flex items-center gap-5'>
            <div className='text-lg capitalize font-semibold'>
                you have recieved
            </div>
            <div className="gap-1 rounded-full px-4 flex items-center dashboard_padge">
                <span >
                    {
                        !(recieved.rate.isUp) &&
                        <Icon name={'downArrow'}/>
                    }
                    {
                        recieved.rate.isUp &&
                        <Icon name={'upArrow'}/>
                    }

                </span>
                <span className={`${recieved.rate.isUp ? 'text-green-700' : 'text-red-700'}`} > {recieved.rate.number}%</span>
                
            </div>

        </div>
        <div className='flex flex-col lg:flex-row justify-between items-center pt-5 '>
            {
                recieved.data.map((e, index) => (
                    <div className='text-center' key={index}>
                        <span className='text-6xl text-DS_black'>{convertToK(e.number,2)}</span>   
                        <br />
                        <span className='text-DS_black'>{e.title}</span>
                    </div>

                ))}
        </div>
    </div>
);

export default ProjectViewsCard;

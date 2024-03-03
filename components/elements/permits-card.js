
import React from 'react';
import Icon from '../Icons';
import { convertHoursTo__ } from '../../util/util';


const Card = ({ cardData, className = "", onClick }) => {

  return ( 
    <>
      <div className={`border border-50 border-solid border-gray-300 p-10 ${className}`}>
        <div className='flex flex-col items-center justify-center text-center pb-6'>
          <img className='profileImgture rounded-full' src={cardData.img} alt="profile picture" />
          <div className='flex-2 flex-col gap-1'>
            <h3 className='opacity-80 text-lg font-bold'>{cardData.name}</h3>
            <span className='flex items-center justify-center opacity-40'>
            <Icon className='opacity-50 mr-2' name='location-dot'/>
              <span className="location">{cardData.location}</span>
            </span>
          </div>
        </div>
        <div className='flex justify-center pt-25 items-center gap-3'>
          <p className='rank'>{cardData.rank}</p>
          <p id='photographer' className='flex gap-1'>
            <span>{cardData.projects}</span> <span>projects</span>
          </p>
          <div id='rating' className='flex items-center gap-1'>
            <p>{cardData.rating}</p>
            <Icon className='text-primary w-7' name={'star'} />
          </div>
        </div>
        <div className='flex justify-between mt-7'>
          <div>
            <p className='text-sm capitalize opacity-50 leading-8'>pricing</p>
            <span className='text-5xl'>{cardData.pricing} $</span>
          </div>
          <div className='w-[1px] bg-black opacity-15' />
          <div>
            <p className='text-sm capitalize opacity-50 leading-8'>duration</p>
            <span className='text-5xl'>{convertHoursTo__(cardData.duration)}</span>
          </div>
        </div>
        <button onClick={onClick} className="rounded-full border-2 border-solid border-primary w-full h-16 text-primary text-lg font-bold mt-12">
          book
        </button>
      </div>

    </>
  );
};

export default Card;

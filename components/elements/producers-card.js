
import React from 'react';
import Icon from '../Icons';


const Card = ({ cardData, className = "", onClick }) => {

  return (
    <>
      <div className={`h-min border border-50 border-solid border-gray-300 p-10 ${className}`}>
      <div className='flex items-center justify-center text-center pb-5'>
          <img className='profileImgture-2 m-2 rounded-full w-full h-full border-4 border-white shadow' src={cardData.img} alt="profile picture" />
          <div className='flex-2 flex-col gap-1'>
            <h3 className='opacity-80 text-lg font-bold'>{cardData.name}</h3>
            <span className='flex items-center justify-center opacity-40'>
              <Icon className='opacity-50 mr-2' name='location-dot' />
              <span className="location">{cardData.location}</span>
            </span>
          </div>
        </div>
        <div className='flex justify-center pt-25 items-center gap-3'>
          <div className='Professional-background-decoration px-3 py-1'>
            <span className='Professional-text-decoration font-bold text-lg'>{cardData.rank}</span>
          </div>

          <span className='info-container flex gap-1'>
            <span>{cardData.projects}</span> <span>projects</span>
          </span>
          <div className='info-container flex items-center gap-1'>
            <span>{cardData.rating}</span>
            <div className='w-5'>
            <Icon className='text-primary' name={'rate-star'} />
            </div>
          </div>
        </div>
        <button onClick={onClick} className="rounded-full border-2 border-solid border-primary w-full h-16 text-primary text-lg font-bold mt-12">
          send pitching form
        </button>
      </div>

    </>
  );
};

export default Card;

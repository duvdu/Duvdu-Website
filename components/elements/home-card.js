
import React from 'react';
import Icon from '../Icons';

const Card = ({ cardData }) => {

  return (
    <>
      <div className='home-card' onClick={()=>{ console.log("hello world") }} >
        <div className='project'>
          <img className='cardimg' src={cardData.backgroundImage} alt="projects" />
          {cardData.showLove && <Icon className='love' name={'love-react'} width={44} height={44}/>}
          {cardData.showSound && 
          <Icon className='sound' name={'sound-icon'} width={44} height={44}/>}
        </div>
        <div className='details'>
          <div className='creator-info'>
            <img className='profile' src={cardData.profileImage} alt='user' />
            <p className='name'>{cardData.name}</p>
            <div className='w-100x'></div>
            <p className='value'>{cardData.rating}</p>
             <Icon name={'rating'} width={18} height={16.424}/>
          </div>
          <p className='film-name'>{cardData.filmName}</p>
          <div className='price'>{cardData.price}</div>
        </div>
      </div>
    </>
  );
};

export default Card;

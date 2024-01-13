
import React from 'react';

const Card = ({ cardData }) => {

  return (
    <>
      <div className='home-card'>
        <div className='project'>
          <img className='cardimg' src={cardData.backgroundImage} alt="projects" />
          {cardData.showLove && <img className='love' src='/assets/imgs/theme/icons/love-react.svg' width={44} height={44} alt='love icon' />}
          {cardData.showSound && <img className='sound' src='/assets/imgs/theme/icons/sound-icon.svg' width={44} height={44} alt='sound icon' />}
        </div>
        <div className='details'>
          <div className='creator-info'>
            <img className='profile' src={cardData.profileImage} alt='user' />
            <p className='name'>{cardData.name}</p>
            <div className='w-100x'></div>
            <p className='value'>{cardData.rating}</p>
            <img src='/assets/imgs/theme/icons/rating.svg' width={18} height={16.424} />
          </div>
          <p className='film-name'>{cardData.filmName}</p>
          <div className='price'>{cardData.price}</div>
        </div>
      </div>
    </>
  );
};

export default Card;


import React from 'react';
import Icon from '../Icons';
import { useState } from 'react';

const Card = ({ cardData , className, href }) => {
  const [soundIconName, setSoundIconName] = useState('sound-icon-off');
  const [loveIconName, setLoveIconName] = useState('love-react-off');

  const handleSoundIconClick = () => {
    setSoundIconName(soundIconName === 'sound-icon-off' ? 'sound-icon-on' : 'sound-icon-off');
  };

  const handleLoveIconClick = () => {
    setLoveIconName(loveIconName === 'love-react-off' ? 'love-react-on' : 'love-react-off');
  };

  return (
    <>
      <div className={`home-card ${className}`} onClick={() => { console.log("hello world") }} >
        <div className='project'>
          <a href={href}>
          <img className='cardimg' src={cardData.backgroundImage} alt="projects" />
          </a>
          {cardData.showLove &&
            <div className="blur-container love">
              <Icon className='cursor-pointer' name={loveIconName} onClick={handleLoveIconClick} />
            </div>
          }

          {cardData.showSound &&
            <div className="blur-container sound">
               <Icon className='cursor-pointer' name={soundIconName} onClick={handleSoundIconClick} />
            </div>
          }
        </div>
        <div className='details'>
          <div className='creator-info'>
            <a href='/profile/Anna-Youseff' className='profile cursor-pointer'>
              <img src={cardData.profileImage} alt='user' />
            </a>
            <a href='/profile/Anna-Youseff' className='name cursor-pointer' >
              <p>{cardData.name}</p>
            </a>
            <div className='w-100x'></div>
            <p className='value'>{cardData.rating}</p>
            <Icon name={'rating'} width={18} height={16.424} />
          </div>
          <p className='film-name'>{cardData.filmName}</p>
          <div className='price'>{cardData.price}</div>
        </div>
      </div>
    </>
  );
};

export default Card;

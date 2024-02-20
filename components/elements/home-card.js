
import React from 'react';
import Icon from '../Icons';
import { useState, useRef } from 'react';

import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Card = ({ cardData, className, href }) => {
  const [soundIconName, setSoundIconName] = useState('sound-icon-off');
  const [loveIconName, setLoveIconName] = useState('love-react-off');
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handleSoundIconClick = () => {
    setSoundIconName(soundIconName === 'sound-icon-off' ? 'sound-icon-on' : 'sound-icon-off');
    setIsMuted(soundIconName === 'sound-icon-off' ? true : false)
    if(videoRef.current)
    videoRef.current.muted = soundIconName === 'sound-icon-on';

  };

  const handleLoveIconClick = () => {
    setLoveIconName(loveIconName === 'love-react-off' ? 'love-react-on' : 'love-react-off');
  };

  const handleHover = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.muted = !isMuted;
    }
  };

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  return (
    <>
      <div className={`select-none home-card ${className}`} onClick={() => { }} >
        <div 
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className='project'>
          <a href={href}>
            {
              cardData.backgroundImages.length == 1 &&
                cardData.backgroundImages[0].endsWith('.mp4') ? ( // Check if source is a video
                <video
                  className='cardvideo'
                  loop
                  ref={videoRef}
                >
                  <source src={cardData.backgroundImages[0]} type='video/mp4' />
                </video>
              ) : (
                cardData.backgroundImages.length == 1 &&
                <img className='cardimg' src={cardData.backgroundImages[0]} alt="project" />
              )
            }

            {
              cardData.backgroundImages.length > 1 &&
              <Swiper
                className='cardimg'
                modules={[Autoplay, Navigation, EffectFade, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                loop={true}
                pagination={{
                  clickable: true,
                }}
              >
                {cardData.backgroundImages.map((source, index) => (
                  <SwiperSlide key={index}>
                    <img key={index} src={source} className='cardimg' alt="project" />
                  </SwiperSlide>
                ))}
              </Swiper>
            }
          </a>
          {cardData.showLove &&
            <div onClick={handleLoveIconClick} className="blur-container love z-[1]">
              <Icon className='cursor-pointer' name={loveIconName} />
            </div>
          }

          {cardData.showSound &&
            <div onClick={handleSoundIconClick} className="blur-container sound z-[1]">
              <Icon className='cursor-pointer' name={soundIconName} />
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


import React from 'react';
import Icon from '../Icons';
import { useState, useRef } from 'react';

import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Card = ({ cardData, className = "", href }) => {
  const [soundIconName, setSoundIconName] = useState('volume-xmark');
  const [loveIconName, setLoveIconName] = useState('far');
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handleSoundIconClick = () => {
    setSoundIconName(soundIconName === 'volume-xmark' ? 'volume-high' : 'volume-xmark');
    setIsMuted(soundIconName === 'volume-xmark' ? true : false)
    if(videoRef.current)
    videoRef.current.muted = soundIconName === 'volume-high';

  };

  const handleLoveIconClick = () => {
    setLoveIconName(loveIconName === 'far' ? 'fas' : 'far');
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
      <div className={`select-none project-card ${className}`} onClick={() => { }} >
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
              <Icon className={`cursor-pointer h-4 ${loveIconName === "far" ? 'text-white' : 'text-primary'}`} name={'heart'} type={loveIconName} />
            </div>
          }

          {cardData.showSound &&
            <div onClick={handleSoundIconClick} className="blur-container sound z-[1]">
              <Icon className={`cursor-pointer h-4 ${soundIconName === "volume-xmark" ? 'text-white' : 'text-primary'}`} name={soundIconName} />
            </div>
          }
        </div>
        <div className='details'>
          <div className='creator-info'>
            <a href='/creative/anaa_youseff' className='profile cursor-pointer'>
              <img src={cardData.profileImage} alt='user' />
            </a>
            <a href='/creative/anaa_youseff' className='name cursor-pointer' >
              <p>{cardData.name}</p>
            </a>
            <div className='w-100x'></div>
            <p className='value'>{cardData.rating}</p>
            <Icon className='text-primary w-7' name={'rate-star'} />
          </div>
          <p className='film-name'>{cardData.filmName}</p>
          <div className='price'>{cardData.price}</div>
        </div>
      </div>
    </>
  );
};

export default Card;

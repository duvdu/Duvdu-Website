
import React from 'react';
import Icon from '../Icons';
import { useState, useRef, useEffect } from 'react';
import { convertDuration, isFav } from '../../util/util';
import { login } from "../../redux/action/apis/auth/signin/signin";
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from "react-redux";

import 'swiper/swiper-bundle.css';
import { AddProjectToBoard } from '../../redux/action/apis/savedProject/boardProjects/add';
import { DeleteProjectFromBoard } from '../../redux/action/apis/savedProject/boardProjects/remove';
import Link from 'next/link';
import { SwapProjectToFav } from '../../redux/action/apis/savedProject/fav/favAction';
import { GetProject } from '../../redux/action/apis/cycles/projects/getOne';

const ProjectCard = ({ cardData: initialCardData, className = "", type = 'project', islogin, swapProjectToFav_respond, GetProject, GetProject_respond, SwapProjectToFav }) => {
  const [soundIconName, setSoundIconName] = useState('volume-xmark');
  const [isMuted, setIsMuted] = useState(false);
  const [Duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [actionID, setActionID] = useState(null);
  const [cardData, setCardData] = useState(initialCardData);
  const loveIconName = cardData.isFavourite ? 'fas' : 'far'

  useEffect(() => {
    if (swapProjectToFav_respond && actionID == cardData._id) {
      setCardData(prev => ({
        ...prev,
        isFavourite: !prev.isFavourite
      }));
      setActionID(null)
    }
  }, [swapProjectToFav_respond]);

  useEffect(() => {
    if (videoRef.current) {
      const timerId = setInterval(() => {
        if (videoRef.current?.duration) {
          setDuration(videoRef.current.duration);
          clearInterval(timerId);
        }
      }, 10)
    }
  }, [videoRef.current?.duration == NaN]);

  // useEffect(() => {
  //   if (swapProjectToFav_respond) {
  //     GetProject(cardData._id)
  //   }
  // }, [swapProjectToFav_respond]);



  const loveToggleAction = () => {
    setActionID(cardData._id)
    SwapProjectToFav({ projectId: cardData._id, action: cardData.isFavourite ? "remove" : "add" })
  };

  const timeUpdate = () => {
    setDuration(videoRef.current.duration - videoRef.current.currentTime);
  }
  const handleSoundIconClick = () => {
    setIsMuted(soundIconName === 'volume-xmark' ? true : false)
    if (videoRef.current)
      videoRef.current.muted = soundIconName === 'volume-high';

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
      setDuration(videoRef.current.duration);
    }

  };


  // useEffect(() => {
  //   if (cardData._id) {
  //     setLove(isFav(cardData._id, getBoards_respond))
  //   }
  // }, [cardData._id, getBoards_respond,addProjectToBoard_respond]);


  return (
    <>
      <div className={`select-none project-card  ${className}`} onClick={() => { }} >
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          className='project'>
          <>
            {
              false &&
                cardData.backgroundImages.length == 1 &&
                cardData.backgroundImages[0].endsWith('.mp4') ? ( // Check if source is a video
                <Link href={`/${type}/${cardData._id}`}>
                  <video
                    className='cardvideo relative'
                    ref={videoRef}
                    onTimeUpdate={timeUpdate}
                    loop
                  >
                    <source src={cardData.backgroundImages[0]} type='video/mp4' />
                  </video>
                  <div className="absolute right-3 bottom-3 bg-[#CADED333] rounded-full cursor-pointer py-1 px-3">
                    <span className="text-white">
                      {convertDuration(Duration * 1000)}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link href={`/${type}/${cardData._id}`}>
                  <img className='cardimg cursor-pointer' src={cardData.cover} alt="project" />
                </Link>
              )
            }
            {
              false &&
              cardData.backgroundImages.length > 1 &&
              <Link href={`/${type}/${cardData._id}`}>
                <Swiper
                  dir='ltr'
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
              </Link>
            }
          </>
          {islogin &&
            <div onClick={loveToggleAction} className="blur-container love z-[1]">
              <Icon className={`cursor-pointer h-4 ${loveIconName === "far" ? 'text-white' : 'text-primary'}`} name={'heart'} type={loveIconName} />
            </div>
          }
          {
            cardData.showSound &&
            <div onClick={handleSoundIconClick} className="blur-container sound z-[1]">
              <Icon className={`cursor-pointer h-4 ${soundIconName === "volume-xmark" ? 'text-white' : 'text-primary'}`} name={soundIconName} />
            </div>
          }
        </div>
        <div className='mt-3 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Link href={`/creative/${cardData.user.username}`} >
              <div className='cursor-pointer'>
                <img src={cardData.user.profileImage || process.env.DEFULT_PROFILE_PATH} alt='user' className='size-6 rounded-full object-cover object-top' />
              </div>
            </Link>
            <Link href={`/creative/${cardData.user.username}`}>
              <div className='cursor-pointer' >
                <span className='text-sm font-semibold'>{cardData.user.name || 'NONE'}</span>
              </div>
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-base opacity-80 font-medium'>{(cardData?.user?.rate?.totalRates?.totalRates || 0).toFixed(1)}</span>
            <Icon className='text-primary size-4' name={'rate-star'} />
          </div>
        </div>
        <p className='text-xl opacity-70 font-medium my-4'>{cardData.title}</p>
        <div className='text-xl font-bold'>{cardData.price}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  api: state.api,
  islogin: state.auth.login,
  getBoards_respond: state.api.GetBoards,
  addProjectToBoard_respond: state.api.AddProjectToBoard,
  swapProjectToFav_respond: state.api.SwapProjectToFav,
  GetProject_respond: state.api.GetProject,

});

const mapDispatchToProps = {
  AddProjectToBoard,
  DeleteProjectFromBoard,
  SwapProjectToFav,
  GetProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);

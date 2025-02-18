
import React from 'react';
import Icon from '../Icons';
import { useState, useRef, useEffect } from 'react';
import { convertDuration, isAudio,isVideo, OpenPopUp } from '../../util/util';
import { login } from "../../redux/action/apis/auth/signin/signin";
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from "react-redux";
import { useRouter } from "next/router";
import 'swiper/swiper-bundle.css';
import { AddProjectToBoard } from '../../redux/action/apis/bookmarks/bookmarkItem/add';
import { DeleteProjectFromBoard } from '../../redux/action/apis/bookmarks/bookmarkItem/remove';
import { SwapProjectToFav } from '../../redux/action/apis/bookmarks/fav/favAction';
import DuvduLoading from './duvduLoading';

import Link from 'next/link';
import DeleteBoard from '../popsup/DeleteBoard';

const ProjectCard = ({
  cardData,
  className = "",
  DeleteProjectFromBoard,
  favorite,
  SwapProjectToFav,
  swapProjectToFav_respond,
}) => {
  const Router = useRouter();
  const boardId = Router.query.boardId;
  const [soundIconName, setSoundIconName] = useState('volume-xmark');
  const [loveIconName, setLoveIconName] = useState('far');
  const [isMuted, setIsMuted] = useState(false);
  const [Duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const totalFunctionsUnitPrice = cardData?.details?.functions?.reduce((total, item) => total + item.unitPrice, 0);
  const totalToolsUnitPrice = cardData?.details?.tools?.reduce((total, item) => total + item.unitPrice, 0);
  const inclusivePrice = cardData?.details?.projectScale?.current * (totalToolsUnitPrice + totalFunctionsUnitPrice + cardData?.details?.projectScale?.pricerPerUnit);
  const dropdown = [
    {
      value: "Delete",
    },
  ]
  useEffect(() => {
    if (videoRef.current) {
      const timerId = setInterval(() => {
        if (videoRef.current?.duration) {
          setDuration(videoRef.current.duration);
          clearInterval(timerId);
        }
      }, 10)
    }
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration);
      });
    }
  }, [videoRef.current?.duration, audioRef.current?.duration]);


  const timeUpdate = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration - videoRef.current.currentTime);
    } else if (audioRef.current) {
      setDuration(audioRef.current.duration - audioRef.current.currentTime);
    }
  };

  const handleSoundIconClick = () => {
    setSoundIconName(soundIconName === 'volume-xmark' ? 'volume-high' : 'volume-xmark');
    setIsMuted(soundIconName === 'volume-xmark' ? true : false)
    if (videoRef.current){
      videoRef.current.muted = soundIconName === 'volume-high';
    }
    if (audioRef.current) {
      audioRef.current.muted = soundIconName === 'volume-high';
    }

  };

  const handleLoveIconClick = () => {
    setLoveIconName(loveIconName === 'far' ? 'fas' : 'far');
  };

  const handleHover = () => {
    if (videoRef.current) {
        videoRef.current.play();
        videoRef.current.muted = !isMuted;
    }
    if (isAudioCover && audioRef.current) {
        audioRef.current.play();
        audioRef.current.muted = !isMuted;
    }      
};

const handleLeave = () => {
  if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setDuration(videoRef.current.duration);
  }
  if (audioRef.current) {
      audioRef.current.pause();
      // audioRef.current.currentTime = 0;
  }      

};
const ProjectId = cardData.details._id
  // cardData = cardData.project
  const handleSelectClick = (event) => {
    event.stopPropagation();
  };
  
  const isVideoCover = isVideo(cardData.details.cover)
  const isAudioCover = isAudio(cardData.details?.audioCover);
  const type = cardData.cycle
  useEffect(() => {
      if (videoRef.current) {
          videoRef.current.play();
          videoRef.current.muted = true;     
          const timeout = setTimeout(() => {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
          }, 300); 
          return () => clearTimeout(timeout);
      }
  }, [videoRef.current]);

  return (
    <>
      <DeleteBoard onClick={()=> DeleteProjectFromBoard(boardId, ProjectId)} id={boardId} />
      <div className={`select-none project-card ${className}`} onClick={() => { }} >
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          className='project'>
          <>
            {
              // cardData.cover.length == 1 &&
              isVideoCover ? ( // Check if source is a video
                <Link href={`/${type}/${cardData.details._id}`}>
                  <a>
                    <video
                      autoPlay muted playsInline
                      className='cardvideo'
                      ref={videoRef}
                      onTimeUpdate={timeUpdate}
                      loop
                    >
                      <source src={cardData.details.cover} type='video/mp4' />
                    </video>
                    <div className="absolute right-3 bottom-3 bg-[#CADED333] rounded-full cursor-pointer py-1 px-3">
                      <span className="text-white">
                        {convertDuration(Duration * 1000)}
                      </span>
                    </div>
                  </a>
                </Link>
              ) : isAudioCover ? (
                <Link href={`/${type}/${cardData?.details?._id}`}>
                  <a>
                    <img className='cardimg cursor-pointer' src={cardData?.details?.cover} alt="project" />
                    <audio ref={audioRef} onTimeUpdate={timeUpdate} loop>
                      <source src={cardData?.details?.audioCover} type='audio/mp3' />
                    </audio>
                    <div className="absolute right-3 bottom-3 bg-[#CADED333] rounded-full cursor-pointer py-1 px-3">
                      <span className="text-white">
                        {convertDuration(Duration * 1000)}
                      </span>
                    </div>
                  </a>
                </Link>
              ) : (
                <Link href={`/${type}/${cardData.details?._id}`}>
                  <a>
                    <img className='cardimg cursor-pointer' src={cardData.details?.cover} alt="project" />
                  </a>
                </Link>
              )
            }
            {
              false &&
              cardData.backgroundImages.length > 1 &&
              <Link href={`/${type}/${cardData.details?._id}`}>
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
            {/* <Selector options={dropdown} > */}
            {favorite ?
              <div className="blur-container love z-[1] cursor-pointer" onClick={(v) => {
                handleSelectClick(v)
                SwapProjectToFav({projectId: cardData.details?._id, action:"remove" })
                }}>
                  {swapProjectToFav_respond?.loading&&<DuvduLoading loadingIn={"SwapProjectToFav"} />}
                  <Icon className=" h-4 text-primary" name="heart" />
              </div>
            :
              <div className="blur-container love z-[1] cursor-pointer" onClick={(v) => {
                handleSelectClick(v)
                OpenPopUp('delete-board-' + boardId)}}>
                <Icon className=" size-5 text-red" name="delete" />
              </div>
            }
            {/* </Selector> */}
            {(isVideoCover || isAudioCover) &&
            <div onClick={handleSoundIconClick} className="blur-container sound left-[15px] z-[1]">
              <Icon className={`cursor-pointer h-4 ${soundIconName === "volume-xmark" ? 'text-white' : 'text-primary'}`} name={soundIconName} />
            </div>
          }
        </div>
        
        <div className='mt-3 flex justify-between items-center'>
          <div className='flex gap-2'>
              <div className='flex items-center gap-3'>
                  <Link href={`/creative/${cardData?.details?.user?.username}`} >
                      <div className='cursor-pointer'>
                        <img src={cardData.details.user.profileImage || process.env.DEFULT_PROFILE_PATH} alt='user' className='size-6 rounded-full object-cover object-top' />
                      </div>
                  </Link>
                  <Link href={`/creative/${cardData?.details?.user?.username}`}>
                      <div className='cursor-pointer' >
                        <span className='text-sm font-semibold'>{cardData.details.user.name?.split(' ')[0].length>6?cardData.details.user.name?.split(' ')[0].slice(0,6):cardData.details.user.name?.split(' ')[0] || 'NONE'}</span>
                      </div>
                  </Link>
              </div>
              <div className='flex items-center gap-1'>
                  <Icon className='text-primary size-4' name={'star'} />
                  <span className='text-xs text-primary font-medium'>{(cardData?.details?.user?.rate?.totalRates?.totalRates || 0).toFixed(1)}</span>
              </div>
          </div>
          <div>
              {(cardData?.details?.projectBudget || cardData?.details?.projectScale?.pricerPerUnit) && (
                  <>
                      {/* {i18n.language !== "Arabic" ? ( */}
                      {type=='project'?
                          <span className="text-xs opacity-60 font-semibold">
                          { cardData?.details?.projectScale?.pricerPerUnit * cardData?.details?.projectScale?.current} L.E
                          </span>
                          :
                          <span className="text-xs opacity-60 font-semibold">
                          { cardData?.details?.projectScale?.pricerPerUnit} L.E
                          </span>

                  }
                  </>
              )}


          </div>
      </div>
    
        <p className='text-xl opacity-70 font-medium my-1'>{cardData.details.name || cardData.details.title}</p>
        {/* {(cardData.details.projectBudget || cardData.details.projectScale?.pricerPerUnit) &&
          <>
            <span className='text-xl font-bold'>{cardData.details.projectBudget || cardData.details.projectScale?.pricerPerUnit}{t('EGP')}</span>
            {(cardData.details.projectScale?.unit) &&
              <span className='text-xl ml-2 opacity-60'>
                per {cardData.details.projectScale?.unit}
              </span>}
          </>
        } */}
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  add_respond: state.api.AddProjectToBoard,
  swapProjectToFav_respond: state.api.SwapProjectToFav
});

const mapDispatchToProps = {
  AddProjectToBoard,
  DeleteProjectFromBoard,
  SwapProjectToFav,

};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);


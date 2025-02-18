import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icons';
import { convertDuration, isAudio, isVideo } from '../../util/util';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from "react-redux";
import Link from 'next/link';
import 'swiper/swiper-bundle.css';
import { AddProjectToBoard } from '../../redux/action/apis/bookmarks/bookmarkItem/add';
import { DeleteProjectFromBoard } from '../../redux/action/apis/bookmarks/bookmarkItem/remove';
import { SwapProjectToFav } from '../../redux/action/apis/bookmarks/fav/favAction';
import { GetProject } from '../../redux/action/apis/cycles/projects/getOne';
import DuvduLoading from './duvduLoading';

const ProjectCard = ({ cardData: initialCardData, inclusive, className = "", type = 'project', isLogin, swapProjectToFav_respond, SwapProjectToFav, enbablelove = false }) => {
  const [soundIconName, setSoundIconName] = useState('volume-xmark');
  const [isMuted, setIsMuted] = useState(false);
  const [Duration, setDuration] = useState(0);
  const [defaultInclusive, setDefaultInclusive] = useState(true);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const cardData = initialCardData;
  const [fav, setFav] = useState(false);
  // useEffect(()=>{
  //   if(inclusive && inclusive =='true')
  //     setDefaultInclusive(false)
  // },[inclusive])
  useEffect(() => {
    if (cardData?._id === (swapProjectToFav_respond?.projectId || -1)) {
      setFav(swapProjectToFav_respond.action === "add");
    }
  }, [cardData, swapProjectToFav_respond]);
  useEffect(() => {
    if (enbablelove)
      setFav(true);
    if (cardData?.isFavourite)
      setFav(cardData?.isFavourite);
  }, [cardData?.isFavourite, enbablelove]);
  const totalFunctionsUnitPrice = cardData?.functions?.reduce((total, item) => total + item.unitPrice, 0);
  const totalToolsUnitPrice = cardData?.tools?.reduce((total, item) => total + item.unitPrice, 0);
  const inclusivePrice = cardData?.projectScale.current * (totalToolsUnitPrice + totalFunctionsUnitPrice + cardData?.projectScale.pricerPerUnit);
  const loveIconName = fav ? 'fas' : 'far'
  enbablelove ? loveIconName = 'fas' : loveIconName

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

  const loveToggleAction = () => {
    SwapProjectToFav({ projectId: cardData?._id, action: (fav || enbablelove) ? "remove" : "add" });
  };

  const timeUpdate = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration - videoRef.current.currentTime);
    } else if (audioRef.current) {
      setDuration(audioRef.current.duration - audioRef.current.currentTime);
    }
  };

  const handleSoundIconClick = () => {
    setIsMuted(soundIconName === 'volume-xmark' ? true : false)
    setSoundIconName(soundIconName === 'volume-xmark' ? 'volume-high' : 'volume-xmark')
    if (videoRef.current){
      videoRef.current.muted = soundIconName === 'volume-high';
    }
    if (audioRef.current) {
      audioRef.current.muted = soundIconName === 'volume-high';
    }
  };

  const handleHover = () => {
    if (isVideoCover && videoRef.current) {
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

  const isVideoCover = isVideo(cardData?.cover);
  const isAudioCover = isAudio(cardData?.audioCover);
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
      <div className={`select-none project-card ${className}`} onClick={() => { }}>
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          className='project'>
          <>
            {isVideoCover ? (
                <Link href={`/${type}/${cardData?._id}`}>
                  <a>
                    <video
                      autoPlay muted playsInline
                      className='cardvideo'
                      ref={videoRef}
                      onTimeUpdate={timeUpdate}
                      loop
                    >
                      <source src={cardData?.cover} type='video/mp4' />
                    </video>
                    <div className="absolute right-3 bottom-3 bg-[#CADED333] rounded-full cursor-pointer py-1 px-3">
                      <span className="text-white">
                        {convertDuration(Duration * 1000)}
                      </span>
                    </div>
                  </a>
                </Link>
              ) : isAudioCover ? (
                <Link href={`/${type}/${cardData?._id}`}>
                  <a>
                    <img className='cardimg cursor-pointer' src={cardData?.cover} alt="project" />
                    <audio ref={audioRef} onTimeUpdate={timeUpdate} loop>
                      <source src={cardData?.audioCover} type='audio/mp3' />
                    </audio>
                    <div className="absolute right-3 bottom-3 bg-[#CADED333] rounded-full cursor-pointer py-1 px-3">
                      <span className="text-white">
                        {convertDuration(Duration * 1000)}
                      </span>
                    </div>
                  </a>
                </Link>
              ) : (
                <Link href={`/${type}/${cardData?._id}`}>
                  <a>
                    <img className='cardimg cursor-pointer' src={cardData?.cover} alt="project" />
                  </a>
                </Link>
              )}
            {
              false &&
              cardData?.backgroundImages.length > 1 &&
              <Link href={`/${type}/${cardData?._id}`}>
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
                  {cardData?.backgroundImages.map((source, index) => (
                    <SwiperSlide key={index}>
                      <img key={index} src={source} className='cardimg' alt="project" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Link>
            }
          </>
          {isLogin ===true &&
            <div onClick={loveToggleAction} className="blur-container love z-[1]">
              <Icon className={`cursor-pointer h-4 ${loveIconName === "far" ? 'text-white' : 'text-primary'}`} name={'heart'} type={loveIconName} />
              <DuvduLoading loadingIn={"SwapProjectToFav"} />
            </div>
          }
          {(isVideoCover || isAudioCover) &&
            <div onClick={handleSoundIconClick} className="blur-container sound left-[15px] z-[1]">
              <Icon className={`cursor-pointer h-4 ${soundIconName === "volume-xmark" ? 'text-white' : 'text-primary'}`} name={soundIconName} />
            </div>
          }
        </div>
        <div className='mt-3 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Link href={`/creative/${cardData?.user.username}`} >
              <div className='cursor-pointer'>
                <img src={cardData?.user.profileImage || process.env.DEFULT_PROFILE_PATH} alt='user' className='size-6 rounded-full object-cover object-top' />
              </div>
            </Link>
            <Link href={`/creative/${cardData?.user.username}`}>
              <div className='cursor-pointer' >
                <span className='text-sm font-semibold'>{cardData?.user.name?.split(' ')[0].length>6?cardData?.user.name?.split(' ')[0].slice(0,6):cardData?.user.name?.split(' ')[0] || 'NONE'}</span>
              </div>
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-base opacity-80 font-medium'>{(cardData?.user?.rate?.totalRates?.totalRates || 0).toFixed(1)}</span>
            <Icon className='text-primary size-4' name={'star'} />
          </div>
        </div>
        <p className='text-xl opacity-70 font-medium my-1'>{cardData?.name || cardData?.title}</p>
        {(cardData?.projectBudget || cardData?.projectScale?.pricerPerUnit) &&
        (cardData?.projectScale?.current? 
        ((inclusive)?<>
          <span className='text-xl font-bold'>{inclusivePrice}{t('EGP')}</span>
          </>:
          <>
            <span className='text-xl font-bold'>{cardData?.projectScale?.pricerPerUnit * cardData?.projectScale?.current}{t('EGP')}</span>
          </>)
:(
  <span className='text-xl font-bold'>{cardData?.projectScale?.pricerPerUnit}{t('EGP')}</span>

)
        )
        }
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  api: state.api,
  isLogin: state.auth.login,
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

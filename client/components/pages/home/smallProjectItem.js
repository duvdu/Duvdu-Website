import React from 'react';
import Icon from '../../Icons';
import { useState, useRef, useEffect } from 'react';
import { convertDuration, isVideo } from '../../../util/util';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from "react-redux";

import 'swiper/swiper-bundle.css';
import { AddProjectToBoard } from '../../../redux/action/apis/savedProject/boardProjects/add';
import { DeleteProjectFromBoard } from '../../../redux/action/apis/savedProject/boardProjects/remove';
import Link from 'next/link';
import { SwapProjectToFav } from '../../../redux/action/apis/savedProject/fav/favAction';
import { GetProject } from '../../../redux/action/apis/cycles/projects/getOne';

const SmallProjectItem = ({ cardData: initialCardData, className = "", type = 'project', islogin, swapProjectToFav_respond, SwapProjectToFav, enbablelove = false, isbig }) => {
    const [soundIconName, setSoundIconName] = useState('volume-xmark');
    const [isMuted, setIsMuted] = useState(false);
    const [Duration, setDuration] = useState(0);
    const videoRef = useRef(null);
    const cardData = initialCardData;

    const [fav, setFav] = useState(false);

    useEffect(() => {
        if (cardData?._id === (swapProjectToFav_respond?.projectId || -1)) {
            setFav(swapProjectToFav_respond.action === "add");
        }
    }, [cardData, swapProjectToFav_respond]);

    useEffect(() => {
        if (enbablelove)
            setFav(true);
        if (cardData?.isFavourite)
            setFav(cardData.isFavourite);
    }, [cardData?.isFavourite, enbablelove]);


    const loveIconName = fav ? 'fas' : 'far'

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

    const loveToggleAction = () => {
        SwapProjectToFav({ projectId: cardData._id, action: fav ? "remove" : "add" })
    };

    const timeUpdate = () => {
        setDuration(videoRef.current.duration - videoRef.current.currentTime);
    }
    const handleSoundIconClick = () => {
        setIsMuted(soundIconName === 'volume-xmark' ? true : false)
        setSoundIconName(soundIconName === 'volume-xmark' ? 'volume-high' : 'volume-xmark')
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

    const isVideoCover = isVideo(cardData.cover)
    return (
        <>
            <div className={`select-none project-card flex flex-col ${className}`} onClick={() => { }} >
                <div
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                    className={(isbig ? 'home_project_big' : 'home_project_small') + ' home_project'}>
                    <>
                        {
                            // cardData.cover.length == 1 &&
                            isVideoCover ? ( // Check if source is a video
                                <Link href={`/${type}/${cardData._id}`}>
                                    <a>
                                        <video
                                            className='cardvideo h-full'
                                            ref={videoRef}
                                            onTimeUpdate={timeUpdate}
                                            loop
                                        >
                                            <source src={cardData.cover} type='video/mp4' />
                                        </video>
                                        <div className="absolute right-3 bottom-3 bg-[#CADED333] rounded-full cursor-pointer py-1 px-3">
                                            <span className="text-white">
                                                {convertDuration(Duration * 1000)}
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            ) : (
                                <Link href={`/${type}/${cardData._id}`}>
                                    <a>
                                        <img className='cardimg cursor-pointer' src={cardData.cover} alt="project" />
                                    </a>
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

                    <div className='absolute top-[15px] left-4 flex items-center gap-3 z-[1]'>
                        <Link href={`/creative/${cardData.user.username}`} >
                            <div className='cursor-pointer'>
                                <img src={cardData.user.profileImage || process.env.DEFULT_PROFILE_PATH} alt='user' className='size-8 rounded-full object-cover object-top' />
                            </div>
                        </Link>
                    </div>
                    <div className='absolute bottom-[15px] left-1/2 -translate-x-1/2 flex items-center gap-3 z-[1]'>
                        <h2 className='font-medium text-xl text-white text-center'>
                            {cardData.name}
                        </h2>
                    </div>
                    {
                        isVideoCover &&
                        <div onClick={handleSoundIconClick} className="blur-container small sound z-[1]">
                            <Icon className={`cursor-pointer h-3 ${soundIconName === "volume-xmark" ? 'text-white' : 'text-primary'}`} name={soundIconName} />
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SmallProjectItem);

import React, { useRef, useState } from "react";
import Icon from '../../Icons';

const VideoPlayer = ({ src, audioRef, isPlaying, setIsPlaying, isAnimating, setIsAnimating}) => {
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
    setIsAnimating(!isPlaying)
  };
  return (
    <div className='w-full h-full md:px-5 md:px-0 relative'>
    <video
      ref={audioRef}
      controls
      className='w-full h-full bg-[#000] md:object-cover' 
      loop
    >
      <source src={src} type='video/mp4' />
    </video>
    <div
      className={`absolute inset-0 flex flex-row items-center justify-center ${isAnimating ? 'animate-ping' : ''}`}
      onClick={togglePlayPause}
    >
      {(isAnimating && isPlaying) &&
        <div  className='top-1/2 left-1/2 icon-pause rounded-full ps-10 p-7 size-16 flex flex-row items-center justify-center'>
          <Icon className='text-white my-auto text-center'  name={"pause-video"} />
        </div>
      }
   

      {(!isPlaying) &&
        <div className='top-1/2 left-1/2 icon-pause rounded-full p-7 size-16 flex flex-row items-center justify-center'>
          <Icon className='text-white ' name={"play-video"} />
          </div>
      }
    </div>
  </div>
);
};

export default VideoPlayer;

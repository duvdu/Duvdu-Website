import React from "react";
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
  React.useEffect(() => {
    if (audioRef.current) {
        audioRef.current.play();
        audioRef.current.muted = true;     
        const timeout = setTimeout(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }, 300); 
        return () => clearTimeout(timeout);
    }
  }, [audioRef.current]);

  return (
    <div className='w-full h-full relative'>
    <video
      ref={audioRef}
      // controls
      autoPlay
      playsInline
      muted
      className='w-full h-full bg-[#000] md:object-cover' 
      loop
    >
      <source src={src} type='video/mp4' />
    </video>
    <div
      className={`absolute inset-x-0 top-0 bottom-20 flex flex-row items-center justify-center ${isAnimating ? 'animate-ping' : ''}`}
      onClick={togglePlayPause}
    >
      {(isAnimating && isPlaying) &&
        <div  className='top-1/2 left-1/2 translate-y-1/2 icon-pause rounded-full ps-10 p-7 size-16 flex flex-row items-center justify-center'>
          <Icon className='text-white my-auto text-center'  name={"pause-video"} />
        </div>
      }
   

      {(!isPlaying) &&
        <div className='top-1/2 left-1/2 translate-y-1/2 icon-pause rounded-full p-7 size-16 flex flex-row items-center justify-center'>
          <Icon className='text-white ' name={"play-video"} />
          </div>
      }
    </div>
  </div>
);
};

export default VideoPlayer;

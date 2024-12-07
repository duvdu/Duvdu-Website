import React from "react";
import Icon from '../../Icons';

const VideoPlayer = ({ src, audioRef, isPlaying, setIsPlaying, isAnimating, setIsAnimating}) => {
  const [soundIconName, setSoundIconName] = React.useState('volume-xmark');
  const [isMuted, setIsMuted] = React.useState(false);
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

  const handleSoundIconClick = () => {
    setIsMuted(soundIconName === 'volume-xmark' ? true : false)
    setSoundIconName(soundIconName === 'volume-xmark' ? 'volume-high' : 'volume-xmark')
    if (audioRef.current) {
        audioRef.current.muted = soundIconName === 'volume-high';
    }

  };

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

    <div onClick={handleSoundIconClick} className="absolute cursor-pointer top-[15px] blur-container sound p-2 left-[15px] z-[1]">
        <Icon className={`h-4 ${soundIconName === "volume-xmark" ? 'text-white' : 'text-primary'}`} name={soundIconName} />
    </div>
    {(!isPlaying) &&
    <div onClick={togglePlayPause} className="absolute cursor-pointer top-1/2 p-6 blur-container sound left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
        <Icon className={`h-4 w-4`} name={'play-video'} />
    </div>
    }
    {(isAnimating && isPlaying) &&
    <div onClick={togglePlayPause} className="absolute cursor-pointer animate-ping top-1/2 p-6 blur-container sound left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
        <Icon className={`animate-ping h-4 w-4`} name={'pause-video'} />
    </div>
    }
      {(isPlaying) &&
    <div
      className={`absolute cursor-pointer inset-x-0 top-0 bottom-20 flex flex-row items-center justify-center ${isAnimating ? 'animate-ping' : ''}`}
      onClick={togglePlayPause}
    >
    </div>
      }
  </div>
);
};

export default VideoPlayer;

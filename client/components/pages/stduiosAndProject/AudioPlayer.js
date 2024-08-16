import React, { useRef, useState } from "react";

const AudioPlayer = ({src}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={src} type="audio/mpeg" />
      </audio>
      <div className="controls">
        <div className="progress-bars">
          <div
            className="progress"
            style={{ width: `${(currentTime / duration) * 100}%` , background:'white' }}
          ></div>
        </div>
      </div>
      <div className='flex items-center justify-between w-full px-3'>
        <span className='text-white'>{formatTime(currentTime)}</span>
        <span className='text-white'>-{formatTime(duration - currentTime)}</span>
      </div>
      <div className="buttons">
        <button  onClick={togglePlayPause}>
          {isPlaying ? (
            <span className='text-white'>&#10074;&#10074;</span>
          ) : (
            <span className='text-white'>&#9654;</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;

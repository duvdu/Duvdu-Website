import React, { useRef, useState } from "react";

const AudioPlayer = ({ src, audioRef, isPlaying, setIsPlaying }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverProgress, setHoverProgress] = useState(null); // To store the hover position

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
  console.log(audioRef)
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / progressBarWidth) * duration;
    
    // Update currentTime in audio and in state
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseMove = (e) => {
    const progressBar = e.currentTarget;
    const mousePosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const progressPercentage = (mousePosition / progressBarWidth) * 100;
    
    setHoverProgress(progressPercentage);
  };

  const handleMouseLeave = () => {
    setHoverProgress(null); // Reset hover progress when mouse leaves
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
      <div
        className="controls"
        
      >
        <div className="progress-bars"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleProgressClick}
        >
          <div
            className="progress"
            style={{
              width: `${(currentTime / duration) * 100}%`,
              background: "white"
            }}
          ></div>
          {hoverProgress !== null && (
            <div
              className="hover-progress"
              style={{
                width: `${hoverProgress}%`,
                background: "rgba(255, 255, 255, 0.5)",
                position: "absolute",
                height: "100%",
                top: 0,
                left: 0
              }}
            ></div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-3">
        <span className="text-white">{formatTime(currentTime)}</span>
        <span className="text-white">-{formatTime(duration - currentTime)}</span>
      </div>
      <div className="buttons">
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <span className="text-white">&#10074;&#10074;</span>
          ) : (
            <span className="text-white">&#9654;</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;

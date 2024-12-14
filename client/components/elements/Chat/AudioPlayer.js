import React, { useRef, useState, useEffect } from "react";
import Icon from "../../Icons";
import { useTranslation } from 'react-i18next';
const AudioPlayer = ({ src, audioRef, isMe, time , playAudio }) => {
  const { t  , i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverProgress, setHoverProgress] = useState(null); // To store the hover position

  // Play/Pause th e audio
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      playAudio(audio, setIsPlaying); // Ensure other audios pause
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    const durationValue = audioRef.current.duration;
    setDuration(Number.isFinite(durationValue) ? durationValue : 1.5);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false); // Stop the audio
    setCurrentTime(0); // Reset the time to 0
    audioRef.current.currentTime = 0; // Ensure the audio resets to the beginning
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
    if (Number.isFinite(newTime) && newTime >= 0) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else {
      console.warn("Invalid newTime:", newTime);
    }
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

  useEffect(() => {
    const audio = audioRef.current;

    // Add event listener for when the audio ends
    audio.addEventListener("ended", handleAudioEnd);

    // Clean up the event listener when the component unmounts
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [audioRef]);
  return (
    <>
      <div dir={'ltr'} className="audio-player-chat">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={src} type="audio/wav" preload="auto" />
        </audio>

        <div className={`buttons ${isMe === "me" ? "me" : ""} rounded-full`}>
          <button onClick={togglePlayPause}>
            {isPlaying ? (
              <Icon className={`span ${isMe === "me" ? "me" : ""} size-4`} name={"pause"} />
            ) : (
              <Icon className="span size-4" name={"play"} />
            )}
          </button>
        </div>
        <div className={`controls-chat ${isMe === "me" ? "me" : ""}`}>
          <div
            className="progress-bars-chat"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleProgressClick}
          >
            <div
              className="progress-chat"
              style={{
                width: `${(currentTime / (Number.isFinite(duration) ? duration : 1.5)) * 100}%`,
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
                  left: 0,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
      <div className={`${isMe === "me" ? "me" : ""} time-display flex items-center justify-between`}>
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(Number.isFinite(duration) ? duration : 1.5)}</span>
        </div>
        <span>{time}</span>
      </div>
    </>
  );
};

export default AudioPlayer;

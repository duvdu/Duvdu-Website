import { useState, useRef } from 'react';
import { isVideo , isAudio } from '../../../util/util';
import Icon from '../../Icons';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import { useEffect } from 'react';

const ProjectCover = ({ data , cover  , hidden , onAudioPlay}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(true)
      onAudioPlay(audioRef.current);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
  }
  }, [isPlaying , data]);
  return(
    isAudio(data)?(
      <div className='w-full h-full'>
        {!hidden && 
        <div className='absolute bottom-2 left-1/2 z-30 -translate-x-1/2 p-5'>
            <AudioPlayer
              src={data}
              audioRef={audioRef}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />        
            </div>
        }
        <img
          className="h-full w-full aspect-square object-cover"
          src={cover}
          alt="Project Cover"
        />
      </div>
    ):(
        !isVideo(data) ? (
          <img
            className="h-full w-full aspect-square object-cover"
            src={data}
            alt="Project Cover"
          />
        ) : (
          <VideoPlayer
          src={data}
          audioRef={audioRef}
          isPlaying={isPlaying}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          setIsPlaying={setIsPlaying}
        />        
        ))
      );
}

export default ProjectCover;

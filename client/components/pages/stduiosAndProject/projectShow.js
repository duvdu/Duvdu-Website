import { useState, useRef } from 'react';
import { isVideo , isAudio } from '../../../util/util';
import Icon from '../../Icons';
import AudioPlayer from './AudioPlayer';
import { useEffect } from 'react';

const ProjectCover = ({ data , cover }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const togglePulse = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true)
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
    } else {
      setIsPlaying(false)
      videoRef.current.pause();
    }
  };
  /* Rectangle 2 */

  return(
    isAudio(data)?(
      <div >
        <div className='absolute bottom-2 left-1/2 -translate-x-1/2 p-5'>
          <AudioPlayer src={data}/>
        </div>
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
          <div className='px-5 md:px-0 relative'>
            <video
              ref={videoRef}
              controls
              className=' border border-50 w-full h-full' 
              loop
            >
              <source src={data} type='video/mp4' />
            </video>
            <div
              className={`absolute top-0 left-0 size-full flex flex-row items-center justify-center ${isAnimating ? 'animate-ping' : ''}`}
              onClick={togglePulse}
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
        ))
      );
}

export default ProjectCover;

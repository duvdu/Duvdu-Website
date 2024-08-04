import { useState, useRef } from 'react';
import { isVideo } from '../../../util/util';
import Icon from '../../Icons';

const ProjectCover = ({ data }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const togglePulse = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true)

    } else {
      setIsPlaying(false)
      videoRef.current.pause();
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    !isVideo(data.cover) ? (
      <img
        className="sm:rounded-[50px] w-full"
        src={data?.cover}
        alt="Project Cover"
      />
    ) : (
      <div className='px-5 relative'>
        <video
          ref={videoRef}
          controls
          className='sm:rounded-[50px] border border-50 w-full'
          loop
        >
          <source src={data.cover} type='video/mp4' />
        </video>
        <div
          className={`absolute top-0 left-0 size-full flex flex-row items-center justify-center ${isAnimating ? 'animate-ping' : ''}`}
          onClick={togglePulse}
        >
          {videoRef.current && (isAnimating && isPlaying) &&
            <div className='top-1/2 left-1/2 bg-[#CADED333] rounded-full p-7 flex flex-row items-center justify-center'>
              <Icon className='text-white' name={"play-video"} />
            </div>
          }

          {videoRef.current && (!isPlaying) &&
            <div className='top-1/2 left-1/2 bg-[#CADED333] rounded-full p-7 flex flex-row items-center justify-center'>
              <Icon className='text-white' name={"pause-video"} />
            </div>
          }
        </div>
      </div>
    )
  );
}

export default ProjectCover;

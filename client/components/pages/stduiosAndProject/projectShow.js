import { useState, useRef } from 'react';
import { isVideo } from '../../../util/util';

const ProjectCover = ({ data }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    !isVideo(data.cover) ? (
      <img
        className="sm:rounded-[50px] w-full"
        src={data?.cover}
        alt="Project Cover"
      />
    ) : (
      <video
        ref={videoRef}
        className='sm:rounded-[50px] w-full'
        loop
        onClick={togglePlay} // Click to toggle play/pause
      >
        <source src={data.cover} type='video/mp4' />
      </video>
    )
  );
}

export default ProjectCover;

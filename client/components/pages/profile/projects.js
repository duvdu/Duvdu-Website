import Link from "next/link";
import { isVideo } from '../../../util/util';
import React from 'react'
import ProjectItemHome from "../home/ProjectItemHome";
function getCycle(ref) {
    switch (ref) {
        case "rentals":
        case "studio-booking":
            return "rentals";
        default:
            return "project";
    }
}


function Projects({ projects }) {

    return projects?.length > 0 && (
        <div className='container sm:p-0 project-grid gap-[10px]'>
            {projects.map((data, index) => (
                // <Project key={index} data={data} isbig={(index + 1) % 4 < 2} />
                <ProjectItemHome key={data._id} type={getCycle(data?.ref)} cardData={data} isbig={(index + 1) % 4 < 2}/>
            ))}
        </div>
    )
}
    
const Project = ({ data, isbig }) => {

    const audioRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    React.useEffect(() => {
      if (isPlaying) {
        setIsPlaying(true)
        onAudioPlay(audioRef.current);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 700);
    }
    }, [isPlaying , data]);
  
    return(
    <Link href={`/${getCycle(data.ref)}/${data?.project?._id}`}>
        <div className={isbig ? 'profile-project big w-full xl:w-68% cursor-pointer' : 'profile-project small w-48% xl:w-28% cursor-pointer'}>
            {isVideo(data?.project?.cover) ? 
                <div className='w-full h-full relative'>
                <video
                ref={audioRef}
                controls
                className='w-full h-full bg-[#000] md:object-cover' 
                loop
                >
                <source src={data?.project?.cover} type='video/mp4' />
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

            :<img className='cardimg' src={data?.project?.cover} alt='project cover' />
            }
        </div>

    </Link>
)}

export default Projects
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Icon from '../../components/Icons';
import { convertToK } from "../../util/util";
import ProjectCard from "../../components/elements/project-card";
import { convertHoursTo__ } from '../../util/util';
import Comment from '../../components/elements/comment';
import Controller from '../../components/elements/controllers';
import ArrowBtn from '../../components/elements/arrowBtn';
import AddToTeam from '../../components/popsup/AddToTeam';
import Report from '../../components/popsup/report';
import ThanksMSG from '../../components/popsup/thanksMSG';
import Selector from "../../components/elements/CustomSelector";
import ProjectBooking from "../../components/drawer/book/project";
import GoogleMap from "../../components/elements/googleMap";
import dateFormat from "dateformat";
import StudioBooking from "../../components/drawer/book/studio";
import { GetStudios } from "../../redux/action/apis/cycles/studio/get";
import { Getstudio } from "../../redux/action/apis/cycles/studio/getOne";
import { GetAllMessageInChat } from "../../redux/action/apis/realTime/messages/getAllMessageInChat";



const projects = ({ GetStudios, projects_respond, Getstudio, project_respond, GetAllMessageInChat, chat_respond ,auth}) => {

    const router = useRouter()
    const { studio: studioId } = router.query;
    const projects = projects_respond?.data || []
    const project = project_respond?.data

    useEffect(() => {
        if (studioId)
            Getstudio(studioId);

    }, [studioId]);

    useEffect(() => {
        GetStudios({ limit: 4 });
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const data = project ? {
        _id: project._id,
        title: project.title,
        location: project.location,
        user: {
            profileImage: project.user?.profileImage || process.env.DEFULT_PROFILE_PATH,
            name: project.user?.name || 'NONE',
            rate: project.user?.totalRates || 0,
        },
        creative: {
            _id: project.user?._id,
            profileImage: project.user?.profileImage || process.env.DEFULT_PROFILE_PATH,
            name: project.user?.name || 'NONE',
            rate: (project.user?.totalRates || 0).toFixed(1),
            location: project.user?.adress || 'NONE',
            occupation: "----",
            rank: "----",
            about: "----",
            popularity: {
                likes: 0,
                followers: 0,
                views: 0
            },
        },
        projectImg: project.cover,
        date: dateFormat(project.createdAt, 'mmmm d - yyyy'),// 'april 5 - 2023',
        tools: project.tools ? project.tools.map((value, index) =>
            [
                {
                    'value': value.name,
                    "isActive": false,

                },
                {
                    'value': value.fees,
                    "isActive": false,
                },
            ]
        ) : [],
        booktools: project.equipments,
        description: project.desc,
        shooting_time: 144,
        delivery_time: 48,
        comments: [],
        creatives: project.creatives,
        projectBudget: project.projectBudget,
        projectScale: project.projectScale,

    } : null
    return (
        <>
            <Layout >
                {project ?
                    (
                        <>
                            <AddToTeam />
                            <Report />
                            <ThanksMSG />
                            <div className={isOpen ? "h-0 sm:h-auto overflow-hidden" : ""}>
                                <div className="sm:container mt-6">
                                    <section className="mx-7 sm:mx-0" >
                                        <Header data={data} />
                                    </section>
                                    <div className="lg:flex gap-6">
                                        <section className="lg:w-2/3">
                                            <ProjectCover data={data} />
                                            <About data={data} />
                                        </section>
                                        <section className="lg:w-1/3 mt-10 lg:mt-0">
                                            <Details data={data} />
                                            <Reviews data={data} />
                                        </section>
                                    </div>
                                    <section className="mx-7 sm:mx-0">
                                        <Recommended projects={projects} />
                                    </section>
                                </div>
                            </div>
                            {!chat_respond &&
                                <Control data={data} toggleDrawer={toggleDrawer} GetAllMessageInChat={GetAllMessageInChat} chat_respond={chat_respond} auth={auth}/>}
                            <StudioBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />

                        </>
                    ) : (
                        project?.length ?
                            <div className="flex flex-col h-body items-center justify-center">
                                <h1 className="text-4xl font-bold">
                                    No Project To Show
                                </h1>
                            </div> :
                            <></>
                    )
                }
            </Layout>
        </>
    );
};

const Header = ({ data }) => (
    <>
        <h1 className="text-xl capitalize opacity-80 font-bold"> {data.title} </h1>
        <div className='creator-info flex mt-3 mb-12 justify-between'>
            <a className='flex items-center gap-3 cursor-pointer' href={`/creative/${data.userName}`}>
                <img alt='user aspect-square rounded-full' className="w-16 aspect-square rounded-full" src={data.user.profileImage} />
                <div>
                    <span className="capitalize font-semibold text-lg">{data.user.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                        <p>{data.user?.rate}</p>
                        <Icon className='text-primary' name={'rate-star'} />
                    </div>
                </div>
            </a>
            <Selector options={[
                {
                    value: "oprion 1",
                    onclick: () => { },
                },
                {
                    value: "oprion 2",
                    onclick: () => { },
                },
                {
                    value: "oprion 3",
                    onclick: () => { },
                }
            ]} className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer" />
        </div>
    </>
)

const ProjectCover = ({ data }) => {

    return (
        <img
            className="sm:rounded-[50px] w-full"
            src={data.projectImg}
            alt="Project Cover"
        />
    );
}
const ProjectShow = ({ data }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const TogglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };
    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };
    return (
        <div className="relative">
            <video
                className="sm:rounded-[50px] w-full"
                src={data.projectImg}
                controls
                ref={videoRef}
                onClick={handlePlayPause}
                onEnded={() => setIsPlaying(false)}

            />
            <div
                onClick={TogglePlayPause}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="hidden sm:block sm:relative">
                    <div
                        className={`bg-[#CADED333] w-16 h-16 rounded-full cursor-pointer p-5 appblur ${isPlaying ? "animate-play" : "animate-pause"}`}
                    >
                        <Icon
                            className="size-full text-white"
                            name={isPlaying ? "pause" : "play"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const About = ({ data }) => (
    <div className="sticky top-header">
        <div className="h-16" />
        <h2 className="font-bold text-lg capitalize opacity-80 mb-4 mx-7 sm:mx-0">about the creative</h2>
        <div className="border border-50 border-solid border-[#00000040] dark:border-[#FFFFFF40] p-10">
            <div className='flex items-center justify-center'>
                <div className='w-32 h-32 relative'>
                    <img className='profile-frame absolute rounded-full' src="/assets/imgs/theme/profile-frame.svg" alt="profile frame" />
                    <img className='profileImgture absolute rounded-full' src={data.creative.profileImage} alt="profile picture" />
                </div>
                <div className='flex-2 flex-col gap-1'>
                    <h3 className="capitalize font-semibold text-lg">{data.creative.name}</h3>
                    <span className='flex items-center'>
                        <Icon className='opacity-50 mr-2 w-3' name='location-dot' />
                        <span className="location">{data.creative.location}</span>
                    </span>
                </div>
            </div>
            <div className='flex justify-center pt-25 items-center gap-3 '>
                <p className='rank'>{data.creative.rank}</p>
                <p className="info-container">{data.creative.occupation}</p>
                <div className='info-container flex items-center gap-1 w-20'>
                    <p>{data.creative.rate}</p>
                    <Icon className='text-primary w-4' name={'rate-star'} />
                </div>
            </div>
            <div className='flex justify-center pt-7 items-center'>
                <div className='flex justify-center'>
                    {Object.entries(data.creative.popularity).map(([key, value]) => (
                        <div className='popularity mr-9 pr-9 last:mr-0 last:pr-0' key={key}>
                            <p className='number'>{convertToK(value, 0)}</p>
                            <p className='unit'>{key}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='sm:px-10 border-[#00000040] dark:border-[#FFFFFF40] border-t mt-6 pt-6'>
                <p id='about-header'>about</p>
                <p className='pt-2' id='about-paragraph'>{data.creative.about}</p>
            </div>
        </div>
    </div>
)
const Details = ({ data }) => (
    <div className="grad-card bg-gradient-to-b from-[#D5D5D5] dark:from-[#1A2024] to-transparent w-full border-50 p-6">
        <div className="w-full flex justify-center my-10">
            <span className="text-center capitalize opacity-50">{data.date}</span>
        </div>

        <div className="flex flex-col gap-2">
            {data.tools.map((toolGroup, i) => (
                <div key={i} className="flex gap-2">
                    {toolGroup.map((tool, j) => (
                        <div key={j} className={`text-white rounded-3xl py-2 px-4 ${tool.isActive ? 'bg-primary' : 'bg-[#00000040]'}`}>
                            {tool.value}
                        </div>
                    ))}
                </div>
            ))}
        </div>

        <div className="mt-9">
            <span className="capitalize opacity-50">description</span>
        </div>
        <span className="capitalize font-semibold mt-4">{data.description}</span>
        <div className="mt-9">
        </div>
        {
            data.location &&
            <section>
                <span className="capitalize opacity-50">location</span>
                <div className="capitalize mt-4">
                    <section className="h-52 relative rounded-3xl overflow-hidden">
                        <GoogleMap width={'100%'} value={{ 'lat': data.location.lat, 'lng': data.location.lng }} />
                    </section>
                </div>
            </section>
        }
        <section className="hidden">
            <div className="mt-9">
                <span className="capitalize opacity-50">shooting time</span>
            </div>
            <div>
                <span className="capitalize font-semibold">{convertHoursTo__(data.shooting_time)}</span>
            </div>
        </section>
        <section className="hidden">

            <div className="mt-9">
                <span className="capitalize opacity-50">delivery time</span>
            </div>
            <div>
                <span className="capitalize font-semibold">{convertHoursTo__(data.delivery_time)}</span>
            </div>
        </section>
    </div>
)



const Reviews = ({ data }) => (
    <>
        <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4">Reviews</h2>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>

                {data.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    </>
);


const Recommended = ({ projects }) => {
    const getPaginatedProjects = projects.slice(0, 4);

    return (
        <>
            <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4">recommended for you</h2>

            <div className="grid minmax-280 gap-5">
                {getPaginatedProjects.map((item, i) => (
                    <ProjectCard key={i} className='cursor-pointer' href="/project/1" cardData={item} />
                ))}
            </div>
        </>
    );
};

const Control = ({ data, toggleDrawer, GetAllMessageInChat,auth, chat_respond }) => {

    const [loveIconName, setLoveIconName] = useState('far');
    const [showChat, setShowChat] = useState(false);

    const online = false

    const handleLoveIconClick = () => {
        setLoveIconName(loveIconName === 'fas' ? 'far' : 'fas');
    };

    const handleCloseChat = () => {
        setShowChat(false);
    };

    const handleOpenChat = () => {
        setShowChat(true);
        GetAllMessageInChat(data.creative._id)
    };



    return (
        <>

            <div className='sticky h-32 bottom-0 z-20 max-w-full'>
                <div className="sm:container flex justify-between items-end">

                    {auth.login ?
                        <div onClick={handleOpenChat} className="hidden message-shadow lg:flex rounded-full p-2 h-16 bg-white dark:bg-[#1A2024] cursor-pointer ">
                            <div className="relative">
                                <img className="h-full aspect-square rounded-full" src={data.user.profileImage} alt="user" />
                                {online && (
                                    <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full right-0 -translate-y-3" />
                                )}
                                {!online && (
                                    <div className="absolute w-4 h-4 bg-gray-500 border-2 border-white rounded-full right-0 -translate-y-3" />
                                )}

                            </div>
                            <div className="px-3">
                                <span className="capitalize font-bold">
                                    {data.user.name}
                                </span>
                                <div />
                                {/* <span className="capitalize">away . Avg. response time : <span className="font-bold"> 1 Hour</span> </span> */}
                            </div>
                        </div> : <div className="w-1" />
                    }


                    <Controller className={"mr-auto ml-auto lg:m-0 "}>
                        <div className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer flex justify-center items-center" >
                            <Icon name={'share'} />
                        </div>
                        {auth.login &&
                            <div data-popup-toggle="popup" data-popup-target="add-to-team" className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer hidden sm:flex justify-center items-center">
                                <Icon className="text-white text-xl" name={'plus'} />
                            </div>
                        }
                        {auth.login &&
                            <div onClick={handleLoveIconClick} className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer flex justify-center items-center">
                                <Icon className={`${loveIconName === "far" ? 'text-white' : 'text-primary'} w-6 text-xl`} name={'heart'} type={loveIconName} />
                            </div>
                        }
                        {auth.login &&
                        <ArrowBtn onClick={toggleDrawer} className="cursor-pointer w-min sm:w-96 max-w-[211px]" text='book now' />
                        }
                    </Controller>
                </div>  
            </div>


        </>
    );
};




const mapStateToProps = (state) => ({
    projects_respond: state.api.GetStudios,
    project_respond: state.api.Getstudio,
    projectFilters: state.projectFilters,
    chat_respond: state.api.GetAllMessageInChat,
    auth: state.auth,
});

const mapDidpatchToProps = {
    // openCart,
    GetStudios,
    Getstudio,
    GetAllMessageInChat
    // fetchMoreproject,
};

export default connect(mapStateToProps, mapDidpatchToProps)(projects);

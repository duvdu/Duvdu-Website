import { useRouter } from "next/router";
import { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import { fetchProjects } from "../../redux/action/project";
import Icon from '../../components/Icons';
import { ClosePopUp, OpenPopUp, convertToK, isFav } from "../../util/util";
import ProjectCard from "../../components/elements/project-card";
import { convertHoursTo__ } from '../../util/util';
import Comment from '../../components/elements/comment';
import Controller from '../../components/elements/controllers';
import ArrowBtn from '../../components/elements/arrowBtn';
import Chat from '../../components/elements/chat';
import AddToTeam from '../../components/popsup/AddToTeam';
import Report from '../../components/popsup/report';
import ThanksMSG from '../../components/popsup/thanksMSG';
import Selector from "../../components/elements/CustomSelector";
import Drawer from "../../components/elements/drawer";
import ProjectBooking from "../../components/drawer/book/project";
import { GetProjects } from "../../redux/action/apis/cycles/projects/get";
import { GetProject } from "../../redux/action/apis/cycles/projects/getOne";
import GoogleMap from "../../components/elements/googleMap";
import dateFormat from "dateformat";
import StudioBooking from "../../components/drawer/book/studio";
import { GetAllMessageInChat } from "../../redux/action/apis/realTime/messages/getAllMessageInChat";
import Successfully_posting from "../../components/popsup/post_successfully_posting";
import AddToSaved from "../../components/popsup/addToSaved";
import { AddProjectToBoard } from "../../redux/action/apis/savedProject/boardProjects/add";
import { DeleteProjectFromBoard } from "../../redux/action/apis/savedProject/boardProjects/remove";



const projects = ({
    api,
    auth,
    GetProjects,
    projects_respond,
    GetProject,
    project_respond,
    GetAllMessageInChat,
    chat_respond,
    AddProjectToBoard,
    addProjectToBoard_respond,
    getBoards_respond,
    DeleteProjectFromBoard,
    deleteProjectFromBoard_respond
}) => {

    const router = useRouter()
    const { project: projectId } = router.query;
    const projects = projects_respond?.data || []
    const project = project_respond?.data
    const [isOpen, setIsOpen] = useState(false);
    const [love, setLove] = useState(false);
    const [isFave, seIsFav] = useState(false);

     useEffect(() => {
         if (projectId) {
             GetProject(projectId);
         }
     }, [projectId]);

     useEffect(() => {
        GetProjects({ limit: "4" });
    }, []);

    useEffect(() => {
        if (projectId && getBoards_respond) {
            setLove(isFav(projectId, getBoards_respond))
        }
    }, [projectId, getBoards_respond]);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const loveToggleAction = () => {
        if (projectId && getBoards_respond.data) {
            if (love) {
                console.log(findProjectId(projectId,getBoards_respond.data[0]._id))
                DeleteProjectFromBoard(getBoards_respond.data[0]._id, findProjectId(projectId,getBoards_respond.data[0]._id))
            }
            else {
                AddProjectToBoard({ idboard: getBoards_respond.data[0]._id, idproject: projectId })
            }
            seIsFav(true)
        }
    };
    
    useEffect(() => {
        if (addProjectToBoard_respond && !isFave) {
            OpenPopUp('addProjectToBoard-popup')
        }
        else if (api.req == 'AddProjectToBoard' && isFave) {
            setLove(true)
        }
        else if (api.req == 'DeleteProjectFromBoard' && isFave) {
            setLove(false)
        }
        seIsFav(false)
    }, [addProjectToBoard_respond, deleteProjectFromBoard_respond])


    const findProjectId = (projectId, boardId) => {
        for (const board of getBoards_respond.data) {
            if (board._id === boardId) {
                for (const project of board.projects) {
                    if (project.project._id === projectId) {
                        return project._id;
                    }
                }
            }
        }
        return null; 
      };


    const data = project ? ({
        _id: project._id,
        title: project.title,
        user: project.user,
        creative: {
            _id: project.user?._id,
            profileImage: project.user?.profileImage || process.env.DEFULT_PROFILE_PATH,
            name: project.user?.name || 'NONE',
            totalRates: (project.user?.totalRates || 0).toFixed(1),
            location: project.user?.adress || 'NONE',
            occupation: "professional",
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
        booktools: project.tools,
        description: project.desc,
        shooting_time: 144,
        delivery_time: 48,
        comments: [
            {
                "id": 1,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/profile/defultUser?.jpg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
            {
                "id": 2,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/profile/defultUser?.jpg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
            {
                "id": 3,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/profile/defultUser?.jpg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
        ],
        creatives: project.creatives,
        projectBudget: project.projectBudget,
        projectScale: project.projectScale,

    }) : null

    return (
        <>
            <Layout >

                {project &&
                    <>
                        <Successfully_posting id="addProjectToBoard-popup" message="Add To Team" onCancel={() => ClosePopUp("addProjectToBoard-popup")} />
                        <AddToSaved />
                        <Report />
                        <ThanksMSG />
                        <div className={isOpen ? "h-0 sm:h-auto overflow-hidden" : ""}>
                            <div className="sm:container mt-6">
                                <section className="mx-7 sm:mx-0" >
                                    <Header data={data} />
                                </section>
                                <div className="lg:flex gap-6">
                                    <section className="lg:w-2/3">
                                        {/* <ProjectShow data={data} /> */}
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
                            <Control data={data} toggleDrawer={toggleDrawer} GetAllMessageInChat={GetAllMessageInChat} isLove={love} loveToggleAction={loveToggleAction} auth={auth}/>}
                        <ProjectBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
                    </>
                }
                {
                    (api.error && api.req == "GetProject") &&
                    <div className="flex flex-col h-body items-center justify-center">
                        <h1 className="text-4xl font-bold">
                            No Project To Show
                        </h1>
                    </div>}
            </Layout>
        </>
    );
};

const Header = ({ data }) => (
    <>
        <h1 className="text-xl capitalize opacity-80 font-bold"> {data?.title} </h1>
        <div className='creator-info flex mt-3 mb-12 justify-between'>
            <a className='flex items-center gap-3 cursor-pointer' href={`/creative/${data?.user?.username || ''}`}>
                <img alt='user' className="w-16 aspect-square rounded-full" src={data?.user?.profileImage || process.env.DEFULT_PROFILE_PATH} />
                <div>
                    <span className="capitalize font-semibold text-lg">{data?.user?.name || 'NONE'}</span>
                    <div className="flex items-center gap-1 mt-1">
                        <p>{data?.user?.totalRates || 0}</p>
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
            src={data?.projectImg}
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
                src={data?.projectImg}
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
                    <img className='profileImgture absolute rounded-full' src={data?.creative.profileImage} alt="profile picture" />
                </div>
                <div className='flex-2 flex-col gap-1'>
                    <h3 className="capitalize font-semibold text-lg">{data?.creative.name}</h3>
                    <span className='flex items-center'>
                        <Icon className='opacity-50 mr-2 w-3' name='location-dot' />
                        <span className="location">{data?.creative.location}</span>
                    </span>
                </div>
            </div>
            <div className='flex justify-center pt-25 items-center gap-3 '>
                <p className='rank'>{data?.creative.rank}</p>
                <p className="info-container">{data?.creative.occupation}</p>
                <div className='info-container flex items-center gap-1 w-20'>
                    <p>{data?.creative.totalRates || 0}</p>
                    <Icon className='text-primary w-4' name={'rate-star'} />
                </div>
            </div>
            <div className='flex justify-center pt-7 items-center'>
                <div className='flex justify-center'>
                    {Object.entries(data?.creative.popularity).map(([key, value]) => (
                        <div className='popularity mr-9 pr-9 last:mr-0 last:pr-0' key={key}>
                            <p className='number'>{convertToK(value, 0)}</p>
                            <p className='unit'>{key}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='sm:px-10 border-[#00000040] dark:border-[#FFFFFF40] border-t mt-6 pt-6'>
                <p id='about-header'>about</p>
                <p className='pt-2' id='about-paragraph'>{data?.creative.about}</p>
            </div>
        </div>
    </div>
)
const Details = ({ data }) => (
    <div className="grad-card bg-gradient-to-b from-[#D5D5D5] dark:from-[#1A2024] to-transparent w-full border-50 p-6">
        <div className="w-full flex justify-center my-10">
            <span className="text-center capitalize opacity-50">{data?.date}</span>
        </div>

        <div className="flex flex-col gap-2">
            {data?.tools.map((toolGroup, i) => (
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
        <span className="capitalize font-semibold mt-4">{data?.description}</span>
        <div className="mt-9">
        </div>
        {
            data?.location &&
            <section>
                <span className="capitalize opacity-50">location</span>
                <div className="capitalize mt-4">
                    <section className="h-52 relative rounded-3xl overflow-hidden">
                        <GoogleMap width={'100%'} value={{ 'lat': date.location.lat, 'lng': date.location.lng }} />
                    </section>
                </div>
            </section>
        }
        <section className="hidden">
            <div className="mt-9">
                <span className="capitalize opacity-50">shooting time</span>
            </div>
            <div>
                <span className="capitalize font-semibold">{convertHoursTo__(data?.shooting_time)}</span>
            </div>
        </section>
        <section className="hidden">

            <div className="mt-9">
                <span className="capitalize opacity-50">delivery time</span>
            </div>
            <div>
                <span className="capitalize font-semibold">{convertHoursTo__(data?.delivery_time)}</span>
            </div>
        </section>
    </div>
)



const Reviews = ({ data }) => (
    <>
        <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4">Reviews</h2>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>

                {data?.comments.map((comment) => (
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

const Control = ({ data, toggleDrawer, GetAllMessageInChat, loveToggleAction, isLove,auth }) => {

    const loveIconName = isLove ? 'fas' : 'far'
    const online = data?.user?.isOnline

    const handleLoveIconClick = () => {
        loveToggleAction()
    };

    const handleOpenChat = () => {
        GetAllMessageInChat(data?.creative._id)
    };


    return (
        <>

            <div className='sticky h-32 bottom-0 z-20 max-w-full'>
                <div className="sm:container flex justify-between items-end">
                {auth.login ?
                    <div onClick={handleOpenChat} className="hidden message-shadow lg:flex rounded-full p-2 h-16 bg-white dark:bg-[#1A2024] cursor-pointer ">
                        <div className="relative">
                            <img className="h-full aspect-square rounded-full" src={data?.user?.profileImage || process.env.DEFULT_PROFILE_PATH} alt="user" />
                            {online && (
                                <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full right-0 -translate-y-3" />
                            )}
                            {!online && (
                                <div className="absolute w-4 h-4 bg-gray-500 border-2 border-white rounded-full right-0 -translate-y-3" />
                            )}

                        </div>
                        <div className="px-3">
                            <span className="capitalize font-bold">
                                {data?.user?.name || 'NONE'}
                            </span>
                            <div />
                            {/* <span className="capitalize">away . Avg. response time : <span className="font-bold"> 1 Hour</span> </span> */}
                        </div>
                    </div> : <div className="w-1" />}

                    <Controller className={"mr-auto ml-auto lg:m-0 "}>
                        <div className="bg-[#0000001A] dark:bg-[#3028281a] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer flex justify-center items-center" >
                            <Icon name={'share'} />
                        </div>
                        {auth.login &&
                        <div data-popup-toggle="popup" data-popup-target="add-to-team" className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer hidden sm:flex justify-center items-center">
                            <Icon className="text-white text-xl" name={'plus'} />
                        </div>}
                        {auth.login &&
                        <div onClick={handleLoveIconClick} className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] size-20 rounded-full cursor-pointer flex justify-center items-center">
                            <Icon className={`${loveIconName === "far" ? 'text-white' : 'text-primary'} w-6 text-xl`} name={'heart'} type={loveIconName} />
                        </div>}
                        {auth.login &&
                        <ArrowBtn onClick={toggleDrawer} className="cursor-pointer w-min sm:w-96 max-w-[211px]" text='book now' />}
                    </Controller>
                </div>
            </div>

        </>
    );
};




const mapStateToProps = (state) => ({
    projects_respond: state.api.GetProjects,
    project_respond: state.api.GetProject,
    addProjectToBoard_respond: state.api.AddProjectToBoard,
    deleteProjectFromBoard_respond: state.api.DeleteProjectFromBoard,
    projectFilters: state.projectFilters,
    chat_respond: state.api.GetAllMessageInChat,
    getBoards_respond: state.api.GetBoards,
    auth: state.auth,
    api: state.api,
});

const mapDidpatchToProps = {
    GetProjects,
    GetProject,
    GetAllMessageInChat,
    AddProjectToBoard,
    DeleteProjectFromBoard
};

export default connect(mapStateToProps, mapDidpatchToProps)(projects);

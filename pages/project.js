import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import Drawer from "../components/popsup/projectDrawer";
import { fetchProjects } from "../redux/action/project";
import Icon from '../components/Icons';
import { convertToK } from "../util/util";
import Card from "./../components/elements/project-card";
import { convertHoursTo__ } from '../util/util';
import Comment from '../components/elements/comment';
import Controller from '../components/elements/controllers';
import ArrowBtn from '../components/elements/arrowBtn';
import Chat from '../components/elements/chat';
import AddToTeam from '../components/popsup/AddToTeam';
import Report from '../components/popsup/report';
import ThanksMSG from '../components/popsup/thanksMSG';
import Selector from "../components/elements/CustomSelector";



const projects = ({ projects, projectFilters, fetchProjects }) => {


    useEffect(() => {
        fetchProjects("", "/static/projects.json");
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };


    const data = {
        title: 'short film 2024 - 4k ft. lisa',
        user: {
            img: '/assets/imgs/profile/author-2.png',
            name: 'anna youseff',
            rate: 3.7
        },
        creative: {
            img: '/assets/imgs/profile/author-2.png',
            name: 'anna youseff',
            rate: 3.7,
            location: "5th settlement",
            occupation: "photographer",
            rank: "professional",
            about: "hello i’m Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            popularity: {
                likes: 28000,
                followers: 514,
                views: 258000
            },
        },
        projectImg: '/assets/imgs/projects/2.jpeg',
        date: 'april 5 - 2023',
        tools: [
            {
                v1: {
                    "value": "$800 insurance",
                    "isActive": true,
                },
                v2: {
                    "value": "$50 day",
                    "isActive": true,
                },
            },
            {
                v1: {
                    "value": "cannon - 452c",
                    "isActive": false,
                },
                v2: {
                    "value": "camera",
                    "isActive": false,
                },
            },
            {
                v1: {
                    "value": "50 mm full-frame",
                    "isActive": false,
                },
                v2: {
                    "value": "lens",
                    "isActive": false,
                },
            },
            {
                v1: {
                    "value": "canon m24 45 v",
                    "isActive": false,
                },
                v2: {
                    "value": "flash",
                    "isActive": false,
                },
                v3: {
                    "value": "$25 hour",
                    "isActive": false,
                },
            },
        ],
        description: 'this project is Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis at erat pellentesque adipiscing commodo.',
        shooting_time: 144,
        delivery_time: 48,
        comments: [
            {
                "id": 1,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/projects/1.jpeg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
            {
                "id": 2,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/projects/1.jpeg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
            {
                "id": 3,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/projects/1.jpeg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
        ],
    }


    return (
        <>
            <Layout>
                <AddToTeam />
                <Report />
                <ThanksMSG />

                <div className="container mt-6">
                    <section>
                        <Header data={data} />
                    </section>
                    <div className="lg:flex gap-6">
                        <section className="lg:w-2/3">
                            <ProjectShow data={data} />
                            <About data={data} />
                        </section>
                        <section className="lg:w-1/3 mt-10 lg:mt-0">
                            <Details data={data} />
                            <Reviews data={data} />

                        </section>
                    </div>
                    <section>
                        <Recommended projects={projects} />
                    </section>
                </div>

                <Control data={data} toggleDrawer={toggleDrawer} />

                <Drawer data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
            </Layout>
        </>
    );
};

const Header = ({ data }) => (
    <>
        <h1 className="text-xl capitalize opacity-80"> {data.title} </h1>
        <div className='creator-info flex mt-3 mb-12 justify-between'>
            <a className='flex items-center gap-3 cursor-pointer' href='/OthersProfile'>
                <img alt='user' className="w-16" src={data.user.img} />
                <div>
                    <span className="capitalize font-semibold text-lg">{data.user.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                        <p>{data.user.rate}</p>
                        <Icon className='text-primary' name={'star'} />
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
            ]} className="relative border rounded-full border-[#00000033] flex justify-center items-center w-14 h-14 cursor-pointer" />
        </div>
    </>
)
const ProjectShow = ({ data }) => (
    <img className="border-50 w-full" src={data.projectImg} />
)

const About = ({ data }) => (
    <div className="sticky top-header">
        <div className="h-16" />
        <h2 className="font-bold text-lg capitalize opacity-80 mb-4">about the creative</h2>
        <div className="border border-50 border-solid border-gray-300 p-10">
            <div className='flex items-center justify-center'>
                <div className='w-32 h-32 relative'>
                    <img className='profile-frame absolute rounded-full' src="/assets/imgs/theme/profile-frame.svg" alt="profile frame" />
                    <img className='profileImgture absolute rounded-full' src={data.creative.img} alt="profile picture" />
                </div>
                <div className='flex-2 flex-col gap-1'>
                    <h3 className="capitalize font-semibold text-lg">{data.creative.name}</h3>
                    <span className='flex items-center'>
                        <Icon className='opacity-50 mr-2' name='location-dot' />
                        <span className="location">{data.creative.location}</span>
                    </span>
                </div>
            </div>
            <div className='flex justify-center pt-25 items-center gap-3'>
                <p className='rank'>{data.creative.rank}</p>
                <p id='photographer'>{data.creative.occupation}</p>
                <div id='rating' className='flex items-center gap-1 w-20'>
                    <p>{data.creative.rate}</p>
                    <Icon className='text-primary w-7' name={'star'} />
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
            <div className='px-10 border-gray-300 border-t mt-6 pt-6'>
                <p id='about-header'>about</p>
                <p className='pt-2' id='about-paragraph'>{data.creative.about}</p>
            </div>
        </div>
    </div>
)
const Details = ({ data }) => (
    <div className="grad-card w-full border-50">
        <div className="w-full flex justify-center my-10">
            <span className="text-center">april 5 - 2023</span>
        </div>

        {data.tools.map((item, i) => (
            <div key={i} className="flex">
                {
                    item.v1 &&
                    <div className={`details-padge ${item.v1.isActive ? 'active' : ''}`}>{item.v1.value}</div>
                }
                {
                    item.v2 &&
                    <div className={`details-padge ${item.v2.isActive ? 'active' : ''}`}>{item.v2.value}</div>
                }
                {
                    item.v3 &&
                    <div className={`details-padge ${item.v3.isActive ? 'active' : ''}`}>{item.v3.value}</div>
                }
            </div>
        ))}
        <div className="mt-9">
            <span className="capitalize opacity-50">description</span>
        </div>
        <span className="capitalize mt-4">{data.description}</span>
        <div className="mt-9">
            <span className="capitalize opacity-50">location</span>
        </div>
        <div className="capitalize mt-4">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11959.068670575894!2d31.490976074291662!3d30.0300984916351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14582260dce33277%3A0xcee8c262752427a3!2sMaxim%20Mall!5e0!3m2!1sar!2seg!4v1707588511211!5m2!1sar!2seg"
                className="w-full border-primary border-solid border-2 rounded-3xl h-40 "
                loading="lazy"
            >
            </iframe>
        </div>

        <div className="mt-9">
            <span className="capitalize opacity-50">shooting time</span>
        </div>
        <div>
            <span className="capitalize font-semibold">{convertHoursTo__(data.shooting_time)}</span>
        </div>
        <div className="mt-9">
            <span className="capitalize opacity-50">delivery time</span>
        </div>
        <div>
            <span className="capitalize font-semibold">{convertHoursTo__(data.delivery_time)}</span>
        </div>
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
    const getPaginatedProjects = projects.items.slice(0, 4);

    return (
        <>
            <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4">recommended for you</h2>

            <div className="grid minmax-280 gap-5">
                {getPaginatedProjects.map((item, i) => (
                    <Card key={i} className='cursor-pointer' href="/project" cardData={item} />
                ))}
            </div>
        </>
    );
};

const Control = ({ data, toggleDrawer }) => {

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
    };

    const messages = [
        {
            "type": "time",
            "data": "yesterday at 11:41"
        },
        {
            "type": "me",
            "data": "Hey, man! What's up, Mr other? 👋"
        },
        {
            "type": "other",
            "data": "Kid, where'd you come from?"
        },
        {
            "type": "me",
            "data": "Field trip! 🤣"
        },
        {
            "type": "me",
            "data": "Uh, what is this guy's problem, Mr. other? 🤔"
        },
        {
            "type": "other",
            "data": "Uh, he's from space, he came here to steal a necklace from a wizard."
        },
        {
            "type": "typing other",
            "data": ""
        },
        {
            "type": "time",
            "data": "Today at 11:41"
        },
        {
            "type": "me",
            "data": "Hey, man! What's up, Mr other? 👋"
        },
        {
            "type": "other",
            "data": "Kid, where'd you come from?"
        },
        {
            "type": "me",
            "data": "Field trip! 🤣"
        },
        {
            "type": "me",
            "data": "Uh, what is this guy's problem, Mr. other? 🤔"
        },
        {
            "type": "other",
            "data": "Uh, he's from space, he came here to steal a necklace from a wizard."
        },
        {
            "type": "typing other",
            "data": ""
        },
    ];
    return (
        <>
            <div className="fixed bottom-0 z-20">
                {showChat && <Chat Close={handleCloseChat} online={online} messages={messages} data={data} />}
            </div>
            <div className='sticky h-32 bottom-0 flex justify-between items-end p-10 z-20'>
                {
                    !showChat &&
                    <div onClick={handleOpenChat} className="message-shadow flex rounded-full p-2 h-16 bg-DS_white cursor-pointer ">
                        <div className="relative">
                            <img className="h-full" src={data.user.img} />
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
                            <span className="capitalize">away . Avg. response time : <span className="font-bold"> 1 Hour</span> </span>
                        </div>
                    </div>
                }
                {
                    showChat &&
                    <div />
                }
                <div className="hidden lg:block">
                    <Controller>
                        <div className="controller-1" >
                            <Icon name={'share'} />
                        </div>
                        <div data-popup-toggle="popup" data-popup-target="add-to-team" className="controller-1">
                            <Icon className="text-white text-xl" name={'plus'} />
                        </div>
                        <div onClick={handleLoveIconClick} className="controller-1">
                            <Icon className={`${loveIconName === "far" ? 'text-white' : 'text-primary'} text-2xl`} name={'heart'} type={loveIconName} />
                        </div>
                        <ArrowBtn onClick={toggleDrawer} className="cursor-pointer" text='book now' />
                    </Controller>
                </div>
            </div>
        </>
    );
};




const mapStateToProps = (state) => ({
    projects: state.projects,
    projectFilters: state.projectFilters,
});

const mapDidpatchToProps = {
    // openCart,
    fetchProjects,
    // fetchMoreproject,
};

export default connect(mapStateToProps, mapDidpatchToProps)(projects);

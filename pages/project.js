import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import Drawer from "../components/layout/projectDrawer";
import { fetchProjects } from "../redux/action/project";
import Icon from '../components/Icons';
import { convertToK } from "../../util/util";
import Card from "./../components/elements/home-card";
import { convertHoursTo__ } from '../util/util';
import Comment from '../components/elements/comment';
import Controller from '../components/elements/controllers';
import ArrowBtn from '../components/elements/arrowBtn';
import Chat from '../components/elements/chat';
import AddToTeam from '../components/layout/AddToTeam';



const projects = ({ projects, projectFilters, fetchProjects }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    

    useEffect(() => {
        fetchProjects("", "/static/projects.json");
    }, []);
    const getPaginatedProjects = projects.items.slice(0, 4);
    const [loveIconName, setLoveIconName] = useState('love-react-off');
    const [showChat, setShowChat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseChat = () => {
        setShowChat(false);
    };
    const handleOpenChat = () => {
        setShowChat(true);
    };
    const handleLoveIconClick = () => {
        setLoveIconName(loveIconName === 'love-react-off' ? 'love-react-on' : 'love-react-off');
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const online = false
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
    const messages = [
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
            <Layout>
                <AddToTeam isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
                <div className="fixed left-8 bottom-0 z-20">
                    {showChat && <Chat Close={handleCloseChat} online={online} messages={messages} data={data} />}
                </div>

                <div className="container mt-6">
                    <section>
                        <h1 className="text-xl capitalize opacity-80"> {data.title} </h1>
                        <div className='creator-info flex mt-8 mb-12'>
                            <a className='flex items-center gap-3 cursor-pointer' href='/profile/Anna-Youseff'>
                                <img alt='user' className="w-16" src={data.user.img} />
                                <div>
                                    <span className="capitalize font-semibold text-lg">{data.user.name}</span>
                                    <div className="flex gap-1">
                                        <p className='value'>{data.user.rate}</p>
                                        <Icon name={'rating'} width={18} height={16.424} />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>
                    <div className="flex gap-6">
                        <section className="w-2/3">
                            <img className="border-50 w-full" src={data.projectImg} />
                            <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4">about the creative</h2>
                            <div className="border border-50 border-solid border-gray-300 p-10">
                                <div className='flex items-center justify-center'>
                                    <div className='w-32 h-32 relative'>
                                        <img className='profile-frame absolute rounded-full' src="/assets/imgs/theme/profile-frame.svg" alt="profile frame" />
                                        <img className='profile-picture absolute rounded-full' src={data.creative.img} alt="profile picture" />
                                    </div>
                                    <div className='flex-2 flex-col gap-1'>
                                        <h3>{data.creative.name}</h3>
                                        <span className='flex items-center'>
                                            <img className='h-3' alt="profile cover" src="/assets/imgs/theme/icons/location.svg" />
                                            <span className="location">{data.creative.location}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className='flex justify-center pt-25 items-center gap-3'>
                                    <p className='rank'>{data.creative.rank}</p>
                                    <p id='photographer'>{data.creative.occupation}</p>
                                    <div id='rating' className='flex items-center gap-1 w-20'>
                                        <p>{data.creative.rate}</p>
                                        <img src='/assets/imgs/theme/icons/rating.svg' width={18} height={18} />
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
                                <div className='left-side-container border-gray-300 border-t mt-6 pt-6'>
                                    <p id='about-header'>about</p>
                                    <p className='pt-2' id='about-paragraph'>{data.creative.about}</p>
                                </div>
                            </div>
                        </section>
                        <section className="w-1/3">
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
                                        referrerpolicy="no-referrer-when-downgrade">
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
                            <h2>Reviews</h2>
                            {data.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </section>
                    </div>
                    <section>
                        <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4">recommended for you</h2>
                        <div className="flex gap-6 mt-4">
                            {getPaginatedProjects.map((item, i) => (
                                <Card key={i} className='cursor-pointer' href="/project" cardData={item} />
                            ))}
                        </div>
                    </section>
                </div>
                <div className='sticky h-32 bottom-0 flex justify-between items-end p-10'>
                    <div onClick={handleOpenChat} className="message-shadow flex rounded-full p-2 h-16 bg-DS_white cursor-pointer">
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
                    <Controller>
                        <div className="controller-1" >
                            <Icon name={'share'} />
                        </div>
                        <div onClick={openPopup} className="controller-1">
                            <Icon name={'add'} />
                        </div>
                        <div onClick={handleLoveIconClick} className="controller-1">
                            <Icon name={loveIconName} />
                        </div>
                        <ArrowBtn onClick={toggleDrawer} className="cursor-pointer" text='book now' />
                    </Controller>
                </div>
                <Drawer data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
            </Layout>
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

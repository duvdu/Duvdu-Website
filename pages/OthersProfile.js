
import Layout from '../components/layout/Layout';
import Comment from '../components/elements/comment';
import Icon from '../components/Icons';
import { convertToK } from '../util/util';
import EditPopUp from '../components/popsup/EditProfile';
import React, { useState } from 'react';
import Button from '../components/elements/submitButton';
import Chat from '../components/elements/chat';


function Profile() {
    const [isable, setIsDisabled] = useState(false);
    const [showAddPanal, setShowAddPanal] = useState(false);
    const [showChat, setShowChat] = useState(true);

    const online = false

    const handleCloseChat = () => {
        setShowChat(false);
    };

    const handleSwitchChange = (newState) => {
        setIsDisabled(newState);
    };


    var profile = {
        "coverImg": "/assets/imgs/projects/cover.jpeg",
        "profileImg": "/assets/imgs/profile/contact-2.png",
        "personalName": "youseff abdulla",
        "value": 3.7,
        "price": '30',
        "location": "5th settlement",
        "occupation": "photographer",
        "rank": "professional",
        "about": "hello i’m Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        "popularity": {
            "likes": 28000,
            "followers": 514,
            "views": 258000
        },
        "comments": [
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
        "projects": [
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
        ]

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
    const data = {
        user: {
            img: '/assets/imgs/profile/author-2.png',
            name: 'anna youseff',
            rate: 3.7
        }
    }
    return (
        <Layout>
            <EditPopUp profile={profile} />
            <div className="fixed bottom-0 z-20">
                {showChat && <Chat Close={handleCloseChat} online={online} messages={messages} data={data} />}
            </div>
            <div className='container'>
                <div className='cover relative' style={{ backgroundImage: `url('${profile['coverImg']}')` }} >
                    <Icon name='share2' className='absolute cursor-pointer left-6 bottom-6' />
                </div>
                <div className='flex gap-3 pt-7 flex-col lg:flex-row'>
                    <div className='left-side flex-1 relative'>
                        <div className='left-side-container'>
                            <div className='flex items-center'>
                                <div className='w-28 h-28 bg-cover relative p-3 mr-3 mb-3 bg-no-repeat boronze-frame'>
                                    <img className='w-full h-full rounded-full' src={"/assets/imgs/profile/contact-2.png"} alt="profile picture" />
                                </div>
                                <div className='flex-2 flex-col gap-1'>
                                    <span className='text-3xl font-bold capitalize'>{profile['personalName']}</span>
                                    <span className='flex items-center'>
                                        <Icon className='opacity-50 mr-2' name='location-dot' />
                                        <span className="opacity-50 capitalize text-lg">{profile['location']}</span>
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-center pt-25 items-center gap-3'>
                                <p className='rank'>{profile['rank']}</p>
                                <p id='photographer'>{profile['occupation']}</p>
                                <div id='rating' className='flex items-center gap-1 w-20'>
                                    <p>{profile['value']}</p>
                                    <Icon className='text-primary w-7' name={'star'} />
                                </div>
                            </div>
                            <div className='flex justify-center pt-7 items-center'>
                                <div className='flex justify-center'>
                                    {Object.entries(profile.popularity).map(([key, value]) => (
                                        <div className='popularity mr-9 pr-9 last:mr-0 last:pr-0' key={key}>
                                            <p className='number'>{convertToK(value, 0)}</p>
                                            <p className='unit'>{key}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <Button className="w-full mb-7 mt-7" >Follow</Button>
                                <div onClick={()=>{setShowChat(true)}} className='rounded-full border border-[#00000040] h-16 aspect-square flex items-center justify-center cursor-pointer'>
                                    <Icon type='far' name="chat" />
                                </div>
                            </div>
                        </div>


                        <div className='h-divider'></div>
                        <div className='left-side-container'>
                            <h3 className='pt-6' id='about-header'>about</h3>
                            <p className='pt-6' id='about-paragraph'>{profile['about']}</p>
                        </div>
                        <div className='h-divider my-7'></div>
                        <div className='left-side-container'>
                            {profile.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>

                    </div>
                    <div className='right-side'>
                        {
                            profile.projects.length == 0 &&
                            <h3>No projects Found </h3>
                        }

                        {profile.projects.length > 0 && (
                            <div className='project-grid'>
                                {profile.projects.map((data, index) => (
                                    <Project key={index} data={data} isbig={(index + 1) % 4 < 2} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}


const Project = ({ data, isbig }) => (

    <a href='/project' className={isbig ? 'profile-project big w-full xl:w-68%' : 'profile-project small w-48% xl:w-28% '}>
        <img className='cardimg' src={data.show} alt='show' />
        <div className='creatives'>
            {data.creatives} creatives
        </div>
        <div className='title'>
            {data.title}
        </div>
    </a>


);


export default Profile;

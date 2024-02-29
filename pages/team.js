import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import Selector from "../components/elements/CustomSelector";
import React, { useState } from 'react';
import ArrowBtn from '../components/elements/arrowBtn';
import Filter from "../components/elements/filter";
import { convertToK } from '../util/util';

var users = [
    {
        "images": [
            "/assets/imgs/projects/1.jpeg",
            "/assets/imgs/projects/6.jpeg",
            "/assets/imgs/projects/3.jpeg",
            "/assets/imgs/projects/4.jpeg"
        ],
        "profile-pic": "/assets/imgs/profile/contact-2.png",
        "personal-name": "youseff abdulla",
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
    },
    {
        "images": [
            "/assets/imgs/projects/1.jpeg",
            "/assets/imgs/projects/6.jpeg",
            "/assets/imgs/projects/3.jpeg",
            "/assets/imgs/projects/4.jpeg"
        ],
        "profile-pic": "/assets/imgs/profile/contact-2.png",
        "personal-name": "youseff abdulla",
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
    },
    {
        "images": [
            "/assets/imgs/projects/1.jpeg",
            "/assets/imgs/projects/6.jpeg",
            "/assets/imgs/projects/3.jpeg",
            "/assets/imgs/projects/4.jpeg"
        ],
        "profile-pic": "/assets/imgs/profile/contact-2.png",
        "personal-name": "youseff abdulla",
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
    },
    {
        "images": [
            "/assets/imgs/projects/1.jpeg",
            "/assets/imgs/projects/6.jpeg",
            "/assets/imgs/projects/3.jpeg",
            "/assets/imgs/projects/4.jpeg"
        ],
        "profile-pic": "/assets/imgs/profile/contact-2.png",
        "personal-name": "youseff abdulla",
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
    },
];

const data = [
    {
        name: 'Modeling',
        person: [
            {
                img: '/assets/imgs/profile/1.jpg',
                name: 'Mohamed Omar',
                subtitle: '$55',
                enableMessage: true,
                state: 'avalible',
            },
            {
                img: '/assets/imgs/profile/2.jpg',
                name: 'Youseff Ali',
                subtitle: '170$',
                enableMessage: true,
                state: 'avalible',
            },

        ]
    },
    {
        name: 'videography',
        person: [
            {
                img: '/assets/imgs/profile/3.jpg',
                name: 'Khalid Mohamed ',
                subtitle: '$585',
                enableMessage: true,
                state: 'avalible',
            },
        ]
    },
    {
        name: 'post-production',
        person: [
            {
                img: '/assets/imgs/profile/4.jpg',
                name: 'Mohamed Yasser',
                subtitle: '$85',
                enableMessage: false,
                state: 'bug',
            },
            {
                img: '/assets/imgs/profile/1.jpg',
                name: 'Mohamed Omar',
                subtitle: '$85',
                enableMessage: false,
                state: 'wating',
            },
        ]
    },

]

const TheTeam = () => {
    const State = 2;
    return (
        <>
            <Layout shortheader={true} >

                <section className="container">
                    {
                        State == 0 &&
                        <Empty />
                    }
                    {
                        State == 1 &&
                        <div className="flex gap-7">
                            <LeftSide />
                            <RightSide />
                        </div>
                    }
                    {
                        State == 2 &&
                        <div className="flex gap-7">
                            <LeftSide isSolid={true} />
                            <RightSide isSolid={true} />
                        </div>
                    }
                </section>

            </Layout>
        </>
    );
};

function Person({ person }) {

    return (
        <div className='flex gap-4 h-14 min-w-[400px]'>
            <img className='rounded-full h-full aspect-square' src={person.img} alt='profile img' />
            <div className='w-full flex flex-col justify-center'>
                <span className='text-DS_black text-[15px] opacity-80 font-semibold'>{person.name}</span>
                <span className='text-DS_black text-[13px] opacity-50'>{person.subtitle}</span>
            </div>
            <div className={`flex rounded-full justify-center items-center gap-2 border border-primary p-4 ${person.enableMessage ? 'cursor-pointer' : 'grayscale opacity-20'}`}>
                <span className='text-primary text-sm font-semibold capitalize'> message </span>
                <div className='w-5 h-5'>
                    <Icon name={'chat'} />
                </div>
            </div>
            {/* action */}

            {person.state === 'wating' && <Icon name="wating" className=" w-14 h-14" />}
            {person.state === 'bug' && <Icon name="bug" className=" w-14 h-14" />}
            {person.state === 'avalible' && (
                <Selector
                    options={[
                        { value: "option 1", onClick: () => { } },
                        { value: "option 2", onClick: () => { } },
                        { value: "option 3", onClick: () => { } }
                    ]}
                    className="relative border rounded-full border-[#00000033] flex justify-center items-center w-14 h-14 cursor-pointer"
                />
            )}

            {/*********/}

        </div>
    );

}

const Sections = ({ section, AddTeam, isSolid }) => {

    return (
        <>
            <div className="flex justify-between my-3">
                <span className="opacity-60 capitalize font-medium">
                    {section.name}
                </span>
                {
                    !isSolid &&
                    <div className="flex gap-2 cursor-pointer">
                        <Icon className="w-4" name="X" />
                        <span className="text-[#FF4646]">Remove </span>
                    </div>
                }
            </div>
            <div className="w-full h-[1px] bg-black opacity-15" />

            <div className='flex flex-col gap-5 my-5 max-h-[600px] overflow-y-scroll'>
                {section.person.map((person, index) => (
                    <Person key={index} person={person} />
                ))}

                {
                    !isSolid &&
                    <AddCreative onClick={AddTeam} />
                }
            </div>
        </>
    )
}

const LeftSide = ({ isSolid }) => {
    const [isAddToTeamPage, setIsAddToTeamPage] = useState(false);

    const togglePage = () => {
        setIsAddToTeamPage(!isAddToTeamPage);
    };


    return (
        <>
            <div className="h-body w-2/3 overflow-y-scroll py-14">
                {!isAddToTeamPage &&
                    <>
                        <h1 className="page-header">team project</h1>
                        {data.map((section, index) => (
                            <div key={index} >
                                <Sections isSolid={isSolid} AddTeam={togglePage} section={section} />
                                {index !== data.length - 1 && <div className="bg-[#00000033] h-1 w-full"></div>}
                            </div>
                        ))}
                    </>
                }
                {isAddToTeamPage &&
                    <AddToTeamPage goback={togglePage} />
                }
            </div>
        </>
    )
}

const RightSide = ({ isSolid }) => {
    return (
        <div className="w-1/3 h-body py-14">
            <div className="flex gap-7 bg-DS_white w-full h-full border rounded-2xl border-[#CFCFCF] relative">
                <div className="p-12">
                    <h2 className="opacity-80 text-2xl font-semibold capitalize"> project details </h2>
                </div>
                {
                    !isSolid &&
                    <div className="absolute flex flex-col gap-4 bottom-0 w-full h-48 p-6">
                        <div className="flex justify-between w-full">
                            <span className="font-bold">Total Amount</span>
                            <span className="font-bold">$6,699.0</span>
                        </div>
                        <div className="w-full px-6">
                            <div className="bg-[#677A93] flex rounded-full p-1" >
                                <div className="w-full flex justify-center items-center">
                                    <span className="capitalize flex mx-5 items-center text-lg font-bold text-DS_white text-center">Check-Out</span>
                                </div>
                                <div className="flex aspect-square items-center justify-center rounded-full bg-DS_white bg-opacity-25 h-20 w-20">
                                    <Icon name={'check-1'} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const AddCreative = ({ onClick }) => {
    return (
        <div onClick={onClick} className="flex items-center rounded-full border border-primary p-1 w-min cursor-pointer">
            <div className="w-11 h-11 flex items-center justify-center border rounded-full border-primary">
                <Icon name='+' />
            </div>
            <div className=" text-center text-primary font-semibold mx-6 capitalize whitespace-nowrap">
                add creative
            </div>
        </div>
    )
}

const Empty = () =>
    <div className="h-body flex flex-col justify-center">
        <div className='container flex flex-col justify-center items-center text-center w-full'>
            <img src='/assets/imgs/theme/TeamProjects.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
            <h3 className='text-[40px] font-semibold mt-8 mb-4'>
                Team Projects
                <p className="text-2xl opacity-50">
                    “Team Projects” are a great way to build teams for your project.
                </p>
            </h3>
        </div>
    </div>


const AddToTeamCard = ({ info, goback }) =>
    <div className="bg-DS_white border rounded-[45px] overflow-hidden">
        <div className="flex w-full overflow-hidden h-32">
            {info.images.map((image, index) => (
                <img key={index} className="w-1/4" src={image} alt={`Image ${index}`} />
            ))}
        </div>
        <div className='p-5'>
            <div className='flex items-start gap-4 -translate-y-4 h-11'>
                <div className='w-[85px] h-[85px] bg-cover relative bg-no-repeat'>
                    <img className='w-full h-full rounded-full border-2 border-white shadow -translate-y-8' src={info["profile-pic"]} alt="profile picture" />
                </div>
                <div className='flex-2 flex-col gap-1'>
                    <span className='text-2xl font-bold capitalize'>{info['personal-name']}</span>
                    <span className='flex items-center'>
                        <img className='h-3' alt="profile cover" src="/assets/imgs/theme/icons/location.svg" />
                        <span className="location">{info['location']}</span>
                    </span>
                </div>
            </div>
            <div className='flex justify-center pt-25 items-center gap-3 mt-6'>
                <p className='rank'>{info['rank']}</p>
                <p id='photographer'>{info['occupation']}</p>
                <div id='rating' className='flex items-center gap-1 w-20'>
                    <p>{info['value']}</p>
                    <img src='/assets/imgs/theme/icons/rating.svg' width={18} height={18} />
                </div>
            </div>
            <div className='flex justify-center pt-7 items-center'>
                <div className='flex justify-center'>
                    {Object.entries(info.popularity).map(([key, value]) => (
                        <div className='popularity mr-9 pr-9 last:mr-0 last:pr-0' key={key}>
                            <p className='number'>{convertToK(value, 0)}</p>
                            <p className='unit'>{key}</p>
                        </div>
                    ))}

                </div>
            </div>
            <div className="flex gap-3 mt-6">
                <span className="text-5xl">$25
                    <span className="text-2xl opacity-50">/hr</span>
                </span>

                <div onClick={goback} className="flex items-center justify-center capitalize w-full rounded-full text-center border-2 border-primary cursor-pointer">
                    <span className="text-primary font-bold text-lg ">
                        add to team
                    </span>
                </div>

            </div>
        </div>
    </div>

const AddToTeamPage = ({ goback }) => <>
    <Filter hideSwitch={true} />
    <div className="grid minmax-360 gap-5">
        {
            users.map((value, index) =>
                <AddToTeamCard goback={goback} info={value} key={index} className='cursor-pointer' href="/project" />
            )
        }

    </div>

</>

const Result = () =>
    <div className="h-body flex flex-col justify-center">
        <div className='container flex flex-col justify-center items-center text-center w-full'>
            <img src='/assets/imgs/theme/TeamProjects.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
            <h3 className='text-[40px] font-semibold mt-8 mb-4'>
                Team Projects
                <p className="text-2xl opacity-50">
                    “Team Projects” are a great way to build teams for your project.
                </p>
            </h3>
        </div>
    </div>

export default TheTeam;
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
    },
    {
        "images": [
            "/assets/imgs/projects/1.jpeg",
            "/assets/imgs/projects/6.jpeg",
            "/assets/imgs/projects/3.jpeg",
            "/assets/imgs/projects/4.jpeg"
        ],
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
    },
    {
        "images": [
            "/assets/imgs/projects/1.jpeg",
            "/assets/imgs/projects/6.jpeg",
            "/assets/imgs/projects/3.jpeg",
            "/assets/imgs/projects/4.jpeg"
        ],
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
    },
    {
        "images": [
            "/assets/imgs/projects/1.jpeg",
            "/assets/imgs/projects/6.jpeg",
            "/assets/imgs/projects/3.jpeg",
            "/assets/imgs/projects/4.jpeg"
        ],
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
    const [State, setState] = useState(1);

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
                        <div className="flex flex-col lg:flex-row gap-7 items-center">
                            <LeftSide />
                            <RightSide onClick={() => setState(2)} />
                        </div>
                    }
                    {
                        State == 2 &&
                        <div className="flex flex-col lg:flex-row gap-7">
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
        <div className='flex gap-4 h-12 min-w-[400px]'>
            <img className='rounded-full h-full aspect-square' src={person.img} alt='profile img' />
            <div className='w-full flex flex-col justify-center'>
                <span className='text-DS_black text-[15px] opacity-80 font-semibold'>{person.name}</span>
                <span className='text-DS_black text-[13px] opacity-50'>{person.subtitle}</span>
            </div>
            <div className={`flex rounded-full justify-center items-center gap-2 border border-primary p-4 ${person.enableMessage ? 'cursor-pointer' : 'grayscale opacity-20'}`}>
                <span className='text-primary text-sm font-semibold capitalize'> message </span>
                <div className='size-5'>
                    <Icon name={'chat'} />
                </div>
            </div>
            {/* action */}

            {person.state === 'wating' && <Icon name="wating" className="size-12" />}
            {person.state === 'bug' && <Icon name="circle-exclamation" className="rounded-full border border-[#D72828] text-[#D72828] p-3 size-6" />}
            {person.state === 'avalible' && (
                <Selector
                    options={[
                        { value: "option 1", onClick: () => { } },
                        { value: "option 2", onClick: () => { } },
                        { value: "option 3", onClick: () => { } }
                    ]}
                    className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF40] flex justify-center items-center size-12 cursor-pointer"
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
                    <div className="flex gap-2 cursor-pointer items-center">
                        <Icon className="text-[#FF4646]" name="xmark" />
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
            <div className="h-body w-full overflow-y-scroll pt-14">
                {!isAddToTeamPage &&
                    <>
                        <h1 className="page-header mb-12">team project</h1>
                        {data.map((section, index) => (
                            <div key={index} >
                                <Sections isSolid={isSolid} AddTeam={togglePage} section={section} />
                                {index !== data.length - 1 && <div className="bg-[#00000033] dark:bg-[#FFFFFF33] h-1 w-full"></div>}
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

const RightSide = ({ isSolid, onClick }) => {
    return (
        <div className="w-full max-w-[483px] h-body py-10">
            <div className="flex gap-7 bg-DS_white w-full h-full border rounded-2xl border-[#CFCFCF] dark:border-[#3D3D3D] relative">
                <div className="p-12">
                    <h2 className="opacity-80 text-2xl font-semibold capitalize"> project details </h2>
                </div>
                {
                    !isSolid &&

                    <div className="border-t absolute flex flex-col gap-4 bottom-0 w-full h-48 p-6 items-center">
                        <div className="flex justify-between w-full">
                            <span className="font-bold">Total Amount</span>
                            <span className="font-bold">$6,699.0</span>
                        </div>

                        <ArrowBtn onClick={onClick} className="cursor-pointer  w-full sm:w-[388px]" text='Check-Out' isEnable={false} IconName="check" />

                    </div>
                }
            </div>
        </div>
    )
}

const AddCreative = ({ onClick }) => {
    return (
        <div onClick={onClick} className="flex items-center rounded-full border border-primary p-1 w-min cursor-pointer">
            <div className="size-11 flex items-center justify-center border rounded-full border-primary">
                <Icon className="text-xl text-primary " name='plus' />
            </div>
            <div className=" text-center text-primary font-semibold mx-4 capitalize whitespace-nowrap">
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
    <div className="bg-DS_white border dark:border-[#FFFFFF33] rounded-[45px] overflow-hidden">
        <div className="flex w-full overflow-hidden h-32">
            {info.images.map((image, index) => (
                <img key={index} className="w-1/4" src={image} alt={`Image ${index}`} />
            ))}
        </div>
        <div className='p-5'>
            <div className='flex items-start gap-4 -translate-y-4 h-11'>
                <div className='w-[85px] h-[85px] bg-cover relative bg-no-repeat'>
                    <img className='w-full h-full rounded-full border-2 shadow -translate-y-8' src={info["profileImg"]} alt="profile picture" />
                </div>
                <div className='flex-2 flex-col gap-1'>
                    <span className='text-2xl font-bold capitalize'>{info['personalName']}</span>
                    <span className='flex items-center gap-2 opacity-40'>
                        <Icon name="location-dot" />
                        <span className="location">{info['location']}</span>
                    </span>
                </div>
            </div>
         
            <div className='flex justify-center pt-25 items-center gap-3'>
                <div className='Professional-background-decoration px-2 py-1 '>
                    <span className='Professional-text-decoration font-bold text-lg'>{info.rank}</span>
                </div>

                <span className=' flex border rounded-full px-2 py-1 gap-1 text-lg'>
                    <span>{info.occupation}</span>
                </span>
                <div className='border rounded-full px-2 py-1 text-lg flex items-center gap-1'>
                    <span>{info.value}</span>
                    <div className='w-5'>
                        <Icon className='text-primary' name={'rate-star'} />
                    </div>
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
            <div className="flex gap-3 mt-6 justify-center items-center">
                <span className="text-5xl">$25
                    <span className="text-2xl opacity-50">/hr</span>
                </span>

                <div onClick={goback} className="flex items-center justify-center capitalize w-full rounded-full text-center border-2 border-primary cursor-pointer">
                    <span className="text-primary font-bold text-lg my-5 ">
                        add to team
                    </span>
                </div>

            </div>
        </div>
    </div>

const AddToTeamPage = ({ goback }) => <>
    <Filter hideSwitch={true} />
    <div className="grid minmax-360 gap-5 my-6">
        {
            users.map((value, index) =>
                <AddToTeamCard goback={goback} info={value} key={index} className='cursor-pointer' href="/project/1" />
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
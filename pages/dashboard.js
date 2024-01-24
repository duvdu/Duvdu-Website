import Chart from '../components/elements/lineChart';
import Layout from '../components/layout/Layout';
import { convertToK } from '../util/util';
import NextBadgeCard from '../components/elements/NextBadgeCard';
import ProjectViewsCard from '../components/elements/ProjectViewsCard';
import Popup from '../components/elements/popup';
import TopProjects from '../components/elements/topProjects';
import AppButton from '../components/elements/button';
import React, { useState } from 'react';

const Dashboard = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const chart = {
        initialDatapoints: [100, 40, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170],
        viewRate: 5.3,
        isUp: false
    }
    const activity = [
        {
            'title': 'contracts',
            'count': '31',
            'state': 'Done',
        },
        {
            'title': 'contracts',
            'count': '2',
            'state': 'pending',
        },
        {
            'title': 'projects',
            'count': '2',
            'state': 'portfolio',
        },
    ]
    const badge = 63;
    const recieved = {
        "data": [
            {
                "title": "project views",
                "number": 5400,
            },
            {
                "title": "likes",
                "number": 420,
            },
            {
                "title": "profile views",
                "number": 1800,
            },
        ],
        "rate": {
            "number": 2.6,
            "isUp": true,
        },
    }
    const projects = {
        "projects": [
            {
                "name": "Project Name",
                "img": null,
                "views": 7556,
                "rank": 1
            },
            {
                "name": "Project Name",
                "img": null,
                "views": 7556,
                "rank": 2
            },
            {
                "name": "Project Name",
                "img": null,
                "views": 7556,
                "rank": 3
            }
        ]
    }
    const isUp = true
    const viewRate = 2.6

    return (
        <>

            <Layout>
                <button onClick={openPopup}>Open Popup</button>
                <Popup isOpen={isPopupOpen} onClose={closePopup} header={'registration required'}>
                    <div className='flex h-full flex-col mt-24 items-center'>
                            <span className='mb-12 text-center text-xl font-semibold'>
                                Register or Sign-in
                                <br/>
                                to access this feature
                            </span>
                        <AppButton href={"/register"} text={"register"} className={"mb-40 mx-16 md:mx-32"} />
                    </div>
                </Popup>
                <div className='container flex gap-6 flex-col lg:flex-row'>
                    <div className='w-full'>
                        <NextBadgeCard badge={badge} />
                        <ProjectViewsCard recieved={recieved} />
                        <Chart initialDatapoints={chart.initialDatapoints} viewRate={chart.viewRate} isUp={chart.isUp} />
                    </div>
                    <div className='w-full mt-6'>
                        <div className='flex gap-6'>
                            <div className='flex flex-col w-full gap-6'>
                                <div className='card cardborder-3 bg-white w-full h-full cardborder p-7 pt-16'>
                                    <span className='text-lg font-semibold capitalize opacity-70'>projects today</span>
                                    <br />
                                    <br />
                                    <span className='text-[47.907px] font-medium capitalize'>1530</span>
                                    <br />
                                    <div className='flex mt-2'>
                                        <div className='bg-gray-200 rounded-xl px-2 py-1'>
                                            <span className='text-sm font-medium opacity-70'>videography</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='card cardborder-3 green-gradient w-full h-full cardborder p-7 pt-16'>
                                    <div className='flex items-center'>
                                        <span className='text-lg font-semibold capitalize opacity-70'>rank</span>
                                        <div className={`gap-1 rounded-full px-4 flex items-center bg-gray-300 ml-6 mr-2 ${isUp ? 'text-green-700' : 'text-red-700'}`}>
                                            <span >
                                                {
                                                    !isUp &&
                                                    <img src='/assets/imgs/theme/icons/downArrow.svg' />
                                                }
                                                {
                                                    isUp &&
                                                    <img src='/assets/imgs/theme/icons/upArrow.svg' />
                                                }

                                            </span>
                                            <span> {viewRate}%</span>
                                        </div>
                                        <div className='bg-slate-200 rounded-2xl w-5 h-5 flex justify-center cursor-pointer'>
                                            <p>?</p>
                                        </div>
                                    </div>

                                    <br />
                                    <br />
                                    <span className='text-[47.907px] font-medium capitalize'>1530</span>
                                    <br />
                                    <div className='flex mt-2'>
                                        <div className='bg-gray-200 rounded-xl px-2 py-1'>
                                            <span className='text-sm font-medium opacity-70'>top 30%</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='card cardborder-3 bg-white p-6 pt-16'>
                                    <div className='flex justify-between'>
                                        <p className='capitalize text-lg font-bold mb-5'>activity</p>
                                        <div className='bg-slate-200 rounded-2xl w-5 h-5 flex justify-center cursor-pointer'>
                                            <p>?</p>
                                        </div>
                                    </div>
                                    {
                                        activity.map((e, index) => (
                                            <div className='spliter' key={index}>
                                                <div className='mb-2'>
                                                    <span className='text-5xl font-medium'>{convertToK(e.count)} </span>
                                                    <span className='text-3xl capitalize font-medium'>{e.title}</span>
                                                </div>
                                                <div className='flex'>
                                                    <div className='bg-gray-200 text-sm mx-1 px-2 rounded-2xl'> {e.state} </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <TopProjects projects={projects} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Dashboard;

import Chart from '../components/elements/lineChart';
import Layout from '../components/layout/Layout';
import DashboardPopup from '../components/popsup/dashboard';
import NextBadgeCard from '../components/pages/dashboard/NextBadgeCard';
import ProjectViewsCard from '../components/pages/dashboard/ProjectViewsCard';
import TopProjects from '../components/pages/dashboard/topProjects';
import ActivityCard from '../components/pages/dashboard/ActivityCard';
import Icon from '../components/Icons';

import React, { useState } from 'react';

const Dashboard = () => {

    const isUp = true
    const badge = 63;
    const viewRate = 2.6

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


    return (
        <>
            <Layout shortheader={true}>
                <DashboardPopup />
                <div className='container flex gap-6 flex-col lg:flex-row '>
                    <div className='w-full flex flex-col gap-6 pt-6 '>
                        <NextBadgeCard badge={badge} />
                        <ProjectViewsCard recieved={recieved} />
                        <Chart initialDatapoints={chart.initialDatapoints} viewRate={chart.viewRate} isUp={chart.isUp} />

                    </div>
                    <div className='w-full pt-6'>
                        <div className='flex flex-col sm:flex-row gap-6'>
                            <div className='flex flex-col w-full gap-6'>
                                <div className='card cardborder-3 bg-DS_white w-full h-full cardborder p-7 pt-16'>
                                    <span className='text-lg font-semibold capitalize opacity-70'>projects today</span>
                                    <br />
                                    <br />
                                    <span className='text-[47.907px] text-DS_black font-medium capitalize'>1530</span>
                                    <br />
                                    <div className='flex mt-2'>
                                        <div className='dashboard_padge px-2 py-1'>
                                            <span className='text-sm font-medium opacity-70'>videography</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='card cardborder-3 green-gradient w-full h-full cardborder p-7 pt-16'>
                                    <div className='flex items-center'>
                                        <span className='text-lg font-semibold capitalize opacity-70'>rank</span>
                                        <div className={`gap-1 rounded-full px-4 flex items-center ml-6 mr-2 dashboard_padge ${isUp ? 'text-green-700' : 'text-red-700'}`}>
                                            <span >
                                                {
                                                    !isUp && <Icon className='text-red-700' name={'arrow-down-long'} />
                                                }
                                                {
                                                    isUp && <Icon className='text-green-700' name={'arrow-up-long'} />
                                                }
                                            </span>
                                            <span className={`${isUp ? 'text-green-700' : 'text-red-700'}`}> {viewRate}%</span>
                                        </div>
                                        <div className='w-full' />
                                        <div className='bg-slate-200 rounded-2xl w-5 h-5 flex justify-center cursor-pointer'>
                                            <p>?</p>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <span className='text-[47.907px]  text-DS_black font-medium capitalize'>1530</span>
                                    <br />
                                    <div className='flex mt-2'>
                                        <div className='dashboard_padge px-2 py-1'>
                                            <span className='text-sm font-medium opacity-70'>top 30%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <ActivityCard activity={activity} />
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

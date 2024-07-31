import Layout from '../components/layout/Layout';
import DashboardPopup from '../components/popsup/dashboard';
import NextBadgeCard from '../components/pages/dashboard/NextBadgeCard';
import ProjectViewsCard from '../components/pages/dashboard/ProjectViewsCard';
import TopProjects from '../components/pages/dashboard/topProjects';
import ActivityCard from '../components/pages/dashboard/ActivityCard';
import Icon from '../components/Icons';

import React, { useState , useEffect } from 'react';
import LineChart from '../components/pages/dashboard/lineChart';
import { getUserAnalysis } from '../redux/action/apis/dashboard/getUserAnalysis';
import { connect } from "react-redux";

const Dashboard = ({user_analysis ,api, getUserAnalysis}) => {
    console.log(user_analysis)
    useEffect(()=>{
        getUserAnalysis()
    },[])
    const data = user_analysis?.data
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
                <DashboardPopup GoBackOnCancel={true} />
                <div className='container flex gap-6 flex-col lg:flex-row py-6 px-3'>
                    <div className='w-full flex flex-col gap-3 sm:gap-6'>
                        <NextBadgeCard next={data?.userData[0]?.rank?.nextRankTitle} title={data?.userData[0]?.rank?.title} badge={data?.userData[0]?.rank?.nextRankPercentage} />
                        <ProjectViewsCard recieved={recieved} userData={data?.userData[0]} />
                        <LineChart initialDatapoints={chart.initialDatapoints} viewRate={chart.viewRate} isUp={chart.isUp} />
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-col w-full gap-2'>
                                <div className='card cardborder-3 bg-white dark:bg-[#1A2024] w-full h-full p-7 pt-16'>
                                    <span className='text-lg font-semibold capitalize opacity-70'>projects today</span>
                                    <br />
                                    <br />
                                    <span className='text-4xl text-DS_black font-medium capitalize'>{data?.userCategoryRank.projectsToday}</span>
                                    <br />
                                    <div className='flex mt-2'>
                                        <div className='dashboard_padge px-2 py-1'>
                                            <span className='text-sm font-medium opacity-70'>videography</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='card border border-[#97C39E] dark:border-[#577E61] green-gradient w-full h-full p-7 pt-16'>
                                    <div className='flex items-center'>
                                        <span className='text-lg font-semibold capitalize opacity-70'>rank</span>
                                        <div className={`gap-1 rounded-full px-4 flex items-center ml-6 mr-2 dashboard_padge ${isUp ? 'text-[#289C34] dark:text-[#2DB03A]' : 'text-[#B41D38]'}`}>
                                            <span >
                                                {
                                                    !(recieved.rate.isUp) &&
                                                    <Icon className='text-[#B41D38]' name={'arrow-down-long'} />
                                                }
                                                {
                                                    recieved.rate.isUp &&
                                                    <Icon className='text-[#289C34] dark:text-[#2DB03A]' name={'arrow-up-long'} />
                                                }
                                            </span>
                                            <span className={`${isUp ? 'text-[#289C34] dark:text-[#2DB03A]' : 'text-[#B41D38]'}`}> {viewRate}%</span>
                                        </div>

                                        {/* <span className='bg-[#D9D9D9] dark:bg-[#333333] rounded-2xl w-5 h-5 flex justify-center cursor-pointer aspect-s?are items-center'>
                                            ?
                                        </span> */}
                                    </div>
                                    <br />
                                    <span className='text-4xl text-DS_black font-medium capitalize'>top {data?.userCategoryRank?.percentile}%</span>
                                    <br />
                                    <div className='flex mt-2'>
                                        <div className='dashboard_padge px-2 py-1'>
                                            <span className='text-sm font-medium opacity-70'>videography</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <ActivityCard data={data} />
                            </div>
                        </div>
                        <TopProjects projects={data?.topProjectViews} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    user_analysis: state.api.getUserAnalysis,
    api: state.api
});

const mapDidpatchToProps = {
    getUserAnalysis,
    
};
export default connect(mapStateToProps, mapDidpatchToProps)(Dashboard);

import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import Selector from "../components/elements/CustomSelector";
import React, { useState } from 'react';

const data = [
    {
        img: '/assets/imgs/projects/1.jpeg',
        projectsNum: '37',
        name: 'new team project',
    },
    {
        img: '/assets/imgs/projects/4.jpeg',
        projectsNum: '564',
        name: 'new shoot inspiration',
    },
    {
        img: '/assets/imgs/projects/7.jpeg',
        projectsNum: '546',
        name: 'mood board for our project',
    },

];

const Card = ({ data }) => {

    const { img, projectsNum, name } = data;

    const dropdown = [
        {
            value: "Delete",
            id: 'delete-board',
        },
    ]

    return (
        <>
            <div className="boards-card">
                <a href="/team">
                    <div className="w-full h-full rounded-[50px] img-cart-style bg-[${img1}]" style={{ backgroundImage: `url(${img})` }} />
                </a>
                <div className="boards-info projects-num">{projectsNum} projects</div>

                <Selector options={dropdown} className="absolute right-7 top-7 appblur rounded-full w-14 aspect-square flex justify-center items-center" invert={true} />

                <div className="boards-info projects-name flex">
                    {name}
                </div>
            </div>
        </>
    );
};

const CreateBoard = () => {

    return (
        <>
            <Layout shortheader={true} isbodyWhite={true}>
                <section className="mt-3 mb-12">
                    <div className="container mb-7">
                        <div className="flex alignCenter mb-7 items-center">
                            <h1 className="mood-boards-header">team projects</h1>
                            <div className="mr-6"></div>
                            <div className="flex gap-5 items-center py-[21px] px-[35px] rounded-full border-[1.5px] bg-primary text-white text-center text-lg font-semibold cursor-pointer capitalize">
                                new team project
                                <Icon name={"+"} />
                            </div>
                        </div>
                        {false && (
                            <Empty />
                        )}
                        {true &&
                            <div className="boards-grid">
                                {
                                    data.map((feature, index) => (
                                        <Card key={index} data={feature} />
                                    ))
                                }
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
};

const Empty = () =>
    <div className='container flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet'>
        <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
        <img src='/assets/imgs/theme/TeamProject.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
        <h3 className='text-[40px] font-semibold mt-8 mb-4'>
            Team Projects
            <p className="text-2xl opacity-50">
                “Team Projects” are a great way to build teams for your project.
            </p>
        </h3>
    </div>


export default CreateBoard;

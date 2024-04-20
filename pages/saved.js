import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import DeleteBoard from "../components/popsup/DeleteBoard";
import CreateBoard from "../components/popsup/createnewBoard";
import Selector from "../components/elements/CustomSelector";
import React, { useState } from 'react';

const data = [
    {
        img1: '/assets/imgs/projects/1.jpeg',
        img2: '/assets/imgs/projects/2.jpeg',
        img3: '/assets/imgs/projects/3.jpeg',
        projectsNum: '37',
        name: 'favorites',
    },
    {
        img1: '/assets/imgs/projects/4.jpeg',
        img2: '/assets/imgs/projects/5.jpeg',
        img3: '/assets/imgs/projects/6.jpeg',
        projectsNum: '564',
        name: 'new shoot inspiration',
    },
    {
        img1: '/assets/imgs/projects/7.jpeg',
        img2: '/assets/imgs/projects/8.jpeg',
        img3: '/assets/imgs/projects/9.jpeg',
        projectsNum: '546',
        name: 'mood board for our project',
    },

];

const Boards = ({ data }) => {


    const { img1, img2, img3, projectsNum, name, favorite } = data;

    const dropdown = [
        {
            value: "Delete",
            id: 'delete-board',
        },
    ]

    return (
        <>
            <DeleteBoard />
            <div className="boards-card">
                <a href="/save" className="projects cursor-pointer">
                    <div className="col1 img-cart-style bg-[${img1}]" style={{ backgroundImage: `url(${img1})` }}></div>
                    <div className="col2">
                        <div className="row1 img-cart-style" style={{ backgroundImage: `url(${img2})` }}></div>
                        <div className="row2 img-cart-style" style={{ backgroundImage: `url(${img3})` }}></div>
                    </div>
                </a>
                <div className="boards-info projects-num">{projectsNum} projects</div>

                <Selector options={dropdown} iconclassName="text-white" className="absolute right-7 top-7 appblur rounded-full w-14 aspect-square flex justify-center items-center" invert={true} />
                <div className="absolute bottom-0 w-full h-1/2 rounded-[50px]  gradient1"/>

                <div className="boards-info projects-name flex">
                    {name == "favorites" && <Icon name={"favorites"} />}
                    {name}
                </div>
            </div>
        </>
    );
};

const Saved = () => {
    
    return (
        <>
            <CreateBoard  />
            <Layout shortheader={true} isbodyWhite={true}>
                <section className="mt-3 mb-12">
                    <div className="sm:container mb-7">
                        <div className="flex alignCenter mb-7 items-center">
                            <h1 className="text-2xl opacity-80 font-semibold capitalize">mood boards</h1>
                            <div className="mr-6"></div>
                            <div data-popup-toggle="popup" data-popup-target='create-new-board' className="new_board">
                                new board
                                <Icon className="text-white" name={"plus"} />
                            </div>
                        </div>
                        {false && (
                            <h3>No saved Found </h3>
                        )}
                        <div className="boards-grid">
                            {
                                data.map((feature, index) => (
                                    <Boards key={index} data={feature} />
                                ))
                            }
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Saved;

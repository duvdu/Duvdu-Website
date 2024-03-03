import React, { useState, useEffect } from "react";
import Drawer from '../elements/drawer';
import Icon from '../Icons'
import ArrowBtn from '../elements/arrowBtn';

const producersDrawer = ({ data, isOpen, toggleDrawer , submitt }) => {

    const [isable, setIsDisabled] = useState(false);
    const [Daysvalue, setDaysValue] = useState(10);
    const [Requirementsvalue, setRequirementsvalue] = useState(10);

    const team = [
        {
            id: 1,
            user: {
                name: 'anna jones',
                img: '/assets/imgs/profile/author-2.png',
            },
            salary: '720',
            occupation: 'photographer',
            removable: false
        },
        {
            id: 2,
            user: {
                name: 'youseff omar',
                img: '/assets/imgs/profile/author-1.png',
            },
            salary: '360',
            occupation: 'modal',
            removable: true
        },
        {
            id: 3,
            user: {
                name: 'camera - sony 4k',
                img: null,
            },
            salary: '200',
            occupation: null,
            removable: true
        },
        {
            user: {
                name: 'studio - district 5',
                img: null,
            },
            salary: '400',
            occupation: null,
            removable: true
        },
    ];

    const handleSwitchChange = (newState) => {
        setIsDisabled(newState);
    };

    const handleChangeDays = (event) => {
        setDaysValue(event.target.value);
        document.documentElement.style.setProperty('--days-value', `${event.target.value * 5}%`)
    };
    const handleChangRequirementsvalue = (event) => {
        setRequirementsvalue(event.target.value);
        document.documentElement.style.setProperty('--requirements-value', `${event.target.value * 5}%`)
    };
    const handleChangHours = (event) => {
        setRequirementsvalue(event.target.value);
        document.documentElement.style.setProperty('--hours-value', `${event.target.value * 5}%`)
    };

    return (
        <Drawer name={data.name} img={data.img} isOpen={isOpen} toggleDrawer={toggleDrawer} className="overflow-scroll">

            <section>
                <p className="capitalize opacity-60 mt-11">project type</p>
                <div className="rounded-full border border-[#0000008C] w-min whitespace-nowrap mt-2">
                    <span className="mx-3">episodic drama</span>
                </div>
            </section>
            <section>
                <p className="capitalize opacity-60 mt-11">plarform</p>
                <input placeholder="enter platform..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 sm:w-96 mt-4 p-4" />
            </section>
            <section>
                <p className="capitalize opacity-60 mt-11">project Details</p>
                <textarea placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
            </section>
            <section className="my-11 flex justify-between gap-7">
                <div className="flex gap-3">
                    <select
                        className="shadow-sm border bg-DS_white border-[#0000008C] rounded-full py-2 px-3 focus:outline-none focus:ring-primary focus:ring-width-2 text-DS_black"
                        required
                    >
                        <option value="option.value">episodes</option>
                        <option value="option.value">episodes</option>
                        <option value="option.value">episodes</option>
                    </select>
                    <select
                        className="shadow-sm border bg-DS_white border-[#0000008C] rounded-full py-2 px-3 focus:outline-none focus:ring-primary focus:ring-width-2 text-DS_black"
                        required
                    >
                        <option value="option.value">episode duration</option>
                        <option value="option.value">episode duration</option>
                        <option value="option.value">episode duration</option>
                    </select>
                </div>
            </section>
            <section className="my-11 flex justify-between gap-7">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div>
                        <p className="capitalize opacity-60 mt-11">expected budget</p>
                        <input className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 mt-4 p-4" />
                    </div>
                    <div>
                        <p className="capitalize opacity-60 mt-11">expected profits</p>
                        <input className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 mt-4 p-4" />
                    </div>

                </div>
            </section>
          
            <section className="my-11 gap-7">
                <p className="capitalize opacity-60 mt-11">upload alike project</p>
                    <div className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 sm:w-96 p-2 mt-4">
                        <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                            <Icon className="text-primary text-2xl" name={"image"} />
                        </div>
                        <span className="pl-5 w-full text-blue-600">Open gallery</span>
                        <Icon name={"angle-right"} className={"mr-4 text-primary"} />
                    </div>
            </section>

            <section className="sticky bottom-0">
                <div className="flex justify-center mt-11">
                    <ArrowBtn data-popup-toggle="popup" data-popup-target="form-submitted" Click={submitt} className="cursor-pointer w-96" text='continue' />
                </div>
            </section>
        </Drawer >

    );
};


export default producersDrawer;

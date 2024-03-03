import React, { useState, useEffect } from "react";
import Drawer from '../elements/drawer';
import Switch from '../elements/switcher'
import Icon from '../Icons'
import ArrowBtn from '../elements/arrowBtn';

const ProjectDrawer = ({ data, isOpen, toggleDrawer }) => {

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
        <Drawer name={data.user.name} img={data.user.img} isOpen={isOpen} toggleDrawer={toggleDrawer} className="overflow-scroll">
            <section className="flex gap-3 items-center mt-11">
                <Switch onSwitchChange={handleSwitchChange} />
                <span>price is inclusive</span>
            </section>

            <section className="my-11">
                {team.map((item, i) => (
                    <div key={i} className="flex">
                        <div key={i} className="team-padge">
                            {item.user.img && <img src={item.user.img} />}
                            <span className="mx-3">{item.user.name}</span>
                        </div>
                        {
                            item.salary &&
                            <div className="team-padge">
                                <span className="mx-3">{item.salary} $</span>
                            </div>
                        }
                        {
                            item.occupation &&
                            <div className="team-padge">
                                <span className="mx-3">{item.occupation} $</span>
                            </div>
                        }
                        {
                            item.removable &&
                            <div className="remove-padge cursor-pointer">
                                <span className="mx-3 capitalize">remove</span>
                                <div className="bg-[#FF4646] rounded-full flex p-1">
                                    <Icon name="X-white" />
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </section>
            <section>
                <p className="capitalize opacity-60">project details</p>
                <textarea placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-5">
                </textarea>
            </section>
            <section>
                    {/* <p className="capitalize opacity-60 mb-4">extra payments</p> */}
            </section>
            <section className="my-11 flex justify-between gap-7">
                <div className="w-full">
                    <p className="capitalize opacity-60 mb-4">location</p>
                    <div className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 p-2">
                        <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                            <Icon name={"location-dot"} />
                        </div>
                        <span className="pl-5 w-full">New Yourk, USA</span>
                        <Icon name={"angle-right"} className={"mr-4 text-primary"} />
                    </div>
                </div>

                <div className="w-full">
                    <p className="capitalize opacity-60 mb-4">upload alike project</p>
                    <div className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 p-2">
                        <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                            <Icon name={"gallery"} />
                        </div>
                        <span className="pl-5 w-full text-blue-600">Open gallery</span>
                        <Icon name={"angle-right"} className={"mr-4 text-primary"} />
                    </div>
                </div>
            </section>
            <section>
                <div className="w-full">
                    <p className="capitalize opacity-60 mb-4">shooting days</p>
                    <div className="flex flex-col justify-end rounded-2xl border border-gray-300 bg-DS_white py-5 p-2 px-4">
                        <input onChange={handleChangeDays} type="range" min="0" max="20" value={Daysvalue} id="myRange" className="range-input days-value" />
                        <Ruler />
                    </div>
                </div>
            </section>

            <section>
                <div className="w-full mt-11">
                    <p className="capitalize opacity-60 mb-4">custom requirements</p>
                    <div className="flex flex-col justify-end rounded-2xl border border-gray-300 bg-DS_white py-5 p-2 px-4">
                        <input onChange={handleChangRequirementsvalue} type="range" min="0" max="20" value={Requirementsvalue} id="myRange" className="range-input requirements-value" />
                        <Ruler />
                    </div>
                </div>
            </section>

            <section>
                <div className="w-full mt-11">
                    <p className="capitalize opacity-60 mb-4">number of hours</p>
                    <div className="flex flex-col justify-end rounded-2xl border border-gray-300 bg-DS_white py-5 p-2 px-4">
                        <input onChange={handleChangHours} type="range" min="0" max="20" value={Requirementsvalue} id="myRange" className="range-input requirements-value" />
                        <Ruler />
                    </div>
                </div>
            </section>

            <section>
                    {/* <p className="capitalize opacity-60 mb-4">select date</p> */}
            </section>

            <section className="sticky bottom-0">
                <div className="flex justify-center mt-11">
                    <a href="/payment">
                        <ArrowBtn className="cursor-pointer w-96" text='continue' />
                    </a>
                </div>
            </section>
        </Drawer >

    );
};
const Ruler = () => {
    const ruler = Array.from({ length: 21 }, (_, index) => index + 1);
    return (
        <div className="flex justify-between mt-2">
            {ruler.map((num) => (
                <div key={num} className="flex flex-col items-center opacity-20 mx-1">
                    <div className="w-[1px] h-1 bg-black" />
                    {
                        num % 2 == 1 &&
                        <span className="text-xs">{Math.floor(num / 2)}</span>
                    }
                </div>
            ))}
        </div>
    )
}

export default ProjectDrawer;

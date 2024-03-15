
import Layout from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import Selector from "../components/elements/CustomSelector";
import Icon from '../components/Icons';
import Clients from '../components/popsup/clients';

function Contracts() {

    return (
        <>
            <Layout shortheader={true} isbodyWhite={true}>
                <div className='container'>
                    <div className='flex gap-9'>
                        <div className='w-2/3'>
                            {true ? <LeftSide /> :
                                <div className='mt-16'>
                                    <h1 className="page-header">ongoing contracts</h1>
                                    <EmptyComponent />
                                </div>
                            }
                        </div>
                        <div className='w-[1px] h-body bg-black opacity-20'></div>
                        <div className='w-1/3'>
                            {true ?
                                <RightSide />
                                :
                                <Loadingcomponent />
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}



// *****************



const LeftSide = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleToggleClick = (index) => {
        setActiveIndex(index);
    };
    const Clients = () =>
        <section className='h-full overflow-y-scroll'>
            <section className='mt-11 flex flex-col gap-4'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">pending</h2>
                <Pending />
                <Pending />
            </section>
            <section className='mt-11 flex flex-col gap-4'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">ongoing contracts</h2>
                <Ongoing />
                <Ongoing />
            </section>
        </section>

    const Creatives = () =>
        <section className='h-full overflow-y-scroll'>
            <section className='mt-11 flex flex-col gap-4'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">pending</h2>
                <Pending2 />
            </section>
            <section className='mt-11 flex flex-col gap-4'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">ongoing contracts</h2>
                <Ongoing2 />
                <Ongoing2 />
            </section>
        </section>
    return (
        <>
            <div className='flex flex-col h-body'>

                <section className='flex gap-3 mt-16 mb-2'>
                    <div
                        className={`contact-toggle ${activeIndex === 0 ? 'active' : ''}`}
                        onClick={() => handleToggleClick(0)}
                    >
                        my clients
                    </div>
                    <div
                        className={`contact-toggle ${activeIndex === 1 ? 'active' : ''}`}
                        onClick={() => handleToggleClick(1)}
                    >
                        my creatives
                    </div>
                </section>
                {activeIndex === 0 ? <Clients /> : <Creatives />}
            </div>

        </>
    );
};

const Pending = () => {
    return (
        <div className='flex justify-between border border-[#00000040] rounded-[50px] p-6'>
            <div className='flex flex-col gap-11 items-start justify-between'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full' src="/assets/imgs/profile/contact-2.png" alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold capitalize'>anna jonathan</h3>
                        <span className='opacity-50'>Yesterday</span>
                    </div>
                </div>
                {/*********/}
                {/* time */}
                <span className='text-4xl'> 18:58
                    <span className='text-lg opacity-40 mx-2'>
                        left
                    </span>
                </span>
                {/*********/}
            </div>
            <div className='flex flex-col gap-11 items-end justify-between'>
                {/* dropdown */}
                <Selector options={[
                    {
                        value: "oprion 1",
                        onclick: () => { },
                    },
                    {
                        value: "oprion 2",
                        onclick: () => { },
                    },
                    {
                        value: "oprion 3",
                        onclick: () => { },
                    }
                ]} className="relative border rounded-full border-[#00000033] flex justify-center items-center w-14 h-14 cursor-pointer" />
                {/*********/}
                {/* button */}
                <div className='flex flex-col gap-11 items-end'>
                    <div className={`border-2 border-primary text-primary font-bold rounded-full flex justify-center items-center w-[345px] h-[65px] active capitalize cursor-pointer`}>
                        respond
                    </div>
                </div>
                {/*********/}
            </div>
        </div>

    );
};
const Pending2 = () => {
    return (
        <div className='flex justify-between items-center border border-[#00000040] rounded-[50px] p-6'>
            {/* profile */}
            <div className='flex gap-3 justify-between items-center'>
                <img className='w-14 h-14 rounded-full' src="/assets/imgs/profile/contact-2.png" alt="profile picture" />
                <div className='flex-col gap-1'>
                    <h3 className='opacity-80 text-lg font-bold capitalize'>anna jonathan</h3>
                    <span className='opacity-50'>Yesterday</span>
                </div>
            </div>
            {/*********/}
            {/* deadline */}
            <div className='text-lg'>
                <span className='opacity-50'>
                    Anna will respond in
                </span>
                <span className='text-primary'>
                    18:58
                </span>
            </div>
            {/*********/}
            {/* dropdown */}
            <Selector options={[
                {
                    value: "oprion 1",
                    onclick: () => { },
                },
                {
                    value: "oprion 2",
                    onclick: () => { },
                },
                {
                    value: "oprion 3",
                    onclick: () => { },
                }
            ]} className="relative border rounded-full border-[#00000033] flex justify-center items-center w-14 h-14 cursor-pointer" />
            {/*********/}
        </div>

    );
};

const Ongoing = ({ type }) => {
    return (
        <div className='flex justify-between border rounded-[50px] bg-primary p-6'>
            <div className='flex flex-col gap-3 items-start justify-between'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full' src="/assets/imgs/profile/contact-2.png" alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold  text-white capitalize'>anna jonathan</h3>
                        <span className='opacity-50 text-white'>Yesterday</span>
                    </div>
                </div>
                {/*********/}

                {/* type */}
                <span className='flex flex-col h-full text-white border-2 border-white rounded-full px-3 py-[6px] capitalize mb-8 opacity-70'>
                    wedding
                </span>
                {/*********/}

                {/* deadline */}
                <div className='flex gap-3'>
                    <span className='text-[40px] flex items-center ml-3 gap-2'>  <span className='opacity-50 text-white'>$</span> <span className='text-white'>490</span> </span>
                    <div className='h-auto w-[1px] bg-white opacity-15' />
                    <div>
                        <span className='opacity-50 text-white'>deadline</span>
                        <br />
                        <span className='text-white'>tue - augest 10, 12:00am</span>
                    </div>
                </div>

                {/*********/}
            </div>
            <div className='flex flex-col gap-11 items-end justify-between'>
                {/* dropdown */}
                <Selector
                    iconclassName='text-white'
                    options={[
                        {
                            value: "oprion 1",
                            onclick: () => { },
                        },
                        {
                            value: "oprion 2",
                            onclick: () => { },
                        },
                        {
                            value: "oprion 3",
                            onclick: () => { },
                        }
                    ]} className="relative border rounded-full border-[#FFFFFF40] flex justify-center items-center w-14 h-14 cursor-pointer" />
                {/*********/}
                {/* button */}
                <div className='flex flex-col gap-11 items-end'>
                    {(type === "submit-files" ?
                        <div className={`bg-white text-primary font-bold rounded-full flex justify-center items-center w-[345px] h-[65px] active capitalize cursor-pointer`}>
                            submit files
                        </div>
                        :
                        <div className={`bg-white text-primary font-bold rounded-full flex justify-center items-center w-[345px] h-[65px] active capitalize cursor-pointer`}>
                            scan QR
                        </div>
                    )}
                </div>
                {/*********/}
            </div>
        </div>

    );
};
const Ongoing2 = ({ type }) => {
    return (
        <div className='flex justify-between border rounded-[50px] bg-primary p-6'>
            <div className='flex flex-col gap-3 items-start justify-between'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full' src="/assets/imgs/profile/contact-2.png" alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold  text-white capitalize'>anna jonathan</h3>
                        <span className='opacity-50 text-white'>Yesterday</span>
                    </div>
                </div>
                {/*********/}

                {/* type */}
                <span className='flex flex-col h-full text-white border-2 border-white rounded-full px-3 py-[6px] capitalize mb-8 opacity-70'>
                    wedding
                </span>
                {/*********/}

                {/* deadline */}
                <div className='flex gap-3'>
                    <span className='text-[40px] flex items-center ml-3 gap-2'>  <span className='opacity-50 text-white'>$</span> <span className='text-white'>490</span> </span>
                    <div className='h-auto w-[1px] bg-white opacity-15' />
                    <div>
                        <span className='opacity-50 text-white'>deadline</span>
                        <br />
                        <span className='text-white'>tue - augest 10, 12:00am</span>
                    </div>
                </div>

                {/*********/}
            </div>
            <div className='flex flex-col gap-11 items-end justify-between'>
                {/* dropdown */}
                <Selector
                    iconclassName={'text-white'}
                    options={[
                        {
                            value: "oprion 1",
                            onclick: () => { },
                        },
                        {
                            value: "oprion 2",
                            onclick: () => { },
                        },
                        {
                            value: "oprion 3",
                            onclick: () => { },
                        }
                    ]} className="relative border rounded-full border-[#FFFFFF40] flex justify-center items-center w-14 h-14 cursor-pointer" />
                {/*********/}
            </div>
        </div>

    );
};

const EmptyComponent = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet'>
            <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
            <img src='/assets/imgs/theme/Empty.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
            <h3 className='text-2xl font-bold mt-8 mb-4'>No Projects Yet!</h3>
        </div>

    );
};

const Loadingcomponent = () => {

    const Type1 = () => <div className='w-40 h-4 bg-[#E6E6E6] rounded-full' />

    const Type2 = () => <div className='w-40 h-14 bg-[#F2F2F2] rounded-full' />

    const Type3 = () => <div className='w-14 h-14 bg-[#F2F2F2] rounded-full' />

    const Type4 = () => <div className='w-[388px] h-[241px] bg-[#F2F2F2] rounded-3xl' />

    return (
        <div className='h-body overflow-y-hidden'>
            <div className='flex flex-col gap-[15px] text-center w-full mt-11 '>
                <Type1 />
                <div className='flex gap-2 my-[10px]'>
                    <Type2 />
                    <Type2 />
                    <Type3 />
                </div>
                <Type1 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
            </div>
        </div>
    );
};


// *****************



const RightSide = () => {

    const Title = ({ title }) => <h2 className="font-bold text-start text-lg capitalize opacity-80 mt-3">{title}</h2>

    const Recents = ({ img, name, address }) =>
        <a href='/creative/youseff_abdulla'>
            <div className='w-40 h-14 gap-3 rounded-full border border-[#00000040] flex' >
                <img src={img} alt='user' className='rounded-full m-1' />
                <div className='flex flex-col items-start justify-center w-full'>
                    <span className='opacity-80 font-semibold'> {name} </span>
                    <span className='opacity-50'> {address} </span>
                </div>
            </div>
        </a>
    const MoreIcon = () => <Icon className='cursor-pointer' name={'more'} />

    const HisTory = ({ isCanceled }) =>
        <>
            <div className='w-[388px] p-6 rounded-[50px] border border-[#00000040] relative' >
                {/* dropdown */}
                <Selector options={[
                    {
                        value: "oprion 1",
                        onclick: () => { },
                    },
                    {
                        value: "oprion 2",
                        onclick: () => { },
                    },
                    {
                        value: "oprion 3",
                        onclick: () => { },
                    }
                ]} className="absolute right-6 border rounded-full border-[#00000033] flex justify-center items-center w-14 h-14 cursor-pointer" />
                {/*********/}
                {/* profile */}
                <a href='/creative/youseff_abdulla'>
                    <div className='flex gap-3 items-center'>
                        <img className='w-14 h-14 rounded-full' src="/assets/imgs/profile/contact-2.png" alt="profile picture" />
                        <div className='flex flex-col items-start justify-start'>
                            <h3 className='opacity-80 text-lg font-bold capitalize'>anna jonathan</h3>
                            <span className='opacity-50'>Sun - Aug 3</span>
                        </div>
                    </div>
                </a>
                {/*********/}

                {/* types */}
                <div className='flex flex-wrap mt-4 gap-3'>
                    {
                        ['wedding', 'party'].map((item, i) =>
                            <span key={i} className={`flex flex-col h-full border-[1.5px] ${isCanceled ? 'border-[#FF4646]' : 'border-[#000000D9]'} rounded-full px-3 py-[6px] mb-8 text-${isCanceled ? '[#FF4646]' : '[#000000D9]'} capitalize`}>
                                {item}
                            </span>
                        )
                    }
                </div>
                {/*********/}
                
                {/* deadline */}
                <div className='flex gap-3 mt-9'>
                    <span className='text-[40px] flex items-center ml-3 gap-2'>
                        <span className={`text-${isCanceled ? '[#FF4646]' : 'primary'}`}>
                            <span className={`text-${isCanceled ? '[#FF4646]' : 'primary'} opacity-50`}>$</span>
                            <span className={`text-${isCanceled ? '[#FF4646]' : 'primary'}`}> 490</span>
                        </span>
                    </span>
                    <div className='h-auto w-[1px] bg-black opacity-15' />
                    <div className='text-start'>
                        <span className={`opacity-50 capitalize ${isCanceled ? 'text-[#FF4646]' : ''}`}>deadline</span>
                        <br />
                        <span className={`capitalize line-through opacity-60 ${isCanceled ? 'text-[#FF4646]' : ''}`}>tue - augest 10, 12:00am</span>
                    </div>
                </div>
                {/*********/}
            </div>
        </>

    return (
        <>
            {/* <Clients /> */}
            <div className='h-body overflow-y-scroll'>
                <div className='flex flex-col gap-[15px] text-center w-full mt-9 '>
                    <Title title="recent clients" />
                    <div className='flex gap-2'>
                        <Recents img='/assets/imgs/profile/1.jpg' name='youseff ali' address='zayed city' />
                        <Recents img='/assets/imgs/profile/2.jpg' name='mohamed' address='new cairo' />
                        <div data-popup-toggle="popup" data-popup-target='clients'>
                            <MoreIcon />
                        </div>
                    </div>
                    <Title title='history' />
                    <HisTory />
                    <HisTory isCanceled={true}/>
                    <HisTory />
                    <HisTory isCanceled={true}/>
                    <HisTory />
                    <HisTory isCanceled={true}/>
                    
                </div>
            </div>
        </>
    );
};



export default Contracts;

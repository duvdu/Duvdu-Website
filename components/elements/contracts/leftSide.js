import Pending from "./Pending";
import Pending2 from "./pending2";
import Ongoing from "./ongoing";
import Ongoing2 from "./ongoing2";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllContracts } from "../../../redux/action/apis/contracts/getall";

const LeftSide = ({ getAllContracts, respond, categories }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        getAllContracts()
    }, [])
    const handleToggleClick = (index) => {
        setActiveIndex(index);
    };
    const Clients = () =>
        <section >
            <section className='mt-11 lg:mt-36 flex flex-col gap-4 mx-auto w-min sm:w-auto'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">pending</h2>
                <Pending />
                <Pending />
            </section>
            <section className='mt-11 flex flex-col gap-4 mx-auto w-min sm:w-auto'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">ongoing contracts</h2>
                <Ongoing />
                <Ongoing />
            </section>
        </section>

    const Creatives = () =>
        <section>
            <section className='mt-11 lg:mt-36 flex flex-col gap-4 mx-auto w-min sm:w-auto'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">pending</h2>
                {respond?.data?.filter(data => data.status === "pending").map((data, index) => (
                    <Pending2 key={index} data={data} />
                ))}
            </section>
            <section className='mt-11 flex flex-col gap-4 mx-auto w-min sm:w-auto'>
                <h2 className="font-bold text-lg capitalize opacity-80 ">ongoing contracts</h2>
                {respond?.data?.filter(data => data.status === "ongoing").map((data, index) => (
                    <Ongoing2 key={index} data={data} />
                ))}
                {/* <Ongoing2 /> */}
            </section>
        </section>
    return (
        <>
            <div className='h-auto lg:h-body overflow-y-scroll'>
                <div className='flex flex-col h-full mt-24 lg:mt-0'>
                    <section className='flex left-0 lg:hidden gap-3 mt-6 mb-2 fixed w-full py-4 top-16 p-0 z-[5] px-4'>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 0 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(0)}
                        >
                            my clients
                        </div>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 1 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(1)}
                        >
                            my creatives
                        </div>

                    </section>

                    <section className='hidden lg:flex gap-3 mt-6 mb-2 fixed w-full py-4 p-0 z-[5]'>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 0 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(0)}
                        >
                            my clients
                        </div>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 1 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(1)}
                        >
                            my creatives
                        </div>
                    </section>
                    {activeIndex === 0 ? <Clients /> : <Creatives />}
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    respond: state.api.getAllContracts,
    categories: state.categories
});

const mapDispatchToProps = {
    getAllContracts
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide);

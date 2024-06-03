import Selector from "../CustomSelector";

const Pending = () => {
    return (
        <div className='flex justify-between w-[370px] sm:w-full mx-auto border border-[#00000033] dark:border-[#FFFFFF33] rounded-[50px] p-6 relative'>
            <div className='flex flex-col gap-11 items-start justify-between w-full'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full' src="/assets/imgs/profile/defultUser.jpg" alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold capitalize'>anna jonathan</h3>
                        <span className='opacity-50'>Yesterday</span>
                    </div>
                </div>
                {/*********/}
                {/* time */}
                <div className='flex flex-col xl:flex-row justify-between items-center w-full'>
                    <span className='text-4xl'> 18:58
                        <span className='text-lg opacity-40 mx-2'>
                            left
                        </span>
                    </span>
                    <div className={`border-2 border-primary text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer`}>
                        respond
                    </div>

                </div>
                {/*********/}
            </div>
            <div className='absolute top-5 right-5'>
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
                ]} className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer" />
                {/*********/}
                {/* button */}

                {/*********/}
            </div>
        </div>

    );
};

export default Pending;

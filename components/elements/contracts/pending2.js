import Selector from "../CustomSelector";

const Pending2 = ({data}) => {
    return (
        <div className='flex justify-between w-[370px] sm:w-full mx-auto items-center border border-[#00000033] dark:border-[#FFFFFF33] rounded-[50px] p-6'>
            <div className='flex flex-col gap-2 sm:gap-0 sm:flex-row justify-center items-center sm:w-full'>
                {/* profile */}
                <div className='flex gap-3 items-center'>
                    <img className='w-14 h-14 rounded-full' src="/assets/imgs/profile/defultUser.jpg" alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold capitalize'>
                            {/* {data.name} */}
                            anna jonathan</h3>
                        <span className='opacity-50'>
                            {/* {data.whenreq} */}
                            Yesterday</span>
                    </div>
                </div>
                {/*********/}
                {/* deadline */}
                <div className='text-lg ml-auto mr-auto'>
                    <span className='opacity-50 mx-1' >
                        will respond in
                    </span>
                    <span className='text-primary'>
                    {/* {data.remaintime} */}
                        18:58
                    </span>
                </div>
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
            ]} className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer" />
            {/*********/}
        </div>

    );
};
export default Pending2;
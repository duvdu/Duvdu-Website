import Icon from "../../Icons";
import Selector from "../../elements/CustomSelector";

const Ongoing = ({ data }) => {
    return (
        <div className='flex justify-between rounded-[50px] bg-primary p-6 relative w-[370px] sm:w-full mx-auto'>
            <div className='flex flex-col gap-3 items-start justify-between w-full'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.targetUser.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold  text-white capitalize'>{data.targetUser.name}</h3>
                        <span className='opacity-50 text-white'>{new Date(data.createdAt).toDateString()}</span>
                    </div>
                </div>
                {/*********/}

                {/* type */}
                <span className='flex flex-col h-full text-white border-2 border-white rounded-full px-3 py-[6px] capitalize mb-8 opacity-70'>
                    {data.ref}
                </span>
                {/*********/}

                {/* deadline */}
                <div className='flex flex-col xl:flex-row justify-between items-center w-full gap-3'>
                    <div className='flex gap-3'>
                        <span className='text-[40px] flex items-center ml-3 gap-2'>  <span className='opacity-50 text-white'>$</span> <span className='text-white'>490</span> </span>
                        <div className='h-auto w-[1px] bg-white opacity-15' />
                        <div>
                            <span className='opacity-50 text-white'>deadline</span>
                            <br />
                            <span className='text-white'>{new Date(data.deadline).toDateString()}</span>
                        </div>
                    </div>
                    {/* button */}
                    {(data.status === "submit-files" ?
                        <div className={`bg-white text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer`}>
                            submit files
                        </div>
                        :
                        <div className={`bg-white text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer`}>
                            scan QR
                        </div>
                    )}

                    {/*********/}
                </div>

                {/*********/}
            </div>
            <Selector
                iconclassName={'text-white'}
                options={[
                    {
                        value: "option 1",
                        onclick: () => { },
                    },
                    {
                        value: "option 2",
                        onclick: () => { },
                    },
                    {
                        value: "option 3",
                        onclick: () => { },
                    }
                ]} className="h-min">
                <div className="border rounded-full size-9 flex justify-center items-center">
                    <Icon className="size-6 text-white" name="ellipsis-vertical" />
                </div>
            </Selector>
        </div>
    );
};

export default Ongoing;

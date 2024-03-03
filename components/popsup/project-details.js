

import Popup from '../elements/popup';
import Button from '../elements/submitButton';
import Icon from '../Icons'


function Receive_project_files() {
    return (
        <>
            <Popup id="project-details" header={"project details"}>
                <div className='flex flex-col justify-center items-center px-40 gap-6'>
                    <section>
                        <span className='text-4xl my-5'> 18:58
                            <span className='text-lg opacity-40 mx-2'>
                                left
                            </span>
                        </span>
                    </section>
                    <section className='w-full flex-col'>
                        <h2 className='opacity-60 capitalize mb-3'> original gig </h2>
                        <div className='w-full'>
                            <div className="h-20 w-full sm:w-[543px] rounded-full relative overflow-hidden">
                                <img className="absolute -translate-y-1/2 blur-sm" src='/assets/imgs/projects/2.jpeg' />
                                <div className="absolute z-20 flex items-center w-full h-full p-7">
                                    <div className="w-full text-center p-20">
                                        <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">college short film project</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <section className='w-full'>
                        <h2 className='opacity-60 capitalize mb-3'> project type </h2>
                        <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min'>
                            category
                        </span>
                    </section>
                    <section className='w-full'>
                        <h2 className='opacity-60 capitalize mb-3'> project details </h2>
                        <p className='font-semibold capitalize max-w-[543px]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        </p>
                    </section>
                    <section className='w-full'>
                        <h2 className='opacity-60 capitalize'> alike media </h2>
                        {
                            [
                                {
                                    'name': 'Details.pdf',
                                    'size': '200 KB',
                                },
                                {
                                    'name': 'Image.png',
                                    'size': '200 KB',

                                }
                            ].map((item, index) =>
                                <div key={index} className='flex gap-3 items-start p-4 bg-DS_white rounded-md border border-[#CACACA] mt-3'>
                                    <Icon key={index} name={'file'} className='w-5 h-5' />
                                    <div className='flex flex-col'>
                                        <span className='text-[#353535] text-[14px] font-medium'> {item.name} </span>
                                        <span className='text-[#989692] text-[12px]'> {item.size} </span>
                                        <span className='text-primary font-semibold text-[14px]'> Click to view </span>
                                    </div>
                                </div>
                            )
                        }
                    </section>

                    <section className='w-full flex justify-between'>
                        <div className='w-full'>
                            <h2 className='opacity-60 capitalize mb-3'> custom requirements </h2>
                            <span className='font-semibold capitalize mt-3'> 12 minutes </span>
                        </div>
                        <div className='w-full'>
                            <h2 className='opacity-60 capitalize mb-3'> shooting days </h2>
                            <span className='font-semibold capitalize mt-3'> 5 days </span>
                        </div>
                    </section>
                    <section className='w-full flex justify-between'>
                        <div className='w-full'>
                            <h2 className='opacity-60 capitalize mb-3'> shooting days </h2>
                            <div className='flex gap-4'>
                                <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                                <Icon className='text-primary text-2xl w-8' name={"location-dot"} />
                                </div>
                                <div>
                                    <div>
                                        <span className='opacity-85 text-base'>
                                            Gala Convention Center
                                        </span>
                                    </div>
                                    <div>
                                        <span className='text-xs text-[#747688]'>
                                            36 Guild Street London, UK
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <h2 className='opacity-60 capitalize mb-3'> start date </h2>
                            
                            <div className='flex gap-4'>
                                <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                                    <Icon name={"bag"} />
                                </div>
                                <div>
                                    <div>
                                        <span className='opacity-85 text-base'>
                                            14 December, 2021
                                        </span>
                                    </div>
                                    <div>
                                        <span className='text-xs text-[#747688]'>
                                            Tuesday
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='flex mx-20 gap-7 mb-10 mt-16'>
                    <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"}>
                        <span className='text-white font-bold capitalize text-lg'>
                            submit
                        </span>
                    </Button>
                    <button data-popup-dismiss="popup" className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold">
                        refuse
                    </button>
                </div>
            </Popup>
        </>
    );
}

export default Receive_project_files;

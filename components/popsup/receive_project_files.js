

import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'


function Receive_project_files() {
    return (
        <>
            <Popup id="receive_project_files" header={"project files"}>
                <div className='flex flex-col justify-center items-center px-52 '>
                    <div className='max-w-[400px] mb-32'>
                        <section>
                            <a href='https://google.drive.com/aislfahe438alljjaislfahe438alljjaislfahe438alljjaislfahe438alljj' target="_blank">

                            <div className="border border-primary bg-[#1a73eb33] rounded-3xl border-black border-opacity-10 mt-4 p-4 text-primary font-bold text-base overflow-hidden overflow-ellipsis" >
                                https://google.drive.com/aislfahe438alljjaislfahe438alljjaislfahe438alljjaislfahe438alljj
                            </div>
                            </a>
                            <p className="opacity-50 mt-3">Click on the link to view the final files before confirming</p>
                        </section>
                        <section>
                            <p className="capitalize opacity-60 mt-11">Notes </p>
                            <div className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 p-5" >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            </div>
                        </section>
                    </div>
                </div>
                    <div className='flex mx-20 gap-7 mb-10'>
                        <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"}>
                            <span className='text-white font-bold capitalize text-lg'>
                                submit
                            </span>
                        </Button>
                        <button data-popup-dismiss="popup" className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold">
                        reject
                        </button>
                    </div>
            </Popup>

        </>
    );
}

export default Receive_project_files;

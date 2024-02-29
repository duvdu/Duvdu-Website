
import Popup from '../elements/popup';
import Icon from '../Icons';
import React, { useState } from "react";
import ArrowBtn from '../elements/arrowBtn';
import { handleFileUpload } from '../../util/util';
import Switch from '../elements/switcher'

function UploadFile() {
    const [file, setfile] = useState(null);

    const FileUpload = (e) => {
        const data = handleFileUpload(e);
        setfile(data)
    };
    return (
        <>
            <Popup id='team_uploading_files' className='w-full lg:w-[942px] flex flex-col gap-9' header={'upload files'}>
                <div className='lg:w-[942px]'>
                    <section>
                        <div className='border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5'>
                            <label htmlFor="file-upload" className='rounded-full p-4 bg-[#F5F5F5]'>
                                <Icon name={"add-file"} className='w-6 h-6'/>
                            </label>
                            <span className="text-primary text-sm">Upload cover photo</span>
                            
                        </div>
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">project name</p>
                        <input placeholder="enter platform..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-full mt-4 p-4" />
                    </section>
                    <section className='flex gap-3 justify-between'>
                        <div className='w-full'>
                            <p className="capitalize opacity-60 mt-11">project name</p>
                            <input placeholder="enter platform..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-full mt-4 p-4" />
                        </div>
                        <div className='w-full'>
                            <p className="capitalize opacity-60 mt-11">project name</p>
                            <input placeholder="enter platform..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-full mt-4 p-4" />
                        </div>
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">project details</p>
                        <textarea placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">shooting days</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                            <span>
                                Days
                            </span>
                        </div>
                    </section>
                    <section className="my-11 flex justify-between gap-7">
                        <div className="w-full">
                            <p className="capitalize opacity-60 mb-4">location</p>
                            <div className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 p-2">
                                <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                                    <Icon name={"blue-location"} />
                                </div>
                                <span className="pl-5 w-full">New Yourk, USA</span>
                                <Icon name={"left-arrow-blue"} className={"mr-4"} />
                            </div>
                        </div>

                        <div className="w-full">
                            <p className="capitalize opacity-60 mb-4">upload alike project</p>
                            <div className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 p-2">
                                <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                                    <Icon name={"gallery"} />
                                </div>
                                <span className="pl-5 w-full text-blue-600">Open gallery</span>
                                <Icon name={"left-arrow-blue"} className={"mr-4"} />
                            </div>
                        </div>
                    </section>

                    <section className="sticky bottom-0">
                        <div className="flex justify-center mt-11">
                            <a>
                                <ArrowBtn className="cursor-pointer w-96" text='continue' />
                            </a>
                        </div>
                    </section>
                </div>

            </Popup>
        </>
    );
}

export default UploadFile;

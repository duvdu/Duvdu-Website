

import Popup from '../elements/popup';
import Icon from '../Icons';
import React, { useState } from "react";
import { handleFileUpload } from '../../util/util';
import Switch from '../elements/switcher'
import Button from '../elements/button';


function AddPost() {
    const [file, setfile] = useState(null);

    const FileUpload = (e) => {
        const data = handleFileUpload(e);
        setfile(data)
    };
    const inputstyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50"
    return (
        <>
            <Popup id='add-post' className='w-full lg:w-[942px] flex flex-col gap-9' header={'Add Post'}>
                <div className='lg:w-[600px] flex flex-col gap-7 sm:mx-12'>
                    <section>
                        <div className='border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 bg-DS_white'>
                            <label htmlFor="file-upload" className='rounded-full p-4 bg-[#F5F5F5]'>
                                <Icon name={"add-file"} className='w-6 h-6' />
                            </label>
                            <span className="text-primary text-sm">Click to Upload</span>
                        </div>
                    </section>
                    <section>
                        <input placeholder='name your project' className={inputstyle} />
                    </section>
                    <section>
                        <input placeholder='project description' className={inputstyle} />
                    </section>
                    <section>
                        <input placeholder='tools used' className={inputstyle} />
                    </section>
                    <section>
                        <input placeholder='tag other creatives' className={inputstyle} />
                    </section>
                    <section>
                        <input placeholder='add creative’s functions' className={inputstyle} />
                    </section>
                    <section>
                        <input placeholder='location' className={inputstyle} />
                    </section>
                    <section>
                        <input placeholder='search keywords' className={inputstyle} />
                    </section>
                    <section>
                        <input placeholder='project budget' className={inputstyle} />
                    </section>
                    <section>
                        <div className='flex justify-center items-center gap-9'>
                            <input placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                            <select
                                className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalize"
                                required
                            >
                                {[

                                    'second',
                                    'minutes',
                                    'Hours',
                                ].map((value, index) => <option key={index} value={value}>{value}</option>)}
                            </select>
                        </div>
                    </section>
                    <div className='flex justify-center gap-3 mt-1'>
                        <Switch onSwitchChange={() => { }} />
                        <p className='opacity-70'> Show on home feed & profile </p>
                    </div>

                    <Button className="w-auto mb-7 mt-4 mx-20" shadow={true} shadowHeight={"14"}>
                        <span className='text-white font-bold capitalize text-lg'>
                            publish
                        </span>
                    </Button>
                </div>
            </Popup>
        </>
    );
}

export default AddPost;

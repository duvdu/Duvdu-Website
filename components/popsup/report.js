
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import Icon from '../Icons';
import { handleFileUpload } from '../../util/util';
import React, { useState } from "react";

function Report() {

    const [file, setfile] = useState(null);

    const FileUpload = (e) => {
        const data = handleFileUpload(e);
        setfile(data)
    };

    return (
        <>
            <Popup id='report-project' className={'w-full lg:w-[942px]'} header={'Report Project'}>
                <section className='mt-6'>
                    <span className='font-semibold text-2xl capitalize'>what happened?</span>
                    <br />
                    <span className='font-medium text-lg'>Tell us about the copyright violation happened</span>
                    <textarea placeholder="Start typing..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-5 h-20" />
                </section>
                <section className='mt-9'>
                    <span className='font-semibold text-2xl capitalize'>send evidence</span>
                    <br />
                    <span className='font-medium text-lg'>Behind the scenes shots, raw files, ...etc.</span>
                    {
                        !file &&
                        <div className='bg-DS_white border-dashed border-4 border-[#CBD0DC] flex flex-col items-center justify-center rounded-3xl py-6 mt-5'>
                            <div className='rounded-full p-4 bg-[#F5F5F5]'>
                                <Icon name={"add-file"} />
                            </div>
                            <span className="text-black text-3xl">
                                Choose a file or drag & drop it here
                            </span>
                            <span className="text-[#A9ACB4] text-xl">
                                JPEG, PNG, PDG, and MP4 formats, up to 50MB
                            </span>
                            <label htmlFor="file-upload" className='text-[#54575C] rounded-2xl border-2 border-[#CBD0DC] text-3xl px-8 py-4 my-4'>
                                Browse File
                            </label>
                            <input onChange={FileUpload} className='hidden' id="file-upload" type="file" />
                        </div>
                    }
                    {
                        file &&
                        <div className='flex bg-[#EEF1F7] rounded-3xl items-center gap-4 p-9 mt-5'>
                            <Icon name={'file'} className="w-20 h-20" />
                            <div>
                                <span className='text-3xl'> {file.fileName} </span>
                                <br />
                                <span className='text-2xl text-[#A9ACB4]'> {file.formattedFileSize} </span>
                            </div>
                        </div>
                    }
                </section>
                <div className='flex justify-center w-full '>
                    <AppButton text={'Done'} className={'mt-9 w-full'} color={"#D30000"} />
                </div>
            </Popup>
        </>
    );
}

export default Report;

import React, { useState } from 'react';
import { handleFileUpload } from '../../util/util';
import Icon from '../Icons';

function AddCoverPhoto({ UpdateFormData, header }) {
    const [cover, setCover] = useState(null);

    const coverUpload = (e) => {
        const uploadedFile = handleFileUpload(e);
        UpdateFormData('cover', uploadedFile.file);
        setCover(URL.createObjectURL(uploadedFile.file));
    };

    return (
        <>
            <input
                id="file-upload"
                type="file"
                onChange={coverUpload}
                className="hidden"
            />
            <label htmlFor="file-upload" className='rounded-full p-4 bg-[#F5F5F5] cursor-pointer'>
                <div className='border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5'>
                    {cover ? (
                        <img src={cover} alt="Uploaded Cover" className="mt-3 max-h-56 rounded-lg" style={{ maxWidth: '100%' }} />
                    ) : (
                        <>
                            <div className='rounded-full p-4 bg-[#F5F5F5] cursor-pointer'>
                                <Icon name={"add-file"} className='w-6 h-6' />
                            </div>
                            <span className="text-primary text-sm">{header || "Upload cover photo"}</span>
                        </>
                    )}
                </div>
            </label>
        </>

    );
}

export default AddCoverPhoto;

import React, { useEffect, useState } from 'react';
import { handleMultipleFileUpload, handleMultipleFileUploadUpdated } from '../../util/util';
import Icon from '../Icons';

function AddAttachment({ UpdateFormData, formData, header }) {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const attachmentsUpload = (e) => {
        const files = handleMultipleFileUploadUpdated(e);
        const newFiles = files.data.map(file => ({ ...file, id: Date.now() + file.fileName }));
        // setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
        UpdateFormData?.('_attachments', [...formData?._attachments || [], ...newFiles]);
        UpdateFormData?.('__attachments', files.files);
    };

    const removeAttachment = (id) => {
        const filteredFiles = uploadedFiles?.filter(file => file.id !== id);
        // setUploadedFiles(filteredFiles);
        UpdateFormData?.('_attachments', formData?._attachments?.filter(file => file.id !== id));
    };

    return (
        <>
            <h3 className="capitalize opacity-60">{header || "upload alike project"}</h3>
            <label htmlFor="attachment-upload" className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 sm:w-96 p-2 mt-4 cursor-pointer">
                <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                    <Icon className="text-primary w-4" name={"image"} />
                </div>
                <span className="pl-5 w-full text-blue-600">Open gallery</span>
                <Icon name={"angle-right"} className={"mr-2 w-2 text-primary"} />
            </label>
            <input onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
            {
                formData?._attachments?.map((file, key) => (
                    <div key={key} className='flex bg-[#EEF1F7] dark:bg-[#18140c] rounded-3xl items-center gap-4 p-2 mt-5'>
                        <Icon name={'file'} className="size-10" />
                        <div>
                            <span className=''>{file.fileName}</span>
                            <br />
                            <span className='text-[#A9ACB4]'>{file.formattedFileSize}</span>
                        </div>
                        <button className='ml-auto' onClick={() => removeAttachment(file.id)}>Remove</button>
                    </div>
                ))
            }
        </>
    );
}

export default AddAttachment;

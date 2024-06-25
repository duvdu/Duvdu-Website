import React, { useEffect, useState } from 'react';
import { handleMultipleFileUpload, handleRemoveEvent, parseFileSize } from '../../util/util';
import Icon from '../Icons';

function AddAttachment({ value, onChange, name, isValidCallback }) {
    const [uploadedFiles, setUploadedFiles] = useState(value || []);
    const maxFileSize = '3 MB';

    useEffect(() => {
        setUploadedFiles(value || []);
    }, [value]);

    useEffect(() => {
        validateFiles(uploadedFiles);
    }, [uploadedFiles]);

    const validateFiles = (files) => {
        const allFilesValid = files.every(file => parseFileSize(file.formattedFileSize) <= parseFileSize(maxFileSize));
        isValidCallback && isValidCallback(allFilesValid);
    };

    const attachmentsUpload = (e) => {
        const files = handleMultipleFileUpload(e);
        const newFiles = files.map(file => ({
            ...file,
            id: Date.now() + file.fileName
        }));
        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);
        onChange && onChange({ target: { name, value: updatedFiles } });
        validateFiles(updatedFiles);
    };

    const removeAttachment = (id) => {
        const filteredFiles = uploadedFiles.filter(file => file.id !== id);
        setUploadedFiles(filteredFiles);
        onChange && onChange({ target: { name, value: filteredFiles } });
        validateFiles(filteredFiles);
    };

    return (
        <>
            <label htmlFor="attachment-upload" className="flex items-center rounded-2xl border border-gray-300 bg-DS_white h-16 p-2 mt-4 cursor-pointer">
                <div className="flex items-center justify-center h-full rounded-xl border-[#1A73EB26] border-8 aspect-square">
                    <Icon className="text-primary w-4" name={"image"} />
                </div>
                <span className="pl-5 w-full text-blue-600">Open gallery</span>
                <Icon name={"angle-right"} className={"mr-2 w-2 text-primary"} />
            </label>
            <input onClick={handleRemoveEvent} onChange={attachmentsUpload} className='hidden' id="attachment-upload"  accept="image/*"  type="file" multiple />
            {
                uploadedFiles.map((file, key) => (
                    parseFileSize(file.formattedFileSize) <= parseFileSize(maxFileSize) ?
                        <div key={key} className='flex bg-[#EEF1F7] dark:bg-[#18140c] rounded-3xl items-center gap-4 p-2 mt-5'>
                            <Icon name={'file'} className="size-10" />
                            <div>
                                <span className=''>{file.fileName}</span>
                                <br />
                                <span className='text-[#A9ACB4]'>{file.formattedFileSize}</span>
                            </div>
                            <button className='ml-auto' onClick={() => removeAttachment(file.id)}>
                                <Icon name={"delete"} className="size-6" />
                            </button>
                        </div>
                        :
                        <div key={key} className='flex bg-[#EEF1F7] dark:bg-[#18140c] rounded-3xl items-center gap-4 p-2 mt-5'>
                            <Icon name={'file-error'} className="size-10" />
                            <div>
                                <span className='text-[#C92519]'>{file.fileName}</span>
                                <br />
                                <span className='text-[#C92519]'>{file.formattedFileSize}</span>
                            </div>
                            <div className='text-[#C92519] mx-auto'>
                                Exceeds maximum size (3 MB).
                            </div>
                            <button className='ml-auto' onClick={() => removeAttachment(file.id)}>
                                <Icon name={"delete"} className="size-6 text-[#C92519]" />
                            </button>
                        </div>
                ))
            }
        </>
    );
}

export default AddAttachment;

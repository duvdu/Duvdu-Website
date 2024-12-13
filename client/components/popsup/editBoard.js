import React, { useEffect, useState } from 'react';
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';
import Icon from '../Icons';
import { gettFileUploaded, handleFileUpload, handleRemoveEvent } from '../../util/util';

function EditBoard({onSbmit ,id , defultValue}) {
    
    const { t } = useTranslation();
    const [board, setBoardName] = useState('');
    const [file, setFile] = useState(null);
    const [prev, setPrev] = useState(null);
    const [boardError, setBoardError] = useState({ isError: false, message: '' });
    useEffect(()=>{
        setBoardName(defultValue.title)
        setPrev(defultValue.image)
    },[defultValue])
    const handleSubmit = (e) => {
        if (board.length < 8) {
            setBoardError({ isError: true, message: 'some error' });
        } else {
            setBoardError({ isError: false, message: '' });
        }
    };
    const toggleDirectorConfirmed = () => {
        setBoardName('')
        setPrev(null)
        const formData = new FormData();
        formData.append('title' , board)
        if(file)
            formData.append('image' , file)
        onSbmit?.(formData);
    }
    const EditImageUpload = (e) => {
        const file = handleFileUpload(e)?.file;
        const fileUrl = gettFileUploaded(e);
        setFile(file);
        setPrev(fileUrl);
    };

    const renderMediaPreview = () => {
        if (!prev) return null;
        return <div className='card w-full h-52 mt-5 object-cover bg-bottom' style={{
            backgroundImage: `url(${prev})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }} />;
    };

    return (
        <>
            <Popup id={"edit-board-"+id} header={"Edit Bookmark Title"} >
                <form method="patch" onSubmit={handleSubmit} className='mt-12 w-full md:w-96'>
                    <div className={`mb-12 ${boardError.isError && 'error'}`}>
                    <section className='relative'>
                            <label htmlFor="edit-file-upload" >
                                <div className={`border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 bg-white dark:bg-[#1A2024] ${prev ? "" : "aspect-square"}`}>
                                    <div className='rounded-full size-14 flex justify-center items-center bg-[#F5F5F5]'>
                                        <Icon name={"add-file"} className='size-7' />
                                    </div>
                                    <span className="text-primary text-sm font-bold mt-3">Click to {prev ? 'Change' : 'Upload'}</span>
                                </div>
                                {renderMediaPreview()}
                            </label>
                            <input onClick={handleRemoveEvent} id="edit-file-upload" type="file" className='opacity-0 absolute inset-0' onChange={EditImageUpload} accept={'image/*'} />
                        </section>
                        <input
                            type="text"
                            value={board|| ""}
                            onChange={(e) => setBoardName(e.target.value)}
                            placeholder={t("Bookmark name")}
                            className={boardError.isError ? "app-field error mt-6" : "app-field mt-6"}
                        />
                        {boardError.isError && <p className="error-msg">{boardError.message}</p>}
                    </div>
                    <AppButton onClick={toggleDirectorConfirmed} className={'w-full'}>{t("Edit")}</AppButton>
                    <div className='mb-4'/>
                </form>
            </Popup>
        </>
    );
}


export default EditBoard;

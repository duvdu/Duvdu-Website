import React, { useState } from 'react';
import AppButton from '../../../elements/button';
import Icon from '../../../Icons';
import { gettFileUploaded, handleFileUpload, handleRemoveEvent } from '../../../../util/util';
import { connect } from "react-redux";
import { UpdateFormData } from '../../../../redux/action/logic/forms/Addproject';
import { useTranslation } from 'react-i18next';
import AddAttachment from "../../../elements/attachment";
import ErrorMessage from '../../../elements/ErrorMessage';
import Loading from '../../../elements/loading';


function SetCover({ Publish, oncancel, addprojectState, UpdateFormData, respond,coverType = "image" }) {
    const { t } = useTranslation();
    const formData = addprojectState.formData;
    const media = formData.coverShow;

    const profileUpload = (e) => {
        const file = handleFileUpload(e)?.file;
        const fileUrl = gettFileUploaded(e);
        if(coverType === 'video'){
            if(file.type.startsWith('video/')){
                UpdateFormData('cover', file);
                UpdateFormData('coverShow', fileUrl);
            }
        }else{
            if(file.type.startsWith('image/')){
                UpdateFormData('cover', file);
                UpdateFormData('coverShow', fileUrl);
            }
        }
    };
    const [attachmentValidation, setAttachmentValidation] = useState(false);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value);
    };

    const handleSubmit = (e) => {
        if (typeof Publish === 'function') {
            Publish();
        }
    };

    const isEnable = !!formData.coverShow;

    const renderMediaPreview = () => {
        if (!media) return null;

        switch (coverType) {
            case 'image':
                return <div className='card w-full h-52 mt-5 object-cover bg-bottom' style={{
                    backgroundImage: `url(${media})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} />;
            case 'video':
                return <video autoPlay muted playInline controls className='w-full h-52 mt-5' src={media} />;
            case 'audio':
                return <><div className='card w-full h-52 mt-5 object-cover bg-bottom' style={{
                    backgroundImage: `url(${media})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} /><audio controls className='w-full mt-5' src={formData.audioCover} />
                </>;
            default:
                return null;
        }
    };
    var convertError = JSON.parse(respond?.error ?? null)

    return (
        <>
            <section className='mt-10'>
                <h3 className='opacity-60 my-2 text-lg font-bold capitalize'>{t("media Type")}</h3>
                <div className='flex'>
                    <span className='flex flex-col h-full border-[1.5px] border-[#000000D9] dark:border-[#FFFFFFD9] rounded-full px-3 py-[6px] text-[#000000D9] dark:text-[#FFFFFFD9] capitalize'>
                        {coverType}
                    </span>
                </div>
            </section>
            {coverType==='audio' && 
                <AddAttachment name={'audioCover'} value={formData.audioCover} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} media={coverType} />
            }
            <div className='flex flex-col gap-5 mx-5 max-w-96 sm:mx-auto' >
                <div className='w-full '>
                    <div className='flex flex-col justify-between h-full'>
                        <section>
                            <label htmlFor="my-file-upload" >
                                <div className={`border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 bg-white dark:bg-[#1A2024] ${media ? "" : "aspect-square"}`}>
                                    <div className='rounded-full size-14 flex justify-center items-center bg-[#F5F5F5]'>
                                        <Icon name={"add-file"} className='size-7' />
                                    </div>
                                    <span className="text-primary text-sm font-bold mt-3">Click to {media ? 'Change' : 'Upload'}</span>
                                </div>
                                {renderMediaPreview()}
                            </label>
                            <input onClick={handleRemoveEvent} id="my-file-upload" type="file" className="hidden" onChange={profileUpload} accept={coverType === 'video' ? 'video/*' : 'image/*'} />
                        </section>
                        <section className='mt-5'>
                            <span className='opacity-40 text-base capitalize'>{t("preview")}</span>
                            <div className='flex gap-3 mb-14'>
                                <div className='w-1/3'>
                                {renderMediaPreview()}
                                    {/* <Preview title={"test title"} price={"500"} media={coverType==='audio'?formData.audioCover:media} coverType={coverType} /> */}
                                </div>
                                <div className='w-2/3'>
                                {renderMediaPreview()}
                                    {/* <Preview title={"test title"} price={"500"} media={coverType==='audio'?formData.audioCover:media} coverType={coverType} /> */}
                                </div>
                            </div>
                        </section>
                        {convertError && 
                        <div>
                        <ErrorMessage ErrorMsg={convertError?.data.errors[0].message} />{" "}
                        <ErrorMessage ErrorMsg={convertError?.data.errors[0].value} />{" "}
                        <ErrorMessage ErrorMsg={convertError?.data.errors[0].field} />
                        </div>
                        }
                        <AppButton isEnabled={!respond?.loading} onClick={handleSubmit} className={'w-full'}>{respond?.loading?<Loading/>:t("Publish")}</AppButton>
                    </div>
                </div>
            </div>
        </>
    );
}

const Preview = ({ title, price, media, coverType }) => {
    const renderMedia = () => {
        switch (coverType) {
            case 'image':
                return media ? <div className='bg-[#505050] rounded-[30px] h-40 w-full absolute' style={{
                    backgroundImage: `url(${media})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} /> : null;
            case 'video':
                return media ? <video controls className='w-full h-40 rounded-[30px] absolute' src={media} /> : null;
            case 'audio':
                return media ? <audio controls className='w-full h-40 rounded-[30px]' src={media} /> : null;
            default:
                return null;
        }
    };

    return (
        <div className='bg-[#505050] rounded-[30px] h-40 relative'>
            {renderMedia()}
            <div className='flex flex-col justify-between p-3 h-full w-full absolute'>
                <div className='flex justify-between'>
                    <div />
                    {/* <span className='text-white bg-black px-3 py-1 bg-opacity-20 rounded-full'>
                        {price} $
                    </span> */}
                </div>
                {coverType == "image" &&
                <span className='text-white font-bold text-xl text-center capitalize'>
                    {title}
                </span>}
            </div>
            
        </div>
    );
};

const mapStateToProps = (state) => ({
    addprojectState: state.addproject,
    categories: state.categories
});

const mapDispatchToProps = {
    UpdateFormData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetCover);

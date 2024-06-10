
import React, { useState } from 'react';
import AppButton from '../../../elements/button';
import Icon from '../../../Icons';
import { gettFileUploaded, handleFileUpload, handleRemoveEvent } from '../../../../util/util';
import { connect } from "react-redux";
import { UpdateFormData } from '../../../../redux/action/logic/forms/Addproject';
import AddAttachment from '../../../elements/attachment';

function SetCover({ Publish, oncancel, addprojectState, UpdateFormData }) {
    const formData = addprojectState.formData;
    const img = formData.coverShow;
    const [attachmentValidation, setAttachmentValidation] = useState(true);

    const profileUpload = (e) => {
        UpdateFormData('cover', handleFileUpload(e)?.file)
        UpdateFormData('coverShow', gettFileUploaded(e))
    };

    const handleSubmit = (e) => {
        if (typeof Publish === 'function') {
            Publish();
        }
    };
    return (
        <>
            <div className='flex flex-col gap-5 mx-5 max-w-96 sm:mx-auto' >
                <div className='p-5 pl-[31px] w-[430px] '>
                    <div className='flex flex-col justify-between h-full'>
                        <section>
                            <h3 className="capitalize opacity-60 mt-11">attachments</h3>
                            <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                        </section>
                        <section className='mt-5'>
                            <span className='opacity-40 text-base capitalize'>
                                preview
                            </span>
                            <div className='flex gap-3 mb-14'>
                                <div className='w-1/3'>
                                    <Preview title={formData.projectName} price={formData.price} img={img} />
                                </div>
                                <div className='w-2/3'>
                                    <Preview title={formData.projectName} price={formData.price} img={img} />
                                </div>
                            </div>
                        </section>
                        <AppButton onClick={handleSubmit} className={'w-full'}>
                            Publish
                        </AppButton>
                    </div>

                </div>
            </div>
        </>
    );
}

const Preview = ({ title, price, img }) =>
    <div className='bg-[#505050] rounded-[30px] h-40' style={img ? {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    } : {}}>
        <div className='flex flex-col justify-between p-3 h-full'>
            <div className='flex justify-between'>
                <div />
                <span className='text-white bg-black px-3 py-1 bg-opacity-20 rounded-full'>
                    {price} $
                </span>
            </div>
            <span className='text-sm text-white text-center'>
                {title}
            </span>
        </div>
    </div>


const mapStateToProps = (state) => ({
    addprojectState: state.addproject,
    categories: state.categories
});

const mapDispatchToProps = {
    UpdateFormData,
};


export default connect(mapStateToProps, mapDispatchToProps)(SetCover);


import React, { useState } from 'react';
import AppButton from '../../../elements/button';
import Icon from '../../../Icons';
import { gettFileUploaded, handleFileUpload } from '../../../../util/util';
import { connect } from "react-redux";
import { UpdateFormData } from '../../../../redux/action/logic/forms/Addproject';

function SetCover({ Publish, oncancel, addprojectState, UpdateFormData }) {
    const formData = addprojectState.formData;
    const img = formData.coverShow;
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
                            <label htmlFor="file-upload" >
                                <div className={`border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 bg-DS_white  ${img ? "" : "aspect-square"}`}>
                                    <div className='rounded-full size-14 flex justify-center items-center bg-[#F5F5F5]'>
                                        <Icon name={"add-file"} className='size-7' />
                                    </div>
                                    <span className="text-primary text-sm font-bold mt-3">Click to {img ? 'Change' : 'Upload'}</span>
                                </div>
                                {img &&
                                    <div className='card w-full h-52 mt-5 object-cover bg-bottom' style={img ? {
                                        backgroundImage: `url(${img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    } : {}} />}

                            </label>
                            <input id="file-upload" type="file" multiple className="hidden" onChange={profileUpload} />
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

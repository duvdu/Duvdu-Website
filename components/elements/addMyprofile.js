import Icon from '../Icons';
import React, { useEffect, useState, useRef } from 'react';

const PopUp = ({ setShowAddPanal }) => {

    const handleShowPopUp = () => setShowAddPanal(false);

    return (

        <>
            <div onClick={handleShowPopUp} className={`addpost-shadow z-30 `}>
                <div className="overlay" ></div>
            </div>
            
                <div className='fixed bottom-0 z-40 container p-0 max-w-[460px]'>
                    <div className='addpost'>
                        <div
                            onClick={handleShowPopUp}
                            className='bg-white px-16 py-7 mb-3 text-center rounded-3xl sticky bottom-0 cursor-pointer'
                            data-popup-toggle="popup" data-popup-target="add-post"
                        >
                            <h3 className='text-primary text-2xl font-semibold'> portfolio post </h3>
                            <p className='opacity-70'>
                                Upload videos & photos to showcase your creative work
                            </p>
                        </div>
                        <div onClick={handleShowPopUp} className='bg-white px-16 py-7 mb-7 text-center rounded-3xl cursor-pointer'>
                            <h3 className='text-primary text-2xl font-semibold'> portfolio post </h3>
                            <p className='opacity-70'>
                                Upload videos & photos to showcase your creative work
                            </p>
                        </div>
                    </div>
                </div>
            
        </>
    );
};

export default PopUp;

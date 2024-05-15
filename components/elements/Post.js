import React, { useEffect, useState, useRef } from 'react';

const PostSheet = ({ setShowAddPanal, username }) => {

    const hidePopUp = () => setShowAddPanal(false);

    return (
        <>
            <div onClick={hidePopUp} className={`addpost-shadow z-30 `}>
                <div className="overlay" ></div>
            </div>
            <div className='fixed bottom-0 z-40 container p-0 max-w-[460px]'>
                <div className='addpost'>
                    <div
                        className='bg-white px-16 py-7 mb-3 text-center rounded-3xl sticky bottom-0 cursor-pointer'
                        data-popup-toggle="popup" data-popup-target="project-post"
                        onClick={hidePopUp}
                    >
                        <h3 className='text-primary text-2xl font-semibold'> portfolio post </h3>
                        <p className='opacity-70 text-sm'>Upload videos & photos to showcase your creative work</p>

                    </div>
                    <div className='bg-white px-16 py-7 mb-7 text-center rounded-3xl cursor-pointer'>
                        <div onClick={hidePopUp} data-popup-toggle="popup" data-popup-target='select-type'>
                            <h3 className='text-primary text-2xl font-semibold'> offer service </h3>
                            <p className='opacity-70 text-sm'>
                                For studios and equipment owners, copyrights & permits service and producers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostSheet;

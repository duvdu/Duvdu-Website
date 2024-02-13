import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import Icon from '../components/Icons';
import ArrowBtn from '../components/elements/arrowBtn';
import Popup from '../components/elements/popup';
import AppButton from '../components/elements/button';

const DrawerExample = () => {


    return (
        <>
            <Layout>
                <div className='flex gap-6 container'>
                    <LeftSide />
                    <RightSide />
                </div>
            </Layout>
        </>

    );
};

const LeftSide = () => {
    return (
        <>
            <div className='my-12 w-full h-full'>
                <div className='rounded-2xl bg-white dark:border-[#3D3D3D]'>
                    <div className='flex rounded-xl gap-4 p-6'>
                        <Icon name={"card"} />
                        <p className='font-medium text-base'>Registered cards</p>
                    </div>
                    <div className='border-b-2' />
                    <div className='mx-6 my-4'>
                        <div className='flex rounded-xl gap-4 justify-between'>
                            <div className='mb-2'>
                                <div className='flex items-center justify-center rounded-full bg-green-600 w-6 h-6  mb-2'>
                                    <Icon name={"whiteCheck"} />
                                </div>
                                <Icon name={"card"} />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Banka</p>
                                <p className='font-bold text-base'>Ziraat Bankası</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Son dört hane</p>
                                <p className='font-bold text-base'>1234</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Kartın üzerindeki ad</p>
                                <p className='font-bold text-base'>Hızır Kocaman</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Son kullanma tarihi</p>
                                <p className='font-bold text-base'>12/34</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-b-2' />
                    <div className='mx-6 my-4'>
                        <div className='flex rounded-xl gap-4 justify-between'>
                            <div className='mb-2'>
                                <div className='flex border-2 border-[#CFCFCF] items-center justify-center rounded-full w-6 h-6 p-[1px] mb-2'>
                                    <Icon name={"blackCheck"} />
                                </div>
                                <Icon name={"card"} />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Banka</p>
                                <p className='text-sm text-[#5E5E5E]'>Ziraat Bankası</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Son dört hane</p>
                                <p className='text-sm text-[#5E5E5E]'>1234</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Kartın üzerindeki ad</p>
                                <p className='text-sm text-[#5E5E5E]'>Hızır Kocaman</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-[#5E5E5E] mb-2'>Son kullanma tarihi</p>
                                <p className='text-sm text-[#5E5E5E]'>12/34</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-4 rounded-2xl w-full border px-7 py-6 cursor-pointer'>
                    <div className='flex border-2 border-[#CFCFCF] items-center justify-center rounded-full w-6 h-6 p-[1px]'>
                        <Icon name={"blackCheck"} />
                    </div>
                    <span>Add new card</span>
                </div>
            </div>
        </>
    );
};

const RightSide = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    return (
        <>
            <Popup isOpen={isPopupOpen} onClose={closePopup} header={'Error Message'}>
                <div className='flex h-full flex-col mt-24 items-center'>
                    <div className='flex gap-2 items-center justify-center mb-4'>
                        <div className='bg-[#EB1A40] p-2 rounded-full h-min'>
                            <Icon name={'x'} invert={true} />
                        </div>
                        <span className='text-center text-lg font-medium opacity-80 text-[#EB1A40]'>payment failed</span>
                    </div>

                    <span className='mb-24 text-center text-lg font-medium opacity-80'>Invalid payment data</span>
                    <AppButton onClick={closePopup} text={"Try Again"} className={"mb-40 mx-16 md:mx-32"} />
                </div>
            </Popup>
            <div className='rounded-2xl bg-white border-[#CFCFCF] dark:border-[#3D3D3D] p-12 h-full my-12 w-full flex-1'>
                <section>
                    <p className="capitalize opacity-60 mb-4">project type</p>
                    <span className="rounded-full border border-black border-opacity-55 px-3 py-1"> videography </span>
                </section>

                <section className='my-9'>
                    <p className="capitalize opacity-60 mb-4">project details</p>
                    <span className="font-bold"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </span>
                </section>

                <section>
                    <p className="capitalize opacity-60 mb-4">shooting days</p>
                    <span className="font-bold"> 5 days </span>
                </section>

                <section className='my-9'>
                    <div className='flex gap-4'>
                        <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                        <div>
                            <div>
                                <span className='opacity-85 text-base'>
                                    14 December, 2021
                                </span>
                            </div>
                            <div>
                                <span className='text-xs text-[#747688]'>
                                    Tuesday, 4:00PM - 9:00PM
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                            <Icon name={"blue-location-2"} />
                        </div>
                        <div>
                            <div>
                                <span className='opacity-85 text-base'>
                                    Gala Convention Center
                                </span>
                            </div>
                            <div>
                                <span className='text-xs text-[#747688]'>
                                    36 Guild Street London, UK
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='h-12' />
                <div className='flex font-bold justify-between'>
                    <span>Total Amount</span>
                    <span>₹6,699.0</span>
                </div>
                <section>
                    <div className="flex justify-center mt-11">
                        <div onClick={openPopup}>
                            <ArrowBtn className="cursor-pointer w-96" text='check-out' />
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};





export default DrawerExample;

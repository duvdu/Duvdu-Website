import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import AppButton from '../components/elements/button';

const payment_success = () => {
    return (
        <>
            <Layout>
                <div className='container flex flex-col justify-center items-center w-min text-center'>
                    <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
                    <img src='/assets/imgs/theme/noInternetConnection.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
                    <h3 className='text-2xl font-bold mt-8 mb-4'>
                        no internet connection
                    </h3>
                    <p className='text-lg font-medium opacity-90'>
                        Please check your internet connection and try again.
                    </p>
                    <div className={`bg-primary flex rounded-full p-1`} >
                        <div className="w-full flex justify-center items-center">
                            <span className="capitalize flex mx-5 items-center text-lg font-bold text-DS_white text-center"></span>
                        </div>
                        <div className="flex aspect-square items-center justify-center rounded-full bg-white bg-opacity-25 h-20 w-20">
                            {/* <Icon name={'right-arrow'} /> */}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};



export default payment_success;

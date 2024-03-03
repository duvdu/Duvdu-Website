import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import AppButton from '../components/elements/button';
import Icon from '../components/Icons';


const InternetConnection = () => {
    return (
        <>
            <Layout>
                <div className='container flex flex-col justify-center items-center w-min'>
                    <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
                    <img src='/assets/imgs/theme/noInternetConnection.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
                    <div className='flex flex-col justify-start items-start w-[400px]'>
                        <h3 className='text-2xl font-bold mt-8 mb-4 capitalize'>
                            no internet connection
                        </h3>
                        <p className='text-lg font-medium opacity-50 capitalize'>
                            Please check your internet connection and try again.
                        </p>
                        <div className={`border border-primary flex rounded-full p-1 w-full mt-20`} >
                            <div className="w-full flex justify-center items-center">
                                <span className="capitalize flex mx-5 items-center text-lg font-bold text-primary text-center">try again</span>
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-full h-20 w-20 border border-primary">
                                <Icon  className='text-primary text-2xl w-7' name={'rotate-right'} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};



export default InternetConnection;

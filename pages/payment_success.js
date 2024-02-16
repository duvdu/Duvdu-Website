import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import AppButton from '../components/elements/button';

const payment_success = () => {
    return (
        <>
            <Layout>
                <div className='container flex flex-col justify-center items-center w-min text-center'>
                    <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
                    <img src='/assets/imgs/theme/paymentSuccessful.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
                    <h3 className='text-2xl font-bold mt-8 mb-4'>
                        payment successful
                    </h3>
                    <p className='text-lg font-medium opacity-90'>
                        The creative will confirm in 24 hours. & if not, fees will be refunded immediately
                    </p>
                    <AppButton text={"Done"} className={"mt-16 mb-3"} />
                    <a className='opacity-70 font-semibold underline capitalize text-sm text-black'>
                        terms & conditions
                    </a>
                </div>
            </Layout>
        </>
    );
};



export default payment_success;

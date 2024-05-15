import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import AppButton from '../components/elements/button';

const Payment_success = () => {
    return (
        <>
            <Layout shortheader={true}>
                <div className='container flex flex-col justify-center items-center text-center'>

                    <div className='mt-10 h-1 bg-slate-500' />

                    <img src='/assets/imgs/theme/paymentSuccessful.svg' className='lg:w-[540px] lg:h-[450px]' />
                    <h3 className='text-2xl font-bold mt-8 mb-4'>
                        payment successful
                    </h3>
                    <p className='text-lg font-medium opacity-90'>
                        The creative will confirm in 24 hours. & if not, fees will be refunded immediately
                    </p>
                    <AppButton className={"mt-16 mb-3 w-full max-w-[350px]"} >
                        Done
                    </AppButton>
                    <a className='opacity-70 font-semibold underline capitalize text-sm'>
                        terms & conditions
                    </a>
                </div>
            </Layout>
        </>
    );
};



export default Payment_success;

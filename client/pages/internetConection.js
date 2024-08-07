import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import Icon from '../components/Icons';
import { useTranslation } from 'react-i18next';


const InternetConnection = () => {
    const { t } = useTranslation();

    return (
        <>
            <Layout>
                <div className='container flex flex-col justify-center items-center w-min p-10'>
                <div className='bg-gray-600 mt-5' />
                    <img src='/assets/imgs/theme/noInternetConnection.svg' className='lg:w-[540px] lg:h-[450px]' />
                    <div className='flex flex-col justify-start items-start w-[400px]'>
                        <h3 className='text-2xl font-bold mt-8 mb-4 capitalize'>{t("no internet connection")}</h3>
                        <p className='text-lg font-medium opacity-50 capitalize'>{t("Please check your internet connection and try again.")}</p>
                        <div className={`border border-primary flex rounded-full p-1 w-full mt-20`} >
                            <div className="w-full flex justify-center items-center">
                                <span className="capitalize flex mx-5 items-center text-lg font-bold text-primary text-center">{t("try again")}</span>
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

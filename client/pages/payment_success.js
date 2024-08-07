import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import AppButton from '../components/elements/button';
import Link from "next/link";
import { useTranslation } from 'react-i18next';

const Payment_success = () => {
    const { t } = useTranslation();
    return (
        <>
            <Layout shortheader={true}>
                <div className='container flex flex-col justify-center items-center text-center'>

                    <div className='mt-10 h-1 bg-slate-500' />

                    <img src='/assets/imgs/theme/paymentSuccessful.svg' className='lg:w-[540px] lg:h-[450px]' />
                    <h3 className='text-2xl font-bold mt-8 mb-4'>{t("payment successful")}</h3>
                    <p className='text-lg font-medium opacity-90'>{t("The creative will confirm in 24 hours. & if not, unitPrice will be refunded immediately")}</p>
                    <AppButton className={"mt-16 mb-3 w-full max-w-[350px]"} >{t("Done")}</AppButton>
                    <Link href="/terms_conditions">
                        <span className="opacity-70 font-semibold underline capitalize text-sm text-primary cursor-pointer">{t("terms and conditions")}</span>
                    </Link>
                           
                </div>
            </Layout>
        </>
    );
};



export default Payment_success;

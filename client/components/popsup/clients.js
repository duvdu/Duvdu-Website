
import Popup from '../elements/popup';
import Icon from '../Icons';
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

function Client() {
    const { t } = useTranslation();

    const Persons = [
        {
            img:'/assets/imgs/profile/defultUser.jpg',
            name: 'Mohamed Omar',
            address: 'New Cairo',
        },
        {
            img:'/assets/imgs/profile/2.jpg',
            name: 'Youseff Ali',
            address: 'New Cairo',
        },
        {
            img:'/assets/imgs/profile/3.jpg',
            name: 'Khalid Mohamed ',
            address: 'New Cairo',
        },
        {
            img:'/assets/imgs/profile/4.jpg',
            name: 'Mohamed Yasser',
            address: 'New Cairo',
        },
        {
            img:'/assets/imgs/profile/defultUser.jpg',
            name: 'Mohamed Omar',
            address: 'New Cairo',
        },
        
    ]

    return (
        <>
            <Popup id='clients' header={'Clients'}>
                <div className='flex flex-col gap-5 my-16 max-h-[600px] overflow-y-scroll'>
                    {Persons.map((person, index) => (
                        <Person key={index} data={person} />
                    ))}
                </div>
            </Popup>
        </>
    );

}
function Person({ data }) {
    const { t } = useTranslation();

    return (
        <div className='flex gap-4 h-12 sm:min-w-[400px]'>
            <img className='rounded-full h-full aspect-square object-cover object-top' src={data.img} alt='profile img' />
            <div className='w-full flex flex-col justify-between'>
                <span className='text-DS_black text-[15px] opacity-80 font-semibold'>{data.name}</span>
                <span className='text-DS_black text-[13px] opacity-50'>{data.address}</span>
            </div>
            <div className='flex rounded-full justify-center items-center gap-2 border border-primary p-4 cursor-pointer'>
                <span className='hidden sm:block text-primary text-sm font-semibold capitalize'>{t("message")}</span>
                <div className='w-5 h-5'>
                <Icon name={'chat'} />
                </div>
            </div>
        </div>
    );

}



export default Client;

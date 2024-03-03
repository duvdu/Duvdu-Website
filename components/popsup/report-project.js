
import Popup from '../elements/popup';
import AppButton from '../elements/submitButton';
import Icon from '../Icons';
import React, { useState } from "react";

function Report() {

    return (
        <>
            <Popup id='report-project2' className={'w-full lg:w-[942px] h-fu'} header={'Report Project'}>
                <section className='mt-6'>
                    <span className='font-semibold text-2xl capitalize'>what happened ?</span>
                    <br />
                    <span className='font-medium text-lg'>Why did you reject the final project ?</span>
                    <textarea placeholder="Start typing..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-5 h-20" />
                </section>
               <div className='h-[250px]'/>
                <div className='flex justify-center w-full '>
                    <AppButton className={'mt-9 mb-3 w-full'} color={"#D30000"} >
                        Send Report
                    </AppButton>
                </div>
            </Popup>
        </>
    );
}

export default Report;

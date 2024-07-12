// components/TestOTPCode.js
import React, { useState } from 'react';
import Popup from '../elements/popup';

function TestOTPCode() {
    const [otpValue, setOtpValue] = useState('');

    const handleOpen = () => {
        const otp = localStorage.getItem('OTP');
        setOtpValue(otp || '(Not Founed)');
    };

    return (
        <>
            <Popup id='OTP-tester' className={'w-full lg:w-[942px] h-fu'} header={'OTP Tester'} onOpen={handleOpen}>
                <section className='mt-6 flex items-center justify-center w-72 h-36'>
                    <span className='font-medium text-lg text-center'>
                        Your Test OTP is <br />
                        <span className='text-green-800'>{otpValue}</span>
                    </span>
                </section>
            </Popup>
        </>
    );
}

export default TestOTPCode;

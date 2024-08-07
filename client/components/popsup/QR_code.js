

import Icon from '../Icons';
import Popup from '../elements/popup';
import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { useTranslation } from 'react-i18next';


const values = [
    "Ahmed Magdy Mohamed",
    "The sun rose majestically over the horizon, painting the sky with hues of pink and gold.",
    "As the cool breeze swept through the forest, the leaves danced in a symphony of rustling sounds.",
    "With each step, the hiker felt a sense of exhilaration as they climbed higher towards the summit.",
    "In the bustling city streets, the aroma of freshly brewed coffee filled the air, awakening the senses.",
    "Lost in thought, she gazed out the window, watching the raindrops trace intricate patterns on the glass.",
    "Amidst the chaos, a sense of tranquility enveloped her as she listened to the gentle hum of nature.",
    "As the stars twinkled in the night sky, he reflected on the beauty and vastness of the universe."
]

function Report_sent_successfully() {


    return (
        <>
            <Popup id='QR-code'>
                <Body />
            </Popup>
        </>
    );
}
function Body() {
    const { t } = useTranslation();
    const [counter, setcount] = useState(20);
    const [value, setvalue] = useState(0);

    useEffect(() => {
        if (counter > 0) {
            const intervalId = setInterval(() => {
                setcount((prevCount) => prevCount - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
        else {
            setcount(20)
            setvalue(value + 1)
        }
    }, [counter]);
    const sentence = values[value % values.length]
    return (
        <div className="flex flex-col justify-around w-full sm:w-[604px] h-[700px]">
            <div className="heading_s1 text-center">
                <h1 className="auth-title">{t("My QR Code")}</h1>
                <p className='opacity-80'>{t("Lorem ipsum dolor sit amet consecteur")}</p>
            </div>
            <div className='w-full flex justify-center'>
                <div className='relative p-9'>
                    <div className='absolute w-9 h-9 top-0 left-0 border-t-4 border-l-4 border-t-primary border-l-primary '></div>
                    <div className='absolute w-9 h-9 bottom-0 left-0 border-b-4 border-l-4 border-b-primary border-l-primary'></div>
                    <div className='absolute w-9 h-9 top-0 right-0 border-t-4 border-r-4 border-t-primary border-r-primary'></div>
                    <div className='absolute w-9 h-9 bottom-0 right-0 border-b-4 border-r-4 border-b-primary border-r-primary'></div>

                    <QRCode
                        size={256}
                        className=''
                        value={sentence}
                    />
                </div>
            </div>
            <div className="">
                <p className="resendMSG">
                    <span className="opacity-70 font-semibold">{t("This QR is available for :")}</span><span className="text-primary"> 00:{counter.toString().padStart(2, '0')}</span>
                </p>
            </div>
            <div className="flex justify-center items-center">
                <button data-popup-dismiss="popup" className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">{t("close")}</button>
            </div>
        </div>)
}

export default Report_sent_successfully;

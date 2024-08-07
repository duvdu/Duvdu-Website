import React, { useState } from 'react';
import Popup from '../elements/popup';
import Icon from "../Icons";
import Button from '../elements/button';
import Link from "next/link";
import { useTranslation } from 'react-i18next';

function FormSubmitted() {
    const { t } = useTranslation();
    const [showDirectorConfirmed, setShowDirectorConfirmed] = useState(false);

    const toggleDirectorConfirmed = () => {
        setShowDirectorConfirmed(true);
    }

    return (
        <>

            <Popup id='form-submited' header={'form submited'}>
                {showDirectorConfirmed ? <Directorconfirmed /> : <SuccessBody toggleDirectorConfirmed={toggleDirectorConfirmed} />}
            </Popup>

        </>
    );
}

function SuccessBody({ toggleDirectorConfirmed }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center w-full sm:w-[604px] h-full my-14">
            <div className="heading_s1 mb-[88px] text-center">
                <div className="flex w-full items-center justify-center">
                    <Icon name={"done"} className="m-3 w-9" />
                    <span className="text-[#43A047] text-lg font-semibold capitalize">{t("form submited")}</span>
                </div>
                <h2 className="text-lg font-medium w-full max-w-96 mt-9">{t("The director will confirm in 72 hours. If approved you’ll book an appointment")}</h2>
            </div>
            <div className="flex justify-center items-center">
                <div className='flex justify-center w-full '>
                    <Button onClick={toggleDirectorConfirmed} className={'px-36 my-5 max-w-[400px] text-white'} >{t("Done")}</Button>
                </div>
            </div>
            <a className="text-DS_black text-sm underline font-semibold opacity-70 mt-3" href="/terms_conditions">{t("terms & conditions")}</a>
        </div>
    );
}

function Directorconfirmed() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center w-full sm:w-[604px] h-full my-14">
            <div className="heading_s1 mb-[88px] text-center">
                <div className="flex w-full items-center justify-center">
                    <Icon name={"done"} className="m-3 w-9" />
                    <span className="text-[#43A047] text-lg font-semibold capitalize">{t("director confirmed")}</span>
                </div>
                <h2 className="text-lg w-96">{t("Director “Youseff Sayed” has confirmed your pitching form. Now you can book an appointment.")}</h2>
            </div>
            <div className="flex justify-center items-center">
                <div className='flex justify-center w-full '>
                    <Link href={"/payment"}>
                        <Button  className={'px-36 my-5 max-w-[400px] text-white'} >{t("Done")}</Button>
                    </Link>
                </div>
            </div>
            <Link href="/">
                <span className="DS_black text-sm underline font-semibold opacity-70 mt-3 cursor-pointer" >{t("book appointment")}</span>
            </Link>

        </div>
    );
}

export default FormSubmitted;

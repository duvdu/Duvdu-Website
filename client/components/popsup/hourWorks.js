import Link from "next/link";
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';

function WorkHour() {
    const { t } = useTranslation();

    return (
        <>
            <Popup id='work-hour' header={'choose category'}>
                <div className='flex gap-9 h-full justify-center items-center flex-col mt-24'>
                    <div className='flex items-center gap-9'>
                        <input placeholder={t("Ex. 5")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                        <span className="text-xl opacity-50">{t("hours")}</span>
                    </div>
                    <a>
                        <AppButton className={"mb-20 mt-10 mx-16 px-20 sm:px-40"} >{t("Confirm")}</AppButton>
                    </a>
                </div>
            </Popup>
        </>
    );
}

export default WorkHour;

import Link from "next/link";
import Popup from "../../elements/popup";
import AppButton from "../../elements/button";
import { useTranslation } from 'react-i18next';



function RegistrationRequired() {
    const { t } = useTranslation();

    return (
        <>
            <Popup id='registration-required' header={'registration required'}>
                <div className='flex h-full flex-col mt-24 items-center mb-20 max-w-[604px]'>
                    <span className='mb-12 text-center text-xl font-semibold'>
                        Register or Sign-in
                        <br />{t("to access this feature")}</span>
                    <Link href="/register">
                        <div className="max-w-96 w-full cursor-pointer">
                            <AppButton>{t("register")}</AppButton>
                        </div>
                    </Link>
                </div>
            </Popup>
        </>
    );
}


export default RegistrationRequired;


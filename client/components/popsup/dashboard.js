import Link from "next/link";
import Button from '../elements/button';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';
import { useEffect } from "react";
import { ClosePopUp, OpenPopUp, } from "../../util/util";
import { useTranslation } from 'react-i18next';

import { useRouter } from "next/router";
import { connect } from "react-redux";

function dashboard({ islogin}) {
    const { t } = useTranslation();
    const router = useRouter();
    useEffect(() => {
        if (islogin === false){
            OpenPopUp("dashboard-registration-required")
        }
    }, [islogin])
    const onCancel = () => {
        router.push('/');
    }

    return (
        <>
            <Popup id='dashboard-registration-required' header={'registration required'} onCancel={onCancel}>
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

const mapStateToProps = (state) => ({
    islogin: state.auth.login,

});

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(dashboard);


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Verify_account_now from "../../popsup/verify_account_now";
import ErrorPopUp from "../../popsup/errorPopUp";
import { errorConvertedMessage, exclude_error, exclude_loading, OpenPopUp } from "../../../util/util";
import { LogOut } from "../../../redux/action/apis/auth/logout";

const Layout = ({
    logout_respond,
    LogOut,
    api // Assuming `api` is being passed as a prop
}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [errorReq, setErrorReq] = useState(null);
    const router = useRouter();
    
    const clearErrors = () => {
        setErrorMsg(null);
        setErrorReq(null);
    };

    useEffect(() => {
        if (api.error && !exclude_error(api.req)) {
            setErrorMsg(errorConvertedMessage(api.error));
            setErrorReq(api.req);
        }
    }, [api.error, api.req]);

    useEffect(() => {
        if (errorMsg && errorReq) {
            OpenPopUp('main_error_message');
        }
    }, [errorMsg, errorReq]);

    useEffect(() => {
        if (logout_respond) {
            router.push("/login");
            LogOut(-1);
        }
    }, [logout_respond]);

    return (
        <>
            <Verify_account_now />
            <ErrorPopUp id="main_error_message" onCancel={clearErrors} errorReq={errorReq} errorMsg={errorMsg} />
            {api.loading && !exclude_loading(api.req) && (
                <div className="fixed w-screen h-screen top-0 left-0 bg-white dark:bg-black z-50 flex justify-center items-center">
                    <div>
                        <img src="/assets/imgs/theme/loading-icon.png" alt="Loading" />
                        <span className="text-xl"> Loading .... </span>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    logout_respond: state.api.LogOut,
    api: state.api // Assuming `api` state is being used
});

const mapDispatchToProps = {
    LogOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

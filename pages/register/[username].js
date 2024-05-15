import OtpInput from 'react-otp-input';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Auth from '../../components/layout/Auth';
import { useRouter } from 'next/router';
import OTP from '../../components/elements/otp';

function SignupVerify() {

    const router = useRouter();
    const { username } = router.query;

    return (
        <>
            <Auth>
                <OTP username={username} oNsucess={() => window.location.href = "/login"} initcount={0}/>
            </Auth>
        </>
    );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignupVerify);

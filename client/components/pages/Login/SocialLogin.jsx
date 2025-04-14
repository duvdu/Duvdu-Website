import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { connect } from "react-redux";
import useFcmToken from "../../../util/hooks/useFcmToken";
import { getMyprofile } from "../../../redux/action/apis/auth/profile/getProfile";
import { googleLogin } from '../../../redux/action/apis/auth/signin/googleLogin';
import { appleLogin } from '../../../redux/action/apis/auth/signin/appleLogin';
import { performAppleSignIn, processAppleUserData } from '../../../util/appleAuth';
import axios from 'axios';

function SocialLogin({ api, login_respond, googleLogin, appleLogin, getMyprofile }) {
    const { t } = useTranslation();
    const clientId = "475213071438-mn7lcjd3sdq0ltsv92n04pr97ipdhe9g.apps.googleusercontent.com";
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    const login = useGoogleLogin({
        onSuccess: async(response) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${response.access_token}` },
                })
                googleLogin({ username: res.data.email.split('@')[0], email:res.data.email, name:res.data.name, id: res.data.sub });
            }
            catch(error){
                console.log(error);
            }
        },
        onError: (error) => {
            console.error('Login Failed:', error);
        },
    });

    React.useEffect(() => {
        if (login_respond?.message) {
            getMyprofile();
        }
    }, [login_respond?.message]);

    const loginWithApple = async () => {
        try {
            // Use the utility function to handle Apple Sign In
            const appleAuthData = await performAppleSignIn();
            
            // Process the user data
            const userData = processAppleUserData(appleAuthData);
            console.log({userData , appleAuthData});
            // Call the appleLogin action with the processed user data
            appleLogin({
                username: userData.username,
                email: userData.email,
                name: userData.name,
                id: userData.id
            });
        } catch (error) {
            console.error('Apple Login Failed:', error);
        }
    };

    return (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div
                    onClick={() => login()}
                    className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full flex justify-center gap-4 items-center cursor-pointer"
                >
                    <img src="/assets/imgs/theme/google-icon.svg" alt="Google Icon" />
                    <p className="text-lg font-bold">{t("Google")}</p>
                </div>
                <div
                    onClick={() => loginWithApple()}
                    className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full flex justify-center gap-4 items-center cursor-pointer"
                >
                    <img src="/assets/imgs/theme/apple-logo.png" className="w-9 dark:invert" alt="Apple Logo" />
                    <p className="text-lg font-bold">{t("Apple")}</p>
                </div>
            </div>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    login_respond: state.api.login,
    resendCode_respond: state.api.resendCode,
    user: state.auth
});

const mapDispatchToProps = {
    googleLogin,
    appleLogin,
    getMyprofile
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);

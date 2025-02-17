import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { connect } from "react-redux";
import firebaseApp from '../../../util/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from 'firebase/auth';
import useFcmToken from "../../../util/hooks/useFcmToken";
import { getMyprofile } from "../../../redux/action/apis/auth/profile/getProfile";
import { googleLogin } from '../../../redux/action/apis/auth/signin/googleLogin';
import axios from 'axios';

function SocialLogin({ api, login_respond, googleLogin, getMyprofile }) {
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();
    const appleProvider = new OAuthProvider('apple.com');
    const { t } = useTranslation();
    const clientId = "475213071438-mn7lcjd3sdq0ltsv92n04pr97ipdhe9g.apps.googleusercontent.com";
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    const login =  useGoogleLogin({
        onSuccess: async(response) => {
            console.log('Login Success:', response);
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${response.access_token}` },
                })
                googleLogin({ username: res.data.email.split('@')[0],email:res.data.email, name:res.data.name, id: res.data.sub });
                // console.log(res);
                // const loginRes = await axios.post('https://api.duvdu.com/api/users/auth/provider',{
                //     name:res.data.name,
                //     username:res.data.email.split('@')[0],
                //     email:res.data.email,
                //     googleId:res.data.sub,
                //     }).then(()=>{
                //         getMyprofile()
                //     })
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

    const loginWithApple = () => {
        signInWithPopup(auth, appleProvider)
            .then((result) => {
                const credential = OAuthProvider.credentialFromResult(result);
                const user = result.user;
                googleLogin({ username: user?.email.split('@')[0],email:user?.email, name:user?.displayName, id: user?.uid, notificationToken: fcmToken ?? null });
            })
            .catch((error) => {
                const credential = OAuthProvider.credentialFromError(error);
            });
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
    getMyprofile
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);

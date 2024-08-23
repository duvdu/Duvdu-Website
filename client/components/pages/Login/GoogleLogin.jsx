import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import useFcmToken from "../../../util/hooks/useFcmToken";
import { getMyprofile } from "../../../redux/action/apis/auth/profile/getProfile";
import { login } from "../../../redux/action/apis/auth/signin/signin";
import { googleLogin } from '../../../redux/action/apis/auth/signin/googleLogin';
import { connect } from "react-redux";
import React from 'react' 

function GoogleLogin({ api, login_respond, googleLogin, getMyprofile }) {
    const { t } = useTranslation();
    const clientId = "475213071438-mn7lcjd3sdq0ltsv92n04pr97ipdhe9g.apps.googleusercontent.com";
    const { fcmToken,notificationPermissionStatus } = useFcmToken();
    console.log(login_respond)
    React.useEffect(() => {
        if (login_respond?.message) {
          getMyprofile()
        }
      }, [login_respond?.message])
        
    const login = useGoogleLogin({
        onSuccess: async(response) => {
            const res = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${response.access_token}` },
            })
            googleLogin({ username:'mos3addev', id:res?.data?.sub , notificationToken:fcmToken ?? null })
            },
        onError: (error) => {
            console.error('Login Failed:', error);
        },
    });

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
                <div 
                    onClick={() => login()} 
                    className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full flex justify-center gap-4 items-center cursor-pointer"
                >
                    <img src="/assets/imgs/theme/google-icon.svg" alt="Google Icon" />
                    <p className="text-lg font-bold">{t("Google")}</p>
                </div>
                <div className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full flex justify-center gap-4 items-center cursor-pointer">
                    <img src="/assets/imgs/theme/apple-logo.png" className="w-9 dark:invert" alt="Apple Logo" />
                    <p className="text-lg font-bold">{t("Apple")}</p>
                </div>
            </div>
        </GoogleOAuthProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);

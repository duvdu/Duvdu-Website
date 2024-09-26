import Link from "next/link";
import Auth from '../components/layout/Auth';
import Button from '../components/elements/button';
import { useState, useEffect } from 'react';
import Icon from '../components/Icons';
import { connect } from "react-redux";
import { login } from "../redux/action/apis/auth/signin/signin";
import { useRouter } from 'next/router';
import { errorConvertedMessage, validatePassword } from "../util/util";
import { resendCode } from "../redux/action/apis/auth/OTP/resend";
import { getMyprofile } from "../redux/action/apis/auth/profile/getProfile";
import useFcmToken from "../util/hooks/useFcmToken";
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SocialLogin from "../components/pages/Login/SocialLogin";

function Login({ api, login_respond, login, resendCode, getMyprofile }) {
    const { t } = useTranslation();
    const { fcmToken,notificationPermissionStatus } = useFcmToken();
  

  const [errorMSG, setErrorMSG] = useState(null);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [userNameError, setUserNameError] = useState({ isError: false, message: '' });

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState({ isError: false, message: '' });

  const [showPassword, setShowPassword] = useState(false);

  var convertError = JSON.parse(login_respond?.error ?? null)

  useEffect(() => {
    console.log(login_respond)
    if (login_respond?.message === 'success') {
      getMyprofile().then(()=>{
        router.back()
      })
    }
  }, [login_respond?.message])


  useEffect(() => {
    if (convertError && login_respond?.req == "login") {
      if (convertError.status == 422) {
        convertError.data.errors.forEach(({ field, message }) => {
          switch (field) {
            case 'username':
              setUsername({ isError: true, message: message });
              break;
            case 'password':
              setPasswordError({ isError: true, message: message });
              break;
            default:
              break;
          }
        });
      }
      else {
        setErrorMSG(errorConvertedMessage(login_respond?.error))
      }

    }
    else
      setErrorMSG(null)
  }, [login_respond?.error])



  const handleSubmit = (e) => {
    e.preventDefault();

    var eError = true, pError = true
    if (username.trim() === '') {
      setUserNameError({ isError: true, message: 'Username is required.' });
    } else {
      eError = false
      setUserNameError({ isError: false, message: '' });
    }

    const error = false //validatePassword(password);

    if (error) {
      setPasswordError({ isError: true, message: error });
    } else {
      setPasswordError({ isError: false, message: '' });
      login({ username, password , notificationToken:fcmToken ?? null })
    }

  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const verifyAccount = () => {
    router.push(`/register/${username}`);
    resendCode({ username: username })
  };

  const clientId = "475213071438-mn7lcjd3sdq0ltsv92n04pr97ipdhe9g.apps.googleusercontent.com";

  return (
    <>
      <Auth>
        <form method="post" onSubmit={handleSubmit}>
          <div className="heading_s1 mb-8">
            <h1 className="auth-title">{t("Welcome Back !!")}</h1>
          </div>
          <div className={`mb-4 ${userNameError.isError && 'error'}`}>
            <input autoComplete="on" type="text" value={username|| ""} onChange={(e) => setUsername(e.target.value)} placeholder={t("@username")} className={userNameError.isError ? "app-field error" : "app-field"} />
            {userNameError.isError && <p className="error-msg">{userNameError.message}</p>}
          </div>
          <div className={`${passwordError.isError && 'error'}`}>
            <div className="relative password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password|| ""}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("Password")}
                autoComplete="on"
                className={passwordError.isError ? "app-field error" : "app-field"}
              />
              {
                !showPassword &&
                <div className="w-5 icon" onClick={toggleShowPassword} >
                  <Icon className="opacity-40" name={"eye"} />
                </div>
              }
              {
                showPassword &&
                <div className="w-5 icon" onClick={toggleShowPassword}>
                  <Icon className="opacity-40" name={"eye-slash"} />
                </div>
              }

            </div>
            {passwordError.isError && <p className="error-msg">{passwordError.message}</p>}
            <Link href="/forgetPassword">
              <div className="forgot-password cursor-pointer">{t("Forgot password ?")}</div>
            </Link>

            {errorMSG && (errorMSG.includes("Account not verified") ?
              <div className="flex whitespace-nowrap">
                <div className="text-red-600 text-center" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(errorMSG) }} />
                <button className="text-primary" onClick={verifyAccount}>{t("Verify Now")}</button>
              </div>
              : <div className="text-red-600 text-center" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(errorMSG) }} />
            )}

          </div>
          <div className="login_footer mb-4"></div>

          <button type="submit" className="mb-4 relative mb-30 w-full">
            <Button name="login" shadow={true}>{t("Login")}</Button>
            <div className="submit-btn"></div>
          </button>
          <div className="have-account">
            <span>{t("Don't have an account ?")}</span>
            <Link href="/register">{t("Register now")}</Link>
          </div>
          <div className="flex items-center">
            <div className="border-t border-black opacity-20 w-full my-4"></div>
            <p className="px-4 font-bold my-10 ">{t("OR")}</p>
            <div className="border-t border-black opacity-20 w-full my-4"></div>
          </div>
          <SocialLogin/>
        </form>
      </Auth>
    </>
  );
}

const mapStateToProps = (state) => ({
  api: state.api,
  login_respond: state.api.login,
  resendCode_respond: state.api.resendCode,
  user: state.auth
});

const mapDispatchToProps = {
  login,
  resendCode,
  getMyprofile
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

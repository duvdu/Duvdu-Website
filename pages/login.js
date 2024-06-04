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

function Login({ api, login_respond, login,resendCode_respond,resendCode }) {

  const [errorMSG, setErrorMSG] = useState(null);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [userNameError, setUserNameError] = useState({ isError: false, message: '' });

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState({ isError: false, message: '' });

  const [showPassword, setShowPassword] = useState(false);

  var convertError = JSON.parse(api.error ?? null)

  if (login_respond) {
    router.push({
      pathname: `/`,
    });
  }

  useEffect(() => {
    if (convertError && api.req == "login") {
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
        setErrorMSG(errorConvertedMessage(api.error))
      }

    }
    else
      setErrorMSG(null)
  }, [api.error])
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    var eError = true, pError = true
    if (username.trim() === '') {
      setUserNameError({ isError: true, message: 'Username is required.' });
    } else {
      eError = false
      setUserNameError({ isError: false, message: '' });
    }
    
    const error = validatePassword(password);
    
    if (error) {
      setPasswordError({ isError: true, message: error });
    } else {
      setPasswordError({ isError: false, message: '' });
      login({ username, password })
    }
    
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const verifyAccount = () => {
     resendCode({ username: username })
  };
  
  useEffect(() => {
    if(resendCode_respond)
      router.push(`/register/${username}`);
  }, [resendCode_respond])
  
  
  return (
    <>
      <Auth>
        <form method="post" onSubmit={handleSubmit}>
          <div className="heading_s1 mb-8">
            <h1 className="auth-title">Welcome Back !!</h1>
          </div>
          <div className={`mb-4 ${userNameError.isError && 'error'}`}>
            <input autoComplete="on" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@username" className={userNameError.isError ? "app-field error" : "app-field"} />
            {userNameError.isError && <p className="error-msg">{userNameError.message}</p>}
          </div>
          <div className={`${passwordError.isError && 'error'}`}>
            <div className="relative password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
              <div className="forgot-password cursor-pointer">Forgot password ?</div>
            </Link>

            {errorMSG && (errorMSG.includes("Account not verified") ?
              <div className="flex whitespace-nowrap">
                <div className="text-red-600 text-center" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(errorMSG) }} />
                <button className="text-primary" onClick={verifyAccount}>Verify Now</button>
              </div>
              : <div className="text-red-600 text-center" dangerouslySetInnerHTML={{ __html: errorConvertedMessage(errorMSG) }} />
            )}

          </div>
          <div className="login_footer mb-4"></div>

          <button type="submit" className="mb-4 relative mb-30 w-full">
            <Button name="login" shadow={true}>
              Login
            </Button>
            <div className="submit-btn"></div>
          </button>
          <div className="have-account">
            <span>Don't have an account ? </span>
            <Link href="/register">Register now</Link>
          </div>
          <div className="flex items-center">
            <div className="border-t border-black opacity-20 w-full my-4"></div>
            <p className="px-4 font-bold my-10 ">OR</p>
            <div className="border-t border-black opacity-20 w-full my-4"></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-8 ">
            <div className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full flex justify-center gap-4 items-center cursor-pointer">
              <img src="/assets/imgs/theme/google-icon.svg" />
              <p className="text-lg font-bold"> Google </p>
            </div>
            <div className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full flex justify-center gap-4 items-center cursor-pointer">
              <img src="/assets/imgs/theme/apple-logo.png" className="w-9 dark:invert" />
              <p className="text-lg font-bold"> Apple </p>
            </div>
          </div>
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
  resendCode
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

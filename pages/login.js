import Link from "next/link";
import Auth from '../components/layout/Auth';
import Button from '../components/elements/submitButton';
import { useState } from 'react';
import Icon from '../components/Icons';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState({ isError: false, message: '' });
  const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setIsloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    var eError = true, pError = true
    if (email.trim() === '') {
      setEmailError({ isError: true, message: 'Email is required.' });
    } else {
      eError = false
      setEmailError({ isError: false, message: '' });
    }

    if (password.length < 8) {
      setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
    } else {
      pError = false
      setPasswordError({ isError: false, message: '' });
    }

    if (!eError && !pError) {
      console.log('Form submitted');
      setIsloading(true)
      setTimeout(() => {
        setIsloading(false);
      }, 2000);

    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={`w-full h-full bg-black transition-opacity ${(loading) ? 'opacity-60 visible' : 'opacity-0 invisible'} 
            left-0 right-0 fixed z-20`} />
      <Auth>
        <form method="post" onSubmit={handleSubmit}>
          <div className="heading_s1 mb-8">
            <h1 className="auth-title">Welcome Back !!</h1>
          </div>
          <div className={`mb-4 ${emailError.isError && 'error'}`}>
            <input autoComplete="on" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="@username" className={emailError.isError ? "auth-field error" : "auth-field"} />
            {emailError.isError && <p className="error-msg">{emailError.message}</p>}
          </div>
          <div className={`mb-8 ${passwordError.isError && 'error'}`}>
            <div className="relative password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="on"
                className={passwordError.isError ? "auth-field error" : "auth-field"}
              />
              {
                !showPassword &&
                <div className="w-5 icon" onClick={toggleShowPassword} >
                  <Icon className="opacity-40"  name={"eye"} />
                </div>
              }
              {
                showPassword &&
                <div className="w-5 icon" onClick={toggleShowPassword}>
                  <Icon className="opacity-40"  name={"eye-slash"} />
                </div>
              }

            </div>
            {passwordError.isError && <p className="error-msg">{passwordError.message}</p>}
            
              <a href="/forget_password" className="forgot-password">Forgot password ?</a>
            
          </div>
          <div className="login_footer mb-4"></div>
          <div className="mb-4 relative">
            <Button type="submit" name="login" shadow={true}>
              Login
            </Button>
            <div className="submit-btn"></div>
          </div>
          <div className="have-account">
            <span>Don't have an account ?</span>
            
              <a href="/register"> Register now</a>
            
          </div>
          <div className="flex items-center">
            <div className="border-t border-black opacity-20 w-full my-4"></div>
            <p className="px-4 font-bold my-10 ">OR</p>
            <div className="border-t border-black opacity-20 w-full my-4"></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <div className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full sm:w-64 flex justify-center gap-4 items-center cursor-pointer">
              <img src="/assets/imgs/theme/google-icon.svg" />
              <p className="text-lg font-bold"> Google </p>
            </div>
            <div className="rounded-full border border-solid border-DS_gray_1 hover:border-primary py-4 w-full sm:w-64 flex justify-center gap-4 items-center cursor-pointer">
              <img src="/assets/imgs/theme/apple-logo.png" className="w-9 dark:invert" />
              <p className="text-lg font-bold"> Apple </p>
            </div>
          </div>
        </form>
      </Auth>
    </>
  );
}

export default Login;

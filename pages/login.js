import Link from "next/link";
import Auth from '../components/layout/Auth';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState({ isError: false, message: '' });
  const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setEmailError({ isError: true, message: 'Email is required.' });
    } else {
      setEmailError({ isError: false, message: '' });
    }

    if (password.length < 8) {
      setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
    } else {
      setPasswordError({ isError: false, message: '' });
    }

    if (!emailError.isError && !passwordError.isError) {
      console.log('Form submitted');
      // Continue with form submission or other actions
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Auth>
        <form method="post" onSubmit={handleSubmit}>
          <div className="heading_s1 mb-11">
            <h1 className="auth-title">Welcome Back !!</h1>
          </div>
          <div className={`form-group ${emailError.isError && 'error'}`}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email *" className={emailError.isError ? "auth-field error" : "auth-field"} />
            {emailError.isError && <p className="error-msg">{emailError.message}</p>}
          </div>
          <div className={`form-group mb-11 ${passwordError.isError && 'error'}`}>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password *"
                className={passwordError.isError ? "auth-field error" : "auth-field"}
              />
                {
                  !showPassword &&
                  <img className="icon" onClick={toggleShowPassword} src="/assets/imgs/theme/icons/eye-closed.svg" alt="" />
                }
                {
                  showPassword &&
                  <img className="icon" onClick={toggleShowPassword} src="/assets/imgs/theme/icons/eye-open.svg" alt="" />
                }
              
            </div>
            {passwordError.isError && <p className="error-msg">{passwordError.message}</p>}
            <Link href="/forget_password">
              <a className="forgot-password">Forgot password ?</a>
            </Link>
          </div>
          <div className="login_footer form-group mb-11"></div>
          <div className="form-group relative mb-7">
            <button type="submit" className="btn btn-heading btn-block hover-up" name="login">
              Login
            </button>
            <div className="submit-btn"></div>
          </div>
          <div className="have-account">
            <span>Don't have an account ?</span>
            <Link href="/register">
              <a> Register now</a>
            </Link>
          </div>
        </form>
      </Auth>
    </>
  );
}

export default Login;

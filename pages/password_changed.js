import Link from "next/link";
import Auth from '../components/layout/Auth';
import { useState } from 'react';

function resetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState({ isError: false, message: '' });
  const [passwordError, setPasswordError] = useState({ isError: false, message: '' });

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

  return (
    <>
      <Auth>
        
          <form method="get" action="/login" onSubmit={handleSubmit}>
            <div className="heading_s1 mb-42 text-center">
						<img src="/assets/imgs/theme/loading.svg" className="mb-40" alt="logo" />
              <h1 className="auth-title">Password changed</h1>
              <p  >Please type something you’ll remember</p>
            </div>
             <div className="login_footer form-group mb-42"></div>
            <div className="form-group relative mb-30">
              <Link href={"/login"}>
              <a className="btn btn-heading btn-block hover-up submit">
                Back to Login
              </a>
              </Link>
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

export default resetPassword;

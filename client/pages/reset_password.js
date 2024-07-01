import Link from "next/link";
import Auth from '../components/layout/Auth';
import { useState } from 'react';
import Button from '../components/elements/button';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState({ isError: false, message: '' });
  const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
  const [confirmPasswordError, setConfirmPasswordError] = useState({ isError: false, message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for email
    if (email.trim() === '') {
      setEmailError({ isError: true, message: 'Email is required.' });
    } else {
      setEmailError({ isError: false, message: '' });
    }

    // Validation for password
    if (password.length < 8) {
      setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
    } else {
      setPasswordError({ isError: false, message: '' });
    }

    // Validation for confirmPassword
    if (password !== confirmPassword) {
      setConfirmPasswordError({ isError: true, message: 'Passwords do not match.' });
    } else {
      setConfirmPasswordError({ isError: false, message: '' });
    }

    // Continue with form submission or other actions if no errors
    // if (!emailError.isError && !passwordError.isError && !confirmPasswordError.isError) {
    //   // Add logic for password reset here
    // }
  };

  return (
    <>
      <Auth>
        <form method="post" action="/password_changed" onSubmit={handleSubmit}>
          <div className="heading_s1 mb-20 text-center">
            <h1 className="auth-title">Reset Password</h1>
            <p className="text-lg text-[#455154]">Please type something you’ll remember</p>
          </div>
          <div className={`mb-4 ${passwordError.isError && 'error'}`}>
            <input type="password" value={password|| ""} onChange={(e) => setPassword(e.target.value)} placeholder="New Password *" className={passwordError.isError ? "app-field error" : "app-field"} />
            {passwordError.isError && <p className="error-msg">{passwordError.message}</p>}
          </div>
          <div className={`mb-20 ${confirmPasswordError.isError && 'error'}`}>
            <input type="password" value={confirmPassword|| ""} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password *" className={confirmPasswordError.isError ? "app-field error" : "app-field"} />
            {confirmPasswordError.isError && <p className="error-msg">{confirmPasswordError.message}</p>}
          </div>
          <div className="login_footer mb-11"></div>
          <div className="mb-4 relative mb-30">
            <Button type="submit" name="reset-password" shadow={true} >
              Login
            </Button>
            <div className="submit-btn"></div>
          </div>
        </form>
      </Auth>
    </>
  );
}

export default ResetPassword;

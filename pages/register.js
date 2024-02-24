import Link from "next/link";
import Auth from '../components/layout/Auth';
import { useState } from 'react';
import Button from '../components/elements/submitButton';

function Register() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState({ isError: false, message: '' });
    const [phoneError, setPhoneError] = useState({ isError: false, message: '' });
    const [emailError, setEmailError] = useState({ isError: false, message: '' });
    const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation here
        if (name.trim() === '') {
            setNameError({ isError: true, message: 'Name is required.' });
            return;
        } else {
            setNameError({ isError: false, message: '' });
        }

        if (phone.trim() === '') {
            setPhoneError({ isError: true, message: 'Phone is required.' });
            return;
        } else {
            setPhoneError({ isError: false, message: '' });
        }

        if (email.trim() === '') {
            setEmailError({ isError: true, message: 'Email is required.' });
            return;
        } else {
            setEmailError({ isError: false, message: '' });
        }

        if (password.length < 8) {
            setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
            return;
        } else {
            setPasswordError({ isError: false, message: '' });
        }

        if (!termsAgreed) {
            // Handle terms agreement validation error
            return;
        }

        // Continue with form submission or other actions
        console.log('Form submitted');
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <>
            <Auth>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="heading_s1 mb-11">
                        <h1 className="auth-title">Create an Account</h1>
                    </div>
                    <div className={`mb-4 ${nameError.isError && 'error'}`}>
                        <input
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name *"
                            className={nameError.isError ? "auth-field error" : "auth-field"}
                        />
                        {nameError.isError && <p className="error-msg">{nameError.message}</p>}
                    </div>
                    <div className={`mb-4 ${phoneError.isError && 'error'}`}>
                        <input
                            type="phone"
                            value={phone}
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone *"
                            className={phoneError.isError ? "auth-field error" : "auth-field"}
                        />
                        {phoneError.isError && <p className="error-msg">{phoneError.message}</p>}
                    </div>
                    <div className={`mb-4 ${emailError.isError && 'error'}`}>
                        <input
                            type="text"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email *"
                            className={emailError.isError ? "auth-field error" : "auth-field"}
                        />
                        {emailError.isError && <p className="error-msg">{emailError.message}</p>}
                    </div>
                    <div className={`mb-11 ${passwordError.isError && 'error'}`}>
                        <div className="relative password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
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
                    </div>
                    <div className="login_footer mb-11">
                        <div className="chek-form">
                            <div className="custome-checkbox">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="termsAgreed"
                                    id="exampleCheckbox1"
                                    checked={termsAgreed}
                                    onChange={() => setTermsAgreed(!termsAgreed)}
                                />
                                <label className="form-check-label terms-submit flex gap-1 items-center " htmlFor="exampleCheckbox1">
                                    <span className="terms-agree">I agree to </span>
                                    <Link href="/terms">
                                        <a>terms and conditions</a>
                                    </Link>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 relative mb-30">
                    <Button type="submit" name="login">
                        Create Account
                    </Button>
                        <div className="submit-btn"></div>
                    </div>
                    <div className="have-account">
                        <span>Already have an account ? </span>
                        <Link href="/login">
                            <a> Log in</a>
                        </Link>
                    </div>
                </form>
            </Auth>
        </>
    );
}

export default Register;

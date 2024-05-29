import Link from "next/link";
import Auth from '../../components/layout/Auth';
import { useEffect, useState } from 'react';
import Button from '../../components/elements/button';
import Icon from '../../components/Icons';
import { connect } from "react-redux";
import { signup } from "../../redux/action/apis/auth/signup/signup";
import { useRouter } from 'next/router';
import { CheckUsernameExists } from "../../redux/action/apis/auth/signin/CheckUsernameExists";

function Register({ signup, api, respond, userExists, CheckUsernameExists }) {

    const [isUsernameExists, setIsUsernameExists] = useState(userExists?.isUsernameExists);

    useEffect(() => {
        if (api.req === "CheckUsernameExists" && api.loading) {
            setIsUsernameExists("loading");
        } else {
            setIsUsernameExists(userExists?.isUsernameExists);
        }
    }, [userExists, api]);
    

    // console.log("isUsernameExists = ", isUsernameExists)

    const router = useRouter();

    const [errorMSG, setErrorMSG] = useState(null);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState({ isError: false, message: '' });

    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState({ isError: false, message: '' });

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState({ isError: false, message: '' });

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
    const [showPassword, setShowPassword] = useState(false);

    const [termsAgreed, setTermsAgreed] = useState(false);
    const [termsAgreedError, setTermsAgreedError] = useState({ isError: false, message: '' });


    var convertError = JSON.parse(api.error ?? null)

    if (respond) {
        console.log(respond)
        router.push({
            pathname: `/register/${username}`,
        });
    }
    useEffect(() => {
        if (convertError && api.req == "signup") {
            if (convertError.status == 422) {
                convertError.data.errors.forEach(({ field, message }) => {
                    switch (field) {
                        case 'name':
                            setNameError({ isError: true, message: message });
                            break;
                        case 'phoneNumber.number':
                            setPhoneError({ isError: true, message: message });
                            break;
                        case 'username':
                            setUsernameError({ isError: true, message: message });
                            break;
                        case 'password':
                            setPasswordError({ isError: true, message: message });
                            break;
                        // Add more cases for other fields if needed
                        default:
                            // Handle default case
                            break;
                    }
                });
            }
            else if (convertError.status == 400) {
                const errorMessages = convertError.data.errors.map(({ message }) => message).join('\n');
                setErrorMSG(errorMessages)
            }
            else {
                setErrorMSG(convertError.statusText)
            }
        }
        else
            setErrorMSG(null)
    }, [api.error])

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

        if (username.trim() === '') {
            setUsernameError({ isError: true, message: 'Email is required.' });
            return;
        } else {
            setUsernameError({ isError: false, message: '' });
        }

        if (password.length < 8) {
            setPasswordError({ isError: true, message: 'Password must be at least 8 characters long.' });
            return;
        } else {
            setPasswordError({ isError: false, message: '' });
        }

        if (!termsAgreed) {
            setTermsAgreedError({ isError: true, message: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy' });
            return;
        }
        else {
            setTermsAgreedError({ isError: false, message: '' })
        }

        signup({
            name: name,
            username: username,
            password: password,
            phoneNumber: phone
        });

    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleusernameChange = (e) => {
        const value = e.target.value
        setUsername(value)
        if (value.length > 5)
            CheckUsernameExists(value);
        else
        {
            // setUsernameError({ isError: true, message: 'should be greater that 5 characters' });
            setIsUsernameExists(null)
        }
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
                            placeholder="Name"
                            className={nameError.isError ? "app-field error" : "app-field"}
                        />
                        {nameError.isError && <p className="error-msg">{nameError.message}</p>}
                    </div>
                    <div className={`mb-4 ${phoneError.isError && 'error'}`}>
                        <input
                            type="phone"
                            value={phone}
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            className={phoneError.isError ? "app-field error" : "app-field"}
                        />
                        {phoneError.isError && <p className="error-msg">{phoneError.message}</p>}
                    </div>
                    <div className="relative mb-4">
                        <div className={`${usernameError.isError && 'error'}`}>
                            <input
                                type="text"
                                value={username}
                                name="username"
                                onChange={handleusernameChange}
                                placeholder="@username"
                                className={usernameError.isError ? "app-field error" : "app-field"}
                            />
                            <div className="absolute -right-8 top-6">
                                {
                                    isUsernameExists === false &&
                                    <div className="bg-primary rounded-full size-6 flex items-center justify-center">
                                        <Icon className="w-3 text-white" name={'check'} />
                                    </div>
                                }
                                {
                                    isUsernameExists === true &&
                                    <div className="bg-red-700 rounded-full size-6 flex items-center justify-center">
                                        <Icon className="w-3 text-white" name={'xmark'} />
                                    </div>
                                }
                                {
                                    isUsernameExists == 'loading' &&
                                    <div className="bg-primary rounded-full size-6 flex items-center justify-center">
                                        <Icon className="w-3 text-white" name={'circle'} />
                                    </div>
                                }

                            </div>
                        </div>
                        {usernameError.isError && <p className="error-msg">{usernameError.message}</p>}
                    </div>
                    <div className={`mb-11 ${passwordError.isError && 'error'}`}>
                        <div className="relative password-container">
                            {/* https://tintef.github.io/react-google-places-autocomplete/docs/ */}
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create Password"
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
                    </div>

                    <div className="mb-11">
                        <div className="login_footer">
                            <div className="chek-form">
                                <div className="flex gap-2 ">
                                    <input
                                        className="w-4 h-4 opacity-40"
                                        type="checkbox"
                                        name="termsAgreed"
                                        id="exampleCheckbox1"
                                        checked={termsAgreed}
                                        onChange={() => setTermsAgreed(!termsAgreed)}
                                    />
                                    <label className="form-check-label terms-submit flex gap-1 items-center " htmlFor="exampleCheckbox1">
                                        <span className="capitalize text-xs">
                                            <span>I agree to </span>
                                            <Link href="/terms_conditions">
                                                <span className="font-bold text-primary cursor-pointer">terms and conditions</span>
                                            </Link>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {termsAgreedError.isError && (
                            <p className="error-msg">{termsAgreedError.message}</p>
                        )}
                    </div>
                    <button type="submit" className="mb-4 relative mb-30 w-full">
                        <Button name="login" shadow={true}>
                            Create Account
                        </Button>
                        <div className="submit-btn"></div>
                    </button>
                    <div className="have-account">
                        <span>Already have an account ? </span>
                        <Link href="/login">Log in</Link>
                    </div>
                </form>
                <div className="text-red-600 text-center" dangerouslySetInnerHTML={{ __html: errorMSG }}></div>
            </Auth>
        </>
    );
}

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.signup,
    userExists: state.api.CheckUsernameExists
    

});

const mapDispatchToProps = {
    signup,
    CheckUsernameExists,


};

export default connect(mapStateToProps, mapDispatchToProps)(Register);


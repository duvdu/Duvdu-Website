import Link from "next/link";
import Auth from '../../components/layout/Auth';
import { useEffect, useState } from 'react';
import Button from '../../components/elements/button';
import Icon from '../../components/Icons';
import { connect } from "react-redux";
import { signup } from "../../redux/action/apis/auth/signup/signup";
import { useRouter } from 'next/router';
import { CheckUsernameExists } from "../../redux/action/apis/auth/signin/CheckUsernameExists";

const Register = ({ signup, api, respond, userExists, CheckUsernameExists }) => {
    const [isUsernameExists, setIsUsernameExists] = useState(userExists?.isUsernameExists);
    const [errorMSG, setErrorMSG] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        username: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        name: { isError: false, message: '' },
        phone: { isError: false, message: '' },
        username: { isError: false, message: '' },
        password: { isError: false, message: '' },
        termsAgreed: { isError: false, message: '' },
    });
    const [showPassword, setShowPassword] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [lastCheckedUsername, setLastCheckedUsername] = useState(''); // State to track the last checked username
    const router = useRouter();

    // change status of @username icon
    useEffect(() => {
        if (api.req === "CheckUsernameExists" && api.loading) {
            setIsUsernameExists("loading");
        } else {
            setIsUsernameExists(userExists?.isUsernameExists);
        }
    }, [userExists, api]);
    
    // handle sending check of username isExists

    useEffect(() => {
        // Check username availability if it changes and has more than 5 characters, but only if it's different from the last checked username
        if (isUsernameExists !== 'loading' && formData.username.length > 5 && formData.username !== lastCheckedUsername) {
            CheckUsernameExists(formData.username);
            setLastCheckedUsername(formData.username);
        }
    }, [formData.username, isUsernameExists]);



    useEffect(() => {
        if (respond) {
            router.push(`/register/${formData.username}`);
        }
    }, [respond]);

    useEffect(() => {
        if (api.error) {
            const convertError = JSON.parse(api.error);
            handleApiErrors(convertError);
        } else {
            setErrorMSG(null);
        }
    }, [api.error]);

    const handleApiErrors = (convertError) => {
        console.log(convertError)
        if (convertError.status === 422) {
            const updatedErrors = { ...formErrors };
            convertError.data.errors.forEach(({ field, message }) => {
                if (updatedErrors[field]) {
                    console.log(updatedErrors)
                    updatedErrors[field] = { isError: true, message };
                }
            });
            setFormErrors(updatedErrors);
        } else if (convertError.status === 400) {
            const errorMessages = convertError.data.errors.map(({ message }) => message).join('\n');
            setErrorMSG(errorMessages);
        } else {
            setErrorMSG(convertError.statusText);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.values(validationErrors).some(error => error.isError)) {
            setFormErrors(validationErrors);
            return;
        }

        signup({
            name: formData.name,
            username: formData.username,
            password: formData.password,
            phoneNumber: formData.phone,
        });
    };

    const validateForm = () => {
        const errors = { ...formErrors };

        if (formData.name.trim() === '') {
            errors.name = { isError: true, message: 'Name is required.' };
        } else {
            errors.name = { isError: false, message: '' };
        }

        if (formData.phone.trim() === '') {
            errors.phone = { isError: true, message: 'Phone is required.' };
        } else {
            errors.phone = { isError: false, message: '' };
        }

        if (formData.username.trim() === '') {
            errors.username = { isError: true, message: 'Username is required.' };
        } else {
            errors.username = { isError: false, message: '' };
        }
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (formData.password.length < 8) {
            errors.password = { isError: true, message: 'Password must be at least 8 characters long.' };
        } else if (!uppercaseRegex.test(formData.password)) {
            errors.password = { isError: true, message: 'Password must contain at least one uppercase letter.' };
        } else if (!lowercaseRegex.test(formData.password)) {
            errors.password = { isError: true, message: 'Password must contain at least one lowercase letter.' };
        } else if (!specialCharRegex.test(formData.password)) {
            errors.password = { isError: true, message: 'Password must contain at least one special character.' };
        } else {
            errors.password = { isError: false, message: '' };
        }

        if (!termsAgreed) {
            errors.termsAgreed = { isError: true, message: 'Please agree to the Terms and Conditions.' };
        } else {
            errors.termsAgreed = { isError: false, message: '' };
        }

        return errors;
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    console.log(formErrors)
    return (
        <Auth>
            <form method="post" onSubmit={handleSubmit}>
                <div className="heading_s1 mb-11">
                    <h1 className="auth-title">Create an Account</h1>
                </div>
                <div className={`mb-4 ${formErrors.name.isError ? 'error' : ''}`}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={formErrors.name.isError ? "app-field error" : "app-field"}
                    />
                    {formErrors.name.isError && <p className="error-msg">{formErrors.name.message}</p>}
                </div>
                <div className={`mb-4 ${formErrors.phone.isError ? 'error' : ''}`}>
                    <input
                        type="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={formErrors.phone.isError ? "app-field error" : "app-field"}
                    />
                    {formErrors.phone.isError && <p className="error-msg">{formErrors.phone.message}</p>}
                </div>
                <div className="relative mb-4">
                    <div className={`${formErrors.username.isError ? 'error' : ''}`}>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="@username"
                            className={formErrors.username.isError ? "app-field error" : "app-field"}
                        />
                        {formData.username.length > 5 &&
                        <div className="absolute -right-8 top-6">
                            {isUsernameExists === false && (
                                <div className="bg-primary rounded-full size-6 flex items-center justify-center">
                                    <Icon className="w-3 text-white" name="check" />
                                </div>
                            )}
                            {isUsernameExists === true && (
                                <div className="bg-red-700 rounded-full size-6 flex items-center justify-center">
                                    <Icon className="w-3 text-white" name="xmark" />
                                </div>
                            )}
                            {isUsernameExists === 'loading' && (
                                <div className="bg-primary rounded-full size-6 flex items-center justify-center">
                                    <Icon className="w-3 text-white" name="circle" />
                                </div>
                            )}
                        </div>}
                    </div>
                    {formErrors.username.isError && <p className="error-msg">{formErrors.username.message}</p>}
                </div>
                <div className={`mb-4 ${formErrors.password.isError ? 'error' : ''}`}>
                    <div className="relative password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create Password"
                            className={formErrors.password.isError ? "app-field error" : "app-field"}
                        />
                        <div className="w-5 icon" onClick={toggleShowPassword}>
                            <Icon className="opacity-40" name={showPassword ? "eye-slash" : "eye"} />
                        </div>
                    </div>
                    {formErrors.password.isError && <p className="error-msg">{formErrors.password.message}</p>}
                </div>
                <div className="mb-11">
                    <div className="login_footer">
                        <div className="chek-form">
                            <div className="flex gap-2">
                                <input
                                    className="w-4 h-4 opacity-40"
                                    type="checkbox"
                                    name="termsAgreed"
                                    id="termsAgreed"
                                    checked={termsAgreed}
                                    onChange={() => setTermsAgreed(!termsAgreed)}
                                />
                                <label className="form-check-label terms-submit flex gap-1 items-center" htmlFor="termsAgreed">
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
                    {formErrors.termsAgreed.isError && <p className="error-msg">{formErrors.termsAgreed.message}</p>}
                    {errorMSG && <div className="text-red-600 text-center" dangerouslySetInnerHTML={{ __html: errorMSG }}></div>}   
                </div>
                <button type="submit" className="mb-4 relative mb-30 w-full">
                    <Button name="login" shadow>
                        Create Account
                    </Button>
                    <div className="submit-btn"></div>
                </button>
                <div className="have-account">
                    <span>Already have an account? </span>
                    <Link href="/login">Log in</Link>
                </div>
            </form>
        </Auth>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.signup,
    userExists: state.api.CheckUsernameExists,
});

const mapDispatchToProps = {
    signup,
    CheckUsernameExists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

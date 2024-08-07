import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { errorConvertedMessage, validatePassword } from '../util/util';
import { useTranslation } from 'react-i18next';

import Icon from '../components/Icons';
import AppButton from '../components/elements/button';
import Layout from '../components/layout/Layout';
import { ChangePassword } from '../redux/action/apis/auth/changePassword/changePassword';

const ChangePasswordPage = ({ ChangePassword, respond }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({
        oldPassword: { isError: false, message: '' },
        newPassword: { isError: false, message: '' },
        confirmPassword: { isError: false, message: '' },
    });
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const router = useRouter();

    useEffect(() => {
        if (respond) {
            router.push(`/`);
        }
    }, [respond]);

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

        ChangePassword({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        });
    };

    const validateForm = () => {
        const errors = { ...formErrors };

        if (formData.oldPassword.trim() === '') {
            errors.oldPassword = { isError: true, message: 'Old password is required.' };
        } else {
            errors.oldPassword = { isError: false, message: '' };
        }

        const error = validatePassword(formData.newPassword);

        if (error) {
            errors.newPassword = ({ isError: true, message: error });
        } else {
            errors.newPassword = { isError: false, message: '' };
        }

        if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = { isError: true, message: 'Passwords do not match.' };
        } else {
            errors.confirmPassword = { isError: false, message: '' };
        }

        return errors;
    };

    const toggleShowPassword = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <Layout shortheader={true} showTabs={false}>
            <div className="container">
                <div className="mx-auto flex flex-col justify-center items-center text-center my-9 h-changePhoneNumber bg-DS_white max-w-[749px]">
                    <form className='min-w-96' method="post" onSubmit={handleSubmit}>
                        <div className="heading_s1 mb-11">
                            <h1 className="auth-title">{t("Change Password")}</h1>
                        </div>
                        <div className={`mb-4 ${formErrors.oldPassword.isError ? 'error' : ''}`}>
                            <div className='relative password-container'>
                                <input
                                    type={showPasswords.oldPassword ? 'text' : 'password'}
                                    name="oldPassword"
                                    value={formData.oldPassword|| ""}
                                    onChange={handleChange}
                                    placeholder={t("Old Password")}
                                    className={formErrors.oldPassword.isError ? "app-field error" : "app-field"}
                                />
                                <div className="w-5 icon" onClick={() => toggleShowPassword('oldPassword')}>
                                    <Icon className="opacity-40" name={showPasswords.oldPassword ? "eye-slash" : "eye"} />
                                </div>
                            </div>
                            {formErrors.oldPassword.isError && <p className="error-msg">{formErrors.oldPassword.message}</p>}
                        </div>
                        <div className={`mb-4 ${formErrors.newPassword.isError ? 'error' : ''}`}>
                            <div className='relative password-container'>
                                <input
                                    type={showPasswords.newPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={formData.newPassword|| ""}
                                    onChange={handleChange}
                                    placeholder={t("New Password")}
                                    className={formErrors.newPassword.isError ? "app-field error" : "app-field"}
                                />
                                <div className="w-5 icon" onClick={() => toggleShowPassword('newPassword')}>
                                    <Icon className="opacity-40" name={showPasswords.newPassword ? "eye-slash" : "eye"} />
                                </div>
                            </div>
                            {formErrors.newPassword.isError && <p className="error-msg">{formErrors.newPassword.message}</p>}
                        </div>
                        <div className={`mb-4 ${formErrors.confirmPassword.isError ? 'error' : ''}`}>
                            <div className='relative password-container'>
                                <input
                                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword|| ""}
                                    onChange={handleChange}
                                    placeholder={t("Confirm New Password")}
                                    className={formErrors.confirmPassword.isError ? "app-field error" : "app-field"}
                                />
                                <div className="w-5 icon" onClick={() => toggleShowPassword('confirmPassword')}>
                                    <Icon className="opacity-40" name={showPasswords.confirmPassword ? "eye-slash" : "eye"} />
                                </div>
                            </div>
                            {formErrors.confirmPassword.isError && <p className="error-msg">{formErrors.confirmPassword.message}</p>}
                        </div>
                        <button type="submit" className="mb-4 relative mb-30 w-full">
                            <AppButton className='z-0' >{t("Change Password")}</AppButton>
                            <div className="submit-btn"></div>
                        </button>
                        
                    </form>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    respond: state.api.ChangePassword,
});

const mapDispatchToProps = {
    ChangePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);

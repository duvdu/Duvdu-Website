import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { CreateTicket } from '../../redux/action/apis/tickets/createTicket';
import Layout from '../layout/Layout';
import Loading from './loading';
import Button from './button';
import SuccessfullyPosting from "../popsup/post_successfully_posting";
import { useTranslation } from 'react-i18next';
import ErrorMessage from './ErrorMessage';

const ContactUs = ({ CreateTicket, user, api, respond }) => {
    const [post_success, setPost_success] = useState(false);
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        number: '',
        message: ''
    });
    var convertError = respond?.error === 'Token Expired' ? respond?.error : JSON.parse(respond?.error ?? null)?.data?.errors[0]?.message

    useEffect(() => {
        if (user) {
            setFormData({
                username: user?.name || '',
                number: user?.phoneNumber?.number || '',
                message: ''
            });
        }
    }, [user]);

    useEffect(() => {
        if (respond?.message === 'success') {
            setPost_success(true);
        }
    }, [respond?.message]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        if(!formData.username || formData.username.length < 3){
            setErrorMessage(t('Full Name must be at least 3 characters long.'));
            return;
        }
        if(!formData.number){
            setErrorMessage(t('Phone Number must be at least 10 characters long.'));
            return;
        }
        if (formData.message.length < 20) {
            setErrorMessage(t('contact_us.error_short_message'));
            return;
        }

        setErrorMessage("");
        CreateTicket({
            username: formData.username,
            phoneNumber: formData.number,
            message: formData.message,
        });
    };

    const toggleDrawer = () => {
        setPost_success(false);
        if (user) {
            setFormData({
                username: user?.name || '',
                number: user?.phoneNumber?.number || '',
                message: ''
            });
        } else {
            setFormData({
                username: '',
                number: '',
                message: ''
            });
        }
    };

    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={toggleDrawer} message={t("contact_us.success_message")} />
            <Layout>
                <div className='container py-10'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                        <div className='contact-form-container'>
                            <h1 className='text-3xl md:text-4xl mb-8'>{t("contact_us.heading")}</h1>

                            <form className='flex flex-col gap-6'>
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder={t("contact_us.full_name")}
                                        className='app-field'
                                        disabled={user?.username}
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        placeholder={t("contact_us.phone_number")}
                                        disabled={user?.phoneNumber?.number}
                                        className='app-field'
                                    />
                                </div>

                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t("contact_us.message")}
                                        className='app-field !h-48'
                                        required
                                    />
                                </div>
                                <div className='text-center'>
                                    <ErrorMessage ErrorMsg={convertError}/>
                                </div>

                                <div className='text-center'>
                                    {errorMessage && <div className="text-rose-500 text-sm mt-2">{errorMessage}</div>}
                                    <Button disable={respond?.loading} className="w-full mb-7 mt-7" shadow={true} onClick={handleSubmit}>
                                        {respond?.loading ? <Loading /> : t('contact_us.send')}
                                    </Button>
                                </div>
                            </form>

                            {/* 👇 طرق الاتصال بنا - أسفل الفورم */}
                            <div className='mt-10'>
                                <h2 className="text-lg font-semibold mb-2">{t("contact_us.talk_title")}</h2>
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <strong className="text-sm text-gray-700">📞 {t("contact_us.phone")}:</strong>
                                        <a href="tel:+201282221544" className="text-sm text-blue-600 hover:underline">
                                            +20 128 222 1544
                                        </a>
                                    </div>
                                    <div className="hidden md:inline-block w-px h-5 bg-gray-300"></div>
                                    <div className="flex items-center gap-2">
                                        <strong className="text-sm text-gray-700">✉️ {t("contact_us.email")}:</strong>
                                        <a href="mailto:info@duvdu.com" className="text-sm text-blue-600 hover:underline">
                                            info@duvdu.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='contact-image-container'>
                            <img
                                src="/assets/imgs/theme/contact_us.png"
                                alt={t("contact_us.heading")}
                                className='w-full h-auto rounded-lg shadow-lg'
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.CreateTicket,
    user: state.user.profile
});

const mapDispatchToProps = {
    CreateTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);

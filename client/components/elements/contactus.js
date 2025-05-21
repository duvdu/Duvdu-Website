import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { CreateTicket } from '../../redux/action/apis/tickets/createTicket';
import Layout from '../layout/Layout';
import Loading from './loading';
import Button from './button';
import SuccessfullyPosting from "../popsup/post_successfully_posting";

import { useTranslation } from 'react-i18next';


const ContactUs = ({ CreateTicket, user, api,respond }) => {
    const [post_success, setPost_success] = useState(false);
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        number: '',
        message: ''
    });
    useEffect(()=>{
        if(user){
            setFormData({
                username: user?user.name:'',
                number: user?user.phoneNumber.number:'',
                message: ''
            })    
        }
    },[user])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        if (respond?.message=='success')
            setPost_success(true)
    }, [respond?.message])
    const handleSubmit = () => {
        if (formData.message.length < 20) {
            setErrorMessage(t('Your message must be at least 20 characters long.'));
            return;
        }

        setErrorMessage("");
        CreateTicket({
            username: formData.username,
            phoneNumber: formData.number,
            message: formData.message,
        });
    }
    const toggleDrawer = () => {
        setPost_success(false)
        if(user){
            setFormData({
                username: user?user.name:'',
                number: user?user.phoneNumber.number:'',
                message: ''
            })
        }else{
            setFormData({
                username: '',
                number: '',
                message: ''        
            })
        }
    }
    return (
    <>
        <SuccessfullyPosting isShow={post_success} onCancel={toggleDrawer} message="Send Ticket" />
        <Layout>
            <div className='container py-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                    <div className='contact-form-container'>
                        <h1 className='text-3xl md:text-4xl mb-8'>Got Something On Your Mind? Hit Us Up Now</h1>
                        
                        <form className='flex flex-col gap-6'>
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Full Name"
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
                                    placeholder="Phone Number"
                                    disabled={user?.phoneNumber?.number}
                                    className='app-field'
                                />
                            </div>
                            
                            <div>
                                <textarea
                                    type="text"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    className='app-field !h-48'
                                    required
                                />
                            </div>
                            <div className='text-center'>
                            {errorMessage && <div className="text-rose-500 text-sm mt-2">{errorMessage}</div>}
                            <Button disable={respond?.loading} className="w-full mb-7 mt-7" shadow={true} onClick={handleSubmit} >
                                {respond?.loading ? 
                                <Loading/>:
                                t('Send Message')
                                }
                            </Button>
                            </div>
                        </form>
                    </div>
                    
                    <div className='contact-image-container'>
                        <img 
                            src="/assets/imgs/theme/contact_us.png" 
                            alt="Contact Us" 
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


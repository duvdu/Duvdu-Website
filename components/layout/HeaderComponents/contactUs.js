import Button from '../../elements/button';
import Icon from "../../Icons";
import { connect } from "react-redux";
import { CreateTicket } from '../../../redux/action/apis/tickets/createTicket';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { errorConvertedMessage } from '../../../util/util';

const ContactUs = ({ setOpened, CreateTicket, user, api,respond }) => {
    const { t } = useTranslation();
    const [textareavalue, setTextareavalue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        if(respond)
            setOpened(0)
    }, [respond?.message])
    

    const handleSendMessage = () => {
        if (textareavalue.length < 20) {
            setErrorMessage(t('Your message must be at least 20 characters long.'));
            return;
        }

        setErrorMessage("");
        CreateTicket({
            username: user.username,
            phoneNumber: user.phoneNumber.number,
            message: textareavalue,
        });
    }
    return (
        <>
            <div className='flex gap-3 z-50'>
                <div onClick={() => setOpened(0)} className='rounded-full header-border h-14 w-14 flex justify-center items-center cursor-pointer'>
                    <Icon className="text-xl size-5" name={'xmark'} />
                </div>
                <span className='flex justify-center items-center rounded-full header-border px-7 h-14 text-lg font-medium'>
                    {t('contact us')}
                </span>
            </div>
            <div className="capitalize opacity-60 mt-8">{t('your message')}</div>
            <textarea
                placeholder="start typing..."
                className="bg-[#9999991A] rounded-3xl h-48 border-none mt-5"
                onChange={(event) => {
                    setTextareavalue(event.target.value)
                }} />
            {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
            <Button className="w-full mb-7 mt-7" shadow={true} onClick={handleSendMessage} >
                {t('Send')}
            </Button>
        </>
    )
}


const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.CreateTicket,
    user: state.user.profile
});

const mapDispatchToProps = {
    CreateTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
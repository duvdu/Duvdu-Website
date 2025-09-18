import Button from '../../elements/button';
import Icon from "../../Icons";
import { connect } from "react-redux";
import { CreateTicket } from '../../../redux/action/apis/tickets/createTicket';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { errorConvertedMessage } from '../../../util/util';
import Loading from '../../elements/loading';

const ContactUs = ({ setOpened, CreateTicket, user , isLogin, api,respond }) => {
    const { t } = useTranslation();
    const [textareavalue, setTextareavalue] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if(respond?.message=='success'){
            setOpened(0)
            setTextareavalue("")
            setUsername("")
            setPhoneNumber("")
            CreateTicket({message:''})
        }
    }, [respond?.message])

    const handleSendMessage = () => {
        if (textareavalue.length < 20) {
            setErrorMessage(t('Your message must be at least 20 characters long.'));
            return;
        }

        setErrorMessage("");
        CreateTicket({
            username: isLogin ? user.username : username,
            phoneNumber: isLogin ? user.phoneNumber.number : phoneNumber,
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
            {!isLogin && (
                <>
            <div className="capitalize opacity-60 mt-4">{t('name')}</div>
            <input
                className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 px-4 py-2 w-full"
                placeholder={t('name')}
                onChange={(event) => {
                    setUsername(event.target.value)
                }} />
            <div className="capitalize opacity-60 mt-4">{t('phone number')}</div>
            <input
                className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 px-4 py-2 w-full"
                placeholder={t('phone number')}
                onChange={(event) => {
                    setPhoneNumber(event.target.value)
                }} />
                </>
            )}
            <div className="capitalize opacity-60 mt-4">{t('your message')}</div>
            <textarea
                placeholder={t("start typing...")}
                className="bg-[#9999991A] rounded-3xl h-48 border-none mt-5"
                onChange={(event) => {
                    setTextareavalue(event.target.value)
                }} />
            {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
            <Button disable={respond?.loading} className="w-full mb-7 mt-7" shadow={true} onClick={handleSendMessage} >
                {respond?.loading ? 
                <Loading/>:
                t('Send')
                }
            </Button>
        </>
    )
}


const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.CreateTicket,
    isLogin: state.auth.login,
    user: state.user.profile
});

const mapDispatchToProps = {
    CreateTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
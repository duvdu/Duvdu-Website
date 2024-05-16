import Icon from '../Icons';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { GetAllMessageInChat } from '../../redux/action/apis/realTime/messages/getAllMessageInChat';
import { SendMessages } from '../../redux/action/apis/realTime/messages/sendmessage';
import { UpdateFormData } from '../../redux/action/logic/forms/Addproject';
import { convertToFormData, handleMultipleFileUpload } from '../../util/util';
import dateFormat from "dateformat";

const Chat = ({ user, respond, GetAllMessageInChat, messages, SendMessages, UpdateFormData, addprojectState }) => {
    const formData = addprojectState.formData;
    const chatRef = useRef(null);
    const [otherUser, setOtherUser] = useState({})

    function checkIsMe(writer) {
        return writer._id == user.profile._id
    }

    useEffect(() => {
        if (respond)
            ClearChatInput()
    }, [respond?.message])


    const attachmentsUpload = (e) => {
        UpdateFormData('attachments', handleMultipleFileUpload(e))
    };

    function getotherdata() {
        for (let i = 0; i < messages.list.length; i++) {
            const element = messages.list[i];
            if (!checkIsMe(element.sender)) {
                return element.sender
            }
            if (!checkIsMe(element.receiver)) {
                return element.receiver
            }
        }
        return { _id: messages._id }
    }

    useEffect(() => {
        UpdateFormData('receiver', otherUser._id)
    }, [otherUser])

    useEffect(() => {
        // Scroll to the bottom of the chat when component updates
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        setOtherUser(getotherdata())
    }, [messages]);


    function onClose() {
        GetAllMessageInChat(null)
        ClearChatInput()
    }

    const onSend = () => {
        const data = convertToFormData(formData)
        SendMessages(data)
    }
    const onChange = (event) => {
        UpdateFormData('content', event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && formData.content.length > 0) {
            onSend()
        }
    };

    const ClearChatInput = () => {
        UpdateFormData('content', '')
        UpdateFormData('attachments', null)
    };

    return (
        <div className={`fixed bottom-0 z-20 ${messages.openchat == true ? '' : 'hidden'}`}>
            <div onClick={onClose} className='fixed w-screen h-screen bg-black opacity-60 top-0 left-0' />

            {messages.openchat &&
                <div className="chat dark:bg-[#1A2024] w-full sm:w-[422px] h-[38rem] relative flex flex-col justify-between rounded-lg bg-DS_white shadow-xl sm:left-8">
                    <div className="flex p-2 h-16 border-b border-[#00000040] dark:border-[#FFFFFF40]">
                        <a href={`/creative/${otherUser.username || ""}`} className="relative cursor-pointer">
                            <img className="h-full object-cover aspect-square rounded-full" src={otherUser.profileImage || process.env.DEFULT_PROFILE_PATH} alt='user' />
                            {otherUser.isOnline && (
                                <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full right-0 -translate-y-3" />
                            )}
                            {!otherUser.isOnline && (
                                <div className="absolute w-4 h-4 bg-gray-500 border-2 b order-white rounded-full right-0 -translate-y-3" />
                            )}
                        </a>
                        <div className="px-3">
                            <a href={`/creative/${otherUser.username || ""}`} className="capitalize font-bold text-black">
                                {otherUser.name}
                            </a>
                            <div />
                            <span className="capitalize">away . Avg. response time : <span className="font-bold"> 1 Hour</span> </span>
                        </div>
                    </div>
                    <div onClick={onClose} className='absolute right-4 top-4 cursor-pointer'>
                        <Icon name={'xmark'} className='text-xl opacity-50 w-3' />
                    </div>
                    <div className="messages-chat h-full" id="chat" ref={chatRef}>

                        {messages.list.map((message, index) => {
                            if (message.type === 'time') {
                                return (
                                    <div key={index} className="time">
                                        {message.data}
                                    </div>
                                );
                            } else if (checkIsMe(message.sender)) {
                                return <Me key={index} message={message} />
                            } else if (!checkIsMe(message.sender)) {
                                return <Other key={index} message={message} />
                            } else if (message.type === 'typing other') {
                                return (
                                    <div key={index} className="message other">
                                        <div className="typing typing-1"></div>
                                        <div className="typing typing-2"></div>
                                        <div className="typing typing-3"></div>
                                    </div>
                                );
                            }
                            else if (message.type === 'typing me') {
                                return (
                                    <div key={index} className="message me">
                                        <div className="typing typing-1"></div>
                                        <div className="typing typing-2"></div>
                                        <div className="typing typing-3"></div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    {
                        formData.attachments &&
                        <div className='flex flex-wrap gap-1 p-2 relative'>
                            {
                                formData.attachments.map((file, index) =>
                                    file.fileType.includes('image') ? <Icon key={index} name={'image'} className="size-10 text-gray-400" /> : <Icon key={index} name={'file'} className="size-10" />
                                )
                            }
                            <div onClick={() => { UpdateFormData('attachments', null) }}>
                                <Icon name={'xmark'} className='text-xl opacity-50 w-3 absolute right-4 top-3 cursor-pointer' />
                            </div>
                        </div>
                    }
                    <div className="flex items-center dark:bg-[#4d4c4c] p-3 ">
                        <input value={formData.content} onChange={onChange} name='content' onKeyDown={handleKeyPress} className='border-none bg-transparent w-full h-min' placeholder="Write a message..." type="text" />
                        <label htmlFor="attachment-upload" >
                            <Icon className="cursor-pointer" name={'attachment'} />
                        </label>
                        <input onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
                        <div className='cursor-pointer bg-primary rounded-full p-3 h-min ml-3'>
                            <Icon name={'microphone'} />
                        </div>
                    </div>
                </div>}
        </div>

    );
};

const Me = ({ message }) =>
    <div className="message me">
        <div className='flex-col'>
            <div>
                <span className='text-white'>
                    {message.content}
                </span>
            </div>
            <div className='w-full text-end'>
                <span className='text-white text-xs'>
                    {dateFormat(message.updatedAt, 'hh:mm')}
                </span>
            </div>
        </div>
    </div>

const Other = ({ message }) =>
    <div className="message other bg-DS_white">
        <div>
            <span className='text-[#1B1A57]'>
                {message.content}
            </span>
        </div>
        <div className='w-full text-start'>
            <span className='text-[#A1A1BC] text-xs'>
                {dateFormat(message.updatedAt, 'hh:mm')}
            </span>
        </div>
    </div>


const mapStateToProps = (state) => ({
    respond: state.api.SendMessages,
    getheaderpopup: state.setting.headerpopup,
    messages: state.messages,
    user: state.user,
    addprojectState: state.addproject,
})
const mapDispatchToProps = {
    GetAllMessageInChat,
    SendMessages,
    UpdateFormData,

};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
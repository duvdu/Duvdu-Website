import Icon from '../Icons';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { GetAllMessageInChat } from '../../redux/action/apis/realTime/messages/getAllMessageInChat';
import { SendMessages } from '../../redux/action/apis/realTime/messages/sendmessage';
import { convertToFormData, handleMultipleFileUpload } from '../../util/util';
import dateFormat from "dateformat";
import ChatComponent from './recording';
import AudioRecorder from './recording';
import Waveform from './audioRecordWave';

const Chat = ({ user, respond, GetAllMessageInChat, messages, SendMessages }) => {
    const chatRef = useRef(null);
    const [otherUser, setOtherUser] = useState({})
    const [limit, setLimit] = useState(100)
    const [record, setrecord] = useState(null)
    ///////////// inputs //////////////

    ///////////// audio //////////////
    const [audioSrc, setaudioSrc] = useState(null)
    const [recordobject, setRecordobject] = useState(null)
    ///////////// attachment //////////////
    const [attachments, setAttachments] = useState(null)
    const [_attachments, _setAttachments] = useState(null)
    ///////////// content //////////////
    const [content, setContent] = useState(null)
    ///////////// receiver //////////////
    const [receiver, setReceiver] = useState(null)

    ///////////////////////////

    useEffect(() => {
        if (respond)
            ClearChatInput()
    }, [respond])

    useEffect(() => {
        setReceiver(otherUser._id)
    }, [otherUser])

    // useEffect(() => {
    //     GetAllMessageInChat(messages._id, limit)
    // }, [limit]);


    useEffect(() => {
        // Scroll to the bottom of the chat when component updates
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        setOtherUser(getotherdata())
        if(messages.list)
        messages.list.reverse()

    }, [messages]);

    useEffect(() => {
        const handleScroll = () => {
            if (chatRef.current && chatRef.current.scrollTop === 0) {
                loadMore();
            }
        };

        const chatElement = chatRef.current;
        if (chatElement) {
            chatElement.addEventListener('scroll', handleScroll);
        }

        // Cleanup the event listener on component unmount
        return () => {
            if (chatElement) {
                chatElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    //////////////////// helpers /////////////////////////
    const ClearChatInput = () => {
        setContent("")
        setRecordobject(null)
        setaudioSrc(null)
        clearattachments()
    };
    const clearattachments = () => {
        setAttachments(null)
        _setAttachments(null)
    };
    const attachmentsUpload = (e) => {
        setAttachments(handleMultipleFileUpload(e))
        _setAttachments(event.target.files)
    };
    function checkIsMe(writer) {
        return writer._id == user.profile._id
    }
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


    const loadMore = () => {
        setLimit(prev => prev + 10)
        console.log('Loading more messages...');
        // Your custom logic to load more messages
    };

    function onClose() {
        GetAllMessageInChat(null)
        ClearChatInput()
    }

    const onSend = () => {
        const data = new FormData
        data.append('receiver', receiver)

        if (recordobject) {
            data.append('attachments', recordobject)
            data.append('content', "NONE")
        }
        else
            data.append('content', content)
        data.append('attachments', _attachments);


        //////// SENDING MESSAGE ///////////////
        SendMessages(data)
    }
    const onChange = (event) => {
        setContent(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && content.length > 0) {
            onSend()
        }
    };




    const recording = (url, object) => {
        setaudioSrc(url)
        setRecordobject(object)
    };

    const startRecording = () => {
        setrecord(!record)
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
                        attachments &&
                        <div className='flex flex-wrap gap-1 p-2 relative'>
                            {
                                attachments?.map((file, index) =>
                                    file.fileType.includes('image') ? <Icon key={index} name={'image'} className="size-10 text-gray-400" /> : <Icon key={index} name={'file'} className="size-10" />
                                )
                            }
                            <div onClick={clearattachments}>
                                <Icon name={'xmark'} className='text-xl opacity-50 w-3 absolute right-4 top-3 cursor-pointer' />
                            </div>
                        </div>
                    }

                    <div className="flex justify-end items-center dark:bg-[#4d4c4c] p-3 ">
                        <AudioRecorder
                            isstartRecording={record}
                            recordingoutput={recording}
                        />
                        {audioSrc ? (
                            <div className="w-full max-w-md flex items-center">
                                <audio controls controlsList="nodownload" src={audioSrc} className="w-full outline-none"></audio>
                                <div className='cursor-pointer bg-red-500 rounded-full p-3 h-min ml-3' onClick={() => setaudioSrc(null)}>
                                    <Icon className='size-4 text-white' name={'xmark'} />
                                </div>
                            </div>) :
                            <>
                                {!record &&
                                    <input value={content} onChange={onChange} name='content' onKeyDown={handleKeyPress} className='border-none bg-transparent w-full h-min' placeholder="Write a message..." type="text" />
                                }
                                <label htmlFor="attachment-upload" >
                                    <Icon className="cursor-pointer" name={'attachment'} />
                                </label>
                                <input onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
                                <div className='cursor-pointer bg-primary rounded-full p-3 h-min ml-3' onClick={startRecording}>
                                    {!record ?
                                        <Icon name={'microphone'} /> :
                                        <Icon className='size-5 text-white' name={'stop'} />}
                                </div>
                            </>
                        }

                        {
                            !record && (content?.length > 0 || audioSrc) &&
                            <div className='cursor-pointer bg-primary rounded-full p-3 h-min ml-3' onClick={onSend}>
                                <Icon className='size-4 text-white' name={'paper-plane'} />
                            </div>
                        }

                    </div>
                </div>}
        </div>

    );
};

const Me = ({ message }) => {
    return <div className="message me">
        <div className='flex-col'>
            <div>
                <span className='text-white'>
                    {message.content}
                </span>
            </div>
            <div className='flex flex-wrap gap-2'>
            {(message.media?.length || false) && message.media?.map((media, index) => (
                media.type && (
                    media.type.includes('image') ?
                    <img key={index} src={media.url} className='h-28' alt="media" /> :
                    <a href={media.url}>

                    <Icon key={index} name={'file'} className="size-10" />
                    </a>
                )
            ))}
            </div>
            <div className='w-full text-end'>
                <span className='text-white text-xs'>
                    {dateFormat(message.updatedAt, 'hh:mm')}
                </span>
            </div>
        </div>
    </div>
}

const Other = ({ message }) => {
    return (
        <div className="message other bg-DS_white">
            <div>
                <span className='text-[#1B1A57]'>
                    {message.content}
                </span>
            </div>
            {(message.media?.length || false) && message.media?.map((media, index) => (
                media.type && (
                    media.type.includes('image') ?
                        <img key={index} src={media.url} className='h-28' alt="media" /> :
                        <Icon key={index} name={'file'} className="size-10" />
                )
            ))}
            <div className='w-full text-start'>
                <span className='text-[#A1A1BC] text-xs'>
                    {dateFormat(message.updatedAt, 'hh:mm')}
                </span>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    respond: state.api.SendMessages,
    getheaderpopup: state.setting.headerpopup,
    messages: state.messages,
    user: state.user,

})
const mapDispatchToProps = {
    GetAllMessageInChat,
    SendMessages,

};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
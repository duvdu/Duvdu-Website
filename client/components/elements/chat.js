import Icon from '../Icons';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { GetAllMessageInChat } from '../../redux/action/apis/realTime/messages/getAllMessageInChat';
import { SendMessages } from '../../redux/action/apis/realTime/messages/sendmessage';
import { convertToFormData, handleMultipleFileUpload, handleRemoveEvent } from '../../util/util';
import dateFormat from "dateformat";
import ChatComponent from './recording';
import AudioRecorder from './recording';
import Waveform from './audioRecordWave';
import Link from 'next/link';
import PopUpImage from './popUpImage';

const Chat = ({ user, respond, GetAllMessageInChat, messages, SendMessages, api }) => {
    const chatRef = useRef(null);
    const [messagesList, setMessagesList] = useState([])
    const [otherUser, setOtherUser] = useState({})
    const [limit, setLimit] = useState(50)
    const [isRecording, setIsRecord] = useState(null)
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

        if (respond?.data)
            setMessagesList((prevMessages) => [respond?.data,...prevMessages]);

    }, [respond])

    useEffect(() => {
        setReceiver(otherUser._id)
    }, [otherUser])

    useEffect(() => {
        GetAllMessageInChat(messages._id, limit)
    }, [limit]);

    useEffect(() => {
        if(messages.list)
        setMessagesList(messages.list)
    }, [messages.list]);


    useEffect(() => {
        // Scroll to the bottom of the chat when component updates
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        setOtherUser(getotherdata())

    }, [messages]);
    console.log(messagesList)
    const msglist = [...messagesList]
    msglist.reverse()

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
        for (let i = 0; i < msglist.length; i++) {
            const element = msglist[i];
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
        setLimit(prev => prev + 50)
        // Your custom logic to load more messages
    };

    function onClose() {
        GetAllMessageInChat(null)
        ClearChatInput()
    }

    const onSend = async () => {
        const data = new FormData()
        data.append("receiver", receiver)

        if (attachments)
            for (let i = 0; i < attachments.length; i++) {
                const file = attachments[i];
                data.append(`attachments`, file.file);
            }

        if (recordobject) {
            const wavFile = new File([recordobject], 'audio.wav', { type: 'audio/wav' });
            data.append('attachments', wavFile)
            data.append('content', "NULL")
        }
        else
            data.append('content', content)
        // data.append('attachments', _attachments);


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

    const swapRecording = () => {
        setIsRecord(!isRecording)
    };

    return (
        <div className={`fixed bottom-0 z-20 ${messages.openchat ? '' : 'hidden'}`}>
            <div onClick={onClose} className='fixed w-screen h-screen bg-black opacity-60 top-0 left-0' />
            {messages.openchat &&
                <div className="chat dark:bg-[#1A2024] w-full sm:w-[422px] h-[38rem] relative flex flex-col justify-between rounded-lg bg-DS_white shadow-xl sm:left-8">
                    <div className="flex p-2 h-16 border-b border-[#00000040] dark:border-[#FFFFFF40]">
                        <Link href={`/creative/${otherUser.username || ""}`} >
                            <div className="relative cursor-pointer">
                                <img className="h-full object-cover object-top aspect-square rounded-full" src={otherUser.profileImage || process.env.DEFULT_PROFILE_PATH} alt='user' />
                                {otherUser.isOnline && (
                                    <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full right-0 -translate-y-3" />
                                )}
                                {!otherUser.isOnline && (
                                    <div className="absolute w-4 h-4 bg-gray-500 border-2 b order-white rounded-full right-0 -translate-y-3" />
                                )}
                            </div>
                        </Link>
                        <div className="px-3">
                            <Link href={`/creative/${otherUser.username || ""}`} >
                                <div className="capitalize font-bold text-black cursor-pointer">
                                    {otherUser.name}
                                </div>
                            </Link>
                            <div />
                            <span className="capitalize">away . Avg. response time : <span className="font-bold"> 1 Hour</span> </span>
                        </div>
                    </div>
                    <div onClick={onClose} className='absolute right-4 top-4 cursor-pointer'>
                        <Icon name={'xmark'} className='text-xl opacity-50 w-3' />
                    </div>
                    <div className="messages-chat h-full" id="chat" ref={chatRef}>

                        {msglist.map((message, index) => {

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
                        <div className='flex flex-wrap gap-1 p-2 relative max-h-56 overflow-y-scroll'>
                            {attachments?.map((file, index) => {
                                switch (true) {
                                    case file.fileType.includes('image'):
                                        return (
                                            <PopUpImage key={index}>
                                                <img src={URL.createObjectURL(file.file)} className="size-48 text-gray-400" />
                                            </PopUpImage>
                                        );

                                    case file.fileType.includes('video'):
                                        return (
                                            <div key={index} className="size-48 text-gray-400">
                                                <video controls>
                                                    <source src={URL.createObjectURL(file.file)} type={file.fileType} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        );

                                    default:
                                        return (
                                            <Icon key={index} name={'file'} className="size-10" />
                                        );
                                }
                            })}
                            <button className="absolute top-0 right-0 m-2 text-white cursor-pointer bg-red rounded-full size-6 flex justify-center items-center" onClick={clearattachments}>
                                <Icon className='p-1' name={"xmark"} />
                            </button>

                        </div>
                    }

                    <div className="flex justify-end items-center dark:bg-[#4d4c4c] p-3 ">
                        <AudioRecorder
                            isstartRecording={isRecording}
                            recordingoutput={recording}
                        />
                        {audioSrc ? (
                            <div className="w-full max-w-md flex items-center">
                                <audio controls controlsList="nodownload" src={audioSrc} className="w-full outline-none"></audio>
                                <div className='cursor-pointer bg-red rounded-full p-3 h-min ml-3' onClick={() => setaudioSrc(null)}>
                                    <Icon className='size-4 text-white' name={'xmark'} />
                                </div>
                            </div>) :
                            <>
                                {!isRecording &&
                                    <input
                                        value={content || ""}
                                        onChange={onChange}
                                        name='content'
                                        onKeyDown={handleKeyPress}
                                        className='border-none bg-transparent w-full h-min'
                                        placeholder="Write a message..."
                                        type="text"
                                        accept="video/*,audio/*,image/*,.pdf" />
                                }
                                <label htmlFor="attachment-upload" >
                                    <Icon className="cursor-pointer" name={'attachment'} />
                                </label>
                                <input onClick={handleRemoveEvent} onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
                                <div className='cursor-pointer bg-primary rounded-full p-3 h-min ml-3' onClick={swapRecording}>
                                    {!isRecording ?
                                        <Icon name={'microphone'} /> :
                                        <Icon className='size-5 text-white' name={'stop'} />
                                    }
                                </div>
                            </>
                        }

                        {
                            !isRecording && (content?.length > 0 || audioSrc) &&
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
    return (
        (message?.media[0]?.type === "audio/wav") ?
            <div className="ml-20 mt-2">
                <audio controls controlsList="nodownload">
                    <source src={process.env.ASSETS_URL + message?.media[0]?.url} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            </div> :
            <div className="message me">
                <div className="flex-col">
                    <div>
                        <span className="text-white">
                            {message.content}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {
                            message.media?.length > 0 &&
                            message.media?.map((media, index) => {
                                if (media.type.includes("image")) {
                                    return (
                                        <PopUpImage key={`image-${index}`}>
                                            <img src={"https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + media.url} alt="media" className='cursor-pointer' />
                                        </PopUpImage>
                                    );
                                } else if (media.type.includes("video")) {
                                    return (
                                        <video key={`video-${index}`} controls className='size-48'>
                                            <source src={"https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + media.url} type={media.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    );
                                } else {
                                    return (
                                        <a href={"https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + media.url} key={`file-${index}`} target="_blank" rel="noopener noreferrer">
                                            <div className='relative size-14 flex justify-center items-center cursor-pointer'>
                                                <Icon name="file" className="absolute size-full opacity-50" />
                                                <Icon name="download" className="absolute size-8 opacity-40 hover:opacity-100" />
                                            </div>
                                        </a>
                                    );
                                }
                            })
                        }
                    </div>
                    <div className="w-full text-end">
                        <span className="text-white text-xs">
                            {dateFormat(message.updatedAt, 'hh:mm')}
                        </span>
                    </div>
                </div>
            </div>
    );
};

const Other = ({ message }) => {

    return ((message?.media[0]?.type === "audio/wav") ?
        <div className="ml-20 mt-2">
            <audio controls controlsList="nodownload">
                <source src={process.env.ASSETS_URL + message?.media[0]?.url} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
        </div> : <div className="message other bg-DS_white">
            {
                !message.content != "NULL" &&
                <div>
                    <span className="text-[#1B1A57]">
                        {message.content}
                    </span>
                </div>
            }
            <div className="flex flex-wrap gap-2">
                {
                    message.media?.length > 0 &&
                    message.media?.map((media, index) => {
                        if (media.type === "audio/wav") {
                            return (
                                <audio key={`audio-${index}`} controls controlsList="nodownload">
                                    <source src={process.env.ASSETS_URL + media.url} controlsList="nodownload" type="audio/wav" />
                                    Your browser does not support the audio element.
                                </audio>
                            );
                        } else if (media.type === "image/png") {
                            return (
                                <img key={`image-${index}`} src={process.env.ASSETS_URL + media.url} className="h-28" alt="media" />
                            );
                        } else {
                            return (
                                <Icon key={`file-${index}`} name="file" className="size-10" />
                            );
                        }
                    })}
            </div>
            <div className="w-full text-start">
                <span className="text-[#A1A1BC] text-xs">
                    {dateFormat(message.updatedAt, 'hh:mm')}
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.SendMessages,
    getheaderpopup: state.setting.headerpopup,
    chat_respond: state.api.GetAllMessageInChat,
    messages: state.messages,
    user: state.user,

})
const mapDispatchToProps = {
    GetAllMessageInChat,
    SendMessages,

};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
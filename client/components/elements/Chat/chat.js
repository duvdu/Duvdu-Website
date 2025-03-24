import Icon from '../../Icons';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { GetAllMessageInChat } from '../../../redux/action/apis/realTime/messages/getAllMessageInChat';
import { SendMessages } from '../../../redux/action/apis/realTime/messages/sendmessage';
import { convertToFormData, handleMultipleFileUpload, handleRemoveEvent, } from '../../../util/util';
import { useTranslation } from 'react-i18next';
import { io } from "socket.io-client";

import dateFormat from "dateformat";
import AudioRecorder from '../recording';
import Link from 'next/link';
import PopUpImage from '../popUpImage';
import DuvduLoading from '../duvduLoading';
import AudioPlayer from './AudioPlayer';

import Me from './Me';
import Other from './Other';
const CacheHelper = {
    get: function (name) {
      if (typeof document !== 'undefined') { // Ensure we are on the client-side
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
      return null;
    }
  };
  
  
const Chat = ({ user, respond, GetAllMessageInChat, messages, SendMessages,chat_respond, api , isLogin }) => {
    const { t } = useTranslation();
    const chatRef = useRef(null);
    const [messagesList, setMessagesList] = useState([])
    const [otherUser, setOtherUser] = useState({})
    const [limit, setLimit] = useState(1000)
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
    const [socket, setSocket] = useState(null);
    const [newMessage, setNewMessage] = useState('');


        const videoRef = useRef(null);
        useEffect(() => {
            if (videoRef.current) {
                videoRef.current.play();
                videoRef.current.muted = true;     
                const timeout = setTimeout(() => {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }, 300); 
                return () => clearTimeout(timeout);
            }
        }, [videoRef.current]);
    useEffect(() => {
        if(chat_respond?.user?._id)
        setReceiver(chat_respond.user._id)
    }, [chat_respond?.user?._id])    
    useEffect(() => {
      const socketInstance = io(process.env.BASE_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        // reconnection: true,
        // reconnectionAttempts: 5,
        // reconnectionDelay: 1000,    
      });
      socketInstance.on("connect", () => console.log("Connected to socket"));
      setSocket(socketInstance);

      // Listen to a sample event from the server
      socketInstance.on('new_message', (data) => {
            console.log({data})
            setMessagesList((prev)=> [...prev ,data.message ])
      });
      
      socketInstance.on('disconnect', () => {
        // console.log('Disconnected from server');
      });
      
      // Cleanup on component unmount
      return () => {
        socketInstance.disconnect();
      };
    }, []);
    useEffect(() => {
        if (respond?.data)

            setMessagesList((prevMessages) => [...prevMessages,respond?.data]);

    }, [respond])

    useEffect(() => {
        if(receiver)
        GetAllMessageInChat(receiver, limit)
    }, [limit]);

    useEffect(() => {
        if (messages.list)
            setMessagesList(messages.list)
    }, [messages.list]);
    // useEffect(()=>{
    //     if(newMessage)
    //     setMessagesList((prev)=> [...prev ,newMessage.message ])
    // },[newMessage])
    // const messagesList = [...messagesList]
    useEffect(() => {
        // Scroll to the bottom of the chat when component updates
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        // setOtherUser(getotherdata())
        

    }, [JSON.stringify(messagesList)]);


    // messagesList.reverse()

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
        return writer._id == user?.profile?._id
    }
    function getotherdata() {
        for (let i = 0; i < messagesList.length; i++) {
            const element = messagesList[i];
            if (!checkIsMe(element.sender)) {
                return element.sender
            }
            if (!checkIsMe(element.receiver)) {
                return element.receiver
            }
        }
        return { _id: receiver }
    }
      const loadMore = () => {
        if(chat_respond?.pagination?.currentPage < chat_respond?.pagination?.totalPages)
        setLimit(prev => prev + 100)
        // Your custom logic to load more messages
    };

    function onClose() {
        GetAllMessageInChat(null)
        ClearChatInput()
    }
    try {
        useEffect(() => {
            onClose()
        }, [window.location.href]);
    }
    catch (error) {

    }
    useEffect(()=>{
        if(isLogin===false)
        onClose()
    },[isLogin])
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
            // data.append('content', "")
        }
        else if(content)
            data.append('content', content)
        // data.append('attachments', _attachments);


        //////// SENDING MESSAGE ///////////////
        SendMessages(data).then(()=>{
            if(attachments){
                GetAllMessageInChat(receiver, limit)
            }
        })
        ClearChatInput()
    }
    const onChange = (event) => {
        setContent(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && content?.length > 0) {
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
    const [currentAudio, setCurrentAudio] = useState(null); // The currently playing audio element

    const playAudio = (audioElement, setIsPlaying) => {
      if (currentAudio && currentAudio.audio !== audioElement) {
        currentAudio.audio.pause();
        currentAudio.setIsPlaying(false); // Pause the previous audio and update state
      }
  
      setCurrentAudio({ audio: audioElement, setIsPlaying });
    };
    // const playAudio = (audioToPlay, setIsPlaying) => {
    //     // Find all audio elements or audio references in the context (e.g., an array of all audioRefs)
    //     audioRefs.forEach((audioRef) => {
    //       if (audioRef !== audioToPlay) {
    //         audioRef.pause(); // Pause other audios
    //         setIsPlaying(false); // Set their state to paused
    //       }
    //     });
    //   };
    return (
        <div className={`fixed bottom-0 z-[100] md:px-8 ${messages.openchat ? '' : 'hidden'}`} >
            <div onClick={onClose} className='fixed w-screen h-screen bg-black opacity-60 top-0 left-0' />
            {messages.openchat &&
                <div className="chat w-screen sm:w-[400px] h-[38rem] relative flex flex-col justify-between rounded-lg bg-white dark:bg-[#1A2024] shadow-xl">
                    <div className="flex p-2 h-16 border-b border-[#00000040] dark:border-[#FFFFFF40]">
                        <Link href={`/creative/${chat_respond?.user?.username || ""}`} >
                            <div className="relative cursor-pointer">
                                <img className="h-full object-cover object-top aspect-square rounded-full" src={chat_respond?.user?.profileImage || process.env.DEFULT_PROFILE_PATH} alt='user' />
                                <div className={`absolute ${chat_respond?.user?.isOnline?'bg-green-500':'bg-gray-500'} w-4 h-4  border-2 border-white rounded-full end-0 -translate-y-3`} />
                            </div>
                        </Link>
                        <div className="px-3 place-self-center">
                            <Link href={`/creative/${chat_respond?.user?.username || ""}`} >
                                <div className="capitalize font-bold text-black dark:text-white cursor-pointer">
                                    {chat_respond?.user?.name?.split(' ')[0].length>6?chat_respond?.user?.name?.split(' ')[0].slice(0,6):chat_respond?.user?.name?.split(' ')[0]}
                                </div>
                            </Link>
                            <div />
                            {/* <span className="capitalize">away . Avg. response time : <span className="font-bold">{t("1 Hour")}</span> </span> */}
                        </div>
                    </div>

                    
                    <div onClick={onClose} className='absolute end-4 top-4 cursor-pointer'>
                        <Icon name={'xmark'} className='text-xl opacity-50 w-3' />
                    </div>
                    <div className="messages-chat h-full" id="chat" ref={chatRef}>
                    <div className='pb-20'>
                        {chat_respond?.loading?
                        <DuvduLoading loadingIn={""} type='chat' />:
                        messagesList?.map((message, index) => {
                            // if (message.type === 'time') {
                            //     return (
                            //         <div key={message._id} className="time">
                            //             {message.data}
                            //         </div>
                            //     );
                            // } else
                             if (checkIsMe(message.sender)) {
                                return <Me playAudio={playAudio} key={message._id} message={message} />
                            } else if (!checkIsMe(message.sender)) {
                                return <Other playAudio={playAudio} key={message._id} message={message} />
                            } 
                            // else if (message.type === 'typing other') {
                            //     return (
                            //         <div key={message._id} className="message other">
                            //             <div className="typing typing-1"></div>
                            //             <div className="typing typing-2"></div>
                            //             <div className="typing typing-3"></div>
                            //         </div>
                            //     );
                            // }
                            // else if (message.type === 'typing me') {
                            //     return (
                            //         <div key={message._id} className="message me">
                            //             <div className="typing typing-1"></div>
                            //             <div className="typing typing-2"></div>
                            //             <div className="typing typing-3"></div>
                            //         </div>
                            //     );
                            // }
                        })}
                    </div>
                    </div>
                    {
                        attachments &&
                        <div className='flex flex-wrap gap-1 p-2 relative max-h- mb-20 overflow-y-scroll'>
                            {attachments?.map((file, index) => {
                                switch (true) {
                                    case file.fileType.includes('image'):
                                        return (
                                            <PopUpImage key={index}>
                                                <img src={URL.createObjectURL(file.file)} className="size-72 text-gray-400" />
                                            </PopUpImage>
                                        );

                                    case file.fileType.includes('video'):
                                        return (
                                            <div key={index} className="size-72 text-gray-400">
                                                <video ref={videoRef} autoPlay muted playsInline controls>
                                                    <source src={URL.createObjectURL(file.file)} type={file.fileType} />{t("Your browser does not support the video tag.")}</video>
                                            </div>
                                        );

                                    default:
                                        return (
                                            <Icon key={index} name={'file'} className="size-10" />
                                        );
                                }
                            })}
                            <button className="absolute top-0 end-0 m-2 text-white cursor-pointer bg-red rounded-full size-6 flex justify-center items-center" onClick={clearattachments}>
                                <Icon className='p-1' name={"xmark"} />
                            </button>

                        </div>
                    }
                    {chat_respond?.canChat === true || chat_respond?.user?.canChat === true && 

                    <div className="flex justify-end items-center w-full h-16 p-3 gap-2 absolute bottom-0 backdrop-blur-md">
                        <AudioRecorder
                            isstartRecording={isRecording}
                            recordingoutput={recording}
                        />
                        {audioSrc ? (
                            <>
                            <div className="w-full h-12 flex items-center">
                                <audio controls controlsList="nodownload" src={audioSrc} className="w-full outline-none"></audio>
                            </div>
                            <div className='cursor-pointer bg-red rounded-full' onClick={() => setaudioSrc(null)}>
                                <div className='size-12 flex items-center justify-center'>
                                    <Icon className='size-6 text-white' name={'trash'} />
                                </div>
                            </div>
                            </>
                            ) :
                            <>
                                {!isRecording && !attachments  &&
                                    <input
                                        value={content || ""}
                                        onChange={onChange}
                                        name='content'
                                        onKeyDown={handleKeyPress}
                                        className='border-none w-full h-14 rounded-full dark:bg-[#4d4c4c] bg-[#f1f1f1] p-3'
                                        placeholder={t("Write a message...")}
                                        type="text"
                                        accept="video/*,audio/*,image/*,.pdf" />
                                }
                                {!content?.length>0 &&  !isRecording &&
                                <>
                                <label htmlFor="attachment-upload" className='rounded-full dark:bg-[#4d4c4c] bg-[#f1f1f1]' >
                                    <div className='size-12 flex items-center justify-center'>
                                        <Icon className="size-6 cursor-pointer text-center" name={'attachment'} />
                                    </div>
                                </label>
                                <input onClick={handleRemoveEvent} onChange={attachmentsUpload} className='hidden' id="attachment-upload" type="file" multiple />
                                </>}
                                {!content?.length > 0  && !attachments && 
                                <div className='cursor-pointer bg-primary rounded-full' onClick={swapRecording}>
                                    <div className='size-12 flex items-center justify-center'>
                                    {!isRecording ?
                                        <Icon className='size-6 text-white' name={'microphone'} /> :
                                        <Icon className='size-6 text-white' name={'stop'} />
                                    }
                                    </div>
                                </div>
                                }
                            </>
                        }

                        {
                            !isRecording && (content?.length > 0 || audioSrc || attachments) &&
                            <div className='cursor-pointer bg-primary rounded-full' onClick={onSend}>
                                <div className='size-12 flex items-center justify-center'>
                                    <Icon className='size-6 text-white' name={'paper-plane'} />
                                </div>
                            </div>
                        }

                    </div>
                    }
                </div>}
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
    isLogin: state.auth.login

})
const mapDispatchToProps = {
    GetAllMessageInChat,
    SendMessages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
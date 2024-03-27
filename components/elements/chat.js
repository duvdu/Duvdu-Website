import Icon from '../Icons';
import React, { useEffect, useRef } from 'react';

const Chat = ({ messages, data, online ,Close}) => {

    const chatRef = useRef(null);

    useEffect(() => {
      // Scroll to the bottom of the chat when component updates
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, [messages]);

    return (
        <>
        <div onClick={Close} className='fixed w-screen h-screen bg-black opacity-60 top-0 left-0'/>
        <div className="chat  dark:bg-[#1A2024] w-full sm:w-[422px] h-[38rem] relative flex flex-col justify-between rounded-lg bg-DS_white shadow-xl sm:left-8">
            <a href='/creative/anaa_youseff' className="flex p-2 h-16 cursor-pointer border-b border-[#00000040] dark:border-[#FFFFFF40]">
                <div className="relative">
                    <img className="h-full" src={data.user.img} />
                    {online && (
                        <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full right-0 -translate-y-3" />
                    )}
                    {!online && (
                        <div className="absolute w-4 h-4 bg-gray-500 border-2 b order-white rounded-full right-0 -translate-y-3" />
                    )}
                </div>
                <div className="px-3">
                    <span className="capitalize font-bold">
                        {data.user.name}
                    </span>
                    <div />
                    <span className="capitalize">away . Avg. response time : <span className="font-bold"> 1 Hour</span> </span>
                </div>

            </a>
            <div onClick={Close} className='absolute right-4 top-4 cursor-pointer'>
                <Icon name={'xmark'} className='text-xl opacity-50' />
            </div>
            <div className="messages-chat " id="chat" ref={chatRef}>

                {messages.map((message, index) => {
                    if (message.type === 'time') {
                        return (
                            <div key={index} className="time">
                                {message.data}
                            </div>
                        );
                    } else if (message.type === 'me') {
                        return (
                            <div key={index} className="message me">
                                {message.data}
                            </div>
                        );
                    } else if (message.type === 'other') {
                        return (
                            <div key={index} className="message other bg-DS_white">
                                {message.data}
                            </div>
                        );
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
            <div className="flex items-center dark:bg-[#4d4c4c] p-3 ">
                {/* <i className="fas fa-camera"></i>*/}
                <input className='border-none bg-transparent w-full h-min' placeholder="Write a message..." type="text" />
                <Icon className="cursor-pointer" name={'attachment'} useinvert={true}/>
                <div className='cursor-pointer bg-primary rounded-full p-3 h-min ml-3' useinvert={true}>
                    <Icon name={'microphone'} />
                </div>
            </div>
        </div>
        </>

    );
};

export default Chat;

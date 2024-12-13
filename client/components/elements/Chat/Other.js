import Icon from '../../Icons';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { GetAllMessageInChat } from '../../../redux/action/apis/realTime/messages/getAllMessageInChat';
import { SendMessages } from '../../../redux/action/apis/realTime/messages/sendmessage';
import { convertToFormData, handleMultipleFileUpload, handleRemoveEvent, } from '../../../util/util';
import { isVideo , isAudio } from '../../../util/util';

import { useTranslation } from 'react-i18next';
import AudioRecorder from '../recording';
import Link from 'next/link';
import PopUpImage from '../popUpImage';
import DuvduLoading from '../duvduLoading';
import AudioPlayer from './AudioPlayer';

const Other = ({ message , playAudio }) => {
    const { t } = useTranslation();

        const audioRef = useRef(null);
        const videoRef = useRef(null);
        const convertTime = (timestamp) => {
        const date = new Date(timestamp);
        
        // Use Intl.DateTimeFormat to format the time
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true, // 12-hour format (AM/PM)
        };
      
        return new Intl.DateTimeFormat('en-US', options).format(date);
      };
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


    return (
        message?.media[0]?.type.includes("audio")?
            <div className="me-28 message other border-1 mt-2 p-2 dark:bg-[#4d4c4c] bg-[#f1f1f1] rounded-xl">
            <AudioPlayer
              src={message?.media[0]?.url}
              audioRef={audioRef}
              time={convertTime(message.createdAt, 'hh:mm')}
              playAudio={playAudio}
              isMe=''
            />      
            </div>:
            <div className='flex flex-col'>

                <div className="message other dark:bg-[#4d4c4c] bg-[#f1f1f1]">
                    <div className="flex-col">
                        <div>
                            <span className="text-[#1B1A57] dark:text-white">
                                {message.content}
                            </span>
                        </div>
                    </div>
                    <div className="w-full text-end">
                        <span className="text-black dark:text-white text-xs">
                            {convertTime(message.createdAt, 'hh:mm')}
                        </span>
                    </div>
                </div>

                    <div className="flex flex-col gap-2">
                        {
                            message.media?.length > 0 &&
                            message.media?.map((media, index) => {
                                if (media.type.includes("image")) {
                                    return (
                                    <div key={media.url} className='me-auto rounded-xl max-h-[200px] w-[200px] overflow-hidden'>
                                        <PopUpImage>
                                            <img src={media.url} alt="media" className='cursor-pointer w-full' />
                                        </PopUpImage>
                                    </div>
                                    );
                                } else if (media.type.includes("video")) {
                                    return (
                                        
                                        <div key={`video-${index}`} className='me-auto rounded-xl h-[200px] w-[200px] overflow-hidden'>
                                            <video
                                            ref={videoRef}
                                            autoPlay muted playsInline
                                            controls className=''>
                                                <source src={media.url} type={media.type} />{t("Your browser does not support the video tag.")}</video>
                                            </div>
                                        
                                    );
                                } else {
                                    return (
                                        <div key={media.url} className=''>
                                            <a href={ media.url} key={`file-${index}`} target="_blank" rel="noopener noreferrer">
                                                <div className='relative size-14 flex justify-center items-center cursor-pointer'>
                                                    <Icon name="file" className="absolute size-full opacity-50" />
                                                    <Icon name="download" className="absolute size-8 opacity-40 hover:opacity-100" />
                                                </div>
                                            </a>
                                            <div className="w-full text-end">
                                                <span className="text-black dark:text-white text-xs">
                                                    {convertTime(message.createdAt, 'hh:mm')}
                                                </span>
                                            </div>
                                    </div>

                                    );
                                }
                            })
                        }
                        
                    </div>
                    </div>
    );

};
export default Other;
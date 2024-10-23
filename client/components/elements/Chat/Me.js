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
import AudioPlayer from './AudioPlayer';

const Me = ({ message , playAudio }) => {
    const { t } = useTranslation();
    const audioRef = useRef(null);
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
      
      
      
    return (
        message?.media[0]?.type.includes("audio")?
            <div className="ms-28 mt-2 p-2 bg-primary rounded-xl">
            <AudioPlayer
              src={message?.media[0]?.url}
              audioRef={audioRef}
              time={convertTime(message.createdAt, 'hh:mm')}
              playAudio={playAudio}
              isMe='me'
            />      
            </div>:
            <div className='flex flex-col'>

                <div className="message me">
                    <div className="flex-col">
                        <div>
                            <span className="text-white">
                                {message.content}
                            </span>
                        </div>
                    </div>
                    <div className="w-full text-end">
                        <span className="text-white text-xs">
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
                                    <div key={`image-${index}`} className='ms-auto rounded-xl h-[200px] w-[200px] overflow-hidden'>
                                        <PopUpImage >
                                            <img src={media.url} alt="media" className='cursor-pointer' />
                                        </PopUpImage>
                                        <div className="w-full text-end">
                                            <span className="text-white text-xs">
                                                {convertTime(message.createdAt, 'hh:mm')}
                                            </span>
                                        </div>
                                    </div>
                                    );
                                } else if (media.type.includes("video")) {
                                    return (
                                        <div key={`video-${index}`} className='ms-auto rounded-xl h-[200px] w-[200px] overflow-hidden'>
                                            <video controls className=''>
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
                                                <span className="text-white text-xs">
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
export default Me;
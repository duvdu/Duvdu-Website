import AppButton from '../elements/button';
import Comment from '../elements/comment';
import Controller from '../elements/controllers';
import Icon from '../Icons';
import Popup from '../elements/popup';
import React, { useState } from 'react';

var profile = {
    "coverImg": "/assets/imgs/projects/cover.jpeg",
    "profileImg": "/assets/imgs/profile/contact-2.png",
    "personalName": "youseff abdulla",
    "value": 3.7,
    "price": '30',
    "location": "5th settlement",
    "occupation": "photographer",
    "rank": "professional",
    "about": "hello i’m Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    "popularity": {
        "likes": 28000,
        "followers": 514,
        "views": 258000
    },
    "comments": [
        {
            "id": 1,
            "userName": "jonathan donrew",
            "date": "Sun - Aug 3",
            "avatar": "/assets/imgs/projects/1.jpeg",
            "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            "id": 2,
            "userName": "jonathan donrew",
            "date": "Sun - Aug 3",
            "avatar": "/assets/imgs/projects/1.jpeg",
            "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            "id": 3,
            "userName": "jonathan donrew",
            "date": "Sun - Aug 3",
            "avatar": "/assets/imgs/projects/1.jpeg",
            "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
    ],
    "projects": [
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/1.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/2.jpeg"
        },
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/3.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/4.gif"
        },
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/1.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/2.jpeg"
        },
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/3.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/4.gif"
        },
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/1.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/2.jpeg"
        },
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/3.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/4.gif"
        },
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/1.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/2.jpeg"
        },
        {
            "creatives": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/projects/3.jpeg"
        },
        {
            "creatives": 1687,
            "title": "videography",
            "show": "/assets/imgs/projects/4.gif"
        },
    ]

};

function EditPopUp() {
    const [formData, setformData] = useState({
        'personalName': profile['personalName'],
        'occupation': profile['occupation'],
        'location': profile['location'],
        'price': profile['price'],
        'about': profile['about'],
        "coverImg": profile['coverImg'],
        "profileImg": profile['profileImg'],
    });

    // Handle input change for each field
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update profile state with new value for the input field
        setformData(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
    };
    return (
        <>
            <Popup id='edit-details' header={'Edit Details'} addWhiteShadow={true}>
                

                <div className='relative'>
                    <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center  border-[#0000001A]">
                        <Icon className='text-white' name={'pen'} />
                    </Controller>
                    <img className='card w-full h-52 mt-5 object-cover bg-bottom' src={`${formData['coverImg']}`} alt="cover pic" />
                    <div className='absolute bottom-0 edit w-28 h-28 transform translate-y-1/2 translate-x-1/2'>
                        <img className='rounded-full w-full h-full' src={formData['profileImg']} alt="profile picture" />
                        <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center border-[#0000001A]">
                            <Icon className='text-white' name={'pen'} />
                        </Controller>
                    </div>
                </div>
        
                <form className='pb-0 flex flex-col items-center max-w-[700px] sm:p-20 py-20' onSubmit={handleSubmit}>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            name
                        </span>
                        <input
                            type='text'
                            name='personalName'
                            value={formData['personalName']}
                            onChange={handleInputChange}
                            className="edit auth-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            services
                        </span>
                        <input
                            type='text w-full'
                            name='occupation'
                            value={formData['occupation']}
                            onChange={handleInputChange}
                            className="edit auth-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            location
                        </span>
                        <input
                            type='text'
                            name='location'
                            value={formData['location']}
                            onChange={handleInputChange}
                            className="edit auth-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            price per hour
                        </span>
                        <input
                            type='text'
                            name='price'
                            value={formData['price']}
                            onChange={handleInputChange}
                            className="edit auth-field"
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            about
                        </span>
                        <textarea
                            name='about'
                            value={formData['about']}
                            onChange={handleInputChange}
                            className="edit auth-field h-[400px]"
                            style={{ height: '120px' }}
                        />
                    </div>
                    <AppButton type="submit" className='sticky bottom-10 w-96 max-w-96 mt-12 z-10' shadow={true}>
                        Done
                    </AppButton>
                </form>
                
            </Popup>
        </>
    );
}

export default EditPopUp;

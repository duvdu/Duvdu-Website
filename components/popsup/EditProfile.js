import AppButton from '../elements/button';
import Comment from '../elements/comment';
import Controller from '../elements/controllers';
import Icon from '../Icons';
import Popup from '../elements/popup';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { updateProfile } from "../../redux/action/apis/auth/profile/updateprofile";
import { errorConvertedMessage, handleFileUpload } from '../../util/util';

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

function EditPopUp({ user, updateProfile, api }) {
    const [error, setError] = useState(false);
    const [img, setimg] = useState(profile['profileImg']);
    const [cover, setcover] = useState(profile['coverImg']);

    const [formData, setformData] = useState({
        'personalName': user.name,
        'occupation': profile['occupation'],
        'location': profile['location'],
        'price': user.pricePerHour,
        'about': profile['about'],
        "coverImg": cover,
        "profileImg": img,
    });

    const mappingData = () => {
        return {
            about: formData.about,
            category: formData.occupation,
            coverImage: formData.coverImg,
            profileImage: formData.profileImg,
            name: formData.personalName
        }

    }

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
        updateProfile({ data: mappingData() })
    };
    useEffect(() => {
        if (api.error && api.req == "updateProfile") {
            setError(errorConvertedMessage(api.error))
        }
    }, [api.loading, api.error, api.data])


    const profileUpload = (e) => {
        const data = handleFileUpload(e);
        setimg(URL.createObjectURL(data.file))
    };
    const coverUpload = (e) => {
        const data = handleFileUpload(e);
        setcover(URL.createObjectURL(data.file))
    };

    return (
        <>
            <Popup id='edit-details' header={'Edit Details'} addWhiteShadow={true}>
                <div className='relative'>
                    <label htmlFor="cover-file-upload" >
                        <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center  border-[#0000001A]" >
                            <Icon className='text-white' name={'pen'} />
                        </Controller>
                    </label>
                    <input onChange={coverUpload} className='hidden' id="cover-file-upload" type="file" />

                    <img className='card w-full h-52 mt-5 object-cover bg-bottom' src={cover} alt="cover pic" />
                    <div className='absolute bottom-0 edit size-28 transform translate-y-1/2 translate-x-1/2'>
                        <img className='rounded-full w-full h-full' src={img} alt="profile picture" />

                        <label htmlFor="profile-file-upload" >
                            <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center border-[#0000001A]" >
                                <Icon className='text-white' name={'pen'} />
                            </Controller>
                        </label>
                        <input onChange={profileUpload} className='hidden' id="profile-file-upload" type="file" />
                    </div>
                </div>

                <form className='pb-0 flex flex-col items-center sm:w-[500px] md:w-[700px] sm:p-20 py-20' onSubmit={handleSubmit}>
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
                    <button className='w-full flex justify-center' type="submit">

                        <AppButton className='sticky bottom-10 w-full max-w-96 mt-12 z-10' shadow={true}>
                            Done
                        </AppButton>
                    </button>

                </form>

                {
                    error &&
                    <p className="error-msg mt-10" >{error}</p>
                }
            </Popup>
        </>
    );
}

const mapStateToProps = (state) => ({
    api: state.api,
    user: state.auth.user,
    isDark: state.setting.ISDARK,
    getheaderpopup: state.setting.headerpopup,
});

const mapDispatchToProps = {
    updateProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPopUp);

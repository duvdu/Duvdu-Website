
import Comment from '../../../components/elements/comment';
import Controller from '../../../components/elements/controllers';
import Icon from '../../../components/Icons';
import EditDrawer from '../../../components/drawer/EditProfile';
import React, { useEffect, useState } from 'react';
import Switch from '../../../components/elements/switcher'
import PostSheet from '../../../components/elements/Post';
import { useRouter } from 'next/router';
import { connect } from "react-redux";
import { InsertToArray, resetForm, UpdateFormData } from '../../../redux/action/logic/forms/Addproject';
import { updateProfile } from "../../../redux/action/apis/auth/profile/updateprofile";

import AddStudioBooking from '../../../components/drawer/create/studio-booking'
import AddCopyrights from '../../../components/drawer/create/copy-rights'
import AddPost from '../../../components/drawer/create/addproject'
import AddProducer from '../../../components/drawer/create/producer'
import EquipmentRental from '../../../components/drawer/create/Equipment-rental';
import PostPopup from '../../../components/popsup/create/assets/chooseCategory';
import SelectType from '../../../components/popsup/create/assets/selectType';

import Projects from '../../elements/profile/projects';
import Conver from '../../elements/profile/conver';
import Info from '../../elements/profile/info';
import { getMyprofile } from '../../../redux/action/apis/auth/profile/getProfile';
import { GetProjects } from '../../../redux/action/apis/cycles/projects/get';
import AddToolUsed from '../../popsup/create/addToolUsed';
import AddOtherCreatives from '../../popsup/create/addOtherCreatives';
import EquipmentAvailable from '../../popsup/create/equipmentAvailable';



const profile = {
    "cover-pic": "/assets/imgs/projects/cover.jpeg",
    "profile-pic": "/assets/imgs/profile/defultUser.jpg",
    "value": 3.7,
    "price": '',
    "location": '',
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
            "avatar": "/assets/imgs/profile/defultUser.jpg",
            "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            "id": 2,
            "userName": "jonathan donrew",
            "date": "Sun - Aug 3",
            "avatar": "/assets/imgs/profile/defultUser.jpg",
            "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            "id": 3,
            "userName": "jonathan donrew",
            "date": "Sun - Aug 3",
            "avatar": "/assets/imgs/profile/defultUser.jpg",
            "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
    ],
    "projects": [
        {
            "price": 23247,
            "title": "models & performing artists",
            "show": "/assets/imgs/profile/defultUser.jpg"
        }
    ]
};

function MyProfile({ updateProfile, InsertToArray, GetProjects, projects, UpdateFormData, getMyprofile, user, updateProfile_respond }) {

    const route = useRouter()

    const { type, category, subcategory, tags, edit: goEdit } = route.query
    const [showAddPost, setshowAddPost] = useState(false);
    const [showAddPanal, setShowAddPanal] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);


    useEffect(() => {
        GetProjects({})
    }, [])
    
    function removeQueryParameter() {
        if (type || category || subcategory || tags) {
            route.replace({
                pathname: `/creative/${profile}`,
            })
            resetForm()
        }
    }

    function InputDrawer() {
        if (type) {
            switch (type) {
                case 'studio-booking':
                    return <AddStudioBooking />
                case 'equipment-rental':
                    removeQueryParameter()
                // return <EquipmentRental />
                case 'music-audio':
                    removeQueryParameter()
                    break;
                case 'copyrights-permits':
                    return <AddCopyrights />
                    break;
                case 'add-producer':
                    return <AddProducer />
                    
                    break;
                case 'portfolio-post':
                    return <AddPost />
                    break;
                default:
                    // handle unknown URL
                    break;

            }
            // if (category && subcategory && tags) {
            //     return <AddPost />
            // }
        }
        removeQueryParameter()
    }


    const handlesetpost = ({ data }) => {
        setshowAddPost(false)
    };

    const onOpenEdit = () => {
        console.log(route)

        route.push({
            pathname: route.asPath,
            query: {
                edit: true
            }
        });
    };
    const onCloseEdit = () => {
        const url = new URL(route.asPath, window.location.origin);
        route.push({
            pathname: url.pathname,
        });
    };


    function Allpage() {
        useEffect(() => {
            if (updateProfile_respond) {
                getMyprofile(false)
            }
        }, [updateProfile_respond])

        function updateInstantState(checked) {
            const data = new FormData();
            data.append('isAvaliableToInstantProjects', checked)
            updateProfile(data, false)
        }
    
        return (
            <>
                <Conver converPic={user.coverImage ? "https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + user.coverImage : "/assets/imgs/projects/cover.jpeg"} />
                <div className='flex gap-3 pt-7 flex-col lg:flex-row'>
                    <div className='sm:bg-white sm:dark:bg-black sm:pt-10 sm:pb-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>

                        <div className='relative px-6 sm:px-10'>
                            <Info
                                src={user.profileImage ? "https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + user.profileImage : process.env.DEFULT_PROFILE_PATH}
                                location={user.adress || 'NONE'}
                                occupation={user.service || '---'}
                                personalName={user.name}
                                popularity={{
                                    likes:0,
                                    followers:user.followers,
                                    views:0,
                                }}
                                rank={"---"}
                                rates={user.rate.totalRates.toFixed(1)}
                            />
                        </div>

                        <div className='flex items-center justify-center my-7 gap-2'>
                            <Switch onSwitchChange={updateInstantState} value={user.isAvaliableToInstantProjects} id='profile-instant' />
                            <span className={user.isAvaliableToInstantProjects ? "" : "opacity-70"}>
                                Instant Projects is {user.isAvaliableToInstantProjects ? "open" : "disabled"}
                            </span>
                        </div>

                        <div className='h-divider'></div>
                        <div className='px-10'>
                            <h3 className='pt-6' id='about-header'>about</h3>
                            <p className='pt-6' id='about-paragraph'>{user.about || '---'}</p>
                        </div>
                        <div className='h-divider my-7'></div>
                        <div className='px-10'>
                            <div className='flex flex-col gap-4'>
                                {profile.comments.map((comment) => (
                                    <Comment key={comment.id} comment={comment} />
                                ))}
                            </div>
                        </div>

                        {
                            !showAddPanal &&
                            <div className='sticky h-32 left-10 bottom-0 flex justify-center items-center'>
                                <Controller>
                                    <div data-popup-toggle="popup" data-popup-target="select-type" className="dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] w-20 h-20 rounded-full cursor-pointer flex justify-center items-center bg-primary" >
                                        <Icon className='text-white text-2xl' name={'plus'} />
                                    </div>
                                    <div onClick={() => onOpenEdit()} className="bg-[#0000001A] dark:bg-[#FFFFFF1A] border border-transparent dark:border-[#FFFFFF4D] w-20 h-20 rounded-full cursor-pointer flex justify-center items-center">
                                        <Icon className='text-white text-2xl' name={'pen'} />
                                    </div>
                                </Controller>
                            </div>
                        }
                    </div>

                    <div className='right-side'>
                        {
                            projects.length == 0 &&
                            <h3>No projects Found </h3>
                        }

                        <Projects projects={projects} />

                    </div>
                </div>
            </>
        )
    }
    // console.log("reload ? ",getMyprofile_respond)

    return (
        <>

            <EditDrawer isOpen={goEdit} onClose={() => onCloseEdit()} />
            <AddToolUsed onSubmit={(value) => InsertToArray('tools', value)} />
            <AddOtherCreatives onSubmit={(value) => InsertToArray('creatives', value)} />
            <EquipmentAvailable onSubmit={(value) => InsertToArray('equipments', value)} />
            <InputDrawer />
            {
                !(type || category) &&
                <>
                    <PostPopup />
                    <SelectType />
                </>
            }
            <div className='sm:container'>
                {
                    showAddPanal &&
                    <PostSheet setShowAddPanal={setShowAddPanal} username={user.username} />
                }
                {
                    showAddPost &&
                    <AddPost onpublish={handlesetpost} />
                }
                {
                    !showAddPost &&
                    <Allpage UpdateFormData={UpdateFormData} />
                }
            </div>
        </>
    );
}


const mapStateToProps = (state) => ({
    user: state.user.profile,
    updateProfile_respond: state.api.updateProfile,
    projects: state.projects.items
});

const mapDispatchToProps = {
    resetForm,
    UpdateFormData,
    updateProfile,
    getMyprofile,
    GetProjects,
    InsertToArray
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

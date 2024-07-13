
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
import PostPopup from '../../../components/popsup/create/assets/chooseCategory';
import SelectType from '../../../components/popsup/create/assets/selectType';

import { getMyprofile } from '../../../redux/action/apis/auth/profile/getProfile';
import AddToolUsed from '../../popsup/create/addToolUsed';
import AddOtherCreatives from '../../popsup/create/addOtherCreatives';
import EquipmentAvailable from '../../popsup/create/equipmentAvailable';
import Followers from '../../popsup/followes';
import { GetUserProject } from '../../../redux/action/apis/auth/profile/getUserProjects';
import Conver from './conver';
import Info from './info';
import Projects from './projects';
import FunctionUsed from '../../popsup/create/FunctionsUsed';
import EmptyComponent from '../contracts/emptyComponent';
import Loading from '../../elements/duvduLoading';
import DuvduLoading from '../../elements/duvduLoading';



const profile = {
    comments: [
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
};

function MyProfile({ updateProfile, InsertToArray, GetUserProject, projects, UpdateFormData, getMyprofile, user, updateProfile_respond, api }) {

    const route = useRouter()

    const { type, category, subcategory, tags, edit: goEdit } = route.query
    const [showAddPost, setshowAddPost] = useState(false);
    const [showAddPanal, setShowAddPanal] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    projects = projects?.data?.projects || []

    useEffect(() => {
        setUserInfo(user)
    }, [user])

    useEffect(() => {
        GetUserProject({})
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
                case 'rental':
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
                case 'project':
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
                // updateProfile_respond.data.coverImage = "https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + updateProfile_respond.data.coverImage
                // updateProfile_respond.data.profileImage = "https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + updateProfile_respond.data.profileImage
                setUserInfo(updateProfile_respond.data)
            }
        }, [updateProfile_respond])

        function updateInstantState(checked) {
            const data = new FormData();
            data.append('isAvaliableToInstantProjects', checked)
            updateProfile(data)
        }

        return (
            !userInfo ? <></> :
                <>
                    <Followers id={"show-followers"} />
                    <Conver converPic={userInfo.coverImage} />
                    <div className='flex gap-3 pt-7 flex-col lg:flex-row'>
                        <div className='sm:bg-white sm:dark:bg-black sm:pt-10 sm:pb-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>
                        <DuvduLoading loadingIn = {"updateProfile"} />
                            <div className='relative px-6 sm:px-10'>
                                <Info
                                    src={userInfo.profileImage}
                                    location={userInfo.address || 'NONE'}
                                    occupation={userInfo?.category?.title }
                                    personalName={userInfo.name}
                                    popularity={{
                                        likes: userInfo.likes,
                                        followers: userInfo.followCount.followers,
                                        views: userInfo.profileViews,
                                    }}
                                    rates={userInfo.rate.totalRates.toFixed(1)}
                                    isMe={true}
                                />
                            </div>

                            <div className='flex items-center justify-center my-7 gap-2'>
                                <Switch onSwitchChange={updateInstantState} value={userInfo.isAvaliableToInstantProjects} id='profile-instant' />
                                <span className={userInfo.isAvaliableToInstantProjects ? "" : "opacity-70"}>
                                    Instant Projects is {userInfo.isAvaliableToInstantProjects ? "open" : "disabled"}
                                </span>
                            </div>

                            <div className='h-divider'></div>
                            {userInfo.about &&
                            <div className='px-10'>
                                <h3 className='pt-6' id='about-header'>about</h3>
                                <p className='pt-6' id='about-paragraph'>{userInfo.about || '---'}</p>
                            </div>}
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

                        <div className='right-side mb-10 -translate-y-[80px] sm:-translate-y-0'>
                            {
                                projects.length == 0 &&
                                <EmptyComponent message="No Projects Yet!" />

                            }

                            <Projects projects={projects} />

                        </div>
                    </div>
                </>
        )
    }
    
    return (
        <>

            <EditDrawer isOpen={goEdit} onClose={() => onCloseEdit()} />
            <AddToolUsed onSubmit={(value) => InsertToArray('tools', value)} />
            <FunctionUsed onSubmit={(value) => InsertToArray('functions', value)} />
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
                    <PostSheet setShowAddPanal={setShowAddPanal} username={userInfo.username} />
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
    projects: state.api.GetUserProject,
    // api: state.api,

});

const mapDispatchToProps = {
    resetForm,
    UpdateFormData,
    updateProfile,
    getMyprofile,
    GetUserProject,
    InsertToArray
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

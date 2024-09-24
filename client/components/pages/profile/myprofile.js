
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
import { userReview } from '../../../redux/action/apis/reviews/users';
import { useTranslation } from 'react-i18next';


function MyProfile({ updateProfile, InsertToArray, GetUserProject, projects, UpdateFormData, userReview, userReview_respond,myProfile_respond, user, updateProfile_respond }) {
    const { t } = useTranslation();
    const route = useRouter()

    const { type, category, subcategory, tags, edit: goEdit } = route.query
    const [showAddPost, setshowAddPost] = useState(false);
    const [showAddPanal, setShowAddPanal] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    const projectData = projects?.data?.projects || []

    useEffect(() => {
        setUserInfo(user)
    }, [user])

    useEffect(() => {
        GetUserProject({})
    }, [])
    useEffect(() => {
        if (user?.username)
            userReview({ username: user.username })
    }, [user?.username])

    function removeQueryParameter() {
        if (type || category || subcategory || tags) {
            route.replace({
                pathname: `/creative/${user.username}`,
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
    console.log({projects})
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
            updateProfile_respond || myProfile_respond &&
                <>
                    <Followers id={"show-followers"} />
                    
                    {updateProfile_respond?.loading || myProfile_respond?.loading? 
                          <div className="bg-gray-200 dark:bg-[#1f1f1f] h-36 md:h-72 w-full animate-pulse rounded-b-[50px] mb-4"></div>:
                          <Conver converPic={userInfo?.coverImage} />
                    }
                    
                    <div className='flex gap-3 pt-7 flex-col lg:flex-row'>
                        {updateProfile_respond?.loading || myProfile_respond?.loading?
                        <DuvduLoading loadingIn={""} type='profileCard'/>
                        :
                        <div className='sm:bg-white sm:dark:bg-[#1A2024] sm:pt-10 sm:pb-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>
                            <div className='relative px-6 sm:px-10'>
                                <Info
                                    src={userInfo?.profileImage}
                                    location={userInfo?.address || 'NONE'}
                                    occupation={userInfo?.category?.title}
                                    rank={userInfo?.rank?.title}
                                    rankcolor={userInfo?.rank?.color}
                                    personalName={userInfo?.name?.split(' ')[0].length>6?userInfo?.name?.split(' ')[0].slice(0,6):userInfo?.name?.split(' ')[0]}
                                    popularity={{
                                        likes: userInfo?.likes,
                                        followers: userInfo?.followCount.followers,
                                        views: userInfo?.profileViews,
                                    }}
                                    rates={userInfo?.rate.totalRates.toFixed(1)}
                                    isMe={true}
                                />
                            </div>

                            <div className='flex items-center justify-center my-7 gap-2'>
                                <Switch onSwitchChange={updateInstantState} value={userInfo?.isAvaliableToInstantProjects} id='profile-instant' />
                                <span className={userInfo?.isAvaliableToInstantProjects ? "" : "opacity-70"}>
                                    Instant Projects is {userInfo?.isAvaliableToInstantProjects ? "open" : "disabled"}
                                </span>
                            </div>

                            <div className='h-divider'></div>
                            {userInfo?.about &&
                                <div className='px-10'>
                                    <h3 className='pt-6' id='about-header'>{t("about")}</h3>
                                    <p className='pt-6' id='about-paragraph'>{userInfo?.about || '---'}</p>
                                </div>}
                            <div className='h-divider my-7'></div>
                            <div className='px-10'>
                                <div className='flex flex-col gap-4'>
                                    {userReview_respond?.data?.map((comment) => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}
                                </div>
                            </div>
                            {
                                !showAddPanal &&
                                <div className='hidden sticky bottom-0 h-32 lg:flex justify-center items-center mx-auto'>
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
                        }
                        {
                            !showAddPanal &&

                            <div className='fixed bottom-0 h-32 flex lg:hidden justify-center items-center mx-auto w-full z-10'>
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
                        <div className='right-side mb-10 -translate-y-[80px] sm:-translate-y-0'>
                            {projects?.loading?
                            <DuvduLoading loadingIn={""} type='profileProjects'/>
                            :
                            (projects?.data?.projects?.length > 0 ?
                                <Projects projects={projectData} />:

                                projects?.data?.projects && 
                                    <EmptyComponent message="No Projects Yet!" />
                            )
                            }
                            
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
                    <PostSheet setShowAddPanal={setShowAddPanal} username={userInfo?.username} />
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
    userReview_respond: state.api.userReview,
    myProfile_respond: state.api.getMyprofile,

});

const mapDispatchToProps = {
    resetForm,
    UpdateFormData,
    updateProfile,
    getMyprofile,
    GetUserProject,
    InsertToArray,
    userReview
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

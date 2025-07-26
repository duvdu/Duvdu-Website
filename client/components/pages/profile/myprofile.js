
import Comment from '../../../components/elements/comment';
import Controller from '../../../components/elements/controllers';
import GoogleMap from '../../../components/elements/googleMap';
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
import DraggableList from "../../../components/pages/home/dragList";
import { GetCopyrights } from '../../../redux/action/apis/cycles/copywriter/get';
import CopyRightCard from '../../../components/pages/copy-writeer/copyRightCard';
import CopyRigtherBooking from "../../../components/drawer/book/copyRigtherBooking";

import { getMyprofile } from '../../../redux/action/apis/auth/profile/getProfile';
import AddToolUsed from '../../popsup/create/addToolUsed';
import AddOtherCreatives from '../../popsup/create/addOtherCreatives';
import EquipmentAvailable from '../../popsup/create/equipmentAvailable';
import Followers from '../../popsup/followes';
import { GetUserProject , GetTaggedProject } from '../../../redux/action/apis/auth/profile/getUserProjects';
import Conver from './conver';
import Info from './info';
import Projects from './projects';
import FunctionUsed from '../../popsup/create/FunctionsUsed';
import EmptyComponent from '../contracts/emptyComponent';
import Loading from '../../elements/duvduLoading';
import DuvduLoading from '../../elements/duvduLoading';
import { userReview } from '../../../redux/action/apis/reviews/users';
import { useTranslation } from 'react-i18next';
import Reviews from "../../../components/pages/stduiosAndProject/review";
import FaceVerification from "../../elements/FaceVerification";
import Subscription from "../../elements/Subscription";
import Link from 'next/link';

function MyProfile({ updateProfile, InsertToArray , GetCopyrights, GetUserProject, projects,GetTaggedProject,copyRights_respond, taggedProjects , UpdateFormData, userReview, userReview_respond, user, updateProfile_respond }) {
    const { t } = useTranslation();
    const route = useRouter()
    
    const { type, category, subcategory, tags, edit: goEdit } = route.query
    const [showAddPost, setshowAddPost] = useState(false);
    const [showAddPanal, setShowAddPanal] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    const projectData = projects?.data?.projects || []

    const transformApiResponse = (data) => {
        return {
            _id: data._id,
            project: {
                _id: data._id,
                user: {
                    _id: data.user._id,
                    username: data.user.username,
                    isOnline: data.user.isOnline,
                    profileImage: data.user.profileImage,
                    name: data.user.name,
                },
                category: {
                    _id: data.category._id,
                    title: data.category.title,
                    cycle: "project", // Assuming a static value as in API 1
                    image: "" // No equivalent in API 2
                },
                cover: data.cover,
                audioCover: data.audioCover,
                name: data.name,
                creatives: data.creatives || []
            },
            ref: "portfolio-post",
            user: data.user._id,
            rate: {
                ratersCounter: data.user.rate.ratersCounter,
                totalRates: data.user.rate.totalRates
            },
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            __v: 0
        };
    };    
    const taggedProjectData = taggedProjects?.data || []
    useEffect(() => {
        setUserInfo(user)
    }, [user])

    // useEffect(() => {
    //     GetUserProject({})
    // }, [])
    useEffect(() => {
        if (user?.username){
            userReview({ username: user?.username })
            GetUserProject({ username: user?.username });
            GetTaggedProject({inviteStatus:'accepted'});
        }
        if(user?._id)
        GetCopyrights(`user=${user?._id}`)
    }, [user])
    const CopyRight = copyRights_respond?.data

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
                    break;
                case 'equipment-rental':
                    removeQueryParameter()
                    break;
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
            if (updateProfile_respond?.data) {
                // updateProfile_respond.data.coverImage = "https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + updateProfile_respond.data.coverImage
                // updateProfile_respond.data.profileImage = "https://duvdu-s3.s3.eu-central-1.amazonaws.com/" + updateProfile_respond.data.profileImage
                setUserInfo(updateProfile_respond?.data)
            }
        }, [updateProfile_respond?.data])

        function updateInstantState(checked) {
            const data = new FormData();
            data.append('isAvaliableToInstantProjects', checked)
            updateProfile(data)
        }
        return (
            user &&
                <>
                    <Followers id={"show-followers"} />
                    {user?.loading? 
                          <div className="bg-gray-200 dark:bg-[#1f1f1f] h-36 md:h-72 w-full animate-pulse rounded-b-[50px] mb-4"></div>:
                          <Conver converPic={userInfo?.coverImage} />
                    }
                    
                    <div className='flex lg:grid lg:grid-cols-6  gap-3 pt-7 flex-col lg:flex-row'>
                        {user?.loading?
                        <DuvduLoading loadingIn={""} type='profileCard'/>
                        :
                        <div className='col-span-2 sm:bg-white sm:dark:bg-[#1A2024] sm:py-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>
                            <div className='relative px-6 sm:px-10'>
                                <Info
                                    src={userInfo?.profileImage}
                                    location={userInfo?.address || 'NONE'}
                                    occupation={userInfo?.category?.title}
                                    rank={userInfo?.rank?.title}
                                    rankcolor={userInfo?.rank?.color}
                                    categories={userInfo?.categories}
                                    personalName={userInfo?.name?.split(' ')[0].length>6?userInfo?.name?.split(' ')[0].slice(0,6):userInfo?.name?.split(' ')[0]}
                                    popularity={{
                                        likes: userInfo?.likes,
                                        followers: userInfo?.followCount.followers,
                                        views: userInfo?.profileViews,
                                    }}
                                    rates={userInfo?.rate.totalRates}
                                    isMe={true}
                                />
                            </div>

                            <div className='flex items-center justify-center my-7 gap-2'>
                                <Switch onSwitchChange={updateInstantState} value={userInfo?.isAvaliableToInstantProjects} id='profile-instant' />
                                <span className={userInfo?.isAvaliableToInstantProjects ? "" : "opacity-70"}>
                                    {t(`Instant Projects is ${userInfo?.isAvaliableToInstantProjects ? "open" : "disabled"}`)}
                                </span>
                            </div>

                            <div className='h-divider'></div>
                            {userInfo?.about &&
                            <>
                                <div className='px-10'>
                                    <h3 className='pt-6' id='about-header'>{t("about")}</h3>
                                    <p className='pt-6' id='about-paragraph'>{userInfo?.about || '---'}</p>
                                </div>
                            </>
                            }
                            <div className='px-10'>
                                <h3 className='pt-6' id='about-header'>{t("contact")}</h3>
                                <p className='pt-4' id='about-paragraph'>{userInfo?.email || '---'}</p>
                                <p className='pt-4' id='about-paragraph'>{userInfo?.phoneNumber?.number || '---'}</p>
                                <h3 className='pt-6' id='about-header'>{t("username")}</h3>
                                <p className='pt-4' id='about-paragraph'>{userInfo?.username || '---'}</p>
                            </div>

                            {!userInfo?.faceRecognition &&
                            <>
                                <div className='h-divider my-7'></div>
                                <div className='ps-5 md:ps-10 '>
                                    <FaceVerification />
                                </div>
                            </>
                            }
                            <div className='h-divider my-7'></div>
                            <div className='ps-5 md:ps-10 '>
                                <Subscription />
                            </div>
                            <div className='ps-5 md:ps-10 '>
                            <div className="p-3 bg-white dark:bg-[#1A2024] rounded-[15px]">
                                <Link href={'/withdraw-methods'}>
                                    <button className="flex items-center gap-3">
                                        <div className='rounded-md h-14 min-w-14 flex items-center justify-center'>
                                            <Icon className='w-[18px]' name="wallet" />
                                        </div>
                                        <p className="font-semibold"> {t('withdraw methods')}</p>
                                    </button>
                                </Link>
                            </div>
                            </div>
                            <div className='h-divider my-7'></div>
                            <div className='ps-5 md:ps-10 '>
                                <Reviews userName={user?.username} data={userReview_respond?.data} />
                            </div>
                            <div className='px-5 md:px-10 '>
                            <GoogleMap
                                width={'100%'} value={{ 'lat': userInfo?.location?.lat, 'lng': userInfo?.location?.lng }}
                                isreadOnly={true}
                                className={"relative rounded-3xl overflow-hidden h-[200px] border-2 z-10 border-primary"}
                                height={200}
                                inputclass={"my-0 bg-transparent font-bold"}
                                fullscreenControl={false}
                                />
                            </div>
                            {
                                !showAddPanal &&
                                <div className='hidden sticky bottom-0 h-32 lg:flex justify-center items-center mx-auto z-20'>
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
                        <div className='col-span-4 w-full mb-10 -translate-y-[80px] sm:-translate-y-0'>
                            {taggedProjects?.loading?
                            <DuvduLoading loadingIn={""} type='profileProjects'/>
                            :
                            taggedProjects?.data?.length > 0 &&
                                <>
                                <h3 className='pb-4 !font-bold' id='about-header'>{t("tagged projects")}</h3>
                                <Projects projects={taggedProjectData.map(item=>transformApiResponse(item))} />
                                </>
                            }
                            {projects?.loading?
                            <DuvduLoading loadingIn={""} type='profileProjects'/>
                            :
                            projects?.data?.projects?.length > 0 &&
                            <>
                            <h3 className='pb-4 !font-bold' id='about-header'>{t("my projects")}</h3>
                            <Projects projects={projectData} />
                            </>
                            }

                            { projects?.data?.projects?.length==0 &&  taggedProjects?.data?.length ===0 && 
                                <EmptyComponent message="No Projects Yet!" />
                            }                            
                        </div>
                    </div>
                    {CopyRight?.length>0 && 
                    <>
                    <div className="grid px-6 md:px-0 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div/>
                        <h3 className='pb-4 !font-bold' id='about-header'>{t("My Services")}</h3>
                    </div>
                    <div className="grid px-6 md:px-0 md:grid-cols-2 lg:grid-cols-3 pb-10 gap-5">
                        {CopyRight && CopyRight.map((item, i) =>
                        <>{i %2 ==0 && 
                             <div className='hidden lg:block'/>
                        }
                            <CopyRightCard bookButton={false} QueryString={`user=${user?._id}`} key={i} cardData={item} />
                        </>
                        )}
                    </div>
                    </>
                    }
                </>
        )
    }

    return (
        <>
            <EditDrawer isOpen={goEdit} onClose={() => onCloseEdit()} />
            <AddToolUsed onSubmit={(value) => InsertToArray('tools', value)} />
            <FunctionUsed onSubmit={(value) => InsertToArray('functions', value)} />
            <AddOtherCreatives onSubmit={(value) =>{
                value.invitedCreatives?InsertToArray('invitedCreatives', value) :InsertToArray('creatives', value)
            }} />
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
    taggedProjects: state.api.GetTaggedProject,
    userReview_respond: state.api.userReview,
    copyRights_respond: state.api.GetCopyrights,
});

const mapDispatchToProps = {
    resetForm,
    UpdateFormData,
    updateProfile,
    getMyprofile,
    GetUserProject,
    GetTaggedProject,
    InsertToArray,
    GetCopyrights,
    userReview
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

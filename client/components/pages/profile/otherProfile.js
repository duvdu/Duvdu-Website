import { useEffect, useState } from "react";
import AppButton from "../../elements/button";
import Comment from "../../elements/comment";
import GoogleMap from '../../../components/elements/googleMap';
import Conver from "./conver";
import Info from "./info";
import Projects from "./projects";
import { connect } from "react-redux";
import Icon from "../../Icons";
import { GetAllMessageInChat } from "../../../redux/action/apis/realTime/messages/getAllMessageInChat";
import { getOtherprofile } from "../../../redux/action/apis/auth/profile/getOtherProfile";
import { useRouter } from "next/router";
import { setFollow } from "../../../redux/action/apis/auth/profile/setFollow";
import Followers from "../../popsup/followes";
import { GetUserProject } from "../../../redux/action/apis/auth/profile/getUserProjects";
import EmptyComponent from "../contracts/emptyComponent";
import { swapFollow } from "../../../redux/action/apis/auth/profile/swapFollow";
import { useTranslation } from 'react-i18next';
import { userReview } from '../../../redux/action/apis/reviews/users';
import DuvduLoading from '../../elements/duvduLoading';
import Reviews from "../../../components/pages/stduiosAndProject/review";

const profile = {
    comments: [
        {
            id: 1,
            userName: "jonathan donrew",
            date: "Sun - Aug 3",
            avatar: "/assets/imgs/profile/defultuserInfo?.jpg",
            commentText: "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            id: 2,
            userName: "jonathan donrew",
            date: "Sun - Aug 3",
            avatar: "/assets/imgs/profile/defultuserInfo?.jpg",
            commentText: "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            id: 3,
            userName: "jonathan donrew",
            date: "Sun - Aug 3",
            avatar: "/assets/imgs/profile/defultuserInfo?.jpg",
            commentText: "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
    ],
};

function OtherProfile({
    user,
    getOtherprofile,
    GetAllMessageInChat,
    GetUserProject,
    projects,
    swapFollow,
    swapFollowRespond,
    api,
    isLogin,
    userReview, 
    userReview_respond
}) {

    const route = useRouter();
    const { profile: username } = route.query;
    const [isFollow, setIsFollow] = useState();
    const { t } = useTranslation();
    const userInfo = user?.data;
    useEffect(() => {
        if (swapFollowRespond && username) {
            setIsFollow(swapFollowRespond.isFollow);
        } else {
            setIsFollow(userInfo?.isFollow);
        }
    }, [swapFollowRespond, userInfo?.isFollow]);

    useEffect(() => {
        if (username) {
            userReview({ username: username })
            getOtherprofile(username);
            GetUserProject({ username });
        }
    }, [username]);

    useEffect(() => {
        setIsFollow(userInfo?.isFollow);
    }, []);

    const handleSwapFollow = () => {
        if (api.loading && api.req === "swapFollow") return;
        swapFollow(userInfo?._id, isFollow != null ? isFollow : userInfo?.isFollow);
    };

    const handlechat = () => {
        if(userInfo?.canChat)
            GetAllMessageInChat(userInfo?._id)
    };
    const projectData = projects?.data?.projects || [];
    return (
        user &&
    
            <div className='sm:container'>
                <Followers id={"show-followers"} />
                {user?.loading? 
                    <div className="bg-gray-200 dark:bg-[#1f1f1f] h-36 md:h-72 w-full animate-pulse rounded-b-[50px] mb-4"></div>:
                    <Conver converPic={userInfo?.coverImage} />
                }
                    <div className='flex lg:grid lg:grid-cols-6 gap-3 pt-7 flex-col lg:flex-row'>
                    {user?.loading ?
                    <DuvduLoading loadingIn={""} type='profileCard'/>:
                    <div className='col-span-2 sm:bg-white sm:dark:bg-black sm:pt-10 sm:pb-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>
                        <div className='px-6 sm:px-10'>
                            <Info
                                src={userInfo?.profileImage || process.env.DEFULT_PROFILE_PATH}
                                location={userInfo?.address || 'NONE'}
                                personalName={userInfo?.name?.split(' ')[0].length>6?userInfo?.name?.split(' ')[0].slice(0,6):userInfo?.name?.split(' ')[0]}
                                popularity={{
                                    likes: userInfo?.likes,
                                    followers: userInfo?.followCount.followers,
                                    views: userInfo?.profileViews,
                                }}
                                categories={userInfo?.categories}
                                rank={userInfo?.rank?.title}
                                rankcolor={userInfo?.rank?.color}
                                isMe={false}
                                occupation={userInfo?.category?.title}
                                rates={userInfo?.rate.totalRates}
                            />
                            {isLogin ===true && (
                                <div className='flex gap-3 items-center mt-7'>
                                    <AppButton
                                        
                                        className={`w-full z-0 ${isFollow ? 'opacity-60' : ''}`}
                                        onClick={swapFollowRespond?.loading?null:handleSwapFollow}
                                    >
                                        {swapFollowRespond?.loading ? (
                                            <img className={"load mx-auto transition duration-500 ease-in-out w-10 h-10"} src="/assets/imgs/loading.gif" alt="loading" />
                                        ) : (
                                            isFollow ? 'Unfollow' : 'Follow'
                                        )}
                                    </AppButton>
                                    <div onClick={handlechat} className={userInfo?.canChat ?"":'cursor-not-allowed'}>
                                        {userInfo?.canChat ?
                                            <Icon type='far' name="chat" /> :
                                            <Icon type='far' name="chatOff" />
                                        }
                                    </div>

                                </div>
                            )}
                        </div>

                        {
                            userInfo?.about &&
                            <>
                                <div className='h-divider mt-7 mb-7'></div>

                                <div className='px-10'>
                                    <h3 className='pt-6' id='about-header'>{t("about")}</h3>
                                    <p className='pt-6' id='about-paragraph'>{userInfo?.about}</p>
                                </div>
                            </>
                        }

                        {
                            profile.comments.length && false &&
                            <>
                                <div className='h-divider my-7'></div>
                                <div className='px-10'>
                                    <div className='flex flex-col gap-4'>
                                        {profile.comments.map(comment => (
                                            <Comment key={comment.id} comment={comment} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        }
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
                    </div>}
                    <div className='col-span-4 w-full mb-10 -translate-y-[80px] sm:-translate-y-0'>
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
            </div>
        
    );
}

const mapStateToProps = (state) => ({
    isLogin: state.auth.login,
    api: state.api,
    user: state.api.getOtherprofile,
    projects: state.api.GetUserProject,
    swapFollowRespond: state.api.swapFollow,
    userReview_respond: state.api.userReview,

});

const mapDispatchToProps = {
    GetAllMessageInChat,
    getOtherprofile,
    GetUserProject,
    setFollow,
    swapFollow,
    userReview
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);

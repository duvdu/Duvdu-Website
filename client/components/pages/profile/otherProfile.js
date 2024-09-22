import { useEffect, useState } from "react";
import AppButton from "../../elements/button";
import Comment from "../../elements/comment";
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
import DuvduLoading from '../../elements/duvduLoading';

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
    islogin
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
            getOtherprofile(username);
            GetUserProject({ username });
        }
    }, [username]);

    useEffect(() => {
        setIsFollow(userInfo?.isFollow);
    }, []);

    const handleSwapFollow = () => {
        if (api.loading && api.req === "swapFollow") return;
        console.log(user)
        swapFollow(userInfo?._id, isFollow != null ? isFollow : userInfo?.isFollow);
    };

    const handlechat = () => {
        if(userInfo?.canChat)
            GetAllMessageInChat(userInfo?._id)
    };
    console.log({projects})
    const projectData = projects?.data?.projects || [];
    console.log({user, projectData})
    return (
        
            <div className='sm:container'>
                <Followers id={"show-followers"} />
                {user?.loading? 
                    <div className="bg-gray-200 dark:bg-[#1f1f1f] h-36 md:h-72 w-full animate-pulse rounded-b-[50px] mb-4"></div>:
                    <Conver converPic={userInfo?.coverImage} />
                }
                <div className='flex gap-3 pt-7 flex-col lg:flex-row mb-5'>
                {user?.loading?
                    <DuvduLoading loadingIn={""} type='profileCard'/>:
                    <div className='sm:bg-white sm:dark:bg-black sm:pt-10 sm:pb-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>
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
                                rank={userInfo?.rank?.title}
                                rankcolor={userInfo?.rank?.color}
                                isMe={false}
                                occupation={userInfo?.category?.title}
                                rates={userInfo?.rate.totalRates.toFixed(1)}
                            />
                            {islogin && (
                                <div className='flex gap-3 items-center mt-7'>
                                    <AppButton
                                        className={`w-full z-0 ${isFollow ? 'opacity-60' : ''}`}
                                        onClick={handleSwapFollow}
                                    >
                                        {api.loading && api.req === "swapFollow" ? (
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

                    </div>}
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
            </div>
        
    );
}

const mapStateToProps = (state) => ({
    islogin: state.auth.login,
    api: state.api,
    user: state.api.getOtherprofile,
    projects: state.api.GetUserProject,
    swapFollowRespond: state.api.swapFollow,
    
});

const mapDispatchToProps = {
    GetAllMessageInChat,
    getOtherprofile,
    GetUserProject,
    setFollow,
    swapFollow
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);

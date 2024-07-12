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

const profile = {
    comments: [
        {
            id: 1,
            userName: "jonathan donrew",
            date: "Sun - Aug 3",
            avatar: "/assets/imgs/profile/defultUser.jpg",
            commentText: "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            id: 2,
            userName: "jonathan donrew",
            date: "Sun - Aug 3",
            avatar: "/assets/imgs/profile/defultUser.jpg",
            commentText: "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
        },
        {
            id: 3,
            userName: "jonathan donrew",
            date: "Sun - Aug 3",
            avatar: "/assets/imgs/profile/defultUser.jpg",
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

    useEffect(() => {
        if (swapFollowRespond && username) {
            setIsFollow(swapFollowRespond.isFollow);
        } else {
            setIsFollow(user?.isFollow);
        }
    }, [swapFollowRespond, user?.isFollow]);
    
    useEffect(() => {
        if (username) {
            getOtherprofile(username);
            GetUserProject({ username });
        }
    }, [username]);
    
    useEffect(() => {
        setIsFollow(user?.isFollow);
    }, []);

    const handleSwapFollow = () => {
        if (api.loading && api.req === "swapFollow") return;
        console.log(user)
        swapFollow(user._id, isFollow != null ? isFollow : user.isFollow);
    };

    const projectData = projects?.data?.projects || [];
    user = user?.data;

    return (
        user && (
            <div className='sm:container'>
                <Followers id={"show-followers"} />
                <Conver converPic={user.coverImage || process.env.DEFULT_COVER_PATH} />
                <div className='flex gap-3 pt-7 flex-col lg:flex-row mb-5'>
                    <div className='sm:bg-white sm:dark:bg-black sm:pt-10 sm:pb-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>
                        <div className='px-6 sm:px-10'>
                            <Info
                                src={user.profileImage || process.env.DEFULT_PROFILE_PATH}
                                location={user.address || 'NONE'}
                                occupation={'---'}
                                personalName={user.name}
                                popularity={{
                                    likes: user.likes,
                                    followers: user.followCount.followers,
                                    views: user.profileViews,
                                }}
                                rank={'---'}
                                rates={user?.rate?.totalRates}
                                isMe={false}
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
                                    <div onClick={() => GetAllMessageInChat(user._id)} className='rounded-full border border-[#00000040] h-16 aspect-square flex items-center justify-center cursor-pointer'>
                                        <Icon type='far' name="chat" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {
                            user.about &&
                            <>
                                <div className='h-divider mt-7 mb-7'></div>

                                <div className='px-10'>
                                    <h3 className='pt-6' id='about-header'>about</h3>
                                    <p className='pt-6' id='about-paragraph'>{user.about}</p>
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

                    </div>
                    <div className='right-side mb-10 -translate-y-[80px] sm:-translate-y-0'>
                        {projectData.length === 0 ? (
                            <EmptyComponent message="No Projects Yet!" />
                        ) : (
                            <Projects projects={projectData} />
                        )}
                    </div>
                </div>
            </div>
        )
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

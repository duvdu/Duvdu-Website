import { useEffect, useState } from "react";
import AppButton from "../../elements/button";
import Comment from "../../elements/comment";
import Conver from "../../elements/profile/conver";
import Info from "../../elements/profile/info";
import Projects from "../../elements/profile/projects";
import { connect } from "react-redux";
import Icon from "../../Icons";
import { GetAllMessageInChat } from "../../../redux/action/apis/realTime/messages/getAllMessageInChat";
import { getOtherprofile } from "../../../redux/action/apis/auth/profile/getOtherProfile";
import { useRouter } from "next/router";
import { GetProjects } from "../../../redux/action/apis/cycles/projects/get";
import { setFollow } from "../../../redux/action/apis/auth/profile/setFollow";
import { setUnFollow } from "../../../redux/action/apis/auth/profile/setUnFollow";

function OtherProfile({
    user,
    getOtherprofile,
    GetAllMessageInChat,
    GetProjects,
    projects,
    setFollow,
    follow_respond,
    setUnFollow,
    setUnFollow_respond,
    islogin
}) {

    const route = useRouter()
    const { profile: username } = route.query
    useEffect(() => {
        getOtherprofile(username)
        GetProjects({})
        setUnFollow(-1)
        setFollow(-1)
    }, [username, setUnFollow_respond, follow_respond])


    projects = projects?.data

    var profile = {

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

    };
    user = user?.data


    const swapFollow = () => {
        if (user.isFollow || false)
            setUnFollow(user._id)
        else
            setFollow(user._id)
    }

    return (
        user &&
        // !user ? <h1> There's No User name {username} </h1> :
        <div className='sm:container'>
            <Conver converPic={user.coverImage || process.env.DEFULT_COVER_PATH} />
            <div className='flex gap-3 pt-7 flex-col lg:flex-row'>
                <div className='sm:bg-white sm:dark:bg-black sm:pt-10 sm:pb-10 left-side rounded-[55px] flex-1 relative -translate-y-[80px] sm:-translate-y-0'>
                    <div className='px-6 sm:px-10'>
                        {/* info */}
                        <Info src={user.profileImage || process.env.DEFULT_PROFILE_PATH}
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
                        />
                        {/* -- info -- */}
                        {
                            islogin &&
                            <div className='flex gap-3 items-center mt-7'>
                                <AppButton
                                    className={`w-full z-0 ${user.isFollow ? 'opacity-60' : ''}`}
                                    onClick={swapFollow}
                                >
                                    {user.isFollow ? 'Unfollow' : 'Follow'}
                                </AppButton>
                                <div onClick={() => GetAllMessageInChat(user._id)} className='rounded-full border border-[#00000040] h-16 aspect-square flex items-center justify-center cursor-pointer'>
                                    <Icon type='far' name="chat" />
                                </div>
                            </div>
                        }
                    </div>

                    <div className='h-divider mt-7 mb-7'></div>
                    <div className='px-10'>
                        <h3 className='pt-6' id='about-header'>about</h3>
                        <p className='pt-6' id='about-paragraph'>{user.about}</p>
                    </div>
                    <div className='h-divider my-7'></div>
                    <div className='px-10'>
                        <div className='flex flex-col gap-4'>
                            {profile.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>

                </div>
                <div className='right-side'>
                    {
                        projects?.length == 0 &&
                        <h3>No User Found </h3>
                    }

                    <Projects projects={projects} />
                </div>
            </div>
        </div>

    );
}


const mapStateToProps = (state) => ({
    islogin: state.auth.login,
    // login_respond: state.api.login,
    user: state.api.getOtherprofile,
    projects: state.api.GetProjects,
    follow_respond: state.api.setFollow,
    setUnFollow_respond: state.api.setUnFollow,
});

const mapDispatchToProps = {
    GetAllMessageInChat,
    getOtherprofile,
    GetProjects,
    setFollow,
    setUnFollow
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
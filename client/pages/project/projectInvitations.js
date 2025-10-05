import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Icon from '../../components/Icons';
import { useTranslation } from 'react-i18next';
import ProjectCard from "../../components/elements/project-card";
import Button from '../../components/elements/button';
import Loading from '../../components/elements/loading';
import Filter from "../../components/elements/filter";
// import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { GetTaggedProject } from "../../redux/action/apis/auth/profile/getUserProjects";
import { AcceptInvitation } from "../../redux/action/apis/cycles/projects/acceptInvitation";
import DuvduLoading from "../../components/elements/duvduLoading";
import EmptyComponent from "../../components/pages/contracts/emptyComponent";
import Popup from "../../components/elements/popup";

const Projects = ({ projectInvitations_respond , acceptInvitation_respond ,AcceptInvitation, GetTaggedProject, isLogin }) => {
    const { t } = useTranslation();
    const [isAccept,setIsAccept] = useState(false)
    const [actionId,setActionId] = useState(null)
    const [post_success, setPost_success] = useState(false);
    const projectsList = projectInvitations_respond?.data
    const Router = useRouter();
    const searchTerm = Router.query.search;
    useEffect(() => {
        if(acceptInvitation_respond?.message==='success')
        GetTaggedProject({inviteStatus:'pending'});
    }, [acceptInvitation_respond]);
    useEffect(()=>{
        GetTaggedProject({inviteStatus:'pending'});
    },[])
    useEffect(()=>{
        if(isLogin ===false)
            Router.push('/')
    },[isLogin])
    const toggleDrawer = () => {
        setPost_success(false)
    }

    return (
        <>
            <Popup id={"project-invitations"} className={post_success ? 'show' : '' } onCancel={toggleDrawer}>
                <div className="flex flex-col justify-center w-full sm:w-[604px] h-full my-14">
                    <div className="heading_s1 mb-[88px] text-center">
                        <div className="flex w-full justify-center">
                            {isAccept ? 
                            <Icon name={"done"} className="mb-9" />
                            :<Icon name={"x"} className="mb-9" />
                            }
                        </div>
                        {isAccept ? 
                        <h1 className="text-3xl font-semibold my-5">{t(`Successfully Tagged`)}</h1>
                        :<h1 className="text-3xl font-semibold my-5">{t(`Tag declined`)}</h1>
                        }
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={toggleDrawer} className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">{t("Close")}</button>
                    </div>
                </div>
            </Popup>

            <Layout isbodyWhite={true} iSsticky={!searchTerm}>
                <section className="my-12">
                    <div className="container mb-30">
                    {projectsList?.length > 0 && (
                            <h1 className="page-header pb-9">{t("projects tags")}</h1>
                        )}
                        {projectsList?.length === 0 && (
                            <EmptyComponent message="No projects Found" />
                        )}
                        {(projectInvitations_respond?.loading)?
                       <DuvduLoading loadingIn={""} type='projects'/>:    
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {projectsList?.map((item, i) => (
                                <React.Fragment key={item._id}>
                                    <div className={`border rounded-[30px] border-solid border-gray-300 dark:border-opacity-40 dark:bg-[#222] p-3 h-full flex flex-col gap-5 `}>
                                        <Link href={`/creative/${item?.user?.username}`}>
                                            <div className='flex items-center cursor-pointer gap-3'>
                                                <img
                                                    className='profileImgture-2 rounded-full w-10 h-10 border-4 border-white shadow object-cover object-top'
                                                    src={item?.user?.profileImage || '/default-profile.png'}
                                                    alt="profile picture"
                                                />

                                                <div className='flex-2 flex-col gap-1'>
                                                    <h3 className='opacity-80 text-lg font-bold text-start'>{item?.user?.name?.split(' ')[0].length>6?item?.user?.name?.split(' ')[0].slice(0,6):item?.user?.name?.split(' ')[0] || "Unknown User"}</h3>
                                                    <span className='flex items-start justify-start opacity-40'>
                                                            <span className="text-start line-clamp-2">{item?.user?.username || "UNKNOWN"}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        {item?.creatives?.map((creative=>
                                        <div className='flex flex-wrap w-full pt-25 items-center gap-3'>
                                            {creative?.mainCategory?.category?.title && 
                                            <div className='info-container !normal-case'>
                                                <span>{creative?.mainCategory?.category?.title}</span>
                                            </div>
                                            }
                                            {creative?.mainCategory?.subCategories?.subCategory?.title && 
                                            <div className='info-container !normal-case'>
                                                <span>{creative?.mainCategory?.subCategories?.subCategory?.title}</span>
                                            </div>
                                            }
                                            {creative?.mainCategory?.subCategories?.tags.length>0 && 
                                                creative?.mainCategory?.subCategories?.tags.map(tag=>
                                                <div className='info-container !normal-case'>
                                                    <span>{tag?.title}</span>
                                                </div>
                                                )
                                            }
                                            {creative?.mainCategory?.relatedCategory?.category?.title && 
                                            <div className='info-container !normal-case'>
                                                <span>{creative?.mainCategory?.relatedCategory?.category?.title}</span>
                                            </div>
                                            }
                                            {creative?.mainCategory?.relatedCategory?.subCategories?.subCategory?.title && 
                                            <div className='info-container !normal-case'>
                                                <span>{creative?.mainCategory?.relatedCategory?.subCategories?.subCategory?.title}</span>
                                            </div>
                                            }
                                            {creative?.mainCategory?.relatedCategory?.subCategories?.tags.length>0 && 
                                                creative?.mainCategory?.relatedCategory?.subCategories?.tags.map(tag=>
                                                <div className='info-container !normal-case'>
                                                    <span>{tag?.title}</span>
                                                </div>
                                                )
                                            }
                                        </div>
                                        ))}
                                        <Link href={`/project/${item?._id}`}>
                                            <div className='rounded-full cursor-pointer py-5 w-full bg-gray-200 dark:bg-[#000]  text-center'>
                                                <h3 className='font-bold flex gap-1 items-center justify-center'>
                                                    <span>View Original Project</span>
                                                    <span><Icon className='w-5 h-5 p-[2px]' color='gray' name={'exclamation'} /></span>
                                                
                                                </h3>
                                            </div>
                                        </Link>
                                        <div className='flex flex-nowrap gap-2'>
                                            <button className="rounded-full w-full h-[66px] text-white bg-primary text-lg font-bold mt-2" onClick={()=>{
                                                setIsAccept(true)
                                            setActionId(item._id)
                                                AcceptInvitation(item._id , true).then(()=>{
                                                    setPost_success(true)
                                                })
                                            }}>
                                            {acceptInvitation_respond?.loading && item._id == actionId && isAccept===true ? 
                                                <Loading/>
                                                :
                                                t("Accept")}
                                            </button>
                                            <button className="rounded-full w-full h-[66px] capitalize col-span-1 text-white bg-[#EB1A40] text-lg font-bold mt-2" onClick={()=>{
                                                setIsAccept(false)
                                                setActionId(item._id)
                                                AcceptInvitation(item._id , false)
                                                }}>
                                            {acceptInvitation_respond?.loading && item._id == actionId && isAccept===false ? 
                                                <Loading/>
                                                :
                                                t("reject")}
                                            </button>
                                        </div>
                                        </div> 
                                       </React.Fragment>
                            ))}
                        </div>
                        }
                        {/* <div className="w-0 h-0" />
                        <DuvduLoading loadingIn={"GetTaggedProject"} /> */}
                    </div>
                </section>
            </Layout>
        </>
    );
};



const mapStateToProps = (state) => ({
    projectInvitations_respond: state.api.GetTaggedProject,
    acceptInvitation_respond:state.api.AcceptInvitation,
    isLogin: state.auth.login,
    api: state.api,
});

const mapDispatchToProps = {
    GetTaggedProject,
    AcceptInvitation
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

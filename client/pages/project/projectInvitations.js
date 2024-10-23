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
import { GetProjectInvitations } from "../../redux/action/apis/cycles/projects/getInvitation";
import { AcceptInvitation } from "../../redux/action/apis/cycles/projects/acceptInvitation";
import RelatedCategories from "../../components/elements/relatedCategories";
import DuvduLoading from "../../components/elements/duvduLoading";
import EmptyComponent from "../../components/pages/contracts/emptyComponent";

const Projects = ({ projectInvitations_respond , acceptInvitation_respond ,AcceptInvitation, GetProjectInvitations, isLogin }) => {
    const { t } = useTranslation();
    const [isAccept,setIsAccept] = useState()
    const projectsList = projectInvitations_respond?.data
    const Router = useRouter();
    const searchTerm = Router.query.search;
    useEffect(() => {
        GetProjectInvitations();
    }, [acceptInvitation_respond?.data]);
    useEffect(()=>{
        if(isLogin ===false)
            Router.push('/')
    },[isLogin])

    return (
        <>
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
                                                    className='profileImgture-2 rounded-full w-full h-full border-4 border-white shadow object-cover object-top'
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
                                        <Link href={`/project/${item?._id}`}>
                                            <div className='rounded-full cursor-pointer py-5 w-full bg-gray-200 dark:bg-[#000]  text-center'>
                                                <h3 className='font-bold flex gap-1 items-center justify-center'>
                                                    <span>View Original Project</span>
                                                    <span><Icon className='border rounded-full border-solid border-gray-300 dark:border-opacity-40 w-5 h-5 p-[2px]' name={'exclamation'} /></span>
                                                
                                                </h3>
                                            </div>
                                        </Link>
                                        <div className='flex flex-nowrap gap-2'>
                                            <button className="rounded-full w-full h-[66px] text-white bg-primary text-lg font-bold mt-2" onClick={()=>{
                                                AcceptInvitation(item._id , true)
                                                setIsAccept(true)
                                            }}>
                                            {acceptInvitation_respond?.loading && isAccept===true ? 
                                                <Loading/>
                                                :
                                                t("Accept")}
                                            </button>
                                            <button className="rounded-full w-full h-[66px] col-span-1 text-white bg-[#EB1A40] text-lg font-bold mt-2" onClick={()=>{
                                                AcceptInvitation(item._id , false)
                                                setIsAccept(false)
                                                }}>
                                            {acceptInvitation_respond?.loading && isAccept===false ? 
                                                <Loading/>
                                                :
                                                t("Reject")}
                                            </button>
                                        </div>
                                        </div> 
                                       </React.Fragment>
                            ))}
                        </div>
                        }
                        {/* <div className="w-0 h-0" />
                        <DuvduLoading loadingIn={"GetProjectInvitations"} /> */}
                    </div>
                </section>
            </Layout>
        </>
    );
};



const mapStateToProps = (state) => ({
    projectInvitations_respond: state.api.GetProjectInvitations,
    acceptInvitation_respond:state.api.AcceptInvitation,
    isLogin: state.auth.login,
    api: state.api,
});

const mapDispatchToProps = {
    GetProjectInvitations,
    AcceptInvitation
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

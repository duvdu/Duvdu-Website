import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Report from '../../components/popsup/report';
import ThanksMSG from '../../components/popsup/thanksMSG';
import ProjectBooking from "../../components/drawer/book/project";
import { GetProjects } from "../../redux/action/apis/cycles/projects/get";
import { GetProject } from "../../redux/action/apis/cycles/projects/getOne";
import AddToSaved from "../../components/popsup/addToSaved";
import ProjectController from "../../components/pages/stduiosAndProject/projectController";
import Header from "../../components/pages/stduiosAndProject/header";
import ProjectCover from "../../components/pages/stduiosAndProject/projectShow";
import About from "../../components/pages/stduiosAndProject/about";
import Details from "../../components/pages/stduiosAndProject/details";
import Reviews from "../../components/pages/stduiosAndProject/review";
import Recommended from "../../components/pages/stduiosAndProject/recommend";
import Share from "../../components/popsup/Share";
import { OpenPopUp } from "../../util/util";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import Icon from "../../components/Icons";
import { useTranslation } from 'react-i18next';
import DuvduLoading from "../../components/elements/duvduLoading";

// Install Swiper modules
SwiperCore.use([Autoplay, Navigation, EffectFade, Pagination]);

const Projects = ({
    GetProjects,
    projects_respond,
    GetProject,
    project_respond,
    chat_respond,
    auth,
    user
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { project: projectId } = router.query;
    const projects = projects_respond?.data || [];
    const [project, setProject] = useState(project_respond?.data);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenFav, setIsOpenFav] = useState(false);
    const [playingAudioRef, setPlayingAudioRef] = useState(null);

    useEffect(() => {
        setProject(project_respond?.data);
    }, [project_respond?.data]);

    useEffect(() => {
        if (projectId) {
            setProject(null);
            GetProject(projectId);
        }
    }, [projectId]);

    useEffect(() => {
        GetProjects({ limit: "4" });
    }, []);

    const toggleDrawer = () => {
        if (auth.login)
            setIsOpen(!isOpen);
        else OpenPopUp("registration-required");
    };

    const toggleDrawerAddFav = () => {
        setIsOpenFav(!isOpenFav);
    };
    const handleAudioPlay = (newAudioRef) => {
        if (playingAudioRef && playingAudioRef !== newAudioRef) {
          playingAudioRef.pause();
        }
        setPlayingAudioRef(newAudioRef);
      };
    return (
        <>
            <Layout>
                
                {project_respond?.loading?
                <>
                <DuvduLoading loadingIn={""} type='project'/>
                <div className='container'>
                    <DuvduLoading loadingIn={""} type='projects'/>
                </div>
                </>:
            project && (
                    
                    <>
                        <AddToSaved isOpen={isOpenFav} toggleDrawerAddFav={toggleDrawerAddFav} />
                        <Report />
                        <ThanksMSG />
                        <Share url={window.location.href} title={'See that 👀'} />
                        <div className={isOpen ? "h-0 sm:h-auto overflow-hidden" : ""}>
                            <div className="sm:container lg:mt-6">
                                {/* <section className="mx-7 sm:mx-0">
                                    <Header data={project} toggleDrawerAddFav={toggleDrawerAddFav} />
                                    <h2 className='font-bold text-lg capitalize opacity-80 mb-4 mx-5 sm:mx-0'>{t('Project Attachments')}</h2>
                                </section> */}
                                    <div className="flex lg:flex-row flex-col-reverse gap-3">
                                    <section className="lg:w-2/3">
                                        {project?.attachments.length > 1 ?
                                            <div className='mx-5 md:mx-0 rounded-[30px] overflow-hidden h-[600px] relative hidden lg:block'>
                                                {/* Custom Arrows */}
                                                {/* <div className="swiper-button-prev"> */}
                                                <div className='left-[30px] custom-swiper-prev !text-white top-1/2 icon-pause rounded-full p-2 flex flex-row items-center justify-center'>
                                                    <Icon className='!text-white !w-[10px] ' name={"chevron-left"} />
                                                </div>
                                                {/* </div> */}
                                                <div className='right-[30px] custom-swiper-next !text-white top-1/2 icon-pause rounded-full p-2 flex flex-row items-center justify-center'>
                                                    <Icon className='!text-white !w-[10px]' name={"chevron-right"} />
                                                </div>
                                                <Swiper
                                                    dir='ltr'
                                                    className='cardimg'
                                                    modules={[Autoplay, Navigation, EffectFade, Pagination]}
                                                    spaceBetween={0}
                                                    slidesPerView={1}
                                                    loop={true}
                                                    pagination={{
                                                        clickable: true,
                                                        el: '.swiper-pagination',
                                                    }}
                                                    onSlideChange={() => {
                                                        if (playingAudioRef) {
                                                          playingAudioRef.pause();  // Pause the currently playing audio when the slide changes
                                                        }
                                                      }}
                                                    navigation={{
                                                        prevEl: '.custom-swiper-prev',
                                                        nextEl: '.custom-swiper-next',
                                                    }}
                                                >
                                                    {project?.attachments.map((item, index) => {
                                                        return <SwiperSlide key={index}>
                                                            <ProjectCover onAudioPlay={handleAudioPlay} data={item} cover={project?.cover} />
                                                        </SwiperSlide>
                                                    })}
                                                </Swiper>
                                                {/* Pagination Bullets */}
                                                <div className="swiper-pagination"></div>
                                            </div> :
                                                <div className='mx-5 md:mx-0 rounded-[30px] overflow-hidden h-[600px] relative hidden lg:block'>
                                                <ProjectCover onAudioPlay={handleAudioPlay}  data={project?.attachments[0]} cover={project?.cover} />
                                            </div>
                                        }
                                        <About data={project} />
                                        <Reviews data={project} />
                                    </section>
                                    <section className="lg:w-1/3 mt-10 lg:mt-0">
                                        <Details onAudioPlay={handleAudioPlay} data={project} />
                                    </section>
                                </div>
                                <section className="mx-7 sm:mx-0">
                                    <Recommended projects={projects} />
                                </section>
                            </div>
                        </div>
                        {!chat_respond &&
                            <ProjectController initialData={project} toggleDrawer={toggleDrawer} toggleDrawerAddFav={toggleDrawerAddFav} canBook={project.user.username != user?.username} />
                        }
                        <ProjectBooking data={project} isOpen={isOpen} toggleDrawer={toggleDrawer} />
                    </>
                
                )}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    projects_respond: state.api.GetProjects,
    project_respond: state.api.GetProject,
    user: state.user.profile,
    auth: state.auth,
});

const mapDidpatchToProps = {
    GetProjects,
    GetProject,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Projects);

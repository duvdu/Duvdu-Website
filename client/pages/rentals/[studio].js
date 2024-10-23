import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import AddToTeam from '../../components/popsup/AddToTeam';
import Report from '../../components/popsup/report';
import ThanksMSG from '../../components/popsup/thanksMSG';
import StudioBooking from "../../components/drawer/book/studio";
import { GetStudios } from "../../redux/action/apis/cycles/rental/get";
import { Getstudio } from "../../redux/action/apis/cycles/rental/getOne";
import ProjectController from "../../components/pages/stduiosAndProject/projectController";
import Header from "../../components/pages/stduiosAndProject/header";
import ProjectCover from "../../components/pages/stduiosAndProject/projectShow";
import About from "../../components/pages/stduiosAndProject/about";
import Details from "../../components/pages/stduiosAndProject/details";
import Reviews from "../../components/pages/stduiosAndProject/review";
import Recommended from "../../components/pages/stduiosAndProject/recommend";
import AddToSaved from "../../components/popsup/addToSaved";
import { OpenPopUp } from "../../util/util";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import Icon from "../../components/Icons";
import { useTranslation } from 'react-i18next';
import DuvduLoading from "../../components/elements/duvduLoading";
import Share from "../../components/popsup/Share";
import { userReview } from '../../redux/action/apis/reviews/users';
import EditRental from './../../components/drawer/edit/editrental';

const Studio = ({
    GetStudios,
    studios_respond,
    Getstudio,
    studio_respond,
    update_respond,
    chat_respond,
    user,
    auth,
    userReview, 
    userReview_respond
}) => {
    const { t } = useTranslation();
    const router = useRouter()
    const { studio: studioId } = router.query;
    const projects = studios_respond?.data?.filter(item=> item._id !==studioId) || []
    const [studio, setStudio] = useState(studio_respond?.data);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenFav, setIsOpenFav] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [playingAudioRef, setPlayingAudioRef] = useState(null);
    useEffect(() => {
        if (studio_respond?.data?.user?.username)
            userReview({ username: studio_respond?.data?.user?.username })
    }, [studio_respond?.data?.user?.username  ])

    useEffect(() => {
        setStudio(studio_respond?.data);
    }, [studio_respond?.data , update_respond?.message]);

    useEffect(() => {
        if (studioId) {
            setStudio(null)
            Getstudio(studioId);
        }

    }, [studioId]);

    const loveToggleAction = () => {
        SwapProjectToFav({ projectId: projectId, action: studio.isFavourite ? "remove" : "add" })
    };


    // useEffect(() => {
    //     GetStudios({ limit: 4 });
    // }, []);
    useEffect(() => {
        const params = {
            limit: "5",
        };
        const categoryId = studio_respond?.data?.category?._id
        if (categoryId) {
            params.category = categoryId;
            const queryString = new URLSearchParams(params).toString();
            GetStudios(queryString);
        }
    }, [studio_respond?.data?.category?._id]);



    const toggleDrawer = () => {
        if (auth.login)
            setIsOpen(!isOpen);
        else OpenPopUp("registration-required")
    };

    const toggleDrawerAddFav = () => {
        setIsOpenFav(!isOpenFav);
    };
    const toggleDrawerEdit = () => {
        setIsOpenEdit(!isOpenEdit);
    };
    const handleAudioPlay = (newAudioRef) => {
        if (playingAudioRef && playingAudioRef !== newAudioRef) {
          playingAudioRef.pause();
        }
        setPlayingAudioRef(newAudioRef);
      };

    return (
        <>
            <Layout >
            {studio_respond?.loading?
            <>
                <DuvduLoading loadingIn={""} type='project'/>
            </>:
                studio &&
                    (
                        <>
                            <EditRental data={studio} isOpen={isOpenEdit}  id={studio?._id} setIsOpenEdit={setIsOpenEdit} />
                            <AddToSaved isOpen={isOpenFav} toggleDrawerAddFav={toggleDrawerAddFav} />
                            <AddToTeam />
                            <Report />
                            <ThanksMSG />
                            <Share url={window.location.href} title={'See that 👀'} />
                            <div className={isOpen ? "h-0 sm:h-auto overflow-hidden" : ""}>
                                <div className="sm:container lg:mt-6">
                                    {/* <section className="mx-7 sm:mx-0" >
                                        <Header data={studio} toggleDrawerAddFav={toggleDrawerAddFav} />
                                        <h2 className='font-bold text-lg capitalize opacity-80 mb-4 mx-5 sm:mx-0'>{t('Project Attachments')}</h2>
                                    </section> */}
                                    <div className="flex lg:flex-row flex-col gap-3">
                                        <section className="lg:w-1/3 mt-6 lg:mt-0">
                                        <Details toggleDrawerEdit={toggleDrawerEdit} onAudioPlay={handleAudioPlay} data={studio} />
                                        </section>
                                        <section className="lg:w-2/3">
                                            {studio?.attachments.length > 1 ?
                                                <div className='mx-5 lg:mx-0 rounded-[30px] overflow-hidden h-[600px] relative hidden lg:block'>
                                                    {/* Custom Arrows */}
                                                    {/* <div className="swiper-button-prev"> */}
                                                    <button className='left-[30px] custom-swiper-prev !text-white top-1/2 icon-pause rounded-full p-2 flex flex-row items-center justify-center'>
                                                        <Icon className='!text-white !w-[10px] ' name={"chevron-left"} />
                                                    </button>
                                                    {/* </button> */}
                                                    <button className='right-[30px] custom-swiper-next !text-white top-1/2 icon-pause rounded-full p-2 flex flex-row items-center justify-center'>
                                                        <Icon className='!text-white !w-[10px]' name={"chevron-right"} />
                                                    </button>
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
                                                        {studio?.attachments.map((item, index) => {
                                                            return <SwiperSlide key={index}>
                                                                <ProjectCover data={item} cover={studio?.cover} />
                                                            </SwiperSlide>
                                                            return <SwiperSlide key={index}>
                                                                <ProjectCover onAudioPlay={handleAudioPlay} data={item} cover={studio?.cover} />
                                                            </SwiperSlide>                                                        
                                                        })}
                                                    </Swiper>
                                                    {/* Pagination Bullets */}
                                                    <div className="swiper-pagination"></div>
                                                </div> :
                                                    <div className='mx-5 lg:mx-0 rounded-[30px] overflow-hidden h-[600px] relative hidden lg:block'>
                                                        <ProjectCover onAudioPlay={handleAudioPlay}  data={studio?.attachments[0]} cover={studio?.cover} />
                                                    </div>
                                            }
                                            <About data={studio} />
                                            {userReview_respond?.data && 
                                            <div className='pt-5'> 
                                                <Reviews project={true} userName={studio?.user?.username} data={userReview_respond?.data} />
                                            </div> 
                                            }
                                            </section>
                                    </div>
                                    <section className="mx-7 sm:mx-0">
                                    {studios_respond?.loading?
                                        <div className='py-10'>
                                        <DuvduLoading loadingIn={""} type='projects'/>
                                    </div>
                                    :
                                    <Recommended projects={projects} type={"rentals"} />
                                }
                                    </section>
                                </div>
                            </div>
                            {!chat_respond &&
                                <ProjectController initialData={studio} toggleDrawer={toggleDrawer} toggleDrawerAddFav={toggleDrawerAddFav} canBook={studio.user.username != user?.username} />}
                            <StudioBooking data={studio} isOpen={isOpen} toggleDrawer={toggleDrawer} />

                        </>
                    )
                }
            </Layout>
        </>
    );
};



const mapStateToProps = (state) => ({
    studios_respond: state.api.GetStudios,
    studio_respond: state.api.Getstudio,
    update_respond: state.api.UpdateRental,
    projectReview_respond: state.api.projectReview,
    user: state.user.profile,
    auth: state.auth,
    userReview_respond: state.api.userReview,
});

const mapDidpatchToProps = {
    GetStudios,
    Getstudio,
    userReview
};

export default connect(mapStateToProps, mapDidpatchToProps)(Studio);

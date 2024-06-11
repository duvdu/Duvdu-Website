import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Icon from '../../components/Icons';
import { OpenPopUp, convertToK } from "../../util/util";
import ProjectCard from "../../components/elements/project-card";
import { convertHoursTo__ } from '../../util/util';
import Comment from '../../components/elements/comment';
import Controller from '../../components/elements/controllers';
import ArrowBtn from '../../components/elements/arrowBtn';
import AddToTeam from '../../components/popsup/AddToTeam';
import Report from '../../components/popsup/report';
import ThanksMSG from '../../components/popsup/thanksMSG';
import Selector from "../../components/elements/CustomSelector";
import ProjectBooking from "../../components/drawer/book/project";
import GoogleMap from "../../components/elements/googleMap";
import dateFormat from "dateformat";
import StudioBooking from "../../components/drawer/book/studio";
import { GetStudios } from "../../redux/action/apis/cycles/studio/get";
import { Getstudio } from "../../redux/action/apis/cycles/studio/getOne";
import { GetAllMessageInChat } from "../../redux/action/apis/realTime/messages/getAllMessageInChat";
import Share from './../../components/popsup/Share';
import Link from "next/link";
import ProjectController from "../../components/pages/stduiosAndProject/projectController";
import Header from "../../components/pages/stduiosAndProject/header";
import ProjectCover from "../../components/pages/stduiosAndProject/projectShow";
import About from "../../components/pages/stduiosAndProject/about";
import Details from "../../components/pages/stduiosAndProject/details";
import Reviews from "../../components/pages/stduiosAndProject/review";
import Recommended from "../../components/pages/stduiosAndProject/recommend";
import { configureStore } from "@reduxjs/toolkit";



const Studio = ({ 
    GetStudios, 
    studios_respond, 
    Getstudio, 
    studio_respond, 
    GetAllMessageInChat, 
    chat_respond, 
    user,
    auth }) => {

    const router = useRouter()
    const { studio: studioId } = router.query;
    const projects = studios_respond?.data || []
    const studio = studio_respond?.data
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (studioId)
            Getstudio(studioId);

    }, [studioId]);

    const loveToggleAction = () => {
        SwapProjectToFav({ projectId: projectId, action: studio.isFavourite ? "remove" : "add" })
    };

    
    useEffect(() => {
        GetStudios({ limit: 4 });
    }, []);


    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Layout >
                {studio &&
                    (
                        <>
                            <AddToTeam />
                            <Report />
                            <ThanksMSG />
                            <div className={isOpen ? "h-0 sm:h-auto overflow-hidden" : ""}>
                                <div className="sm:container mt-6">
                                    <section className="mx-7 sm:mx-0" >
                                        <Header data={studio} />
                                    </section>
                                    <div className="lg:flex gap-6">
                                        <section className="lg:w-2/3">
                                            <ProjectCover data={studio} />
                                            <About data={studio} />
                                        </section>
                                        <section className="lg:w-1/3 mt-10 lg:mt-0">
                                            <Details data={studio} />
                                            <Reviews data={studio} />
                                        </section>
                                    </div>
                                    <section className="mx-7 sm:mx-0">
                                        <Recommended projects={projects} type={"studio-booking"}/>
                                    </section>
                                </div>
                            </div>
                            {!chat_respond &&
                                <ProjectController initialData={studio} toggleDrawer={toggleDrawer} canBook={studio.user._id != user._id}/>}
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
    user: state.user.profile,
});

const mapDidpatchToProps = {
    GetStudios,
    Getstudio,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Studio);

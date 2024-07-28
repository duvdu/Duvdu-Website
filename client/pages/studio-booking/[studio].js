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

const Studio = ({
    GetStudios,
    studios_respond,
    Getstudio,
    studio_respond,
    chat_respond,
    user,
    auth
}) => {

    const router = useRouter()
    const { studio: studioId } = router.query;
    const projects = studios_respond?.data || []
    const [studio, setStudio] = useState(studio_respond?.data);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenFav, setIsOpenFav] = useState(false);

    useEffect(() => {
        setStudio(studio_respond?.data);
    }, [studio_respond?.data]);

    useEffect(() => {
        if (studioId) {
            setStudio(null)
            Getstudio(studioId);
        }

    }, [studioId]);

    const loveToggleAction = () => {
        SwapProjectToFav({ projectId: projectId, action: studio.isFavourite ? "remove" : "add" })
    };


    useEffect(() => {
        GetStudios({ limit: 4 });
    }, []);


    const toggleDrawer = () => {
        if (auth.login)
            setIsOpen(!isOpen);
        else OpenPopUp("registration-required")
    };

    const toggleDrawerAddFav = () => {
        setIsOpenFav(!isOpenFav);
    };
    return (
        <>
            <Layout >
                {studio &&
                    (
                        <>
                            <AddToSaved isOpen={isOpenFav} toggleDrawerAddFav={toggleDrawerAddFav} />
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
                                        <Recommended projects={projects} type={"studio-booking"} />
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
    projectReview_respond: state.api.projectReview,
    user: state.user.profile,
    auth: state.auth,
});

const mapDidpatchToProps = {
    GetStudios,
    Getstudio,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Studio);

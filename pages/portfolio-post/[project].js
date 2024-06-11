import { useRouter } from "next/router";
import { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Report from '../../components/popsup/report';
import ThanksMSG from '../../components/popsup/thanksMSG';
import ProjectBooking from "../../components/drawer/book/project";
import { GetProjects } from "../../redux/action/apis/cycles/projects/get";
import { GetProject } from "../../redux/action/apis/cycles/projects/getOne";
import { GetAllMessageInChat } from "../../redux/action/apis/realTime/messages/getAllMessageInChat";
import AddToSaved from "../../components/popsup/addToSaved";
import { AddProjectToBoard } from "../../redux/action/apis/savedProject/boardProjects/add";
import { SwapProjectToFav } from "../../redux/action/apis/savedProject/fav/favAction";
import ProjectController from "../../components/pages/stduiosAndProject/projectController";
import Header from "../../components/pages/stduiosAndProject/header";
import ProjectCover from "../../components/pages/stduiosAndProject/projectShow";
import About from "../../components/pages/stduiosAndProject/about";
import Details from "../../components/pages/stduiosAndProject/details";
import Reviews from "../../components/pages/stduiosAndProject/review";
import Recommended from "../../components/pages/stduiosAndProject/recommend";
import Share from "../../components/popsup/Share";


const Projects = ({
    GetProjects,
    projects_respond,
    GetProject,
    project_respond,
    chat_respond,
    user
}) => {

    const router = useRouter()
    const { project: projectId } = router.query;
    const projects = projects_respond?.data || []
    const project = project_respond?.data
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (projectId) {
            GetProject(projectId);
        }
    }, [projectId]);

    useEffect(() => {
        GetProjects({ limit: "4" });
    }, []);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Layout >
                {project &&
                    <>
                        <AddToSaved />
                        <Report />
                        <ThanksMSG />
                        <Share url={window.location.href} title={'See that 👀'} />
                        <div className={isOpen ? "h-0 sm:h-auto overflow-hidden" : ""}>
                            <div className="sm:container mt-6">
                                <section className="mx-7 sm:mx-0" >
                                    <Header data={project} />
                                </section>
                                <div className="lg:flex gap-6">
                                    <section className="lg:w-2/3">
                                        {/* <ProjectShow data={data} /> */}
                                        <ProjectCover data={project} />
                                        <About data={project} />
                                    </section>
                                    <section className="lg:w-1/3 mt-10 lg:mt-0">
                                        <Details data={project} />
                                        <Reviews data={project} />
                                    </section>
                                </div>
                                <section className="mx-7 sm:mx-0">
                                    <Recommended projects={projects} />
                                </section>
                            </div>
                        </div>
                        {!chat_respond &&
                            <ProjectController initialData={project} toggleDrawer={toggleDrawer} canBook={project.user._id != user._id}/>
                        }
                        <ProjectBooking data={project} isOpen={isOpen} toggleDrawer={toggleDrawer} />
                    </>
                }
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    projects_respond: state.api.GetProjects,
    project_respond: state.api.GetProject,
    user: state.user.profile,
});

const mapDidpatchToProps = {
    GetProjects,
    GetProject,
    
};

export default connect(mapStateToProps, mapDidpatchToProps)(Projects);

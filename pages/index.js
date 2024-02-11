import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "./../components/layout/Layout";
import { fetchProjects } from "./../redux/action/project";
import Card from "./../components/elements/home-card";

const Projects = ({ projects, projectFilters, fetchProjects }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const showLimit = 24;
    const [limit, setLimit] = useState(showLimit);

    const targetRef = useRef(null);

    useEffect(() => {
        fetchProjects(searchTerm, "/static/projects.json", projectFilters);
    }, [projectFilters]);

    useEffect(() => {
        fetchProjects(searchTerm, "/static/projects.json", projectFilters, limit);
    }, [limit]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        let hasBeenVisible = false;

        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    setTimeout(() => {
                        setLimit((prevLimit) => prevLimit + showLimit);
                    }, 2000);

                    if (targetRef.current) {
                        targetRef.current.classList.add('active');
                    }

                    hasBeenVisible = true;


                    observer.unobserve(entry.target);
                }
                else {
                    if (targetRef.current) {
                        targetRef.current.classList.remove('active');
                    }

                }

            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [limit]);


    const getPaginatedProjects = projects.items.slice(0, limit);

    return (
        <>
            <Layout>
                <section className="mt-12 mb-12">
                    <div className="container mb-30">
                        <h1 className="page-header">most popular on duvdu</h1>
                        {getPaginatedProjects.length === 0 && (
                            <h3>No projects Found </h3>
                        )}
                        <div className="project-grid">
                            {getPaginatedProjects.map((item, i) => (
                                <Card className='cursor-pointer' href="/project" key={i} cardData={item} />
                            ))}
                        </div>
                        {
                            getPaginatedProjects.length === limit &&
                            <div className="load-parent">
                                <img className="load" ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects,
    projectFilters: state.projectFilters,
});

const mapDispatchToProps = {
    fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

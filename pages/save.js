import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "./../components/layout/Layout";
import { fetchProjects } from "./../redux/action/project";
import Card from "./../components/elements/project-card";
import Icon from '../components/Icons';
import { Goback } from '../util/util';


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

  

    const getPaginatedProjects = Math.random() < 0.5 ? projects.items.slice(0, 0) : projects.items.slice(0, limit);


    return (
        <>
            <Layout isbodyWhite={true}>
                <section className="mt-6 mb-12">
                    <div className="container mb-30">

                        <div className='flex gap-3 pb-6'>
                        <div className='flex justify-center items-center rounded-full border px-5 cursor-pointer aspect-square' onClick={Goback}>
                            <Icon className='text-xl' name={'angle-left'} />
                        </div>
                            <span className='flex items-center rounded-full header-border px-7 h-14 text-lg font-medium'>
                                Favorites
                            </span>
                        </div>
                        {getPaginatedProjects.length === 0 && (
                            <EmptyComponent />
                        )}
                        <div className="grid minmax-280 gap-5">
                            {getPaginatedProjects.map((item, i) => (
                                <Card className='cursor-pointer' href="/project/1" key={i} cardData={item} />
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

const EmptyComponent = () => {
    return (
        <div className='container flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet'>
            <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
            <img src='/assets/imgs/theme/Empty.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
            <h3 className='text-2xl font-bold mt-8 mb-4'>
                No Projects Yet!
            </h3>
        </div>

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

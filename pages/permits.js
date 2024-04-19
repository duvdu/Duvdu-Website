import React, { useRef, useEffect, useState } from 'react';
import Layout from "../components/layout/Layout";
import Card from "../components/elements/producers-card";
import Card2 from "../components/elements/permits-card";
import Filter from "../components/elements/filter";
import Drawer from "../components/popsup/producersDrawer";
import Formsubmitted from '../components/popsup/formsubmitted';

const Projects = () => {
    const showLimit = 24;
    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState(null);
    
    const targetRef = useRef(null);

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

 
    const permits = [
        {
            "img": "/assets/imgs/profile/author-2.png",
            "name": "Youseff Sayed",
            "location": "5th Settlement",
            "rank": "Professional",
            "projects": 267,
            "rating": 3.7,
            "pricing":170,
            "duration":72,
        },
        {
            "img": "/assets/imgs/profile/author-1.png",
            "name": "Joseph Adel",
            "location": "5th Settlement",
            "rank": "Professional",
            "projects": 85,
            "rating": 4.2,
            "pricing":170,
            "duration":72,
        }
    ]
    const getPaginatedProjects = permits;

    const handlesetdata = (item) => {
        setdata(item)
        setIsOpen(!isOpen);
    };
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const submitt = () => {
        toggleDrawer();
    };

    return (
        <>
            <Layout>
                <section className="mt-12 mb-12">
                    <div className="container mb-30">
                        <Filter />
                        <h1 className="page-header my-6">most popular on duvdu</h1>
                        {getPaginatedProjects.length === 0 && (
                            <h3>No projects Found </h3>
                        )}
                        <div className="minmax-360">
                            {getPaginatedProjects.map((item, i) => {
                                return <Card2 onClick={() => handlesetdata(item)} key={i} cardData={item} />;
                                
                            })}
                        </div>
                        {
                            getPaginatedProjects.length === limit &&
                            <div className="load-parent">
                                <img className="load" ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        }
                        
                        <Formsubmitted  />
                        
                    </div>
                </section>
                {
                    isOpen &&
                    <Drawer submitt={submitt} data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
                }
            </Layout>
        </>
    );
};


export default Projects;

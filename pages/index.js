import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "./../components/layout/Layout";
import { fetchProjects } from "./../redux/action/project";
import Card from "./../components/elements/project-card";
import Filter from "../components/elements/filter";
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

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

        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setLimit((prevLimit) => prevLimit + showLimit);
                    }, 2000);
                    if (targetRef.current) {
                        targetRef.current.classList.add('active');
                    }
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
            <Layout isbodyWhite={true}>
                <section className="mt-6 mb-12">
                    <div className="container mb-30">
                        <Filter />
                        <h1 className="page-header">most popular on duvdu</h1>
                        {getPaginatedProjects.length === 0 && (
                            <h3>No projects Found </h3>
                        )}
                        <div className="grid minmax-280 gap-5">
                            {getPaginatedProjects.map((item, i) =>
                                <>
                                    {
                                        i == 0 &&
                                        <RelatedCategories className="block lg:hidden xl:hidden col-span-full" />
                                    }
                                    {
                                        i == 3 &&
                                        <RelatedCategories className="hidden lg:block xl:hidden col-span-full" />
                                    }
                                    {
                                        i == 4 &&
                                        <RelatedCategories className="hidden xl:block col-span-full" />
                                    }
                                    <Card className='cursor-pointer' href="/project" key={i} cardData={item} />

                                </>

                            )}
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





const RelatedCategories = ({ className }) => {
    return (
        <div className={className}>
            <h2 className="opacity-70 font-semibold text-lg">
                related categories
            </h2>
            <div className="mt-4">
                <Swiper
                    pagination={{ clickable: true }}
                    className="mySwiper"
                    breakpoints={{
                        240: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        532: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        // When window width is >= 640px
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        // When window width is >= 768px
                        1100: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                        // When window width is >= 1024px
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        }
                    }}
                >
                    {[
                        {
                            title: 'makeup artists',
                            count: '85',
                        },
                        {
                            title: 'lighting',
                            count: '120',
                        },
                        {
                            title: 'fashion designer',
                            count: '57',
                        },
                        {
                            title: 'makeup artists',
                            count: '85',
                        },
                        {
                            title: 'lighting',
                            count: '120',
                        },
                        {
                            title: 'fashion designer',
                            count: '57',
                        },
                        {
                            title: 'makeup artists',
                            count: '85',
                        },
                        {
                            title: 'lighting',
                            count: '120',
                        },
                        {
                            title: 'fashion designer',
                            count: '57',
                        },

                    ].map((item, index) =>
                        <SwiperSlide key={index}>
                            <RelatedCategoriesCard title={item.title} count={item.count} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
}
const RelatedCategoriesCard = ({ className, title, count }) => {
    return (
        <div className={`flex flex-col items-center justify-around border border-[#1A73EBB2] rounded-3xl w-full py-2 cursor-pointer ${className}`}>
            <span className="text-primary text-lg font-semibold opacity-80 capitalize">{title}</span>
            <span className="text-base font-medium opacity-50 capitalize">{count} creative</span>
        </div>
    );
}

const mapStateToProps = (state) => ({
    projects: state.projects,
    projectFilters: state.projectFilters,
});

const mapDispatchToProps = {
    fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

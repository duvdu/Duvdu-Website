import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import { fetchProjects } from "../redux/action/project";

import ProjectCard from "../components/elements/project-card";
import Filter from "../components/elements/filter";
// import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { GetProjects } from "../redux/action/apis/cycles/projects/get";

const Projects = ({ projects, GetProjects, api }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const projectsList = projects?.data
    const pagganation = projects?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const targetRef = useRef(null);

    
    useEffect(() => {
        if (limit){
            GetProjects({ limit: limit, search: searchTerm?.length > 0 ? searchTerm : null , page: page })
        }
    }, [limit,searchTerm])


    useEffect(() => {
        const handleScroll = () => {
            if (pagganation?.totalPages > page) {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || window.innerHeight;
                const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

                if (scrolledToBottom) {
                    setLimit(showLimit + limit);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, pagganation?.totalPages]);




    return (
        <>
            <Layout isbodyWhite={true} iSsticky={!searchTerm}>
                <section className="mb-12">
                    <div className="container mb-30">
                        {
                            searchTerm &&
                            <div className="sticky top-0 bg-DS_white z-[5] py-6 ">
                                <Filter />
                            </div>
                        }
                        {
                            !searchTerm &&
                            <div className="h-7" />
                        }
                        <h1 className="page-header pb-9">most popular on duvdu</h1>
                        {projectsList?.length === 0 && (
                            <h3>No projects Found </h3>
                        )}
                        <div className="grid minmax-280 gap-5">
                            {projectsList?.map((item, i) => (
                                <React.Fragment key={item.id || i}>
                                    {i === -1 && <RelatedCategories NeedTranslate={false} className="block lg:hidden xl:hidden col-span-full" />}
                                    {i === -1 && <RelatedCategories className="hidden lg:block xl:hidden col-span-full" />}
                                    {i === -1 && <RelatedCategories className="hidden xl:block col-span-full" />}
                                    <ProjectCard cardData={item} />
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="w-0 h-0" />
                        <img className={(api.loading && api.req == "GetProjects" ? "w-10 h-10" : "w-0 h-0") + "load mx-auto transition duration-500 ease-in-out"} ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                    </div>
                </section>
            </Layout>
        </>
    );
};





const RelatedCategories = ({ className, NeedTranslate = true }) => {

    return (
        <div className={className + (NeedTranslate ? " h-26 -translate-y-8" : "")}>
            <h2 className="opacity-70 font-semibold text-lg lg:mt-6">
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
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        1100: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
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
    projects: state.api.GetProjects,
    api: state.api,
    projectFilters: state.projectFilters,
});

const mapDispatchToProps = {
    GetProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

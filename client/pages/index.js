import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";

import ProjectCard from "../components/elements/project-card";
import Filter from "../components/elements/filter";
// import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { GetProjects } from "../redux/action/apis/cycles/projects/get";
import Home from "./home/home";

const Projects = ({ projects, GetProjects, api }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const projectsList = projects?.data
    const pagganation = projects?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const targetRef = useRef(null);

    return (
        <>
            <Home/>
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
    api: state.api
});

const mapDispatchToProps = {
    GetProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

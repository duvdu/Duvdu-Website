import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import { useTranslation } from 'react-i18next';
import ProjectCard from "../../components/elements/project-card";
import Filter from "../../components/elements/filter";
// import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { GetProjects } from "../../redux/action/apis/cycles/projects/get";
import RelatedCategories from "../../components/elements/relatedCategories";
import DuvduLoading from "../../components/elements/duvduLoading";
import EmptyComponent from "../../components/pages/contracts/emptyComponent";

const Projects = ({ projects, GetProjects, api }) => {
    const { t } = useTranslation();
    const projectsList = projects?.data
    const pagganation = projects?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);

    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords } = Router.query

    const { asPath } = Router;

    // Remove leading slash
    const path = asPath.startsWith('/') ? asPath.substring(1) : asPath;

    // Extract the path part of the URL
    const cycle = path.split('?')[0];


    useEffect(() => {
        if (limit) {
            const params = {
                limit: limit,
                page: page,
            };

            // Add search parameter if search term is defined and not empty
            if (searchTerm?.length > 0) {
                params.search = searchTerm;
            }

            // Include the query parameters from the URL if they exist
            if (category) params.category = category;
            if (subCategory) params.subCategory = subCategory;
            if (tag) params.tag = tag;
            if (priceFrom) params.minBudget = priceFrom;
            if (priceTo) params.maxBudget = priceTo;
            if (duration) params.duration = duration;
            if (instant) params.instant = instant;
            if (inclusive) params.inclusive = inclusive;
            if (keywords) params.keywords = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            GetProjects(queryString);
        }
    }, [limit, searchTerm, page, category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords]);



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

    const setParams = (queryString) => {
        console.log(queryString)
        Router.push(`/${cycle}?${queryString}`);
    };

    return (
        <>
            <Layout isbodyWhite={true} iSsticky={!searchTerm}>
                <section className="my-12">
                    <div className="container mb-30">
                            {/* // searchTerm && */}
                            <Filter cycle={cycle} setParams={setParams} />
                        <div className="h-7" />
                        {projectsList?.length > 0 && (
                            <h1 className="page-header pb-9">{t("most popular on duvdu")}</h1>
                        )}
                        {projectsList?.length === 0 && (
                            <EmptyComponent message="No projects Found" />
                        )}
                        <div className="grid minmax-280 gap-5">
                            {projectsList?.map((item, i) => (
                                <React.Fragment key={item.id || i}>
                                    {i === 0 && <RelatedCategories NeedTranslate={false} className="block lg:hidden xl:hidden col-span-full" />}
                                    {i === 3 && <RelatedCategories className="hidden lg:block xl:hidden col-span-full" />}
                                    {i === 4 && <RelatedCategories className="hidden xl:block col-span-full" />}
                                    <ProjectCard cardData={item} />
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="w-0 h-0" />
                        <DuvduLoading loadingIn={"GetProjects"} />
                    </div>
                </section>
            </Layout>
        </>
    );
};



const mapStateToProps = (state) => ({
    projects: state.api.GetProjects,
    api: state.api
});

const mapDispatchToProps = {
    GetProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

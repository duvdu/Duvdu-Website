import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";

import { useTranslation } from 'react-i18next';
import ProjectCard from "../../components/elements/project-card";
import Filter from "../../components/elements/filter";
// import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import { GetStudios } from "../../redux/action/apis/cycles/rental/get";

import DuvduLoading from "../../components/elements/duvduLoading";
import RelatedCategories from "../../components/elements/relatedCategories";
import EmptyComponent from "../../components/pages/contracts/emptyComponent";

const Studio = ({ projects, GetStudios, api }) => {
    const { t } = useTranslation();

    const page = 1;
    const showLimit = 24;
    const pagganation = projects?.pagination
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
            if (priceTo) params.projectScaleMin = priceTo;
            if (priceFrom) params.projectScaleMax = priceFrom;
            if (duration) params.duration = duration;
            if (instant) params.instant = instant;
            if (inclusive) params.inclusive = inclusive;
            if (keywords) params.keywords = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            GetStudios(queryString);
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


    const handlesetdata = (item) => {
        setdata(item)
        setIsOpen(!isOpen);
    };
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const getPaginatedProjects = projects?.data
    const setParams = (queryString) => {
        Router.push(`/${cycle}?${queryString}`);
    };
    return (
        <>
            <Layout isbodyWhite={true} iSsticky={!searchTerm}>
                <section className="my-12">
                    <div className="container mb-30">
                        {
                            // searchTerm && 
                            <Filter cycle={cycle} setParams={setParams} />
                        }
                        {
                            !searchTerm &&
                            <div className="h-7" />
                        }
                        {getPaginatedProjects?.length > 0 && (
                            <h1 className="page-header pb-9">{t("most popular on duvdu")}</h1>
                        )}

                        {getPaginatedProjects?.length === 0 && (
                            <div className="mt-10">
                                <EmptyComponent message="No projects Found" />
                            </div>
                        )}
                        {projects?.loading?
                       <DuvduLoading loadingIn={""} type='projects'/>:    
                       <div className="grid minmax-280 gap-5">
                            {getPaginatedProjects?.map((item, i) => (
                                <React.Fragment key={item.id || i}>
                                    {i === 0 && <RelatedCategories NeedTranslate={false} className="block lg:hidden xl:hidden col-span-full" />}
                                    {i === 3 && <RelatedCategories className="hidden lg:block xl:hidden col-span-full" />}
                                    {i === 4 && <RelatedCategories className="hidden xl:block col-span-full" />}
                                    <ProjectCard cardData={item} type="rentals" />
                                </React.Fragment>
                            ))}
                        </div>
                    }
                        {/* <DuvduLoading loadingIn={"GetStudios"} /> */}
                    </div>
                </section>
            </Layout>
        </>
    );
};







const mapStateToProps = (state) => ({
    api: state.api,
    projects: state.api.GetStudios
});

const mapDispatchToProps = {
    GetStudios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Studio);

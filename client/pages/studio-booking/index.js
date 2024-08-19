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
    const { category, subCategory, tag, projectScaleMin, projectScaleMax, duration, instant, inclusive } = Router.query

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
            if (projectScaleMin) params.projectScaleMin = projectScaleMin;
            if (projectScaleMax) params.projectScaleMax = projectScaleMax;
            if (duration) params.duration = duration;
            if (instant) params.instant = instant;
            if (inclusive) params.inclusive = inclusive;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            GetStudios(queryString);
        }
    }, [limit, searchTerm, page, category, subCategory, tag, projectScaleMin, projectScaleMax, duration, instant, inclusive]);

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

    const handleFilterChange = (selectedFilters) => {

        // Initialize params object
        const params = {};
        
        selectedFilters.forEach(filter => {
            switch (filter.name) {
                case "Category":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.category = filter.data.join(',');
                    }
                    break;
                case "Sub-category":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.subCategory = filter.data.join(',');
                    }
                    break;
                case "Tags":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.tag = filter.data.join(',');;
                    }
                    break;
                case "Budget Range":
                    // Check if filter.data and filter.data.data exist
                    if (filter.data && filter.data) {
                        // Extract numeric values from the budget range string
                        const { min: priceFrom, max: priceTo } = filter.data;
                        // Assign values to params
                        if (projectScaleMin) params.projectScaleMin = projectScaleMin;
                        if (projectScaleMax) params.projectScaleMax = projectScaleMax;
                    }
                    break;
                case "Duration":
                    // Check if filter.data and filter.data.data exist
                    if (filter.data && filter.data) {
                        params.duration = filter.data; // Assuming data is like "Duration: 10 days"
                    }
                    break;
                case "instantProject":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.instant = filter.data;
                    }
                    break;
                case "priceInclusive":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.inclusive = filter.data;
                    }
                    
                case "Insurance":
                    // Handle the case where filter.data might be undefined
                    if (filter.data !== undefined) {
                        params.insurance = filter.data;
                    }
                    break;
                default:
                    break;
            }
        });

        // Update query parameters with selected filters
        const queryString = new URLSearchParams({
            ...params,
        }).toString();

        // Call GetCopyrights with updated query string
        Router.push(`/${cycle}?${queryString}`);

    };

    return (
        <>
            <Layout isbodyWhite={true} iSsticky={!searchTerm}>
                <section className="my-12">
                    <div className="container mb-30">
                        {
                            // searchTerm && 
                            <Filter cycle={cycle} onFilterChange={handleFilterChange} />
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
                        <div className="grid minmax-280 gap-5">
                            {getPaginatedProjects?.map((item, i) => (
                                <React.Fragment key={item.id || i}>
                                    {i === 0 && <RelatedCategories NeedTranslate={false} className="block lg:hidden xl:hidden col-span-full" />}
                                    {i === 3 && <RelatedCategories className="hidden lg:block xl:hidden col-span-full" />}
                                    {i === 4 && <RelatedCategories className="hidden xl:block col-span-full" />}
                                    <ProjectCard cardData={item} type="studio-booking" />
                                </React.Fragment>
                            ))}
                        </div>
                        <DuvduLoading loadingIn={"GetStudios"} />
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

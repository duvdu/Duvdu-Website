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
    const [switchState, setSwitchState] = useState({
        instantProject: false,
        priceInclusive: undefined ,
    });

    const page = 1;
    const showLimit = 12;
    const pagganation = projects?.pagination
    const [limit, setLimit] = useState(showLimit);

    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { category, subCategory, tag, priceFrom, priceTo, duration, Insurance,instant, inclusive, keywords } = Router.query

    const { asPath } = Router;

    // Remove leading slash
    const path = asPath.startsWith('/') ? asPath.substring(1) : asPath;

    // Extract the path part of the URL
    const cycle = path.split('?')[0];

    const [localStudios, setLocalStudios] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

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
            if (priceTo) params.pricePerHourTo = priceTo;
            if (priceFrom) params.pricePerHourFrom = priceFrom;
            if (duration) params.duration = duration;
            if (instant) params.instant = instant;
            if (Insurance) params.insurance = Insurance;
            if (inclusive) params.inclusive = inclusive;
            if (keywords) params.search = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            if(queryString && Router.isReady)
            GetStudios(queryString);
        }
    }, [limit, searchTerm, page, category, subCategory, tag, priceFrom, priceTo, duration,instant, Insurance, inclusive, keywords]);

    useEffect(() => {
        if (projects?.data) {
            if (limit === showLimit) {
                setLocalStudios(projects.data);
            } else {
                setLocalStudios(prev => [...prev, ...projects.data.slice(prev.length)]);
            }
            setIsLoadingMore(false);
        }
    }, [projects?.data]);

    useEffect(() => {
        const handleScroll = () => {
            if (pagganation?.totalPages > page) {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || window.innerHeight;
                const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

                if (scrolledToBottom && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setLimit(prev => showLimit + prev);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, pagganation?.totalPages, isLoadingMore]);

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
                            <Filter setSwitchState={setSwitchState} switchState={switchState} cycle={cycle} setParams={setParams} />
                        }
                        {
                            !searchTerm &&
                            <div className="h-7" />
                        }
                        {/* {<RelatedCategories className=" col-span-full" />} */}
                        {localStudios?.length > 0 && (
                            <h1 className="page-header pb-9">{t("most popular on duvdu")}</h1>
                        )}

                        {getPaginatedProjects?.length === 0 && (
                            <div className="mt-10">
                                <EmptyComponent message="No Studios Found" />
                            </div>
                        )}
                        {(projects?.loading && localStudios?.length === 0) ?
                            <DuvduLoading loadingIn={""} type='projects'/> :    
                            <div className="grid minmax-280 gap-5">
                                {localStudios?.map((item, i) => (
                                    <React.Fragment key={item.id || i}>
                                        <ProjectCard cardData={item} type="rentals" />
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        {isLoadingMore && <div className='mt-5'><DuvduLoading loadingIn={""} type='projects'/></div>}
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

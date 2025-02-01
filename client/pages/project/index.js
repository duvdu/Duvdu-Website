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
    const [switchState, setSwitchState] = useState({
        instantProject: false,
        priceInclusive: true ,
    });
    const [localProjects, setLocalProjects] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const projectsList = projects?.data
    const pagganation = projects?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { category, subCategory, relatedCategory,tag, priceFrom, priceTo, duration, instant, inclusive, keywords } = Router.query

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
            if (relatedCategory) {
                params['relatedCategory[0]'] = relatedCategory;
            }
    
            if (tag) params.tag = tag;
            if (priceFrom) params.minBudget = priceFrom;
            if (priceTo) params.maxBudget = priceTo;
            if (duration) params.duration = duration;
            if (instant) params.instant = instant;
            // if (inclusive) params.inclusive = inclusive;
            if (keywords) params.search = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();
            // Call GetCopyrights with the constructed query string
            if(queryString && Router.isReady){
                GetProjects(queryString);
            }
        }
    }, [limit, searchTerm, page, category, subCategory, tag,relatedCategory, priceFrom, priceTo, duration, instant, keywords]);

    useEffect(() => {
        if (projectsList) {
            if (limit === showLimit) {
                setLocalProjects(projectsList);
            } else {
                setLocalProjects(prev => [...prev, ...projectsList.slice(prev.length)]);
            }
            setIsLoadingMore(false);
        }
    }, [projectsList]);

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

    const setParams = (queryString) => {
        Router.push(`/${cycle}?${queryString}`);
    };
    return (
        <>
            <Layout isbodyWhite={true} iSsticky={!searchTerm}>
                <section className="my-12">
                    <div className="container mb-30">
                            {/* // searchTerm && */}
                            <Filter cycle={cycle} setSwitchState={setSwitchState} switchState={switchState} setParams={setParams} />
                        <div className="h-7" />
                        {Router.query.category && <RelatedCategories className=" col-span-full" />}
                        {localProjects?.length > 0 && (
                            <h1 className="page-header pb-9">{t("most popular on duvdu")}</h1>
                        )}
                        {projectsList?.length === 0 && (
                            <EmptyComponent message="No projects Found" />
                        )}
                        {(projects?.loading && localProjects?.length== 0)?
                       <DuvduLoading loadingIn={""} type='projects'/>:    
                        <div className="grid minmax-280 gap-5">
                            {localProjects?.map((item, i) => (
                                <React.Fragment key={item._id}>
                                    <ProjectCard cardData={item} inclusive={switchState.priceInclusive} />
                                </React.Fragment>
                            ))}
                        </div>}
                        {isLoadingMore && <div className='mt-5'><DuvduLoading loadingIn={""} type='projects'/></div>}
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

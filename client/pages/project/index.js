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

const Projects = ({ projects, GetProjects, api }) => {
    const { t } = useTranslation();
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { subCategory, tag } = Router.query
    const projectsList = projects?.data
    const pagganation = projects?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const targetRef = useRef(null);

    
    useEffect(() => {
        if (limit)
            GetProjects({ limit: limit, search: searchTerm?.length > 0 ? searchTerm : null , page: page,subCategory:subCategory,tag:tag })
    }, [limit,searchTerm,subCategory, tag])


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
                            searchTerm && false &&
                            <div className="sticky top-0 bg-white dark:bg-[#1A2024] z-[5] py-6 ">
                                <Filter />
                            </div>
                        }
                        {
                            !searchTerm || true &&
                            <div className="h-7" />
                        }
                         {projectsList?.length > 0 && (
                            <h1 className="page-header pb-9">{t("most popular on duvdu")}</h1>
                        )}
                        
                        {projectsList?.length === 0 && (
                            <h3>{t("No projects Found")}</h3>
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
                        <DuvduLoading loadingIn = {"GetProjects"} />
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

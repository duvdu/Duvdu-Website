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

const Studio = ({ projects, GetStudios, api }) => {
    const { t } = useTranslation();
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { subCategory, tag } = Router.query
    const page = 1;
    const showLimit = 24;
    const pagganation = projects?.pagination
    const [limit, setLimit] = useState(showLimit);

    useEffect(() => {
        GetStudios({ limit: limit, search: searchTerm?.length > 0 ? search : searchTerm, page: page, subCategory: subCategory, tag: tag })
    }, [limit, searchTerm, subCategory, tag])

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


    return (
        <>
            <Layout isbodyWhite={true} iSsticky={!searchTerm}>
                <section className="mb-12">
                    <div className="container mb-30">
                        {
                            searchTerm &&
                            <div className="sticky top-0 bg-white dark:bg-[#1A2024] z-[5] py-6 ">
                                <Filter />
                            </div>
                        }
                        {
                            !searchTerm &&
                            <div className="h-7" />
                        }
                        {getPaginatedProjects?.length > 0 && (
                            <h1 className="page-header pb-9">{t("most popular on duvdu")}</h1>
                        )}

                        {getPaginatedProjects?.length === 0 && (
                            <h3>{t("No projects Found")}</h3>
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

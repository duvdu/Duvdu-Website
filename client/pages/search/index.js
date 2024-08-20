import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import { HomeDiscover, HomeTreny, popularSub } from "../../redux/action/apis/home/home";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import CustomSwiper from "../../components/elements/customSwiper";
import Link from "next/link";
import { gsap } from 'gsap';
import SectionProjects from "../../components/pages/home/sectionProjects";
import { GetAllSearch } from "../../redux/action/apis/search/getall";
import DraggableList from "../../components/pages/home/dragList";
import { useTranslation } from 'react-i18next';
import UserSearch from "../../components/pages/search/users";
import ProjectSearch from "../../components/pages/search/projects";

const Search = ({
    search, GetAllSearch
}) => {
    const { t, i18n } = useTranslation();
    console.log(search)
    const Router = useRouter();
    const searchTerm = Router.query.search;

    useEffect(() => {
            GetAllSearch({ search: searchTerm?.length > 0 ? searchTerm : 'metoo' })
    }, [searchTerm])


    return (
        <>
            <Layout isbodyWhite={true}>
                <div className='flex flex-col gap-12 py-12'>
                    {search?.data?.users.length>0 && 
                    <section className="container">
                        <UserSearch users={search?.data?.users}/>
                    </section>
                    }
                    {search?.data?.projects?.length>0 && 
                    <section>
                        <div className='container'>
                            <h2 className=" text-2xl font-semibold opacity-60 capitalize mb-8">{t("projects")}</h2>
                            <ProjectSearch users={search?.data?.projects}/>
                        </div>
                    </section>
                    }
                    {search?.data?.rentals.length>0 && 
                    <section>
                        <div className='container'>
                            <h2 className=" text-2xl font-semibold opacity-60 capitalize mb-8">{t("rentals")}</h2>
                            <ProjectSearch users={search?.data?.rentals}/>
                        </div>
                    </section>
                    }
                </div>
            </Layout>

        </>
    );
};


const mapStateToProps = (state) => ({
    search: state.api.GetAllSearch,
});

const mapDispatchToProps = {
    GetAllSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

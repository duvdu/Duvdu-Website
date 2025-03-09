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
import CategorySearch from "../../components/pages/search/category";
import ProjectSearch from "../../components/pages/search/projects";
import EmptyComponent from "../../components/pages/contracts/emptyComponent";
import DuvduLoading from "../../components/elements/duvduLoading";

const Search = ({
    search, GetAllSearch}) => {
    const { t, i18n } = useTranslation();
    const Router = useRouter();
    const searchTerm = Router.query.search;

    useEffect(() => {
        if(searchTerm?.length > 0)
            GetAllSearch({ search:  searchTerm })
    }, [searchTerm])

    return (
        <>
            <Layout isbodyWhite={true}>
                {search?.loading? 
                <div className='h-96 flex items-center justify-center'>
                <DuvduLoading loadingIn={""} type=''/>
                </div>
                :
                <div className='flex flex-col gap-5 md:gap-8 lg:gap-12 py-12'>
                    { ((search?.data?.category.length==0 && 
                     search?.data?.users.length==0&& 
                     search?.data?.projects?.length==0&&
                     search?.data?.rentals.length==0 )||
                     !searchTerm)&&
                     <div className="container mb-30">
                        <EmptyComponent message="No Result Found" />
                     </div>
                    }
                    {search?.data?.category.length>0 && 
                    <section className="container">
                        <CategorySearch category={search?.data?.category}/>
                    </section>
                    }
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
                }
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

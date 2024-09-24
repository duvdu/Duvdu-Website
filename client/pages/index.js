import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import { HomeDiscover, HomeTreny, popularSub } from "../redux/action/apis/home/home";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import CustomSwiper from "../components/elements/customSwiper";
import Link from "next/link";
import { gsap } from 'gsap';
import SectionProjects from "../components/pages/home/sectionProjects";
import { GetProjects } from "../redux/action/apis/cycles/projects/get";
import DraggableList from "../components/pages/home/dragList";
import { useTranslation } from 'react-i18next';
import Filter from "../components/elements/filter";
import DuvduLoading from "../components/elements/duvduLoading";

const Home = ({
    HomeTreny,
    homeTreny_respond,

    HomeDiscover,
    homeDiscover_respond,

    popularSub,
    popularSub_respond,

    GetProjects,
    projects,

    categories
}) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        Promise.all([HomeTreny(), HomeDiscover(), popularSub()]);
    }, []);
    console.log({popularSub_respond ,homeDiscover_respond , homeTreny_respond  })
    const [words, setWords] = useState(["modeling", "photography", "post production", "videography", "production", "modeling"]);
    const wordsRef = useRef(null);
    const list =  homeTreny_respond?.data || [];
    const router = useRouter();

    var TheBeststyle = i18n.language == "Arabic" ? {} : {
        backgroundImage: 'url("/assets/imgs/theme/home/circle.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        display: 'inline-block',
    };
    // const homeTrenyList = [...list, ...Array(4 - list.length).fill({ title: '', image: '' })].slice(0, 4);

    const handleNavigation = (path, query) => {
        const url = query ? `${path}?${query}` : path;
        router.push(url);
    };

    // filter 
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const showLimit = 999;
    const page = 1;
    const [limit, setLimit] = useState(showLimit);

    const { category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords } = Router.query

    // Extract the path part of the URL
    const cycle = "project";


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
            if (priceFrom) params.priceFrom = priceFrom;
            if (priceTo) params.priceTo = priceTo;
            if (duration) params.duration = duration;
            if (instant !== undefined) params.instant = instant;
            if (inclusive !== undefined) params.inclusive = inclusive;
            if (keywords) params.keywords = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            GetProjects(queryString)

        }
    }, [limit, searchTerm, page, category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords]);


    const handleFilterChange = (selectedFilters) => {

        // Initialize params object
        const params = {
            limit: limit,
            page: page,
        };

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
                        if (priceFrom) params.priceFrom = priceFrom;
                        if (priceTo) params.priceTo = priceTo;
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
        GetProjects(queryString)

    };
    console.log({categories})
    return (
        <>
            <Layout isbodyWhite={true}>
                <section className="w-full">
                    <div className="my-12 lg:my-24 mx-auto w-min">
                        <h1 className="text-center my-4">
                            <span className="font-black text-[#263257] dark:text-white text-3xl lg:text-8xl capitalize whitespace-nowrap trap">{t("explore")} <span className="text-[#263257] dark:text-white pt-[25px] lg:pt-[80px] px-[10px] pb-0 trap" style={TheBeststyle}>
                                {t("the best")} </span> {t("of")}
                            </span>
                            <div className="relative h-[50px] lg:h-[120px]">
                                <div className="absolute h-full w-full overflow-hidden">
                                    <div ref={wordsRef} className="slide-in">
                                        {
                                            words?.map((i, index) =>
                                                <div className="h-[50px] lg:h-[120px] flex flex-col justify-center items-center my-2" key={index}>
                                                    <p className="text-[#1A73EB] font-black text-3xl lg:text-8xl h-full trap capitalize whitespace-nowrap">{t(i)}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </h1>
                        <p className="text-xs lg:text-xl font-bold text-[#263257] dark:text-white opacity-60 text-center lg:mx-20 trap capitalize">{t("consectetur sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. consectetur sit amet adipiscing elit, sed do.")}</p>
                    </div>
                    {homeTreny_respond &&
                    
                    <div className="mx-auto w-full py-12">
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8">{t("trendy categories")}</h2>
                        {homeTreny_respond?.loading ? 
                        <DuvduLoading loadingIn={""} type={'category'} />:
                        <div className="flex md:grid md:grid-cols-3 gap-3 px-3 overflow-auto lg:container">
                            {list &&list?.slice(0, 3)?.map((data, index) => (
                                <Link href={data.cycle ? `/${data.cycle}?category=${data._id}` : ''} key={index}>
                                    <div
                                        className="cursor-pointer bg-black aspect-square rounded-3xl trendy-section flex flex-col gap-5 items-center justify-end p-8 min-w-[300px] lg:w-full lg:p-11 overflow-hidden"
                                        style={{ backgroundImage: `url(${data.image})` }}
                                    >
                                        <span className="text-white text-xl lg:text-3xl font-semibold capitalize">
                                            {data.title || 'Empty Title'}
                                        </span>
                                        <span className="text-white opacity-50 font-semibold text-xs lg:text-lg text-center">
                                            {data.title ? t('category_description') : 'This is an empty item.'}
                                        </span>
                                        <Link href={data.cycle ? `/${data.cycle}?category=${data._id}` : ''} >
                                            <a className="text-xs font-semibold text-primary bg-white px-5 lg:px-7 py-2 lg:py-3 rounded-full">{t("View More")}</a>
                                        </Link>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        }
                    </div>
                    }
                </section>
                {homeDiscover_respond && 
                <section className="bg-[#F2F2F3] dark:bg-[#1A1A1C] py-12">
                    <div className="w-full ">
                        <section className="mx-auto lg:container relative ps-3">
                            <div className="sm:container">
                                <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8">{t("discover tags")}</h2>
                            </div>
                            {homeDiscover_respond?.loading ? 
                           <DuvduLoading loadingIn={""} type={'tag'}/>:
                            <div className="overflow-auto hide-scrollable-container">
                                <div className="flex">
                                    <DraggableList>
                                        {homeDiscover_respond?.data[0]?.subCategories?.map((data, index) => (
                                            <Link key={index} href={data.cycle ? `/${data.cycle}?category=${data.categoryId}&subCategory=${data._id}` : ''}  >
                                                <div
                                                    className="cursor-pointer bg-black aspect-[3] rounded-2xl lg:rounded-3xl trendy-section flex flex-col items-center justify-center overflow-hidden w-[189px] lg:w-[314px] ml-3"
                                                    style={{ backgroundImage: `url(${data.image})` }}
                                                >
                                                    <span className="text-white text-xs lg:text-xl font-semibold capitalize">
                                                        {data.title}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                        <div className="hidden lg:block absolute z-10 h-[65px] lg:h-[108px] w-[341px] home-list-gradaint2 end-6 rtl:rotate-180" />
                                        <div className="size-3"></div>
                                    </DraggableList>
                                </div>
                            </div>}
                        </section>
                    </div>
                </section>}
                {homeDiscover_respond && 
                <section className="py-12">
                    <div className="w-full pr-0">
                        <div className="mx-auto lg:container relative  ps-3">
                            <div className=" ">
                                <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8">{t("top categories")}</h2>
                                {homeDiscover_respond?.loading ? 
                            <DuvduLoading loadingIn={""} type={'category'}/>:
                                <DraggableList>
                                    {categories?.map((data, index) => (
                                        <Link key={data._id} href={data.cycle ? `/${data.cycle}?category=${data._id}` : ''} >
                                            <div
                                                className={`cursor-pointer bg-black ml-3 h-[151.71px] lg:h-[347px] ${(index + 1) % 3 === 0 ? 'min-w-[252.39px] lg:min-w-[548.99px]' : 'min-w-[106.53px] lg:min-w-[230px]'} rounded-3xl trendy-section flex flex-col gap-5 items-start justify-between overflow-hidden px-3 py-3 lg:px-7 lg:py-10`}
                                                style={{ backgroundImage: `url(${data.image})` }}
                                            >
                                                <div className="capitalize rounded-full text-[8px] lg:text-lg font-medium text-white px-2 lg:px-6 lg:py-2 bg-black bg-opacity-50">{t("150 creatives")}</div>
                                                <span className="text-white text-[14px] lg:text-3xl font-semibold capitalize text-center w-full">
                                                    {data.title}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                    <div className="hidden lg:block absolute z-10 h-[151.71px] lg:h-[347px] w-[341px] home-list-gradaint end-6 rtl:rotate-180">  </div>
                                    <div className="size-3"></div>
                                </DraggableList>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                }
                {popularSub_respond && 
                
                <section className="py-12 bg-[#F2F2F3] dark:bg-[#1A1A1C]">
                    <div className="mx-auto">
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8">{t("popular sub-sub categories")}</h2>
                        {popularSub_respond?.loading?
                        <DuvduLoading loadingIn={""} type={'tag'} />:
                        <div className="flex gap-8 w-full lg:container relative  ps-3">
                            <div className="overflow-auto hide-scrollable-container">
                            <DraggableList>
                                    {popularSub_respond?.data && popularSub_respond?.data[0]?.subCategories?.map((category, index) => (
                                        <div onClick={() => handleNavigation(`/${category.cycle}`, new URLSearchParams({
                                            category: category.categoryId,
                                            subcategory: category._id,
                                            tags: category.tags.map(tag => tag._id).join(',')
                                        }).toString()
                                        )}
                                            className='cursor-pointer' key={index}>
                                            <div className="ml-3">
                                                <img className="h-24 object-cover min-w-[300px] lg:w-full rounded-3xl" src={category.image} />
                                                <h2 className="text-2xl opacity-60 font-semibold mt-6">{category.title}</h2>
                                                <ul className={"flex flex-wrap gap-2 py-2"}>
                                                    {category?.tags.map((item, index) => (
                                                        <li key={item._id} className='py-1 px-2 border-[1.5px] border-[#00000033] dark:border-[#FFFFFF4D] rounded-full'>
                                                            <div className=' dark:text-[#FFFFFFBF] text-[#00000099] font-medium'
                                                            // onClick={() => handleNavigation(`/${category.cycle}`, `subcategory=${category._id}&${item._id ? "tag=" + item._id : ''}`)}
                                                            >{item.name}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="hidden lg:block absolute z-10 h-[100.71px] lg:h-[200px] w-[341px] home-list-gradaint2 end-6 rtl:rotate-180">  </div>
                                    <div className="size-3"></div>

                                </DraggableList>
                            </div>

                        </div>
                        }
                    </div>
                </section>
                }
                {projects && 
                <section className="py-12">
                    <div className='container'>
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8">{t("explore recommended projects")}</h2>
                        <Filter cycle={cycle} onFilterChange={handleFilterChange} />
                        <div className="h-5" />
                        {projects?.loading ?
                        <>
                        <DuvduLoading loadingIn={""} type='projects' />
                        <DuvduLoading loadingIn={""} type='projects' />
                        </>:
                        <SectionProjects projects={projects?.data} />
                        }
                    </div>
                </section>
                }
            </Layout>

        </>
    );
};



const MenuItem = ({ title, items, onClick }) => (
    items.length > 0 &&
    <li className="py-5">

        <div className="cursor-pointer text-[#3E3E3E] dark:text-[#FFFFFFBF] font-semibold text-sm"
            onClick={() => onClick(null)}
        >
            {title}
        </div>

        <ul className={"flex flex-wrap gap-2 py-2"}>
            {items.map((item, index) => (
                <li className='py-1 px-2 border-[1.5px] border-[#00000033] hover:border-primary hover:text-[#3E3E3E] hover dark:border-[#FFFFFF4D] rounded-full' key={index}>
                    <div className='cursor-pointer dark:text-[#FFFFFFBF] text-[#00000099] hover:text-[#3E3E3E] font-medium'
                        onClick={() => onClick(item._id)}
                    >{item.title}</div>
                </li>
            ))}
        </ul>
    </li>
);



const mapStateToProps = (state) => ({
    categories: state.categories,
    homeTreny_respond: state.api.HomeTreny,
    homeDiscover_respond: state.api.HomeDiscover,
    popularSub_respond: state.api.popularSub,
    projects: state.api.GetProjects,

});

const mapDispatchToProps = {
    HomeTreny,
    HomeDiscover,
    GetProjects,
    popularSub
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

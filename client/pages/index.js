import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import { HomeDiscover, HomeTreny, popularSub } from "../redux/action/apis/home/home";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination ,FreeMode} from 'swiper';
import CustomSwiper from "../components/elements/customSwiper";
import Link from "next/link";
import { gsap } from 'gsap';
import SectionProjects from "../components/pages/home/sectionProjects";
import { GetProjects } from "../redux/action/apis/cycles/projects/get";
import DraggableList from "../components/pages/home/dragList";
import { useTranslation } from 'react-i18next';
import Filter from "../components/elements/filter";
import DuvduLoading from "../components/elements/duvduLoading";
import Icon from "../components/Icons";
import 'swiper/css/free-mode';

// Install modules
SwiperCore.use([FreeMode]);

const Home = ({
    HomeTreny,
    homeTreny_respond,

    HomeDiscover,
    homeDiscover_respond,

    popularSub,
    popularSub_respond,

    GetProjects,
    projects,
    isLogin,
    categories
}) => {
    const { t, i18n } = useTranslation();
    const [switchState, setSwitchState] = useState({
        instantProject: false,
        priceInclusive: true ,
    });

    useEffect(() => {
        if(isLogin===false)
        Promise.all([HomeTreny(), HomeDiscover(), popularSub()]);
    }, [isLogin]);
    const [words, setWords] = useState(["Best in photography", "Videography", "branding", "content creation", "Best in photography"]);
    const wordsRef = useRef(null);
    const list =  homeTreny_respond?.data || [];
    const router = useRouter();

    var TheBeststyle = i18n.language == "Arabic" ? {} : {
        backgroundImage: 'url("/assets/imgs/theme/home/circle.png")',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
    };
    // const homeTrenyList = [...list, ...Array(4 - list.length).fill({ title: '', image: '' })].slice(0, 4);

    const handleNavigation = (path, query) => {
        const url = query ? `${path}?${query}` : path;
        router.push(url);
    };

    // Optimized pagination state
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const showLimit = 9; // Items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState({}); // Store data by page: { "page1": [...], "page2": [...] }
    const [allDisplayData, setAllDisplayData] = useState([]); // Combined data for display
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [lastRequestParams, setLastRequestParams] = useState(null);

    const { category, subCategory, tags, priceFrom, priceTo, duration, instant, inclusive, keywords } = Router.query;
    const cycle = "project";

    // Function to get current request parameters
    const getCurrentParams = () => {
        const params = {
            limit: showLimit,
            page: currentPage,
        };

        if (searchTerm?.length > 0) {
            params.search = searchTerm;
        }

        if (category) params.category = category;
        if (subCategory) params.subCategory = subCategory;
        if (tags) params.tags = tags;
        if (priceFrom) params.priceFrom = priceFrom;
        if (priceTo) params.priceTo = priceTo;
        if (duration) params.duration = duration;
        if (instant !== undefined) params.instant = instant;
        if (keywords) params.search = keywords;

        return params;
    };

    // Function to check if request parameters have changed
    const haveParamsChanged = (newParams) => {
        if (!lastRequestParams) return true;
        
        const paramsToCompare = ['search', 'category', 'subCategory', 'tags', 'priceFrom', 'priceTo', 'duration', 'instant'];
        return paramsToCompare.some(param => lastRequestParams[param] !== newParams[param]);
    };

    // Function to reset pagination data
    const resetPaginationData = () => {
        setPaginatedData({});
        setAllDisplayData([]);
        setCurrentPage(1);
        setHasMoreData(true);
        setLoadingMore(false);
    };

    // Function to update paginated data
    const updatePaginatedData = (newData, page) => {
        const pageKey = `page${page}`;
        
        setPaginatedData(prev => {
            const updated = {
                ...prev,
                [pageKey]: newData
            };
            
            // Update display data by combining all pages in order
            const combinedData = [];
            for (let i = 1; i <= page; i++) {
                const pageData = updated[`page${i}`];
                if (pageData) {
                    combinedData.push(...pageData);
                }
            }
            setAllDisplayData(combinedData);
            
            return updated;
        });

        // Check if we have more data
        setHasMoreData(newData.length === showLimit);
    };

    // Main effect for fetching data
    useEffect(() => {
        const params = getCurrentParams();
        const queryString = new URLSearchParams(params).toString();

        if (queryString && Router.isReady) {
            // Check if this is a new search/filter (params changed)
            if (haveParamsChanged(params)) {
                resetPaginationData();
                setLastRequestParams(params);
                
                // Fetch first page with new params
                const firstPageParams = { ...params, page: 1 };
                const firstPageQueryString = new URLSearchParams(firstPageParams).toString();
                GetProjects(firstPageQueryString);
            } else {
                // Check if we already have this page data
                const pageKey = `page${currentPage}`;
                if (!paginatedData[pageKey]) {
                    setLoadingMore(true);
                    GetProjects(queryString);
                }
            }
        }
    }, [searchTerm, currentPage, category, subCategory, tags, priceFrom, priceTo, duration, instant, keywords, Router.isReady]);

    // Effect to handle API response
    useEffect(() => {
        if (projects?.data && projects.data.length >= 0) {
            updatePaginatedData(projects.data, currentPage);
            setLoadingMore(false);
            GetProjects()
        }
    }, [projects?.data, currentPage]);

    // Load More Handler
    const handleLoadMore = () => {
        if (hasMoreData && !loadingMore) {
            setLoadingMore(true)
            setCurrentPage(prev => prev + 1);
        }
    };

    // Reset pagination when filters change
    const handleFilterChange = (selectedFilters) => {
        // Reset pagination state
        resetPaginationData();
        
        // Initialize params object
        const params = {
            limit: showLimit,
            page: 1,
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
                        params.tags = filter.data.join(',');;
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

        // Update URL and trigger new request
        const queryString = new URLSearchParams(params).toString();
        setLastRequestParams(params);
        // Call GetCopyrights with updated query string
        if(queryString && Router.isReady)
        GetProjects(queryString);

    };
    function chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }
    
    // Chunk the array into groups of 4
    const chunkedCategories = chunkArray(categories,4);
    const [scrollInterval, setScrollInterval] = useState(null);
    const CategoryRef = useRef(null);
    const TagRef = useRef(null);
    const TopCategoryRef = useRef(null);
    const SubCategoryRef = useRef(null);
  
    const startScroll = (direction , ref) => {
      const scroll = () => {
        if (direction === 'next') {
          ref?.current?.swiper?.slideNext();
        } else {
          ref?.current?.swiper?.slidePrev();
        }
      };
  
      // Start scrolling at regular intervals
      setScrollInterval(setInterval(scroll, 200));
    };
  
    const stopScroll = () => {
      // Stop the interval when mouse is released or leaves the button
      clearInterval(scrollInterval);
      setScrollInterval(null);
    };
    const setParams = (queryString) => {
        resetPaginationData();
        Router.push(`?${queryString}`, undefined, { scroll: false });
    };

    // Check if we can show more items
    const canLoadMore = hasMoreData && !loadingMore;

    return (
        <>
            <Layout isbodyWhite={true}>
            {isLogin===false && 
            <>
                <section className="w-full">
                    <div className="mt-8 lg:my-20 mx-auto w-min">
                        <h1 className="text-center my-4">
                            <span className="font-black text-[#263257] dark:text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl capitalize whitespace-nowrap trap">{t("Find your perfect")} <span className="text-[#263257] dark:text-white pt-[25px] lg:pt-[80px] px-[20px] lg:px-[20px] pb-0 trap" style={TheBeststyle}>
                                {t("WORK")} </span> {t("match")}
                            </span>
                            <div className="relative h-[50px] lg:h-[120px]">
                                <div className="absolute h-full w-full overflow-hidden">
                                    <div ref={wordsRef} className="slide-in">
                                        {
                                            words?.map((i, index) =>
                                                <div className="h-[50px] lg:h-[120px] flex flex-col justify-center items-center my-2" key={index}>
                                                    <p className="text-[#1A73EB] font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl h-full trap capitalize whitespace-nowrap">{t(i)}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </h1>
                        {/* <p className="text-xs lg:text-xl font-bold text-[#263257] dark:text-white opacity-60 text-center lg:mx-20 trap capitalize">{t("consectetur sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. consectetur sit amet adipiscing elit, sed do.")}</p> */}
                    </div>
                </section>
                
                {homeTreny_respond && 
                <section className="py-12">
                    <div className="w-full ">
                        <div className="ms-5 lg:mx-auto lg:container relative">
                            <div className="sm:container">
                                <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-5 lg:mb-8">{t("What’s trending?")}</h2>
                            </div>
                                {homeTreny_respond?.loading ? 
                            <DuvduLoading loadingIn={""} type={'category'}/>:                                
                                <>
                                <Swiper
                                    //dir='ltr'
                                    className=''
                                    ref={CategoryRef}
                                    modules={[Autoplay, Navigation, EffectFade, Pagination]}
                                    spaceBetween={10}
                                    slidesPerView={1.2}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                        el: '.swiper-pagination',
                                    }}
                                    navigation={{
                                        prevEl: '.custom-swiper-prev2.prev1',
                                        nextEl: '.custom-swiper-next2.next1',
                                    }}
                                    breakpoints={{
                                        420: {
                                            slidesPerView: 1.5, // For mobile screens
                                          },
                                        640: {
                                            slidesPerView: 1.7, // For mobile screens
                                          },    
                                        768: {
                                            slidesPerView: 2, // For tablets
                                          },
                                        1024: {
                                            slidesPerView: 3, // For desktop
                                          },

                                        }}                                    
                                    >
                                    {list &&list?.map((data, index) => {
                                        return <SwiperSlide key={index}>                                                            
                                            <Link href={data.cycle ? `/${data.cycle}?category=${data._id}` : ''} >
                                                <div
                                                    className="cursor-pointer bg-black relative rounded-[40px] md:rounded-3xl trendy-section flex flex-col gap-3 md:gap-5 items-center justify-end p-8 h-[320px] lg:h-[450px] w-full overflow-hidden"
                                                    style={{ backgroundImage: `url(${data.image})` }}
                                                >
                                                    <span className="text-white text-xl lg:text-3xl font-meduim md:font-semibold capitalize">
                                                        {data.title || 'Empty Title'}
                                                    </span>
                                                    <span className="text-white opacity-50 font-light md:font-semibold text-xs lg:text-lg text-center">
                                                        {data.title ? t('category_description') : 'This is an empty item.'}
                                                    </span>
                                                    <Link href={data.cycle ? `/${data.cycle}?category=${data._id}` : ''} >
                                                        <a className="md:text-xs font-medium md:font-semibold text-primary bg-white px-3 sm:px-5 lg:px-7 py-1 sm:py-2 lg:py-3 rounded-full">{t("View More")}</a>
                                                    </Link>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                                {/* <div className='flex items-center justify-center gap-5 mt-5'>
                                    <button className='left-[45%] custom-swiper-prev2 prev1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                        onMouseDown={() => startScroll('prev' , CategoryRef)} // Start scrolling when mouse is down
                                        onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                        onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                                
                                        >
                                        <Icon className='dark:text-white text-black !w-[10px] ' name={"chevron-left"} />
                                    </button>
                                    <button className='right-[45%] custom-swiper-next2 next1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                        onMouseDown={() => startScroll('next' , CategoryRef)} // Start scrolling when mouse is down
                                        onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                        onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                               
                                        >
                                        <Icon className='dark:text-white text-black !w-[10px]' name={"chevron-right"} />
                                    </button>
                                </div> */}
                                </>
                                }
                        </div>
                        </div>
                </section>
                }

                {homeDiscover_respond && 
                <section className="bg-[#F2F2F3] dark:bg-[#1A1A1C] py-12">
                    <div className="w-full  ">
                        <section className="ms-5 lg:mx-auto lg:container relative">
                            <div className="sm:container">
                                <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-5 lg:mb-8">{t("Still Exploring?")}</h2>
                            </div>
                            {homeDiscover_respond?.loading ? 
                           <DuvduLoading loadingIn={""} type={'tag'}/>:

                           <>
                           <Swiper
                               //dir='ltr'
                               className=''
                               ref={TagRef}
                               modules={[Autoplay, Navigation, EffectFade, Pagination]}
                               spaceBetween={10}
                               slidesPerView={2.1}
                               loop={true}
                               pagination={{
                                   clickable: true,
                                   el: '.swiper-pagination',
                               }}
                               navigation={{
                                   prevEl: '.custom-swiper-prev2.prev2',
                                   nextEl: '.custom-swiper-next2.next2',
                               }}
                               breakpoints={{
                                   640: {
                                     slidesPerView: 3,
                                   },
                                  1024: {
                                    slidesPerView: 4, // For desktop
                                  },
                            }}                                    
                           >
                               {homeDiscover_respond?.data?.[0]?.subCategories?.map((data, index) => {
                                   return <SwiperSlide key={index}>                                                            
                                       <Link key={index} href={data.cycle ? `/${data.cycle}?category=${data.categoryId}&subCategory=${data._id}` : ''}  >
                                                <div
                                                    className="cursor-pointer bg-black aspect-[3] rounded-xl lg:rounded-3xl trendy-section flex flex-col items-center justify-center overflow-hidden w-full"
                                                    style={{ backgroundImage: `url(${data.image})` }}
                                                >
                                                    <span className="text-white text-xs lg:text-xl font-meduim md:font-semibold capitalize">
                                                        {data.title}
                                                    </span>
                                                </div>
                                            </Link>
                                   </SwiperSlide>
                               })}
                           </Swiper>
                           {/* <div className='flex items-center justify-center gap-5 mt-5'>
                                <button className='left-[45%] custom-swiper-prev2 prev1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                    onMouseDown={() => startScroll('prev' , TagRef)} // Start scrolling when mouse is down
                                    onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                    onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                                
                                    >
                                    <Icon className='dark:text-white text-black !w-[10px] ' name={"chevron-left"} />
                                </button>
                                <button className='right-[45%] custom-swiper-next2 next1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                    onMouseDown={() => startScroll('next' , TagRef)} // Start scrolling when mouse is down
                                    onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                    onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                               
                                    >
                                    <Icon className='dark:text-white text-black !w-[10px]' name={"chevron-right"} />
                                </button>
                            </div> */}
                           </>
                            }
                        </section>
                    </div>
                </section>}
                {homeDiscover_respond && false && 
                <section className="py-12">
                    <div className="w-full">
                        <div className="ms-5 lg:mx-auto lg:container relative">
                            <div className=" ">
                                <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-5 lg:mb-8">{t("top categories")}</h2>
                                {homeDiscover_respond?.loading ? 
                                
                            <DuvduLoading loadingIn={""} type={'category'}/>:
                            <>
                           <Swiper
                                //dir='ltr'
                                className=''
                                ref={TopCategoryRef}
                                modules={[Autoplay, Navigation, EffectFade, Pagination]}
                                spaceBetween={0}
                                slidesPerView={4}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                    el: '.swiper-pagination',
                                }}
                                navigation={{
                                    prevEl: '.custom-swiper-prev2.prev3',
                                    nextEl: '.custom-swiper-next2.next3',
                                }}
                                breakpoints={{
                                    1024: {
                                    slidesPerView: 5,
                                    },
                                }}                                                                   
                           >
                            {categories.map((data, i) => (
                                <SwiperSlide key={i}
                                className={(i + 1) % 3 === 0 ? 'min-w-[calc(50%)] lg:min-w-[calc(40%)] pe-2 lg:pe-3' : 'min-w-[calc(25%)] lg:min-w-[calc(20%)] pe-2 lg:pe-3'}
                                >
                                            <Link key={data._id} href={data.cycle ? `/${data.cycle}?category=${data._id}` : ''}
                                            >
                                                <div
                                                className={`cursor-pointer bg-black h-[140px] sm:h[200px] md:h-[300px] lg:h-[380px] rounded-xl lg:rounded-3xl trendy-section flex flex-col gap-5 items-start justify-between overflow-hidden px-1 md:px-3 py-3 lg:px-7 lg:py-10`}
                                                style={{ backgroundImage: `url(${data.image})` }}
                                                >
                                                    <div className="capitalize rounded-full text-[8px] lg:text-lg font-medium text-white px-2 lg:px-6 lg:py-2 bg-black bg-opacity-50">
                                                        {data.creativesCounter} {t("creatives")}
                                                    </div>
                                                    <span className="text-white text-[14px] lg:text-3xl lg:font-medium capitalize text-center w-full">
                                                        {data.title}
                                                    </span>
                                                </div>
                                            </Link>
                                </SwiperSlide>
                                ))}
                            </Swiper>
                            {/* <div className='flex items-center justify-center gap-5 mt-5'>
                                <button className='left-[45%] custom-swiper-prev2 prev1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                    onMouseDown={() => startScroll('prev',TopCategoryRef)} // Start scrolling when mouse is down
                                    onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                    onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                                
                                    >
                                    <Icon className='dark:text-white text-black !w-[10px] ' name={"chevron-left"} />
                                </button>
                                <button className='right-[45%] custom-swiper-next2 next1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                    onMouseDown={() => startScroll('next',TopCategoryRef)} // Start scrolling when mouse is down
                                    onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                    onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                               
                                    >
                                    <Icon className='dark:text-white text-black !w-[10px]' name={"chevron-right"} />
                                </button>
                            </div> */}
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                }
                {popularSub_respond && false &&
                
                <section className="py-12 bg-[#F2F2F3] dark:bg-[#1A1A1C]">
                        <div className="ms-5 lg:mx-auto lg:container relative">
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-5 lg:mb-8">{t("popular sub-sub categories")}</h2>
                        {popularSub_respond?.loading?
                        <DuvduLoading loadingIn={""} type={'tag'} />:
                        <>
                           <Swiper
                               //dir='ltr'
                               className=''
                               ref={SubCategoryRef}
                               modules={[Autoplay, Navigation, EffectFade, Pagination]}
                               spaceBetween={10}
                               slidesPerView={1.2}
                               loop={true}
                               pagination={{
                                   clickable: true,
                                   el: '.swiper-pagination',
                               }}
                               navigation={{
                                   prevEl: '.custom-swiper-prev2.prev4',
                                   nextEl: '.custom-swiper-next2.next4',
                               }}
                               breakpoints={{
                                   420: {
                                     slidesPerView: 1.7, // For mobile screens
                                   },
                                   640: {
                                     slidesPerView: 2, // For mobile screens
                                   },
                                   768: {
                                     slidesPerView: 2.4, // For tablets
                                   },
                                   1024: {
                                     slidesPerView: 4, // For desktop
                                   },
                                 }}                                    
                           >
                               {popularSub_respond?.data && popularSub_respond?.data[0]?.subCategories?.map((category, index) => {
                                   return <SwiperSlide key={index}>                                                            
                                       <div onClick={() => handleNavigation(`/${category.cycle}`, new URLSearchParams({
                                            category: category.categoryId,
                                            subcategory: category._id,
                                            tags: category.tags.map(tag => tag._id).join(',')
                                        }).toString()
                                        )}
                                            className='cursor-pointer' key={index}>
                                            <div className="">
                                                <img className="h-[75px] lg:h-24 object-cover w-full rounded-xl lg:rounded-3xl" src={category.image} />
                                                <h2 className="text-lg lg:text-2xl opacity-60 font-semibold mt-2 lg:mt-6">{category.title}</h2>
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
                                   </SwiperSlide>
                               })}
                           </Swiper>
                           {/* <div className='flex items-center justify-center gap-5 mt-5'>
                                    <button className='left-[45%] custom-swiper-prev2 prev1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                        onMouseDown={() => startScroll('prev' , SubCategoryRef)} // Start scrolling when mouse is down
                                        onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                        onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                                
                                        >
                                        <Icon className='dark:text-white text-black !w-[10px] ' name={"chevron-left"} />
                                    </button>
                                        <button className='right-[45%] custom-swiper-next2 next1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
                                        onMouseDown={() => startScroll('next' , SubCategoryRef)} // Start scrolling when mouse is down
                                        onMouseUp={stopScroll} // Stop scrolling when mouse is released
                                        onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                               
                                        >
                                        <Icon className='dark:text-white text-black !w-[10px]' name={"chevron-right"} />
                                    </button>
                                </div> */}
                           </>
                        }
                    </div>
                </section>
                }</>}

                <section className="py-12">
                    <div className='container'>
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize">{t("Haven't found your match yet?")}</h2>
                        <h4 className="text-center text-xl opacity-60 capitalize mb-5 lg:mb-8">{t("Here's our latest picks!")}</h4>
                        
                        <Filter cycle={cycle} setSwitchState={setSwitchState} switchState={switchState} setParams={setParams} />
                        <div className="h-5" />
                        
                        {Object.keys(paginatedData).length === 0 && projects?.loading ?
                        <>
                        <DuvduLoading loadingIn={""} type='projects' />
                        <DuvduLoading loadingIn={""} type='projects' />
                        </>:
                    allDisplayData.length > 0 && 
                        <SectionProjects inclusive={switchState.priceInclusive} projects={allDisplayData} />
                    }
                        
                        {/* Load More Button */}
                        {allDisplayData.length > 0 && (canLoadMore || loadingMore) && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="px-8 py-3 bg-[#1A73EB] text-white font-semibold rounded-full hover:bg-[#1557C7] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loadingMore ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            {t("Loading...")}
                                        </>
                                    ) : (
                                        t("Load More")
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </section>
                
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
    isLogin: state.auth.login,
});

const mapDispatchToProps = {
    HomeTreny,
    HomeDiscover,
    GetProjects,
    popularSub
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

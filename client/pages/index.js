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

    useEffect(() => {
        HomeTreny()
        HomeDiscover()
        popularSub()
        GetProjects({ limit: 99 })
    }, [])

    const [words, setWords] = useState(["modeling", "photography", "post production", "videography", "production", "modeling"]);
    const wordsRef = useRef(null);
    const list = homeTreny_respond?.data || [];
    const router = useRouter();

    var TheBeststyle = {
        backgroundImage: 'url("/assets/imgs/theme/home/circle.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        display: 'inline-block',
    };
    const homeTrenyList = [...list, ...Array(3 - list.length).fill({ title: '', image: '' })].slice(0, 3);

    const handleNavigation = (path, query) => {
        const url = query ? `${path}?${query}` : path;
        router.push(url);
    };

    return (
        <>
            <Layout isbodyWhite={true}>
                <section className="container w-full">
                    <div className="my-24 mx-auto w-min">
                        <h1 className="text-center my-4">
                            <span className="font-black text-3xl lg:text-8xl capitalize whitespace-nowrap trap">explore<span className="pt-5 lg:pt-[69px] px-[10px] pb-0 trap" style={TheBeststyle}>the best</span>of</span>
                            <div className="relative h-[50px] lg:h-[120px]">
                                <div className="absolute h-full w-full overflow-hidden">
                                    <div ref={wordsRef} className="slide-in">
                                        {
                                            words?.map((i) =>
                                                <div className="h-[50px] lg:h-[120px] flex flex-col justify-center items-center my-2">
                                                    <p className="text-[#1A73EB] font-black text-3xl lg:text-8xl h-full trap">{i}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </h1>
                        <p className="text-xs lg:text-xl font-bold text-[#263257] text-center lg:mx-20 trap">
                            consectetur sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. consectetur sit amet adipiscing elit, sed do.
                        </p>
                    </div>
                    <div className="mx-auto">
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8"> trendy categories </h2>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={1}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}

                        >
                            {homeTrenyList.map((data, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="bg-black  mx-auto aspect-square rounded-3xl trendy-section flex flex-col gap-5 items-center justify-end p-8 lg:p-11 overflow-hidden"
                                        style={{ backgroundImage: `url(${data.image})` }}
                                    >
                                        <span className="text-white text-xl lg:text-3xl font-semibold capitalize">
                                            {data.title || 'Empty Title'}
                                        </span>
                                        <span className="text-white opacity-50 font-semibold text-xs lg:text-lg text-center">
                                            {data.title ? 'Lectus ut aenean nisi consequat sit nisl pulvinar vulputate. ridiculus facilisis.' : 'This is an empty item.'}
                                        </span>
                                        <Link href={data.cycle ? `/${data.cycle}` : ''} >
                                            <a className="text-xs font-semibold text-primary bg-white px-5 lg:px-7 py-2 lg:py-3 rounded-full">
                                                {data.title ? 'View More' : 'Add Item'}
                                            </a>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </section>
                <section className="my-12 py-8 bg-[#F2F2F3]">
                    <div className="w-full">
                        <section className="mx-auto">
                            <div className="sm:container">
                                <h2 className="text-start lg:text-center text-2xl font-semibold opacity-60 capitalize mb-8"> discover tags </h2>
                            </div>
                            <div className="flex overflow-auto lg:gap-3">
                                {homeDiscover_respond?.data[0]?.subCategories?.map((data, index) => (
                                    <Link href={data.cycle ? `/${data.cycle}` : ''} >
                                        <a key={index} href={data.link || "#"} className="ml-2">
                                            <div
                                                className="bg-black aspect-[3] rounded-2xl lg:rounded-3xl trendy-section flex flex-col items-center justify-center overflow-hidden w-[189px] h-[65px] lg:w-[314px] lg:h-[108px]"
                                                style={{ backgroundImage: `url(${data.image})` }}
                                            >
                                                <span className="text-white text-xs lg:text-3xl font-semibold capitalize">
                                                    {data.title}
                                                </span>
                                            </div>
                                        </a>
                                    </Link>
                                ))}
                            </div>

                        </section>
                    </div>
                </section>

                <section className="my-12 py-8">
                    <div className="w-full pr-0">
                        <div className="mx-auto">
                            <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8"> top categories </h2>
                            <div className="flex overflow-auto lg:gap-3">
                                {[...categories,...categories]?.map((data, index) => (
                                    <Link href={data.cycle ? `/${data.cycle}` : ''} >
                                        <div
                                            className={`bg-black ml-2 h-[151.71px] lg:h-[347px] ${(index + 1) % 3 === 0 ? 'min-w-[252.39px] lg:min-w-[548.99px]' : 'min-w-[106.53px] lg:min-w-[230px]'} rounded-3xl trendy-section flex flex-col gap-5 items-start justify-between overflow-hidden px-3 py-3 lg:px-7 lg:py-10`}
                                            style={{ backgroundImage: `url(${data.image})` }}
                                        >
                                            <div className="capitalize rounded-full text-[8px] lg:text-lg font-medium text-white px-2 lg:px-6 lg:py-2 bg-black bg-opacity-50">
                                                150 creatives
                                            </div>
                                            <span className="text-white text-[14px] lg:text-3xl font-semibold capitalize text-center w-full">
                                                {data.title}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>

                <section className="my-12 py-8 bg-[#F2F2F3]">
                    <div className="sm:container">
                        <div className="mx-auto py-12">
                            <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8"> popular sub-sub categories</h2>
                            <div className="flex gap-8 w-full">
                                <Swiper
                                    dir='ltr'
                                    className='cardimg'
                                    modules={[Autoplay, Navigation, EffectFade]}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        500: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        850: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                    }}
                                // loop={true}
                                >
                                    {categories.slice(0, 3).map((category, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className="gap-8 w-full">
                                                <img className="h-24 object-cover w-full rounded-3xl" src={category.image} />
                                                <h2 className="text-2xl opacity-60 font-semibold mt-6 cursor-pointer"
                                                    onClick={() => handleNavigation(`/${category.cycle}`)}
                                                >{category.title}</h2>
                                                <ul>
                                                    <div>
                                                        {category.subCategories?.map((subcategory, subIndex) => (
                                                            subIndex / category.subCategories.length < 0.5 && (
                                                                <MenuItem key={subIndex} title={subcategory.title} items={subcategory.tags}
                                                                    onClick={(tagId) => handleNavigation(`/${category.cycle}`, `subcategory=${subcategory._id}&${tagId ? "tag=" + tagId : ''}`)}
                                                                />
                                                            )
                                                        ))}
                                                    </div>
                                                    {category.subCategories.length > 1 && (
                                                        <div>
                                                            {category.subCategories.map((subcategory, subIndex) => (
                                                                subIndex / category.subCategories.length >= 0.5 && (
                                                                    <MenuItem key={subIndex} title={subcategory.title} items={subcategory.tags}
                                                                        onClick={(tagId) => handleNavigation(`/${category.cycle}`, `subcategory=${subcategory._id}&${tagId ? "tag=" + tagId : ''}`)}
                                                                    />
                                                                )
                                                            ))}
                                                        </div>
                                                    )}
                                                </ul>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>


                            </div>
                        </div>
                    </div>
                </section>
                <section className="my-12 py-8">
                    <div className='container'>
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8"> explore recommended projects</h2>
                        <SectionProjects projects={projects?.data} />
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

        <ul className={"flex flex-wrap gap-3 py-2"}>
            {items.map((item, index) => (
                <li className='py-1 px-2 border hover:border-primary hover:text-[#3E3E3E] hover dark:border-[#FFFFFF4D] rounded-full' key={index}>
                    <div className='cursor-pointer dark:text-[#FFFFFFBF] text-[#3E3E3E] hover:text-[#3E3E3E]'
                        onClick={() => onClick(item._id)}
                    >{item.title}</div>
                </li>
            ))}
        </ul>
    </li>
);


const RelatedCategoriesCard = ({ className, title, count }) => {
    return (
        <div className={`flex flex-col items-center justify-around border border-[#1A73EBB2] rounded-3xl w-full py-2 cursor-pointer ${className}`}>
            <span className="text-primary text-lg font-semibold opacity-80 capitalize">{title}</span>
            <span className="text-base font-medium opacity-50 capitalize">{count} creative</span>
        </div>
    );
}

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

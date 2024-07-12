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

const Home = ({
    HomeTreny,
    homeTreny_respond,

    HomeDiscover,
    homeDiscover_respond,

    popularSub,
    popularSub_respond,

    categories
}) => {

    useEffect(() => {
        HomeTreny()
        HomeDiscover()
        popularSub()
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
                            <span className="text-[#263257] font-black text-4xl lg:text-8xl capitalize whitespace-nowrap">explore <span className="pt-6 lg:pt-[61px] px-[10px] pb-0" style={TheBeststyle}>the best</span> of </span>
                            <div className="relative h-[60px] lg:h-[120px]">
                                <div className="absolute h-full w-full overflow-hidden">

                                    <div ref={wordsRef} className="slide-in">
                                        {
                                            words?.map((i) =>
                                                <div className="h-[60px] lg:h-[120px] flex flex-col justify-center items-center my-2">
                                                    <p className="text-[#1A73EB] font-black text-4xl lg:text-8xl h-full">{i}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </h1>
                        <p className="text-xs lg:text-xl font-bold text-[#263257] text-center lg:mx-20">
                            consectetur sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. consectetur sit amet adipiscing elit, sed do.
                        </p>
                    </div>
                    <div className="mx-auto">
                        <h2 className="text-center text-2xl font-semibold opacity-60 capitalize"> trendy categories </h2>
                        <div className="flex flex-col lg:flex-row gap-4 mt-7">
                            {
                                homeTrenyList.map((data, index) =>
                                    <div key={index} className="bg-black w-full aspect-square rounded-3xl trendy-section flex flex-col gap-5 items-center justify-end p-11 overflow-hidden" style={{ backgroundImage: `url(${data.image})` }}>
                                        <span className="text-white text-3xl font-semibold capitalize">
                                            {data.title || 'Empty Title'}
                                        </span>
                                        <span className="text-white opacity-50 font-semibold text-lg text-center">
                                            {data.title ? 'Lectus ut aenean nisi consequat sit nisl pulvinar vulputate. ridiculus facilisis.' : 'This is an empty item.'}
                                        </span>
                                        <a className="text-lg font-semibold text-primary bg-white px-7 py-3 rounded-full">
                                            {data.title ? 'View More' : 'Add Item'}
                                        </a>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
                <section className="my-12 py-12 bg-[#F2F2F3]">
                    <div className="container w-full">
                        <section className="mx-auto">
                            <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8"> discover tags </h2>
                            <Swiper
                                dir='ltr'
                                className='cardimg'
                                modules={[Autoplay, Navigation, EffectFade]}
                                spaceBetween={150}
                                slidesPerView={4}
                            // loop={true}
                            >
                                {homeDiscover_respond?.data[0]?.subCategories?.map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="bg-black w-[330px] aspect-[3] rounded-3xl trendy-section flex flex-col gap-5 items-center justify-center overflow-hidden"
                                            style={{ backgroundImage: `url(${data.image})` }}
                                        >
                                            <span className="text-white text-3xl font-semibold capitalize">
                                                {data.title}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    </div>
                </section>

                <section className="my-12 py-12">
                    <div className="container w-full">
                        <div className="mx-auto">
                            <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8"> top categories </h2>
                            <CustomSwiper>
                                {popularSub_respond?.data[0]?.subCategories?.map((data, index) => (
                                    <div
                                        key={index}
                                        className={`bg-black h-[347px] ${(index + 1) % 3 === 0 ? 'w-[448px]' : 'w-[230px]'} rounded-3xl trendy-section flex flex-col gap-5 items-start justify-between overflow-hidden px-7 py-10`}
                                        style={{ backgroundImage: `url(${data.image})` }}
                                    >
                                        <div className="capitalize rounded-full text-lg font-medium text-white px-6 py-2 bg-black bg-opacity-50">
                                            150 creatives
                                        </div>
                                        <span className="text-white text-3xl font-semibold capitalize text-center w-full">
                                            {data.title}
                                        </span>
                                    </div>
                                ))}
                            </CustomSwiper>
                        </div>
                    </div>
                </section>

                <section className="my-12 py-12 bg-[#F2F2F3]">
                    <div className="container">
                        <div className="mx-auto py-12">
                            <h2 className="text-center text-2xl font-semibold opacity-60 capitalize mb-8"> popular sub-sub categories</h2>
                            <div className="flex gap-8 w-full">
                                {categories.slice(0, 3).map((category, index) => (
                                    <div
                                        key={index}
                                        className="gap-8 w-full">
                                        <img className="h-24 object-cover w-full rounded-3xl" src={category.image} />
                                        <h2 className="text-2xl opacity-60 font-semibold mt-6">{category.title}</h2>
                                        <ul>
                                            <div>
                                                {category.subCategories?.map((subcategory, subIndex) => (
                                                    subIndex / category.subCategories.length < 0.5 && (
                                                        <MenuItem key={subIndex} title={subcategory.title} items={subcategory.tags} />
                                                    )
                                                ))}
                                            </div>
                                            {category.subCategories.length > 1 && (
                                                <div>
                                                    {category.subCategories.map((subcategory, subIndex) => (
                                                        subIndex / category.subCategories.length >= 0.5 && (
                                                            <MenuItem key={subIndex} title={subcategory.title} items={subcategory.tags} />
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                ))}

                            </div>
                        </div>
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

});

const mapDispatchToProps = {
    HomeTreny,
    HomeDiscover,
    popularSub
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

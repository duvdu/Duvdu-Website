import Link from "next/link";
import Layout from "./Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import SwiperCore, { Autoplay, Navigation, EffectFade } from 'swiper';
SwiperCore.use([Autoplay, Navigation, EffectFade]);

import { Swiper, SwiperSlide } from "swiper/react";

function Auth({ children }) {
    const [active, setActive] = useState(-1);
    const [swiper, setSwiper] = useState(null);

    const imageSources = [
        {
            "img": 'assets/imgs/authswiper/login-1.png',
            "h1": "let your project shine",
            "p": "we make it fast, simple, & cost effective to find, hire & pay the best professionals anywhere, any time ."
        },
        {
            "img": 'assets/imgs/authswiper/login-2.png',
            "h1": "let your project shine",
            "p": "we make it fast, simple, & cost effective to find, hire & pay the best professionals anywhere, any time ."
        },
        {
            "img": 'assets/imgs/authswiper/login-3.png',
            "h1": "let your project shine",
            "p": "we make it fast, simple, & cost effective to find, hire & pay the best professionals anywhere, any time ."
        }
    ];

    const router = useRouter();

    useEffect(() => {
        // Function to run when the route changes
        const handleRouteChange = (url) => {
            swiper?.destroy();
        };

        // Subscribe to the router's routeChange event
        router.events.on('routeChangeStart', handleRouteChange);

        // Clean up the event listener on component unmount
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    return (
        <>
            <Layout shortheader={true}>
                <div className="h-body">
                    <div className="container">
                        <div className="lg:flex gap-6">
                            <div className="lg:w-5/12 left-content">
                                <div className="left-side-auth mt-7 lg:mt-0">
                                    <Swiper
                                        modules={[Autoplay, Navigation, EffectFade]}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        scrollbar={{ draggable: true }}
                                        onSwiper={(swiper) => setSwiper(swiper)}
                                        onSlideChange={() => setActive((active + 1) % imageSources.length)}
                                        loop={true}
                                        // autoplay={{ delay: 4000 }}
                                        speed={1500}
                                    >
                                        {imageSources.map((source, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="relative">
                                                    <div className="absolute flex flex-col justify-end auth-gradient h-full px-16 py-28">
                                                        <h1 className="text-white text-[70px] font-bold uppercase shadow1 leading-[1.2] w-min">{source.h1}</h1>
                                                        <p className="text-white opacity-60 text-sm leading-6 capitalize">{source.p}</p>
                                                    </div>
                                                    <div className="bg-cover border-top swipper-img">
                                                        {/* <div className="w-full h-full">

                                                        </div> */}
                                                        <img className="bg-cover w-screen" src={source.img} alt="swiper img" />
                                                    </div>
                                                </div>

                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="front-part">
                                        <div className="footer">
                                            <div className="dots flex px-16">
                                                {imageSources.map((source, index) => (
                                                    <div key={index} className={index == active ? "dot-active" : "dot"}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-7/12 right-content">
                                <div className="padding_eight_all bg-DS_white relative flex flex-col justify-center p-5 border rounded-lg h-full">
                                    <Link href="/"><a className="as-Guest flex items-center">
                                        Continue as a Guest
                                        <img className="h-3" src="/assets/imgs/theme/icons/left-arrow.svg" alt="arrow" />
                                    </a>
                                    </Link>
                                    <div className="my-20 px-0 md:px-28">
                                    {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Auth;

import Link from "next/link";
import Layout from "./Layout";
import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay, Navigation, EffectFade } from 'swiper';
SwiperCore.use([Autoplay, Navigation, EffectFade]);

import { Swiper, SwiperSlide } from "swiper/react";

function Auth({ children }) {
    const [active, setActive] = useState(-1);

    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        return () => swiper?.destroy();
    }, [swiper]);


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

    return (
        <>
            <Layout subChild="Auth">
                <div className="page-content">
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
                                        autoplay={{ delay: 4000 }}
                                        speed={1500}
                                    >
                                        {imageSources.map((source, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="relative">
                                                    <div className="text-content">
                                                        <h1>{source.h1}</h1>
                                                        <p>{source.p}</p>
                                                    </div>
                                                    <div  className="bg-cover border-top swipper-img">
                                                        <img className="bg-cover min-h-full h-auto min-w-full w-auto" src={source.img} alt="swiper img" />
                                                    </div>
                                                </div>

                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="front-part">
                                        <div className="footer">
                                            <div className="dots">
                                                {imageSources.map((source, index) => (
                                                    <div key={index} className={index == active ? "dot-active" : "dot"}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-7/12 right-content">
                                <div className="padding_eight_all bg-white auth-card">
                                    <Link href="/"><a className="as-Guest flex items-center">
                                        Continue as a Guest
                                        <img className="h-3" src="/assets/imgs/theme/icons/left-arrow.svg" alt="arrow" />
                                    </a>
                                    </Link>
                                    {children}
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

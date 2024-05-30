import Link from "next/link";
import Layout from "./Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import SwiperCore, { Autoplay, Navigation, EffectFade } from 'swiper';
import Icon from '../Icons';
import { connect } from "react-redux";
import * as Types from "../../redux/constants/actionTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { resendCode } from "../../redux/action/apis/auth/OTP/resend";

SwiperCore.use([Autoplay, Navigation, EffectFade]);


function Auth({ children, isloading, errors, auth, api, resendCode }) {

    const [active, setActive] = useState(-1);
    const [swiper, setSwiper] = useState(null);
    const [localerror, setLocalerror] = useState(true);
    const [location, setLocation] = useState(null);
    const [swiperError, setSwiperError] = useState(null);
    const [isAutoplay, setIsAutoplay] = useState(true);

    const imageSources = [
        {
            "img": '/assets/imgs/authswiper/login-1.png',
            "h1": "let your project shine",
            "p": "we make it fast, simple, & cost effective to find, hire & pay the best professionals anywhere, any time ."
        },
        {
            "img": '/assets/imgs/authswiper/login-2.png',
            "h1": "let your project shine",
            "p": "we make it fast, simple, & cost effective to find, hire & pay the best professionals anywhere, any time ."
        },
        {
            "img": '/assets/imgs/authswiper/login-3.png',
            "h1": "let your project shine",
            "p": "we make it fast, simple, & cost effective to find, hire & pay the best professionals anywhere, any time ."
        }
    ];

    const router = useRouter();
    useEffect(() => {

        const handleRouteChange = (url) => {
            swiper?.destroy();
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    useEffect(() => {
        setLocalerror(true)
    }, [isloading]);

    useEffect(() => {
        
        if (auth.username && auth.login && auth.user.isVerified !== false) {
            router.push(`/`);
            // window.location.href = "/"
        }
        else if (auth.username && auth.login && auth.user.isVerified === false && !verify_respond) {
            // resendCode({ username: auth.username })
            // router.push(`/register/${auth.username}`);
        }
    }, [auth.username]);

    useEffect(() => {
        setLocation(window.location.origin)
    }, []);

    return (
        <>
            <Layout isloading={isloading} shortheader={true} showTabs={false}>
                <div className="h-body center-div">
                    <div className="container">
                        <div className="flex flex-col lg:flex-row gap-6 h-body py-9">
                            <div className="lg:w-5/12 xl:w-5/12 ">
                                <div className="left-side-auth lg:mt-0 h-full">
                                    <div className="flex h-full">
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
                                                    <div className="relative min-h-[790px] min-w-96 size-full">
                                                        <div className="absolute flex flex-col justify-end auth-gradient h-full px-16 py-28">
                                                            <h1 className="text-white text-[70px] font-bold uppercase shadow1 leading-[1.2] w-min">{source.h1}</h1>
                                                            <p className="text-white opacity-60 text-sm leading-6 capitalize">{source.p}</p>
                                                        </div>
                                                        {
                                                            location &&
                                                            <div className="bg-cover border-top swipper-img h-full" style={{ backgroundImage: `url(${location}/${source.img})` }} />
                                                        }
                                                    </div>
                                                    {/* <div className="w-full h-full bg-black" /> */}
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                    <div className="front-part absolute bottom-10">
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
                            <div className="lg:w-7/12 xl:w-7/12 ">
                                <div className="padding_eight_all bg-DS_white relative flex flex-col justify-center items-center rounded-lg h-auto sm:h-full">
                                    <Link href="/">
                                        <span className="as-Guest flex items-center cursor-pointer">
                                            Continue as a Guest
                                            <Icon name="arrow-right-long" className="ml-3 text-xl w-6 text-primary" />
                                        </span>
                                    </Link>
                                    <div className="size-full max-w-[650px]">
                                        <div className="h-full scroll-w-0 overflow-y-scroll flex flex-col justify-start">
                                            <div className="h-full flex flex-col justify-between px-5 md:px-28">
                                                <div className="h-full min-h-36 lg:min-h-14" />
                                                {children}
                                                <div className="h-full  min-h-28 lg:min-h-8" />

                                            </div>
                                        </div>
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

const mapStateToProps = (state) => ({
    api: state.api,
    errors: state.errors,
    auth: state.auth,
    verify_respond: state.api.verify,

});

const mapDispatchToProps = {
    resendCode
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

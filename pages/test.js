import Layout from "./../components/layout/Layout";
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

SwiperCore.use([Autoplay, Navigation, EffectFade, Pagination]);

function Test() {

    return (
        <Layout parent="Home" sub="Pages" subChild="About">
            <Swiper
                className='cardimg'
                modules={[Autoplay, Navigation, EffectFade, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                loop={true}
                autoplay={{ delay: 4000 }}
                speed={1500}
                pagination={{ clickable: true }}
            >
                {[
                    'https://via.placeholder.com/800x400',
                    'https://via.placeholder.com/800x400',
                    'https://via.placeholder.com/800x400',
                ].map((source, index) => (
                    <SwiperSlide key={index}>
                        <div className="h-96">
                            <span >
                                {source}
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Layout>
    );
}

export default Test;

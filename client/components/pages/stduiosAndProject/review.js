import { useEffect ,useState, useRef} from "react";
import { projectReview } from "../../../redux/action/apis/reviews/project";
import { userReview } from '../../../redux/action/apis/reviews/users';
import Comment from "../../elements/comment";
import Icon from "../../../components/Icons";
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination ,FreeMode} from 'swiper';
import 'swiper/css/free-mode';

const Reviews = ({ data, userName , project=false }) => {
    const { t } = useTranslation();
    const reviewRef = useRef(null);
    const [scrollInterval, setScrollInterval] = useState(null);

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

    const renderComments = () => {
        return <>
        <Swiper
        dir='ltr'
        className='h-full'
        ref={reviewRef}
        modules={[Autoplay, Navigation, EffectFade, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
        loop={data?.length==1?false:true}
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
              slidesPerView: 1.2, // For mobile screens
            },
            640: {
              slidesPerView: 1.5, // For mobile screens
            },
            768: {
              slidesPerView: project===true?2.1: 1.1, // For tablets
            },
          }}                                    
    >                                                            
        {data?.map((review) => ({
            id: review._id,
            userName: review.customer.username,
            name: review.customer.name?.split(' ')[0].length>6?review.customer.name?.split(' ')[0].slice(0,6):review.customer.name?.split(' ')[0],
            date: new Date(review.createdAt),
            avatar: review.customer.profileImage,
            commentText: review.comment,
            rate: review.rate,
        })).map((comment ,index) => (
            <SwiperSlide className='h-full' key={comment.id + index}>
                <Comment comment={comment} />
            </SwiperSlide >
        ))}
    </Swiper>
    {data?.length>1 &&
    // <div className='flex items-center justify-center gap-5 mt-5'>
    //     <button className='left-[45%] custom-swiper-prev2 prev4 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
    //         onMouseDown={() => startScroll('prev',reviewRef)} // Start scrolling when mouse is down
    //         onMouseUp={stopScroll} // Stop scrolling when mouse is released
    //         onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                                
    //         >
    //         <Icon className='dark:text-white text-black !w-[10px] ' name={"chevron-left"} />
    //     </button>
    //     <button className='right-[45%] custom-swiper-next2 next4 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
    //         onMouseDown={() => startScroll('next',reviewRef)} // Start scrolling when mouse is down
    //         onMouseUp={stopScroll} // Stop scrolling when mouse is released
    //         onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                               
    //         >
    //         <Icon className='dark:text-white text-black !w-[10px]' name={"chevron-right"} />
    //     </button>
    // </div>
    <></>
    }
    </>
    };

    return ( data?.length>0 &&
        <div className='mx-5 md:mx-0'>
            <h2 className="font-bold text-lg capitalize opacity-80 mb-4">{t("Reviews")}</h2>
            <div className='w-full relative'>
                    {renderComments()}
            </div>
        </div>
        
    );
};

export default Reviews;

import { useEffect ,useState, useRef} from "react";
import { projectReview } from "../../../redux/action/apis/reviews/project";
import Comment from "../../elements/comment";
import Icon from "../../../components/Icons";
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import DraggableList from "../home/dragList";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination ,FreeMode} from 'swiper';
import 'swiper/css/free-mode';

const Reviews = ({ projectReview, projectReview_respond, data }) => {
    const { t } = useTranslation();
    
    useEffect(() => {
        projectReview({ projectID: data.project });
    }, [projectReview, data._id]);
    const SubCategoryRef = useRef(null);
    const [scrollInterval, setScrollInterval] = useState(null);

    const startScroll = (direction , ref) => {
      const scroll = () => {
        if (direction === 'next') {
          ref?.current?.swiper?.slideNext();
        } else {
          ref.current.swiper.slidePrev();
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
        if (!projectReview_respond || !projectReview_respond.data) {
            return <div>{t("Loading...")}</div>;
        }

        return <>
        <Swiper
        dir='ltr'
        className='h-full'
        ref={SubCategoryRef}
        modules={[Autoplay, Navigation, EffectFade, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
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
              slidesPerView: 1.2, // For mobile screens
            },
            640: {
              slidesPerView: 1.5, // For mobile screens
            },
            768: {
              slidesPerView: 2.1, // For tablets
            },
          }}                                    
    >                                                            
        {projectReview_respond.data.map((review) => ({
            id: review._id,
            userName: review.user.username,
            name: review.user.name?.split(' ')[0].length>6?review.user.name?.split(' ')[0].slice(0,6):review.user.name?.split(' ')[0],
            date: new Date(review.createdAt),
            avatar: review.user.profileImage,
            commentText: review.comment,
            rate: review.rate,
        })).map((comment) => (
            <SwiperSlide className='h-full' key={comment.id}>
                <Comment comment={comment} />
            </SwiperSlide >
        ))}
    </Swiper>
    <div className='flex items-center justify-center gap-5 mt-5'>
        <button className='left-[45%] custom-swiper-prev2 prev1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
            onMouseDown={() => startScroll('prev',SubCategoryRef)} // Start scrolling when mouse is down
            onMouseUp={stopScroll} // Stop scrolling when mouse is released
            onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                                
            >
            <Icon className='dark:text-white text-black !w-[10px] ' name={"chevron-left"} />
        </button>
        {/* </div> */}
        <button className='right-[45%] custom-swiper-next2 next1 dark:bg-[#caded333] backdrop-blur-sm border-2 rounded-full p-2 flex flex-row items-center justify-center'
            onMouseDown={() => startScroll('next',SubCategoryRef)} // Start scrolling when mouse is down
            onMouseUp={stopScroll} // Stop scrolling when mouse is released
            onMouseLeave={stopScroll} // Stop scrolling when mouse leaves the button                               
            >
            <Icon className='dark:text-white text-black !w-[10px]' name={"chevron-right"} />
        </button>
    </div>
    </>
    };

    return (
        <div className='mx-5 md:mx-0 pt-10'>
            <h2 className="font-bold text-lg capitalize opacity-80 mb-4">{t("Reviews")}</h2>
            <div className='w-full relative'>
                {/* <DraggableList> */}
                    {renderComments()}
                {/* </DraggableList> */}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    projectReview_respond: state.api.projectReview,
});

const mapDispatchToProps = {
    projectReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

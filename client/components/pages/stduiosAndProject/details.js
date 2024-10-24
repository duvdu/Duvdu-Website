import { convertHoursTo__,  } from "../../../util/util";
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { useRouter } from "next/router";
import GoogleMap from "../../elements/googleMap";
import Selector from "../../elements/CustomSelector";
import dateFormat from "dateformat";
import { isVideo  } from '../../../util/util';
import Icon from '../../Icons';
import ProjectCover from './projectShow';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import { connect } from "react-redux";
import RatingProject from "../../popsup/ratingProject";
import { OpenPopUp } from "../../../util/util";
import ReportProject from "../../popsup/report-project";

const Details = ({ data , onAudioPlay,toggleDrawerEdit , islogin , user }) => {
    const [playingAudioRef, setPlayingAudioRef] = useState(null);
    const { t } = useTranslation();
    const router = useRouter();
    const { project: projectId } = router.query;

    const handleAudioPlay = (newAudioRef) => {
        if (playingAudioRef && playingAudioRef !== newAudioRef) {
          playingAudioRef.pause();
        }
        setPlayingAudioRef(newAudioRef);
      };
      const handleDropdownSelect = (v) => {
        if (islogin===false) {
            OpenPopUp("registration-required")
            return
        }
        if (v == "Rate") OpenPopUp("Rating-project")
        else if (v == "Report") OpenPopUp("report-project2")
        else if (v == "Edit") toggleDrawerEdit()
    };

    return (
        <>
        <RatingProject data={data} />
        {islogin ===true &&
            <ReportProject data={data} />
        }
        <div className="!sticky top-header rounded-[30px] mx-5 md:mx-0">
            {/* <div className='rounded-[50px] overflow-hidden block lg:hidden'>
                <ProjectCover onAudioPlay={onAudioPlay} hidden={true} data={data?.attachments[0]} cover={data?.cover}/>
            </div> */}
            {data?.attachments.length > 1 ?
                <div className=' rounded-[30px] mb-10 overflow-hidden h-[400px] relative block lg:hidden'>
                                                    {/* Custom Arrows */}
                                                    {/* <div className="swiper-button-prev"> */}
                                                    <div className='left-[30px] custom-swiper-prev !text-white top-1/2 icon-pause rounded-full p-2 flex flex-row items-center justify-center'>
                                                        <Icon className='!text-white !w-[10px] ' name={"chevron-left"} />
                                                    </div>
                                                    {/* </div> */}
                                                    <div className='right-[30px] custom-swiper-next !text-white top-1/2 icon-pause rounded-full p-2 flex flex-row items-center justify-center'>
                                                        <Icon className='!text-white !w-[10px]' name={"chevron-right"} />
                                                    </div>
                                                    <Swiper
                                                        dir='ltr'
                                                        className='cardimg'
                                                        modules={[Autoplay, Navigation, EffectFade, Pagination]}
                                                        spaceBetween={0}
                                                        slidesPerView={1}
                                                        loop={true}
                                                        pagination={{
                                                            clickable: true,
                                                            el: '.swiper-pagination',
                                                        }}
                                                        onSlideChange={() => {
                                                            if (playingAudioRef) {
                                                              playingAudioRef.pause();  // Pause the currently playing audio when the slide changes
                                                            }
                                                          }}    
                                                        navigation={{
                                                            prevEl: '.custom-swiper-prev',
                                                            nextEl: '.custom-swiper-next',
                                                        }}
                                                    >
                                                        {data?.attachments.map((item, index) => {
                                                            return <SwiperSlide key={index}>
                                                                <ProjectCover data={item} cover={data?.cover} />
                                                            </SwiperSlide>
                                                            return <SwiperSlide key={index}>
                                                                <ProjectCover onAudioPlay={handleAudioPlay} data={item} cover={data?.cover} />
                                                            </SwiperSlide>                                                        
                                                        })}
                                                    </Swiper>
                                                    {/* Pagination Bullets */}
                                                    <div className="swiper-pagination"></div>
                </div> :
                    <div className='rounded-[30px] mb-10 overflow-hidden h-[400px] relative lg:hidden block'>
                        <ProjectCover onAudioPlay={handleAudioPlay}  data={data?.attachments[0]} cover={data?.cover} />
                    </div>
            }
            {/* <div className="w-full h-72 border-50 overflow-hidden">
            {!isVideo(data?.cover) ? (
          <img className='w-full h-full object-cover' src={data?.cover}/>
        ) : (
            <video
              className='w-full h-full'
              loop
            >
              <source src={data?.cover} type='video/mp4' />
            </video>
        )}
        
        </div> */}
        <div className="bg-white dark:bg-[#1A2024] p-4 rounded-[30px] pt-6">
            <div className='flex items-center justify-between'>
                <h1 className="text-xl capitalize opacity-80 font-bold">
                    {data?.name || data?.title}
                </h1>
                {islogin===true && 
                <Selector
                        options={user?.username===data?.user?.username?[
                            {
                                value:"Edit"
                            }
                        ]:[
                            // {
                            //     value: "Rate",
                            // },
                            {
                                value: "Report",
                            },
                        ]}
                        onSelect={handleDropdownSelect}
                        className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-10 h-10 cursor-pointer"
                />
                }
            </div>
            <div className="w-full flex my-5">
                <span className=" capitalize opacity-50 font-medium">{dateFormat(data?.createAt, 'mmmm d - yyyy')}</span>
            </div>

            {(data?.tools || data?.equipments)?.length > 0 &&
                <>
                    <div className="mt-3 mb-3">
                        <h3 className="capitalize opacity-50 font-medium">{t("Tools Used")}</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {(data?.tools || data?.equipments).map(tool => [
                            { value: tool.name, isActive: false , isPrice:false},
                            { value: tool.unitPrice, isActive: false, isPrice:true }
                        ]).map((toolGroup, i) => (
                            <div key={i} className="flex gap-2">
                                {toolGroup.map((tool, j) => (
                                    <div key={j} className={` text-[#404040] font-medium  rounded-3xl py-2 px-4 bg-transparant border-[1px] border-[#00000080] dark:border-[#d1d1d1] dark:text-white`}>
                                    {tool.value} {tool.isPrice?'$':''}
                                </div>
                            ))}
                            </div>
                        ))}
                    </div>
                </>
            }

            {data?.functions?.length > 0 &&
                <>
                    <div className="mt-2 mb-3">
                        <h3 className="capitalize opacity-50 font-medium">{t("function Used")}</h3>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        {(data?.functions).map(tool => [
                            { value: tool.name, isActive: false , isPrice:false },
                            { value: tool.unitPrice, isActive: false , isPrice:true}
                        ]).map((toolGroup, i) => (
                            <div key={i} className="flex gap-2">
                                {toolGroup.map((tool, j) => (
                                    <div key={j} className={` text-[#404040] font-medium  rounded-3xl py-2 px-4 bg-transparant border-[1px] border-[#00000080] dark:border-[#d1d1d1] dark:text-white`}>
                                        {tool.value} {tool.isPrice?'$':''}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            }
            {data?.creatives?.length > 0 &&
                <>
                    <div className="mt-4 mb-3">
                        <h3 className="capitalize opacity-50">{t("creatives")}</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {data?.creatives.map(creative => [
                            { value: creative?.name, isActive: false, img: creative?.profileImage },
                            { value: "", isActive: false },
                            { value: 'CATEGOREY', isActive: false },
                        ]).map((creativeGroup, i) => (
                            <div key={i} className="flex gap-2">
                                {creativeGroup.map((creative, j) => (
                                    <div key={j} className={`flex rounded-3xl ${creative.isActive ? 'bg-primary' : 'bg-[#00000040]'}`}>
                                        {creative.img ?
                                            <img className="size-8 aspect-square rounded-full object-cover object-top" src={creative.img} alt="profile" /> :
                                            <div className="h-8" />
                                        }
                                        {
                                            creative.value &&
                                            <span className="px-4 flex items-center text-white">
                                                {creative.value}
                                            </span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            }
            <h3 className="capitalize opacity-50 font-medium mt-5">{t("description")}</h3>
            <div>
                <span className="capitalize font-semibold mt-4">{data?.desc || data?.description}</span>
            </div>
            {
                data.duration &&
                <section>
                    <div className="mt-3">
                        <span className="capitalize opacity-50 font-medium">{t("duration")}</span>
                    </div>
                    <div>
                        <span className="capitalize font-semibold">{data.duration} Days</span>
                    </div>
                </section>}
            {data.insurance &&
                <section>
                    <div className="mt-3">
                        <span className="capitalize opacity-50 font-medium">{t("insurance")}</span>
                    </div>
                    <div>
                        <span className="capitalize font-semibold">{data.insurance}</span>
                    </div>
                </section>
            }
            {
                data?.location &&
                <section className='mt-3'>
                    <span className="capitalize opacity-50 font-medium">{t("location")}</span>
                    <div className="capitalize">
                        <section >
                            <GoogleMap
                                width={'100%'} value={{ 'lat': data.location.lat, 'lng': data.location.lng }}
                                isreadOnly={true}
                                className={"relative rounded-3xl overflow-hidden h-[200px] border-2 border-primary"}
                                height={200}
                                inputclass={"my-0 bg-transparent font-bold"}
                                fullscreenControl={false}
                            />
                        </section>
                    </div>
                </section>
            }

        </div>
        </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    islogin: state.auth.login,
    user: state.user.profile,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
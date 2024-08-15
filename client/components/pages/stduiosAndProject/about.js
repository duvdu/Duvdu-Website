import { convertToK, getRankStyle } from "../../../util/util";
import { useTranslation } from 'react-i18next';
import Icon from "../../Icons";
import React from 'react';

const About = ({ data }) => {
    const { t } = useTranslation();

    return (
        <div className="sticky top-header">
            <div className="h-16" />
            <h2 className="font-bold text-lg capitalize opacity-80 mb-4 mx-5 sm:mx-0">{t("about the creative")}</h2>
            <div className="border border-50 border-solid border-[#00000040] dark:border-[#FFFFFF40] p-10 mx-5 md:mx-0">
                <div className='flex items-center justify-center'>
                    <div className='w-32 h-32 relative'>
                        <img className='profile-frame absolute rounded-full' src="/assets/imgs/theme/profile-frame.svg" alt="profile frame" />
                        <img className='profileImgture absolute rounded-full object-cover object-top' src={data?.user.profileImage} alt="profile picture" />
                    </div>
                    <div className='flex-2 flex-col gap-1'>
                        <h3 className="capitalize font-semibold text-lg">{data?.user.name}</h3>
                        <span className='flex items-center gap-2'>
                            <Icon className='opacity-50 w-3' name='location-dot' />
                            <span className="location">{data?.user.address || "UNKNOWN"}</span>
                        </span>
                    </div>
                </div>
                <div className='flex justify-center pt-25 items-center gap-1 sm:gap-3'>
                    {data?.user?.rank?.title && <p className='rank' style={getRankStyle(data?.user?.rank?.color)}>{data?.user?.rank?.title}</p>}
                    {data?.category?.title && <p className="info-container whitespace-nowrap">{data?.category?.title}</p>}
                    <div className='info-container justify-center flex items-center gap-2 w-20'>
                        <p>{data?.user?.rate?.totalRates || 0}</p>
                        <Icon className='text-primary w-4' name={'star'} />
                    </div>
                </div>
                <div className='flex justify-center pt-7 items-center'>
                    <div className='flex justify-center'>
                        {[
                            { key: "likes", value: data.user?.likes },
                            { key: "followers", value: data.user?.followCount?.followers },
                            { key: "views", value: data.user.profileViews }
                        ].map(({ key, value }, index, array) => (
                            <div className={`popularity mr-9 pr-9`} key={key}>
                                <p className='number'>{convertToK(value, 0)}</p>
                                <p className='unit'>{key}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {data?.user.about && (
                    <div className='sm:px-10 border-[#00000040] dark:border-[#FFFFFF40] border-t mt-6 pt-6'>
                        <p id='about-header'>{t("about")}</p>
                        <p className='pt-2' id='about-paragraph'>{data?.user.about}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;

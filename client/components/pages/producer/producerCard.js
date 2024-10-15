
import React from 'react';
import Icon from '../../Icons';
import { connect } from 'react-redux';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { getRankStyle } from '../../../util/util';


const ProducerCard = ({ cardData, className = "", onClick, user }) => {
    const { t } = useTranslation();
    return (
    <>
    <div className={`h-full border border-50 border-solid border-gray-300 dark:border-gray-500 flex flex-col gap-5 justify-between p-10 ${className}`}>
      <Link href={`/creative/${cardData?.user?.username}`}>
        <div className='flex items-center justify-center text-center cursor-pointer'>

          <img
            className='profileImgture-2 m-2 rounded-full w-full h-full border-4 border-white shadow object-cover object-top'
            src={cardData?.user?.profileImage || '/default-profile.png'} // Providing a default image
            alt="profile picture"
          />

          <div className='flex-2 flex-col gap-1'>
            <h3 className='opacity-80 text-lg font-bold text-start'>{cardData?.user?.name?.split(' ')[0].length>6?cardData?.user?.name?.split(' ')[0].slice(0,6):cardData?.user?.name?.split(' ')[0] || "Unknown User"}</h3>
            <span className='flex items-start justify-start opacity-40'>
              <div>
                <Icon className='opacity-50 mr-1 mt-1 w-3' name='location-dot' />
              </div>
              <span className="text-start line-clamp-2">{cardData?.address || "UNKNOWN"}</span>
            </span>
          </div>
        </div>
      </Link>
        <div className='flex justify-center items-center gap-3'>
          <div className='border rounded-full px-3 py-1 font-bold text-lg' style={getRankStyle(cardData?.user?.rank?.color)}>
              {cardData?.user?.rank?.title || "Unranked"}
          </div>
          <span className='info-container flex gap-1'>
            <span>{cardData?.user?.acceptedProjectsCounter}</span> <span>{t("projects")}</span>
          </span>
          <div className='info-container flex items-center gap-1'>
            <span>{cardData.user.rate.ratersCounter}</span>
            <div className='w-5'>
              <Icon className='text-primary' name={'star'} />
            </div>
          </div>
        </div>
        <div className='h-[1px] bg-black opacity-15' />
        {cardData?.platforms?.length > 0 && 
          <div className='flex justify-center pt-25 items-center gap-3'>
              {cardData?.platforms.map(platform=>
              <div className='info-container'>
                <span>{platform.name}</span>
              </div>
              )}
          </div>
        }
        {
          user?.profile?.username != cardData?.user?.username ?
          <button onClick={onClick} className="rounded-full border-2 border-solid border-primary w-full h-16 text-primary text-lg font-bold capitalize cursor-pointer">{t("send pitching form")}</button> :
          <button style={{cursor:'not-allowed'}} className="rounded-full border-2 border-solid border-[#677A93] w-full h-16 text-[#677A93] text-lg font-bold capitalize">{t("send pitching form")}</button>
        }
      </div>

    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(ProducerCard);

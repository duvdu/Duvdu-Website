
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
    <div className={`h-min border border-50 border-solid border-gray-300 dark:border-gray-500 p-10 ${className}`}>

        <a target='_blank' href={`/creative/${cardData?.user?.username}`}>
            <div className='flex flex-col items-center justify-center text-center pb-5'>
              <img className='profileImgture-2 m-2 rounded-full w-full h-full border-4 border-white shadow object-cover object-top' src={cardData?.user?.profileImage} alt="profile picture" />
              <div className='flex-2 flex-col items-center justify-center gap-1'>
                <h3 className='opacity-80 text-lg font-bold'>{cardData?.user?.name?.split(' ')[0].length>6?cardData?.user?.name?.split(' ')[0].slice(0,6):cardData?.user?.name?.split(' ')[0]}</h3>
                <span className='flex items-center justify-center opacity-40 gap-1 w-full hidden'>
                  <Icon className='w-3' name='location-dot' />
                  <span className="location">{cardData?.user?.address || 'NONE'}</span>
                </span>
              </div>
            </div>
        </a>
        <div className='flex justify-center pt-25 items-center gap-3'>
        <div className='border rounded-full px-3 py-1 font-bold text-lg' style={getRankStyle(cardData?.user?.rank?.color)}>
            {cardData?.user?.rank?.title || "Unranked"}
          </div>
          <span className='info-container flex gap-1'>
            <span>{cardData?.user?.projectsView}</span> <span>{t("projects")}</span>
          </span>
          <div className='info-container flex items-center gap-1'>
            <span>{cardData.user.rate.ratersCounter}</span>
            <div className='w-5'>
              <Icon className='text-primary' name={'star'} />
            </div>
          </div>
        </div>
        {
          user?.profile?.username != cardData?.user?.username ?
          <button onClick={onClick} className="rounded-full border-2 border-solid border-primary w-full h-16 text-primary text-lg font-bold mt-12 capitalize cursor-pointer">{t("send pitching form")}</button> :
          <button style={{cursor:'not-allowed'}} className="rounded-full border-2 border-solid border-[#677A93] w-full h-16 text-[#677A93] text-lg font-bold mt-12 capitalize">{t("send pitching form")}</button>
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


import React from 'react';
import Icon from '../../Icons';
import { connect } from 'react-redux';
import { Link } from 'react-scroll';


const ProducerCard = ({ cardData, className = "", onClick, user }) => {
  return (
    <>
    <div className={`h-min border border-50 border-solid border-gray-300 p-10 ${className}`}>

        <a target='_blank' href={`/creative/${cardData?.user?.username}`}>
            <div className='flex flex-col items-center justify-center text-center pb-5'>
              <img className='profileImgture-2 m-2 rounded-full w-full h-full border-4 border-white shadow object-cover object-top' src={cardData?.user?.profileImage} alt="profile picture" />
              <div className='flex-2 flex-col items-center justify-center gap-1'>
                <h3 className='opacity-80 text-lg font-bold'>{cardData?.user?.name}</h3>
                <span className='flex items-center justify-center opacity-40 gap-1 w-full hidden'>
                  <Icon className='w-3' name='location-dot' />
                  <span className="location">{cardData?.user?.address || 'NONE'}</span>
                </span>
              </div>
            </div>
        </a>
        <div className='flex justify-center pt-25 items-center gap-3'>
          <div className='Professional-background-decoration px-3 py-1'>
            <span className='Professional-text-decoration font-bold text-lg'>{cardData?.user?.rank?.title || "Unranked"}</span>
          </div>
          <span className='info-container flex gap-1'>
            <span>{cardData?.user?.projectsView}</span> <span>projects</span>
          </span>
          <div className='info-container flex items-center gap-1'>
            <span>{cardData.user.rate.ratersCounter}</span>
            <div className='w-5'>
              <Icon className='text-primary' name={'rate-star'} />
            </div>
          </div>
        </div>
        {
          user?.profile?.username != cardData?.user?.username &&
          <button onClick={onClick} className="rounded-full border-2 border-solid border-primary w-full h-16 text-primary text-lg font-bold mt-12 capitalize">
            send pitching form
          </button>
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

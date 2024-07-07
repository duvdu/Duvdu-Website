import React from 'react';
import Icon from '../../Icons';
import Link from 'next/link';
import { connect } from 'react-redux';

const CopyRightCard = ({ cardData, className = "", onClick, user }) => {
  
  return (
    <div className={`border border-50 border-solid border-gray-300 p-10 ${className}`}>
      <Link href={`/creative/${cardData?.user?.username}`}>
        <div className='flex items-center justify-center text-center pb-5 cursor-pointer'>
          <img
            className='profileImgture-2 m-2 rounded-full w-full h-full border-4 border-white shadow object-cover object-top'
            src={cardData?.user?.profileImage || '/default-profile.png'} // Providing a default image
            alt="profile picture"
          />
          <div className='flex-2 flex-col gap-1'>
            <h3 className='opacity-80 text-lg font-bold text-start'>{cardData?.user?.name || "Unknown User"}</h3>
            <span className='flex items-center justify-start opacity-40'>
              <Icon className='opacity-50 mr-1 w-3' name='location-dot' />
              <span className="location">{cardData?.address || "UNKNOWN"}</span>
            </span>
          </div>
        </div>
      </Link>
      <div className='flex justify-center pt-25 items-center gap-3'>
        <div className='Professional-background-decoration px-3 py-1'>
          <span className='Professional-text-decoration font-bold text-lg'>
            {cardData?.user?.rank?.title || "Unranked"}
          </span>
        </div>
        <span className='info-container flex gap-1'>
          <span>{cardData?.user?.projectsView || 0}</span> <span>projects</span>
        </span>
        <div className='info-container flex justify-between items-center gap-2'>
          <span>{cardData?.user?.rate?.ratersCounter || 0}</span>
          <div className='w-5'>
            <Icon className='text-primary' name={'rate-star'} />
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-7'>
        <div>
          <p className='text-sm capitalize opacity-50 leading-8'>pricing</p>
          <span className='text-5xl font-medium'>{cardData?.price || 0} $</span>
        </div>
        <div className='w-[1px] bg-black opacity-15' />
        <div>
          <p className='text-sm capitalize opacity-50 leading-8'>duration</p>
          <span className='text-5xl font-medium'>{cardData?.duration?.value || 0} Days</span>
        </div>
      </div>

      {user?.profile?.username !== cardData?.user?.username && (
        <button onClick={onClick} className="rounded-full border-2 border-solid border-primary w-full h-16 text-primary text-lg font-bold mt-12 capitalize">
          book
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

// mapDispatchToProps can be removed if not used
// const mapDispatchToProps = {};

export default connect(mapStateToProps)(CopyRightCard);

import React from 'react';
import Icon from '../../Icons';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getRankStyle } from '../../../util/util';
import Selector from "../../elements/CustomSelector";
import EditCopyrights from '../../drawer/edit/editcopyrights';
import { OpenPopUp } from "../../../util/util";
import {DeleteCopyright} from "../../../redux/action/apis/cycles/copywriter/delete";
import DeletePopup from '../../popsup/DeletePopup';

const CopyRightCard = ({ cardData,DeleteCopyright,delete_porject_response, className = "", onClick, user , bookButton=true  , isLogin , QueryString}) => {
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const { t } = useTranslation();
 const price = cardData?.price?.toString()
 const toggleDrawerEdit = () => {
  setIsOpenEdit(!isOpenEdit);
};
 const handleDropdownSelect = (v) => {
  if (v == "Edit") toggleDrawerEdit()
  else if (v == "Delete") OpenPopUp('delete-popup-' + cardData?._id)
};

  return (
    <>
    <DeletePopup onClick={()=> DeleteCopyright(cardData?._id)} respond={delete_porject_response} id={cardData?._id} header={'Delete Copyright'} message={'this copyright?'} />
    <EditCopyrights data={cardData} QueryString={QueryString} isOpen={isOpenEdit}  id={cardData?._id} setIsOpenEdit={setIsOpenEdit} />
    <div className={`border border-50 border-solid border-gray-300 dark:border-opacity-40 p-10 h-full flex flex-col gap-5 justify-between ${className}`}>
        <div className='flex justify-between'>
      <Link href={`/creative/${cardData?.user?.username}`}>
          <div className='flex items-center  text-center cursor-pointer'>
            <img
              className='profileImgture-2 me-2 rounded-full w-full h-full border-4 border-white shadow object-cover object-top'
              src={cardData?.user?.profileImage || '/default-profile.png'} // Providing a default image
              alt="profile picture"
            />

            <div className='flex-2 flex-col gap-1'>
              <h3 className='opacity-80 text-lg font-bold text-start'>{cardData?.user?.name?.split(' ')[0].length>6?cardData?.user?.name?.split(' ')[0].slice(0,6):cardData?.user?.name?.split(' ')[0] || "Unknown User"}</h3>
              <span dir="ltr" className='flex items-start justify-start opacity-40'>
                <div>
                  <Icon className='opacity-50 mr-1 mt-1 w-3' name='location-dot' />
                </div>
                <span className="text-start line-clamp-1">{cardData?.address || "UNKNOWN"}</span>
              </span>
            </div>
          </div>
        </Link>
          {isLogin===true &&  user?.profile?.username === cardData?.user?.username &&
            <Selector
                    options={[
                        {
                            value:"Edit"
                        },
                        ...(cardData?.canEdit ? [{ value: "Delete" }] : [])
                    ]}
                    onSelect={handleDropdownSelect}
                    className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-10 h-10 cursor-pointer"
            />
          }
        </div>
      
      <div className='flex justify-center items-center gap-3'>
        
          <div className='border rounded-full px-3 py-1 font-bold text-lg' style={getRankStyle(cardData?.user?.rank?.color)}>
            {cardData?.user?.rank?.title || "Unranked"}
          </div>
        
        {cardData?.user?.acceptedProjectsCounter > 0 && 
        <span className='info-container flex gap-1'>
          <span>{cardData?.user?.acceptedProjectsCounter}</span> <span>{t("projects")}</span>
        </span>
        }
        <div className='info-container flex justify-between items-center gap-2'>
          <span>{cardData?.user?.rate?.totalRates || t('rising rate')}</span>
          {cardData?.user?.rate?.totalRates >0 &&
          <div className='w-5'>
            <Icon className='text-primary' name={'star'} />
          </div>
          }
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          <p className='text-sm capitalize opacity-50 leading-8'>{t("pricing")}</p>
          <span className='text-3xl lg:text-[2.5rem] font-medium'>{(price?.length>5 ? price.slice(0,5): price)|| 0} {price?.length>5?'':t('egp_currency')}</span>
          {price?.length>5 && 
          <>
          <br/>
          <span className='text-3xl lg:text-[2.5rem] font-medium'>{price.slice(5,-1)} {t('egp_currency')}</span>
          </>}
        </div>
        <div className='w-[1px] bg-black opacity-15' />
        <div>
          <p className='text-sm capitalize opacity-50 leading-8'>{t("duration")}</p>
          <span className='text-3xl lg:text-[2.5rem] font-medium'>{cardData?.duration?.value || 0} Days</span>
        </div>
      </div>
      {bookButton === true && 
      <div className='pt-5'>
      {user?.profile?.username !== cardData?.user?.username  ?
        <button onClick={onClick} className="rounded-full border-2 border-solid border-primary w-full h-16 text-primary text-lg font-bold  capitalize">{t("book now")}</button> :
        <button style={{ cursor: 'not-allowed' }} className="rounded-full border-2 border-solid border-[#677A93] w-full h-16 text-[#677A93] text-lg font-bold capitalize">{t("book now")}</button>
      }
      </div>
      }
    </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  isLogin: state.auth.login,
  delete_porject_response: state.api.DeleteCopyright
});

// mapDispatchToProps can be removed if not used
const mapDispatchToProps = {
  DeleteCopyright

};

export default connect(mapStateToProps,mapDispatchToProps)(CopyRightCard);

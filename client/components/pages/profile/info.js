import { connect } from "react-redux";
import { OpenPopUp, convertToK, getRankStyle } from "../../../util/util";
import Icon from "../../Icons";
import { getUserFollowers } from "../../../redux/action/apis/auth/profile/getFollowerList";
import PopUpImage from "../../elements/popUpImage";
import { useTranslation } from 'react-i18next';

function Info({
    src,
    personalName,
    location,
    rank,
    categories,
    rankcolor,
    occupation,
    rates,
    popularity,
    isboronze = false,
    isMe
}) {
    const { t } = useTranslation();
    const openFollowers = () => {
        OpenPopUp('show-followers')
    }
    return <>
        <div className='flex items-end sm:items-center pb-5'>
            <div className={`w-28 h-28 bg-cover relative p-3 ltr:mr-3 rtl:ml-3 mb-3 bg-no-repeat boronze-frame ${isboronze}`}>
                <img className='w-full h-full rounded-full object-cover object-top' src={src} alt="" />
            </div>
            <div className='flex-1 flex-col gap-1'>
                <span className='text-2xl xl:text-3xl font-bold capitalize line-clamp-1 lg:line-clamp-2'>{personalName}</span>
                <span className='flex items-start'>
                    <div>
                        <Icon className='opacity-50 ltr:mr-2 rtl:ml-2 size-4 mt-1' name='location-dot' />
                    </div>
                    <span className="opacity-50 capitalize text-lg line-clamp-2">{location}</span>
                </span>
            </div>
        </div>
        <div className='flex justify-center pt-25 items-center gap-3'>
            {rank &&
                <p className='rank' style={getRankStyle(rankcolor)}>{t(rank)}</p>
            }
            {occupation &&
                <div className="info-container flex items-center justify-center">
                    <p className="whitespace-nowrap" >{occupation}</p>
                </div>
            }
            <div className='info-container flex justify-between items-center gap-1 w-auto'>
                <p>{rates>0?rates.toFixed(1):t('rising rate')}</p>
                {rates>0 &&<Icon className='text-primary w-4' name={'star'} />}
            </div>
        </div>
        {categories && categories.length>0 &&
        <div className='flex flex-wrap pt-5 items-center justify-center gap-3'>
            {categories.map(item=>
            <div key={item._id} className="info-container flex items-center justify-center">
                <p className="whitespace-nowrap" >{(localStorage.getItem('lang')==='Arabic'? item.title?.ar:item.title?.en)?? item.title}</p>
            </div>
            )}
        </div>
            }
        <div className='flex justify-center pt-7 items-center'>
            <div className='flex justify-center' dir="ltr">
                {Object.entries(popularity).map(([key, value]) => (
                    <div
                        onClick={key === 'followers' && isMe ? openFollowers : null}
                        className={`popularity mr-9 pr-9 last:mr-0 last:pr-0 ${key === 'followers' && isMe ? ' cursor-pointer' : ''}`}
                        key={key}
                    >
                        <p className='number'>{convertToK(value, 0)}</p>
                        <p className='unit'>{t(key)}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
}


export default Info;
import { connect } from "react-redux";
import { OpenPopUp, convertToK } from "../../../util/util";
import Icon from "../../Icons";
import { getUserFollowers } from "../../../redux/action/apis/auth/profile/getFollowerList";

function Info({
    src,
    personalName,
    location,
    rank,
    occupation,
    rates,
    popularity,
    isboronze = false,
    isMe
}) {
    const openFollowers = () => {
        OpenPopUp('show-followers')
    }
    return <>
        <div className='flex items-end sm:items-center pb-5'>
            <div className={`w-28 h-28 bg-cover relative p-3 mr-3 mb-3 bg-no-repeat boronze-frame ${isboronze}`}>
                <img className='w-full h-full rounded-full object-cover object-top' src={src} alt="profile picture" />
            </div>
            <div className='flex-1 flex-col gap-1'>
                <span className='text-3xl font-bold capitalize'>{personalName}</span>
                <span className='flex items-center'>
                    <Icon className='opacity-50 mr-2 w-3' name='location-dot' />
                    <span className="opacity-50 capitalize text-lg">{location}</span>
                </span>
            </div>
        </div>
        <div className='flex justify-center pt-25 items-center gap-3'>
            <p className='rank'>{rank}</p>
            <p className='info-container'>{occupation}</p>
            <div className='info-container flex justify-between items-center gap-1 w-20'>
                <p>{rates}</p>
                <Icon className='text-primary w-4' name={'star'} />
            </div>
        </div>
        <div className='flex justify-center pt-7 items-center'>
            <div className='flex justify-center'>
                {Object.entries(popularity).map(([key, value]) => (
                    <div
                        onClick={key === 'followers' && isMe ? openFollowers : null}
                        className={`popularity mr-9 pr-9 last:mr-0 last:pr-0 ${key === 'followers' && isMe ? ' cursor-pointer' : ''}`}
                        key={key}
                    >
                        <p className='number'>{convertToK(value, 0)}</p>
                        <p className='unit'>{key}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
}


export default Info;
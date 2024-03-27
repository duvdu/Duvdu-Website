
import Button from '../elements/button';
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import Icon from '../Icons'

function PostAlarm() {


    return (
        <>
                <Popup id='alarm' >
                    <div className='flex flex-col justify-center items-center max-w-[828px] px-14'>
                        <Icon name={"triangle-exclamation"} className="text-[#EB1A40] w-20 text-9xl"  type='fas'/>
                        <h1 className='text-3xl opacity-80 font-extrabold capitalize max-w-[400px] text-center'> your post goes against our guidelines </h1>
                        <div className='flex w-full gap-7 border-alarm rounded-3xl mt-12 p-2'>
                            <div className='alarm-img w-24 h-24 border-alarm ' style={{backgroundImage: 'url(/assets/imgs/projects/2.jpeg)'}} />
                            <div className='flex flex-col justify-center'>
                                <span className='text-lg font-bold opacity-80'>Post removed for nudity or sexual activity </span>
                                <span className='text-sm font-bold opacity-50 capitalize'>April 1 at 10:12 am </span>
                            </div>
                        </div>
                        <div className='mt-7 border-alarm w-full h-36 bg-[#EAEEF0] dark:bg-[#18140c] rounded-3xl p-3 overflow-y-scroll'>
                            <div className='h-36'>
                            <h3 className='text-lg opacity-80 font-semibold'> Nudity & Sexual Activity Guidelines</h3>
                            <p className='opacity-80 font-medium overflow-y-scroll'> We know that there are times when people might want to share nude images that are artistic or creative in nature, but for a variety of reasons, we don’t allow nudity on Instagram. This includes photos, videos, and some digitally-created content that show sexual intercourse, genitals, and close-ups of fully-nude buttocks. It also includes some photos of female nipples, but photos in the context of breastfeeding, birth giving and after-birth moments, health-related situations  It also includes some photos of female nipples, but photos in the context of eastfeeding, birth We know that there are times when people might want to share nude images that are artistic or creative in nature, but for a variety of reasons, we don’t allow nudity on Instagram. This includes photos, videos, and some digitally-created content that show sexual intercourse, genitals, and close-ups of fully-nude buttocks. It also includes some photos of female nipples, but photos in the context of</p>
                            </div>
                        </div>
                        <AppButton className={"mt-14 mx-16 md:mx-32 px-20 sm:px-36 w-full max-w-[400px]"} >
                            OK
                        </AppButton>

                    <div className='mb-6'/>
                    </div>
                </Popup>
        </>
    );
}

export default PostAlarm;

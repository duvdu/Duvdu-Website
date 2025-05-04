
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as Types from '../../../redux/constants/actionTypes'
import { SetheaderPopUp } from "../../../redux/action/setting";
import Icon from "../../Icons";
import Link from 'next/link';
import FaceVerification from '../../elements/FaceVerification';
import Subscription from '../../elements/Subscription';

function Profile({ getheaderpopup, api, user, getBoards_respond, fav_respond , SetheaderPopUp }) {

    const { t } = useTranslation();
    const [showMiddleCard, setShowMiddleCard] = useState(true);
    const handleCloseMiddleCard = () => {
        setShowMiddleCard(false);
    };
    const requiredFields = [
        { field: "profileImage", label: "Add Profile Image" },
        { field: "coverImage", label: "Add Cover Image" },
        { field: "address", label: "Add your Address" },
        { field: "isVerified", label: "Is Verified" },
        { field: "about", label: "About" },
        { field: "pricePerHour", label: "Price Per Hour" }
    ]



    const checkField = (obj, path) => {
        const value = path.split('.').reduce((o, p) => o && o[p], obj);
        return value != null && value !== 0; // Consider 0 as false but allow other non-empty values
    };

    // Count completed fields
    const completedCount = requiredFields.filter(field => checkField(user, field.field)).length;
    const totalCount = requiredFields.length;

    // Calculate completion percentage
    const completionPercentage = ((completedCount / totalCount) * 100).toFixed(1);

    // Determine if the user gets a verification badge (assuming 100% completion is needed)
    const hasVerificationBadge = completionPercentage === "100.0";
    const states = requiredFields.map(field => ({
        state: checkField(user, field.field),
        text: field.label
    }));
    const sortedStates = states.sort((a, b) => {
        // Sort true values before false values
        if (a.state && !b.state) {
            return -1; // a comes before b
        } else if (!a.state && b.state) {
            return 1; // b comes before a
        } else {
            return 0; // Leave order unchanged
        }
    });
    const getProjectCovers = (data) => {
        const covers = [];
        data.forEach((item) => {
            // item.projects.slice(0, 1).forEach((project) => {
                covers.push(item.details.cover);
            // });
        });

        return covers;
    };
    const saved = getProjectCovers(fav_respond?.data || [])
    const favCover = getBoards_respond?.data?.length>0 ? (getBoards_respond?.data[0]?.image?getBoards_respond?.data[0].image:'color') : null
    const color = getBoards_respond?.data?.length && getBoards_respond?.data[0]?.color
    useEffect(()=>{
        setShowMiddleCard(false)
    },[hasVerificationBadge])
    const CloseProfile=()=>{
        SetheaderPopUp(Types.NONEPOPUP)
    }
    if (user == null) return <></>
    if (getheaderpopup != Types.SHOWPROFILE) return     
    else
        return (<>
            <div className="cart-dropdown-wrap ltr:right-0 rtl:left-0 account-dropdown active">
                <div className="dialog dialog-2 flex flex-col">
                    <div className="overflow-y-scroll rounded-b-[60px] flex flex-col justify-between w-[320px] gap-3 h-full">
                        <div className="bg-white dark:bg-[#1A2024] border dark:border-[#FFFFFF33] rounded-[45px] overflow-hidden min-h-[242px]">
                            <div className="flex w-full overflow-hidden h-20">
                                <img
                                    className="w-full h-full object-cover bg-gray-300 dark:bg-[#ffffff20]"
                                    src={user.coverImage || process.env.DEFULT_COVER_PATH}
                                    alt="cover"
                                />
                            </div>
                            <div className='p-5'>
                                <div className='flex items-start gap-4 -translate-y-4 h-12'>
                                    <div>
                                    <div className='size-[72px] bg-cover relative bg-no-repeat'>
                                        <img className='w-full h-full rounded-full border-2 bg-gray-300 dark:bg-[#ffffff20] dark:border-[#1A2024] shadow -translate-y-8 object-cover object-top' src={user.profileImage || process.env.DEFULT_COVER_PATH} alt="" />
                                    </div>
                                    </div>
                                    <div className='flex-2 flex-col'>
                                        <span className='text-base font-bold capitalize'>{user.name?.split(' ')[0].length>6?user.name?.split(' ')[0].slice(0,6):user.name?.split(' ')[0]}</span>
                                        <span className='flex items-start gap-1 opacity-40'>
                                            <div>
                                            <Icon className="w-3" name="location-dot" />
                                            </div>
                                            <span className="text-xs font-semibold capitalize">{user.address || 'NONE'}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <Link href={`/creative/${user.username}`} >
                                        <div onClick={CloseProfile} className="flex items-center justify-center py-4 capitalize w-full rounded-full text-center border-2 border-primary cursor-pointer">
                                            <span className="text-primary font-bold text-base">
                                                {t('Access Your Space')}
                                            </span>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <FaceVerification CloseProfile={CloseProfile} />
                        <Subscription CloseProfile={CloseProfile}/>
                        {
                            showMiddleCard &&
                            <div className="p-6 bg-white dark:bg-[#1A2024] rounded-[45px]">
                                <div className="flex gap-3">
                                    <div className="w-full">

                                        <h4 className="opacity-82 font-semibold text-sm mb-2 capitalize">
                                            {t('Complete your Profile')}
                                        </h4>
                                        <div className='flex items-center'>
                                            <div className="flex gap-2 w-full">
                                                <div className="header-progress-bar relative w-full">
                                                    <div className="absolute inset-0 rounded-lg h-full" style={{
                                                        width: `${completionPercentage}%`,
                                                        background: 'linear-gradient(270deg, #711AEB 7.19%, #226BEB 100%)',
                                                        filter: 'blur(10.547093391418457px)'
                                                    }}></div>

                                                    <div className="relative h-full overflow-hidden">
                                                        <div className="absolute inset-0 rounded-lg bg-primary" style={{ width: `${completionPercentage}%` }}></div>
                                                    </div>
                                                </div>
                                                <span className="text-primary font-semibold text-xs right-0 bottom-full whitespace-nowrap">{completionPercentage}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={handleCloseMiddleCard} className='flex justify-center items-center cursor-pointer'>
                                        <div className="rounded-full header-border h-10 w-10 flex items-center justify-center">
                                            <Icon className="size-5" name={'xmark'} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mt-4">
                                    {sortedStates.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {item.state ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="text-[#999999] text-sm font-semibold">
                                                        {t(item.text)}
                                                    </div>
                                                    <Icon name="greenCheck" />
                                                </div>
                                            ) : (
                                                item.text === "Is Verified" ? (
                                                    <Link href={`/register/${auth.username}`} className="no-underline text-sm font-semibold">
                                                        {t(item.text)}
                                                    </Link>
                                                ) : (
                                                    <Link href={`/creative/${user.username}?edit=true`} className="no-underline text-sm font-semibold">
                                                        {t(item.text)}
                                                    </Link>
                                                )
                                            )}
                                            {index !== states.length - 1 && <hr className="border-[#E6E6E6]" />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>}
                        {/* end card  */}
                        <div>
                            <div className="p-3 bg-white dark:bg-[#1A2024] rounded-[45px] mb-2">
                                <h4 className="opacity-70 text-sm font-semibold m-2 flex justify-between">
                                    {t('Your Matches')}
                                    <Link href="/saved"><span className="font-semibold text-primary cursor-pointer" onClick={CloseProfile} >{t('view all')}</span></Link>
                                </h4>
                                <div className="flex justify-between gap-3">
                                    <Link href={`/save/favorites`} >
                                        <div onClick={CloseProfile}  className="aspect-square w-1/2 overflow-hidden cursor-pointer">
                                            {
                                                // favCover ? (favCover!=='color'?<img className='rounded-[30px] h-full w-full object-cover' src={favCover} /> :
                                                //     <div style={{backgroundColor:color}} className={`aspect-square rounded-[30px] w-full flex justify-center items-center cursor-pointer]`}>
                                                //         <Icon className='w-10' name={"dvudu-image"} />
                                                //     </div>
                                                // ):
                                                    // <div className='aspect-square rounded-[30px] w-full flex justify-center items-center bg-[#DADCDE] cursor-pointer'>
                                                    //     <Icon className='w-10' name={"dvudu-image"} />
                                                    // </div>
                                                    <img className='rounded-[30px] h-full w-full object-cover bg-[#E8F1FD] dark:bg-[#1A2024] bg-center bg-no-repeat border-[1px] !border-[#B0C9EB] dark:!border-[#B0C9EB40]' src={'/assets/imgs/Favorite.svg'} />
                                                    // <div className={`w-full rounded-[50px] h-full bg-[#E8F1FD] dark:bg-[#1A2024] bg-center bg-no-repeat border-[2px] !border-[#B0C9EB] dark:!border-[#B0C9EB40]`} style={{ backgroundImage: `url('/assets/imgs/Favorite.svg')`}}></div>
                                                                        
                                            }
                                        </div>
                                    </Link>
                                    <Link href="/saved" >
                                        <div onClick={CloseProfile}  className="aspect-square w-1/2 overflow-hidden cursor-pointer">
                                            {
                                                // saved[0] && false ? <img className='rounded-[30px] h-full object-cover' src={saved[0]} /> :
                                                //     <div className='aspect-square rounded-[30px] w-full flex justify-center items-center bg-[#DADCDE] cursor-pointer'>
                                                //         <Icon className='w-10' name={"dvudu-image"} />
                                                //     </div>
                                                favCover ? (favCover!=='color'?<img className='rounded-[30px] h-full w-full object-cover' src={favCover} /> :
                                                    <div style={{backgroundColor:color}} className={`aspect-square rounded-[30px] w-full flex justify-center items-center cursor-pointer]`}>
                                                        <Icon className='w-10' name={"dvudu-image"} />
                                                    </div>
                                                ):
                                                    <div className='aspect-square rounded-[30px] w-full flex justify-center items-center bg-[#DADCDE] cursor-pointer'>
                                                        <Icon className='w-10' name={"dvudu-image"} />
                                                    </div>

                                            }
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </>
        )
}

const mapStateToProps = (state) => ({
    isDark: state.setting.ISDARK,
    isLogin: state.auth.login,
    getheaderpopup: state.setting.headerpopup,
    api: state.api,
    user: state.user.profile,
    getBoards_respond: state.api.GetBoards,
    fav_respond: state.api.GetFavList,

});
const mapDispatchToProps = {
    SetheaderPopUp,
};


export default connect(mapStateToProps,mapDispatchToProps)(Profile);
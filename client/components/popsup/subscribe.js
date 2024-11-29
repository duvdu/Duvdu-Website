

import Button from '../elements/button';
import Icon from '../Icons'
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import { connect } from "react-redux";
import { subscribe } from './../../redux/action/apis/auth/subscription/subscribe';
import { checkSubscribe } from './../../redux/action/apis/auth/subscription/checkSubscribe';
import React, { useEffect, useState } from "react";
import Loading from '../elements/loading';

function Popup({ isfree = false , isLogin , checkSubscribe , checkSubscribe_response , subscribe_response , subscribe }) {
    const { t } = useTranslation();
    const [canSubscribe , setCanSubscribe ] = useState(false)
    const [haveSubscribe , setHaveSubscribe ] = useState(null)
    function subscriber(){
        subscribe()
    }
 
    useEffect(()=>{
        if(isLogin)
        checkSubscribe()        
    },[isLogin])
    var convertError = JSON.parse(checkSubscribe_response?.error ?? null)

    useEffect(()=>{
        if(checkSubscribe_response?.data)
            setCanSubscribe(true)
        if(checkSubscribe_response?.error){
            setHaveSubscribe(convertError?.data?.avaliableContracts)
            setCanSubscribe(false)
        }
    },[checkSubscribe_response?.data , checkSubscribe_response?.error])
    return (
        <>
        {}
            <div id={`subscribe-${isfree ? 'free' : 'notfree'}`} className="popup z-30 ">
                <div data-popup-dismiss="popup" className="flex overlay blur" ></div>
                <div className='card overflow-hidden bg-[#F7F9FB] dark:bg-[#131313] bg-no-repeat relative sm:w-auto sm:mx-auto w-full mx-5' style={{ backgroundImage: "url(assets/imgs/authswiper/login-3.png)" }}>
                    <div className='flex gap-3 absolute top-5 left-5'>
                        <div data-popup-dismiss="popup" className='flex rounded-full border p-3 border-white border-opacity-50 bg-[#FFFFFF1A] blur-4px cursor-pointer justify-center items-center'>
                            <Icon name={'xmark'} className='w-6 h-6 text-white' />
                        </div>
                    </div>
                    {/* <div className='lg:w-[670px] h-[213px] verify-linear'></div> */}

                    <div className='lg:w-[670px] bg-[#F7F9FB] dark:bg-[#131313] mt-[400px]'>
                        <div className='w-full h-[213px] absolute -translate-y-full verify-linear' />
                         
                        {/* {isfree && canSubscribe ? <StartFree /> : <Subscribe />} */}
                        {!isfree &&  <Subscribe subscribe_response={subscribe_response} subscriber={subscriber} haveSubscribe={haveSubscribe} canSubscribe={canSubscribe}/>}
                    </div>
                        
                </div>
            </div>
        </>
    );
}

const StartFree = () => {
    const { t } = useTranslation();

    return (
        <div className='p-7 flex flex-col justify-center items-center'>
            <div className='max-w-[450px] flex flex-col justify-center items-center'>
                <h1 className='text-primary text-3xl font-extrabold capitalize text-center'>{t("access 5 free contracts")}</h1>
                <p className='opacity-60 text-lg font-semibold mt-3 text-center'>{t("Enjoy 5 contracts for free, and then we have a subscription plan to access more.")}</p>
                <span className='text-primary text-lg capitalize line-through text-center mt-11 mb-4'>
                    $17.99
                    <span className='opacity-70 text-primary'>{t("/for 5 contracts")}</span>
                </span>
                <Button className="w-full mb-7" shadow={true} shadowHeight={"14"}>
                    <span className='text-white font-bold capitalize text-lg'>{t("start free trial")}</span>
                </Button>
            </div>
            <Link href="/terms_conditions">
                <span className="text-DS_black text-sm opacity-50 cursor-pointer" >{t("terms & conditions")}</span>
            </Link>
        </div>

    )
}
const Subscribe = ({canSubscribe , haveSubscribe , subscribe_response , subscriber}) => {  
      const { t } = useTranslation();

    return (
        <div className='p-7 flex flex-col justify-center items-center'>
            <div className='max-w-[450px] flex flex-col justify-center items-center'>
                <h1 className='text-primary text-3xl font-extrabold capitalize text-center'>{t("access 5 free contracts")}</h1>
                <p className='opacity-60 text-lg font-semibold mt-3 text-center'>{t("Enjoy 5 contracts for free, and then we have a subscription plan to access more.")}</p>
                    {canSubscribe ?
                    <span className='text-primary text-lg capitalize text-center mt-11 mb-4'>
                    $17.99
                        <span className='opacity-70 text-primary'>{t("/for 5 contracts")}</span>
                    </span>:
                    <span className='text-primary text-lg capitalize text-center mt-11 mb-4'>
                        <span className='opacity-70 text-primary'>{t('you have available contract')} {haveSubscribe} {t('')}</span>
                    </span>
                    }  
                    {canSubscribe && 
                    <Button className="w-full mb-7" onClick={subscriber} shadow={true} shadowHeight={"14"}>
                        {subscribe_response?.loading?<Loading/>:
                        <span className='text-white font-bold capitalize text-lg'>{t("subscribe now")}</span>
                         }
                    </Button>
                    }
            </div>
            <Link href="/terms_conditions">
                <span className="text-DS_black text-sm opacity-50 cursor-pointer" >{t("terms & conditions")}</span>
            </Link>
        </div>

    )
}

const mapStateToProps = (state) => ({
    subscribe_response: state.api.subscribe,
    checkSubscribe_response: state.api.checkSubscribe,
    isLogin: state.auth.login,
});

const mapDispatchToProps = {
    subscribe,
    checkSubscribe,
};
export default connect(mapStateToProps, mapDispatchToProps)(Popup);


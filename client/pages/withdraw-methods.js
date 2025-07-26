
import Layout from '../components/layout/Layout';
import React from 'react';
import { connect } from "react-redux";
import { useRouter } from "next/router";
import AppButton from '../components/elements/button';
import Icon from '../components/Icons';
import CreateNewMethod from '../components/popsup/createnewMethod';
import { CreateWithdrawMethod } from '../redux/action/apis/withdraw-methods/create';
import { GetWithdrawMethods } from '../redux/action/apis/withdraw-methods/get';
import WithdrawMethodDetails from '../components/popsup/withdrawMethodDetails';
import { OpenPopUp } from '../util/util';
import { useTranslation } from 'react-i18next';

function Wallets({isLogin , CreateMethod_respond ,CreateWithdrawMethod , GetWithdrawMethods , GetMethods_respond }) {
    const [item, setItem] = React.useState(null)
    const { t } = useTranslation();
    const route = useRouter()
    React.useEffect(()=>{
        if(isLogin === false)
            route.push('/')
    },[isLogin])
    React.useEffect(()=>{
        GetWithdrawMethods()
    },[])
    const handleOpenPopup = (item)=>{
        setItem(item)
        OpenPopUp('withdraw-method-details')
    }
    return (
        <>
            <WithdrawMethodDetails item={item}/>
            <CreateNewMethod respond={CreateMethod_respond} onSbmit={(v) => CreateWithdrawMethod(v)} />
            <Layout shortheader={true}>
                <div className='container flex items-center justify-center w-full h-[90vh] py-10 md:py-16 md:px-16'>
                    <div className=' w-full h-full rounded-2xl px-5 md:px-10 py-8 md:py-16 border border-[#CFCFCF] md:max-w-[70%]'>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='flex flex-col gap-2 h-[70%]'>
                                <h3 className='text-xl'>{t('Active method')}</h3>
                                <div className='flex flex-col gap-2 h-full overflow-auto'>
                                    {GetMethods_respond?.loading?
                                    <div className='h-full flex item-center justify-center'>
                                        <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-primary rounded-full m-2 mx-auto" />
                                    </div>
                                    :GetMethods_respond?.data?.map((item,i)=>
                                        <div onClick={()=> handleOpenPopup(item)} className={`border border-[2px] ${item.default?'border-primary':''} cursor-pointer rounded-xl flex items-center justify-between p-4`}>
                                            <div className='flex gap-2 items-center'>
                                                <div>
                                                    <svg width="36" height="25" viewBox="0 0 36 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect y="0.5" width="36" height="24" rx="2" fill={`${item.default?'#1c72ea':'#B0B0B0'}`}/>
                                                        <rect opacity="0.4" x="23" y="4.5" width="8" height="6" fill="black"/>
                                                        <rect opacity="0.4" x="3" y="16.5" width="6" height="4" fill="white"/>
                                                        <rect opacity="0.4" x="11" y="16.5" width="6" height="4" fill="white"/>
                                                        <rect opacity="0.4" x="19" y="16.5" width="6" height="4" fill="white"/>
                                                        <rect opacity="0.4" x="27" y="16.5" width="6" height="4" fill="white"/>
                                                    </svg>
                                                </div>
                                                <div className='flex flex-col '>
                                                    <p className={`text-sm text-primary text-${item.default?'primary':'[#868E96]'}`}>{item.name}</p>
                                                    <div className='flex gap-1'>
                                                        {/* <p className='text-sm'>Savings</p> */}
                                                        <p className='text-sm'>{item.number}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div><Icon name={"angle-right"} className={"mr-2 w-2"} /></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <AppButton data-popup-toggle="popup" data-popup-target='create-new-method' className='w-full'>
                            {t("new method")}
                            </AppButton>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}


const mapStateToProps = (state) => ({
    isLogin: state.auth.login,
    CreateMethod_respond: state.api.CreateWithdrawMethod,
    GetMethods_respond: state.api.GetWithdrawMethods
});
const mapDispatchToProps = {
    CreateWithdrawMethod,
    GetWithdrawMethods,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);

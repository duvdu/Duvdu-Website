import React, { useEffect, useState } from 'react';
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';
import CustomSwitch from '../elements/switcher';
import ErrorMessage from '../elements/ErrorMessage';
import { DeleteWithdrawMethod } from '../../redux/action/apis/withdraw-methods/delete';
import { connect } from 'react-redux';
import { makeWithdrawMethodAsDefault } from '../../redux/action/apis/withdraw-methods/makeAsDefault';
import { ClosePopUp } from '../../util/util';
import { GetWithdrawMethods } from '../../redux/action/apis/withdraw-methods/get';

function WithdrawMethodDetails({ item ,GetWithdrawMethods, DeleteWithdrawMethod , DeleteWithdrawMethod_respond , makeWithdrawMethodAsDefault_respond , makeWithdrawMethodAsDefault }) {
  const { t } = useTranslation(); 
  const [error, setError] = useState('')
  const handleMakeAsDefault = () => {
    makeWithdrawMethodAsDefault(item?._id)
  };
  const handleRemove = () =>{
    DeleteWithdrawMethod(item?._id)
  }
  useEffect(()=>{
    if(DeleteWithdrawMethod_respond?.error){
      setError(JSON.parse(DeleteWithdrawMethod_respond?.error)?.data?.errors[0]?.message)
      setTimeout(()=>{
      setError('')
    },3000)
    }
  },[DeleteWithdrawMethod_respond?.error])
  useEffect(()=>{
    if(DeleteWithdrawMethod_respond?.message==='success' || makeWithdrawMethodAsDefault_respond?.message==='success'){
      ClosePopUp('withdraw-method-details')
      GetWithdrawMethods()
      DeleteWithdrawMethod(null)
      makeWithdrawMethodAsDefault(null)
    }
  },[DeleteWithdrawMethod_respond , makeWithdrawMethodAsDefault_respond])
  return (
    <Popup id="withdraw-method-details" header="method details">
      <div className="mt-10 w-full md:w-96">
        <div className='flex flex-col gap-5 mb-20'>
          {item?.methType && <div>
              <h2 className='opacity-60 capitalize mb-1'>{t("method type")}</h2>
              <span className='font-semibold capitalize max-w-[543px]'>
              {item?.method}
              </span>
          </div>}
          {item?.name && 
          <div>
              <h2 className='opacity-60 capitalize mb-1'>{t("name")}</h2>
              <span className='font-semibold capitalize max-w-[543px]'>
              {item?.name}
              </span>
          </div>
          }
          {item?.number && 
          <div>
              <h2 className='opacity-60 capitalize mb-1'>{t("number")}</h2>
              <span className='font-semibold capitalize max-w-[543px]'>
              {item?.number}
              </span>
          </div>
          }
          <div>
              <h2 className='opacity-60 capitalize mb-1'>{t("default status")}</h2>
              <span className='font-semibold capitalize max-w-[543px]'>
              {item?.default?'default':'not default'}
              </span>
          </div>

        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-center'>
            <ErrorMessage ErrorMsg={error}/>
          </div>
          {!item?.default && 
          <AppButton onClick={handleMakeAsDefault} className="w-full">
            {makeWithdrawMethodAsDefault_respond?.loading ? (
              <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />
            ) : (
              t('make as default')
            )}
          </AppButton>
          }
          <AppButton color={'bg-[#D30000]'} onClick={handleRemove} className="w-full">
            {DeleteWithdrawMethod_respond?.loading ? (
              <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />
            ) : (
              t('remove')
            )}
          </AppButton>
        </div>
      </div>
    </Popup>
  );
}
const mapStateToProps = (state) => ({
  isLogin: state.auth.login,
  DeleteWithdrawMethod_respond: state.api.DeleteWithdrawMethod,
  makeWithdrawMethodAsDefault_respond: state.api.makeWithdrawMethodAsDefault
});
const mapDispatchToProps = {
  DeleteWithdrawMethod,
  makeWithdrawMethodAsDefault,
  GetWithdrawMethods
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawMethodDetails);


import React, { useEffect, useState } from 'react';
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';
import CustomSwitch from '../elements/switcher';
import ErrorMessage from '../elements/ErrorMessage';
import { GetWithdrawMethods } from '../../redux/action/apis/withdraw-methods/get';
import { connect } from 'react-redux';
import { ClosePopUp } from '../../util/util';
import * as withdrawal_methods from '../../util/withdrawal_methods.json'
function CreateNewMethod({ onSbmit, respond ,GetWithdrawMethods }) {
  const { t } = useTranslation();
  const wallets = withdrawal_methods.wallets;
  const banks = withdrawal_methods.banks;
  const [methodType, setMethodType] = useState('wallet');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [ErrorMsg, setErrorMsg] = useState({});
  const egyptianPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  const handleSubmit = () => {
      if(number){
        if(methodType==='wallet'){
            if(!egyptianPhoneRegex.test(number))
                return setErrorMsg((e)=>({
                    ...e,
                    number: 'number must be Egyptian phone number'
                }))    
        }
        if(methodType==='bank'){
            if(number.length < 15)
                return setErrorMsg((e)=>({
                    ...e,
                    number: 'number must be bank account number'
                }))    
        }
      }
      if(!name || ! number){
        if(!name){
            setErrorMsg((e)=>({
                ...e,
                name: 'name is required'
            }))
        }
        if(!number){
            setErrorMsg((e)=>({
                ...e,
                number: 'number is required'
            }))
        }
        return
    }
    const data = {
        method:methodType,
        name,
        number,
        default:isDefault
    }
    onSbmit?.(data);
  };
  useEffect(()=>{
    if(name){
        setErrorMsg((e)=>({
          ...e,
          name:''  
        }))
    }
    if(number){
        setErrorMsg((e)=>({
          ...e,
          number:''  
        }))
    }
  },[name,number])
  React.useEffect(()=>{
    if(respond?.message === 'success'){
        setName('')
        setNumber('')
        setMethodType('wallet')
        setIsDefault(true)
        ClosePopUp("create-new-method")
        GetWithdrawMethods()
    }
},[respond])

  return (
    <Popup id="create-new-method" header="Create withdraw method">
      <div className="mt-10 w-full md:w-96">
        <div className="mb-6">
          <p className="text-sm mb-2 ">{t('Select method type')}</p>
          <div className=" gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="method"
                value="wallet"
                checked={methodType === 'wallet'}
                onChange={() => setMethodType('wallet')}
              />
              <span className="">{t('wallet')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="method"
                value="bank"
                checked={methodType === 'bank'}
                onChange={() => setMethodType('bank')}
              />
              <span className="">{t("bank account")}</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder={t('Name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="app-field mt-2"
          />
        <ErrorMessage ErrorMsg={ErrorMsg.name}/>
        </div>

        <div className="mb-6">
          <input
            type="number"
            placeholder={t('Number')}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="app-field mt-2"
          />
          <ErrorMessage ErrorMsg={ErrorMsg.number}/>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <CustomSwitch value={isDefault} onSwitchChange={(checked) => setIsDefault(!checked)} />
            <span className="">{t('Set as default withdrawal method')}</span>
          </label>
        </div>

        <AppButton onClick={handleSubmit} className="w-full">
          {respond?.loading ? (
            <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-white rounded-full m-2 mx-auto" />
          ) : (
            t('Create withdraw method')
          )}
        </AppButton>
      </div>
    </Popup>
  );
}

const mapStateToProps = (state) => ({
  isLogin: state.auth.login,
});
const mapDispatchToProps = {
  GetWithdrawMethods,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewMethod);


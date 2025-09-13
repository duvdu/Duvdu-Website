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
  const { t  , i18n } = useTranslation();
  const {wallets , banks} = withdrawal_methods;
  const [methodType, setMethodType] = useState('wallet');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [iban, setIban] = useState('');
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
            if(!number)
                return setErrorMsg((e)=>({
                    ...e,
                    number: 'number is required'
                }))    
            if(!iban)
                return setErrorMsg((e)=>({
                    ...e,
                    iban: 'IBAN is required'
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
    if(methodType === 'bank'){
        data.iban = iban
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
        setIban('')
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
          <select
            placeholder={t(methodType === 'wallet' ? 'Wallet Name' : 'Bank Account Name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="app-field mt-2"
          >
            <option value="">{t(methodType === 'wallet' ? 'Wallet Name' : 'Bank Account Name')}</option>
            {methodType === 'wallet' ? wallets.map((wallet) => (
              <option key={wallet} value={wallet}>{i18n.language == "Arabic" ? wallet.split('| ')[1] : wallet.split('| ')[0]}</option>
            )) : banks.map((bank) => (
              <option key={bank} value={bank}>{i18n.language == "Arabic" ? bank.split('| ')[1] : bank.split(' |')[0]}</option>
            ))}
          </select>
        <ErrorMessage ErrorMsg={ErrorMsg.name}/>
        </div>

        <div className="mb-6">
          <input
            type="number"
            placeholder={t(methodType === 'wallet' ? 'Wallet Number' : 'Bank Account Number')}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="app-field mt-2"
          />
          <ErrorMessage ErrorMsg={ErrorMsg.number}/>
        </div>
        {methodType === 'bank' && (
        <div className="mb-6">
          <input
            type="number"
            placeholder={t('IBAN')}
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className="app-field mt-2"
          />
            <ErrorMessage ErrorMsg={ErrorMsg.iban}/>
          </div>
        )}
            
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



import Popup from '../elements/popup';
import AppButton from '../elements/button';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import AddAttachment from '../elements/attachment';
import { resetForm, UpdateFormData } from '../../redux/action/logic/forms/Addproject';
import DuvduError from '../elements/duvduError';
import DuvduLoading from '../elements/duvduLoading';
import Loading from '../elements/loading';
import { ClosePopUp, UpdateKeysAndValues } from '../../util/util';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../elements/ErrorMessage';
import { contractCancel } from '../../redux/action/apis/contracts/askForCancel';
import SuccessfullyPosting from "../popsup/post_successfully_posting";

function AskForCancel({ data, UpdateFormData, resetForm, formData, contract_cancel_respond ,contractCancel}) {
    const { t } = useTranslation();
    const [post_success, setPost_success] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };
    const handlereset = () => {
        resetForm()
    };
    useEffect(() => {
        if (contract_cancel_respond?.message==='success')
            setPost_success(true)
    }, [contract_cancel_respond?.message])
    const validateRequiredFields = () => {
        const errors = {};
        if (!formData.cancelReason) errors.cancelReason = 'Reason is required';
        return errors;
    };
    function onsubmit() {
        const myData ={
            contract:data._id,
            cancelReason: formData.cancelReason
        }
        contractCancel({ data: myData })
    }
    function OnSucess() {
        setPost_success(false)
        resetForm()
        ClosePopUp("ask-for-cancel")
    }

    var convertError = JSON.parse(contract_cancel_respond?.error ?? null)
    const isEnable = Object.keys(validateRequiredFields()).length == 0
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Canceling" />
            <Popup id='ask-for-cancel' className={'w-full lg:w-[942px] '} header={'Ask For Cancel'} onCancel={handlereset}>
                <section className='mt-6'>
                    <span className='font-medium text-lg'>{t("Reason")}</span>
                    <textarea name='cancelReason' value={formData.cancelReason || ""} onChange={handleInputChange} placeholder={t("Reason")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-5 h-20" />
                </section>
                <DuvduError req={"contractCancel"} />
                <DuvduLoading loadingIn={"contractCancel"} />
                <ErrorMessage ErrorMsg={convertError?.data?.errors[0]?.message}/>
                <div className='flex justify-center w-full '>
                    <AppButton onClick={onsubmit} className={'mt-9 mb-3 w-full'} color={"#D30000"} isEnabled={isEnable}>
                    {contract_cancel_respond?.loading ?<Loading/>:t("Cancel")}</AppButton>
                </div>
            </Popup>
        </>
    );
}
const mapStateToProps = (state) => ({
    contract_cancel_respond: state.api.contractCancel,
    formData: state.addproject.formData
});

const mapDispatchToProps = {
    UpdateFormData,
    contractCancel,
    resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(AskForCancel);
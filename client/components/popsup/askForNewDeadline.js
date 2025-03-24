
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
import { contractNewDeadline } from '../../redux/action/apis/contracts/askForNewDeadline';
import SuccessfullyPosting from "./post_successfully_posting";
import SelectDate from "../elements/selectDate";

function AskForNewDeadline({ data,type, UpdateFormData, resetForm, formData, respond ,contractNewDeadline}) {
    const { t } = useTranslation();
    const [post_success, setPost_success] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };
    const handlereset = () => {
        resetForm()
    };
    useEffect(() => {
        if (respond?.message==='success')
            setPost_success(true)
    }, [respond?.message])
    let dates = formData?.timeDate?.split(':');
    let date = new Date(formData.startDate);
    const validateRequiredFields = () => {
        const errors = {};
        if (!formData.startDate) errors.startDate = 'Start date is required';
        if (!formData.timeDate) errors.timeDate = 'Time date is required';
        return errors;
    };

    function onsubmit() {
        let [datePart, _] = formData.startDate.split('T');

        let newDate = `${datePart}T${formData.timeDate}:00.000Z`;
        contractNewDeadline({ data: {deadline:newDate} ,id:data._id  , type: type})
    }
    function OnSucess() {
        setPost_success(false)
        resetForm()
        ClosePopUp("ask-for-new-deadline")
    }

    var convertError = JSON.parse(respond?.error ?? null)
    const isEnable = Object.keys(validateRequiredFields()).length == 0
    console.log(validateRequiredFields())
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Canceling" />
            <Popup id='ask-for-new-deadline' className={'w-full lg:w-[942px] '} header={'new deadline'} onCancel={handlereset}>
                <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">{t("select deadline date")}</h3>
                        <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                        {/* <ErrorMessage ErrorMsg={validateRequiredFields()?.startDate}/> */}
                        <div className='flex items-center justify-center w-full mt-2'>
                            <input type='time' name="timeDate" value={formData.timeDate || ""} onChange={handleInputChange} className="bg-[#9999991A] rounded-full border-black border-opacity-10 px-5 py-5 w-1/2 text-[25px]"/>
                        </div>
                        {/* <ErrorMessage ErrorMsg={validateRequiredFields()?.timeDate}/> */}
                    </section>
                <DuvduError req={"contractNewDeadline"} />
                <DuvduLoading loadingIn={"contractNewDeadline"} />
                <ErrorMessage ErrorMsg={convertError?.data?.errors[0]?.message}/>
                <div className='flex justify-center w-full '>
                    <AppButton onClick={onsubmit} className={'mt-9 mb-3 w-full'} color={"#D30000"} isEnabled={isEnable}>
                    {respond?.loading ?<Loading/>:t("Submit")}</AppButton>
                </div>
            </Popup>
        </>
    );
}
const mapStateToProps = (state) => ({
    respond: state.api.contractNewDeadline,
    formData: state.addproject.formData
});

const mapDispatchToProps = {
    UpdateFormData,
    contractNewDeadline,
    resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(AskForNewDeadline);
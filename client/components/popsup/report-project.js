
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import AddAttachment from '../elements/attachment';
import { resetForm, UpdateFormData } from '../../redux/action/logic/forms/Addproject';
import DuvduError from '../elements/duvduError';
import DuvduLoading from '../elements/duvduLoading';
import { projectReport } from '../../redux/action/apis/report/project';
import { ClosePopUp, UpdateKeysAndValues } from '../../util/util';

function ReportProject({ data, UpdateFormData,resetForm, formData, projectReport ,report_respond}) {

    const [attachmentValidation, setAttachmentValidation] = useState(false);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };
    const validateRequiredFields = () => {
        const errors = {};

        if (!attachmentValidation) errors.attachments = 'Attachment not valid';
        if ((formData.desc?.length || 0) < 11) errors.desc = 'Description must be between 10 and 100 characters';

        return errors;
    };
    const handlereset = () => {
        resetForm()
    };
    function onsubmit() {

        const form = new FormData()
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['attachments'])
        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i];
                form.append(`attachments`, file.file);
            }
        form.append('project' , data._id)
        projectReport({data:form})
    }
    
    useEffect(()=>{
        if(report_respond?.data?.createdAt) 
            ClosePopUp("report-project2")
    },[report_respond?.data?.createdAt])

    const isEnable = Object.keys(validateRequiredFields()).length == 0
    return (
        <>
            <Popup id='report-project2' className={'w-full lg:w-[942px] h-fu'} header={'Report Project'} onCancel={handlereset}>
                <section className='mt-6'>
                    <span className='font-semibold text-2xl capitalize'>what happened ?</span>
                    <br />
                    <span className='font-medium text-lg'>Why did you reject the final project ?</span>
                    <textarea name='desc' value={formData.desc || ""} onChange={handleInputChange} placeholder="Start typing..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-5 h-20" />
                </section>
                <section className="w-full ">
                    <h3 className="capitalize opacity-60">attachments</h3>
                    <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                </section>
                <DuvduError req={"projectReport"} />
                <DuvduLoading loadingIn={"projectReport"} />
                <div className='flex justify-center w-full '>
                    <AppButton onClick={onsubmit} className={'mt-9 mb-3 w-full'} color={"#D30000"} isEnabled={isEnable}>
                        Send Report
                    </AppButton>
                </div>
            </Popup>
        </>
    );
}
const mapStateToProps = (state) => ({
    report_respond: state.api.projectReport,
    formData: state.addproject.formData
});

const mapDispatchToProps = {
    UpdateFormData,
    projectReport,
    resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProject);
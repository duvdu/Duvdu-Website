
import Popup from '../../elements/popup';
import Icon from '../../Icons';
import React, { useEffect, useRef, useState } from "react";
import ArrowBtn from '../../elements/arrowBtn';
import { OpenPopUp, UpdateKeysAndValues, handleFileUpload, } from '../../../util/util';
import { useTranslation } from 'react-i18next';

import AddAttachment from '../../elements/attachment';
import AddCoverPhoto from '../../elements/AddCoverPhoto';
import { connect } from 'react-redux';
import { UpdateFormData, resetForm } from '../../../redux/action/logic/forms/Addproject';
import CategoryMultiSelection from '../../elements/CategoryMultiSelection';
import SelectDate from '../../elements/selectDate';
import { CreateTeamProject } from '../../../redux/action/apis/teamproject/create';
import GoogleMap from '../../elements/googleMap';
import { useRouter } from 'next/router';

function CreateTeam({ UpdateFormData, addprojectState, CreateTeamProject, create_respond, resetForm }) {
    const { t } = useTranslation();
    const formData = addprojectState.formData
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const router = useRouter();
    const elementRef = useRef(null);

    const validateRequiredFields = () => {
        const errors = {};
        if (!formData.cover) errors.cover = 'cover is required';
        if (!formData.category?.length) errors.category = 'category is required';
        // if (!formData.attachments?.length) errors.attachments = 'attachment is required';
        if (!formData.title) errors.title = 'title is required';
        if ((formData.desc?.length||0) < 6) errors.desc = 'description is required';
        if (!formData.address) errors.address = 'address is required';
        if (!formData.location?.lat || !formData.location?.lng) errors.location = 'Location is required';
        // if (!formData.shootingDays) errors.shootingDays = 'shootingDays is required';
        // if (!formData.budget) errors.budget = 'budget is required';
        // if (!formData.startDate) errors.startDate = 'startDate is required';
        
        return errors;
    };
    const isEnable = Object.keys(validateRequiredFields()).length == 0
    useEffect(() => {
        if (create_respond?.data) {
            OpenPopUp("successfully-create-team")
        }
    }, [create_respond])


     useEffect(() => {
        // GetTeamProject()
        const element = document.getElementById('team_uploading_files');
        if (router.query.add) {
            if (element) {
                element.classList.add('show');
                setIsPopupVisible(true)
            }
        }
        else {
            if (element) {
                element.classList.remove('show');
                setIsPopupVisible(false)
            }
        }
    }, [router.query.add])
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value)
    };

    const handleCancel = () => {
        router.push({
            pathname: "/teams",
        });
        resetForm()
    };
        const onsubmit = () => {
            const form = new FormData()
    
            formData?.category?.forEach((creative, index) => {
                const categoryKey = `creatives[${index}][category]`;
                form.append(categoryKey, creative);
            });
    
    
            form.append('cover', formData?.cover)
            UpdateKeysAndValues(formData, (key, value) => form.append(key, value), [ 'category'])
            CreateTeamProject(form)
            handleCancel()
        }
    
        // router.push({
        //     pathname: "/addteams",
        // });

    return (
        <>
            <Popup id='team_uploading_files' className='' addWhiteShadow={true} header={'Create New Team'} onCancel={handleCancel} ref={elementRef}>
            {
                isPopupVisible &&
                <div className='lg:w-[600px]'>
                    <section>
                        <AddCoverPhoto UpdateFormData={UpdateFormData} formData={formData} />
                    </section>
                    <section>
                        <h3 className='opacity-60 font-medium my-2 text-lg'>{t("Select Categories")}</h3>
                        <CategoryMultiSelection onChange={(v) => { UpdateFormData('category', v) }} />
                    </section>
                    {/* <section className="w-full mt-11">
                        <h3 className="capitalize opacity-60">{t("upload alike project")}</h3>
                        <AddAttachment name="attachments" value={formData.attachments} onChange={handleInputChange} formData={formData} />
                    </section> */}
                    <section>
                        <p className="capitalize opacity-60 mt-11">{t("team name")}</p>
                        <input onChange={handleInputChange} name='title' placeholder={t("Team Name")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-full mt-4 p-4" />
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">{t("project details")}</p>
                        <textarea onChange={handleInputChange} name='desc' placeholder={t("requirements, conditions")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <div className="py-10">
                        <section>
                            <span className="capitalize opacity-50">{t("location")}</span>
                            <div className="capitalize mt-4">
                                <section className="h-52 relative rounded-3xl overflow-hidden">
                                    <GoogleMap  width={'100%'} value={{ 'lat': formData?.location?.lat, 'lng': formData?.location?.lng }} onChangeAddress={handleInputChange} onsetLocation={(value) => UpdateFormData('location', value)} />
                                </section>
                            </div>
                        </section>
                    </div>
                    {/* <section>
                        <p className="capitalize opacity-60 mt-11">{t("shooting days")}</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type="number" min={0} onChange={handleInputChange} name='shootingDays' placeholder={t("Ex. 5 days")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                        </div>
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">{t("budget")}</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type="number" min={0} onChange={handleInputChange} name='budget' placeholder={t("Ex. 10$")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />

                        </div>
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">{t("appointment Date")}</h3>
                        <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                    </section>*/}

                    <section className="sticky bottom-5 z-10">
                        <div className="flex justify-center">
                            <ArrowBtn onClick={isEnable?onsubmit:null} className="cursor-pointer w-full sm:w-96 z-10" text='Continue' isEnable={isEnable} />
                        </div>
                    </section>
                </div>}

            </Popup>
        </>
    );
}

const mapStateToProps = (state) => ({
    get_respond: state.api.GetTeamProjects,
    create_respond: state.api.CreateTeamProject,
    addprojectState: state.addproject,

});

const mapDispatchToProps = {
    UpdateFormData,
    CreateTeamProject,
    resetForm
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);


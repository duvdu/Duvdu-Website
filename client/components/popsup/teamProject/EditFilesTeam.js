
import Popup from '../../elements/popup';
import Icon from '../../Icons';
import React, { useEffect, useRef, useState } from "react";
import ArrowBtn from '../../elements/arrowBtn';
import { UpdateKeysAndValues, handleFileUpload } from '../../../util/util';
import AddAttachment from '../../elements/attachment';
import AddCoverPhoto from '../../elements/AddCoverPhoto';
import { connect } from 'react-redux';
import { UpdateFormData, resetForm } from '../../../redux/action/logic/forms/Addproject';
import CategoryMultiSelection from '../../elements/CategoryMultiSelection';
import SelectDate from '../../elements/selectDate';
import GoogleMap from '../../elements/googleMap';
import { useRouter } from 'next/router';
import { UpdateTeamProject } from '../../../redux/action/apis/teamproject/update';
import { GetTeamProject } from '../../../redux/action/apis/teamproject/getone';
import { GetTeamProjects } from '../../../redux/action/apis/teamproject/get';

function EditTeam({ UpdateFormData, addprojectState, GetTeamProject, UpdateTeamProject, update_respond, get_respond, resetForm,GetTeamProjects }) {
    const formData = addprojectState.formData
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [cover, setCover] = useState(null);

    const router = useRouter();
    const elementRef = useRef(null);

    useEffect(() => {
        if (router.query.edit)
            GetTeamProject({ id: router.query.edit })
    }, [router.query.edit])

    useEffect(() => {
        const element = document.getElementById('edit_team_uploading_files');
        if (router.query.edit) {
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
    }, [router.query.edit])

    useEffect(() => {
        if(get_respond?.data){
            UpdateFormData("title", get_respond?.data.title)
            UpdateFormData("desc", get_respond?.data.desc)
            UpdateFormData("address", get_respond?.data.address)
            UpdateFormData("shootingDays", String(get_respond?.data.shootingDays))
            UpdateFormData("budget", String(get_respond?.data.budget))
            UpdateFormData("startDate", get_respond?.data.startDate)
            setCover(get_respond?.data.cover)

        }
        
    }, [get_respond])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
        if(formData.cover)
            form.append('cover', formData.cover)
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value))
        UpdateTeamProject(form,router.query.edit)
    }

    return (
        <>
            <Popup id='edit_team_uploading_files' className='w-full lg:w-[600px] flex flex-col gap-9' addWhiteShadow={true} header={'upload files'} onCancel={handleCancel} ref={elementRef}>
                {
                    isPopupVisible &&
                    <div className='lg:w-[600px]'>
                        <section>
                            <AddCoverPhoto UpdateFormData={UpdateFormData} formData={formData} initalValue={cover}/>
                        </section>
                        <section>
                            <p className="capitalize opacity-60 mt-11">team name</p>
                            <input onChange={handleInputChange} value={formData.title|| ""} name='title' placeholder="enter platform..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-full mt-4 p-4" />
                        </section>
                        <section>
                            <p className="capitalize opacity-60 mt-11">project details</p>
                            <textarea onChange={handleInputChange} value={formData.desc} name='desc' placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                        </section>
                        <section>
                            <div className='mt-11 w-full'>
                                <p className="capitalize opacity-60 mt-11">address</p>
                                <input
                                    type='text'
                                    name='address'
                                    value={formData.address|| ""}
                                    onChange={handleInputChange}
                                    className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-full mt-4 p-4"
                                />
                            </div>
                        </section>
                        <div className="py-10">
                            <section>
                                <span className="capitalize opacity-50">location</span>
                                <div className="capitalize mt-4">
                                    <section className="h-52 relative rounded-3xl overflow-hidden">
                                        <GoogleMap width={'100%'} value={{ 'lat': formData?.location?.lat, 'lng': formData?.location?.lng }} />
                                    </section>
                                </div>
                            </section>
                        </div>
                        <section>
                            <p className="capitalize opacity-60 mt-11">shooting days</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type='number'
                                    value={formData.shootingDays|| ""}
                                    onChange={handleInputChange} name='shootingDays' placeholder="Ex. 5 days" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                            </div>
                        </section>
                        <section>
                            <p className="capitalize opacity-60 mt-11">budget</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type='number' 
                                    value={formData.budget|| ""}

                                onChange={handleInputChange} name='budget' placeholder="Ex. 10$" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />

                            </div>
                        </section>
                        <section className="my-11">
                            <h3 className="capitalize opacity-60 mb-4">appointment Date</h3>
                            <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                        </section>

                        <section className="sticky bottom-5 z-10">
                            <div className="flex justify-center">
                                <ArrowBtn onClick={onsubmit} className="cursor-pointer w-full sm:w-96 z-10" text='Save' isEnable={true} />
                            </div>
                        </section>
                    </div>}

            </Popup>
        </>
    );
}

const mapStateToProps = (state) => ({
    get_respond: state.api.GetTeamProject,
    update_respond: state.api.UpdateTeamProject,
    addprojectState: state.addproject,

});

const mapDispatchToProps = {
    UpdateFormData,
    UpdateTeamProject,
    GetTeamProject,
    GetTeamProjects,
    resetForm,

};
export default connect(mapStateToProps, mapDispatchToProps)(EditTeam);


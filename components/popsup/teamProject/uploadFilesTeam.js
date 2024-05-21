
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
import { CreateTeamProject } from '../../../redux/action/apis/teamproject/create';
import GoogleMap from '../../elements/googleMap';
import { useRouter } from 'next/router';

function CreateTeam({ UpdateFormData, addprojectState, CreateTeamProject, create_respond, resetForm }) {
    const formData = addprojectState.formData
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const router = useRouter();
    const elementRef = useRef(null);

    // useEffect(() => {
    // //    console.log(create_respond)
    // }, [create_respond])
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
        UpdateFormData(name, value)
    };

    const handleCancel = () => {
        router.push({
            pathname: "/teams",
        });
        resetForm()
    };
    const onsubmit = () => {
        console.log(formData)
        router.push({
            pathname: "/addteams",
        });
        // UpdateFormData('attachments', formData?.attachment?.map((e)=> e.file))
        // const form = new FormData()
        // UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['receiver'])
    }

    return (
        <>
            <Popup id='team_uploading_files' className='w-full lg:w-[600px] flex flex-col gap-9' addWhiteShadow={true} header={'upload files'} onCancel={handleCancel} ref={elementRef}>

            {
                isPopupVisible &&
                <div className='lg:w-[600px]'>
                    <section>
                        <AddCoverPhoto UpdateFormData={UpdateFormData} formData={formData} />
                    </section>
                    <section>
                        <h3 className='opacity-60 font-medium my-2 text-lg'>select Categories</h3>
                        <CategoryMultiSelection onChange={(v) => { UpdateFormData('category', v) }} />
                    </section>
                    <section className="w-full mt-11">
                        <AddAttachment UpdateFormData={UpdateFormData} formData={formData} />
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">team name</p>
                        <input onChange={handleInputChange} name='title' placeholder="enter platform..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-full mt-4 p-4" />
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">project details</p>
                        <textarea onChange={handleInputChange} name='desc' placeholder="requirements, conditions" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section>
                        <div className='mt-11 w-full'>
                            <p className="capitalize opacity-60 mt-11">address</p>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
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
                                    <GoogleMap  width={'100%'} value={{ 'lat': formData?.location?.lat, 'lng': formData?.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)} />
                                </section>
                            </div>
                        </section>
                    </div>
                    <section>
                        <p className="capitalize opacity-60 mt-11">shooting days</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' onChange={handleInputChange} name='shootingDays' placeholder="Ex. 5 days" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />
                        </div>
                    </section>
                    <section>
                        <p className="capitalize opacity-60 mt-11">budget</p>
                        <div className='flex items-center justify-start gap-4'>
                            <input type='number' onChange={handleInputChange} name='budget' placeholder="Ex. 10$" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 mt-4 p-4" />

                        </div>
                    </section>
                    <section className="my-11 max-w-64">
                        <h3 className="capitalize opacity-60 mb-4">appointment Date</h3>
                        <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                    </section>


                    <section className="sticky bottom-5 z-10">
                        <div className="flex justify-center">
                            <ArrowBtn onClick={onsubmit} className="cursor-pointer w-min sm:w-96 z-10" text='Save' isEnable={true} />
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


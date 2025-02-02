import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { UpdateKeysAndValues } from "../../../util/util";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import { BookProducer } from "../../../redux/action/apis/cycles/producer/book";
import { useTranslation } from 'react-i18next';
import AddAttachment from "../../elements/attachment";
import { GetPlatforms } from '../../../redux/action/apis/cycles/producer/platform';
import ErrorMessage from '../../elements/ErrorMessage';
import PopupErrorMessage from '../../elements/PopupErrorMessage';

const ProducerBooking = ({ respond, platforms , GetPlatforms,addprojectState, UpdateFormData, BookProducer, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {
    const { t } = useTranslation();

    const formData = addprojectState.formData
    
    const [post_success, setPost_success] = useState(false);
    const [attachmentValidation, setAttachmentValidation] = useState(true);
    const [validFormCheck, setValidFormCheck] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const [errorRespond, setErrorRespond] = useState({});

    const validateRequiredFields = () => {
        const errors = {};

        if (!formData.platform) errors.platform = 'platform is required';
        if (!formData.projectDetails) errors.projectDetails = 'projectDetails is required';
        if (!formData.episodesNumber) errors.episodesNumber = 'episodesNumber is required';
        if (!formData.episodesDuration) errors.episodesDuration = 'episodesDuration is required';
        if (!formData.expectedBudget) {
            errors.expectedBudget = 'expectedBudget is required';
        } else if (Number(formData.expectedBudget) < Number(data.minBudget)) {
            errors.expectedBudget = `Expected budget must be greater than minimum budget (${data.minBudget})`;
        } else if (Number(formData.expectedBudget) > Number(data.maxBudget)) {
            errors.expectedBudget = `Expected budget must be Less than maximum budget (${data.minBudget})`;
        }
        if (!formData.expectedProfits) errors.expectedProfits = 'expectedProfits is required';
        // if (!attachmentValidation || (!formData.attachments || !formData.attachments?.length)) errors.attachments = 'Attachment is required';
        if (!formData.appointmentDate) errors.appointmentDate = 'appointmentDate is required';
        return errors;
    };

    function OnSucess() {
        reset()
    }
    function reset() {
        BookProducer(null)
        setPost_success(false)
        setValidFormCheck(false)
        resetForm()
        if (isOpen)
            toggleDrawer()
    }

    useEffect(() => {
        UpdateFormData('producer', data._id)
    }, [isOpen])

    useEffect(() => {
        if (respond?.data)
            setPost_success(true)
    }, [respond?.message])


    function onSubmit() {
        setValidFormCheck(true)
        setErrorPopup(true)
        const timer = setTimeout(() => {
            setErrorPopup(false);
        }, 3000); // Hide after 3 seconds
        validateRequiredFields()
        const isEnable = Object.keys(validateRequiredFields()).length == 0
        if (!isEnable) {
            setErrorMsg(validateRequiredFields())
            return () => clearTimeout(timer);
        }else{
            clearTimeout(timer)
        const form = new FormData()
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['attachments'])

        if (formData.attachments)
            for (let i = 0; i < formData.attachments.length; i++) {
                const file = formData.attachments[i].file;
                form.append(`attachments`, file);
            }
        BookProducer(data._id, form)
    }
    }
    useEffect(()=>{
        if(validFormCheck)
        setErrorMsg(validateRequiredFields())
        setErrorPopup(false);
    },[formData])


    const handlelocationChange = (location) => {
        UpdateFormData('location.lat', location.lat)
        UpdateFormData('location.lng', location.lng)
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) && parseInt(value) < 0) {
            value = Math.abs(Number(value));
        }
        UpdateFormData(name, value)
    };
    
    useEffect(()=>{
        GetPlatforms({search:[]})
    },[])

    useEffect(()=>{
        if(respond?.error){
            setErrorPopup(true)
            setErrorRespond(JSON.parse(respond?.error))
            const timer = setTimeout(() => {
                setErrorPopup(false);
            }, 3000); // Hide after 3 seconds
    
        }
    },[respond?.error])
    // const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";
    const inputStyle = "bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 p-5 w-full";
    if (!isOpen) {
        return <Drawer name={data.user?.name?.split(' ')[0].length>6?data.user?.name?.split(' ')[0].slice(0,6):data.user?.name?.split(' ')[0]} img={data.user?.img} isOpen={isOpen} toggleDrawer={reset} className="overflow-scroll">
        </Drawer >
    }
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Booking" secondMessage="You will be answered within 24 hours" />
            <Drawer name={data.user?.name} img={data.user?.profileImage} isOpen={isOpen} toggleDrawer={reset} className="overflow-scroll">
                <div className='flex flex-col gap-7 container mx-auto'>

                    <section>
                        <h3 className="capitalize opacity-60 mt-10">{t("Platform")}</h3>
                        <input type="text" placeholder={t("Enter Platform...")} className={inputStyle} value={formData.platform || ""} onChange={handleInputChange} name="platform" />
                        <ErrorMessage ErrorMsg={ErrorMsg.platform}/>
                    </section>
                    {formData.platform && platforms?.data?.filter(platform => platform.name.toLowerCase().includes(formData.platform.toLowerCase()))  &&
                    <div className="flex gap-3 flex-wrap">
                        {(platforms?.data?.filter(item=> item.name !== formData.platform))?.map((platform) => (
                            <div key={platform._id}
                                className={`py-1 px-2 border border-[#0000004c] dark:border-[#FFFFFF4D] rounded-full cursor-pointer`}
                                onClick={() => UpdateFormData('platform', platform.name)}>
                                <div className={`whitespace-nowrap font-mediumdark:text-[#FFFFFFBF] text-[#3E3E3E] opacity-80`}>
                                    {platform.name}
                                </div>
                            </div>
                        ))}
                    </div>}
                {/* <section>
                    <ListInputSearchAPI
                        name={'platforms'}
                        placeholder={t("platforms")}
                        onChange={(keys) =>
                            JSON.stringify(keys) !== JSON.stringify(producerData?.platforms) && keys.length
                                ? UpdateFormData('platforms', keys)
                                : null
                        }
                        value={
                            formData?.platforms?.length
                                ? formData.platforms
                                : producerData?.platforms
                        }
                    />
                    <ErrorMessage ErrorMsg={convertError?.data.errors[0].message}/>
                    </section> */}
                    <section>
                        <h3 className="capitalize opacity-60">{t("Project Details")}</h3>
                        <textarea name="projectDetails" value={formData.projectDetails || ""} onChange={handleInputChange} placeholder={t("Main Idea")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                        <ErrorMessage ErrorMsg={ErrorMsg.projectDetails}/>
                    </section>

                    <section className="h-96 relative overflow-hidden">
                        <span>{t("Project Location")}</span>
                        <GoogleMap width={'100%'} value={{ 'lat': formData['location.lat'], 'lng': formData["location.lng"] }} onsetLocation={(value) => handlelocationChange(value)} onChangeAddress={handleInputChange} />
                    </section>
                    <div className="flex w-full justify-between gap-3">
                        <section className="w-full">
                            <p className="capitalize opacity-60">{t("Episodes Number")}</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={0} value={formData.episodesNumber || ""} onChange={handleInputChange} name='episodesNumber' placeholder={t("Ex. 5")} className={inputStyle} />
                            </div>
                        <ErrorMessage ErrorMsg={ErrorMsg.episodesNumber}/>
                        </section>
                        <section className="w-full">
                            <p className="capitalize opacity-60">{t("Episode Duration")}</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={0} value={formData.episodesDuration || ""} onChange={handleInputChange} name='episodesDuration' placeholder={t("Ex. 15 minutes")} className={inputStyle} />
                            </div>
                        <ErrorMessage ErrorMsg={ErrorMsg.episodesDuration}/>
                        </section>
                    </div>
                    
                    <section>
                        <h3 className="capitalize opacity-60 mb-4">{t("budget range")}</h3>
                        <div className="flex gap-2">
                            <div className="border border-[#00000040] px-3 py-1 rounded-full"> {data.minBudget} {t('to')} {data.maxBudget} </div>
                        </div>
                    </section>

                    <div className="flex w-full justify-between gap-3">
                        <section className="w-full">
                            <p className="capitalize opacity-60">{t("Expected Budget")}</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={data.minBudget} value={formData.expectedBudget || ""} onChange={handleInputChange} name='expectedBudget' placeholder={t("Ex. 10$")} className={inputStyle} />
                            </div>
                            <ErrorMessage ErrorMsg={ErrorMsg.expectedBudget}/>
                        </section>

                        <section className="w-full">
                            <p className="capitalize opacity-60">{t("Expected Profits")}</p>
                            <div className='flex items-center justify-start gap-4'>
                                <input type="number" min={0} value={formData.expectedProfits || ""} onChange={handleInputChange} name='expectedProfits' placeholder={t("Ex. 10$")} className={inputStyle} />
                            </div>
                            <ErrorMessage ErrorMsg={ErrorMsg.expectedProfits}/>
                        </section>
                    </div>

                    <section className="w-full ">
                        <h3 className="capitalize opacity-60">{t("Upload Media")}</h3>
                        <AddAttachment name="attachments" value={formData.attachments || ""} onChange={handleInputChange} isValidCallback={(v) => setAttachmentValidation(v)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.attachments}/>
                    </section>

                    <section className="justify-between gap-7">
                        <h3 className="capitalize opacity-60 mb-5">{t("Select Appointment Date")}</h3>
                        <SelectDate value={formData.appointmentDate} onChange={(value) => UpdateFormData('appointmentDate', value)} />
                        <ErrorMessage ErrorMsg={ErrorMsg.appointmentDate}/>
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                        <div>
                            <div className='relative'>
                                <PopupErrorMessage errorPopup={errorPopup} ErrorMsg={Object.values(validateRequiredFields())[0]}/>
                                <PopupErrorMessage errorPopup={errorPopup} ErrorMsg={errorRespond?.data?.errors[0].message}/>
                                <ArrowBtn onClick={onSubmit} loading={respond?.loading} className="left-0 bottom-10 sticky w-auto mb-7 mt-14 mx-14" text="Submit" shadow={true} shadowHeight={"14"} />
                            </div>
                        </div>
                    </section>
                </div>
            </Drawer >
        </>

    );
};


const mapStateToProps = (state) => ({
    respond: state.api.BookProducer,
    addprojectState: state.addproject,
    platforms: state.api.GetPlatforms,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    GetPlatforms,
    BookProducer
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerBooking);

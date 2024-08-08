import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import dateFormat from "dateformat";
import SuccessfullyPosting from "../../popsup/post_successfully_posting";
import { StudopBooking } from "../../../redux/action/apis/cycles/rental/book";
import { useTranslation } from 'react-i18next';
import CustomSlider from "../../elements/customSlider";

const StudioBooking = ({ StudopBooking_respond, addprojectState, UpdateFormData, StudopBooking, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {
    const { t } = useTranslation();

    const formData = addprojectState.formData
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);

    useEffect(() => {
        if (
            formData.details?.length > 5 &&
            formData.startDate &&
            formData['projectScale.numberOfUnits'] > data.projectScale.minimum
        ) setEnableBtn(true)
        else setEnableBtn(false)
    }, [formData])

    function ontoggleDrawer() {
        if (preview)
            setPreview(false)
        else if (toggleDrawer) {
            resetForm()
            toggleDrawer()
        }
        else
            resetForm()
    }

    function OnSucess() {
        StudopBooking(null)
        setPost_success(false)
        resetForm()
        toggleDrawer()
        ontoggleDrawer()
    }


    useEffect(() => {
        if (StudopBooking_respond)
            setPost_success(true)
    }, [StudopBooking_respond?.message])

    function onsubmit() {
        if (!preview) {
            setPreview(true)
            return
        }
        if (submit)
            submit()
        StudopBooking(data._id, formData)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };


    if (!isOpen) {
        return <Drawer name={data.user.name} img={data.user.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
        </Drawer >
    }

    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Booking" />
            <Drawer name={preview ? 'Review Booking' : data.user.name} img={data.user.profileImage} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-y-scroll" padding={false}>
                <div className={preview ? ' hidden p-8 pt-0' : 'p-8 pt-0'}>
                    <div className="mt-11" />
                    <section>
                        <h3 className="capitalize opacity-60">{t("job details")}</h3>
                        <textarea name="details" value={formData.details || ""} onChange={handleInputChange} placeholder={t("requirements, conditions At least 6 char")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-32" />
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">{t("extra payments")}</h3>
                        <div className="flex gap-2">
                            <div className="border border-[#00000040] px-3 py-1 rounded-full">{t("insurance")}</div>
                            <div className="border border-[#00000040] px-3 py-1 rounded-full">$ {data.insurance}</div>
                        </div>
                    </section>
                    <section className="my-11">
                        <div className="flex justify-between">
                            <h3 className="capitalize opacity-60 mb-4">set number of {data.projectScale.unit}</h3>
                            <span className="capitalize opacity-60 mb-4">{formData['projectScale.numberOfUnits']} {data.projectScale.unit}</span>
                        </div>
                        <CustomSlider initValue={data.projectScale.minimum} values={data.projectScale.maximum} onValueChange={(v) => UpdateFormData('projectScale.numberOfUnits', v)} />
                    </section>
                    <section className="my-11">
                        <h3 className="capitalize opacity-60 mb-4">{t("select Booking date")}</h3>
                        <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                    </section>
                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 z-10`}>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text='continue' />
                        </div>
                    </section>
                </div>

                <div className={preview ? 'h-full ' : ' hidden'}>
                    <div className="h-full">
                        <div className="p-8">
                            <section className="w-full">
                                <h2 className='opacity-60 capitalize mb-3'>{t("project type")}</h2>
                                <span className='flex flex-col h-full border-2 text-[#000000D9] border-[#000000D9] rounded-full px-3 py-[6px] capitalize mb-8 opacity-80 w-min whitespace-nowrap'>{t("shooting permits")}</span>
                            </section>
                            <section className="w-full">
                                <h2 className='opacity-60 capitalize mb-2'>{t("project details")}</h2>
                                <span className='capitalize mb-8 opacity-80 w-min font-bold'>
                                    {formData.details}
                                </span>
                            </section>
                            <div className="mt-4">
                                <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 cursor-pointer">
                                    <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                        <Icon className='text-primary' name={"calendar"} />
                                    </div>
                                    <div className="flex flex-col pl-5 w-full">
                                        <span className="font-normal text-base capitalize">{t("Booking Date")}</span>
                                        <span className="font-normal text-base">{dateFormat(formData.startDate, 'd mmmm , yyyy')}</span>
                                    </div>
                                </div>
                            </div>
                            <section className="w-full h-16 sm:w-96 p-2 mt-4">
                                <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024]">
                                    <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                                        <Icon className='text-primary w-6' name={"location-dot"} />
                                    </div>
                                    <div className="flex flex-col pl-5 w-full">
                                        <span className="font-normal text-base capitalize">{t("project location")}</span>
                                        <span className="font-normal text-base">{data.address}</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <section className={`left-0 bottom-0 sticky w-full flex flex-col gap-7 py-6 bg-[#F7F9FB] border-t border-[#00000033]`}>
                        <div className="w-full flex px-8 justify-between">
                            <span className="text-2xl opacity-50 font-semibold">{t("Total Amount")}</span>
                            <span className="text-2xl font-bold">${data.projectScale.pricerPerUnit * formData['projectScale.numberOfUnits']}</span>
                        </div>
                        <div className="flex justify-center">
                            <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-full sm:w-96" text='Appointment Now' />
                        </div>
                    </section>
                </div>
            </Drawer >
        </>
    );
};

const mapStateToProps = (state) => ({
    StudopBooking_respond: state.api.StudopBooking,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    StudopBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(StudioBooking);

import React, { useState, useEffect } from "react";
import Drawer from '../../elements/drawer';
import Icon from '../../Icons'
import ArrowBtn from '../../elements/arrowBtn';
import SelectDate from "../../elements/selectDate";
import { connect } from "react-redux";
import { UpdateFormData, resetForm } from "../../../redux/action/logic/forms/Addproject";
import GoogleMap from "../../elements/googleMap";
import { handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import dateFormat from "dateformat";
import Successfully_posting from "../../popsup/post_successfully_posting";
import { BookProducer } from "../../../redux/action/apis/cycles/producer/book";


const ProducerBooking = ({ respond, addprojectState, UpdateFormData, BookProducer, resetForm, data = {}, isOpen, toggleDrawer, submit }) => {
    const formData = addprojectState.formData
    const [openMap, setOpenMap] = useState(false);
    const [preview, setPreview] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const [post_success, setPost_success] = useState(false);
    useEffect(() => {
        if (
            formData.address?.length > 0 &&
            formData.startDate &&
            formData.location
        ) setEnableBtn(true)
        else setEnableBtn(false)
    }, [formData.address?.length > 0 && formData.startDate && formData.location])

    function ontoggleDrawer() {
        if (preview)
            setPreview(false)
        else if (openMap)
            setOpenMap(false)
        else if (toggleDrawer) {
            resetForm()
            toggleDrawer()
        }
        else
            resetForm()
    }
    function OnSucess() {
        BookProducer(null)
        setPost_success(false)
        resetForm()
        toggleDrawer()
        ontoggleDrawer()
    }
    
    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])

    const converting = (formData) => {
        const data = new FormData();
        const avoidFeilds = ['receiver']
        Object.keys(formData).forEach(key => {
            // Append each key-value pair to the FormData instance
            if (avoidFeilds.includes(key)) return
            data.append(key, formData[key]);
        });

        return data;
    }

    function onsubmit() {
        if (!preview) {
            setPreview(true)
            return
        }
        if (submit)
            submit()

        BookProducer(data._id, converting(formData))
    }

    const attachmentsUpload = (e) => {
        UpdateFormData('attachments', handleMultipleFileUpload(e))
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        UpdateFormData(name, value)
    };


    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    if (!isOpen) {
        return <Drawer name={data.name} img={data.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
        </Drawer >
    }
    if (openMap)
        return <Drawer name={data.name} img={data.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
            <div className="py-10">
                <GoogleMap width={'90%'} value={formData.location}
                    onsetLocation={(value) => {
                        UpdateFormData('location[Lat]', value.Lat)
                        UpdateFormData('location[Lng]', value.Lng)
                    }}
                />
            </div>
        </Drawer >
    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={OnSucess} message="Booking" />
            <Drawer name={preview ? 'Review Booking' : data.name} img={data.img} isOpen={isOpen} toggleDrawer={ontoggleDrawer} className="overflow-scroll">
                <div className="mt-11" />
                <div>
                    <section className="my-11 flex justify-between gap-7">
                        <SelectDate onChange={(value) => UpdateFormData('startDate', value)} />
                    </section>
                    <section className="my-11 gap-7 mr-24 ${ispreview">
                        <h3 className="capitalize opacity-60 mb-4">address</h3>
                        <input placeholder='address' className={inputStyle} value={formData.address} onChange={handleInputChange} name="address" />
                    </section>
                    <section className="py-10">
                        <span className="capitalize opacity-50">location</span>
                        <div className="capitalize mt-4">
                            <section className="h-52 relative rounded-3xl overflow-hidden">
                                <GoogleMap width={'100%'} value={{ 'lat': formData?.location?.lat, 'lng': formData?.location?.lng }} onsetLocation={(value) => UpdateFormData('location', value)} />
                            </section>
                        </div>
                    </section>
                </div>

                <div className="h-24" />
                <section className={`absolute left-0 bottom-0 w-full flex flex-col gap-7 py-6`}>
                    <div className="flex justify-center">
                        <ArrowBtn isEnable={enableBtn} Click={onsubmit} className="cursor-pointer w-min sm:w-96" text={preview ? 'check-out' : 'continue'} />
                    </div>
                </section>

            </Drawer >
        </>
    );
};


const mapStateToProps = (state) => ({
    respond: state.api.BookProducer,
    addprojectState: state.addproject,
});

const mapDispatchToProps = {
    UpdateFormData,
    resetForm,
    BookProducer
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerBooking);

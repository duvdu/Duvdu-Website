import Icon from "../../../components/Icons";
import React, { useEffect, useState, useRef } from 'react';
import Filter from "../../../components/elements/filter";
import { convertToK,getRankStyle} from '../../../util/util';
import { connect } from "react-redux";
import { FindUser } from "../../../redux/action/apis/auth/profile/FindUser";
import Popup from "../../elements/popup";
import SelectDate from "../../elements/selectDate";
import AppButton from "../../elements/button";
import DuvduLoading from "../../elements/duvduLoading";
import AddAttachment from "../../elements/attachment";
import { useTranslation } from 'react-i18next';

const AddToTeamCard = ({ info, goback, onChoose, ...rest }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-[#1A2024] border dark:border-[#FFFFFF33] rounded-[45px] overflow-hidden" {...rest}>
            <div className="flex w-full bg-gray-300 overflow-hidden h-32">
                <img className="w-full" src={info.coverImage} alt={``} />
            </div>
            <div className='p-5'>
                <div className='flex items-start gap-4 -translate-y-4 h-11'>
                    <div className='w-[85px] h-[85px] bg-cover relative bg-no-repeat'>
                        <img className='w-full h-full rounded-full border-2 shadow -translate-y-8 object-cover object-top' src={info.profileImage || process.env.DEFULT_PROFILE_PATH} alt="" />
                    </div>
                    <div className='flex-2 flex-col gap-1'>
                        <span className='text-2xl font-bold capitalize'>{info.name?.length > 14?`${info.name.slice(0,14)}...`:info.name}</span>
                        {info.location && (
                            <span className='flex items-center gap-2 opacity-40'>
                                <div className='w-3'>
                                    <Icon name="location-dot" />
                                </div>
                                <span className="location">{info.location}</span>
                            </span>
                        )}
                    </div>
                </div>
                <div className='flex justify-center pt-25 items-center gap-3'>
                {info?.rank?.title && <p className='rank' style={getRankStyle(info?.rank?.color)}>{info?.rank?.title}</p>}
                {info.category?.title &&
                    <span className='flex border rounded-full px-1 py-2 gap-1 text-sm'>
                        <span>{info.category?.title || "---"}</span>
                    </span>}
                    <div className='border rounded-full px-4 py-1 text-lg flex items-center gap-1'>
                        <span>{info.rate.ratersCounter || 0}</span>
                        <div className='w-5'>
                            <Icon className='text-primary' name={'star'} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center pt-7 items-center'>
                    <div className='flex justify-center'>
                        {Object.entries({
                            "likes": info.likes || 0,
                            "followers": info.followCount?.followers || 0,
                            "views": info.projectsView || 0
                        },).map(([key, value]) => (
                            <div className={`popularity me-9 pe-9 last:me-0 last:pe-0 ${localStorage.getItem('lang')==='Arabic'?'ar':'en'}`} key={key}>
                                <p className='number'>{convertToK(value, 0)}</p>
                                <p className='unit'>{key}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3 mt-6 justify-center items-center">
                    <div onClick={onChoose} className="flex items-center justify-center capitalize w-full rounded-full text-center border-2 border-primary cursor-pointer">
                        <span className="text-primary font-bold text-lg my-5">{t("add to team")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AddToTeamPage = ({ goback,categoryId, FindUser, respond, add_creative, api }) => {
    const {t} = useTranslation()
    const [id, setId] = useState(null);
    const [hours, setHours] = useState(null);
    const [price, setPrice] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [details, setDetails] = useState(null);
    const [durations, setDurations] = useState(null);
    const [attachments, setAttachments] = useState(null);
    const [data, setData] = useState(respond?.data);
    const validateRequiredFields = () => {
        const errors = {};
        if (!hours) errors.hours = 'hours is required';
        if (!price) errors.price = 'price is required';
        if (!durations) errors.durations = 'price is required';
        if (!attachments?.length) errors.attachments = 'attachment is required';
        if (!startDate) errors.startDate = 'start date is required';
        if (!details) errors.details = 'description is required';        
        return errors;
    };
    const isEnable = Object.keys(validateRequiredFields()).length == 0
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const pagganation = respond?.pagination;
    const observerRef = useRef();
    useEffect(()=>{
        if(respond?.message ==='success')
        setData(respond?.data)
    },[respond])
    useEffect(() => {
        if((respond?.pagination?.totalPages!==1 || respond?.pagination?.totalPages!==0) && (respond?.pagination?.resultCount === undefined || respond?.pagination?.resultCount >= limit ) )
        FindUser({ limit: limit, page: page , category:categoryId });
    }, [limit , categoryId]);

    useEffect(() => {
        if (!observerRef.current) return;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setLimit(prevLimit => prevLimit + showLimit);
            }
        });
        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [showLimit]);

    const openpopUp = (value) => {
        setId(value._id);
        const popup = document.querySelector('.ADD_HOURS_TO_CREATIVE');
        if (popup) {
            popup.classList.add('show');
        }
    };

    const onadd = () => {
        const form = new FormData();
        form.append('user', id);
        form.append('details', details);
        form.append('hourPrice', price);
        form.append('workHours', hours);
        form.append('startDate', startDate);
        form.append('duration', durations);
        form.append('attachments', attachments);
        if (attachments)
            for (let i = 0; i < attachments.length; i++) {
                const file = attachments[i].file;
                form.append(`attachments`, file);
            }


        
        goback(form);
    };

    return (
        <>  
            <Popup className="ADD_HOURS_TO_CREATIVE" header={'Add Creative'}>
                <div className='w-full lg:w-[600px] flex flex-col gap-9 h-full justify-center mt-12 px-4'>
                    <div className='grid grid-cols-5 items-center gap-9 full'>
                        {/* <span className="col-span-1 text-lg opacity-50">{t("Details")}</span> */}
                        <textarea type="text" min={0} onChange={(e) => setDetails(e.target.value)} cols={5} placeholder={t("Details")} className="col-span-5 bg-[#9999991A] rounded-3xl border-black border-opacity-10 w-full h-16 p-4" />
                    </div>
                    
                    <div className='grid grid-cols-2 items-center gap-9 full'>
                        {/* <span className="col-span-1 text-lg opacity-50">{t("Hours")}</span> */}
                        <input type="number" min={0} onChange={(e) => setHours(Math.abs(e.target.value))} placeholder={t("Hours")} className="col-span-1 bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 p-4" />
                        <input type="number" min={0} onChange={(e) => setPrice(Math.abs(e.target.value))} placeholder={t("Amount Per Hour")} className="col-span-1 bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 p-4" />
                        <input type="number" min={0} onChange={(e) => setDurations(e.target.value)} placeholder={t("Duration Per Day")} className="col-span-2 bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 p-4" />
                    </div>
                    <div className='grid md:grid-cols-12 gap-5 md:gap-9 w-full'>
                        <span className="md:col-span-3 text-lg opacity-50">{t("Start Date")}</span>
                        <div className="md:col-span-9 w-full overflow-auto">
                            <SelectDate onChange={(value) => setStartDate(value)} />
                        </div>
                    </div>  
                    <div className='grid md:grid-cols-5 items-center gap-5 md:gap-9 full'>
                        <span className="col-span-1 text-lg opacity-50">{t("Attachment")}</span>
                        <div className="col-span-4">
                            <AddAttachment media='image_video' name="attachments" value={attachments} onChange={(e)=> setAttachments(e.target.value)} />
                        </div>
                    </div>

                    <AppButton isEnabled={isEnable} onClick={(e) => onadd()} className={"mb-20 mt-10 mx-16 px-20 sm:px-40"} >
                    {add_creative?.loading? 
                        <DuvduLoading loadingIn={""} />:
                        t('Confirm')
                    }
                    </AppButton>
                </div>
            </Popup>
            <div className="grid minmax-360 gap-5 my-6 addUserScroll">
                {data?.map((value, index) => (
                    <AddToTeamCard goback={goback} info={value} key={index} onChoose={() => openpopUp(value)} />
                ))}
            </div>
            <div ref={observerRef}></div>
                {respond?.loading && 
                <DuvduLoading loadingIn={""} />
                }
        </>
    )
};
const mapStateToProps = (state) => ({
    respond: state.api.FindUser,
    add_creative: state.api.AddTeamProject,
    api: state.api,
});

const mapDispatchToProps = {
    FindUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToTeamPage);

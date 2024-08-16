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
            <div className="flex w-full overflow-hidden h-32">
                <img className="w-full" src={info.coverImage} alt={`Profile Image`} />
            </div>
            <div className='p-5'>
                <div className='flex items-start gap-4 -translate-y-4 h-11'>
                    <div className='w-[85px] h-[85px] bg-cover relative bg-no-repeat'>
                        <img className='w-full h-full rounded-full border-2 shadow -translate-y-8 object-cover object-top' src={info.profileImage || process.env.DEFULT_PROFILE_PATH} alt="profile picture" />
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

const AddToTeamPage = ({ goback, FindUser, respond, api }) => {
    const {t} = useTranslation()
    const [id, setId] = useState(null);
    const [hours, setHours] = useState(null);
    const [price, setPrice] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [details, setDetails] = useState(null);
    const [durations, setDurations] = useState(null);
    const [attachments, setAttachments] = useState(null);
    const validateRequiredFields = () => {
        const errors = {};
        if (!hours) errors.hours = 'hours is required';
        if (!price) errors.price = 'price is required';
        if (!durations) errors.durations = 'price is required';
        if (!attachments?.length) errors.attachments = 'attachment is required';
        if (!startDate) errors.startDate = 'start date is required';
        if ((details?.length||0) < 6) errors.details = 'description is required';        
        return errors;
    };
    const isEnable = Object.keys(validateRequiredFields()).length == 0

    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const pagganation = respond?.pagination;
    const observerRef = useRef();

    useEffect(() => {
        FindUser({ limit: limit, page: page });
    }, [limit]);

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

        const popup = document.querySelector('.ADD_HOURS_TO_CREATIVE');
        if (popup) {
            popup.classList.remove('show');
        }
        
        goback(form);
    };

    return (
        <>  
            <Popup className="ADD_HOURS_TO_CREATIVE" header={'Add Creative'}>
                <div className='w-full lg:w-[600px] flex flex-col gap-9 h-full justify-center mt-24'>
                    <div className='grid grid-cols-5 items-center gap-9 full'>
                        <span className="col-span-1 text-lg opacity-50">{t("Details")}</span>
                        <input type="text" min={0} onChange={(e) => setDetails(e.target.value)} placeholder={t("Ex. Details")} className="col-span-4 bg-[#9999991A] rounded-3xl border-black border-opacity-10 w-full h-16 p-4" />
                    </div>
                    <div className='grid grid-cols-5 items-center gap-9 full'>
                        <span className="col-span-1 text-lg opacity-50">{t("Hours")}</span>
                        <input type="number" min={0} onChange={(e) => setHours(Math.abs(e.target.value))} placeholder={t("Ex. 5")} className="col-span-2 bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 p-4" />
                    </div>
                    <div className='grid grid-cols-5 items-center gap-9 full'>
                        <span className="col-span-1 text-lg opacity-50">{t("Amount")}</span>
                        <input type="number" min={0} onChange={(e) => setPrice(Math.abs(e.target.value))} placeholder={t("Ex. 10$")} className="col-span-2 bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 p-4" />
                    </div>  
                    <div className='grid grid-cols-5 items-center gap-9 full'>
                        <span className="col-span-1 text-lg opacity-50">{t("Start Date")}</span>
                        <div className="col-span-2">
                            <SelectDate onChange={(value) => setStartDate(value)} />
                        </div>
                    </div>  
                    <div className='grid grid-cols-5 items-center gap-9 full'>
                        <span className="col-span-1 text-lg opacity-50">{t("Duration")}</span>
                        <input type="number" min={0} onChange={(e) => setDurations(e.target.value)} placeholder={t("Ex. 5")} className="col-span-2 bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 p-4" />
                    </div>
                    <div className='grid grid-cols-5 items-center gap-9 full'>
                        <span className="col-span-1 text-lg opacity-50">{t("Attachment")}</span>
                        <div className="col-span-4">
                            <AddAttachment name="attachments" value={attachments} onChange={(e)=> setAttachments(e.target.value)} />
                        </div>
                    </div>

                    <AppButton isEnabled={isEnable} onClick={(e) => onadd()} className={"mb-20 mt-10 mx-16 px-20 sm:px-40"} >
                        Confirm
                    </AppButton>
                </div>
            </Popup>
            <div className="grid minmax-360 gap-5 my-6 addUserScroll">
                {respond?.data?.map((value, index) => (
                    <AddToTeamCard goback={goback} info={value} key={index} onChoose={() => openpopUp(value)} />
                ))}
            </div>
            <div ref={observerRef}></div>
            <DuvduLoading loadingIn={"FindUser"} />
        </>
    )
};

const Result = () =>
    <div className="h-body flex flex-col justify-center">
        <div className='container flex flex-col justify-center items-center text-center w-full'>
            <img src='/assets/imgs/theme/TeamProjects.svg' className='lg:w-[540px] lg:h-[450px]' />
            <h3 className='text-[40px] font-semibold mt-8 mb-4'>{t("Team Projects")}<p className="text-2xl opacity-50">
                    “Team Projects” are a great way to build teams for your project.
                </p>
            </h3>
        </div>
    </div>;

const mapStateToProps = (state) => ({
    respond: state.api.FindUser,
    api: state.api,
});

const mapDispatchToProps = {
    FindUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToTeamPage);

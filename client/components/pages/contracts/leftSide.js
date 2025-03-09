import { useRouter } from 'next/router';
import Pending from "./pending1.js";
import Pending2 from "./pending2";
import Ongoing from "./ongoing";
import Ongoing2 from "./ongoing2";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllContracts } from "../../../redux/action/apis/contracts/getall";
import EmptyComponent from "./emptyComponent";
import { toggleContractData } from "../../../redux/action/contractDetails";
import DuvduLoading from "../../elements/duvduLoading.js";
import Rating from "../../popsup/rating.js";
import { useTranslation } from 'react-i18next';

const LeftSide = ({ getAllContracts, respond, api, toggleContractData, user, RightSidehandleToggleClick }) => {
    const { t } = useTranslation();
    const router = useRouter();

    const [activeIndex, setActiveIndex] = useState(0);
    const [sPPending, setSPPending] = useState(0);
    const [cLPending, setCLPending] = useState(0);
    const [data, setData] = useState([]);
    const handleStatus = (status) => {
        switch (status) {
            case 'canceled':
                return -1;
            case 'pending':
                return 0;
            case 'waiting-for-pay-10':
                return 2;
            case 'update-after-first-Payment':
                return 0;
            case 'accepted with update':
                return 0;
            case 'waiting-for-total-payment':
                return 2;
            case 'waiting-for-payment':
                return 2;
            case 'ongoing':
                return 1;
            case 'completed':
                return -1;
            case 'accepted':
                return -1;
            case 'rejected':
                return -1;
            default:
                return "Unknown";
        }
    }
    useEffect(() => {
        getAllContracts()
    }, [])

    useEffect(() => {
        const _data = respond?.data?.filter(value => activeIndex == 0 ? value.sp.username == user?.username : value.sp.username != user?.username)
        const _datasp = respond?.data?.filter(value => value.sp.username == user?.username)
        const pendingsp = _datasp?.filter(data => handleStatus(data.contract.status) == 0)
        const _datacl = respond?.data?.filter(value => value.sp.username != user?.username)
        const pendingcl = _datacl?.filter(data => handleStatus(data.contract.status) == 0)
        setSPPending(pendingsp?.length)
        setCLPending(pendingcl?.length)
        setData(_data)
    }, [activeIndex, respond?.data])

    const handleToggleClick = (index) => {
        RightSidehandleToggleClick(index)
        setActiveIndex(index);
    };
    const Empty = () => <div className="mt-10 lg:mt-32">
        <EmptyComponent message="No Contract Yet!" />
    </div>
    const pending = data?.filter(data => handleStatus(data.contract.status) == 0)
    const ongoing = data?.filter(data => handleStatus(data.contract.status) == 1)
    const checkout = data?.filter(data => handleStatus(data.contract.status) == 2)
    const groupedByCycle = pending?.reduce((acc, item) => {
        const cycle = item.contract.status;
        if (!acc[cycle]) {
          acc[cycle] = [];
        }
        acc[cycle].push(item);
        return acc;
      }, {});
    const groupedByCycle2 = ongoing?.reduce((acc, item) => {
        const cycle = item.contract.status;
        if (!acc[cycle]) {
          acc[cycle] = [];
        }
        acc[cycle].push(item);
        return acc;
      }, {});
    const groupedByCycle3 = checkout?.reduce((acc, item) => {
        const cycle = item.contract.status;
        if (!acc[cycle]) {
          acc[cycle] = [];
        }
        acc[cycle].push(item);
        return acc;
      }, {});
    const Clients = () =>
        respond?.loading?
        <DuvduLoading loadingIn={""} type='contract' />:
        (pending?.length || ongoing?.length || checkout?.length) ?
            <section className="mt-11 lg:mt-36">
                {
                    pending.length > 0 &&
                    <section className='flex flex-col gap-4 mx-auto sm:w-auto'>
                        <h2 className="font-bold text-lg capitalize opacity-80 my-4">{t(`pending`)}</h2>
                        {Object.keys(groupedByCycle).map((cycle) => (
                            <div key={cycle}>
                                <div className='flex flex-col gap-4'>
                                    {groupedByCycle[cycle].map((item, index) => (
                                    <Pending key={`pending-${item._id}`} data={item} onClick={() => router.push(`/contracts?contract=${item._id}`)} />
                                    ))}
                                </div>
                            </div>
                            ))}
                    </section>
                }
                {
                    checkout.length > 0 &&
                    <section className='flex flex-col gap-4 mx-auto sm:w-auto'>
                        <h2 className="font-bold text-lg capitalize opacity-80 my-4">{t('Waiting Checkout Contracts')}</h2>
                        {Object.keys(groupedByCycle3).map((cycle) => (
                            <div key={cycle}>
                                <div className='flex flex-col gap-4'>
                                    {groupedByCycle3[cycle].map((item, index) => (
                                    <Pending key={`pending-${item._id}`} data={item} onClick={() => router.push(`/contracts?contract=${item._id}`)} />
                                    ))}
                                </div>
                            </div>
                            ))}
                    </section>
                }
                {
                    ongoing.length > 0 &&
                    <section className='mt-11 flex flex-col gap-4 mx-auto sm:w-auto'>
                        <h2 className="font-bold text-lg capitalize opacity-80 my-4">{t(`ongoing`)}</h2>
                        {Object.keys(groupedByCycle2).map((cycle) => (
                        <div key={cycle}>
                            <div className='flex flex-col gap-4'>
                                {groupedByCycle2[cycle].map((item, index) => (
                                <Ongoing key={`pending-${item._id}`} data={item} onClick={() => router.push(`/contracts?contract=${item._id}`)} />
                                ))}
                            </div>
                        </div>
                        ))}
                    </section>
                }
            </section> : (pending?.length==0 && ongoing?.length==0 && checkout?.length==0 && <Empty />)


    const Creatives = () =>
        respond?.loading?
        <DuvduLoading loadingIn={""} type='contract' />:
        (pending?.length || ongoing?.length || checkout?.length) ?
            <section className="mt-11 lg:mt-36">
                {
                    pending.length > 0 &&
                    
                    <section className=' flex flex-col gap-4 mx-auto sm:w-auto'>
                        <h2 className="font-bold text-lg capitalize opacity-80 my-4">{t(`pending`)}</h2>
                       {Object.keys(groupedByCycle).map((cycle) => (
                            <div key={cycle}>
                                <div className='flex flex-col gap-4'>
                                    {groupedByCycle[cycle].map((item, index) => (
                                    <Pending2 key={`pending-${item._id}`} data={item} onClick={() => router.push(`/contracts?contract=${item._id}`)} />
                                    ))}
                                </div>
                            </div>
                            ))}
                    </section>
                }
                {
                    checkout.length > 0 &&
                    
                    <section className=' flex flex-col gap-4 mx-auto sm:w-auto'>
                        <h2 className="font-bold text-lg capitalize opacity-80 my-4">{t('Waiting Checkout Contracts')}</h2>
                       {Object.keys(groupedByCycle3).map((cycle) => (
                            <div key={cycle}>
                                <div className='flex flex-col gap-4'>
                                    {groupedByCycle3[cycle].map((item, index) => (
                                    <Pending2 key={`pending-${item._id}`} data={item} onClick={() => router.push(`/contracts?contract=${item._id}`)} />
                                    ))}
                                </div>
                            </div>
                            ))}
                    </section>
                }
                {
                    ongoing.length > 0 &&
                    <section className=' flex flex-col gap-4 mx-auto sm:w-auto'>
                        <h2 className="font-bold text-lg capitalize opacity-80 my-4">{t(`ongoing`)}</h2>
                       {Object.keys(groupedByCycle2).map((cycle) => (
                            <div key={cycle}>
                                <div className='flex flex-col gap-4'>
                                    {groupedByCycle2[cycle].map((item, index) => (
                                    <Ongoing2 key={`pending-${item._id}`} data={item} onClick={() => router.push(`/contracts?contract=${item._id}`)} />
                                    ))}
                                </div>
                            </div>
                            ))}
                    </section>
                }
            </section> : (pending?.length==0 && ongoing?.length==0 && checkout?.length==0 && <Empty />)
        return (
        <>

            <div className='h-auto lg:h-body overflow-y-scroll'>
                <div className='flex flex-col h-full mt-24 lg:mt-0'>
                    <section className='flex left-0 lg:hidden gap-3 mt-6 mb-2 fixed w-full py-4 top-16 p-0 z-[5] px-4'>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto min-w-[220px] contact-toggle whitespace-nowrap ${activeIndex === 0 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(0)}
                        >
                            {t("my clients")}
                            {activeIndex==0 &&
                                <span className='rounded-full bg-primary text-white ms-2 w-5 h-5 text-sm flex items-center justify-center'> {sPPending}</span>
                            }
                        </div>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto min-w-[220px] contact-toggle whitespace-nowrap ${activeIndex === 1 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(1)}
                        >
                        {t("my bookings")} 
                            {activeIndex==1 &&
                                <span className='rounded-full bg-primary text-white ms-2 w-5 h-5 text-sm flex items-center justify-center'> {cLPending}</span>
                            }    
                        </div>
                    </section>

                    <section className='hidden lg:flex gap-3 mt-6 mb-2 fixed py-4 p-0 z-[5]'>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto min-w-[220px] contact-toggle whitespace-nowrap ${activeIndex === 0 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(0)}
                        >
                            {t("my clients")}
                            {activeIndex==0 &&
                                <span className='rounded-full bg-primary text-white ms-2 w-5 h-5 text-sm flex items-center justify-center'> {sPPending}</span>
                            }
                        </div>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto min-w-[220px] contact-toggle whitespace-nowrap ${activeIndex === 1 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(1)}
                        >
                        {t("my bookings")} 
                            {activeIndex==1 &&
                                <span className='rounded-full bg-primary text-white ms-2 w-5 h-5 text-sm flex items-center justify-center'> {cLPending}</span>
                            }    
                        </div>
                    </section>
                    {
                        !(api.loading && api.req == "getAllContracts") &&
                        (activeIndex === 0 ? <Clients /> : <Creatives />)
                    }
                    <div className="flex flex-col justify-center items-center lg:h-body">
                        <DuvduLoading loadingIn={"getAllContracts"} />
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    user: state.auth.user,
    api: state.api,
    respond: state.api.getAllContracts,
    categories: state.categories,
});

const mapDispatchToProps = {
    getAllContracts,
    toggleContractData
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide);

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

    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState([]);
    const handleStatus = (status) => {
        switch (status) {
            case 'canceled':
                return -1;
            case 'pending':
                return 0;
            case 'waiting-for-pay-10':
                return 0;
            case 'update-after-first-Payment':
                return 0;
            case 'waiting-for-total-payment':
                return 0;
            case 'waiting-for-payment':
                return 0;
            case 'ongoing':
                return 1;
            case 'completed':
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
        const _data = respond?.data.filter(value => activeIndex == 0 ? value.sp.username == user?.username : value.sp.username != user?.username)
        setData(_data)
    }, [activeIndex, respond?.data])

    const handleToggleClick = (index) => {
        RightSidehandleToggleClick(index)
        setActiveIndex(index);
    };
    const Empty = () => <div className="mt-10 lg:mt-32">
        <EmptyComponent message={t("No Contract Yet!")} />
    </div>
    const pending = data?.filter(data => handleStatus(data.contract.status) == 0)
    const ongoing = data?.filter(data => handleStatus(data.contract.status) == 1)



    const Clients = () =>
        (pending?.length || ongoing?.length) ?
            <section className="mt-11 lg:mt-36">
                {
                    pending.length > 0 &&
                    <section className='flex flex-col gap-4 mx-auto sm:w-auto mb-4'>
                        <h2 className="font-bold text-lg capitalize opacity-80">{t("pending")}</h2>
                        {pending.map((data, index) => (
                            <Pending key={index} data={data} onClick={() => toggleContractData(data)} />
                        ))}
                    </section>
                }
                {
                    ongoing.length > 0 &&
                    <section className='mt-11 flex flex-col gap-4 mx-auto sm:w-auto mb-4'>
                        <h2 className="font-bold text-lg capitalize opacity-80">{t("ongoing contracts")}</h2>
                        {ongoing.map((data, index) => (
                            <Ongoing key={index} data={data} onClick={() => toggleContractData(data)} />
                        ))}

                    </section>
                }
            </section> : <Empty />


    const Creatives = () =>
        (pending?.length || ongoing?.length) ?
            <section className="mt-11 lg:mt-36">
                {
                    pending.length > 0 &&
                    <section className=' flex flex-col gap-4 mx-auto sm:w-auto mb-4'>
                        <h2 className="font-bold text-lg capitalize opacity-80 ">{t("pending")}</h2>
                        {pending.map((data, index) => (
                            <Pending2 key={index} data={data} onClick={() => toggleContractData(data)} />
                        ))}
                    </section>
                }
                {
                    ongoing.length > 0 &&
                    <section className='mt-11 flex flex-col gap-4 mx-auto sm:w-auto mb-4'>
                        <h2 className="font-bold text-lg capitalize opacity-80 ">{t("ongoing contracts")}</h2>
                        {ongoing.map((data, index) => (
                            <Ongoing2 key={index} data={data} onClick={() => toggleContractData(data)} />
                        ))}
                    </section>
                }
            </section> : <Empty />
    return (
        <>

            <div className='h-auto lg:h-body overflow-y-scroll'>
                <div className='flex flex-col h-full mt-24 lg:mt-0'>
                    <section className='flex left-0 lg:hidden gap-3 mt-6 mb-2 fixed w-full py-4 top-16 p-0 z-[5] px-4'>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 0 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(0)}
                        >
                            {t("my clients")}
                        </div>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 1 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(1)}
                        >
                        {t("my creatives")}
                            
                        </div>

                    </section>

                    <section className='hidden lg:flex gap-3 mt-6 mb-2 fixed py-4 p-0 z-[5]'>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 0 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(0)}
                        >
                            {t("my clients")}
                            
                        </div>
                        <div
                            className={`sm:px-10 px-0 py-5 w-full sm:w-auto contact-toggle whitespace-nowrap ${activeIndex === 1 ? 'active' : ''}`}
                            onClick={() => handleToggleClick(1)}
                        >
                        {t("my creatives")}
                            
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

import React, { useState , useEffect } from 'react';
import Layout from "../components/layout/Layout";
import Icon from '../components/Icons';
import ArrowBtn from '../components/elements/arrowBtn';
import Popup from '../components/elements/popup';
import SuccessSubscription from '../components/popsup/successSubscription';
import AppButton from '../components/elements/button';
import AddNewCard from '../components/pages/payment/AddNewCard';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { subscribe } from '../redux/action/apis/auth/subscription/subscribe';
import { checkSubscribe } from '../redux/action/apis/auth/subscription/checkSubscribe';
import { useRouter } from 'next/router';

const Payment = ({isLogin , checkSubscribe , checkSubscribe_response , subscribe_response , subscribe}) => {
    const { t } = useTranslation();


    return (
        <>
            <Layout>
                <div className='lg:flex gap-6 container'>
                    <LeftSide />
                    <RightSide isLogin={isLogin} checkSubscribe={checkSubscribe} checkSubscribe_response={checkSubscribe_response} subscribe_response={subscribe_response} subscribe={subscribe} />
                </div>
            </Layout>
        </>

    );
};

const LeftSide = () => {
    const { t } = useTranslation();

    const [showAddCard, setShowAddCard] = useState(true);
    const [cardData, setCardData] = useState([
        {
            isSelected: true,
            data: [
                {
                    label: 'Banka',
                    value: 'Ziraat Bankası'
                },
                {
                    label: 'Son dört hane',
                    value: '1234'
                },
                {
                    label: 'Kartın üzerindeki ad',
                    value: 'Hızır Kocaman'
                },
                {
                    label: 'Son kullanma tarihi',
                    value: '12/34'
                }
            ]
        },
        {
            isSelected: false,
            data: [
                {
                    label: 'Banka',
                    value: 'Ziraat Bankası'
                },
                {
                    label: 'Son dört hane',
                    value: '1234'
                },
                {
                    label: 'Kartın üzerindeki ad',
                    value: 'Hızır Kocaman'
                },
                {
                    label: 'Son kullanma tarihi',
                    value: '12/34'
                }
            ]
        },
        {
            isSelected: false,
            data: [
                {
                    label: 'Banka',
                    value: 'Ziraat Bankası'
                },
                {
                    label: 'Son dört hane',
                    value: '1234'
                },
                {
                    label: 'Kartın üzerindeki ad',
                    value: 'Hızır Kocaman'
                },
                {
                    label: 'Son kullanma tarihi',
                    value: '12/34'
                }
            ]
        },
    ]);

    const handleAddCardClick = () => {
        setShowAddCard(true);
    };

    const handleCardClick = (index) => {
        const updatedCardData = cardData.map((card, i) => {
            return {
                ...card,
                isSelected: i === index
            };
        });
        setCardData(updatedCardData);
    };

    return (
        <>
            <div className='my-12 w-full h-full'>
                {/* <div className='rounded-2xl bg-white dark:bg-[#1A2024] dark:border-[#3D3D3D]'>
                    <div className='flex rounded-xl gap-4 p-6'>
                        <Icon name={"card"} />
                        <p className='font-medium text-base'>{t("Registered cards")}</p>
                    </div>
                    <div className='border-b-2' />
                    {cardData.map((card, index) => (
                        <Card key={index} isSelected={card.isSelected} data={card.data} isLast={cardData.length - 1 === index} onClick={() => handleCardClick(index)} />
                    ))}
                </div> */}
                {!showAddCard && (
                    <div className='flex gap-4 rounded-2xl w-full border px-7 py-6 cursor-pointer' onClick={handleAddCardClick}>
                        <div className='flex border-2 border-[#CFCFCF] items-center justify-center rounded-full w-6 h-6 p-[1px]'>
                            <Icon name={"check"} />
                        </div>
                        <span>{t("Add new card")}</span>
                    </div>
                )}
                {showAddCard && (
                    <AddNewCard />
                )}

            </div>
        </>
    );
};


const RightSide = ({checkSubscribe , checkSubscribe_response , subscribe_response , subscribe ,isLogin}) => {
    const { t } = useTranslation();
    const [canSubscribe , setCanSubscribe ] = useState(false)
    const [haveSubscribe , setHaveSubscribe ] = useState(null)
    const [post_success, setPost_success] = useState(false);
    const [price , setPrice ] = useState(null)
    const router = useRouter()
    console.log({price})
    function subscriber(){
        subscribe().then(()=>{
            setPost_success(true)
        })
    }
    useEffect(()=>{
        if(isLogin===true)
            checkSubscribe()
    },[isLogin])
    var convertError = JSON.parse(checkSubscribe_response?.error ?? null)
    function OnSucess() {
        setPost_success(false)
    }

    useEffect(()=>{
        if(checkSubscribe_response?.data){
            setCanSubscribe(true)
            setPrice(checkSubscribe_response?.data?.newFiveContractsPrice)
        }
        if(checkSubscribe_response?.error){
            setHaveSubscribe(convertError?.data?.avaliableContracts)
            setCanSubscribe(false)
        }
    },[checkSubscribe_response?.data , checkSubscribe_response?.error])

    return (
        <>
            <SuccessSubscription isShow={post_success} onCancel={OnSucess} />
            <Popup id='error-message' header={'Error Message'}>
                <div className='flex h-full flex-col mt-24 items-center'>
                    <div className='flex gap-2 items-center justify-center mb-4'>
                        <div className='bg-[#EB1A40] rounded-full h-min  w-7 flex justify-center items-center aspect-square'>
                            <Icon className='text-white' name={'xmark'} invert={true} />
                        </div>
                        <span className='text-center text-lg font-medium opacity-80 text-[#EB1A40]'>{t("payment failed")}</span>
                    </div>

                    <span className='mb-24 text-center text-lg font-medium opacity-80'>{t("Invalid payment data")}</span>
                    <AppButton data-popup-dismiss="popup" className={"mb-40 mx-16 md:mx-32 w-52"} >{t("Try Again")}</AppButton>
                </div>
            </Popup>
            <div className='rounded-2xl bg-white dark:bg-[#1A2024] border-[#CFCFCF] dark:border-[#3D3D3D] p-12 h-full my-12 w-full flex-1'>
                {/* <section>
                    <h3 className="capitalize opacity-60 mb-4">{t("project type")}</h3>
                    <span className="rounded-full border border-black border-opacity-55 px-3 py-1">{t("videography")}</span>
                </section>

                <section className='my-9'>
                    <h3 className="capitalize opacity-60 mb-4">{t("project details")}</h3>
                    <span className="font-bold">{t("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt")}</span>
                </section>

                <section>
                    <h3 className="capitalize opacity-60 mb-4">{t("shooting days")}</h3>
                    <span className="font-bold">{t("5 days")}</span>
                </section>

                <section className='my-9'>
                    <div className='flex gap-4'>
                        <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                        <div>
                            <div>
                                <span className='opacity-85 text-base'>{t("14 December, 2021")}</span>
                            </div>
                            <div>
                                <span className='text-xs text-[#747688]'>{t("Tuesday, 4:00PM - 9:00PM")}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                            <Icon className='text-primary text-2xl w-8' name={"location-dot"} />
                        </div>
                        <div>
                            <div>
                                <span className='opacity-85 text-base'>{t("Gala Convention Center")}</span>
                            </div>
                            <div>
                                <span className='text-xs text-[#747688]'>{t("36 Guild Street London, UK")}</span>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* <div className='h-12' /> */}
                <p className='opacity-60 text-lg font-semibold'>{t("Subscribe to get access to more amazing projects & clients.")}</p>
                <span className='text-primary text-lg capitalize text-center mt-0 mb-4'>
                <span className='opacity-70 text-primary'>{t("5 contracts")}</span>
                </span>
                <div className='flex font-bold justify-between mt-5'>
                    <span>{t("Total Amount")}</span>
                    <span>{price} {t("EGP")}</span>
                </div>
                <section>
                    <div className="flex justify-center mt-5">
                        {/* <div data-popup-toggle="popup" data-popup-target="error-message"> */}
                            <ArrowBtn loading={subscribe_response?.loading} onClick={subscriber} className="cursor-pointer sm:w-96" text={t('subscribe now')} />
                        {/* </div> */}
                    </div>
                </section>
            </div>
        </>

    );
};


const Card = ({ isSelected, data, isLast , onClick }) => {
    const { t } = useTranslation();

    return (
        <div onClick={onClick} className={`mx-6 my-4 pb-4 ${isLast ? "" : "   "}`}>
            <div className={`flex rounded-xl gap-4 justify-between `}>
                <div className='mb-2'>
                    {isSelected ? (
                        <div className='flex items-center justify-center rounded-full bg-green-600 w-6 h-6  mb-2'>
                            <Icon name={"whiteCheck"} />
                        </div>
                    ) : (
                        <div className='flex border-2 border-[#CFCFCF] items-center justify-center rounded-full w-6 h-6 p-[1px] mb-2'>
                            <Icon name={"check"} />
                        </div>
                    )}
                    <Icon name={"card"} />
                </div>
                {data.map((item, index) => (
                    <div key={index} className='text-center'>
                        <p className='text-sm text-[#5E5E5E] mb-2'>{item.label}</p>
                        <p className={isSelected ? 'font-bold text-base' : 'text-sm text-[#5E5E5E]'}>{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    subscribe_response: state.api.subscribe,
    checkSubscribe_response: state.api.checkSubscribe,
    isLogin: state.auth.login,
});

const mapDispatchToProps = {
    subscribe,
    checkSubscribe,
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);


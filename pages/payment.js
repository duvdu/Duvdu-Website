import React, { useState } from 'react';
import Layout from "../components/layout/Layout";
import Icon from '../components/Icons';
import ArrowBtn from '../components/elements/arrowBtn';
import Popup from '../components/elements/popup';
import AppButton from '../components/elements/button';
import AddNewCard from '../components/pages/payment/AddNewCard';

const Payment = () => {


    return (
        <>
            <Layout>
                <div className='lg:flex gap-6 container'>
                    <LeftSide />
                    <RightSide />
                </div>
            </Layout>
        </>

    );
};

const LeftSide = () => {
    const [showAddCard, setShowAddCard] = useState(false);
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
                <div className='rounded-2xl bg-DS_white dark:border-[#3D3D3D]'>
                    <div className='flex rounded-xl gap-4 p-6'>
                        <Icon name={"card"} />
                        <p className='font-medium text-base'>Registered cards</p>
                    </div>
                    <div className='border-b-2' />
                    {cardData.map((card, index) => (
                        <Card key={index} isSelected={card.isSelected} data={card.data} isLast={cardData.length - 1 === index} onClick={() => handleCardClick(index)} />
                    ))}
                </div>
                {!showAddCard && (
                    <div className='flex gap-4 rounded-2xl w-full border px-7 py-6 cursor-pointer' onClick={handleAddCardClick}>
                        <div className='flex border-2 border-[#CFCFCF] items-center justify-center rounded-full w-6 h-6 p-[1px]'>
                            <Icon name={"check"} />
                        </div>
                        <span>Add new card</span>
                    </div>
                )}
                {showAddCard && (
                    <AddNewCard />
                )}

            </div>
        </>
    );
};


const RightSide = () => {
    
    return (
        <>
            <Popup id='error-message' header={'Error Message'}>
                <div className='flex h-full flex-col mt-24 items-center'>
                    <div className='flex gap-2 items-center justify-center mb-4'>
                        <div className='bg-[#EB1A40] rounded-full h-min  w-7 flex justify-center items-center aspect-square'>
                            <Icon className='text-white' name={'xmark'} invert={true} />
                        </div>
                        <span className='text-center text-lg font-medium opacity-80 text-[#EB1A40]'>payment failed</span>
                    </div>

                    <span className='mb-24 text-center text-lg font-medium opacity-80'>Invalid payment data</span>
                    <AppButton data-popup-dismiss="popup" className={"mb-40 mx-16 md:mx-32 w-52"} >
                    Try Again
                    </AppButton>
                </div>
            </Popup>
            <div className='rounded-2xl bg-DS_white border-[#CFCFCF] dark:border-[#3D3D3D] p-12 h-full my-12 w-full flex-1'>
                <section>
                    <p className="capitalize opacity-60 mb-4">project type</p>
                    <span className="rounded-full border border-black border-opacity-55 px-3 py-1"> videography </span>
                </section>

                <section className='my-9'>
                    <p className="capitalize opacity-60 mb-4">project details</p>
                    <span className="font-bold"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </span>
                </section>

                <section>
                    <p className="capitalize opacity-60 mb-4">shooting days</p>
                    <span className="font-bold"> 5 days </span>
                </section>

                <section className='my-9'>
                    <div className='flex gap-4'>
                        <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                        <div>
                            <div>
                                <span className='opacity-85 text-base'>
                                    14 December, 2021
                                </span>
                            </div>
                            <div>
                                <span className='text-xs text-[#747688]'>
                                    Tuesday, 4:00PM - 9:00PM
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='bg-[#e8f1fd] rounded-xl p-3 mb-4'>
                            <Icon className='text-primary text-2xl w-8' name={"location-dot"} />
                        </div>
                        <div>
                            <div>
                                <span className='opacity-85 text-base'>
                                    Gala Convention Center
                                </span>
                            </div>
                            <div>
                                <span className='text-xs text-[#747688]'>
                                    36 Guild Street London, UK
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='h-12' />
                <div className='flex font-bold justify-between'>
                    <span>Total Amount</span>
                    <span>₹6,699.0</span>
                </div>
                <section>
                    <div className="flex justify-center mt-11">
                        <div data-popup-toggle="popup" data-popup-target="error-message">
                            <ArrowBtn className="cursor-pointer sm:w-96" text='check-out' />
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};


const Card = ({ isSelected, data, isLast , onClick }) => {

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


export default Payment;

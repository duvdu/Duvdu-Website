import React, { useState } from 'react';
import Icon from '../../Icons';
import { useTranslation } from 'react-i18next';

export default function AddNewCard() {
    const { t } = useTranslation();
    const [cardNumber, setCardNumber] = useState('');
    const [cardOwner, setCardOwner] = useState('');
    const [expiryDate0, setExpiryDate0] = useState('');
    const [expiryDate1, setExpiryDate1] = useState('23');
    const [expiryDate2, setExpiryDate2] = useState('012');
    const [cvv2, setCvv2] = useState('');
    const [promocode, setPromocode] = useState('');

    const [cardNumberError, setCardNumberError] = useState(false);
    const [cardOwnerError, setCardOwnerError] = useState(true);
    const [expiryDateError, setExpiryDateError] = useState(false);
    const [cvv2Error, setCvv2Error] = useState(false);
    const [promocodeError, setPromocodeError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic here and set error state accordingly
    };

    return (
        <div className="container mx-auto mt-8 bg-[#1bb66e19] rounded-2xl p-8 border border-[#CFCFCF]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className='flex items-center justify-center rounded-full bg-green-600 w-6 h-6'>
                    <Icon name={"whiteCheck"} />
                </div>
                <span className='w-full'>{t("Add new card")}</span>
                <Icon name={"visa-logo"} />
                <Icon name={"visa-word"} />
            </h2>
            <form className="">
                <div className='flex items-center gap-4 mb-6'>
                    <label htmlFor="cardNumber" className={`text-base whitespace-nowrap w-72 ${cardNumberError ? 'text-red-500' : ']'}`}>
                        Card number
                        <br />
                        <span className={`text-xs ${cardNumberError ? 'text-red-500' : 'text-[#5E5E5E]'}`}>{t("Enter the 16-digit card number")}</span>
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        className={`border border-gray-300 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:ring-width-2 focus:border-primary focus:border-4 ${cardNumberError ? 'border-red-500' : ''}`}
                        value={cardNumber|| ""}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                    <div className='w-10'>
                        {
                            true &&
                            <div className='flex border-2 border-[#CFCFCF] items-center justify-center rounded-full w-6 h-6 p-[1px] aspect-square'>
                                <Icon name={"check"} />
                            </div>
                        }
                        {
                            false &&
                            <div className='flex items-center justify-center rounded-full bg-green-600 w-6 h-6  mb-2'>
                                <Icon name={"whiteCheck"} />
                            </div>
                        }

                    </div>
                </div>

                <div className='flex items-center gap-4 mb-6'>
                    <label htmlFor="cardOwner" className={`text-base whitespace-nowrap w-72 ${cardOwnerError ? 'text-red-500' : ']'}`}>
                        Card owner
                        <br />
                        <span className={`text-xs ${cardOwnerError ? 'text-red-500' : 'text-[#5E5E5E]'}`}>{t("Enter the name on the card")}</span>
                    </label>
                    <input
                        type="text"
                        id="cardOwner"
                        className={`border border-gray-300 rounded-xl w-full py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:ring-width-2 focus:border-primary focus:border-4 ${cardOwnerError ? 'border-red-500' : ''}`}
                        value={cardOwner|| ""}
                        onChange={(e) => setCardOwner(e.target.value)}
                        required
                    />
                    <div className='w-10'></div>
                </div>

                <div className='flex items-center gap-4 mb-6'>
                    <label htmlFor="expiryDate" className={`text-base whitespace-nowrap w-72 ${expiryDateError ? 'text-red-500' : ']'}`}>
                        Expiry date
                        <br />
                        <span className={`text-xs ${expiryDateError ? 'text-red-500' : 'text-[#5E5E5E]'}`}>{t("Enter the expiration date of the card")}</span>
                    </label>
                    <div className='w-full flex justify-between items-center'>
                        <input
                            type="text"
                            id="expiryDate"
                            className={`w-14 border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:ring-width-2 focus:border-primary focus:border-4 ${expiryDateError ? 'border-red-500' : ''}`}
                            value={expiryDate0|| ""}
                            onChange={(e) => setExpiryDate0(e.target.value)}
                            required
                        />
                        <span className='text-2xl'> / </span>
                        <input
                            type="text"
                            id="expiryDate"
                            className={`w-14 border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:ring-width-2 focus:border-primary focus:border-4 ${expiryDateError ? 'border-red-500' : ''}`}
                            value={expiryDate1|| ""}
                            onChange={(e) => setExpiryDate1(e.target.value)}
                            required
                        />
                        <label htmlFor="expiryDate" className={`text-base flex-2  whitespace-nowrap  ${expiryDateError ? 'text-red-500' : ']'}`}>
                            CVV2
                            <br />
                            <span className={`text-xs ${expiryDateError ? 'text-red-500' : 'text-[#5E5E5E]'}`}>{t("Security code")}</span>
                        </label>
                        <input
                            type="text"
                            id="expiryDate"
                            className={`w-14 border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:ring-width-2 focus:border-primary focus:border-4 ${expiryDateError ? 'border-red-500' : ''}`}
                            value={expiryDate2|| ""}
                            onChange={(e) => setExpiryDate2(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-10'></div>
                </div>


            </form>
        </div>
    );
}

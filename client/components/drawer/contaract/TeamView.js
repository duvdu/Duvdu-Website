
import dateFormat from "dateformat";
import { useTranslation } from 'react-i18next';
import Icon from '../../Icons';

export default function TeamView({contract}){
    const { t } = useTranslation();
    return <>
    <section className='grid grid-cols-3 w-full'>
        {contract.workHours && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Work Hour")}</h2>
            <span className='font-semibold capitalize max-w-[543px]'>
            {contract.workHours}
            </span>
        </div>
        }
        {contract.hourPrice && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Price Per Hour")}</h2>
            <span className='font-semibold max-w-[543px]'>
            {contract.hourPrice} EGP
            </span>
        </div>
        }
        {contract.totalAmount && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Total Amount")}</h2>
            <span className='font-semibold max-w-[543px]'>
            {contract.totalAmount} EGP
            </span>
        </div>
        }
        {contract.totalPrice &&
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Total Price")}</h2>
            <span className='font-semibold capitalize max-w-[543px]'>
            {contract.totalPrice} EGP
            </span>
        </div>
        }
    </section>   
    <section className='grid grid-cols-2 w-full'>
        {contract.details && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("project details")}</h2>
            <span className='font-semibold max-w-[543px]'>
            {contract.details}
            </span>
        </div>
        }
    </section>   
    <section className='grid grid-cols-2 w-full'>
            <div className='w-full'>
                <h2 className='opacity-60 capitalize mb-3'>{t("Booking Date")}</h2>
                <div className='flex gap-4'>
                    <div>

                        <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='opacity-85 text-base'>
                                {dateFormat(contract.createdAt, 'd mmmm , yyyy')}
                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                                {dateFormat(contract.createdAt, 'dddd')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <h2 className='opacity-60 capitalize mb-3'>{t("deadline date")}</h2>
                <div className='flex gap-4'>
                    <div>

                        <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='opacity-85 text-base'>
                                {dateFormat(contract.deadline, 'd mmmm , yyyy')}
                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                                {dateFormat(contract.deadline, 'dddd')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    </section>   
    <section className='grid grid-cols-2 w-full'>
            <div className='w-full '>
                <h2 className='opacity-60 capitalize mb-3'>{t("Appointment Date")}</h2>
                <div className='flex gap-4'>
                    <div>

                        <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='opacity-85 text-base'>
                                {dateFormat(contract.startDate, 'd mmmm , yyyy')}
                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                                {dateFormat(contract.startDate, 'dddd')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    </section>   
    
    </>  
} 
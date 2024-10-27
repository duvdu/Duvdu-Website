
import dateFormat from "dateformat";
import { useTranslation } from 'react-i18next';
import Icon from '../../Icons';

export default function ProducerView({contract}){
    const { t } = useTranslation();
    return <>
    <section className='grid grid-cols-2 w-full'>
        {contract.platform && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Platform")}</h2>
            <span className='font-semibold capitalize max-w-[543px]'>
            {contract.platform}
            </span>
        </div>
        }
    </section>   
    <section className='grid grid-cols-2 w-full'>
        {contract.projectDetails && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("project details")}</h2>
            <span className='font-semibold capitalize max-w-[543px]'>
            {contract.projectDetails}
            </span>
        </div>
        }
    </section>
    <section className='grid grid-cols-2 w-full'>
        {contract.episodesNumber && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Episodes Number")}</h2>
            <span className='font-semibold capitalize max-w-[543px]'>
            {contract.episodesNumber}
            </span>
        </div>
        }
        {contract.episodesDuration && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Episode Duration")}</h2>
            <span className='font-semibold max-w-[543px]'>
            {contract.episodesDuration}
            </span>
        </div>
        }
    </section>   
    <section className='grid grid-cols-2 w-full'>
        {contract.expectedBudget && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Episode budget")}</h2>
            <span className='font-semibold capitalize max-w-[543px]'>
            {contract.expectedBudget} EGP
            </span>
        </div>
        }
        {contract.expectedProfits && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Episode profits")}</h2>
            <span className='font-semibold max-w-[543px]'>
            {contract.expectedProfits} EGP
            </span>
        </div>
        }
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
                                {dateFormat(contract.appointmentDate, 'd mmmm , yyyy')}
                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                                {dateFormat(contract.appointmentDate, 'dddd')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    </section>   
    <section className='grid grid-cols-1 w-full'>
            <a
                href={contract.address ? `https://www.google.com/maps?q=${contract.location?.lat},${contract.location?.lng}` : null}
                target="_blank"
                rel="noopener noreferrer"
                className='opacity-85 text-base'
            >
                <div className='w-full'>
                    <h2 className='opacity-60 capitalize mb-3'>{t("project location")}</h2>
                    <div className='flex gap-4'>
                        <div>
                            <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                                <Icon className='text-primary text-2xl size-5' name={"location-dot"} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className='opacity-85 text-base line-clamp-2'>
                                    {contract.address ? contract.address : "No Address To show"}
                                </span>
                            </div>
                            <div>
                                <span className='text-xs text-[#747688]'>
                                    click to open location map!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
    </section>   
    
    </>  
} 
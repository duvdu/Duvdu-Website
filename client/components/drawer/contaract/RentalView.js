
import dateFormat from "dateformat";
import { useTranslation } from 'react-i18next';
import Icon from '../../Icons';

export default function RentalView({contract}){
    const { t , i18n } = useTranslation();
    const currentLanguage = i18n.language; // Get current language
    const arabicMonths = {
        January: "يناير",
        February: "فبراير",
        March: "مارس",
        April: "أبريل",
        May: "مايو",
        June: "يونيو",
        July: "يوليو",
        August: "أغسطس",
        September: "سبتمبر",
        October: "أكتوبر",
        November: "نوفمبر",
        December: "ديسمبر"
      };      
      const convertToArabicNumbers = (str) => {
        return str.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[digit]);
      };      
      const formatDate = (isoDateString) => {
        const formattedDate = dateFormat(isoDateString, "UTC:d mmmm, yyyy");
        const monthInEnglish = formattedDate.match(/([a-zA-Z]+)/)[0]; // Extract English month
        const arabicMonth = arabicMonths[monthInEnglish]; // Map to Arabic month
        const arabicDate = formattedDate.replace(monthInEnglish, arabicMonth); // Replace month
        if(currentLanguage==='Arabic'){
            return convertToArabicNumbers(arabicDate); // Convert numbers to Arabic
        }else{
            return formattedDate
        }
      };
       const formatTime = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleTimeString(`${currentLanguage==='Arabic'?'ar-EG':'en-US'}`, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC', // Change to your time zone if needed
        });
      };    
    return <>
    <section className='grid md:grid-cols-2 w-full'>
        {contract.totalPrice &&
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("Total Price")}</h2>
            <span className='font-semibold capitalize max-w-[543px]'>
            {contract.totalPrice} {t('EGP')}
            </span>
        </div>
        }
        {contract.insurance && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("insurance")}</h2>
            <span className='font-semibold max-w-[543px]'>
            {contract.insurance} {t('EGP')}
            </span>
        </div>
        }
    </section>   
    <section className='w-full'>
        {contract.details && 
        <div>
            <h2 className='opacity-60 capitalize mb-3'>{t("project details")}</h2>
            <span className='font-semibold max-w-[543px]'>
            {contract.details}
            </span>
        </div>
        }
    </section>   
    <section className='grid md:grid-cols-2 w-full'>
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
                                {formatDate(contract.startDate)}
                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                                {t(dateFormat(contract.startDate, 'dddd'))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <h2 className='opacity-60 capitalize mb-3'>{t("Booking Time")}</h2>
                <div className='flex gap-4'>
                    <div>

                        <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='opacity-85 text-base'>
                                {formatTime(contract.startDate)}
                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                            {t(dateFormat(contract.startDate, 'dddd'))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    </section>   
    <section className='grid md:grid-cols-2 w-full'>
            <div className='w-full'>
                <h2 className='opacity-60 capitalize mb-3'>{t("Deadline Date")}</h2>
                <div className='flex gap-4'>
                    <div>

                        <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='opacity-85 text-base'>
                                {formatDate(contract.deadline)}

                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                                {t(dateFormat(contract.deadline, 'dddd'))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <h2 className='opacity-60 capitalize mb-3'>{t("Deadline Time")}</h2>
                <div className='flex gap-4'>
                    <div>

                        <div className='bg-[#e8f1fd] dark:bg-[#3183ed1f] rounded-xl p-3 mb-4'>
                            <Icon name={"bag"} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className='opacity-85 text-base'>
                                {formatTime(contract.deadline)}
                            </span>
                        </div>
                        <div>
                            <span className='text-xs text-[#747688]'>
                            {t(dateFormat(contract.deadline, 'dddd'))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    </section>   
    {/* <section className='grid grid-cols-1 w-full'>
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
    </section>    */}
    {/* <section className='grid md:grid-cols-2 w-full'>
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
                                {dateFormat(contract.appointmentDate, 'utc:d mmmm , yyyy')}
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
    </section>    */}
    
    </>  
} 
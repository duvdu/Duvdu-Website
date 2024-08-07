
import Icon from '../Icons';
import Popup from '../elements/popup';
import { useTranslation } from 'react-i18next';

function Report_sent_successfully() {
    const { t } = useTranslation();

    return (
        <>
              <Popup id='Report-sent-successfully'>
                <div className="flex flex-col justify-center w-full sm:w-[604px] h-full my-14">
                    <div className="heading_s1 mb-[88px] text-center">
                        <div className="flex w-full justify-center">
                            <Icon name={"done"} className="mb-9" />
                        </div>
                        <h1 className="text-3xl font-semibold my-5">{t("Report sent successfully")}</h1>
                        <p className=''>Your report will be revised manually by one
                            of our team & we’ll get back to you soon.</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button data-popup-dismiss="popup" className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">{t("close")}</button>
                    </div>
                </div>
            </Popup>
          
        </>
    );
}

export default Report_sent_successfully;



import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'
import { useTranslation } from 'react-i18next';


function Receive_project_files() {
    const { t } = useTranslation();
    return (
        <>
            <Popup id="receive_project_files" header={"project files"}>
                
                    <div className='max-w-[400px] mb-32 pt-7'>
                        <section>
                            <a href='https://google.drive.com/aislfahe438alljjaislfahe438alljjaislfahe438alljjaislfahe438alljj' target="_blank">

                            <div className="w-full border border-primary bg-[#1a73eb33] rounded-3xl border-black border-opacity-10 mt-4 p-4 text-primary font-bold text-base overflow-hidden overflow-ellipsis" >
                                https://google.drive.com/aislfahe438alljjaislfahe438alljjaislfahe438alljjaislfahe438alljj
                            </div>
                            </a>
                            <p className="opacity-50 mt-3">{t("Click on the link to view the final files before confirming")}</p>
                        </section>
                        <section>
                            <p className="capitalize opacity-60 mt-11">{t("Notes")}</p>
                            <div className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 p-5" >{t("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt")}</div>
                        </section>
                    </div>
                    <div className='flex gap-3 sm:gap-7 mb-10'>
                        <Button className="w-full max-w-[345px]" shadow={true} shadowHeight={"14"}>
                            <span className='text-white font-bold capitalize text-lg'>{t("submit")}</span>
                        </Button>
                        <button data-popup-dismiss="popup" className="rounded-full border-2 border-solid border-[#EB1A40] w-full max-w-[345px] h-[66px] text-[#EB1A40] text-lg font-bold">{t("reject")}</button>
                    </div>
            </Popup>

        </>
    );
}

export default Receive_project_files;

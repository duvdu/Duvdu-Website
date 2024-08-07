

import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'
import { useTranslation } from 'react-i18next';


function Uploading_project_files() {
    const { t } = useTranslation();
    return (
        <>
            <Popup id="uploading_project_files" header={"Uploading Project Files"}>
                <div className='flex flex-col justify-center items-center p-0 sm:px-52 '>
                    <div className='max-w-[400px]'>
                        <section>
                            <p className="capitalize opacity-60 mt-11">{t("add project link")}</p>
                            <input placeholder={t("example: google drive link...")} className="google-drive-link bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 sm:w-96 mt-4 p-4 placeholder:capitalize placeholder:opacity-30 placeholder:text-DS_black" />
                        </section>
                        <section>
                            <p className="capitalize opacity-60 mt-11">Note <span className='opacity-30 text-xs '>{t("“optional”")}</span></p>
                            <textarea placeholder={t("start typing...")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-44 placeholder:capitalize placeholder:opacity-30 placeholder:text-DS_black" />
                        </section>
                        <p className="capitalize opacity-50 mx-14 text-center">{t("if you are uploading before deadling loriem aplusim")}</p>
                        <Button className="w-full mb-7 mt-11" shadow={true} shadowHeight={"14"}>
                            <span className='text-white font-bold capitalize text-lg'>{t("submit")}</span>
                        </Button>
                    </div>
                </div>
            </Popup>

        </>
    );
}

export default Uploading_project_files;

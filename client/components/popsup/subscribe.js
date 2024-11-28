

import Button from '../elements/button';
import Icon from '../Icons'
import { useTranslation } from 'react-i18next';
import Link from "next/link";

function Popup({ isfree = false }) {
    const { t } = useTranslation();
    return (
        <>
            <div id={`subscribe-${isfree ? 'free' : 'notfree'}`} className="popup z-30 ">
                <div data-popup-dismiss="popup" className="flex overlay blur" ></div>
                <div className='card overflow-hidden bg-[#F7F9FB] dark:bg-[#131313] bg-no-repeat relative sm:w-auto sm:mx-auto w-full mx-5' style={{ backgroundImage: "url(assets/imgs/authswiper/login-3.png)" }}>
                    <div className='flex gap-3 absolute top-5 left-5'>
                        <div data-popup-dismiss="popup" className='flex rounded-full border p-3 border-white border-opacity-50 bg-[#FFFFFF1A] blur-4px cursor-pointer justify-center items-center'>
                            <Icon name={'xmark'} className='w-6 h-6 text-white' />
                        </div>
                    </div>
                    {/* <div className='lg:w-[670px] h-[213px] verify-linear'></div> */}

                    <div className='lg:w-[670px] bg-[#F7F9FB] dark:bg-[#131313] mt-[400px]'>
                        <div className='w-full h-[213px] absolute -translate-y-full verify-linear' />
                        {isfree ? <StartFree /> : <Subscribe />}
                    </div>
                </div>
            </div>
        </>
    );
}

const StartFree = () => {
    const { t } = useTranslation();

    return (
        <div className='p-7 flex flex-col justify-center items-center'>
            <div className='max-w-[450px] flex flex-col justify-center items-center'>
                <h1 className='text-primary text-3xl font-extrabold capitalize text-center'>{t("access 5 free contracts")}</h1>
                <p className='opacity-60 text-lg font-semibold mt-3 text-center'>{t("Enjoy 5 contracts for free, and then we have a subscription plan to access more.")}</p>
                <span className='text-primary text-lg capitalize line-through text-center mt-11 mb-4'>
                    $17.99
                    <span className='opacity-70 text-primary'>{t("/for 5 contracts")}</span>
                </span>
                <Button className="w-full mb-7" shadow={true} shadowHeight={"14"}>
                    <span className='text-white font-bold capitalize text-lg'>{t("start free trial")}</span>
                </Button>
            </div>
            <Link href="/terms_conditions">
                <span className="text-DS_black text-sm opacity-50 cursor-pointer" >{t("terms & conditions")}</span>
            </Link>
        </div>

    )
}
const Subscribe = () => {  
      const { t } = useTranslation();

    return (
        <div className='p-7 flex flex-col justify-center items-center'>
            <div className='max-w-[450px] flex flex-col justify-center items-center'>
                <h1 className='text-primary text-3xl font-extrabold capitalize text-center'>{t("access 5 free contracts")}</h1>
                <p className='opacity-60 text-lg font-semibold mt-3 text-center'>{t("Enjoy 5 contracts for free, and then we have a subscription plan to access more.")}</p>
                <span className='text-primary text-lg capitalize text-center mt-11 mb-4'>
                    $17.99
                    <span className='opacity-70 text-primary'>{t("/for 5 contracts")}</span>
                </span>
                <Button className="w-full mb-7" shadow={true} shadowHeight={"14"}>
                    <span className='text-white font-bold capitalize text-lg'>{t("subscribe now")}</span>
                </Button>
            </div>
            <Link href="/terms_conditions">
                <span className="text-DS_black text-sm opacity-50 cursor-pointer" >{t("terms & conditions")}</span>
            </Link>
        </div>

    )
}


export default Popup;



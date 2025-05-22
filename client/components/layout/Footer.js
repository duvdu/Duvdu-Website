import React from "react";
import Link from "next/link"
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';

const Footer = ({isDark}) => {
    const { t } = useTranslation();
    return (
        <>
            <footer className="main">
                <div className='bg-[#F2F2F3] dark:bg-[#1A1A1A] py-5 border-t-2 border-t-[#0000001a]'>
                    <div className='container flex flex-col gap-5 md:flex-row items-center justify-between'>
                        <p className='text-3xl md:w-1/3 lg:w-1/w'>{t('Got something on your mind? Hit us up now')}</p>
                        <Link href='/contact_us'>
                            <button className='py-5 px-10 rounded-full text-xl font-semibold text-white bg-[#1A73EB]'>
                                {t('Leave us a Message')}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='bg-[#263257] py-5'>
                    <div className='container flex gap-5 flex-col md:flex-row items-center justify-between'>
                        <div className="logo logo-width-1 ltr:mr-12 rtl:ml-12 cursor-pointer">
                            <Link href="/">
                                <img
                                    src={isDark ? "/assets/imgs/theme/logo-footer.svg" : "/assets/imgs/theme/logo-footer.svg"}
                                    className="min-h-9 cursor-pointer"
                                    alt="main logo"
                                />
                            </Link>
                        </div>
                        <div className='flex flex-col md:self-start gap-2'>
                            <Link href="/about">
                                <div className="flex items-center gap-2 text-white opacity-60 cursor-pointer">
                                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5303 6.84869C14.8232 6.5558 14.8232 6.08092 14.5303 5.78803L9.75736 1.01506C9.46447 0.722166 8.98959 0.722166 8.6967 1.01506C8.40381 1.30795 8.40381 1.78283 8.6967 2.07572L12.9393 6.31836L8.6967 10.561C8.40381 10.8539 8.40381 11.3288 8.6967 11.6217C8.98959 11.9146 9.46447 11.9146 9.75736 11.6217L14.5303 6.84869ZM0 6.31836L-6.55671e-08 7.06836L14 7.06836L14 6.31836L14 5.56836L6.55671e-08 5.56836L0 6.31836Z" fill="white"/>
                                    </svg>
                                    <span className='text-white opacity-60'>{t('About Us')}</span>
                                </div>
                            </Link>
                            <Link href="/contact_us">
                                <div className="flex items-center gap-2 text-white opacity-60 cursor-pointer">
                                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5303 6.84869C14.8232 6.5558 14.8232 6.08092 14.5303 5.78803L9.75736 1.01506C9.46447 0.722166 8.98959 0.722166 8.6967 1.01506C8.40381 1.30795 8.40381 1.78283 8.6967 2.07572L12.9393 6.31836L8.6967 10.561C8.40381 10.8539 8.40381 11.3288 8.6967 11.6217C8.98959 11.9146 9.46447 11.9146 9.75736 11.6217L14.5303 6.84869ZM0 6.31836L-6.55671e-08 7.06836L14 7.06836L14 6.31836L14 5.56836L6.55671e-08 5.56836L0 6.31836Z" fill="white"/>
                                    </svg>
                                    <span className='text-white opacity-60'>{t(`Let's Talk`)}</span>
                                </div>
                            </Link>
                            {/* <Link href="/blog">
                                <div className="flex items-center gap-2 text-white opacity-60 cursor-pointer">
                                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5303 6.84869C14.8232 6.5558 14.8232 6.08092 14.5303 5.78803L9.75736 1.01506C9.46447 0.722166 8.98959 0.722166 8.6967 1.01506C8.40381 1.30795 8.40381 1.78283 8.6967 2.07572L12.9393 6.31836L8.6967 10.561C8.40381 10.8539 8.40381 11.3288 8.6967 11.6217C8.98959 11.9146 9.46447 11.9146 9.75736 11.6217L14.5303 6.84869ZM0 6.31836L-6.55671e-08 7.06836L14 7.06836L14 6.31836L14 5.56836L6.55671e-08 5.56836L0 6.31836Z" fill="white"/>
                                    </svg>
                                    <span className='text-white opacity-60'>{t('Blog')}</span>
                                </div>
                            </Link> */}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Link href="/terms_conditions">
                                <div className="flex items-center gap-2 text-white opacity-60 cursor-pointer">
                                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5303 6.84869C14.8232 6.5558 14.8232 6.08092 14.5303 5.78803L9.75736 1.01506C9.46447 0.722166 8.98959 0.722166 8.6967 1.01506C8.40381 1.30795 8.40381 1.78283 8.6967 2.07572L12.9393 6.31836L8.6967 10.561C8.40381 10.8539 8.40381 11.3288 8.6967 11.6217C8.98959 11.9146 9.46447 11.9146 9.75736 11.6217L14.5303 6.84869ZM0 6.31836L-6.55671e-08 7.06836L14 7.06836L14 6.31836L14 5.56836L6.55671e-08 5.56836L0 6.31836Z" fill="white"/>
                                    </svg>
                                    <span className='text-white opacity-60'> {t('Terms & Conditions')}</span>
                                </div>
                            </Link>
                            <Link href="/refund_policy">
                                <div className="flex items-center gap-2 text-white opacity-60 cursor-pointer">
                                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5303 6.84869C14.8232 6.5558 14.8232 6.08092 14.5303 5.78803L9.75736 1.01506C9.46447 0.722166 8.98959 0.722166 8.6967 1.01506C8.40381 1.30795 8.40381 1.78283 8.6967 2.07572L12.9393 6.31836L8.6967 10.561C8.40381 10.8539 8.40381 11.3288 8.6967 11.6217C8.98959 11.9146 9.46447 11.9146 9.75736 11.6217L14.5303 6.84869ZM0 6.31836L-6.55671e-08 7.06836L14 7.06836L14 6.31836L14 5.56836L6.55671e-08 5.56836L0 6.31836Z" fill="white"/>
                                    </svg>
                                    <span className='text-white opacity-60'>{t('Refund Policy')}</span>
                                </div>
                            </Link>
                            <Link href="/privacy_policy">
                                <div className="flex items-center gap-2 text-white opacity-60 cursor-pointer">
                                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.5303 6.84869C14.8232 6.5558 14.8232 6.08092 14.5303 5.78803L9.75736 1.01506C9.46447 0.722166 8.98959 0.722166 8.6967 1.01506C8.40381 1.30795 8.40381 1.78283 8.6967 2.07572L12.9393 6.31836L8.6967 10.561C8.40381 10.8539 8.40381 11.3288 8.6967 11.6217C8.98959 11.9146 9.46447 11.9146 9.75736 11.6217L14.5303 6.84869ZM0 6.31836L-6.55671e-08 7.06836L14 7.06836L14 6.31836L14 5.56836L6.55671e-08 5.56836L0 6.31836Z" fill="white"/>
                                    </svg>
                                    <span className='text-white opacity-60'>{t('Privacy Policy')}</span>
                                </div>
                            </Link>
                        </div>
                        <div className=" flex gap-x-4">
                            <a href="https://www.instagram.com/duvdu_app?igsh=MWxtM2ZoaTFtajB1Zg==" className="hover:text-blue-500">
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.3184C0 7.4818 7.16344 0.318359 16 0.318359C24.8366 0.318359 32 7.4818 32 16.3184C32 25.1549 24.8366 32.3184 16 32.3184C7.16344 32.3184 0 25.1549 0 16.3184ZM16 8.31836C20.4 8.31836 24 11.9184 24 16.3184C24 20.3184 21.1 23.7184 17.1 24.3184V18.6184H19L19.4 16.3184H17.2V14.8184C17.2 14.2184 17.5 13.6184 18.5 13.6184H19.5V11.6184C19.5 11.6184 18.6 11.4184 17.7 11.4184C15.9 11.4184 14.7 12.5184 14.7 14.5184V16.3184H12.7V18.6184H14.7V24.2184C10.9 23.6184 8 20.3184 8 16.3184C8 11.9184 11.6 8.31836 16 8.31836Z" fill="white"/>
                                    </g>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/duvdu_app?igsh=MWxtM2ZoaTFtajB1Zg==" className="hover:text-blue-500">
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5">
                                        <path d="M16 19.1184C14.5 19.1184 13.2 17.9184 13.2 16.3184C13.2 14.8184 14.4 13.5184 16 13.5184C17.5 13.5184 18.8 14.7184 18.8 16.3184C18.8 17.8184 17.5 19.1184 16 19.1184Z" fill="white"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4 9.51836H12.6C11.8 9.61836 11.4 9.71836 11.1 9.81836C10.7 9.91836 10.4 10.1184 10.1 10.4184C9.86261 10.6557 9.75045 10.8931 9.61489 11.1801C9.57916 11.2557 9.5417 11.3349 9.5 11.4184C9.48453 11.4648 9.46667 11.5136 9.44752 11.5659C9.34291 11.8517 9.2 12.2421 9.2 12.9184V19.7184C9.3 20.5184 9.4 20.9184 9.5 21.2184C9.6 21.6184 9.8 21.9184 10.1 22.2184C10.3374 22.4557 10.5748 22.5679 10.8617 22.7035C10.9374 22.7392 11.0165 22.7766 11.1 22.8184C11.1464 22.8338 11.1952 22.8517 11.2475 22.8708C11.5333 22.9754 11.9238 23.1184 12.6 23.1184H19.4C20.2 23.0184 20.6 22.9184 20.9 22.8184C21.3 22.7184 21.6 22.5184 21.9 22.2184C22.1374 21.981 22.2495 21.7436 22.3851 21.4567C22.4209 21.381 22.4583 21.3018 22.5 21.2184C22.5155 21.1719 22.5333 21.1231 22.5525 21.0708C22.6571 20.785 22.8 20.3946 22.8 19.7184V12.9184C22.7 12.1184 22.6 11.7184 22.5 11.4184C22.4 11.0184 22.2 10.7184 21.9 10.4184C21.6626 10.181 21.4252 10.0688 21.1383 9.93324C21.0627 9.89754 20.9833 9.86003 20.9 9.81836C20.8536 9.80289 20.8048 9.78502 20.7525 9.76588C20.4667 9.66126 20.0762 9.51836 19.4 9.51836ZM16 12.0184C13.6 12.0184 11.7 13.9184 11.7 16.3184C11.7 18.7184 13.6 20.6184 16 20.6184C18.4 20.6184 20.3 18.7184 20.3 16.3184C20.3 13.9184 18.4 12.0184 16 12.0184ZM21.4 11.9184C21.4 12.4706 20.9523 12.9184 20.4 12.9184C19.8477 12.9184 19.4 12.4706 19.4 11.9184C19.4 11.3661 19.8477 10.9184 20.4 10.9184C20.9523 10.9184 21.4 11.3661 21.4 11.9184Z" fill="white"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.3184C0 7.4818 7.16344 0.318359 16 0.318359C24.8366 0.318359 32 7.4818 32 16.3184C32 25.1549 24.8366 32.3184 16 32.3184C7.16344 32.3184 0 25.1549 0 16.3184ZM12.6 8.01836H19.4C20.3 8.11836 20.9 8.21836 21.4 8.41836C22 8.71836 22.4 8.91836 22.9 9.41836C23.4 9.91836 23.7 10.4184 23.9 10.9184C24.1 11.4184 24.3 12.0184 24.3 12.9184V19.7184C24.2 20.6184 24.1 21.2184 23.9 21.7184C23.6 22.3184 23.4 22.7184 22.9 23.2184C22.4 23.7184 21.9 24.0184 21.4 24.2184C20.9 24.4184 20.3 24.6184 19.4 24.6184H12.6C11.7 24.5184 11.1 24.4184 10.6 24.2184C10 23.9184 9.6 23.7184 9.1 23.2184C8.6 22.7184 8.3 22.2184 8.1 21.7184C7.9 21.2184 7.7 20.6184 7.7 19.7184V12.9184C7.8 12.0184 7.9 11.4184 8.1 10.9184C8.4 10.3184 8.6 9.91836 9.1 9.41836C9.6 8.91836 10.1 8.61836 10.6 8.41836C11.1 8.21836 11.7 8.01836 12.6 8.01836Z" fill="white"/>
                                    </g>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/duvdu_app?igsh=MWxtM2ZoaTFtajB1Zg==" className="hover:text-blue-500">
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5">
                                        <path d="M18.6 16.3184L14.4 13.9184V18.7184L18.6 16.3184Z" fill="white"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.3184C0 7.4818 7.16344 0.318359 16 0.318359C24.8366 0.318359 32 7.4818 32 16.3184C32 25.1549 24.8366 32.3184 16 32.3184C7.16344 32.3184 0 25.1549 0 16.3184ZM22.2 11.0184C22.9 11.2184 23.4 11.7184 23.6 12.4184C24 13.7184 24 16.3184 24 16.3184C24 16.3184 24 18.9184 23.7 20.2184C23.5 20.9184 23 21.4184 22.3 21.6184C21 21.9184 16 21.9184 16 21.9184C16 21.9184 10.9 21.9184 9.7 21.6184C9 21.4184 8.5 20.9184 8.3 20.2184C8 18.9184 8 16.3184 8 16.3184C8 16.3184 8 13.7184 8.2 12.4184C8.4 11.7184 8.90001 11.2184 9.60001 11.0184C10.9 10.7184 15.9 10.7184 15.9 10.7184C15.9 10.7184 21 10.7184 22.2 11.0184Z" fill="white"/>
                                    </g>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/duvdu_app?igsh=MWxtM2ZoaTFtajB1Zg==" className="hover:text-blue-500">
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.3184C0 7.4818 7.16344 0.318359 16 0.318359C24.8366 0.318359 32 7.4818 32 16.3184C32 25.1549 24.8366 32.3184 16 32.3184C7.16344 32.3184 0 25.1549 0 16.3184ZM8.2 13.6184V24.3184H11.6V13.6184H8.2ZM8 10.2184C8 11.3184 8.8 12.1184 9.9 12.1184C11 12.1184 11.8 11.3184 11.8 10.2184C11.8 9.11836 11 8.31836 9.9 8.31836C8.9 8.31836 8 9.11836 8 10.2184ZM20.6 24.3184H23.8V17.7184C23.8 14.4184 21.8 13.3184 19.9 13.3184C18.2 13.3184 17 14.4184 16.7 15.1184V13.6184H13.5V24.3184H16.9V18.6184C16.9 17.1184 17.9 16.3184 18.9 16.3184C19.9 16.3184 20.6 16.8184 20.6 18.5184V24.3184Z" fill="white"/>
                                    </g>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <p className='text-center text-white mt-5'>© Copyright main street company 2025</p>
                </div>
            </footer>
        </>
    );
};
const mapStateToProps = (state) => ({
    isDark: state.setting.ISDARK,
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);

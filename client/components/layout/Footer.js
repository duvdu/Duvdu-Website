import React from "react";
import Link from "next/link"
import Icon from "../Icons";
import { connect } from "react-redux";

const Footer = ({isDark}) => {
    return (
        <>
            <footer className="main">
                <div className=''>
                </div>
                <div className='bg-[#263257] py-10'>
                    <div className='container flex items-center justify-between'>
                        <div className="logo logo-width-1 ltr:mr-12 rtl:ml-12 cursor-pointer">
                            <Link href="/">
                                <img
                                    src={isDark ? "/assets/imgs/theme/logo-footer.svg" : "/assets/imgs/theme/logo-footer.svg"}
                                    className="min-h-9 cursor-pointer"
                                    alt="main logo"
                                />
                            </Link>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link href="/about" className=""><span className='text-white opacity-60'>About Us</span></Link>
                            <Link href="/contact_us" className=""><span className='text-white opacity-60'>Let's Talk</span></Link>
                            <Link href="/blog" className=""><span className='text-white opacity-60'>Blog</span></Link>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Link href="/about" className=""><span className='text-white opacity-60'>About Us</span></Link>
                            <Link href="/contact_us" className=""><span className='text-white opacity-60'>Let's Talk</span></Link>
                            <Link href="/blog" className=""><span className='text-white opacity-60'>Blog</span></Link>
                        </div>
                        <div className=" flex gap-x-4">
                            <a href="#" className="hover:text-blue-500"><Icon type={'fab'} name={"facebook"} className="mx-1 bg-black text-white" /></a>
                            <a href="#" className="hover:text-blue-500"><Icon type={'fab'} name={"instagram"} className="mx-1 text-white" /></a>
                            <a href="#" className="hover:text-blue-500"><Icon type={'fab'} name={"youtube"} className="mx-1 text-white" /></a>
                            <a href="#" className="hover:text-blue-500"><Icon type={'fab'} name={"linkedin"} className="mx-1 text-white" /></a>
                        </div>
                    </div>
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

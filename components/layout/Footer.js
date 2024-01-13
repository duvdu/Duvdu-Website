import React from "react";
import Link from "next/link"

const Footer = () => {
    return (
        <>
            <footer className="main">

                <div className="footer-bottom"></div>
                <section className="section-padding footer-mid">
                    <div className="container pt-15 pb-20">
                        <div className="row">
                            <div className="col">
                                <div
                                    className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0  wow animate__animated animate__fadeInUp"
                                    data-wow-delay="0"
                                >
                                    <div className="logo  mb-30">
                                        <Link href="/"><a className="mb-15">
                                            <img
                                                src="/assets/imgs/theme/logo.svg"
                                                alt="logo"
                                            />
                                        </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".1s"
                            >
                                <h4 className="widget-title">Company</h4>
                                <ul className="footer-list  mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="#">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Delivery Information</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms &amp; Conditions</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Support Center</a>
                                    </li>
                                    <li>
                                        <a href="#">Careers</a>
                                    </li>
                                </ul>

                            </div>
                            <div
                                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".2s"
                            >
                                <h4 className="widget-title ">title</h4>
                                <ul className="footer-list  mb-sm-5 mb-md-0"></ul>

                            </div>
                            <div
                                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".3s"
                            >
                                <h4 className="widget-title ">title</h4>
                                <ul className="footer-list  mb-sm-5 mb-md-0"></ul>

                            </div>
                            <div
                                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".4s"
                            >
                                <h4 className="widget-title ">title</h4>
                                <ul className="footer-list  mb-sm-5 mb-md-0"></ul>
                            </div>
                            <div
                                className="footer-link-widget widget-install-app col  wow animate__animated animate__fadeInUp"
                                data-wow-delay=".5s"
                            >
                                <h4 className="widget-title ">Install App</h4>
                                <p className="">From App Store or Google Play</p>
                                <div className="download-app ">
                                    <a
                                        href="#"
                                        className="hover-up mb-sm-2 mb-lg-0"
                                    >
                                        <img
                                            className="active"
                                            src="/assets/imgs/theme/app-store.jpg"
                                            alt=""
                                        />
                                    </a>
                                    <a href="#" className="hover-up mb-sm-2">
                                        <img
                                            src="/assets/imgs/theme/google-play.jpg"
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <p className="mb-20 ">Secured Payment Gateways</p>
                                <img
                                    className=""
                                    src="/assets/imgs/theme/payment-method.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    );
};

export default Footer;

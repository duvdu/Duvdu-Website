import Link from "next/link";
import { useState } from "react";


const MobileMenu = ({ isToggled, toggleClick }) => {
    
    return (
        <>
            <div
                className={
                    isToggled
                        ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
                        : "mobile-header-active mobile-header-wrapper-style"
                }
            >
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-top">
                        <div className="mobile-header-logo">
                            <Link href="/">
                                <a>
                                    <img
                                        src="/assets/imgs/theme/logo.svg"
                                        alt="logo"
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="mobile-menu-close ">
                            <button
                                onClick={toggleClick}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="mobile-search search-style-3 mobile-header-border">
                            <form action="#">
                                <input
                                    type="text"
                                    placeholder="Search for items…"
                                />
                                <button type="submit">
                                    <i className="fi-rs-search"></i>
                                </button>
                            </form>
                        </div>
                        <a href="/saved">saved</a>
                        <br/>
                        <a href="/payment">payment</a>
                        <br/>
                        <a href="/dashboard">dashboard</a>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;

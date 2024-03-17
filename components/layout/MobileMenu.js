import Link from "next/link";
import { useState } from "react";
import Icon from "../Icons";
import headerMen from '../../public/static/header_content.json';


const MobileMenu = ({ isToggled, toggleClick }) => {
    
    const [openSearch, setOpenSearch] = useState(false);
    
    const toggleOpenSearch = () => setOpenSearch(prev => !prev)
    

    return (
        <>
            <div
                className={
                    isToggled
                        ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
                        : "mobile-header-active mobile-header-wrapper-style"
                }
            >
                <div className="h-full scroll-w-0 scroll-m-0 overflow-y-scroll">
                    <Header onClick={toggleClick} toggleOpenSearch={toggleOpenSearch} />
                    {openSearch &&
                        <>
                            <Tabs />
                            <Menu />
                            <Auth />
                        </>
                    }
                    {!openSearch &&
                        <SearchBody />
                    }
                </div>
            </div>
        </>
    );
};



const SearchBody = () => <div className="h-body bg-[#F7F9FB]" />
const Header = ({ onClick , toggleOpenSearch }) =>
    <div className="flex items-center px-5 py-2 border-b">
        <div className="flex justify-start w-full">
            <Link href="/">
                <a>
                    <img className="w-40" src="/assets/imgs/theme/logo.svg" alt="logo" />
                </a>
            </Link>
        </div>

        <div className="flex items-center justify-center gap-2">
            <Icon className="cursor-pointer" name={'search-menu'} onClick={toggleOpenSearch}/>
            <Icon className="cursor-pointer" name={'xmark-menu'} onClick={onClick} />
        </div>
    </div>



const Tabs = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-11 py-10 border-b">

            {
                [
                    {
                        url: '/dashboard',
                        icon: 'dashboard',
                        name: 'dashboard',
                    },
                    {
                        url: '/contracts',
                        icon: 'contracts',
                        name: 'contracts',
                    },
                    {
                        url: '/teams',
                        icon: 'saved',
                        name: 'team projects',
                    },
                ].map((item, index) =>
                    <a key={index} href={item.url} className="flex gap-1">
                        <Icon name={item.icon} />
                        <span className="text-base font-bold capitalize text-[#3E3E3E]">{item.name}</span>
                    </a>
                )
            }
        </div>
    )
}
const Menu = () => {
    const [openCategories, setOpenCategories] = useState(null);
    const [openSubCategories, setOpenSubCategories] = useState(null);

    const toggleCategory = (category) => {
        setOpenCategories(prev => prev == category ? null : category)
        setOpenSubCategories(null);
    };

    const toggleSubcategory = (subcategory) => {
        setOpenSubCategories(prev => prev == subcategory ? null : subcategory)

    };

    return (
        <ul>
            {headerMen.map((category, index) => {
                const isOurStation = openCategories && openCategories.category === category.category; // Check for null
                let h = 0;
                let maxh = isOurStation ? category.subcategories.length * 64 + (openSubCategories ? openSubCategories.items.length * 64 : 0) : 0

                return (
                    <li key={index} className="cursor-pointer">
                        <div className="flex w-full justify-between items-center p-5" onClick={() => toggleCategory(category)}>
                            <div className="w-3" />
                            <span className="text-[#4F5E7B] font-semibold text-sm">
                                {category.category}
                            </span>

                            <div className={`transition-all duration-300 ${isOurStation ? 'rotate-90' : 'rotate-0'}`}>
                                <SpeficIcon name={`${isOurStation ? 'minus' : 'plus'}`} />
                            </div>
                        </div>
                        <ul className="transition-all duration-300 overflow-hidden"
                            style={{ maxHeight: maxh }}
                        >
                            {category.subcategories.map((subcategory, subIndex) => {

                                const isOurStation = openSubCategories && openSubCategories.title === subcategory.title;

                                return (
                                    <li key={subcategory.title} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleSubcategory(subcategory) }}>
                                        <div className="flex w-full  bg-[#F7F9FB] justify-between items-center p-5">
                                            <div className="text-[#4F5E7B] font-semibold text-sm">
                                                {subcategory.title}
                                            </div>
                                            <Icon className={`text-[#B4BBC8] text-lg transform transition-all duration-300 ${isOurStation ? 'rotate-180' : ''}`} name={'angle-down-menu'} />
                                        </div>
                                        <ul className="transition-all duration-300 overflow-hidden"
                                            style={{ maxHeight: isOurStation ? subcategory.items.length * 64 : 0 }}
                                        >
                                            {subcategory.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="p-5 bg-[#E6E9ED]">{item}</li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            }
                            )}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
};

const Auth = () =>
    <div className="flex mx-5 gap-3 my-8">
        <a href="/login" className="flex justify-center items-center w-full aspect-[3.1] rounded-full border border-[#00000033] text-primary text-sm font-semibold"> log-in </a>
        <a href="/register" className="flex justify-center items-center w-full aspect-[3.1] rounded-full bg-primary text-white font-semibold text-sm"> register </a>
    </div>



const SpeficIcon = ({ name }) => {
    return (
        <div className="size-4 flex justify-center items-center">
            <div className="relative">
                <div className="-translate-x-[.85px] absolute top-0 left-0 w-[1.7px] h-[6px] bg-[#B4BBC8]"></div>    {/* top */}
                <div className={`translate-y-[.85px] absolute bottom-0 left-0 h-[1.7px] w-[6px] transform transition-all duration-300 ${name === 'minus' ? "bg-transparent" : "bg-[#B4BBC8]"}`}></div>     {/* left */}

                <div className="-translate-x-[.85px] absolute bottom-0 left-0 w-[1.7px] h-[6px] bg-[#B4BBC8]"></div> {/* bottom */}
                <div className={`translate-y-[.85px] absolute bottom-0 right-0 h-[1.7px] w-[6px] transform transition-all duration-300 ${name === 'minus' ? "bg-transparent" : "bg-[#B4BBC8]"}`}></div>     {/* right */}
            </div>
        </div>
    );
};


export default MobileMenu;

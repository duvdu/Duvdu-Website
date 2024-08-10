import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { connect } from "react-redux";

const Search = ({categories , close}) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const router = useRouter();
    const searchquery = router.query.search;

    const getSubCategories = () => {
        return categories.flatMap(category =>
            category.subCategories.map(subCategory => ({
                ...subCategory,
                cycle: category.cycle
            }))
        );
    };
    
    const cycle = (value) => {
      return value  
    };
    
    useEffect(() => {
        const storedHistory = localStorage.getItem("searchHistory");
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    useEffect(() => {
        if (searchquery) {
            setSearchTerm(searchquery);
        }
    }, [searchquery]);

    const handleSearch = () => {
        if (searchTerm) {
            const updatedHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 10); // Keep last 10 unique terms
            setSearchHistory(updatedHistory);
            localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        }

        router.push({
            pathname: "project",
            query: searchTerm ? { search: searchTerm } : {},
        });
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleFocus = (visible) => {
        setSearchDropdownVisible(visible);
    };
    const subCategories = getSubCategories().slice(0,10)
    return (
        <>
            <div className="flex gap-2 h-14">
                <input
                    className="searchInput border dark:border-gray-600 bg-[#EAEEF0] dark:bg-[#1A2024] w-full text-lg placeholder:text-[#94A6C2]"
                    value={searchTerm || ""}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => handleFocus(true)}
                    onBlur={() => setTimeout(() => handleFocus(false), 200)}
                    onKeyDown={handleInput}
                    type="text"
                    placeholder={`${t("Search")}...`}
                />
            </div>
            <div >
                <h4 className="text-lg font-medium opacity-80 mt-12 mb-5" href="#">{t("Search History")}</h4>
                <ul className="flex flex-wrap gap-2">
                    {subCategories.map((item, index) => (
                        <li className="text-base px-3 py-1 opacity-80 font-medium border-[1.5px] border-[#0000004d] dark:border-[#FFFFFF4D] rounded-full" key={index} onClick={close}>
                            <Link href={item ? `/${cycle(item.cycle)}?subcategory=${item._id}` : '/project'}>
                                <div className="cursor-pointer text-[#000000BF] dark:text-[#FFFFFFBF] capitalize">{item.title}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
};


const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = {
    
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);

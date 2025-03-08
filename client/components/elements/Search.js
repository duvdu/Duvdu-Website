import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { connect } from "react-redux";

const Search = ({categories , onSearch}) => {
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
    const subCategories = getSubCategories().slice(0,10)

    useEffect(() => {
        const storedHistory = localStorage.getItem("searchHistory");
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);
    useEffect(() => {
        setSearchTerm(searchquery)
        onSearch()
    }, [searchquery]);
    const handleSearch = () => {
        if (searchTerm) {
            const updatedHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 10); // Keep last 10 unique terms
            localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        }
        const query = searchTerm ? { search: searchTerm } : {};
        
        router.push({
            pathname: "/search/",
            query: query,
        });
        document.activeElement.blur();
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    const cycle = (value) => {
        return value  
      };
  

    const handleFocus = (visible) => {
        setSearchDropdownVisible(visible);
    };
    

    return (
        <>
            <input
                className="searchInput bg-transparent border border-[#00000040] dark:border-[#3E3E3E] hover:border-transparent hover:bg-[#EAEEF0] focus:border-2 focus:border-primary focus:bg-transparent w-60 mx-6 text-sm h-9"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => handleFocus(true)}
                onBlur={() => setTimeout(() => handleFocus(false), 200)}
                onKeyDown={handleInput}
                type="text"
                placeholder={t("Search") + "..."}
            />
                {searchDropdownVisible && 
                <div className={` max-w-[400px] active ${localStorage.getItem('lang') == 'Arabic' ?'dialog-history-ar':'dialog-history'}`}>
                <h4 className="text-lg font-medium opacity-80 mt-12 mb-5" href="#">{t("Suggestions")}</h4>
                <ul className="flex flex-wrap gap-2">
                    {subCategories.map((item, index) => (
                    <Link key={index} href={item?`/${cycle(item.cycle)}?subCategory=${item._id}`:'/search'}>
                        <li className="text-base px-3 py-1 opacity-80 font-medium border-[1.5px] border-[#0000004d] dark:border-[#FFFFFF4D] rounded-full">
                                <div className="cursor-pointer text-[#000000BF] dark:text-[#FFFFFFBF] capitalize">{item.title}</div>
                        </li>
                    </Link>
                    ))}
                </ul>
            </div>}
        </>
    );
};
const mapStateToProps = (state) => ({
    categories: state.categories
});
const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

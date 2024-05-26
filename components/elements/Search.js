import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Search = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const router = useRouter();
    const searchquery = router.query.search;

    useEffect(() => {
        const storedHistory = localStorage.getItem("searchHistory");
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);
    useEffect(() => {
        setSearchTerm(searchquery)
    }, [searchquery]);

    const handleSearch = () => {
        if (searchTerm) {
            const updatedHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 10); // Keep last 10 unique terms
            setSearchHistory(updatedHistory);
            localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        }
        router.push({
            pathname: "/",
            query: { search: searchTerm },
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

    return (
        <>
            <input
                className="searchInput bg-transparent border border-[#00000040] dark:border-[#3E3E3E] hover:border-transparent hover:bg-[#EAEEF0] focus:border-2 focus:border-primary focus:bg-transparent w-60 mx-6 text-sm h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => handleFocus(true)}
                onBlur={() => setTimeout(() => handleFocus(false), 200)} // Delay to allow click on history item
                onKeyDown={handleInput}
                type="text"
                placeholder={t("Search") + "..."}
            />
            {searchDropdownVisible && searchHistory.length > 0 && (
                <div className="dialog-history max-w-[300px] active">
                    <ul className="gap-1">
                        {searchHistory.map((item, index) => (
                            <li className="py-1 px-2 border border-[#0000004D] dark:border-[#FFFFFF4D] rounded-full" key={index}>
                                <Link href={`/project?search=${item}`}>
                                    <div className="text-[#3E3E3E] dark:text-[#FFFFFFBF]">{item}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Search;

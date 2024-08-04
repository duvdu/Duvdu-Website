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

    return (
        <>
          <div className="flex gap-2 h-14">
                
                <input
                    className="searchInput border bg-[#EAEEF0] w-full text-lg placeholder:text-[#94A6C2]"
                    value={searchTerm|| ""}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleInput}
                    type="text"
                    placeholder="Search..."
                />
            </div>
            <div >
                <h4 className="text-lg font-medium opacity-80 mt-12 mb-5" href="#">
                    Search History
                </h4>
                <ul className="flex flex-wrap gap-2">
                    {searchDropdownVisible && searchHistory.map((item, index) => (
                        <li className="text-base px-3 py-1 opacity-80 font-medium border-[1.5px] border-[#0000004d] rounded-full" key={index}>
                            <Link href="/">
                                <div className="cursor-pointer text-[#000000BF] capitalize">{item}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <input
                className="searchInput bg-transparent border border-[#00000040] dark:border-[#3E3E3E] hover:border-transparent hover:bg-[#EAEEF0] focus:border-2 focus:border-primary focus:bg-transparent w-60 mx-6 text-sm h-9"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => handleFocus(true)}
                onBlur={() => setTimeout(() => handleFocus(false), 200)}
                onKeyDown={handleInput}
                type="text"
                placeholder={`${t("Search")}...`}
            />
            {searchDropdownVisible && searchHistory.length > 0 && (
                <div className="dialog-history max-w-[300px] active">
                    <ul className="gap-1">
                        {searchHistory.map((item, index) => (
                            <li className="py-1 px-2 border border-[#0000004D] dark:border-[#FFFFFF4D] rounded-full" key={index}>
                                <Link href={item ? `/project?search=${item}` : '/project'}>
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

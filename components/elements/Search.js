import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from 'next/link';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const handleSearch = () => {

        router.push({
            pathname: "/projects",
            query: {
                search: searchTerm,
            },
        });
        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    const handleFocus = (event) => {
        setSearchDropdownVisible(event);
    };


    return (
        <>
            <input
                className="searchInput border border-[#00000040] hover:border-transparent hover:bg-[#EAEEF0] focus:border-2 focus:border-primary focus:bg-transparent w-60 mx-6 text-sm h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}
                onKeyDown={handleInput}
                type="text"
                placeholder="Search..."
            />
            <div className={"dialog-history max-w-[600px] " + (searchDropdownVisible ? "active" : "")}>
                <h4 className="menu-title" href="#">
                    Search History
                </h4>
                <ul>
                    {[
                        "videographer",
                        "fashion model",
                        "fashion model",
                        "director",
                        "executive director",
                        "graphic designer",
                        "graphic designer",
                        "videographer",
                        "fashion model",
                        "director",
                        "fashion model"
                    ].map((item, index) => (
                        <li className="padge" key={index}>
                            <Link href="/">
                                <a>{item}</a>
                            </Link>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};


export default Search;

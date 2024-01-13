import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const handleSearch = () => {
        console.log("click");
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
                className="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}
                onKeyDown={handleInput}
                type="text"
                placeholder="Search"
            />
            <div className={"dialog-history " + (searchDropdownVisible ? "active" : "")}>
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
                                <a href="/">{item}</a>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
};


export default Search;

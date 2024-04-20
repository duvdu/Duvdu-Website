import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from 'next/link';
import Icon from "../Icons";

const Search = ({}) => {
    const [searchTerm, setSearchTerm] = useState("");

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


    return (
        <>
            <div className="flex gap-2 h-14">
                
                <input
                    className="searchInput border bg-[#EAEEF0] w-full text-lg placeholder:text-[#94A6C2]"
                    value={searchTerm}
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
                        <li className="text-base px-3 py-1 opacity-80 font-medium border-[1.5px] border-[#0000004d] rounded-full" key={index}>
                            <Link href="/">
                                <a className="text-[#000000BF] capitalize">{item}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};


export default Search;

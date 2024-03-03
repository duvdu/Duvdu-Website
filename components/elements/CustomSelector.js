import Link from 'next/link';
import Icon from "../Icons";
import { useState } from "react";

const Selector = ({ options, type , iconclassName , className = "", invert = false }) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div className='cursor-pointer'>
            <div onClick={() => setDropdown(!dropdown)} className={className}>
                <Icon name={'ellipsis-vertical'} className={iconclassName+" h-6"} />
                {dropdown && (
                    <div className="absolute top-14 right-0 z-10">
                        <ul className="bg-DS_white border border-gray-500 rounded-sm shadow-md whitespace-nowrap">
                            {options.map((option, index) => (
                                <li key={index} data-popup-toggle="popup" data-popup-target={option.id} className="py-2 px-4 hover:bg-gray-500 cursor-pointer" >{option.value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Selector;

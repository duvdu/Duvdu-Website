import Link from 'next/link';
import Icon from "../Icons";
import { useState } from "react";

const Selector = ({ options, type, className, invert = false }) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div className='cursor-pointer'>
            <div onClick={() => setDropdown(!dropdown)} className={className}>
                <Icon name={'___'} invert={invert} />
                {dropdown && (
                    <div className="absolute top-14 right-0">
                        <ul className="bg-white border border-gray-200 rounded-sm shadow-md whitespace-nowrap">
                            {options.map((option, index) => (
                                <li key={index} className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={option.onclick}>{option.value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Selector;

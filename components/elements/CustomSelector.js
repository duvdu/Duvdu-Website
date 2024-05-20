import { useState } from "react";
import Icon from "../Icons";

const Selector = ({ options, onSelect, iconclassName, className = "", invert = false , children}) => {
    const [dropdown, setDropdown] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setDropdown(false); // Close the dropdown after selecting an option
    };

    return (
        <div className='relative cursor-pointer'>
            <div onClick={() => setDropdown(!dropdown)} className={className}>
                {
                   children || <Icon name={'ellipsis-vertical'} className={iconclassName + " h-6"} />
                }
                {dropdown && (
                    <div className="absolute top-8 right-0 z-10">
                        <ul className="bg-DS_white rounded-sm shadow-md whitespace-nowrap">
                            {options?.map((option, index) => (
                                <li 
                                    key={index} 
                                    className="py-2 px-4 hover:bg-gray-500 cursor-pointer" 
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Selector;

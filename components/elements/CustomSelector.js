import { useState, useRef } from "react";
import Icon from "../Icons";

const Selector = ({ options, onSelect, iconclassName, className = "", children }) => {
    const selectRef = useRef(null);

    const handleIconClick = () => {
        selectRef.current.click();
    };

    const handleChange = (event) => {
        console.log(event.target.value)
        const selectedOption = options.find(option => option.value === event.target.value);
        if (selectedOption) {
            onSelect?.(selectedOption.value);
        }
        
    };

    return (
        <div className={`relative cursor-pointer ${className}`}>
            <div onClick={handleIconClick} className="icon-container">
                {children || <Icon name={'ellipsis-vertical'} className={iconclassName + " h-6"} />}
            </div>
            <select ref={selectRef} onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer">
                {options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Selector;

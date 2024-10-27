import React, { useState, useEffect } from 'react';
import Icon from "../Icons";

const SelectDate = ({ onChange, value }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setCurrentDate(new Date()); // Ensure the current date is set when the component mounts
    }, []);

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value));
        }
        else {
            setSelectedDate(null);
        }
    }, [value]);

    const getMonthDates = (year, month) => {
        const dates = [];
        const firstDay = new Date(year, month, 1);
        firstDay.setHours(10, 0, 0, 0); 
        const lastDay = new Date(year, month + 1, 0);
        lastDay.setHours(10, 0, 0, 0); 
        const startDay = firstDay.getDay();
        const totalDays = lastDay.getDate();
        const tomorrow = new Date();
        tomorrow.setHours(10, 0, 0, 0); 
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowTime = tomorrow.getTime();
    
        // Add leading empty dates for days before the first day of the month
        for (let i = 0; i < startDay; i++) {
            dates.push(null);
        }
    
        // Add the dates for the current month
        for (let i = 1; i <= totalDays; i++) {
            const date = new Date(year, month, i);
            date.setHours(10, 0, 0, 0); // Set hour to 10 AM for each date
            if (date.getTime() >= tomorrowTime) {
                dates.push(date);
            } else {
                dates.push(null);
            }
        }
    
        return dates;
    };
    

    const handleDateClick = (date) => {
        setSelectedDate(date);
        if (onChange) onChange(date.toISOString());
    };

    const handleScroll = (change) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + change);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (newDate >= tomorrow) {
            setCurrentDate(newDate);
        }
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthDates = getMonthDates(year, month);
    const firstFiveNonNullDates = monthDates.filter(date => date !== null).slice(0, 7);

    return (
        <div className="flex flex-col gap-2 items-center date-selector">
                <div className="flex justify-between w-full mb-4">
                <span className="opacity-60 font-medium">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <div className="flex gap-3 items-center font-medium text-[#8A96BC] cursor-pointer text-sm">
                    <button onClick={() => handleScroll(-1)}>
                    <Icon className="text-[#222E54] dark:text-white w-3 rtl:rotate-180" name="angle-left"  />
                    </button>
                    <button onClick={() => handleScroll(1)}>
                    <Icon className="text-[#222E54] dark:text-white w-3 ltr:-rotate-180" name="angle-left" />
                    </button>
                </div>
            </div>
            {isExpanded ? (
                <div className="grid grid-cols-7 gap-1 w-full">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} className="text-center font-medium text-[#8A96BC]">
                            {day}
                        </div>
                    ))}
                    {monthDates.map((date, index) =>
                        date ? (
                            <div
                                key={index}
                                className={`border-[1.5px] border-[#F7F8FF] rounded-xl p-2 flex justify-center items-center aspect-square w-full cursor-pointer ${selectedDate && selectedDate.toDateString() === date.toDateString() ? 'bg-blue-200' : ''}`}
                                onClick={() => handleDateClick(date)}
                            >
                                <span className="font-semibold text-sm text-[#263257]">
                                    {date.getDate()}
                                </span>
                            </div>
                        ) : (
                            <div key={index} className="aspect-square w-full"></div>
                        )
                    )}
                </div>
            ) : (
                <div className="flex justify-around gap-3 w-full overflow-auto">
                    {firstFiveNonNullDates.map((date, index) =>
                        date ? (
                            <div
                                key={index}
                                className={`border-[1.5px] border-[#F7F8F8] dark:border-gray-600 rounded-xl px-3 flex flex-col justify-center items-center aspect-square w-12 h-12 cursor-pointer ${selectedDate && selectedDate.toDateString() === date.toDateString() ? 'bg-blue-200' : ''}`}
                                onClick={() => handleDateClick(date)}
                            >
                                <span className="font-semibold text-xs text-[#263257] dark:text-white">
                                    {date.getDate()} 
                                </span>
                                <span className="font-medium text-xs text-[#8A96BC]">
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                            </div>
                        ) : (
                            <div key={index} className='size-4 bg-white dark:bg-black' ></div>
                        )
                    )}
                </div>
            )}
            <div className="flex justify-center rounded-full p-1 shadow arrow-icon cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <Icon className="w-3 text-black dark:text-white opacity-50" name={isExpanded ? "arrow-up" : "arrow-down"} />
            </div>
        </div>
    );
};

export default SelectDate;

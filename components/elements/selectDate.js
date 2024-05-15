import React, { useState } from 'react';
import Icon from "../Icons";

const SelectDate = ({ onChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const getDates = (baseDate) => {
        const dates = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() + i);
            dates.push({
                week: date.toLocaleDateString('en-US', { weekday: 'short' }),
                day: date.getDate(),
                fullDate: date
            });
        }
        return dates;
    };

    const dates = getDates(currentDate);

    const handleDateClick = (date) => {
        setSelectedDate(date.fullDate);
        if(onChange)
        onChange(date.fullDate.toISOString()); 
    };

    const handleMonthChange = (change) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + change));
        setCurrentDate(newDate);
    };

    return (
        <div className="flex flex-col gap-2 w-min h-[80px]">
            <div className="flex justify-between w-full">
                <span className="opacity-60 font-medium">
                    Select date
                </span>
                <div className="flex items-center font-medium text-[#8A96BC] cursor-pointer text-sm">
                    {currentDate.toLocaleDateString('en-US', { month: 'long' })}
                    <Icon className="mx-2 text-[#222E54] w-1" name="angle-right" onClick={() => handleMonthChange(1)} />
                </div>
            </div>
            <div className="flex justify-between gap-3">
                {dates.map((value, index) =>
                    <div key={index} className={`border-[1.5px] border-[#F7F8F8] rounded-xl px-3 flex flex-col justify-center items-center aspect-square w-12 h-12 cursor-pointer ${selectedDate && selectedDate.toDateString() === value.fullDate.toDateString() ? 'bg-blue-200' : ''}`} onClick={() => handleDateClick(value)}>
                        <span className="font-semibold text-xs text-[#263257]">
                            {value.day}
                        </span>
                        <span className="font-medium text-xs text-[#8A96BC]">
                            {value.week}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectDate;

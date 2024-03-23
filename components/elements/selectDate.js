import Icon from "../Icons";
import React, { useState } from 'react';
const SelectDate = ({ }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const getDates = () => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                week: date.toLocaleDateString('en-US', { weekday: 'short' }),
                day: date.getDate(),
            });
        }
        return dates;
    };
    const dates = getDates();

    const handleDateClick = (date) => {
        setSelectedDate(date);
      
    };
    return (
        <div className="flex flex-col gap-2 w-min h-[80px]">
            <div className="flex justify-between w-full">
                <span className="text-xs opacity-60 font-medium">
                    select date
                </span>
                <span className="text-xs font-medium text-[#8A96BC] cursor-pointer">
                    Augest
                    <Icon className="mx-2 text-[#222E54]" name={"angle-right"} />
                </span>
            </div>
            <div className="flex justify-between gap-3">
            {
                    dates.map((value, index) =>
                        <div key={index} className={`border-[1.5px] border-[#F7F8F8] rounded-xl px-3 flex flex-col justify-center items-center aspect-square w-12 h-12 cursor-pointer ${selectedDate === index ? 'bg-blue-200' : ''}`} onClick={() => handleDateClick(index)}>
                            <span className="font-semibold text-xs text-[#263257]">
                                {value.day}
                            </span>
                            <span className="font-medium text-xs text-[#8A96BC]">
                                {value.week}
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
export default SelectDate;

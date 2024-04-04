import React, { useState } from 'react';

const Switch = ({ onSwitchChange, defaultValue }) => {
  const [isFreedom, setIsFreedom] = useState(defaultValue !== null ? defaultValue : false);

  const handleSwitchClick = () => {
    const newState = !isFreedom;
    setIsFreedom(newState);

    // Call the callback function with the new state
    onSwitchChange(newState);
  };

  return (
    <div dir='ltr' className={`w-[50px] h-[20px] rounded-full relative cursor-pointer ${isFreedom ? 'bg-[#ADD2E9]' : 'bg-[#e3eaf0]'}`} onClick={handleSwitchClick}>
      <div className={`switch-transition switch-box-shadow absolute w-7 h-7 rounded-full top-[-20%] ${isFreedom ? 'transform translate-x-6 bg-primary' : 'bg-gray-300'}`}></div>
    </div>
  );
};

export default Switch;

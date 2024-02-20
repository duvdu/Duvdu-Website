import React, { useState } from 'react';

const Switch = ({ onSwitchChange,defaultValue }) => {
  const [isFreedom, setIsFreedom] = useState(defaultValue !== null ? defaultValue : false);

  const handleSwitchClick = () => {
    const newState = !isFreedom;
    setIsFreedom(newState);

    // Call the callback function with the new state
    onSwitchChange(newState);
  };

  return (
    <div className={`w-[58px] h-[30px] p-1 rounded-full relative cursor-pointer ${isFreedom ? 'bg-[#ADD2E9]' : 'bg-[#e3eaf0]'}`} onClick={handleSwitchClick}>
      <div className={`switch-transition switch-box-shadow h-full aspect-square rounded-full ${isFreedom ? 'transform translate-x-6 bg-primary' : 'bg-gray-300'}`}></div>
    </div>
  );
};

export default Switch;

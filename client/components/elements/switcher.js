import React, { useEffect, useRef, useState } from 'react';

let globalValue = {};

const Switch = ({ onSwitchChange, value,id='' }) => {
  const [isFreedom, setIsFreedom] = useState(globalValue[id]);

  
  useEffect(() => {
    if (value !== isFreedom) {
      setIsFreedom(value);
      globalValue[id] = value;
    }
  }, [value]);

  const handleSwitchClick = () => {
    const newState = !isFreedom;
    onSwitchChange?.(newState); // Using optional chaining to call the function
  };

  const switchContainerClasses = `w-[50px] h-[20px] rounded-full relative cursor-pointer ${isFreedom ? 'bg-[#ADD2E9]' : 'bg-[#e3eaf0]'}`;
  const knobClasses = `switch-transition switch-box-shadow absolute w-7 h-7 rounded-full top-[-20%] ${isFreedom ? 'transform translate-x-6 bg-primary' : 'bg-gray-300'  }`;

  return (
    <div
      dir="ltr"
      className={switchContainerClasses}
      onClick={handleSwitchClick}
      role="switch"
      aria-checked={isFreedom && value == isFreedom}
    >
      <div className={knobClasses}></div>
    </div>
  );
};

export default Switch;

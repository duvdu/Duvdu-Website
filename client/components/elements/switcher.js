import React, { useEffect, useRef, useState } from 'react';
import Switch from 'react-switch'; // Importing react-switch

let globalValue = {};

const CustomSwitch = ({ onSwitchChange, value, id = '' }) => {
  const [isFreedom, setIsFreedom] = useState(globalValue[id]);

  useEffect(() => {
    if (value !== isFreedom) {
      setIsFreedom(value);
      globalValue[id] = value;
    }
  }, [value]);

  const handleSwitchChange = (newState) => {
    setIsFreedom(newState);
    onSwitchChange?.(newState); // Using optional chaining to call the function
  };

  return (
    <Switch
      checked={isFreedom}
      onChange={handleSwitchChange}
      offColor="#e3eaf0"e
      onColor="#ADD2E9" 
      onHandleColor="#1c72ea"
      offHandleColor="#d1d5db"
      uncheckedIcon={false}
      checkedIcon={false}
      height={20}
      width={50}
      handleDiameter={28}
    />
  );
};

export default CustomSwitch;

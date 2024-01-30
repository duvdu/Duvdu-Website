import React, { useState } from 'react';

const Switch = ({ onSwitchChange }) => {
  const [isFreedom, setIsFreedom] = useState(false);

  const handleSwitchClick = () => {
    const newState = !isFreedom;
    setIsFreedom(newState);

    // Call the callback function with the new state
    onSwitchChange(newState);
  };

  return (
    <div className={`switch ${isFreedom ? 'on' : ''}`} onClick={handleSwitchClick}>
      <div className="switch-ball"></div>
    </div>
  );
};

export default Switch;

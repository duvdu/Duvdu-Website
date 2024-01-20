import React, { useState } from 'react';

const Switch = () => {
  const [isFreedom, setIsFreedom] = useState(false);

  const handleSwitchClick = () => {
    setIsFreedom(prevIsFreedom => !prevIsFreedom);
  };

  return (
    <div className={`switch ${isFreedom ? 'on' : ''}`} onClick={handleSwitchClick}>
      <div className="switch-ball"></div>
    </div>
  );
};

export default Switch;

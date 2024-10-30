import React, { useState , useEffect } from 'react';

const Switch = ({ onSwitchChange,defaultValue  , setClearFilter , clearFilter}) => {
  const [isFreedom, setIsFreedom] = useState(defaultValue !== null ? defaultValue : false);
  useEffect(()=>{
    if(clearFilter)
      setIsFreedom(false)
    },[clearFilter])

  const handleSwitchClick = () => {
    const newState = !isFreedom;
    setIsFreedom(newState);
    setClearFilter(false)
    // Call the callback function with the new state
    onSwitchChange(newState);
  };

  return (
    <div dir='ltr' className={`w-[58px] h-[30px] p-1 rounded-full relative cursor-pointer ${isFreedom ? 'bg-[#ADD2E9]' : 'bg-transparent border border-[#4972AA]'}`} onClick={handleSwitchClick}>
      <div className={`switch-transition switch-box-shadow h-full aspect-square rounded-full ${isFreedom ? 'transform translate-x-6 bg-primary' : 'bg-hover_primary'}`}></div>
    </div>
  );
};

export default Switch;

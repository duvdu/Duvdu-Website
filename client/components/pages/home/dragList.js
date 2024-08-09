import React, { useRef, useState } from 'react';

const DraggableList = ({ children }) => {
  
  return (
    <div
      className={"flex overflow-auto"}
      
    >
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}

    </div>
  );
};

export default DraggableList;

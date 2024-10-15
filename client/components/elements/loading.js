import React from 'react';
const Loading = ({color}) => {
  return (
    <div className={`w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-${color?color:'white'} rounded-full m-2 mx-auto`} />
  );
};

export default Loading;

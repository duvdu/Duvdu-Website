import React from 'react';
const Loading = ({color , size='lg'}) => {
  return (
    <div className={`${size=='lg'?'w-10 h-10':'w-4 h-4'} p-2 animate-spin aspect-square border-t-2 border-${color?color:'white'} rounded-full m-2 mx-auto`} />
  );
};

export default Loading;

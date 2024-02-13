import React from 'react';

const Icon = ({ name, useinvert , invert, className, ...rest }) => {
  let svgClassName = useinvert ? `my-invert ${className || ''}` : className || '';
  svgClassName += (invert ? " invert" : "");
  return (
    <img
      src={`/assets/imgs/theme/icons/${name}.svg`}
      alt={name}
      className={svgClassName}
      {...rest}
    />
  );
};

export default Icon;

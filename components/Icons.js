import React from 'react';

const Icon = ({ name, useinvert, className, ...rest }) => {
  const svgClassName = useinvert ? `my-invert ${className || ''}` : className || '';

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

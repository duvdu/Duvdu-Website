import React from 'react';

const Icon = ({ name, ...rest }) => (
  <img
    src={`/assets/imgs/theme/icons/${name}.svg`}
    alt={name}
    {...rest}
  />
);

export default Icon;

import React, { useEffect } from 'react';
import Icons from '../public/static/LocalIconsName.json';
import IconSVG, { IsincludesSVG } from '../util/IconSVG';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Icon = ({ name, type = "fas", useinvert, invert, className = "", ...rest }) => {



  if (IsincludesSVG.includes(name)) return <IconSVG name={name} className={className} {...rest} />
  else {
    const isincludes = Icons.includes(name)
    if (!isincludes) {
      return <FontAswome name={name} type={type} className={className} {...rest} />;
    }
    else {
      return <LocalIcon name={name} type={type} className={className} {...rest} />;
    }
  }
}


const LocalIcon = ({ name, useinvert, invert, className = "", ...rest }) => {

  return (
    <img
      src={`/assets/imgs/theme/icons/${name}.svg`}
      alt={name}
      className={className}
      {...rest}
    />
  );
};
const FontAswome = ({ name, type, useinvert, invert, className, ...rest }) => {
  useEffect(() => {
    // Add icon sets to the library only once when the component mounts
    if (library.definitions.fas === undefined) {
      library.add(fas);
    }
    if (library.definitions.far === undefined) {
      library.add(far);
    }
  }, []);
  if (library.definitions.fas === undefined)
    return <></>
  else
    return (
      <FontAwesomeIcon icon={[type, name]} className={className} {...rest} />
    );
};

export default Icon;

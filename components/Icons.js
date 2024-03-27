import React, { useEffect } from 'react';
import Icons from '../public/static/LocalIconsName.json';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LocalSvg = [
  "dashboard",
  "contracts",
  "teams",
  "gear",
  "user",
  "bell",
  "attachment",
];

const Icon = ({ name, type = "fas", useinvert, invert, className = "", ...rest }) => {

  const isincludesSVG = LocalSvg.includes(name)
  if (isincludesSVG) {

    return <GetIconSVG name={name} className={className} />
  }
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



const GetIconSVG = ({ name, className }) => {
  switch (name) {
    case "dashboard":
      return <Dashboard className={className} />
    case "contracts":
      return <Contracts className={className} />
    case "teams":
      return <Teams className={className} />
    case "gear":
      return <Gear className={className} />
    case "user":
      return <User className={className} />
    case "bell":
      return <Bell className={className} />
    case "attachment":
      return <Attachment className={className} />
    default:
      break;
  }
}

const Dashboard = ({ className }) =>
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="8.89932" y="1.37466" width="4.56423" height="12.2499" rx="1.00118" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1.21328" y="4.57852" width="4.56423" height="9.04752" rx="1.00118" stroke="currentColor" strokeWidth="1.2" />
    </svg>

  </div>

const Contracts = ({ className }) =>
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
      <path d="M5.67471 13.6495H2.60045C1.75151 13.6495 1.06332 12.9613 1.06332 12.1124L1.06338 2.88966C1.06339 2.04073 1.75158 1.35254 2.60051 1.35254H9.51776C10.3667 1.35254 11.0549 2.04073 11.0549 2.88967V7.11677M7.98064 11.472L9.38968 12.881L12.4639 9.80662M3.75354 4.4268H8.36492M3.75354 6.73249H8.36492M3.75354 9.03818H6.05923"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>

const Teams = ({ className }) =>
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="11" viewBox="0 0 16 11" fill="none">
      <path d="M13.3482 6.63165C14.2447 7.2666 15.046 8.86525 15.046 9.85027C15.046 10.1571 14.8098 10.4059 14.5184 10.4059H14.1971M10.8016 4.02908C11.3815 3.71107 11.7717 3.11669 11.7717 2.43591C11.7717 1.75514 11.3815 1.16075 10.8016 0.842736M1.9915 10.4059H11.2846C11.5759 10.4059 11.8121 10.1571 11.8121 9.85027C11.8121 7.92135 10.1121 6.35765 6.63804 6.35765C3.164 6.35765 1.46394 7.92135 1.46394 9.85027C1.46394 10.1571 1.70014 10.4059 1.9915 10.4059ZM8.57833 2.43591C8.57833 3.45169 7.70963 4.27514 6.63804 4.27514C5.56645 4.27514 4.69775 3.45169 4.69775 2.43591C4.69775 1.42013 5.56645 0.59668 6.63804 0.59668C7.70963 0.59668 8.57833 1.42013 8.57833 2.43591Z"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>

const Gear = ({ className }) =>
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6.91738 3.39679L7.84938 1.99047C8.00306 1.75857 8.26274 1.61914 8.54093 1.61914H9.78937C10.0666 1.61914 10.3255 1.75758 10.4794 1.98813L11.4013 3.36909M6.91738 3.39679C6.65702 3.7868 6.22426 3.97791 5.76492 3.94384M6.91738 3.39679C6.65576 3.78587 6.22426 3.9795 5.76492 3.94384M5.76492 3.94384L4.13115 3.83614C3.85715 3.81808 3.59195 3.93677 3.42287 4.15315L2.59985 5.20637C2.43258 5.42042 2.3807 5.70279 2.46096 5.96231L2.95194 7.55002M2.95194 7.55002C3.01869 7.77727 3.02724 8.02072 2.97947 8.25066M2.95194 7.55002C3.01964 7.77686 3.02787 8.01983 2.97915 8.25301M2.97947 8.25066C2.93107 8.47787 2.8273 8.69241 2.67324 8.86614M2.97947 8.25066L2.97915 8.25301M2.67324 8.86614L1.56628 10.1162C1.38864 10.3168 1.31882 10.5909 1.37884 10.8521L1.67535 12.1422C1.73714 12.4111 1.9285 12.6316 2.18594 12.7307L3.68398 13.3072C3.89783 13.3941 4.08258 13.5353 4.2224 13.7132M2.67324 8.86614C2.82825 8.69383 2.93107 8.47998 2.97915 8.25301M4.2224 13.7132C4.36128 13.8917 4.45587 14.107 4.49256 14.3402M4.2224 13.7132C4.36254 13.8917 4.45745 14.1064 4.49256 14.3402M4.2224 13.7132L4.22019 13.7107C4.21101 13.699 4.20121 13.6868 4.19172 13.6755M4.49256 14.3402L4.75101 16.0071C4.79263 16.2756 4.96308 16.5066 5.2073 16.6257L6.3481 17.1818C6.59795 17.3036 6.8922 17.2922 7.13186 17.1514L8.51937 16.3364M8.51937 16.3364C8.71836 16.219 8.94043 16.1602 9.16251 16.1599M8.51937 16.3364C8.59814 16.2893 8.68071 16.2517 8.76549 16.2235C8.89425 16.1807 9.02838 16.1596 9.16251 16.1599M9.16251 16.1599C9.27798 16.1601 9.39344 16.1762 9.50606 16.2078C9.61078 16.2373 9.71264 16.2802 9.80913 16.3364M9.16251 16.1599C9.38553 16.1595 9.60888 16.2184 9.80913 16.3364M9.80913 16.3364L11.2635 17.1631C11.5044 17.3 11.7977 17.3076 12.0454 17.1834L13.1816 16.6136C13.4246 16.4917 13.5925 16.2585 13.631 15.9894L13.8625 14.3698M13.8625 14.3698C13.8976 14.1354 13.9909 13.9184 14.1295 13.7384M13.8625 14.3698C13.8964 14.1348 13.9903 13.9182 14.1295 13.7384M14.1295 13.7384C14.2671 13.5602 14.4497 13.4183 14.6622 13.3306M14.1295 13.7384C14.2668 13.5596 14.4487 13.4172 14.6622 13.3306M14.6622 13.3306L16.1778 12.7069C16.4298 12.6032 16.6148 12.3823 16.6728 12.116L16.9571 10.8087C17.0132 10.5512 16.9435 10.2824 16.7694 10.0845L15.6556 8.81809M15.6556 8.81809C15.4987 8.64376 15.3892 8.43551 15.3361 8.21419M15.6556 8.81809C15.5819 8.73667 15.5186 8.64766 15.467 8.55328C15.4082 8.44611 15.3642 8.33204 15.3361 8.21419M15.3361 8.21419C15.2839 7.99445 15.287 7.76159 15.3531 7.53621L15.8373 5.90678C15.9138 5.64923 15.8609 5.37056 15.6952 5.15901L14.8937 4.13544C14.7226 3.91694 14.4536 3.79845 14.1769 3.81973L12.5633 3.94384M12.5633 3.94384C12.3349 3.96077 12.1102 3.91509 11.9103 3.81681M12.5633 3.94384C12.3345 3.96175 12.1102 3.9157 11.9103 3.81681M11.9103 3.81681C11.7091 3.71728 11.5326 3.56422 11.4013 3.36909M11.9103 3.81681C11.7088 3.71764 11.532 3.56499 11.4013 3.36909M2.97915 8.25301L2.97978 8.24956M11.7063 9.50903C11.7063 10.9789 10.5459 12.1704 9.11474 12.1704C7.68358 12.1704 6.52321 10.9789 6.52321 9.50903C6.52321 8.03916 7.68358 6.84763 9.11474 6.84763C10.5459 6.84763 11.7063 8.03916 11.7063 9.50903Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  </div>

const User = ({ className }) =>
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M1.0459 16.0942C1.0459 12.9479 3.67447 10.3973 9.0459 10.3973C14.4173 10.3973 17.0459 12.9479 17.0459 16.0942C17.0459 16.5947 16.6807 17.0005 16.2302 17.0005H1.86158C1.41109 17.0005 1.0459 16.5947 1.0459 16.0942Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.0459 4.00049C12.0459 5.65734 10.7028 7.00049 9.0459 7.00049C7.38904 7.00049 6.0459 5.65734 6.0459 4.00049C6.0459 2.34363 7.38904 1.00049 9.0459 1.00049C10.7028 1.00049 12.0459 2.34363 12.0459 4.00049Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  </div>

const Bell = ({ className }) =>
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
      <path d="M5.9778 16.1245C6.6383 16.6248 7.51053 16.929 8.4667 16.929C9.42288 16.929 10.2951 16.6248 10.9556 16.1245M1.47379 13.5501C1.08029 13.5501 0.860503 12.9639 1.09854 12.6383C1.65087 11.8826 2.18399 10.7743 2.18399 9.43969L2.20677 7.50579C2.20677 3.91275 5.00944 1 8.4667 1C11.9749 1 14.8188 3.95565 14.8188 7.60163L14.7961 9.43969C14.7961 10.7835 15.3108 11.8978 15.8407 12.6538C16.0695 12.9803 15.8492 13.5501 15.4605 13.5501H1.47379Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>

const Attachment = ({ className }) =>
  <div className={className}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <path d="M19.2636 6.84729V19.9726C19.2636 22.495 17.2206 24.538 14.6982 24.538C12.1759 24.538 10.1329 22.495 10.1329 19.9726V5.70596C10.1329 4.94921 10.4335 4.22345 10.9686 3.68835C11.5037 3.15324 12.2295 2.85262 12.9862 2.85262C13.743 2.85262 14.4687 3.15324 15.0038 3.68835C15.5389 4.22345 15.8396 4.94921 15.8396 5.70596V17.69C15.8396 18.3177 15.326 18.8313 14.6982 18.8313C14.0705 18.8313 13.5569 18.3177 13.5569 17.69V6.84729H11.8449V17.69C11.8449 18.4467 12.1455 19.1725 12.6806 19.7076C13.2157 20.2427 13.9415 20.5433 14.6982 20.5433C15.455 20.5433 16.1807 20.2427 16.7158 19.7076C17.2509 19.1725 17.5516 18.4467 17.5516 17.69V5.70596C17.5516 3.18361 15.5086 1.14062 12.9862 1.14062C10.4639 1.14062 8.4209 3.18361 8.4209 5.70596V19.9726C8.4209 23.4423 11.2286 26.25 14.6982 26.25C18.1679 26.25 20.9756 23.4423 20.9756 19.9726V6.84729H19.2636Z" fill="currentColor" />
      </g>
    </svg>

  </div>
const Temp = ({ className }) =>
  <div className={className}>
  </div>

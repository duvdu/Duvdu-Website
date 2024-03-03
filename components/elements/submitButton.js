
function button({ children, color, conentclassName = "", className = "", shadow = false, shadowHeight, ...rest }) {
  let buttonClass;

  switch (color) {
    case undefined:
      buttonClass = 'bg-primary';
      break;
    case 'bg-[#D30000]':
      buttonClass = 'bg-[#D30000]';
      break;
    case 'bg-[#5666F7]':
      buttonClass = 'bg-[#5666F7]';
      break;
    default:
      buttonClass = `bg-[${color}]`;
      break;
  }

  return (
    <div className={`relative cursor-pointer ${className}`}>
      <div {...rest} className={`${buttonClass} app-btn btn btn-heading btn-block hover-up leading-10 relative`}>
        {
          shadow &&
          <div>
            <div className={`absolute left-0 top-0 w-1/2 h-full rounded-full button-shadow-1`} />
            <div className={`absolute left-1/2 top-0 w-1/2 h-full rounded-full button-shadow-2`} />
          </div>
        }
        <div className={`flex justify-center items-center h-16 text-white`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default button;
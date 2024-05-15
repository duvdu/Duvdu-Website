
function AppButton({ children, color, conentclassName = "", className = "", shadow = false, shadowHeight, ...rest }) {
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
      <div className={`relative cursor-pointer h-[75px] ${className} `}>
        <div {...rest} className={`${buttonClass} absolute left-0 app-btn h-full btn leading-10 z-10 min-w-min`}>
          <div className={`flex justify-center items-center h-full text-white`}>
            {children}
          </div>
        </div>
        {
          shadow &&
          <div className="btn-shadows">
            <div className={`absolute left-0 top-0 w-1/2 h-full rounded-full button-shadow-1 z-0`} />
            <div className={`absolute left-1/2 top-0 w-1/2 h-full rounded-full button-shadow-2`} />
          </div>
        }
      </div>
    );
  }
  
  export default AppButton;
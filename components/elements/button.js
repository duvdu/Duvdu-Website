function AppButton({ children, color, contentClassName = "", className = "", shadow = false, shadowHeight, isEnabled = true, onClick, ...rest }) {
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

  const disabledClass = isEnabled ? '' : 'opacity-50 cursor-not-allowed';
  const handleClick = (event) => {
    if (isEnabled && onClick) {
      onClick(event);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative h-[75px] flex rounded-full p-1 ${className} ${isEnabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      {...rest}
    >
      <div className={`${buttonClass} absolute left-0 app-btn h-full btn leading-10 z-10 min-w-min ${disabledClass}`}>
        <div className={`flex justify-center items-center h-full text-white ${contentClassName}`}>
          {children}
        </div>
      </div>
      {
        shadow && isEnabled &&
        <div className="btn-shadows">
          <div className={`absolute left-0 top-0 w-1/2 h-full rounded-full button-shadow-1 z-0`} />
          <div className={`absolute left-1/2 top-0 w-1/2 h-full rounded-full button-shadow-2`} />
        </div>
      }
    </div>
  );
}

export default AppButton;

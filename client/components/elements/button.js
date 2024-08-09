function AppButton({ children, color, contentClassName = "", className = "", shadow = false, shadowHeight, isEnabled = true, onClick, ...rest }) {
  let buttonClass;
  let isbuttonred = color == "#D30000";
  switch (color) {
    case undefined:
      buttonClass = 'bg-primary';
      break;
    case 'bg-[#D30000]' || '#D30000':
      buttonClass = 'bg-[#D30000]';
      isbuttonred = true
      break;
    case 'bg-[#5666F7]':
      buttonClass = 'bg-[#5666F7]';
      break;
    default:
      buttonClass = `bg-[${color}]`;
      break;
  }

    const disabledClass = isEnabled ? '' : 'disable';
  const handleClick = (event) => {
    if (isEnabled && onClick) {
      onClick(event);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative h-[75px] flex rounded-full p-1 ${className}`}
      {...rest}
    >
      <div className={`${buttonClass} absolute left-0 app-btn h-full btn leading-10 z-10 min-w-min ${isbuttonred ? 'red' : 'blue'} ${disabledClass}`}>
        <div className={`flex justify-center items-center h-full text-white ${contentClassName}`}>
          {children}
        </div>
      </div>

    </div>
  );
}

export default AppButton;


function button({ children, className = "", shadow = false, shadowHeight, ...rest }) {
  return (
    <div className={`relative submit-parent cursor-pointer ${className}`}>
      <button {...rest} className="app-btn btn btn-heading btn-block hover-up leading-10">
        {children}
      </button>
      {
        false && <div className={`submit-shadow absolute top-1/2 w-full ${shadowHeight==14 ? ` h-14`:' h-full'}`}></div>
      }
    </div>
  );
}

export default button;


function button({ children, className, ...rest }) {
  return (
    <div className={`relative submit-parent ${className}`}>
      <button {...rest} className="app-btn btn btn-heading btn-block hover-up">
        {children}
      </button>
      <div className="submit-shadow w-full h-10 top-1/2 -translate-y-1/2"></div>
    </div>
  );
}

export default button;

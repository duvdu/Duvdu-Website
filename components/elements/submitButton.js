
function button({ children, ...rest }) {
  return (
    <div className="relative submit-parent">
    <button type="submit" className="btn btn-heading btn-block hover-up">
      {children}
    </button>
    <div class="submit-shadow w-full h-10 top-1/2 -translate-y-1/2"></div>  

    </div>
  );
}

export default button;

import Link from "next/link";
import Auth from '../components/layout/Auth';

function resetPassword() {
  return (
    <>
      <Auth>
        <form>
          <div className="heading_s1 mb-42 text-center mb-24">
            <div className="flex w-full justify-center">
            <img src="/assets/imgs/theme/done.svg" className="mb-9" alt="logo" />
            </div>
            <h1 className="auth-title">Account Created</h1>
            <p>Now choose a category to view the best creatives in this field</p>
          </div>
          <div className="mb-4 relative">
            <Link href={"/"}>
              <a className="btn btn-heading btn-block hover-up submit">
              home screen
              </a>
            </Link>
          </div>
        </form>
      </Auth>
    </>
  );
}

export default resetPassword;

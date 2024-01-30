import Link from "next/link";
import Auth from '../components/layout/Auth';

function resetPassword() {
  return (
    <>
      <Auth>
        <form>
          <div className="heading_s1 mb-[88px] text-center">
            <div className="flex w-full justify-center">
            <img src="/assets/imgs/theme/done.svg" className="mb-9" alt="logo" />
            </div>
            <h1 className="auth-title mb-2">Password changed</h1>
            <p>Your password has been changed successfully</p>
          </div>
          <div className="mb-4 relative">
            <Link href={"/login"}>
              <a className="btn btn-heading btn-block hover-up submit">
                Back to Login
              </a>
            </Link>
          </div>
        </form>
      </Auth>
    </>
  );
}

export default resetPassword;

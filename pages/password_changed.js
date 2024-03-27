import Link from "next/link";
import Button from '../components/elements/button';
import Auth from '../components/layout/Auth';
import Icon from '../components/Icons';


function PasswordChanged() {
  return (
    <>
      <Auth>
        <div className="flex flex-col justify-center h-full">
          <div className="heading_s1 mb-[88px] text-center">
            <div className="flex w-full justify-center">
              <Icon name={"done"} className="mb-9" />
            </div>
            <h1 className="auth-title mb-2">Password changed</h1>
            <p>Your password has been changed successfully</p>
          </div>
          <div className="mb-4 relative">
            <a href={"/"}>
              <Button type="submit" name="login" shadow={true}>
                Back to Login
              </Button>
            </a>
          </div>
        </div>
      </Auth>
    </>
  );
}

export default PasswordChanged;

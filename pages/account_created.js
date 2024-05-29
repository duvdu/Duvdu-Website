import Link from "next/link";
import Auth from '../components/layout/Auth';
import Icon from '../components/Icons';
import Button from '../components/elements/button';

function ResetPassword() {
  return (
    <>
      <Auth>
        <form>
          <div className="heading_s1 mb-11 text-center">
            <div className="flex w-full justify-center">
              <Icon name={"done"} className="mb-9" />
            </div>
            <h1 className="auth-title">Account Created</h1>
            <p>Now choose a category to view the best creatives in this field</p>
          </div>
          <div className="mb-4 relative">
            <Link href={"/"}>
              <Button type="submit" name="login" shadow={true}>
                home screen
              </Button>
            </Link>
          </div>
        </form>
      </Auth>
    </>
  );
}

export default ResetPassword;

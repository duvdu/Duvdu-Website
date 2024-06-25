import Link from "next/link";
import Button from '../elements/button';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';
import { useEffect } from "react";
import { OpenPopUp } from "../../util/util";
import { useRouter } from "next/router";

function dashboard() {
    const router = useRouter();
    useEffect(() => {
        OpenPopUp("registration-required")
    }, [])
    const onCancel = () => {
        router.push('/'); 
    }

    return (
        <>
            <Popup id='registration-required' header={'registration required'} onCancel={onCancel}>
                <div className='flex h-full flex-col mt-24 items-center mb-20 max-w-[604px]'>
                    <span className='mb-12 text-center text-xl font-semibold'>
                        Register or Sign-in
                        <br />
                        to access this feature
                    </span>
                    <Link href="/register">
                        <div className="max-w-96 w-full cursor-pointer">
                            <AppButton>
                                register
                            </AppButton>
                        </div>
                    </Link>
                </div>
            </Popup>
        </>
    );
}

export default dashboard;

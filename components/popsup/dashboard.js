import Link from "next/link";
import Button from '../elements/button';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';

function dashboard() {

    return (
        <>
            <Popup id='registration-required' className="show" header={'registration required'}>
                <div className='flex h-full flex-col mt-24 items-center mb-20 max-w-[604px]'>
                    <span className='mb-12 text-center text-xl font-semibold'>
                        Register or Sign-in
                        <br />
                        to access this feature
                    </span>
                    <a className="w-96" href="/register">
                        <AppButton >
                                register
                        </AppButton>
                    </a>
                </div>
            </Popup>
        </>
    );
}

export default dashboard;

import Link from "next/link";
import Popup from "../../elements/popup";
import AppButton from "../../elements/button";



function RegistrationRequired() {

    return (
        <>
            <Popup id='registration-required' header='registration required'>
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


export default RegistrationRequired;


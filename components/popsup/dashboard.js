import Link from "next/link";
import Button from '../elements/submitButton';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';

function dashboard({ isPopupOpen, setIsPopupOpen }) {
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    return (
        <>
            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={closePopup} header={'registration required'}>
                    <div className='flex h-full flex-col mt-24 items-center'>
                        <span className='mb-12 text-center text-xl font-semibold'>
                            Register or Sign-in
                            <br />
                            to access this feature
                        </span>
                        <a href="/register">

                        <AppButton text={"register"} className={"mb-40 mx-16 md:mx-32 px-20 sm:px-36"} />
                        </a>
                    </div>
                </Popup>
            )}
        </>
    );
}

export default dashboard;

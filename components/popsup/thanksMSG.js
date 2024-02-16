import Link from "next/link";
import Button from '../elements/submitButton';
import Popup from '../elements/popup';

function Thanks({ isPopupOpen, setIsPopupOpen }) {

    return (
        <>
            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={()=> setIsPopupOpen(false)} header={'Thanks Meesage'}>
                    <div className="flex flex-col justify-center w-[604px] h-full my-14">
                        <div className="heading_s1 mb-[88px] text-center">
                            <div className="flex w-full justify-center">
                               <Icon name={"done"} className="mb-9"/>
                            </div>
                            <h1 className="auth-title mb-2">Password changed</h1>
                            <p>Your password has been changed successfully</p>
                        </div>
                        <div className="flex justify-center items-center">
                        <button  onClick={()=> setIsPopupOpen(false)} className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">
                            close
                        </button>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    );
}

export default Thanks;

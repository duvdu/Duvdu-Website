
import Icon from '../Icons';
import Popup from '../elements/popup';

function Thanks() {

    return (
        <>
                <Popup id='thanks-meesage' header={'Thanks Meesage'}>
                    <div className="flex flex-col justify-center w-full sm:w-[604px] h-full my-14">
                        <div className="heading_s1 mb-[88px] text-center">
                            <div className="flex w-full justify-center">
                               <Icon name={"done"} className="mb-9"/>
                            </div>
                            <h1 className="auth-title mb-2">Password changed</h1>
                            <p>Your password has been changed successfully</p>
                        </div>
                        <div className="flex justify-center items-center">
                        <button data-popup-dismiss="popup" className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold">
                            close
                        </button>
                        </div>
                    </div>
                </Popup>
          
        </>
    );
}

export default Thanks;

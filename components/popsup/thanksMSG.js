
import Icon from '../Icons';
import Popup from '../elements/popup';

function Thanks() {

    return (
        <>
                <Popup id='thanks-meesage' header={'Thanks Meesage'}>
                    <div className="flex flex-col justify-center items-center w-full sm:w-[404px] h-full my-14 text-center mx-28">
                            <div className="flex w-full justify-center">
                               <Icon name={"done"} />
                            </div>
                            <h1 className="text-3xl font-semibold my-5">Thanks for letting us know</h1>
                            <p className='text-[#404040] text-lg'>Your copyright violation report will be revised manually by one of our team.</p>
                        <div className="flex justify-center items-center">
                        <button data-popup-dismiss="popup" className="rounded-full border-2 border-solid border-primary w-[345px] h-[83px] text-primary text-lg font-bold mt-16">
                            close
                        </button>
                        </div>
                    </div>
                </Popup>
          
        </>
    );
}

export default Thanks;

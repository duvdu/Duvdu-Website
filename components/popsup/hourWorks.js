import Link from "next/link";
import Button from '../elements/submitButton';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';

function WorkHour() {

    return (
        <>
            <Popup id='work-hour' header={'choose category'}>
                <div className='flex gap-9 h-full justify-center items-center flex-col mt-24'>
                    <div className='flex items-center gap-9'>
                        <input placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                        <span className="text-xl opacity-50">
                            hours
                        </span>
                    </div>
                    <a>
                        <AppButton text={"Confirm"} className={"mb-40 mx-16 md:mx-32 px-20 sm:px-36"} />
                    </a>
                </div>
            </Popup>
        </>
    );
}

export default WorkHour;

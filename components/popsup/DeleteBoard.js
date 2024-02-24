import React, { useState } from 'react';
import Popup from '../elements/popup';
import Icon from "../Icons";
import AppButton from '../elements/button';

function DeleteBoard() {
    const [showDirectorConfirmed, setShowDirectorConfirmed] = useState(false);

    const toggleDirectorConfirmed = () => {
        setShowDirectorConfirmed(true);
    }

    return (
        <>
            <Popup id='delete-board' header={"Delete Board"} >
                <div method="post" className='mt-12 mx-5'>
                    <span className="text-lg font-[#2F2F2F]"> Are you sure you want to delete <span className="font-[#2F2F2F]">Inspirations board?</span></span>
                    <AppButton onClick={toggleDirectorConfirmed} text={'Delete'} className={'mt-12 w-full'} color={"#D30000"} />
                    <div data-popup-dismiss="popup" className='text-[#4C4C4C] text-lg text-center mt-8 cursor-pointer'>
                        <span>Cancel</span>
                    </div>
                </div>
            </Popup>

        </>
    );
}


export default DeleteBoard;


import React, { useState } from 'react';
import Popup from '../../../elements/popup';

function Comman({ header, id, children,onCancel }) {

    return (
        <>
            <Popup id={id} header={header} onCancel={onCancel}>
                <div className='w-full sm:w-[390px] '>
                    <div className='h-divider my-6'></div>
                    <div className='pt-6 h-[320px]'>
                        {children}
                    </div>
                </div>

            </Popup>
        </>
    );
}

export default Comman;
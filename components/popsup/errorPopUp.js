

import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'
import { useEffect, useState } from 'react';


function ErrorPopUp({onCancel , errorReq , errorMsg , ...rest}) {
    return (
        <>
            <Popup onCancel={onCancel} {...rest}>
                <div className="flex flex-col justify-center w-full sm:w-[604px] h-full my-14">
                    <div className="heading_s1 mb-[88px] text-center">
                        <div className="flex w-full justify-center">
                            <div className="size-16 bg-red-600 rounded-full flex justify-center items-center">
                                <Icon name={"xmark"} className="size-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-semibold my-5">Someting went wrong</h1>
                        <span dangerouslySetInnerHTML={{ __html: errorMsg }} />
                        {errorReq &&
                        <span >
                            <strong>function : </strong>
                            {errorReq}
                        </span>}
                    </div>
                </div>
            </Popup>

        </>
    );
}

export default ErrorPopUp;



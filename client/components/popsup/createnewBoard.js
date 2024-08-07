import React, { useState } from 'react';
import Popup from '../elements/popup';
import AppButton from '../elements/button';
import { useTranslation } from 'react-i18next';

function createnewBoard({onSbmit}) {
    const { t } = useTranslation();
    const [board, setBoardName] = useState('');
    const [boardError, setBoardError] = useState({ isError: false, message: '' });
    const handleSubmit = (e) => {
        if (board.length < 8) {
            setBoardError({ isError: true, message: 'some error' });
        } else {
            setBoardError({ isError: false, message: '' });
        }
    };
    const toggleDirectorConfirmed = () => {
        setBoardName('')
        onSbmit?.(board);
    }

    return (
        <>
            <Popup id="create-new-board" header={"create new Board"} >
                <div method="post" onSubmit={handleSubmit} className='mt-12 '>
                    <div className={`mb-12 ${boardError.isError && 'error'}`}>
                        <input
                            type="text"
                            value={board|| ""}
                            onChange={(e) => setBoardName(e.target.value)}
                            placeholder="Board name"
                            className={boardError.isError ? "app-field error" : "app-field"}
                        />
                        {boardError.isError && <p className="error-msg">{boardError.message}</p>}
                    </div>
                    <AppButton onClick={toggleDirectorConfirmed} className={'w-full'}>{t("Create")}</AppButton>
                    <div className='mb-4'/>
                </div>
            </Popup>
        </>
    );
}


export default createnewBoard;

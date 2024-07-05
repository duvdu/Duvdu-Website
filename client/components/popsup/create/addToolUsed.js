
import React, {useState } from 'react';
import Comman from './assets/comman';
import InputFeid from '../../elements/inputFeid';
import AppButton from '../../elements/button';
import { ClosePopUp } from '../../../util/util';

function AddToolUsed({ onSubmit }) {
    const [name, setname] = useState('');
    const [fees, setFees] = useState('');
    const [error, setError] = useState({ name: '', fees: '' });
    
    // Handle changes to the tool name and fees inputs
    const handlenameChange = (value) => {
        setname(value);
    };

    const handleFeesChange = (value) => {
        setFees(value);
    };

    const onCancel = () => {
        setname('');
        setFees('');
        setError({ name: '', fees: '' });
    }
    const onclick = () => {
        setError({ name: '', fees: '' });
        if (!name || !fees) {
            if (!name) {
                setError(prev => ({ ...prev, name: 'Tool name is required.' }));
            }
            if (!fees) {
                setError(prev => ({ ...prev, fees: 'Fees is required.' }));
            }
            return
        }
        onSubmit({ name, fees });
        ClosePopUp("AddToolUsed")
        setname('');
        setFees('');
        setError({ name: '', fees: '' });
    };

    return (
        <>
            <Comman id={"AddToolUsed"} header={"Add Tool Used"} onCancel={onCancel}>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-2'>
                        <InputFeid placeholder={"tool name..."} onChange={handlenameChange} errerMsg={error.name} sendValue={name}/>
                        <InputFeid type='number' placeholder={"fees"} onChange={handleFeesChange} errerMsg={error.fees } sendValue={fees}/>
                    </div>
                    <div  onClick={onclick}>
                        <AppButton className={'w-full'}>
                            Add
                        </AppButton>
                    </div>
                </div>
            </Comman>
        </>
    );
}

export default AddToolUsed;

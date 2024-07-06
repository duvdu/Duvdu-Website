
import React, {useState } from 'react';
import Comman from './assets/comman';
import InputFeid from '../../elements/inputFeid';
import AppButton from '../../elements/button';
import { ClosePopUp } from '../../../util/util';

function AddToolUsed({ onSubmit }) {
    const [name, setname] = useState('');
    const [unitPrice, setFees] = useState('');
    const [error, setError] = useState({ name: '', unitPrice: '' });
    
    // Handle changes to the tool name and unitPrice inputs
    const handlenameChange = (value) => {
        setname(value);
    };

    const handleFeesChange = (value) => {
        setFees(value);
    };

    const onCancel = () => {
        setname('');
        setFees('');
        setError({ name: '', unitPrice: '' });
    }
    const onclick = () => {
        setError({ name: '', unitPrice: '' });
        if (!name || !unitPrice) {
            if (!name) {
                setError(prev => ({ ...prev, name: 'Tool name is required.' }));
            }
            if (!unitPrice) {
                setError(prev => ({ ...prev, unitPrice: 'Fees is required.' }));
            }
            return
        }
        onSubmit({ name, unitPrice });
        ClosePopUp("AddToolUsed")
        setname('');
        setFees('');
        setError({ name: '', unitPrice: '' });
    };

    return (
        <>
            <Comman id={"AddToolUsed"} header={"Add Tool Used"} onCancel={onCancel}>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-2'>
                        <InputFeid placeholder={"tool name..."} onChange={handlenameChange} errerMsg={error.name} sendValue={name}/>
                        <InputFeid type='number' placeholder={"unitPrice"} onChange={handleFeesChange} errerMsg={error.unitPrice } sendValue={unitPrice}/>
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

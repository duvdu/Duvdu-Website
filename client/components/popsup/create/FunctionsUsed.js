import React, { useState } from 'react';
import Comman from './assets/comman';
import InputFeid from '../../elements/inputFeid';
import AppButton from '../../elements/button';
import { ClosePopUp } from '../../../util/util';

function FunctionUsed({ onSubmit }) {
    const [name, setName] = useState('');
    const [unitPrice, setFees] = useState('');
    const [error, setError] = useState({ name: '', unitPrice: '' });
    
    // Handle changes to the function name and tool price per unit inputs
    const handleNameChange = (value) => {
        setName(value);
    };

    const handleFeesChange = (value) => {
        setFees(value);
    };

    const onCancel = () => {
        setName('');
        setFees('');
        setError({ name: '', unitPrice: '' });
    }

    const onClick = () => {
        setError({ name: '', unitPrice: '' });
        if (!name || !unitPrice) {
            if (!name) {
                setError(prev => ({ ...prev, name: 'Function name is required.' }));
            }
            if (!unitPrice) {
                setError(prev => ({ ...prev, unitPrice: 'Tool price per unit is required.' }));
            }
            return;
        }
        onSubmit({ name, unitPrice });
        ClosePopUp("Addfunctions");
        setName('');
        setFees('');
        setError({ name: '', unitPrice: '' });
    };

    return (
        <>
            <Comman id={"Addfunctions"} header={"Add Tool Used"} onCancel={onCancel}>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-2'>
                        <InputFeid placeholder={"Function name..."} onChange={handleNameChange} errerMsg={error.name} sendValue={name} />
                        <InputFeid type='number' placeholder={"Tool price per unit"} onChange={handleFeesChange} errerMsg={error.unitPrice} sendValue={unitPrice} />
                    </div>
                    <div onClick={onClick}>
                        <AppButton className={'w-full'}>
                            Add
                        </AppButton>
                    </div>
                </div>
            </Comman>
        </>
    );
}

export default FunctionUsed;

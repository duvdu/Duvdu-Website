import React, { useState } from 'react';
import Comman from './assets/comman';
import InputFeid from '../../elements/inputFeid';
import AppButton from '../../elements/button';
import { ClosePopUp } from '../../../util/util';

function EquipmentAvailable({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        fees: ''
    });
    const [error, setError] = useState({
        name: '',
        fees: ''
    });

    // Handler to manage input changes for any field
    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Validation and submit handler
    const handleClick = () => {
        // Reset errors
        setError({  
            name: '',
            fees: ''
        });

        // Check for errors
        let hasError = false;
        if (!formData.name) {
            setError(prev => ({ ...prev, name: 'Equipment name is required.' }));
            hasError = true;
        }
        if (!formData.fees) {
            setError(prev => ({ ...prev, fees: 'Fees is required.' }));
            hasError = true;
        }
        if (hasError) return;

        // If no errors, submit data
        // Clear the form
        setFormData({
            name: '',
            fees: ''
        });

        if(onSubmit){
        onSubmit(formData);
        ClosePopUp('EquipmentAvailable')
    }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            fees: ''
        });
        setError({
            name: '',
            fees: ''
        });
    };

    return (
        <>
            <Comman id={"EquipmentAvailable"} header={"Add Tool Used"} onCancel={handleCancel}>
                <div className='flex flex-col justify-between gap-2 h-full'>
                    <div className='flex flex-col gap-2 h-full'>
                        <InputFeid
                            placeholder={"equipment name..."}
                            name="equipmentName"
                            onChange={(value) => { handleInputChange('name', value) }}
                            errerMsg={error.name}
                            sendValue={formData.name}
                        />
                        <InputFeid
                            placeholder={"fees"}
                            name="fees"
                            onChange={(value) => { handleInputChange('fees', value) }}
                            errerMsg={error.fees}
                            sendValue={formData.fees}
                        />
                    </div>
                    <AppButton  onClick={handleClick} className={'w-full'}>
                        Add
                    </AppButton>
                </div>
            </Comman>
        </>
    );
}

export default EquipmentAvailable;

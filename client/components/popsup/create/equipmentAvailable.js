import React, { useState } from 'react';
import Comman from './assets/comman';
import InputFeid from '../../elements/inputFeid';
import AppButton from '../../elements/button';
import { ClosePopUp, } from '../../../util/util';
import { useTranslation } from 'react-i18next';


function EquipmentAvailable({ onSubmit }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        unitPrice: ''
    });
    const [error, setError] = useState({
        name: '',
        unitPrice: ''
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
            unitPrice: ''
        });

        // Check for errors
        let hasError = false;
        if (!formData.name) {
            setError(prev => ({ ...prev, name: 'Equipment name is required.' }));
            hasError = true;
        }
        if (!formData.unitPrice) {
            setError(prev => ({ ...prev, unitPrice: 'Fees is required.' }));
            hasError = true;
        }
        if (hasError) return;

        // If no errors, submit data
        // Clear the form
        setFormData({
            name: '',
            unitPrice: ''
        });

        if(onSubmit){
        onSubmit(formData);
        ClosePopUp('EquipmentAvailable')
    }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            unitPrice: ''
        });
        setError({
            name: '',
            unitPrice: ''
        });
    };

    return (
        <>
            <Comman id={"EquipmentAvailable"} header={"Add Tool Used"} onCancel={handleCancel}>
                <div className='flex flex-col justify-between gap-2 h-full'>
                    <div className='flex flex-col gap-2 h-full'>
                        <InputFeid
                            placeholder="equipment name..."
                            name="equipmentName"
                            onChange={(value) => { handleInputChange('name', value) }}
                            errerMsg={error.name}
                            sendValue={formData.name}
                        />
                        <InputFeid
                            placeholder="unitPrice"
                            name="unitPrice"
                            onChange={(value) => { handleInputChange('unitPrice', value) }}
                            errerMsg={error.unitPrice}
                            sendValue={formData.unitPrice}
                        />
                    </div>
                    <AppButton  onClick={handleClick} className={'w-full'}>{t("Add")}</AppButton>
                </div>
            </Comman>
        </>
    );
}

export default EquipmentAvailable;

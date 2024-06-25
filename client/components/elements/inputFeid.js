
import React, { useEffect, useState } from 'react';

function InputFeid({placeholder , type = "text",errerMsg: errorMsg,onChange,sendValue }) {

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const handleInputChange = (e)=>{
        setValue(e.target.value)
        if(onChange)
        onChange(e.target.value)
    }
    useEffect(()=>{
        setValue(sendValue)
    },[sendValue])
    useEffect(()=>{
        
        setError(error)
    },[errorMsg])
    return (
        <>
            <div className={`${errorMsg && 'error'}`}>
                <input
                    type={type}
                    value={value|| ""}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={errorMsg ? "app-field error" : "app-field"}
                />  
                {errorMsg && <p className="error-msg" dangerouslySetInnerHTML={{ __html: errorMsg }}/>}
            </div>
        </>
    );
}

export default InputFeid;

import React, { useEffect, useState } from 'react';
import Icon from '../../components/Icons';
import { useTranslation } from 'react-i18next';

function ListInput({ onChange, name, placeholder, onClick, children, listdiv, target, remove, enable = true, value }) {
    const { t } = useTranslation();
    const [word, setWord] = useState('')
    const [list, setList] = useState([])
    console.log({listdiv})

    useEffect(() => {
        if (onChange)
            onChange(list)
    }, [list.length])

    useEffect(() => {
        if (listdiv)
            setList(listdiv)
    }, [listdiv && listdiv.length])

    useEffect(() => {
        if (value)
            setList(value);
    }, [value]);

    const addword = () => {
        if (word) {
            setList(prevList => ([...prevList, word]));
            setWord('')
        }
    };

    const removeWord = (index) => {
        setList(prevList => prevList.filter((_, i) => i !== index));
        if (remove)
            remove(index)

    };


    return (
        <>
            <div className="relative cursor-pointer" data-popup-toggle="popup" data-popup-target={target}>
                {
                    !enable ? (<div className={`${"inputStyle1"} pr-14 capitalize opacity-45`}>
                        {placeholder}
                    </div>
                    ) :
                        (<input
                            placeholder={placeholder}
                            className={`${"inputStyle1"} pr-14`}
                            value={word || ""}
                            onChange={(e) => { setWord(e.target.value) }}
                            name={name}
                        />)}
                <div >
                    <div className="absolute flex items-center w-auto right-0 top-1/2 transform -translate-y-1/2" onClick={addword ? addword : onClick}>
                        <span className="text-[#08D335] text-xs font-semibold">{t("Add")}</span>
                        <div className="size-5 p-1">
                            <Icon className="text-[#08D335] w-full text-sm" name="plus" />
                        </div>
                    </div>
                </div>
            </div>
            {children}
            {
                list.length > 0 && !children &&
                <div className="py-2 flex flex-wrap gap-3">
                    {list.map((value, index) => (
                        <div key={index} className="border border-primary rounded-2xl px-1 py-1 flex gap-2 items-start justify-between min-w-40 text-primary">
                            {value}
                            <div onClick={() => removeWord(index)} className='cursor-pointer'>
                                <Icon name='remove' className="size-6 p-1 text-white bg-primary rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default ListInput;

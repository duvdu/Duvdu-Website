import React, { useEffect, useState } from 'react';
import Icon from '../../components/Icons';

function ListInput({ onChange, name, placeholder, onClick, children, listdiv, target, remove, enable = true }) {
    const [word, setWord] = useState('')
    const [list, setList] = useState([])


    useEffect(() => {
        if (onChange)
            onChange(list)
    }, [list.length])

    useEffect(() => {
        if (listdiv)
            setList(listdiv)
    }, [listdiv && listdiv.length])

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

    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    return (
        <>
            <div className="relative">
                {
                    !enable ? (<div className={`${inputStyle} pr-14 capitalize opacity-45`}>
                        {placeholder}
                    </div>
                    ) :
                        (<input
                            placeholder={placeholder}
                            className={`${inputStyle} pr-14`}
                            value={word}
                            onChange={(e) => { setWord(e.target.value) }}
                            name={name}
                        />)}
                <div data-popup-toggle="popup" data-popup-target={target}>
                    <div data-popup-toggle="popup" data-popup-target={target} className="absolute flex items-center w-auto right-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <span className="text-[#08D335] text-xs font-semibold">Add</span>
                        <div className="size-5 p-1">
                            <Icon className="text-[#08D335] w-full text-sm" name="plus" />
                        </div>
                    </div>
                </div>
            </div>
            {children}
            {
                list.length > 0 && !children &&
                <div className="py-2 flex flex-wrap">
                    {list.map((value, index) => (
                        <div key={index} className="opacity-60 border rounded-full px-3 py-1 flex gap-2 items-center justify-between">
                            <span dangerouslySetInnerHTML={{ __html: value }} />
                            <div onClick={() => removeWord(index)} className='cursor-pointer'>
                                <Icon name='remove' className="size-4 text-white bg-red-800 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default ListInput;

import React, { useEffect, useState } from 'react';
import Icon from '../../components/Icons';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { GetPlatforms } from '../../redux/action/apis/cycles/producer/platform';

function ListInputSearchAPI({ onChange,GetPlatforms,GetPlatforms_respond, name, placeholder, onClick, children, listdiv, target, remove, enable = true, value }) {
    const { t } = useTranslation();
    const [word, setWord] = useState('')
    const [list, setList] = useState([])
    const [creatives, setCreatives] = useState([]);
    const [_searchTo, _setSearchTo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isMap, setIsMap] = useState(false);
    useEffect(() => {
        if (GetPlatforms_respond?.message == "success"){
            setIsLoading(false);
        const filterData = GetPlatforms_respond?.data?.filter(items=> !list.map(i=>i._id).includes(items._id))
            setCreatives(filterData)
        }
    }, [GetPlatforms_respond , list])

    useEffect(() => {
        if (GetPlatforms_respond?.loading) {
            setIsLoading(true);
            setCreatives([])
        } else if (_searchTo != word && word.length>1) {
            setIsMap(true)
            setIsLoading(false);
            _setSearchTo(word);
            GetPlatforms({search:word});
        }
    }, [word, GetPlatforms_respond]);

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

    const addword = (value) => {
            setList(prevList => ([...prevList, value]));
            setWord('')
    };

    const removeWord = (index) => {
        setList(prevList => prevList.filter((_, i) => i !== index));
        setIsMap(false)
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
                    <div className="absolute flex items-center w-auto right-0 top-1/2 transform -translate-y-1/2" onClick={()=> addword ? addword({_id:word , name:word}) : onClick}>
                        <span className="text-[#08D335] text-xs font-semibold">{t("Add")}</span>
                        <div className="size-5 p-1">
                            <Icon className="text-[#08D335] w-full text-sm" name="plus" />
                        </div>
                    </div>
                </div>
            </div>
            {
                list.length > 0 &&
                <div className="py-2 flex flex-wrap gap-3">
                    {list.map((value, index) => (
                        <div key={index} className="border border-primary rounded-2xl px-1 py-1 flex gap-2 items-start justify-between min-w-40 text-primary">
                            {value?.name}
                            <div onClick={() => removeWord(index)} className='cursor-pointer'>
                                <Icon name='remove' className="size-6 p-1 text-white bg-primary rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            }
            {creatives?.length>0 && isMap &&
                <div className="py-2 flex flex-wrap gap-3">
                    {creatives.map((value, index) => (
                        <div onClick={()=> addword(value)} key={index} className="border border-primary rounded-2xl px-1 py-1 flex gap-2 items-start justify-between min-w-40 text-primary">
                            {value.name}
                        </div>
                    ))}
                </div>
            
            }
        </>
    );
}
const mapStateToProps = (state) => ({
    GetPlatforms_respond: state.api.GetPlatforms,
    api: state.api
});

const mapDispatchToProps = {
    GetPlatforms,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListInputSearchAPI);
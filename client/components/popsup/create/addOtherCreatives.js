import React, { useEffect, useState } from 'react';
import Comman from './assets/comman';
import InputFeid from '../../elements/inputFeid';
import AppButton from '../../elements/button';
import { connect } from 'react-redux';
import { FindUser } from '../../../redux/action/apis/auth/profile/FindUser';
import { getMyprofile } from '../../../redux/action/apis/auth/profile/getProfile';
import { ClosePopUp } from '../../../util/util';
import { useTranslation } from 'react-i18next';
import Icon from '../../Icons';
import CategorySelection from '../../drawer/create/assets/projectCategorySelection';

function AddOtherCreatives({ onSubmit, FindUser, FindUser_respond, api }) {
    const { t } = useTranslation();

    const [creatives, setCreatives] = useState([]);
    const [searchTo, setSearchTo] = useState(null);
    const [_searchTo, _setSearchTo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        _id: '',
        category: '',
        subCategoryId:'',
        tagsId: [],
        relatedCategory: '',
        relatedSubCategory: '',
        relatedTags: []            
    });
    const [error, setError] = useState({
        name: '',
        category: ''
    });
    const [selectedCreativeId, setSelectedCreativeId] = useState(null); // New state for selected creative ID

    useEffect(() => {
        if (FindUser_respond?.message === "success") {
            setIsLoading(false);
            setCreatives(FindUser_respond?.data);
        }
    }, [FindUser_respond]);

    useEffect(() => {
        if (FindUser_respond?.loading) {
            setIsLoading(true);
            setCreatives([]);
        } else if (_searchTo !== searchTo) {
            setIsLoading(false);
            _setSearchTo(searchTo);
            FindUser({ search: searchTo });
        }
    }, [searchTo, FindUser_respond?.loading]);

    const handleInputChange = (name, value) => {
        if (name === 'name') {
            if (value.length >= 3) {
                setSearchTo(value);
            } else {
                setCreatives([]);
            }
        }
    };

    const handleCategoryChange = (categoryData) => {
        setFormData(prev => ({
            ...prev,
            category: categoryData.category,
            subCategoryId:categoryData.subCategory,
            tagsId: categoryData.tags,
            relatedCategory: categoryData.relatedCategory,
            relatedSubCategory: categoryData.relatedSubCategory,
            relatedTags: categoryData.relatedTags
        }));
    };

    const onclick = () => {
        setError({ name: '', category: '' });

        if (!formData.name) {
            setError(prev => ({ ...prev, name: 'Username or phone number is required.' }));
            return;
        }

        if (!formData.category) {
            setError(prev => ({ ...prev, category: 'Category selection is required.' }));
            return;
        }
        
        // Format data according to whether it's an invited creative or regular creative
        const formattedData = {
            ...formData,
            invitedCreatives: formData.invitedCreatives 
                ? formData
                : undefined,
            creatives: !formData.invitedCreatives 
                ? formData
                : undefined
        };

        setFormData({ 
            name: '',
            _id: '',
            category: '',
            subCategoryId:'',
            tagsId: [],
            relatedCategory: '',
            relatedSubCategory: '',
            relatedTags: []                
        });
        setIsReset(true)
        onSubmit(formattedData);
        ClosePopUp("addOtherCreatives");
        setSearchTo(null);
    };

    const onCancel = () => {
        setFormData({ name: '' });
        setError({ name: '', category: '' });
        setCreatives([]);
        setSearchTo(null);
        setSelectedCreativeId(null); // Reset selection on cancel
    };

    const handleCreativeSelect = (selectedCreative) => {
        setFormData(prev => ({
            ...prev,
            name: selectedCreative.name,
            profileImage: selectedCreative.profileImage,
            username: selectedCreative.username,
            _id: selectedCreative._id,
            invitedCreatives: selectedCreative.invitedCreatives,
        }));
        setSelectedCreativeId(selectedCreative._id); // Set the selected creative ID
        // setCreatives([]);
    };
    const removeCreative = ()=>{
        setCreatives([]);
        setSelectedCreativeId(null)
        setSearchTo(null)
        setFormData({
            name: '',
            _id: ''
        })
    }
    return (
        <>
            <Comman id={"addOtherCreatives"} header={"Add Other Creatives"} onCancel={onCancel}>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-4'>
                        <div className='w-full'>
                            <InputFeid
                                placeholder={t("username or phone number")}
                                name="name"
                                onChange={(value) => { handleInputChange('name', value) }}
                                errerMsg={error.name}
                                sendValue={formData.name}
                            />
                        </div>
                        {formData.name && isLoading &&
                            <div className="load-parent">
                                <img className="h-full" src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        }
                        <ul className="flex flex-wrap gap-2">
                            {searchTo?.length > 0 && creatives?.length === 0 && searchTo && searchTo !== formData.name &&
                                <li
                                    className="flex items-center text-base opacity-80 font-medium border-[1.5px] border-[#0000004d] dark:border-[#ffffff4d] rounded-full cursor-pointer"
                                    onClick={() => handleCreativeSelect({
                                        name: searchTo,
                                        _id: searchTo,
                                        invitedCreatives: true
                                    })}
                                >
                                    <div className="capitalize mx-2 ">{searchTo}</div>
                                </li>
                            }
                            {searchTo?.length > 0 && creatives?.map((item, index) => (
                                <li
                                    className={`flex items-center text-base opacity-80 font-medium border-[1.5px] ${selectedCreativeId === item._id ? 'border-primary' : 'border-[#0000004d] dark:border-[#ffffff4d]'} rounded-full cursor-pointer`}
                                    key={index}
                                >
                                    <div className='flex items-center'
                                    onClick={() => handleCreativeSelect({
                                        ...item,
                                        invitedCreatives: false
                                    })}>
                                    {item.profileImage &&
                                        <img className='aspect-square rounded-full size-6 border' src={item.profileImage} alt='user img' />}
                                    <div className="capitalize mx-2 ">{item.name}</div>
                                    </div>
                                    {selectedCreativeId === item._id && 
                                        <div className='bg-primary rounded-full aspect-square size-5 flex flex-col justify-center items-center' onClick={removeCreative}>
                                            <Icon name={'xmark'} className='text-white size-4' />
                                        </div>
                                    }
                            
                                </li>
                            ))}
                        </ul>
                        <span className='text-xs font-semibold text-[#595959] hidden'>
                            This creative doesn't have an account?
                            <span onClick={() => { }} className='text-primary font-bold'> Send Invitation</span>
                        </span>

                        {/* {selectedCreativeId && ( */}
                            <div className="mb-4">
                                <CategorySelection
                                    filterIn={'project'}
                                    value={{
                                        'category': formData.category,
                                        'subCategoryId': formData.subCategoryId,
                                        'tagsId': formData.tagsId,
                                        'relatedCategory': formData.relatedCategory,
                                        'relatedSubCategory':formData.relatedSubCategory,
                                        'relatedTags': formData.relatedTags
                                    }}
                                    onChange={handleCategoryChange}
                                    isReset={isReset}
                                    setIsReset={setIsReset}
                                />
                                {error.category && (
                                    <p className="text-red-500 text-sm mt-1">{error.category}</p>
                                )}
                            </div>
                        {/* )} */}
                    </div>
                    <div>
                        <AppButton onClick={onclick} className={'w-full'}>
                            {(formData.invitedCreatives) ? t("Invite") : t("Add")}
                        </AppButton>
                    </div>
                </div>
            </Comman>
        </>
    );
}

const mapStateToProps = (state) => ({
    FindUser_respond: state.api.FindUser,
    api: state.api
});

const mapDispatchToProps = {
    FindUser,
    getMyprofile
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOtherCreatives);

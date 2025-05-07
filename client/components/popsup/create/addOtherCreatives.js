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

function AddOtherCreatives({ onSubmit, FindUser, FindUser_respond }) {
    const { t } = useTranslation();

    const [creatives, setCreatives] = useState([]);
    const [searchTo, setSearchTo] = useState(null);
    const [_searchTo, _setSearchTo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [selectedCreativeId, setSelectedCreativeId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        _id: '',
        category: '',
        subCategoryId: '',
        tagsId: [],
        relatedCategory: '',
        relatedSubCategory: '',
        relatedTags: [],
        invitedCreatives: false
    });
    const [error, setError] = useState({
        name: '',
        category: ''
    });

    const isEgyptianPhoneNumber = (input) => {
        const regex = /^(01)[0-2,5]{1}[0-9]{8}$/;
        return regex.test(input);
    };

    useEffect(() => {
        return () => {
            setCreatives([]);
            setSelectedCreativeId(null);
        };
    }, []);

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
        } else if (_searchTo !== searchTo && searchTo?.length >= 3) {
            setIsLoading(false);
            _setSearchTo(searchTo);
            FindUser({ search: searchTo });
        }
    }, [searchTo, FindUser_respond?.loading]);

    const handleInputChange = (name, value) => {
        if (name === 'name') {
            setFormData(prev => ({
                ...prev,
                name: value,
                invitedCreatives: isEgyptianPhoneNumber(value) && creatives.length === 0,
                _id: ''
            }));
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
            subCategoryId: categoryData.subCategory,
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

        if (!formData._id && !isEgyptianPhoneNumber(formData.name)) {
            setError(prev => ({ ...prev, name: 'Only valid Egyptian phone numbers can be invited.' }));
            return;
        }

        if (!formData.category) {
            setError(prev => ({ ...prev, category: 'Category selection is required.' }));
            return;
        }

        const formattedData = {
            ...formData,
            invitedCreatives: formData._id ? false : true,
            creatives: formData._id ? formData : undefined,
        };

        onSubmit(formattedData);
        setFormData({
            name: '',
            _id: '',
            category: '',
            subCategoryId: '',
            tagsId: [],
            relatedCategory: '',
            relatedSubCategory: '',
            relatedTags: [],
            invitedCreatives: false
        });
        setIsReset(true);
        setSearchTo(null);
        ClosePopUp("addOtherCreatives");
    };

    const onCancel = () => {
        setFormData({
            name: '',
            _id: '',
            category: '',
            subCategoryId: '',
            tagsId: [],
            relatedCategory: '',
            relatedSubCategory: '',
            relatedTags: [],
            invitedCreatives: false
        });
        setCreatives([]);
        setSearchTo(null);
        setSelectedCreativeId(null);
        setError({ name: '', category: '' });
    };

    const handleCreativeSelect = (selectedCreative) => {
        setFormData(prev => ({
            ...prev,
            name: selectedCreative.name,
            _id: selectedCreative._id,
            profileImage: selectedCreative.profileImage,
            username: selectedCreative.username,
            invitedCreatives: false
        }));
        setSelectedCreativeId(selectedCreative._id);
    };

    const removeCreative = () => {
        setCreatives([]);
        setSearchTo(null);
        setSelectedCreativeId(null);
        setFormData(prev => ({
            ...prev,
            name: '',
            _id: '',
            invitedCreatives: false
        }));
    };

    return (
        <Comman id="addOtherCreatives" header="Add Other Creatives" onCancel={onCancel}>
            <div className="flex flex-col max-h-[85vh] w-full" style={{ height: 'auto' }}>
                <div className="flex-1 overflow-y-auto pr-1 max-h-[calc(85vh-120px)]">
                    <div className="flex flex-col gap-4">
                        <InputFeid
                            placeholder={t("username or phone number")}
                            name="name"
                            onChange={(value) => handleInputChange('name', value)}
                            errerMsg={error.name}
                            sendValue={formData.name}
                        />

                        {formData.name && isLoading && (
                            <div className="load-parent">
                                <img className="h-full" src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        )}

                        <ul className="flex flex-wrap gap-2">
                            {creatives?.map((item, index) => (
                                <li
                                    key={index}
                                    className={`flex items-center text-base opacity-80 font-medium border-[1.5px] ${selectedCreativeId === item._id ? 'border-primary' : 'border-[#0000004d] dark:border-[#ffffff4d]'} rounded-full cursor-pointer`}
                                >
                                    <div
                                        className="flex items-center"
                                        onClick={() =>
                                            handleCreativeSelect({
                                                ...item,
                                                invitedCreatives: false
                                            })
                                        }
                                    >
                                        {item.profileImage && (
                                            <img
                                                className="aspect-square rounded-full size-6 border"
                                                src={item.profileImage}
                                                alt="user"
                                            />
                                        )}
                                        <div className="capitalize mx-2 ">{item.name}</div>
                                    </div>
                                    {selectedCreativeId === item._id && (
                                        <div
                                            className="bg-primary rounded-full aspect-square size-5 flex flex-col justify-center items-center"
                                            onClick={removeCreative}
                                        >
                                            <Icon name="xmark" className="text-white size-4" />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="mb-6">
                            <CategorySelection
                                filterIn="project"
                                value={{
                                    category: formData.category,
                                    subCategoryId: formData.subCategoryId,
                                    tagsId: formData.tagsId,
                                    relatedCategory: formData.relatedCategory,
                                    relatedSubCategory: formData.relatedSubCategory,
                                    relatedTags: formData.relatedTags
                                }}
                                onChange={handleCategoryChange}
                                isReset={isReset}
                                setIsReset={setIsReset}
                            />
                            {error.category && <p className="text-red-500 text-sm mt-1">{error.category}</p>}
                        </div>
                    </div>
                </div>

                {formData.name && (
                    <div className="pt-4 pb-6">
                        {formData._id ? (
                            <AppButton onClick={onclick} className="w-full">
                                {t("Add")}
                            </AppButton>
                        ) : isEgyptianPhoneNumber(formData.name) ? (
                            <AppButton onClick={onclick} className="w-full">
                                {t("Invite")}
                            </AppButton>
                        ) : null}
                    </div>
                )}

            </div>
        </Comman>
    );
}

const mapStateToProps = (state) => ({
    FindUser_respond: state.api.FindUser
});

const mapDispatchToProps = {
    FindUser,
    getMyprofile
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOtherCreatives);

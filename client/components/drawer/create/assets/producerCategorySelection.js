import React, { useEffect, useState } from 'react';
import Icon from '../../../Icons';
import { connect } from 'react-redux';
import { filterByCycle as filterByCycleCategory, } from '../../../../util/util';
import { useTranslation } from 'react-i18next';


function ProducerCategorySelection({ categories, onChange, value, filterIn, onValidateChange }) {
    const { t } = useTranslation();

    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [validationError, setValidationError] = useState('');
    categories = filterByCycleCategory(categories, filterIn);

    useEffect(() => {
        onValidateChange(validationError)
    },[validationError])

    useEffect(() => {
        const selectedCategory = categories?.find(category => category._id === value?.category);
        setSelectedCategory(selectedCategory || {});

        if (selectedCategory) {
            const selectedSubCategories = value?.subCategories?.map(subCatObj =>
                selectedCategory.subCategories.find(subcategory => subcategory._id === subCatObj.subcategory)
            ).filter(Boolean);
            setSelectedSubCategories(selectedSubCategories || []);

            const selectedTags = value?.subCategories?.reduce((acc, subCatObj) => {
                const tags = subCatObj.tags?.map(tagId => {
                    const subcategory = selectedCategory.subCategories.find(sub => sub._id === subCatObj.subcategory);
                    return subcategory?.tags.find(tag => tag._id === tagId);
                }).filter(Boolean);
                return tags ? [...acc, ...tags]:[...acc];
            }, []);

            setSelectedTags(selectedTags || []);
        } else {
            setSelectedSubCategories([]);
            setSelectedTags([]);
        }
    }, [JSON.stringify(value)]);

    useEffect(() => {
        if (onChange) {
            const formattedSubCategories = selectedSubCategories.map(sub => ({
                subcategory: sub._id,
                tags: selectedTags.filter(tag => sub.tags.some(t => t._id === tag._id)).map(tag => tag._id)
            }));
            onChange({
                category: selectedCategory._id,
                subCategories: formattedSubCategories,
            });
        }
    }, [selectedCategory, selectedSubCategories, selectedTags]);

    useEffect(() => {
            const error = validateTags();
            setValidationError(error);
    }, [selectedTags]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategories([]);
        setSelectedTags([]);
        setValidationError('');
    };

    const togglesubcategory = (subcategory) => {
        if (selectedSubCategories.some(sub => sub._id === subcategory._id)) {
            setSelectedSubCategories(selectedSubCategories.filter(sub => sub._id !== subcategory._id));
        } else {
            setSelectedSubCategories([...selectedSubCategories, subcategory]);
        }
        setValidationError('');
    };

    const toggleTag = (tag) => {
        if (selectedTags.some(t => t._id === tag._id)) {
            setSelectedTags(selectedTags.filter(t => t._id !== tag._id));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
        setValidationError('');
    };

    const validateTags = () => {
        for (const subcategory of selectedSubCategories) {
            const subcategoryTags = selectedTags.filter(tag => subcategory.tags.some(t => t._id === tag._id));

            if (subcategoryTags.length === 0) {
                return `Please select at least one tag for the subcategory "${subcategory.title}".`;
            }
        }
        return '';
    };

    if (!categories || categories.length === 0) return <p>{t("No categories available.")}</p>;

    return (
        <>
            <section>
                <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Service Category")}</h3>
                {!selectedCategory._id ? (
                    <div className="flex gap-3 flex-wrap">
                        {categories.map((item) =>
                            <div key={item._id}
                                className={`py-1 px-2 border ${selectedCategory._id === item._id ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                onClick={() => handleCategorySelect(item)}>
                                <div className={`whitespace-nowrap font-medium ${selectedCategory._id === item._id ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                    {item.title}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-1 px-2 border border-primary rounded-full cursor-pointer w-min" >
                        <div className="whitespace-nowrap font-medium text-primary opacity-80 flex gap-2 items-center">
                            {selectedCategory.title}
                            <div className='bg-primary rounded-full aspect-square size-5 flex flex-col justify-center items-center' onClick={() => handleCategorySelect({})}>
                                <Icon name={'xmark'} className='text-white size-4' />
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {selectedCategory._id && (
                <section>
                    <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Subcategories")}</h3>
                    <div className="flex gap-3 flex-wrap">
                        {selectedCategory.subCategories.map((subcategory) => (
                            <div key={subcategory._id}
                                className={`py-1 px-2 border ${selectedSubCategories.some(sub => sub._id === subcategory._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                onClick={() => togglesubcategory(subcategory)}>
                                <div className={`whitespace-nowrap font-medium ${selectedSubCategories.some(sub => sub._id === subcategory._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                    {subcategory.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {selectedSubCategories.map((subcategory) => (
                <section key={subcategory._id}>
                    <h3 className='opacity-60 my-2 text-lg font-bold'>{subcategory.title} Tags</h3>
                    <div className="flex gap-3 flex-wrap">
                        {subcategory.tags.map((tag) => (
                            <div key={tag._id}
                                className={`py-1 px-2 border ${selectedTags.some(t => t._id === tag._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                onClick={() => toggleTag(tag)}>
                                <div className={`whitespace-nowrap font-medium ${selectedTags.some(t => t._id === tag._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                    {tag.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerCategorySelection);

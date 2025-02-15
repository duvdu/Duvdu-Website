import React, { useEffect, useState } from 'react';
import Icon from '../../../Icons';
import { connect } from 'react-redux';
import { filterByCycle as filterByCycleCategory } from "../../../../util/util";
import { useTranslation } from 'react-i18next';

function CategorySelection({ categories, onChange, value, filterIn, isRemove, isReset, setIsReset }) {
    const { t } = useTranslation();
    categories = filterByCycleCategory(categories, filterIn);

    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);
    
    const [selectedRelatedCategory, setSelectedRelatedCategory] = useState({});
    const [selectedRelatedSubCategory, setSelectedRelatedSubCategory] = useState({});
    const [selectedRelatedTags, setSelectedRelatedTags] = useState([]);

    useEffect(() => {
        if (isReset) {
            setSelectedCategory({});
            setSelectedSubCategory({});
            setSelectedTags([]);
            setSelectedRelatedCategory({});
            setSelectedRelatedSubCategory({});
            setSelectedRelatedTags([]);
            setIsReset(false);
        }
    }, [isReset]);

    useEffect(() => {
        const selectedCategory = categories.find(category => category._id === value?.category);
        setSelectedCategory(selectedCategory || {});

        if (selectedCategory) {
            const selectedSubCategory = selectedCategory.subCategories.find(subCategory => subCategory._id === value?.subCategory);
            setSelectedSubCategory(selectedSubCategory || {});
            if(selectedSubCategory){
                const selectedRelatedCategory = selectedCategory.relatedCategory.find(related => related._id === value?.relatedCategory);
                setSelectedRelatedCategory(selectedRelatedCategory || {})
                if(selectedRelatedCategory){
                    const selectedRelatedSubCategory = selectedRelatedCategory.subCategories.find(related => related._id === value?.relatedSubCategory);
                    setSelectedRelatedSubCategory(selectedRelatedSubCategory || {})
                    if(selectedRelatedSubCategory){
                        setSelectedRelatedTags(value?.relatedTags || []);
                    }
                }
            }
        } else {
            setSelectedSubCategory({});
        }

        setSelectedTags(value?.tags || []);
    }, []);

    useEffect(() => {
        Change();
    }, [selectedCategory, selectedSubCategory, selectedTags, selectedRelatedCategory, selectedRelatedSubCategory, selectedRelatedTags]);

    const Change = () => {
        if (onChange)
            onChange({
                category: selectedCategory._id,
                subCategory: selectedSubCategory._id,
                tags: selectedTags.map(tag => tag),
                relatedCategory: selectedRelatedCategory._id,
                relatedSubCategory: selectedRelatedSubCategory._id,
                relatedTags: selectedRelatedTags.map(tag => tag),
            });
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory({});
        setSelectedTags([]);
        setSelectedRelatedCategory({})
        setSelectedRelatedSubCategory({});
        setSelectedRelatedTags([]);
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSelectedTags([]);
        setSelectedRelatedCategory({})
        setSelectedRelatedSubCategory({});
        setSelectedRelatedTags([]);
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleRelatedCategorySelect = (category) => {
        setSelectedRelatedCategory(category);
        setSelectedRelatedSubCategory({});
        setSelectedRelatedTags([]);
    };

    const handleRelatedSubCategorySelect = (subCategory) => {
        setSelectedRelatedSubCategory(subCategory);
        setSelectedRelatedTags([]);
    };

    const toggleRelatedTag = (tag) => {
        if (selectedRelatedTags.includes(tag)) {
            setSelectedRelatedTags(selectedRelatedTags.filter(t => t !== tag));
        } else {
            setSelectedRelatedTags([...selectedRelatedTags, tag]);
        }
    };

    if (!categories || categories.length === 0) return <p>{t("No categories available.")}</p>;

    return (
        <>
            <section>
                <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Service Category")}</h3>
                {/* Main Category Selection */}
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
                            {!isRemove &&
                                <div className='bg-primary rounded-full aspect-square size-5 flex flex-col justify-center items-center' onClick={() => handleCategorySelect({})}>
                                    <Icon name={'xmark'} className='text-white size-4' />
                                </div>
                            }
                        </div>
                    </div>
                )}
            </section>

            {selectedCategory._id && (
                <section>
                    <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Subcategories")}</h3>
                    <div className="flex gap-3 flex-wrap">
                        {!selectedSubCategory._id ?
                            (
                                selectedCategory.subCategories.map((item) =>
                                    <div key={item._id}
                                        className={`py-1 px-2 border ${selectedSubCategory._id === item._id ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                        onClick={() => handleSubCategorySelect(item)}>
                                        <div className={`whitespace-nowrap font-medium ${selectedSubCategory._id === item._id ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                            {item.title}
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="py-1 px-2 border border-primary rounded-full cursor-pointer " >
                                    <div className="whitespace-nowrap font-medium text-primary opacity-80 flex gap-2 items-center">
                                        {selectedSubCategory.title}
                                        <div className='bg-primary rounded-full aspect-square size-5 flex flex-col justify-center items-center' onClick={() => handleSubCategorySelect({})}>
                                            <Icon name={'xmark'} className='text-white size-4' />
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </section>
            )}

            {
                selectedCategory._id &&
                selectedSubCategory._id && 
                (
                    <section>
                        <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Tags")}</h3>
                        <div className="flex gap-3 flex-wrap">
                            {selectedSubCategory.tags.map((tag,index) => (
                                <div key={index}
                                    className={`py-1 px-2 border ${selectedTags.some(t => t === tag._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                    onClick={() => toggleTag(tag._id)}>
                                    <div className={`whitespace-nowrap font-medium ${selectedTags.some(t => t === tag._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                        {tag.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            {selectedCategory.relatedCategory?.length > 0 && selectedCategory._id  && selectedSubCategory._id &&  (
                <section>
                    <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Related Category")}</h3>
                    {!selectedRelatedCategory._id ? (
                        <div className="flex gap-3 flex-wrap">
                            {selectedCategory.relatedCategory.map((item) =>
                                <div key={item._id}
                                    className={`py-1 px-2 border ${selectedRelatedCategory._id === item._id ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                    onClick={() => handleRelatedCategorySelect(item)}>
                                    <div className={`whitespace-nowrap font-medium ${selectedRelatedCategory._id === item._id ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                        {item.title}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-1 px-2 border border-primary rounded-full cursor-pointer w-min" >
                            <div className="whitespace-nowrap font-medium text-primary opacity-80 flex gap-2 items-center">
                                {selectedRelatedCategory.title}
                                <div className='bg-primary rounded-full aspect-square size-5 flex flex-col justify-center items-center' onClick={() => handleRelatedCategorySelect({})}>
                                    <Icon name={'xmark'} className='text-white size-4' />
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            )}
            {selectedRelatedCategory._id && selectedCategory._id && selectedSubCategory._id && (
                <section>
                    <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Related Subcategories")}</h3>
                    <div className="flex gap-3 flex-wrap">
                        {!selectedRelatedSubCategory._id ?
                            (
                                selectedRelatedCategory.subCategories.map((item) =>
                                    <div key={item._id}
                                        className={`py-1 px-2 border ${selectedRelatedSubCategory._id === item._id ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                        onClick={() => handleRelatedSubCategorySelect(item)}>
                                        <div className={`whitespace-nowrap font-medium ${selectedRelatedSubCategory._id === item._id ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                            {item.title}
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="py-1 px-2 border border-primary rounded-full cursor-pointer " >
                                    <div className="whitespace-nowrap font-medium text-primary opacity-80 flex gap-2 items-center">
                                        {selectedRelatedSubCategory.title}
                                        <div className='bg-primary rounded-full aspect-square size-5 flex flex-col justify-center items-center' onClick={() => handleRelatedSubCategorySelect({})}>
                                            <Icon name={'xmark'} className='text-white size-4' />
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </section>
            )}

            {
                selectedRelatedCategory._id &&
                selectedRelatedSubCategory._id && 
                selectedCategory._id &&
                selectedSubCategory._id &&
                (
                    <section>
                        <h3 className='opacity-60 my-2 text-lg font-bold'>{t("Related Tags")}</h3>
                        <div className="flex gap-3 flex-wrap">
                            {selectedRelatedSubCategory.tags.map((tag,index) => (
                                <div key={index}
                                    className={`py-1 px-2 border ${selectedRelatedTags.some(t => t === tag._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                    onClick={() => toggleRelatedTag(tag._id)}>
                                    <div className={`whitespace-nowrap font-medium ${selectedRelatedTags.some(t => t === tag._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                        {tag.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

        </>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories,
});

export default connect(mapStateToProps)(CategorySelection);

import React, { useEffect, useState } from 'react';
import Icon from '../../../Icons';
import { connect } from 'react-redux';
import { filterByCycle as filterByCycleCategory, } from "../../../../util/util";
import { useTranslation } from 'react-i18next';


function CategorySelection({ categories, onChange, value, filterIn }) {
    const { t } = useTranslation();
    categories = filterByCycleCategory(categories, filterIn)
    if (!categories || categories.length === 0) return <p>{t("No categories available.")}</p>;

    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const selectedCategory = categories.find(category => category._id === value?.category);
        setSelectedCategory(selectedCategory || {});

        if (selectedCategory) {
            const selectedSubCategory = selectedCategory.subCategories.find(subCategory => subCategory._id === value?.subCategory);
            setSelectedSubCategory(selectedSubCategory || {});
        } else {
            setSelectedSubCategory({});
        }

        setSelectedTags(value?.tags || []);
    }, []);

    useEffect(() => {
        Change()
    }, [selectedCategory, selectedSubCategory, selectedTags])
    const Change = () => {
        if (onChange)
            onChange({
                category: selectedCategory._id,
                subCategory: selectedSubCategory._id,
                tags: selectedTags.map(tag => tag?._id || tag),
            })
        
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory({});
        setSelectedTags([]);

    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSelectedTags([]);

    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }

    };

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
                            {selectedSubCategory.tags.map((tag) => (
                                <div key={tag.id}
                                    className={`py-1 px-2 border ${selectedTags.some(t => t?._id === tag._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                    onClick={() => toggleTag(tag)}>
                                    <div className={`whitespace-nowrap font-medium ${selectedTags.some(t => t?._id === tag._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
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

const mapDispatchToProps = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CategorySelection);


import React, { useEffect, useState } from 'react';
import Icon from '../../../Icons';
import { connect } from 'react-redux';
import { filterByCycle as filterByCycleCategory } from '../../../../util/util';

function ProducerCategorySelection({ categories, onChange, value, filterIn }) {
    categories = filterByCycleCategory(categories, filterIn);
    if (!categories || categories.length === 0) return <p>No categories available.</p>;

    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // console.log(JSON.stringify(value) , value)
    useEffect(() => {
        const selectedCategory = categories.find(category => category._id === value?.category);
        setSelectedCategory(selectedCategory || {});

        if (selectedCategory) {
            const selectedSubCategories = value?.subCategories.map(subCatObj =>
                selectedCategory.subCategories.find(subCategory => subCategory._id === subCatObj.subCategory)
            ).filter(Boolean);

            setSelectedSubCategories(selectedSubCategories || []);

            const selectedTags = value?.subCategories.reduce((acc, subCatObj) => {
                return [...acc, ...subCatObj.tags];
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
                subCategory: sub._id,
                tags: selectedTags.filter(tag => sub.tags.includes(tag))
            }));
            onChange({
                category: selectedCategory._id,
                subCategories: formattedSubCategories,
            });
        }
    }, [selectedCategory, selectedSubCategories, selectedTags]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategories([]);
        setSelectedTags([]);
    };

    const toggleSubCategory = (subCategory) => {
        if (selectedSubCategories.some(sub => sub._id === subCategory._id)) {
            setSelectedSubCategories(selectedSubCategories.filter(sub => sub._id !== subCategory._id));
        } else {
            setSelectedSubCategories([...selectedSubCategories, subCategory]);
        }
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
                <h3 className='opacity-60 my-2 text-lg font-bold'>Service Category</h3>
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
                    <h3 className='opacity-60 my-2 text-lg font-bold'>Subcategories</h3>
                    <div className="flex gap-3 flex-wrap">
                        {selectedCategory.subCategories.map((subCategory) => (
                            <div key={subCategory._id}
                                className={`py-1 px-2 border ${selectedSubCategories.some(sub => sub._id === subCategory._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                onClick={() => toggleSubCategory(subCategory)}>
                                <div className={`whitespace-nowrap font-medium ${selectedSubCategories.some(sub => sub._id === subCategory._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                    {subCategory.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {selectedSubCategories.map((subCategory) => (
                <section key={subCategory._id}>
                    <h3 className='opacity-60 my-2 text-lg font-bold'>{subCategory.title} Tags</h3>
                    <div className="flex gap-3 flex-wrap">
                        {subCategory.tags.map((tag, index) => (
                            <div key={index}
                                className={`py-1 px-2 border ${selectedTags.includes(tag) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                                onClick={() => toggleTag(tag)}>
                                <div className={`whitespace-nowrap font-medium ${selectedTags.includes(tag) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                                    {tag}
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

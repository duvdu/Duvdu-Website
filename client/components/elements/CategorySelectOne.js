import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../../redux/action/apis/category/getCategories';
import Icon from '../Icons'; // Ensure the Icon component is correctly imported

function CategorySelectOne({ categories, onChange, value }) {
    const [selectedCategory, setSelectedCategory] = useState({});

    const handleCategorySelect = (category) => {
        const updatedCategory = category._id ? category : {};
        setSelectedCategory(updatedCategory);
        onChange?.(updatedCategory._id ? updatedCategory._id : null);
    };

    return (
        <section>
            {!selectedCategory._id ? (
                <div className="flex gap-3 flex-wrap">
                    {categories?.data?.filter(item=>!value?.includes(item._id))?.map((item) => (
                        <div key={item._id}
                            className={`py-1 px-2 border ${selectedCategory._id === item._id ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                            onClick={() => handleCategorySelect(item)}>
                            <div className={`whitespace-nowrap font-medium ${selectedCategory._id === item._id ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} font-bold`}>
                                {item.title}
                            </div>
                        </div>
                    ))}
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
    );
}

const mapStateToProps = (state) => ({
    categories: state.api.getCategory,
});

const mapDispatchToProps = {
    getCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelectOne);

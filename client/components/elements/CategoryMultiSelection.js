import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../../redux/action/apis/category/getCategories';

function CategoryMultiSelection({ categories, onChange }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const toggleCategory = (categoryId) => {
        const updatedSelection = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];

        setSelectedCategories(updatedSelection);
        onChange?.(updatedSelection);
    };

    return (
        <section>
            <div className="flex gap-3 flex-wrap">
                {categories?.data?.map((category, index) => (
                    <div key={index}
                        className={`py-1 px-2 border ${selectedCategories.includes(category._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                        onClick={() => toggleCategory(category._id)}>
                        <div className={`whitespace-nowrap font-medium ${selectedCategories.includes(category._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                            {category.title}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    categories: state.api.getCategory,
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMultiSelection);

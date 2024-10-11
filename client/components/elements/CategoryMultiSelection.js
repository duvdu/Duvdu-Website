import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../../redux/action/apis/category/getCategories';

function CategoryMultiSelection({ categories, onChange, value }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Sync initial selected categories from the value prop
    useEffect(() => {
        if (value && Array.isArray(value)) {
            setSelectedCategories(value);
        }
    }, [value]);

    const toggleCategory = (categoryId) => {
        // Check if the category is already selected
        const isAlreadySelected = selectedCategories.includes(categoryId);

        // Add or remove the category from the selectedCategories array
        let updatedSelection;
        if (isAlreadySelected) {
            updatedSelection = selectedCategories.filter(id => id !== categoryId); // Remove if already selected
        } else {
            updatedSelection = [...selectedCategories, categoryId]; // Add if not selected
        }

        // Update the state with the new selection
        setSelectedCategories(updatedSelection);

        // Trigger onChange callback with updated selection
        onChange?.(updatedSelection);
    };

    return (
        <section>
            <div className="flex gap-3 flex-wrap">
                {categories?.data?.map((category) => (
                    <div key={category._id}
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
    getCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMultiSelection);

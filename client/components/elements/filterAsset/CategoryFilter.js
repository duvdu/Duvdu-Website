import React, { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';

const CategoryFilter = ({ categories, cycle, onSelect }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        // Filter categories based on the cycle
        if (cycle) {
            const filtered = categories.filter(category => category.cycle === cycle);
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(categories);
        }
    }, [cycle, categories]);

    const categoryTitles = filteredCategories.map(category => category);

    const handleSelectCategory = (selectedCategory) => {
        setSelectedCategories(prev =>
            prev.includes(selectedCategory._id)
                ? prev.filter(cat => cat !== selectedCategory._id)
                : [...prev, selectedCategory._id]
        );
    };

    const handleApplyClick = () => {
        // Pass selected categories to the parent component
        onSelect(selectedCategories);
    };

    return (
        <FilterContainer>
            <FilterHeader>Category</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={categoryTitles}
                onSelect={handleSelectCategory}
                isSelected={selectedCategories}
            />
            <div className='h-12' />
            {categoryTitles.length > 0 && (
                <AppButton onClick={handleApplyClick} className='h-[60px]' contentClassName='text-base'>
                    Apply
                </AppButton>
            )}
        </FilterContainer>
    );
};

export default CategoryFilter;

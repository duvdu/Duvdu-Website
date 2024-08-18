import React, { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';

const SubCategoryFilter = ({ categories, cycle, onSelect }) => {
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    useEffect(() => {
        if (cycle) {
            // Find categories that match the selected cycle
            const categoriesInCycle = categories.filter(cat => cat.cycle === cycle);
            // Collect subcategories from those categories
            const subCategories = categoriesInCycle.flatMap(cat =>
                cat.subCategories.map(sub => sub)
            ) || [];
            setFilteredSubCategories(subCategories);
        } else {
            setFilteredSubCategories([]);
        }
    }, [cycle, categories]);

    const handleSelectSubCategory = (selectedSubCategory) => {
        setSelectedSubCategories(prev =>
            prev.includes(selectedSubCategory._id)
                ? prev.filter(sub => sub !== selectedSubCategory._id)
                : [...prev, selectedSubCategory._id]
        );
    };

    const handleApplyClick = () => {
        onSelect(selectedSubCategories);
    };

    return (
        <FilterContainer>
            <FilterHeader>Subcategories</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={filteredSubCategories}
                onSelect={handleSelectSubCategory}
                isSelected={selectedSubCategories}
            />
            <div className='h-12' />
            {filteredSubCategories.length > 0 && (
                <AppButton onClick={handleApplyClick} className='h-[60px]' contentClassName='text-base'>
                    Apply
                </AppButton>
            )}
        </FilterContainer>
    );
};

export default SubCategoryFilter;

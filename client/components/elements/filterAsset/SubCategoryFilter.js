import React, { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';
import { useTranslation } from 'react-i18next';

const SubCategoryFilter = ({ categories, cycle, onSelect, onFilterChange, toggleDrawer }) => {
    const { t } = useTranslation();
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    useEffect(() => {
        if (cycle) {
            const categoriesInCycle = categories.filter(cat => cat.cycle === cycle);
            const subCategories = categoriesInCycle.flatMap(cat => cat.subCategories) || [];
            setFilteredSubCategories(subCategories);
        } else {
            setFilteredSubCategories([]);
        }
    }, [cycle, categories]);

    const handleSelectSubCategory = (selectedSubCategory) => {
        const newSelectedSubCategories = selectedSubCategories.includes(selectedSubCategory._id)
            ? selectedSubCategories.filter(sub => sub !== selectedSubCategory._id)
            : [...selectedSubCategories, selectedSubCategory._id];

        setSelectedSubCategories(newSelectedSubCategories);

        // Call onFilterChange immediately when selection changes
        if (onFilterChange) {
            onFilterChange(newSelectedSubCategories);
        }
    };

    const handleApplyClick = () => {
        onSelect(selectedSubCategories);
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Subcategories")}</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={filteredSubCategories}
                onSelect={handleSelectSubCategory}
                isSelected={selectedSubCategories}
            />
            <div className='h-12' />
            {filteredSubCategories.length > 0 && (
                <AppButton onClick={handleApplyClick} className='hidden md:block h-[60px]' contentClassName='text-base'>
                {t("Apply")}

                </AppButton>
            )}
        </FilterContainer>
    );
};

export default SubCategoryFilter;

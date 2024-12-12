import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';
import { useTranslation } from 'react-i18next';

const CategoryFilter = ({ categories, cycle, onSelect, onFilterChange, toggleDrawer , clearFilter ,setClearFilter  }) => {
    const { t } = useTranslation();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const router = useRouter()
    useEffect(()=>{
        if(clearFilter)
            setSelectedCategories([])
    },[clearFilter])
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
        const newSelectedCategories = selectedCategories.includes(selectedCategory._id)
            ? selectedCategories.filter(cat => cat !== selectedCategory._id)
            : [...selectedCategories, selectedCategory._id];
        setClearFilter(false)
        setSelectedCategories([selectedCategory._id]);
        // Optionally, you can trigger the filter change immediately when a category is selected
        if (onFilterChange) {
            onFilterChange([selectedCategory._id]);
        }
    };

    const handleApplyClick = () => {
        // Pass selected categories to the parent component
        onSelect(selectedCategories);
        
        // Trigger the onFilterChange callback if needed
        if (onFilterChange) {
            onFilterChange(selectedCategories);
        }
    };
    useEffect(()=>{
        Object.entries(router.query).forEach(([key, value]) => {
            switch (key) {
              case 'category':
                setSelectedCategories([value])
            }})
    },[router.query])
    
    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Category")}</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={categoryTitles}
                onSelect={handleSelectCategory}
                isSelected={selectedCategories}
            />
            {/* <div className='h-12' />
            {categoryTitles.length > 0 && (
                <AppButton onClick={handleApplyClick} className='hidden md:block h-[60px]' contentClassName='text-base'>
                {t("Apply")}

                </AppButton>
            )} */}
        </FilterContainer>
    );
};

export default CategoryFilter;

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';
import { useTranslation } from 'react-i18next';

const SubCategoryFilter = ({ categories, cycle, onSelect, onFilterChange, toggleDrawer, clearFilter ,setClearFilter }) => {
    const { t } = useTranslation();
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const router = useRouter()
    const { category}=router.query
    useEffect(()=>{
        if(clearFilter)
            setSelectedSubCategories([])
    },[clearFilter])
    useEffect(() => {
        if (cycle) {
            const categoriesInCycle = category? categories.filter(cat => cat._id === category) : categories.filter(cat => cat.cycle === cycle);
            const subCategories = categoriesInCycle.flatMap(cat => cat.subCategories) || [];
            setFilteredSubCategories(subCategories);
        } else {
            setFilteredSubCategories([]);
        }
    }, [cycle, categories ,  category]);

    const handleSelectSubCategory = (selectedSubCategory) => {
        const newSelectedSubCategories = selectedSubCategories.includes(selectedSubCategory._id)
            ? selectedSubCategories.filter(sub => sub !== selectedSubCategory._id)
            : [...selectedSubCategories, selectedSubCategory._id];
        setSelectedSubCategories([selectedSubCategory._id]);
        setClearFilter(false)
        // Call onFilterChange immediately when selection changes
        if (onFilterChange) {
            onFilterChange([selectedSubCategory._id]);
        }
    };

    const handleApplyClick = () => {
        onSelect(selectedSubCategories);
    };
    useEffect(()=>{
        Object.entries(router.query).forEach(([key, value]) => {
            if(key ==='subCategory'){
                setSelectedSubCategories([value])
            }else if(key ==='category'){
                setSelectedSubCategories([])
            }
        })
    },[router.query])
        return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Subcategories")}</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={filteredSubCategories}
                onSelect={handleSelectSubCategory}
                isSelected={selectedSubCategories}
            />
            {/* <div className='h-12' />
            {filteredSubCategories.length > 0 && (
                <AppButton onClick={handleApplyClick} className='hidden md:block h-[60px]' contentClassName='text-base'>
                {t("Apply")}

                </AppButton>
            )} */}
        </FilterContainer>
    );
};

export default SubCategoryFilter;

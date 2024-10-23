import React, { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';
import { useTranslation } from 'react-i18next';

const PlatformFilter = ({ platforms, cycle, onSelect, onFilterChange, toggleDrawer }) => {
    const { t } = useTranslation();
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [filteredPlatforms, setFilteredPlatforms] = useState([]);
    useEffect(() => {
        if (cycle) {
            // const categoriesInCycle = platforms?.filter(cat => cat.cycle === cycle);
            // const Platforms = platforms?.flatMap(cat => cat.name) || [];
            setFilteredPlatforms(platforms ?? []);
        } else {
            setFilteredPlatforms([]);
        }
    }, [cycle, platforms]);

    const handleSelectSubCategory = (selectedSubCategory) => {
        const newSelectedPlatforms = selectedPlatforms.includes(selectedSubCategory._id)
            ? selectedPlatforms.filter(sub => sub !== selectedSubCategory._id)
            : [...selectedPlatforms, selectedSubCategory._id];

        setSelectedPlatforms(newSelectedPlatforms);

        // Call onFilterChange immediately when selection changes
        if (onFilterChange) {
            onFilterChange(newSelectedPlatforms);
        }
    };

    const handleApplyClick = () => {
        onSelect(selectedPlatforms);
    };
    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Platforms")}</FilterHeader>
            <div className='h-6'></div>
             <BoolOfPadges
                list={filteredPlatforms}
                onSelect={handleSelectSubCategory}
                isSelected={selectedPlatforms}
            /> 
            <div className='h-12' />
            {filteredPlatforms.length > 0 && (
                <AppButton onClick={handleApplyClick} className='hidden md:block h-[60px]' contentClassName='text-base'>
                {t("Apply")}

                </AppButton>
            )}
        </FilterContainer>
    );
};

export default PlatformFilter;

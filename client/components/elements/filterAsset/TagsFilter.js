import React, { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';
import { useTranslation } from 'react-i18next';

const Tags = ({ categories, cycle, onSelect, onFilterChange,toggleDrawer }) => {
    const { t } = useTranslation();
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);

    useEffect(() => {
        if (cycle) {
            // Find categories that match the selected cycle
            const categoriesInCycle = categories.filter(cat => cat.cycle === cycle);
            // Collect tags from all subcategories of those categories
            const tags = categoriesInCycle.flatMap(cat =>
                cat.subCategories.flatMap(sub => sub.tags)
            ) || [];
            setFilteredTags(tags);
        } else {
            setFilteredTags([]);
        }
    }, [cycle, categories]);

    const tagTitles = filteredTags.map(tag => tag); // Assuming tag has a 'name' property

    const handleSelectTag = (selectedTag) => {
        const tagId = selectedTag._id;
        const newSelectedTags = selectedTags.includes(tagId)
            ? selectedTags.filter(tag => tag !== tagId)
            : [...selectedTags, tagId];
        
        setSelectedTags(newSelectedTags);

        // Notify parent component with real-time updates
        if (onFilterChange) {
            onFilterChange(newSelectedTags);
        }
    };

    const handleApplyClick = () => {
        onSelect(selectedTags);
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Tags")}</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={tagTitles}
                onSelect={handleSelectTag}
                isSelected={selectedTags}
            />
            <div className='h-12' />
            {tagTitles.length > 0 && (
                <AppButton onClick={handleApplyClick} className='hidden md:block h-[60px]' contentClassName='text-base'>
                    {t("Apply")}
                </AppButton>
            )}
        </FilterContainer>
    );
};

export default Tags;

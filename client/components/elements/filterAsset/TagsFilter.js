import React, { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';

const Tags = ({ categories, cycle, onSelect }) => {
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

    const tagTitles = filteredTags.map(tag => tag);

    const handleSelectTag = (selectedTag) => {
        setSelectedTags(prev =>
            prev.includes(selectedTag._id)
                ? prev.filter(tag => tag !== selectedTag._id)
                : [...prev, selectedTag._id]
        );
    };

    const handleApplyClick = () => {
        onSelect(selectedTags);
    };

    return (
        <FilterContainer>
            <FilterHeader>Tags</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={tagTitles}
                onSelect={handleSelectTag}
                isSelected={selectedTags}
            />
            <div className='h-12' />
            {tagTitles.length > 0 && (
                <AppButton onClick={handleApplyClick} className='h-[60px]' contentClassName='text-base'>
                    Apply
                </AppButton>
            )}
        </FilterContainer>
    );
};

export default Tags;

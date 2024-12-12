import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';
import AppButton from '../button';
import FilterHeader from './comman/FilterHeader';
import { useTranslation } from 'react-i18next';

const Tags = ({ categories, cycle , onSelect, onFilterChange,toggleDrawer , clearFilter ,setClearFilter}) => {
    const { t } = useTranslation();
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const router = useRouter();
    const { category,subCategory}=router.query
    useEffect(()=>{
        if(clearFilter)
            setSelectedTags([])
    },[clearFilter])
    useEffect(() => {
        if (cycle) {
            // Find categories that match the selected cycle
            const categoriesInCycle = category? categories.filter(cat => cat._id === category) : categories.filter(cat => cat.cycle === cycle);
            const SubCategoriesInCycle = subCategory?(
                categoriesInCycle?.length>0?categoriesInCycle.map(item=> item.subCategories.filter(item=> item._id===subCategory)).flat():categoriesInCycle.map(item=> item.subCategories).flat()
            ):(categoriesInCycle.map(item=> item.subCategories).map(item=>item).flat());
            // Collect tags from all subcategories of those categories
            const tags = SubCategoriesInCycle.flatMap(sub => sub.tags)|| [];
            setFilteredTags(tags);
        } else { 
            setFilteredTags([]);
        }
    }, [cycle, categories,category,subCategory]);
    const tagTitles = filteredTags.map(tag => tag); // Assuming tag has a 'name' property
    const handleSelectTag = (selectedTag) => {
        const tagId = selectedTag._id;
        const newSelectedTags = selectedTags.includes(tagId)
            ? selectedTags.filter(tag => tag !== tagId)
            : [...selectedTags, tagId];
        setClearFilter(false)
        setSelectedTags(newSelectedTags);

        // Notify parent component with real-time updates
        if (onFilterChange) {
            onFilterChange(newSelectedTags);
        }
    };

    const handleApplyClick = () => {
        onSelect(selectedTags);
    };
    useEffect(()=>{
        Object.entries(router.query).forEach(([key, value]) => {
            if(key ==='tag'){
                setSelectedTags(value.includes(",") ? value.split(",") : [value])
            }else if(key ==='category' || key ==='subCategory'){
                setSelectedTags([])
            }
        })
    },[router.query])
    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Tags")}</FilterHeader>
            <div className='h-6'></div>
            <BoolOfPadges
                list={tagTitles}
                onSelect={handleSelectTag}
                isSelected={selectedTags}
            />
            {/* <div className='h-12' />
            {tagTitles.length > 0 && (
                <AppButton onClick={handleApplyClick} className='hidden md:block h-[60px]' contentClassName='text-base'>
                    {t("Apply")}
                </AppButton>
            )} */}
        </FilterContainer>
    );
};

export default Tags;

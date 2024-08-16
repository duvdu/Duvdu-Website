import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';

const CategoryFilter = ({ categories, onSelect }) => {
    const categoryTitles = categories.map(category => category.title);

    const handleSelectCategory = (selectedCategory) => {
        const selected = categories.find(category => category.title === selectedCategory);
        const subCategoryTitles = selected ? selected.subCategories.map(sub => sub.title) : [];
        onSelect(0, selectedCategory);
    };

    return (
        <FilterContainer>
            <BoolOfPadges list={categoryTitles} onSelect={handleSelectCategory} />
        </FilterContainer>
    );
};

export default CategoryFilter;

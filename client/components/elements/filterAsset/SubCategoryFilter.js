import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';

const SubCategoryFilter = ({ subCategories= [], onSelect }) => {
    return (
        <FilterContainer>
            <BoolOfPadges list={subCategories} onSelect={(subCategory) => onSelect(1, subCategory)} />
        </FilterContainer>
    );
};

export default SubCategoryFilter;

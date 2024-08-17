import FilterContainer from './comman/FilterContainer';
import BoolOfPadges from './comman/BoolOfPadges';

const TagsFilter = ({ tags, onSelect }) => {
    return (
        <FilterContainer>
            <BoolOfPadges list={tags} onSelect={(tag) => onSelect(2, tag)} />
        </FilterContainer>
    );
};

export default TagsFilter;

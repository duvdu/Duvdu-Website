import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import { useTranslation } from 'react-i18next';

const LocationFilter = ({toggleDrawer}) => (
    <FilterContainer toggleDrawer={toggleDrawer}>
        <FilterHeader>Location</FilterHeader>
        {/* Additional location filters */}
    </FilterContainer>
);

export default LocationFilter;

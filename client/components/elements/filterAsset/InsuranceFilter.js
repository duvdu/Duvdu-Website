import { useState } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';

const InsuranceFilter = ({ onFiltersApply }) => {
    const [filters, setFilters] = useState({
        insurance: '',
        // Add other filter values here if needed
    });

    const handleFilterChange = (name) => (e) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: e.target.value,
        }));
    };

    const handleApply = () => {
        if (onFiltersApply) {
            onFiltersApply(filters);
        }
    };

    return (
        <FilterContainer>
            <FilterHeader>Insurance</FilterHeader>
            <div className='h-6'></div>
            <FilterInput
                name="insurance"
                value={filters.insurance}
                onChange={handleFilterChange('insurance')}
                placeholder="Insurance"
            />
            <div className='h-12'></div>
            <AppButton onClick={handleApply} className='h-[60px]' contentClassName='text-base'>
                Apply
            </AppButton>
        </FilterContainer>
    );
};

export default InsuranceFilter;

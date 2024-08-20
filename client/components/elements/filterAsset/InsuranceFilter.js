import { useState } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import { useTranslation } from 'react-i18next';

const InsuranceFilter = ({ onFiltersApply, onFilterChange,toggleDrawer }) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        insurance: '',
        // Add other filter values here if needed
    });

    const handleFilterChange = (name) => (e) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));

        // Call onFilterChange immediately when the filter value changes
        if (onFilterChange) {
            onFilterChange({ ...filters, [name]: value });
        }
    };

    const handleApply = () => {
        if (onFiltersApply) {
            onFiltersApply(filters);
        }
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Insurance")}</FilterHeader>
            <div className='h-6'></div>
            <FilterInput
                name="insurance"
                value={filters.insurance}
                onChange={handleFilterChange('insurance')}
                placeholder={t("Insurance")}
            />
            <div className='h-12'></div>
            <AppButton onClick={handleApply} className='hidden md:block h-[60px]' contentClassName='text-base'>
            {t("Apply")}

            </AppButton>
        </FilterContainer>
    );
};

export default InsuranceFilter;

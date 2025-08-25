import { useState , useEffect } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import { useTranslation } from 'react-i18next';

const SearchFilter = ({ onFiltersApply, onFilterChange,toggleDrawer , clearFilter ,setClearFilter}) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        search: '',
        // Add other filter values here if needed
    });
    useEffect(()=>{
        if(clearFilter)
            setFilters({
                search: '',
            })
    },[clearFilter])

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
        setClearFilter(false)
        if (onFiltersApply) {
            onFiltersApply(filters);
        }
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Search")}</FilterHeader>
            <div className='h-6'></div>
            <FilterInput
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange('search')}
                placeholder={t("Search")}
            />
            <div className='h-12'></div>
            <AppButton onClick={handleApply} className='hidden md:block h-[60px]' contentClassName='text-base'>
            {t("Apply")}

            </AppButton>
        </FilterContainer>
    );
};

export default SearchFilter;

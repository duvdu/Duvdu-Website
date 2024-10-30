import { useState , useEffect } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import { useTranslation } from 'react-i18next';

const KeywordsFilter = ({ onFiltersApply, onFilterChange,toggleDrawer , clearFilter ,setClearFilter}) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        keywords: '',
        // Add other filter values here if needed
    });
    useEffect(()=>{
        if(clearFilter)
            setFilters({
                keywords: '',
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
            <FilterHeader>{t("KeyWords")}</FilterHeader>
            <div className='h-6'></div>
            <FilterInput
                type="text"
                name="keywords"
                value={filters.keywords}
                onChange={handleFilterChange('keywords')}
                placeholder={t("KeyWords")}
            />
            <div className='h-12'></div>
            <AppButton onClick={handleApply} className='hidden md:block h-[60px]' contentClassName='text-base'>
            {t("Apply")}

            </AppButton>
        </FilterContainer>
    );
};

export default KeywordsFilter;

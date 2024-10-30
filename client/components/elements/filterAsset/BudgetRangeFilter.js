import { useState, useEffect } from 'react';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import AppButton from '../button';
import { useTranslation } from 'react-i18next';

const BudgetRangeFilter = ({ onBudgetRangeApply, onFilterChange, toggleDrawer, clearFilter ,setClearFilter }) => {
    const { t } = useTranslation();
    const [budgetRange, setBudgetRange] = useState({ min: '', max: '' });
    useEffect(()=>{
        if(clearFilter)
            setBudgetRange({ min: '', max: '' })
    },[clearFilter])

    const handleBudgetRangeChange = (e) => {
        const { name, value } = e.target;
        const updatedRange = {
            ...budgetRange,
            [name]: value,
        };

        setBudgetRange(updatedRange);

        // Call onFilterChange immediately when the range changes
        if (onFilterChange) {
            onFilterChange(updatedRange);
        }
    };

    const handleBudgetRangeApply = () => {
        setClearFilter(false)
        if (onBudgetRangeApply) {
            onBudgetRangeApply(budgetRange);
        }
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Budget Range")}</FilterHeader>
            <div className='h-6'></div>
            <div className="flex gap-2">
                <FilterInput
                    type="number"
                    name="min"
                    value={budgetRange.min}
                    onChange={handleBudgetRangeChange}
                    placeholder={t("Min")}
                />
                <FilterInput
                    type="number"
                    name="max"
                    value={budgetRange.max}
                    onChange={handleBudgetRangeChange}
                    placeholder={t("Max")}
                />
            </div>
            <div className='h-12'></div>
            <AppButton onClick={handleBudgetRangeApply} className='hidden md:block h-[60px]' contentClassName='text-base'>
                {t("Apply")}

            </AppButton>
        </FilterContainer>
    );
};

export default BudgetRangeFilter;

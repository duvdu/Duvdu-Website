import { useState } from 'react';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import AppButton from '../button';

const BudgetRangeFilter = () => {
    const [budgetRange, setBudgetRange] = useState({ min: '', max: '' });

    const handleBudgetRangeChange = (e) => {
        const { name, value } = e.target;
        setBudgetRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBudgetRangeApply = () => {
        console.log("Budget Range Applied:", budgetRange);
    };

    return (
        <FilterContainer>
            <FilterHeader>Budget Range</FilterHeader>
            <div className='h-6'></div>
            <div className="flex gap-2">
                <FilterInput
                    name="min"
                    value={budgetRange.min}
                    onChange={handleBudgetRangeChange}
                    placeholder="Min"
                />
                <FilterInput
                    name="max"
                    value={budgetRange.max}
                    onChange={handleBudgetRangeChange}
                    placeholder="Max"
                />
            </div>
            <div className='h-12'></div>
            <AppButton onClick={handleBudgetRangeApply} className='h-[60px]' contentClassName='text-base'>
                Apply
            </AppButton>
        </FilterContainer>
    );
};

export default BudgetRangeFilter;

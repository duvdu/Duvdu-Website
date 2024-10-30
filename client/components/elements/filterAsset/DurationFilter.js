import { useState , useEffect } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import { useTranslation } from 'react-i18next';

const DurationFilter = ({ onDurationApply, onFilterChange,toggleDrawer, clearFilter ,setClearFilter }) => {
    const { t } = useTranslation();
    const [duration, setDuration] = useState('');
    useEffect(()=>{
        if(clearFilter)
            setDuration('')
    },[clearFilter])

    const handleDurationChange = (e) => {
        const newDuration = e.target.value;
        setDuration(newDuration);

        // Call onFilterChange immediately when the duration changes
        if (onFilterChange) {
            onFilterChange(newDuration);
        }
    };

    const handleDurationApply = () => {
        setClearFilter('')
        if (onDurationApply) {
            onDurationApply(duration);
        }
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Duration")}</FilterHeader>
            <div className='h-6'></div>
            <FilterInput
                type="number"
                name="duration"
                value={duration}
                onChange={handleDurationChange}
                placeholder={t("Number in days")}
            />
            <div className='h-12'></div>

            <AppButton onClick={handleDurationApply} className='hidden md:block h-[60px]' contentClassName='text-base'>
            {t("Apply")}

            </AppButton>
        </FilterContainer>
    );
};

export default DurationFilter;

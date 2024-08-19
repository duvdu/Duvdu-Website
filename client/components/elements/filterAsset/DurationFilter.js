import { useState } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import { useTranslation } from 'react-i18next';

const DurationFilter = ({ onDurationApply, onFilterChange,toggleDrawer }) => {
    const { t } = useTranslation();
    const [duration, setDuration] = useState('');

    const handleDurationChange = (e) => {
        const newDuration = e.target.value;
        setDuration(newDuration);

        // Call onFilterChange immediately when the duration changes
        if (onFilterChange) {
            onFilterChange(newDuration);
        }
    };

    const handleDurationApply = () => {
        if (onDurationApply) {
            onDurationApply(duration);
        }
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("Duration")}</FilterHeader>
            <div className='h-6'></div>
            <FilterInput
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

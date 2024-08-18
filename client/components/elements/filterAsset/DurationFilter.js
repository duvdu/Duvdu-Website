import { useState } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';

const DurationFilter = ({ onDurationApply }) => {
    const [duration, setDuration] = useState('');

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleDurationApply = () => {
        if (onDurationApply) {
            onDurationApply(duration);
        }
    };

    return (
        <FilterContainer>
            <FilterHeader>Duration</FilterHeader>
            <div className='h-6'></div>
            <FilterInput
                name="duration"
                value={duration}
                onChange={handleDurationChange}
                placeholder="Number in days"
            />
            <div className='h-12'></div>
            <AppButton onClick={handleDurationApply} className='h-[60px]' contentClassName='text-base'>
                Apply
            </AppButton>
        </FilterContainer>
    );
};

export default DurationFilter;

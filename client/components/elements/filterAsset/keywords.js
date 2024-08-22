import { useState } from 'react';
import AppButton from '../button';
import FilterContainer from './comman/FilterContainer';
import FilterHeader from './comman/FilterHeader';
import FilterInput from './comman/FilterInput';
import { useTranslation } from 'react-i18next';
import Padge from './comman/padge';
import Icon from '../../Icons';


const KeyWords = ({ onFiltersApply, onFilterChange, toggleDrawer }) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        KeyWords: [],
    });
    const [currentKeyword, setCurrentKeyword] = useState(''); // For the input field

    const handleInputChange = (e) => {
        setCurrentKeyword(e.target.value);
    };

    const handleAddKeyword = () => {
        if (currentKeyword.trim() && !filters.KeyWords.includes(currentKeyword.trim())) {
            const newKeywords = [...filters.KeyWords, currentKeyword.trim()];
            setFilters({ ...filters, KeyWords: newKeywords });
            setCurrentKeyword('');

            if (onFilterChange) {
                onFilterChange({ ...filters, KeyWords: newKeywords });
            }
        }
    };

    const handleRemoveKeyword = (keywordToRemove) => {
        const newKeywords = filters.KeyWords.filter((keyword) => keyword !== keywordToRemove);
        setFilters({ ...filters, KeyWords: newKeywords });

        if (onFilterChange) {
            onFilterChange({ ...filters, KeyWords: newKeywords });
        }
    };

    const handleApply = () => {
        if (onFiltersApply) {
            onFiltersApply(filters);
        }
    };

    return (
        <FilterContainer toggleDrawer={toggleDrawer}>
            <FilterHeader>{t("KeyWords")}</FilterHeader>
            <div className='h-6'></div>
            <div className='flex items-center gap-2'>
                <FilterInput
                    name="KeyWordsInput"
                    value={currentKeyword}
                    onChange={handleInputChange}
                    placeholder={t("Enter a keyword")}
                />
                <AppButton onClick={handleAddKeyword} height='h-[40px]' className='aspect-square'>
                    <Icon name={'plus'} className='text-white w-4 h-4'/>
                </AppButton>
                
            </div>
            <div className='h-6'></div>
            <div className='flex flex-wrap gap-2'>
                {filters.KeyWords.map((keyword) => (
                    <Padge key={keyword} onClick={() => handleRemoveKeyword(keyword)}>
                        {keyword} <span className='ml-2 text-red-500'>X</span>
                    </Padge>
                ))}
            </div>
            <div className='h-12'></div>
            <AppButton isEnabled={filters.KeyWords.length > 0} onClick={handleApply} className='hidden md:block h-[60px]' contentClassName='text-base'>
                {t("Apply")}
            </AppButton>
        </FilterContainer>
    );
};

export default KeyWords;

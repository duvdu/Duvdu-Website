import { useState , useEffect } from 'react';
import {useRouter} from 'next/router'
import Switch from "./switcher2";
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import CategoryFilter from './filterAsset/CategoryFilter';
import SubCategoryFilter from './filterAsset/SubCategoryFilter';
import TagsFilter from './filterAsset/TagsFilter';
import LocationFilter from './filterAsset/LocationFilter';
import BudgetRangeFilter from './filterAsset/BudgetRangeFilter';
import DurationFilter from './filterAsset/DurationFilter';
import InsuranceFilter from './filterAsset/InsuranceFilter';
import Icon from '../Icons';
import Drawer from './drawer';
import AppButton from './button';
import KeywordsFilter from './filterAsset/keywords';
import PlatformFilter from './filterAsset/Platforms';

// Utility function to find filter name by value
const getFilterNameByValue = (data, value) => {
    return data.find(item => item.value === value)?.name || '';
};

const RenderFilterComponent = ({ value, categories,platforms, cycle, handleSelect, toggleDrawer , isMobile , clearFilter , setClearFilter }) => {
    switch (value) {
        case 1:
            return <CategoryFilter categories={categories} clearFilter={clearFilter} setClearFilter={setClearFilter} cycle={cycle} onSelect={category => handleSelect(1, category, true)} onFilterChange={category => handleSelect(1, category, false , true)} toggleDrawer={toggleDrawer}/>;
        case 2:
            return <SubCategoryFilter categories={categories} clearFilter={clearFilter} setClearFilter={setClearFilter} cycle={cycle} onSelect={subCategory => handleSelect(2, subCategory, true)} onFilterChange={subCategory => handleSelect(2, subCategory, false , true)} toggleDrawer={toggleDrawer}/>;
        case 3:
            return <TagsFilter categories={categories} clearFilter={clearFilter} setClearFilter={setClearFilter} cycle={cycle} onSelect={tags => handleSelect(3, tags, true)} onFilterChange={tags => handleSelect(3, tags, false , true)} toggleDrawer={toggleDrawer} />;
        case 4:
            return <LocationFilter toggleDrawer={toggleDrawer} />;
        case 5:
            return <BudgetRangeFilter onBudgetRangeApply={budgetRange => handleSelect(5, budgetRange, true)} clearFilter={clearFilter} setClearFilter={setClearFilter} onFilterChange={budgetRange => handleSelect(5, budgetRange)} toggleDrawer={toggleDrawer} />;
        case 6:
            return <DurationFilter onDurationApply={duration => handleSelect(6, duration, true)} clearFilter={clearFilter} setClearFilter={setClearFilter} onFilterChange={duration => handleSelect(6, duration)} toggleDrawer={toggleDrawer} />;
        case 7:
            return <InsuranceFilter onFiltersApply={filters => handleSelect(7, filters.insurance, true)} clearFilter={clearFilter} setClearFilter={setClearFilter} onFilterChange={filters => handleSelect(7, filters.insurance)} toggleDrawer={toggleDrawer} />;
        case 8:
            return <KeywordsFilter onFiltersApply={filters => handleSelect(8, filters.keywords, true)} clearFilter={clearFilter} setClearFilter={setClearFilter} onFilterChange={filters => handleSelect(8, filters.keywords)} toggleDrawer={toggleDrawer} />;
        case 9:
            return <PlatformFilter platforms={platforms?.data} clearFilter={clearFilter} setClearFilter={setClearFilter} cycle={cycle} onSelect={platform => handleSelect(9, platform, true)} onFilterChange={platform => handleSelect(9, platform)} toggleDrawer={toggleDrawer} />;
        default:
            return null;
    }
}

const Filter = ({ hideSwitch = false, categories,platforms, cycle, onFilterChange, setParams,  switchState , setSwitchState }) => {
    const { t } = useTranslation();
    const [selectedFilters, setSelectedFilters] = useState({});
    const [openIndex, setOpenIndex] = useState(null);
    const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
    const [clearFilter, setClearFilter] = useState(false);
    const router = useRouter()
    useEffect(()=>{
        if(clearFilter)
            setSwitchState({
            instantProject: false,
            priceInclusive: false ,        
        })
    },[clearFilter])
    useEffect(()=>{
        const newFilters = {};
        Object.entries(router.query).forEach(([key, value]) => {
            switch (key) {
              case 'category':
                newFilters[1] =[value.includes(",") ? value.split(",") : value]
                break;
              case 'subCategory':
                newFilters[2] =[value.includes(",") ? [value.split(",")] : value]
                break;
              case 'tag':
                newFilters[3] =[value.includes(",") ? value.split(",") : value]
                break;
              case 'location':
                newFilters[4] = value;
                break;
              case 'range':
                newFilters[5] = value;
                break;
              case 'duration':
                newFilters[6] = value;
                break;
              case 'Insurance':
                newFilters[7] = value;
                break;
              case 'keywords':
                newFilters[8] = value;
                break;
              case 'Platforms':
                newFilters[9] =[value.includes(",") ? value.split(",") : value]
                break;
                default:
                null;
            }
          });
          setSelectedFilters(newFilters);
    },[router.query])
    
    // Initialize  filter data
    const filterData = [
    ];
    // { value: 4, name: "Location" },
    
    filterData.push({ value: 1, name: "Category" });
    filterData.push({ value: 2, name: "Sub-category" });
    filterData.push({ value: 3, name: "Tags" });
    filterData.push({ value: 5, name: "Budget Range" });
    if (cycle === "rentals") filterData.push({ value: 7, name: "Insurance" });
    if (cycle === "copy-rights" || cycle === "project") {
        filterData.push({ value: 6, name: "Duration" });
    }
    filterData.push({ value: 8, name: "KeyWords" },);
    if (cycle === "producer") {
        filterData.push({ value: 9, name: "Platforms" });
    }

    // Toggle dropdown visibility
    const toggleDropdown = (value) => {
        setOpenIndex(prevValue => (prevValue === value ? null : value));
    };
    const closeDropDown = (value) => {
        setOpenIndex(null);
    };
    // Handle filter selection
    const handleSelect = (value, option, istakeAction , isMobile) => {
        if(value=== 1){
            delete selectedFilters[2]
            delete selectedFilters[3]
        }
        if(value===2){
            delete selectedFilters[3]
        }
        const newSelectedFilters = { ...selectedFilters, [value]: option };
        setSelectedFilters(newSelectedFilters);
        if(isMobile){
            return updateFilterList(newSelectedFilters, switchState);
        }
        if (istakeAction) {
            takeAction()
        }
    };

    const takeAction = () => {
        setOpenIndex(null);
        updateFilterList(selectedFilters, switchState);
        if (mobileFiltersVisible)
            toggleMobileFilters()
    };
    // Handle switch change
    const handleSwitchChange = (switchName) => (isChecked) => {
        const updatedSwitchState = { ...switchState, [switchName]: isChecked };
        setSwitchState(updatedSwitchState);
        updateFilterList(selectedFilters, updatedSwitchState);
    };
    // Update filter list and notify parent component
    const updateFilterList = (filters, switches) => {
        const filterList = [
            ...Object.entries(filters).map(([key, option]) => ({
                name: getFilterNameByValue(filterData, parseInt(key, 10)),
                data: option,
            })),
            ...Object.entries(switches).map(([key, value]) => ({
                name: key,
                data: value,
            }))
        ];
        if (!onFilterChange) {
            handleFilterChange(filterList)
        }

        if (onFilterChange) {
            onFilterChange(filterList);
        }
    };

    // Toggle mobile filters visibility
    const toggleMobileFilters = () => {
        setMobileFiltersVisible(!mobileFiltersVisible);
    };

    const handleFilterChange = (selectedFilters) => {
        // Initialize params object
        const params = {};
        selectedFilters.forEach(filter => {
            switch (filter.name) {
                case "Category":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.category = filter.data.join(',');
                    }
                    break;
                case "Sub-category":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.subCategory = filter.data.join(',');
                    }
                    break;
                case "Platforms":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.Platforms = filter.data;
                    }
                    break;
                case "Tags":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.tag = filter.data.join(',');;
                    }
                    break;
                case "Budget Range":
                    // Check if filter.data and filter.data.data exist
                    if (filter.data && filter.data) {
                        // Extract numeric values from the budget range string
                        const { min: priceFrom, max: priceTo } = filter.data;
                        // Assign values to params
                        if (priceFrom) params.priceFrom = priceFrom;
                        if (priceTo) params.priceTo = priceTo;
                    }
                    break;
                case "Duration":
                    // Check if filter.data and filter.data.data exist
                    if (filter.data && filter.data) {
                        params.duration = filter.data; // Assuming data is like "Duration: 10 days"
                    }
                    break;
                case "instantProject":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.instant = filter.data;
                    }
                    break;
                case "Insurance":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.Insurance = filter.data;
                    }
                    break;
                case "priceInclusive":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.inclusive = filter.data;
                    }
                    break;
                case "KeyWords":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.keywords = filter.data;
                    }
                    break;
                default:
                    break;
            }
        });
        // Update query parameters with selected filters

        const queryString = new URLSearchParams({
            ...params,
        }).toString();
        if (setParams)
            setParams(queryString)

    };
    const clearAllQueries = () => {    
        const clearRouter = `?category=${router.query.category}`
        router.push(router.query.category?clearRouter:router.pathname, undefined , { shallow: true });
        setClearFilter(true)
    };

    return (
        <>
            {/* Desktop version */}
            <div className="hidden md:flex lg:flex-row flex-wrap w-full gap-5 justify-between items-center lg:pb-0 pb-5">
                <div className="flex gap-2 items-end flex-wrap">
                    {filterData.map(({ value, name }) => (
                        <div key={value} className="relative">
                            <button
                                className="flex gap-2 items-center border border-[#E6E6E6] dark:border-gray-700 rounded-xl py-2 px-3 text-DS_black dark:text-white appearance-none w-min cursor-pointer bg-white dark:bg-gray-900"
                                onClick={() => toggleDropdown(value)}
                            >
                                <div className='whitespace-nowrap'>
                                    {t(selectedFilters[value]?.data || name)}
                                </div>
                                <Icon name={"drop-icon"} className='dark:text-white' />

                            </button>

                            <div className={openIndex === value ? "absolute" : "hidden"}>
                                <RenderFilterComponent clearFilter={clearFilter} setClearFilter={setClearFilter} platforms={platforms} value={value} categories={categories} cycle={cycle} handleSelect={handleSelect} handleFilterChange={onFilterChange} toggleDrawer={closeDropDown} isMobile={false} />
                            </div>
                        </div>
                    ))}
                    <div className="relative">
                        <button
                            className="flex gap-2 items-center border border-[#E6E6E6] dark:border-gray-700 rounded-xl py-2 px-3 text-DS_black dark:text-white appearance-none w-min cursor-pointer bg-white dark:bg-gray-900"
                            onClick={clearAllQueries}
                        >
                            <Icon name={"refresh"} className='dark:text-white' />
                        </button>
                    </div>
                </div>
                {!hideSwitch && (
                    <div className="flex items-center gap-2">
                        <Switch
                            defaultValue={switchState?.instantProject}
                            onSwitchChange={handleSwitchChange('instantProject')}
                            setClearFilter={setClearFilter}
                            clearFilter={clearFilter}
                        />
                        <span className="opacity-70 font-semibold">{t("instant project")}</span>

                        {cycle === "project" && (
                            <>
                                <Switch
                                    defaultValue={switchState?.priceInclusive}
                                    onSwitchChange={handleSwitchChange('priceInclusive')}
                                    setClearFilter={setClearFilter}
                                    clearFilter={clearFilter}        
                                />
                                <span className="opacity-70 font-semibold">{t("price is inclusive")}</span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile version */}
            <div className="flex md:hidden justify-between items-center pb-5">
                {!hideSwitch && (
                    <div className="flex items-center justify-end gap-2">
                        <Switch
                            defaultValue={switchState?.instantProject}
                            onSwitchChange={handleSwitchChange('instantProject')}
                            setClearFilter={setClearFilter}
                            clearFilter={clearFilter}
                        />
                        <span className="opacity-70 font-semibold">{t("instant project")}</span>
                        {cycle === "project" && (
                            <>
                                <div className='hidden md:block'>
                                    <Switch
                                        defaultValue={switchState?.priceInclusive}
                                        onSwitchChange={handleSwitchChange('priceInclusive')}
                                        setClearFilter={setClearFilter}
                                        clearFilter={clearFilter}            
                                    />
                                </div>
                                <span className="opacity-70 font-semibold hidden md:block">{t("price is inclusive")}</span>
                            </>
                        )}
                    </div>
                )}
                <div className='flex gap-2 cursor-pointer' onClick={toggleMobileFilters}>
                    <Icon name={"filter"} />
                    <span className='text-primary text-base'>{t('filter')}</span>
                </div>
            </div>

            {/* Mobile filters dropdown */}
            <Drawer isOpen={mobileFiltersVisible} toggleDrawer={toggleMobileFilters} name={t("filter")} padding={false}>
                <div className="flex flex-col gap-2 mt-2 bg-white dark:bg-black">

                    <div className="flex justify-between items-center m-4 gap-2">
                        {cycle === "project" && (
                            <div className='flex items-center gap-2'>
                                <Switch
                                    defaultValue={switchState?.priceInclusive}
                                    onSwitchChange={handleSwitchChange('priceInclusive')}
                                    setClearFilter={setClearFilter}
                                    clearFilter={clearFilter}        
                                />
                                <span className="opacity-70 font-semibold">{t("price is inclusive")}</span>
                            </div>
                        )}
                        <div className="relative">
                            <button
                                className="flex gap-2 items-center border border-[#E6E6E6] dark:border-gray-700 rounded-xl py-2 px-3 text-DS_black dark:text-white appearance-none w-min cursor-pointer bg-white dark:bg-gray-900"
                                onClick={clearAllQueries}
                            >
                                <Icon name={"refresh"} className='dark:text-white' />
                            </button>
                        </div>
                    </div>

                    {filterData.map(({ value, name }) => (
                        <div key={value} className="relative" >
                            <RenderFilterComponent clearFilter={clearFilter} setClearFilter={setClearFilter} platforms={platforms} value={value} categories={categories} cycle={cycle} handleSelect={handleSelect} isMobile={true}/>
                        </div>
                    ))}
                    <AppButton onClick={takeAction} className='block md:hidden h-[60px] m-5' contentClassName='text-base'>
                        {t("Apply")}
                    </AppButton>
                </div>
            </Drawer>
        </>
    );
};

const mapStateToProps = (state) => ({
    categories: state.categories,
    platforms: state.api.GetPlatforms,
});

export default connect(mapStateToProps)(Filter);

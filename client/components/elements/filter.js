import { useState } from 'react';
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
import KeyWords from './filterAsset/keywords';

// Utility function to find filter name by value
const getFilterNameByValue = (data, value) => {
    return data.find(item => item.value === value)?.name || '';
};

const RenderFilterComponent = ({ value, categories, cycle, handleSelect, toggleDrawer }) => {
    switch (value) {
        case 1:
            return <CategoryFilter categories={categories} cycle={cycle} onSelect={category => handleSelect(1, category, true)} onFilterChange={category => handleSelect(1, category)} toggleDrawer={toggleDrawer} />;
        case 2:
            return <SubCategoryFilter categories={categories} cycle={cycle} onSelect={subCategory => handleSelect(2, subCategory, true)} onFilterChange={subCategory => handleSelect(2, subCategory)} toggleDrawer={toggleDrawer} />;
        case 3:
            return <TagsFilter categories={categories} cycle={cycle} onSelect={tags => handleSelect(3, tags, true)} onFilterChange={tags => handleSelect(3, tags)} toggleDrawer={toggleDrawer} />;
        case 4:
            return <LocationFilter toggleDrawer={toggleDrawer} />;
        case 5:
            return <BudgetRangeFilter onBudgetRangeApply={budgetRange => handleSelect(5, budgetRange, true)} onFilterChange={budgetRange => handleSelect(5, budgetRange)} toggleDrawer={toggleDrawer} />;
        case 6:
            return <DurationFilter onDurationApply={duration => handleSelect(6, duration, true)} onFilterChange={duration => handleSelect(6, duration)} toggleDrawer={toggleDrawer} />;
        case 7:
            return <InsuranceFilter onFiltersApply={filters => handleSelect(7, filters.insurance, true)} onFilterChange={filters => handleSelect(7, filters.insurance)} toggleDrawer={toggleDrawer} />;
        case 8:
            return <KeyWords onFiltersApply={filters => handleSelect(8, filters.KeyWords, true)} onFilterChange={filters => handleSelect(8, filters.KeyWords)} toggleDrawer={toggleDrawer} />;
        default:
            return null;
    }
}

const Filter = ({ hideSwitch = false, categories, cycle, onFilterChange, setParams }) => {
    const { t } = useTranslation();
    const [selectedFilters, setSelectedFilters] = useState({});
    const [openIndex, setOpenIndex] = useState(null);
    const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
    const [switchState, setSwitchState] = useState({
        instantProject: false,
        priceInclusive: cycle === "project" ? false : undefined,
    });

    // Initialize filter data
    const filterData = [
        { value: 1, name: "Category" },
        { value: 2, name: "Sub-category" },
        { value: 3, name: "Tags" },
    ];
    // { value: 4, name: "Location" },

    if (cycle === "studio-booking") filterData.push({ value: 7, name: "Insurance" });
    if (cycle === "copy-rights" || cycle === "producer") {
        filterData.push({ value: 5, name: "Budget Range" });
    }

    if (cycle === "copy-rights" || cycle === "project") {
        filterData.push({ value: 6, name: "Duration" });
    }
    filterData.push({ value: 8, name: "KeyWords" },);

    // Toggle dropdown visibility
    const toggleDropdown = (value) => {
        setOpenIndex(prevValue => (prevValue === value ? null : value));
    };
    const closeDropDown = (value) => {
        setOpenIndex(null);
    };

    // Handle filter selection
    const handleSelect = (value, option, istakeAction) => {
        const newSelectedFilters = { ...selectedFilters, [value]: option };
        setSelectedFilters(newSelectedFilters);
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

    return (
        <>
            {/* Desktop version */}
            <div className="hidden md:flex justify-between items-center">
                <div className="flex gap-2 items-end">
                    {filterData.map(({ value, name }) => (
                        <div key={value} className="relative">
                            <div
                                className="flex gap-2 items-center border border-[#E6E6E6] dark:border-gray-700 rounded-xl py-2 px-3 text-DS_black dark:text-white appearance-none w-min cursor-pointer bg-white dark:bg-gray-900"
                                onClick={() => toggleDropdown(value)}
                            >
                                <div className='whitespace-nowrap'>
                                    {t(selectedFilters[value]?.data || name)}
                                </div>
                                <Icon name={"drop-icon"} className='dark:text-white' />

                            </div>

                            <div className={openIndex === value ? "absolute" : "hidden"}>
                                <RenderFilterComponent value={value} categories={categories} cycle={cycle} handleSelect={handleSelect} handleFilterChange={onFilterChange} toggleDrawer={closeDropDown} />
                            </div>
                        </div>
                    ))}
                </div>
                {!hideSwitch && (
                    <div className="flex items-center justify-end gap-2">
                        <Switch
                            checked={switchState.instantProject}
                            onSwitchChange={handleSwitchChange('instantProject')}
                        />
                        <span className="opacity-70">{t("instant project")}</span>

                        {cycle === "project" && (
                            <>
                                <Switch
                                    checked={switchState.priceInclusive}
                                    onSwitchChange={handleSwitchChange('priceInclusive')}
                                />
                                <span className="opacity-70">{t("price is inclusive")}</span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile version */}
            <div className="flex md:hidden justify-between items-center">
                {!hideSwitch && (
                    <div className="flex items-center justify-end gap-2">
                        <Switch
                            checked={switchState.instantProject}
                            onSwitchChange={handleSwitchChange('instantProject')}
                        />
                        <span className="opacity-70">{t("instant project")}</span>
                        {cycle === "project" && (
                            <>
                                <div className='hidden md:block'>
                                    <Switch
                                        checked={switchState.priceInclusive}
                                        onSwitchChange={handleSwitchChange('priceInclusive')}
                                    />
                                </div>
                                <span className="opacity-70 hidden md:block">{t("price is inclusive")}</span>
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

                    <div className="flex items-center m-4 gap-2">
                        {cycle === "project" && (
                            <>
                                <Switch
                                    checked={switchState.priceInclusive}
                                    onSwitchChange={handleSwitchChange('priceInclusive')}
                                />
                                <span className="opacity-70">{t("price is inclusive")}</span>
                            </>
                        )}
                    </div>

                    {filterData.map(({ value, name }) => (
                        <div key={value} className="relative" >
                            <RenderFilterComponent value={value} categories={categories} cycle={cycle} handleSelect={handleSelect} />
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
});

export default connect(mapStateToProps)(Filter);

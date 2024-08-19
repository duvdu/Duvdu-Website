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

// Utility function to find filter name by value
const getFilterNameByValue = (data, value) => {
    return data.find(item => item.value === value)?.name || '';
};

// Filter component
const Filter = ({ hideSwitch = false, categories, cycle, onFilterChange }) => {
    const { t } = useTranslation();

    // Initialize filter data
    const filterData = [
        { value: 1, name: "Category" },
        { value: 2, name: "Sub-category" },
        { value: 3, name: "Tags" },
    ];

    if (cycle === "studio-booking") filterData.push({ value: 7, name: "Insurance" });
    if (cycle === "copy-rights" || cycle === "producer") {
        filterData.push({ value: 5, name: "Budget Range" });
        filterData.push({ value: 6, name: "Duration" });
    }

    // State management
    const [selected, setSelected] = useState({});
    const [openIndex, setOpenIndex] = useState(null);
    const [switchState, setSwitchState] = useState({
        instantProject: false,
        priceInclusive: cycle === "project" ? false : undefined,
    });

    // Toggle dropdown visibility
    const toggleDropdown = (value) => {
        setOpenIndex(prevValue => (prevValue === value ? null : value));
    };

    // Handle filter selection
    const handleSelect = (value, option) => {
        const newSelected = { ...selected, [value]: option };
        setSelected(newSelected);
        setOpenIndex(null);

        // Create filter list including switch state
        const filterList = [
            ...Object.entries(newSelected).map(([key, option]) => ({
                name: getFilterNameByValue(filterData, parseInt(key, 10)),
                data: option,
            })),
            // Add switch state information to the filter list
            ...Object.entries(switchState).map(([key, value]) => ({
                name: key, // You might want to provide a more descriptive name for switch states
                data: value,
            }))
        ];

        if (onFilterChange) {
            onFilterChange(filterList);
        }
    };

    // Handle switch change
    const handleSwitchChange = (switchName) => (isChecked) => {
        const updatedSwitchState = { ...switchState, [switchName]: isChecked };
        setSwitchState(updatedSwitchState);

        // Create filter list including switch state
        const filterList = [
            ...Object.entries(selected).map(([key, option]) => ({
                name: getFilterNameByValue(filterData, parseInt(key, 10)),
                data: option,
            })),
            // Add switch state information to the filter list
            ...Object.entries(updatedSwitchState).map(([key, value]) => ({
                name: key, // You might want to provide a more descriptive name for switch states
                data: value,
            }))
        ];

        if (onFilterChange) {
            onFilterChange(filterList);
        }
    };

    // Filter component map
    const RenderFilterComponent = ({ value }) => {
        return (
            <>
                <div className={value === 1 ? "" : "hidden"}>
                    <CategoryFilter categories={categories} cycle={cycle} onSelect={category => handleSelect(1, category)} />
                </div>
                <div className={value === 2 ? "" : "hidden"}>
                    <SubCategoryFilter categories={categories} cycle={cycle} onSelect={subCategory => handleSelect(2, subCategory)} />;
                </div>
                <div className={value === 3 ? "" : "hidden"}>
                    <TagsFilter categories={categories} cycle={cycle} onSelect={tags => handleSelect(3, tags)} />;
                </div>
                <div className={value === 4 ? "" : "hidden"}>
                    <LocationFilter />;
                </div>
                <div className={value === 5 ? "" : "hidden"}>
                    <BudgetRangeFilter onBudgetRangeApply={budgetRange => handleSelect(5, `${budgetRange.min},${budgetRange.max}`)} />;
                </div>
                <div className={value === 6 ? "" : "hidden"}>
                    <DurationFilter onDurationApply={duration => handleSelect(6, duration)} />;
                </div>
                <div className={value === 7 ? "" : "hidden"}>
                    <InsuranceFilter onFiltersApply={filters => handleSelect(7, filters.insurance)} />;
                </div>
            </>
        )
    }


    return (
        <>
            {/* desktop version */}
            <div className="hidden md:flex justify-between items-center">
                <div className="flex gap-2 items-end">
                    {filterData.map(({ value, name }) => (
                        <div key={value} className="relative">
                            <div
                                className="border border-[#E6E6E6] rounded-xl py-2 px-3 text-DS_black appearance-none w-min select-custom pr-8 cursor-pointer"
                                onClick={() => toggleDropdown(value)}
                            >
                                <div className='whitespace-nowrap'>
                                    {selected[value]?.data || name}
                                </div>
                            </div>
                            <div className={openIndex === value ? " absolute" : "hidden"}>
                                <RenderFilterComponent value={value} />
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
            {/* mobile version */}
            <div className="flex md:hidden justify-between items-center">
                <div className="flex gap-2 items-end">
                    {filterData.map(({ value, name }) => (
                        <div key={value} className="relative">
                            <div
                                className="border border-[#E6E6E6] rounded-xl py-2 px-3 text-DS_black appearance-none w-min select-custom pr-8 cursor-pointer"
                                onClick={() => toggleDropdown(value)}
                            >
                                <div className='whitespace-nowrap'>
                                    {selected[value]?.data || name}
                                </div>
                            </div>
                            {RenderFilterComponent(value)}
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
        </>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories,
});

export default connect(mapStateToProps)(Filter);

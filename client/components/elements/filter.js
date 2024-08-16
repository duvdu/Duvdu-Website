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

const Filter = ({ hideSwitch = false, categories }) => {
    const { t } = useTranslation();
    const data = [
        { value: 1, data: "Category" },
        { value: 2, data: "Sub-category" },
        { value: 3, data: "Tags" },
        { value: 4, data: "Location" },
        { value: 5, data: "Budget Range" },
        { value: 6, data: "Duration" },
    ];

    const [selected, setSelected] = useState({});
    const [openIndex, setOpenIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleSelect = (index, option) => {
        setSelected((prev) => ({
            ...prev,
            [index]: option,
        }));
        setOpenIndex(null);
    };

    return (
        <div className="flex justify-between items-center ">
            <div className="flex gap-2 items-end">
                {data.map((selectOptions, index) => (
                    <div key={index} className="relative">
                        <div
                            className="border border-[#E6E6E6] rounded-xl py-2 px-3 text-DS_black appearance-none w-min select-custom pr-8 cursor-pointer"
                            onClick={() => toggleDropdown(index)}
                        >
                            <div className='whitespace-nowrap'>
                                {selected[index]?.data || selectOptions.data}
                            </div>
                        </div>
                        {openIndex === index && index === 0 && <CategoryFilter categories={categories} onSelect={handleSelect} />}
                        {openIndex === index && index === 1 && <SubCategoryFilter />}
                        {openIndex === index && index === 2 && <TagsFilter />}
                        {openIndex === index && index === 3 && <LocationFilter />}
                        {openIndex === index && index === 4 && <BudgetRangeFilter />}
                        {openIndex === index && index === 5 && <DurationFilter />}
                    </div>
                ))}
            </div>
            {
                !hideSwitch &&
                <div className="flex items-center justify-end gap-2">
                    <Switch defaultValue={() => { }} onSwitchChange={() => { }} />
                    <span className="opacity-70">{t("insurance")}</span>
                    <Switch defaultValue={() => { }} onSwitchChange={() => { }} />
                    <span className="opacity-70">{t("instant project")}</span>
                    <Switch defaultValue={() => { }} onSwitchChange={() => { }} />
                    <span className="opacity-70">{t("price is inclusive")}</span>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.categories,
});

export default connect(mapStateToProps)(Filter);

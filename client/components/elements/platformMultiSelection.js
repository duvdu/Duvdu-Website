import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GetPlatforms } from '../../redux/action/apis/cycles/producer/platform';

function PlatformMultiSelection({ platforms , GetPlatforms, onChange, value }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    console.log(platforms)
    useEffect(()=>{
        GetPlatforms({search:[]})
    },[])
    // Sync initial selected categories from the value prop
    useEffect(() => {
        if (value && Array.isArray(value)) {
            setSelectedCategories(value);
        }
    }, []);

    const toggleCategory = (categoryId) => {
        // Check if the category is already selected
        const isAlreadySelected = selectedCategories.includes(categoryId);
        // Add or remove the category from the selectedCategories array
        let updatedSelection;
        if (isAlreadySelected) {
            updatedSelection = selectedCategories.filter(id => id !== categoryId); // Remove if already selected
        } else {
            updatedSelection = [...selectedCategories, categoryId]; // Add if not selected
        }
        // Update the state with the new selection
        setSelectedCategories([...updatedSelection]);

        // Trigger onChange callback with updated selection
        onChange?.(updatedSelection);
    };

    return (
        <section>
            <div className="flex gap-3 flex-wrap">
                {platforms?.data?.map((category) => (
                    <div key={category._id}
                        className={`py-1 px-2 border ${selectedCategories.includes(category._id) ? 'border-primary' : 'border-[#0000004c] dark:border-[#FFFFFF4D]'} rounded-full cursor-pointer`}
                        onClick={() => toggleCategory(category._id)}>
                        <div className={`whitespace-nowrap font-medium ${selectedCategories.includes(category._id) ? 'text-primary' : 'dark:text-[#FFFFFFBF] text-[#3E3E3E]'} opacity-80`}>
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    platforms: state.api.GetPlatforms,
});

const mapDispatchToProps = {
    GetPlatforms,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformMultiSelection);


import Popup from '../../../elements/popup';
import Button from '../../../elements/button';
import { useEffect, useState } from 'react';
import { getCategory } from '../../../../redux/action/apis/category/getCategories';
import { connect } from "react-redux";
import { filterByCycle, getAllTagsOfSubcategories } from '../../../../util/util';
import { useRouter } from 'next/router';


function PostPopup({ api, auth, isShow = "", categories }) {
    categories = filterByCycle(categories, 'project')
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCategory, setselectedCategory] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState({});  
    const [selectedTags, setSelectedTags] = useState([]);

    const handleNextStep = () => {
        if (currentStep == 1 && !selectedCategory._id)
            return;
        if (currentStep == 2 && !selectedSubCategory)
            return;
        if (currentStep == 3 && selectedTags.length) {
            router.push({
                pathname: `/creative/${auth.username}`,
                query: { type: 'project-post', category: selectedCategory._id,subCategory:selectedSubCategory, tags: selectedTags }
            });
            return;
        }

        if (currentStep > 2)
            return;

        setCurrentStep(currentStep + 1);
    };

    const reset = () => {
        setCurrentStep(1);
        setSelectedSubCategory({})
        setselectedCategory({})
        setSelectedTags([])
    };

    function ChooseTags() {
        const Tags = getAllTagsOfSubcategories(categories, selectedCategory._id)
        const toggleCategory = (category) => {
            if (selectedTags.includes(category)) {
                setSelectedTags(selectedTags.filter(cat => cat !== category));
            } else {
                setSelectedTags([...selectedTags, category]);
            }
        };

        const isSelected = (category) => {
            return selectedTags.includes(category);
        };
        return (


            <div className='flex gap-1 flex-wrap justify-center max-w-96 mt-16'>
                {Tags &&
                    Tags.map((item, index) => (
                        <li
                            key={index}
                            className={`padge cursor-pointer ${isSelected(item) ? 'bg-primary text-white' : 'hover:text-primary'}`}
                            onClick={() => toggleCategory(item)}
                        >
                            {item}
                        </li>
                    ))}
            </div>

        )

    }

    function ChooseSubCategories() {
        if (!selectedCategory._id) return null; 
        
        // Function to toggle subcategory selection
        const toggleSubCategory = (subCategoryId) => {
            setSelectedSubCategory(prev => (prev === subCategoryId ? {} : subCategoryId));
            // setSelectedSubCategory(subCategoryId);
        };
        
        // Function to check if a subcategory is selected
        const isSelected = (subCategoryId) => selectedSubCategory === subCategoryId;

        return (
            <div className='flex gap-1 flex-wrap justify-center max-w-96 mt-16'>
                {selectedCategory.subCategories && selectedCategory.subCategories.map((subCategory, index) => (
                    <li key={subCategory._id}
                        className={`padge cursor-pointer ${isSelected(subCategory._id) ? 'bg-primary text-white' : 'hover:text-primary'}`}
                        onClick={() => toggleSubCategory(subCategory._id)}>
                        {subCategory.title}
                    </li>
                ))}
            </div>
        );
    }

    function ChooseCategories() {
        const toggleCategory = (category) => {
            if (selectedCategory._id === category) {
                // If the category is already selected, deselect it
                setselectedCategory({});
            } else {
                // Otherwise, set this category as the selected one
                setselectedCategory(category);
            }
        };

        // Function to determine if a category is selected
        const isSelected = (category) => {
            return selectedCategory._id === category;
        };

        return (


            <div className='flex gap-1 flex-wrap justify-center max-w-96 mt-16'>
                {categories &&
                    categories.map((item, index) => (
                        <li
                            key={index}
                            className={`padge cursor-pointer ${isSelected(item._id) ? 'bg-primary text-white' : 'hover:text-primary'}`}
                            onClick={() => toggleCategory(item)}
                        >
                            {item.title}
                        </li>
                    ))}
            </div>

        )
    }




    return (
        <>
            <Popup id="project-post" onCancel={reset} className={isShow ? " show" : ""} header={currentStep > 2 ? "Add Post" : "Choose Category"}>
                <div className='flex flex-col items-center'>
                    {currentStep == 1 && (
                        <ChooseCategories />
                    )}
                    {currentStep == 2 && (
                        <ChooseSubCategories />
                    )}
                    {currentStep == 3 && (
                        <ChooseTags />
                    )}
                    <Button onClick={handleNextStep} className="w-full mb-7 mt-11 max-w-[400px]" shadow={true} shadowHeight={"14"}>
                        <span className='text-white font-bold capitalize text-lg'>
                            {currentStep > 2 ? "Post" : "Next"}
                        </span>
                    </Button>

                </div>
            </Popup>
        </>
    );
}


const mapStateToProps = (state) => ({
    api: state.api,
    categories: state.categories,
    auth: state.auth,

});

const mapDispatchToProps = {
    getCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPopup);

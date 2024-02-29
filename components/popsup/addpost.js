

import Popup from '../elements/popup';
import Button from '../elements/submitButton';
import Icon from '../Icons'
import { useState } from 'react';


function AddPost({isShow=""}) {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        if(currentStep<2)
        setCurrentStep(currentStep + 1);
    };

    return (
        <>
            <Popup id="add-post" className={isShow?" show":""} header={"Choose Category"}>
                <div className='mx-28'>
                    {currentStep == 1 && (
                        <Step1 />
                    )}
                    {currentStep == 2 && (
                        <Step2 />
                    )}
                    <Button onClick={handleNextStep} className="w-full mb-7 mt-11" shadow={true} shadowHeight={"14"}>
                        <span className='text-white font-bold capitalize text-lg'>
                            next
                        </span>
                    </Button>
                </div>
            </Popup>

        </>
    );
}
function Step1() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const isSelected = (category) => {
        return selectedCategories.includes(category);
    };
    return (
        <div className='flex gap-1 flex-wrap justify-center max-w-96 mt-16'>
            {
                [
                    'videography',
                    'modeling',
                    'music & audio',
                    'photography',
                    'post production',
                    'graphics',
                    'personal branding',
                    'modeling'].map((item, index) => (
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
function Step2() {
    return (
        <div className='flex flex-col gap-3 justify-center min-w-96 mt-16'>
            {
                [
                    'studio booking',
                    'equipment rental',
                    'music & audio',
                    'copyrights & permits',
                    'executive producing',
                ].map((item, index) => (
                    <li className='flex items-center justify-center capitalize border border-[#00000040] hover:border-2 hover:border-primary rounded-3xl h-[90px] cursor-pointer' key={index}>
                        <span className='text-primary text-base font-semibold'>
                            {item}
                        </span>
                    </li>
                ))}
        </div>
    )
}

export default AddPost;

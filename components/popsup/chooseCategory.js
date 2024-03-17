
import Popup from '../elements/popup';
import Button from '../elements/submitButton';
import Icon from '../Icons'
import { useState } from 'react';
import Switch from '../elements/switcher'


function POpup({ isShow = "" }) {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        if (currentStep < 3)
            setCurrentStep(currentStep + 1);
    };
    const handleZeroStep = () => {
        setCurrentStep(1);
    };

    return (
        <>
            <Popup id="add-post" onCancel={handleZeroStep} className={isShow ? " show" : ""} header={currentStep > 2 ? "Add Post" : "Choose Category"}>
                <div className='flex flex-col items-center'>
                    {currentStep == 1 && (
                        <Step1 />
                    )}
                    {currentStep == 2 && (
                        <Step2 />
                    )}
                    {currentStep == 3 && (
                        <AddPost />
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

        <div className='mx-28'>
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
        </div>
    )
}

function Step2() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    return (
        <div className='mx-28'>
            <div className='flex flex-col gap-3 justify-center min-w-96 mt-16'>
                {[
                    'studio booking',
                    'equipment rental',
                    'music & audio',
                    'copyrights & permits',
                    'executive producing',
                ].map((item, index) => (
                    <li
                        className={`flex items-center justify-center capitalize border border-[#00000040] rounded-3xl h-[90px] cursor-pointer ${selectedOption === index ? 'border-primary hover:border-2' : 'hover:border-2 hover:border-primary'}`}
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                    >
                        <span className={`text-base font-semibold ${selectedOption === index ? 'text-primary' : ''}`}>
                            {item}
                        </span>
                    </li>
                ))}
            </div>
        </div>
    );
}

function AddPost() {
    const [file, setfile] = useState(null);

    const FileUpload = (e) => {
        const data = handleFileUpload(e);
        setfile(data)
    };
    const inputstyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50"
    return (
        <>
            <div className='lg:w-[600px] flex flex-col gap-7 mx-12'>
                <section>
                    <div className='border-dashed border border-[#CACACA] flex flex-col items-center justify-center rounded-3xl py-6 mt-5 bg-DS_white'>
                        <label htmlFor="file-upload" className='rounded-full p-4 bg-[#F5F5F5]'>
                            <Icon name={"add-file"} className='w-6 h-6' />
                        </label>
                        <span className="text-primary text-sm">Click to Upload</span>
                    </div>
                </section>
                <section>
                    <input placeholder='name your project' className={inputstyle} />
                </section>
                <section>
                    <input placeholder='project description' className={inputstyle} />
                </section>
                <section>
                    <input placeholder='tools used' className={inputstyle} />
                </section>
                <section>
                    <input placeholder='tag other creatives' className={inputstyle} />
                </section>
                <section>
                    <input placeholder='add creative’s functions' className={inputstyle} />
                </section>
                <section>
                    <input placeholder='location' className={inputstyle} />
                </section>
                <section>
                    <input placeholder='search keywords' className={inputstyle} />
                </section>
                <section>
                    <input placeholder='project budget' className={inputstyle} />
                </section>
                <section>
                    <div className='flex justify-center items-center gap-9'>
                        <input placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                        <select
                            className="shadow-sm px-3 text-lg font-medium text-primary appearance-none w-min select-custom pr-8 capitalize"
                            required
                        >
                            {[

                                'second',
                                'minutes',
                                'Hours',
                            ].map((value, index) => <option key={index} value={value}>{value}</option>)}
                        </select>
                    </div>
                </section>
                <div className='flex justify-center gap-3 mt-1'>
                    <Switch onSwitchChange={() => { }} />
                    <p className='opacity-70'> Show on home feed & profile </p>
                </div>
            </div>

        </>
    );
}
export default POpup;

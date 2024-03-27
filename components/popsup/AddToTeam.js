
import Button from '../elements/button';
import Popup from '../elements/popup';
import React, { useState } from 'react';

function AddToTeam() {
    const [currentStep, setCurrentStep] = useState('step1');

    const steps = {
        step1 : {
            header :'Add To Team',
            buttonTxt : 'Next',
        },
        step2 : {
            header :'work hours',
            buttonTxt : 'confirm',
        },
     }
    const handleNextStep = () => {
        // Logic to handle moving to the next step
        setCurrentStep('step2');
    };

    return (
        <>
            <Popup id="add-to-team" onCancel={()=>setCurrentStep("step1")} header={steps[currentStep].header} >
                <div className='flex flex-col justify-between h-[75vh] w-full sm:w-[565px]'>
                    {currentStep === 'step1' && <Step1 />}
                    {currentStep === 'step2' && <Step2 />}
                    <div className='px-24'>
                        <Button name="reset-password" className="w-full mb-9" shadow={true} onClick={handleNextStep}>
                            {steps[currentStep].buttonTxt}
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
}
function Step1() {
    const projects = [
        {
            img: '/assets/imgs/projects/2.jpeg',
            creatives: '6',
            projectName: 'college short film project',
        },
        {
            img: '/assets/imgs/projects/3.jpeg',
            creatives: '6',
            projectName: 'my ad project',
        },
    ];
    return (
        <div>
            {projects.map((project, index) => (
                <div key={index} className="h-20  rounded-full mt-9 relative overflow-hidden">
                    <img className="absolute -translate-y-1/2 blur-sm" src={project.img} />
                    <div className="absolute z-20 flex items-center w-full h-full p-7">
                        <div>
                            <span className="text-white whitespace-nowrap border border-opacity-20 rounded-full px-3 py-1">{project.creatives} creatives</span>
                        </div>
                        <div className="w-full text-center p-20">
                            <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{project.projectName}</span>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}
function Step2() {
    return (
        <div className='flex gap-9 h-full justify-center items-center flex-col mt-24'>
            <div className='flex items-center gap-9'>
                <input placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                <span className="text-xl opacity-50 capitalize">
                    hours
                </span>
            </div>
        </div>
    )
}
function Step3() {
    const projects = [
        {
            img: '/assets/imgs/projects/2.jpeg',
            creatives: '6',
            projectName: 'college short film project',
        },
        {
            img: '/assets/imgs/projects/3.jpeg',
            creatives: '6',
            projectName: 'my ad project',
        },
    ];
    return (
        <div>
            {projects.map((project, index) => (
                <div key={index} className="h-20 w-full sm:w-[565px] rounded-full mt-9 relative overflow-hidden">
                    <img className="absolute -translate-y-1/2 blur-sm" src={project.img} />
                    <div className="absolute z-20 flex items-center w-full h-full p-7">
                        <div>
                            <span className="text-white whitespace-nowrap border border-opacity-20 rounded-full px-3 py-1">{project.creatives} creatives</span>
                        </div>
                        <div className="w-full text-center p-20">
                            <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{project.projectName}</span>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}
export default AddToTeam;

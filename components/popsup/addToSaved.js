
import { AddProjectToBoard } from '../../redux/action/apis/savedProject/boardProjects/add';
import { GetBoards } from '../../redux/action/apis/savedProject/board/get';
import Button from '../elements/button';
import Popup from '../elements/popup';
import React, { useEffect, useState } from 'react';
import Successfully_posting from './post_successfully_posting';
import { ClosePopUp } from '../../util/util';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function AddToSaved({
    getBoards_respond,
    AddProjectToBoard,
    GetBoards
}) {
    const [currentStep, setCurrentStep] = useState('step1');
    const router = useRouter();
    const { project: projectId } = router.query;

    
    const projects = getBoards_respond?.data || []
    console.log(projects)
    useEffect(() => {
        GetBoards()
    }, [])

    const steps = {
        step1: {
            header: 'Add To Saved Projects',
            buttonTxt: 'Next',
        },
    }
    const handleNextStep = (id) => {
        AddProjectToBoard({idboard: id, idproject :projectId})
        ClosePopUp("add-to-team")
        // setCurrentStep('step2');
    };

    // const projects = [
    //     {
    //         img: '/assets/imgs/projects/2.jpeg',
    //         creatives: '6',
    //         projectName: 'college short film project',
    //     },
    //     {
    //         img: '/assets/imgs/projects/3.jpeg',
    //         creatives: '6',
    //         projectName: 'my ad project',
    //     },
    // ];
    function Step1() {
        return (
            <div>
                {projects.map((project, index) => (
                    <div key={index} className="h-20 rounded-full mt-9 relative overflow-hidden" onClick={()=>handleNextStep(project._id)}>
                        <img className="absolute -translate-y-1/2 blur-sm" src={project.cover||'/assets/imgs/projects/3.jpeg'} />
                        <div className="absolute z-20 flex items-center w-full h-full p-7">
                            <div>
                                <span className="text-white whitespace-nowrap border border-opacity-20 rounded-full px-3 py-1">{project.projects.length} projects</span>
                            </div>
                            <div className="w-full text-center p-20">
                                <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{project.title}</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        )
    }
    return (
        <>
            <Popup id="add-to-team" onCancel={() => setCurrentStep("step1")} header={steps[currentStep].header} >
                <div className='flex flex-col justify-between h-[75vh] w-full sm:w-[565px]'>
                    {currentStep === 'step1' && <Step1 />}
                    {currentStep === 'step2' && <Step2 />}
                    <div className='sm:px-24'>
                        <Button name="reset-password" className="w-full mb-9" shadow={true} onClick={handleNextStep}>
                            {steps[currentStep].buttonTxt}
                        </Button>
                    </div>
                </div>
            </Popup>
        </>
    );
}


const mapStateToProps = (state) => ({
    addProjectToBoard_respond: state.api.AddProjectToBoard,
    getBoards_respond: state.api.GetBoards,
});

const mapDispatchToProps = {
    AddProjectToBoard,
    GetBoards
};
export default connect(mapStateToProps, mapDispatchToProps)(AddToSaved);
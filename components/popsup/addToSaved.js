
import { AddProjectToBoard } from '../../redux/action/apis/savedProject/boardProjects/add';
import { GetBoards } from '../../redux/action/apis/savedProject/board/get';
import Button from '../elements/button';
import Popup from '../elements/popup';
import React, { useEffect, useState } from 'react';
import Successfully_posting from './post_successfully_posting';
import { ClosePopUp, isProjectInObject } from '../../util/util';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function AddToSaved({
    getBoards_respond,
    AddProjectToBoard,
    addProjectToBoard_respond,
    GetBoards
}) {
    const [currentStep, setCurrentStep] = useState('step1');
    const router = useRouter();
    const { project: projectId } = router.query;


    const projects = getBoards_respond?.data || []
    
    useEffect(() => {
        GetBoards()
        AddProjectToBoard({idboard: -1})
    }, [getBoards_respond])

    const handleNextStep = (id) => {
        AddProjectToBoard({ idboard: id, idproject: projectId })
        ClosePopUp("add-to-team")
    };
    
    return (
        <>
            <Popup id="add-to-team" onCancel={() => setCurrentStep("step1")} header={"Add To Saved Projects"} >
                <div className='flex flex-col justify-between h-[75vh] w-full sm:w-[565px] overflow-y-scroll'>
                    {projects?.slice(1).map((project, index) => isProjectInObject(projects,project._id)? (
                        <div key={index} className="h-20 rounded-full mt-9 relative overflow-hidden cursor-pointer" onClick={() => handleNextStep(project._id)}>
                            <img className="absolute -translate-y-1/2 blur-sm" src={project.cover || '/assets/imgs/projects/3.jpeg'} />
                            <div className="absolute z-20 flex items-center w-full h-full p-7">
                                <div>
                                    <span className="text-white whitespace-nowrap border border-opacity-20 rounded-full px-3 py-1">{project.projects.length} projects</span>
                                </div>
                                <div className="w-full text-center p-20">
                                    <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{project.title}</span>
                                </div>
                            </div>
                        </div>
                    ):<></>
                    )}
                    {projects?.length === 1 && (
                        <div className='py-4'>
                            <div className='container flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet p'>
                                <div className='w-[540px] h-[400]px bg-gray-600 mt-10' />
                                <img src='/assets/imgs/theme/Empty.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
                                <h3 className='text-2xl font-bold mt-8 mb-4'>
                                    There's No Boards Yet
                                </h3>
                            </div>
                        </div>
                    )}
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

import { AddProjectToBoard } from '../../redux/action/apis/savedProject/boardProjects/add';
import { GetBoards } from '../../redux/action/apis/savedProject/board/get';
import Button from '../elements/button';
import Popup from '../elements/popup';
import React, { useEffect, useState } from 'react';
import SuccessfullyPosting from './post_successfully_posting';
import { ClosePopUp, OpenPopUp } from '../../util/util';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Icon from "../../components/Icons";
import Drawer from '../elements/drawer';


function AddToSaved({
    getBoards_respond,
    AddProjectToBoard,
    addProjectToBoard_respond,
    GetBoards,
    toggleDrawerAddFav,
    isOpen

}) {
    const router = useRouter();
    const { project: projectId } = router.query;
    const boards = getBoards_respond?.data || []

    useEffect(() => {
        AddProjectToBoard({ idboard: -1 })
    }, [AddProjectToBoard.message])
    useEffect(() => {
        if (addProjectToBoard_respond)
            OpenPopUp("addProjectToBoard-popup")
    }, [addProjectToBoard_respond])

    const handleNextStep = (id) => {
        AddProjectToBoard({ idboard: id, idproject: projectId })
    };
    
    const init = () => {
        GetBoards({})
    };
    const isProjectInBoard = (board, projectId) => {
        for (const project of board.projects) {
            if (project.project._id === projectId) {
                return true;
            }
        }
        
        return false;
    }
    
    const close = () => {
        toggleDrawerAddFav()
        ClosePopUp('addProjectToBoard-popup')
    };
    

    return (
        <>
            <SuccessfullyPosting id="addProjectToBoard-popup" message="Add To Team" onCancel={close} />
            <Drawer className='z-30' toggleDrawer={toggleDrawerAddFav} name={'Add To Saved Projects'} isOpen={isOpen}>
                <div className='flex flex-col w-full sm:w-[565px] overflow-y-scroll'>
                    {boards?.map((board, index) => !isProjectInBoard(board, projectId) ? (
                        <div key={index} className="h-20 rounded-full mt-9 relative overflow-hidden cursor-pointer" onClick={() => handleNextStep(board._id)}>
                            <div className="absolute z-20 flex items-center w-full h-full p-7">
                                <div>
                                    <span className="text-white whitespace-nowrap border border-opacity-20 rounded-full px-3 py-1">{board.projects.length} projects</span>
                                </div>
                                <div className="w-full text-center p-20">
                                    <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{board.title}</span>
                                </div>
                            </div>
                            {board.projects.length == 0 ?
                            <div className="w-full rounded-[50px] img-cart-style flex justify-center items-center" >
                            <Icon className="w-44" name={'dvudu-image'} />
                        </div> : <img className="absolute -translate-y-1/2 blur-sm" src={board.projects[0].project.cover} />}
                                
                        </div>
                    ) : <></>
                    )}
                    {boards?.length === 0 && (
                        <div className='py-4'>
                            <div className='container flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet p'>
                                <div className='w-[540px] h-[400]px bg-gray-600 mt-10' />
                                <img src='/assets/imgs/theme/Empty.svg' className='lg:w-[540px] lg:h-[450px]' />
                                <h3 className='text-2xl font-bold mt-8 mb-4'>
                                    There's No Boards Yet
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            </Drawer>
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
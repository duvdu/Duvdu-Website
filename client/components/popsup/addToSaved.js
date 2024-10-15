
import { AddProjectToBoard } from '../../redux/action/apis/bookmarks/bookmarkItem/add';
import { GetBoards } from '../../redux/action/apis/bookmarks/bookmark/get';
import React, { useEffect, useState } from 'react';
import SuccessfullyPosting from './post_successfully_posting';
import { ClosePopUp, OpenPopUp } from '../../util/util';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Icon from "../../components/Icons";
import Drawer from '../elements/drawer';
import DuvduLoading from '../elements/duvduLoading';
import EmptyComponent from '../pages/contracts/emptyComponent';
import { useTranslation } from 'react-i18next';


function AddToSaved({
    getBoards_respond,
    AddProjectToBoard,
    addProjectToBoard_respond,
    GetBoards,
    toggleDrawerAddFav,
    isOpen,
}) {
    const router = useRouter();
    const { project: projectId , studio:rentalId } = router.query;
    const boards = getBoards_respond?.data || []
    const { t } = useTranslation();
    useEffect(()=>{
        if(addProjectToBoard_respond?.message==='success')
        init()
    },[addProjectToBoard_respond?.data])
    useEffect(() => {
        if (addProjectToBoard_respond?.message) {
            close()

            OpenPopUp("addProjectToBoard-popup")
            AddProjectToBoard({ idboard: -1 })
        }
    }, [addProjectToBoard_respond?.message])

    const handleNextStep = (id) => {
        AddProjectToBoard({ idboard: id, idproject: projectId ?? rentalId })
    };

    const init = () => {
        GetBoards({})
    };
    const isProjectInBoard = (board, projectId) => {
        // for (const project of board?.projects) {
        //     if (project.project._id === projectId) {
        //         return true;
        //     }
        // }

        return false;
    }

    const close = () => {
        toggleDrawerAddFav()
        ClosePopUp('addProjectToBoard-popup')
    };

    return (
        <>
            <SuccessfullyPosting id="addProjectToBoard-popup" message="Add To board" onCancel={()=> ClosePopUp('addProjectToBoard-popup') } />
            <Drawer className='z-30' toggleDrawer={toggleDrawerAddFav} name={t('Add To Saved Projects')} isOpen={isOpen}>
                <DuvduLoading loadingIn={"AddProjectToBoard"} />
                <div className='flex flex-col w-full overflow-y-scroll'>
                    {boards?.filter(board => !isProjectInBoard(board, projectId)).map((board, index) => (
                        <div key={index} className="h-20 rounded-full mt-9 relative overflow-hidden cursor-pointer" onClick={() => handleNextStep(board._id)}>
                            <div className="absolute z-20 flex items-center size-full p-7">
                                <div>
                                    <span className="text-white whitespace-nowrap border border-opacity-20 rounded-full px-3 py-1">{board.bookmarkProjectCount} projects</span>
                                </div>
                                <div className="w-full text-center p-20">
                                    <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{board.title}</span>
                                </div>
                            </div>
                            {!board.image?
                                <div className="flex justify-center items-center w-full h-full" style={{backgroundColor:board.color}} >
                                </div> : <img className="absolute -translate-y-1/2 blur-sm w-full" src={board.image} />}
                        </div>
                    ))}
                    {boards?.filter(board => !isProjectInBoard(board, projectId))?.length === 0 && (
                        <div className='mt-4 mx-auto'>
                            <EmptyComponent message={"There's No Boards Yet"} />
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
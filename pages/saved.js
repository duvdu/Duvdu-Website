import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import CreateBoardPopup from "../components/popsup/createnewBoard";
import Selector from "../components/elements/CustomSelector";
import React, { useEffect, useState } from 'react';
import { GetBoards } from "../redux/action/apis/savedProject/board/get";
import { UpdateBoard } from "../redux/action/apis/savedProject/board/update";
import { CreateSavedBoard } from "../redux/action/apis/savedProject/board/create";
import { connect } from "react-redux";
import { DeleteSavedBoard } from "../redux/action/apis/savedProject/board/deleteboard";
import { ClosePopUp, OpenPopUp } from "../util/util";
import EditBoard from "../components/popsup/editBoard";

const data = [
    {
        img1: '/assets/imgs/profile/defultUser.jpg',
        img2: '/assets/imgs/projects/2.jpeg',
        img3: '/assets/imgs/projects/3.jpeg',
        projectsNum: '37',
        name: 'favorites',
    },
    {
        img1: '/assets/imgs/projects/4.jpeg',
        img2: '/assets/imgs/projects/5.jpeg',
        img3: '/assets/imgs/projects/6.jpeg',
        projectsNum: '564',
        name: 'new shoot inspiration',
    },
    {
        img1: '/assets/imgs/projects/7.jpeg',
        img2: '/assets/imgs/projects/8.jpeg',
        img3: '/assets/imgs/projects/9.jpeg',
        projectsNum: '546',
        name: 'mood board for our project',
    },

];


const Saved = ({
    GetBoards,
    CreateSavedBoard,
    UpdateBoard,
    DeleteSavedBoard,
    getBoards_respond,
    createBoard_respond,
    updateBoard_respond,
    deleteSavedBoard_respond

}) => {
    const Boards = ({ data, }) => {
        if(!data) return
        console.log(data._id)
        const { projectsNum, title, _id: id } = data;
        const img1 = data?.projects[0]?.project?.cover
        const img2 = data?.projects[1]?.project?.cover
        const img3 = data?.projects[2]?.project?.cover

        const dropdown = [
            {
                value: "Delete",
            },
            {
                value: "Edit",
            },
        ]

        return (
            <>
                <EditBoard id={id} onSbmit={(v) => UpdateBoard({ title: v} , id)} />
                <div className="boards-card">
                    <div className="absolute top-7 right-7">
                        <Selector options={dropdown} onSelect={(v) => v.value == "Delete" ? DeleteSavedBoard(id) : OpenPopUp("edit-board-"+id) }> <div className="size-5 bg-black rounded-full">  </div> </Selector> 
                    </div>
                    <a href={`/save/${id}`} className="projects cursor-pointer">
                        <div className="col1 img-cart-style bg-[${img1}]" style={{ backgroundImage: `url(${img1})` }}></div>
                        <div className="col2">
                            <div className="row1 img-cart-style" style={{ backgroundImage: `url(${img2})` }}></div>
                            <div className="row2 img-cart-style" style={{ backgroundImage: `url(${img3})` }}></div>
                        </div>
                    </a>
                    <div className="boards-info projects-num">{projectsNum} projects</div>
                    <a href={`/save/${id}`}>

                        <div className="absolute bottom-0 w-full h-1/2 rounded-b-[50px]  gradient1" />

                        <div className="boards-info projects-name flex">
                            {title == "favorites" && <Icon name={"favorites"} />}
                            {title}
                        </div>
                    </a>
                </div>
            </>
        );
    };



    useEffect(() => {
        // console.log(getBoards_respond)
    }, [getBoards_respond])
    useEffect(() => {
        GetBoards()
        ClosePopUp("create-new-board")
    }, [createBoard_respond, updateBoard_respond, deleteSavedBoard_respond])


    return (
        <>
           <CreateBoardPopup onSbmit={(v) => CreateSavedBoard({ title: v, projects: [] })} />
            <Layout shortheader={true} isbodyWhite={true}>
                <section className="mt-3 mb-12">
                    <div className="container mb-7">
                        <div className="flex alignCenter mb-7 items-center">
                            <h1 className="text-2xl opacity-80 font-semibold capitalize">mood boards</h1>
                            <div className="mr-6"></div>
                            <div data-popup-toggle="popup" data-popup-target='create-new-board' className="new_board ">
                                new board
                                <Icon className="text-white" name={"plus"} />
                            </div>
                        </div>
                        {false && (
                            <h3>No saved Found </h3>
                        )}
                        <div className="boards-grid">
                            {
                                getBoards_respond?.data?.map((feature, index) => (
                                    <Boards key={index} data={feature} />
                                ))
                            }
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};
const mapStateToProps = (state) => ({
    getBoards_respond: state.api.GetBoards,
    createBoard_respond: state.api.CreateSavedBoard,
    updateBoard_respond: state.api.UpdateBoard,
    deleteBoard_respond: state.api.DeleteBoard,
    deleteSavedBoard_respond: state.api.DeleteSavedBoard,
});

const mapDispatchToProps = {
    GetBoards,
    CreateSavedBoard,
    UpdateBoard,
    DeleteSavedBoard
};


export default connect(mapStateToProps, mapDispatchToProps)(Saved);

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
import Link from 'next/link'
import { GetFavList } from "../redux/action/apis/savedProject/fav/getAll";

const Saved = ({
    GetBoards,
    CreateSavedBoard,
    UpdateBoard,
    DeleteSavedBoard,
    getBoards_respond,
    createBoard_respond,
    updateBoard_respond,
    deleteSavedBoard_respond,
    GetFavList,
    getFavList_respond

}) => {
    const Boards = ({ data, isFav }) => {
        if (!data) return

        const { totalProjects, title, _id: id } = data;
        const img1 = data?.projects[0]?.project?.cover

        
        const dropdown = [
            {
                value: "Delete",
            },
            {
                value: "Edit",
            },
        ]
        const handleSelectClick = (event) => {
            event.stopPropagation();
        };
        const handleDropdownSelect = (v) => {
            v == "Delete" ? DeleteSavedBoard(id) : OpenPopUp("edit-board-" + id)
        };
        return (
            <>
                <EditBoard id={id} onSbmit={(v) => UpdateBoard({ title: v }, id)} />
                <div className="boards-card">
                    <div className="absolute top-7 right-7" onClick={handleSelectClick}>
                        {!isFav &&
                            <Selector options={dropdown} onSelect={handleDropdownSelect}>
                                <div className="border rounded-full size-9 flex justify-center items-center">
                                    <Icon className="size-6 text-white" name="ellipsis-vertical" />
                                </div>
                            </Selector>}
                    </div>
                    <Link href={`/save/${id}`}>
                        <div className="projects cursor-pointer">
                            {img1 ?
                                <div className="w-full rounded-[50px] img-cart-style" style={{ backgroundImage: `url(${img1})` }}></div> :
                                <div className="w-full rounded-[50px] img-cart-style flex justify-center items-center" >
                                    <Icon className="w-44" name={'dvudu-image'} />
                                </div>
                            }
                        </div>
                    </Link>
                    <div className="boards-info projects-num">{totalProjects} projects</div>
                    <Link href={`/save/${id}`} >
                        <div className="cursor-pointer">
                            <div className="absolute bottom-0 w-full h-1/2 rounded-b-[50px]  gradient1" />
                            <div className="boards-info projects-name flex">
                                {isFav && <Icon name={"favorites"} />}
                                {title}
                            </div>
                        </div>
                    </Link>
                </div>
            </>
        );
    };
    const [initFav, setInitFav] = useState({
        _id:'favorites',
        title: "Favorites",
        projects: [],
        totalProjects: 0
    });
    useEffect(() => {
        if (getFavList_respond?.data) {
            setInitFav({
                _id:'favorites',
                title: "Favorites",
                projects: getFavList_respond.data,
                totalProjects: getFavList_respond.data.length
            });
        }
    }, [getFavList_respond]);
    useEffect(() => {
        if (createBoard_respond || updateBoard_respond || deleteSavedBoard_respond) {
            GetBoards()
            GetFavList({})
            DeleteSavedBoard(-1)
        }
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
                            <Boards isFav={true} data={initFav} />
                            {
                                getBoards_respond?.data?.map((feature, index) => (
                                    <Boards key={index} isFav={false} data={feature} />
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
    getFavList_respond: state.api.GetFavList,
});

const mapDispatchToProps = {
    GetBoards,
    CreateSavedBoard,
    UpdateBoard,
    DeleteSavedBoard,
    GetFavList
};


export default connect(mapStateToProps, mapDispatchToProps)(Saved);

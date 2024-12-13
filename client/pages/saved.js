import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import CreateBoardPopup from "../components/popsup/createnewBoard";
import Selector from "../components/elements/CustomSelector";
import React, { useEffect, useState } from 'react';
import { GetBoards } from "../redux/action/apis/bookmarks/bookmark/get";
import { UpdateBoard } from "../redux/action/apis/bookmarks/bookmark/update";
import { CreateSavedBoard } from "../redux/action/apis/bookmarks/bookmark/create";
import { connect } from "react-redux";
import { DeleteSavedBoard } from "../redux/action/apis/bookmarks/bookmark/deleteboard";
import { ClosePopUp, OpenPopUp, } from "../util/util";
import { useTranslation } from 'react-i18next';
import EditBoard from "../components/popsup/editBoard";
import Link from 'next/link'
import { GetFavList } from "../redux/action/apis/bookmarks/fav/getAll";
import DeleteBoard from "../components/popsup/DeleteBoard";
import DuvduLoading from "../components/elements/duvduLoading";
import { useRouter } from "next/router";

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
    isLogin,
    getFavList_respond

}) => {
    const { t } = useTranslation();
    const route = useRouter()
    useEffect(()=>{
        if(isLogin===false)
            route.push('/')
    },[isLogin])
    const Boards = ({ data, isFav }) => {
        if (!data) return
        const { title, _id: id } = data;
        const img1 = data?.image
        const color = data?.color

        const dropdown = [
            {
                value: "Edit",
            },
            {
                value: "Delete",
            },
        ]
        const handleSelectClick = (event) => {
            event.stopPropagation();
        };
        const handleDropdownSelect = (v) => {
            v == "Delete" ? OpenPopUp('delete-board-' + id) : OpenPopUp("edit-board-" + id)
        };
        const deleteSavedBoard = () => {
            DeleteSavedBoard(id)
        };

        return (
            <>
                <DeleteBoard onClick={deleteSavedBoard} id={id} />
                <EditBoard id={id} onSbmit={(v) => UpdateBoard(v, id)} defultValue={{title , image:img1}} />
                <div className="boards-card h-[400px]">
                    <div className="absolute top-7 end-7" onClick={handleSelectClick}>
                        {!isFav &&
                            <Selector options={dropdown} onSelect={handleDropdownSelect}>
                                <div className="border rounded-full size-9 flex justify-center items-center">
                                    <Icon className="size-6 text-white" name="ellipsis-vertical" />
                                </div>
                            </Selector>
                        }
                    </div>
                    <Link href={`/save/${id}`}>
                        <div className="projects cursor-pointer">
                            {img1 ?
                                <div className={`w-full rounded-[50px]  ${isFav ? 'bg-[#E8F1FD] dark:bg-[#1A2024] bg-center bg-no-repeat border-[2px] !border-[#B0C9EB] dark:!border-[#B0C9EB40]':'img-cart-style'} `} style={{ backgroundImage: `url(${img1})`}}></div> :
                                <div className="w-full rounded-[50px] img-cart-style" style={{backgroundColor:color}} >
                                    {/* <Icon className="w-44" name={'dvudu-image'} /> */}
                                </div>
                            }
                        </div>
                    </Link>
                    <div className={`boards-info projects-num ${isFav && '!text-[#263257] dark:!text-[white] !bg-transparent rounded-full !border-gray-400'}`}>{data?.bookmarkProjectCount} {t(data?.bookmarkProjectCount===1?'project':'projects')}</div>
                    <Link href={`/save/${id}`} >
                        <div className="cursor-pointer">
                            <div className={`absolute bottom-0 w-full h-1/3 rounded-b-[50px]  ${isFav?'gradient2':'gradient1`'}`} />
                            <div className={`boards-info projects-name flex items-center gap-2 ${isFav && '!text-[#263257] dark:!text-white'}`}>
                                {isFav && <Icon className='hidden dark:block' name={"favorites"} />}
                                {isFav && <Icon className='block dark:hidden w-full' name={"favorite"} />}
                                {title}
                            </div>
                        </div>
                    </Link>
                </div>
            </>
        );
    };

    const [initFav, setInitFav] = useState({
        _id: 'favorites',
        title: "Favorites",
        image:'/assets/imgs/Favorite.svg',
        projects: [],
        totalProjects: 10
    });
    useEffect(() => {
        if (getFavList_respond?.data) {
            setInitFav({
                _id: 'favorites',
                title: "Favorites",
                image:'/assets/imgs/Favorite.svg',
                projects: getFavList_respond.data,
                bookmarkProjectCount: getFavList_respond.data.length
            });
        }
    }, [getFavList_respond?.data]);
    useEffect(() => {
        
        if (createBoard_respond?.message || updateBoard_respond?.message || deleteSavedBoard_respond?.message) {
            GetBoards()
        }
        if(!getBoards_respond){
            GetBoards()
        }
        if(!getFavList_respond){
            GetFavList({search:''})
        }
        ClosePopUp("create-new-board")
    }, [createBoard_respond, updateBoard_respond, deleteSavedBoard_respond])


    return (
        <>
            <CreateBoardPopup loading={createBoard_respond?.loading} onSbmit={(v) => CreateSavedBoard(v)} />
            <Layout shortheader={true} isbodyWhite={true}>

                <section className="mt-3 mb-12">
                    <div className="container mb-7">
                        <div className="flex alignCenter mb-7 items-center">
                            <h1 className="text-2xl opacity-80 font-semibold capitalize">{t("mood boards")}</h1>
                            <div className="mr-6"></div>
                            <div data-popup-toggle="popup" data-popup-target='create-new-board' className="new_board ">
                                {t("new bookmark")}
                                <Icon className="text-white" name={"plus"} />
                            </div>
                        </div>
                        {false && (
                            <h3>{t("No saved Found")}</h3>
                        )}
                        <div className="boards-grid">
                            <Boards isFav={true} data={initFav} />
                        {getBoards_respond?.loading?
                        <DuvduLoading loadingIn={""} type=''/>:
                            
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
    isLogin: state.auth.login,  
});

const mapDispatchToProps = {
    GetBoards,
    CreateSavedBoard,
    UpdateBoard,
    DeleteSavedBoard,
    GetFavList
};


export default connect(mapStateToProps, mapDispatchToProps)(Saved);

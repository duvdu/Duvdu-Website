import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Card from "../../components/elements/saved-project-card";
import Icon from '../../components/Icons';
import { Goback } from '../../util/util';
import { DeleteProjectFromBoard } from "../../redux/action/apis/savedProject/boardProjects/remove";
import { AddProjectToBoard } from "../../redux/action/apis/savedProject/boardProjects/add";
import { GetFavList } from "../../redux/action/apis/savedProject/fav/getAll";
import { SwapProjectToFav } from "../../redux/action/apis/savedProject/fav/favAction";
import FavProjectCard from "../../components/elements/fav-project-card";
import ProjectCard from "../../components/elements/project-card";
import EmptyComponent from "../../components/pages/contracts/emptyComponent";
import { useTranslation } from 'react-i18next';
import DuvduLoading from "../../components/elements/duvduLoading";

const Projects = ({
    GetFavList,
    delete_respond,
    get_respond,
    swap_respond
}) => {
    const { t } = useTranslation();
    const Router = useRouter();
    const boardId = Router.query.boardId;
    const showLimit = 24;
    const [allprojects, setallProjects] = useState(null);
    const [limit, setLimit] = useState(showLimit);

    const targetRef = useRef(null);

    useEffect(() => {
        if (get_respond?.data)
            setallProjects(get_respond?.data)
    }, [get_respond]);

    useEffect(() => {
        if (delete_respond?.data || boardId || swap_respond?.data) {
            GetFavList({});
        }
    }, [delete_respond, boardId, swap_respond]);

    const getPaginatedProjects = allprojects;
    
    return (
        <>
            <Layout isbodyWhite={true}>
                <section className="mt-6 mb-12">
                    <div className="container mb-30">
                        <div className='flex gap-3 pb-6'>
                            <div className='flex justify-center items-center rounded-full border px-5 cursor-pointer aspect-square' onClick={Goback}>
                            <div className="rtl:rotate-180">
                                <Icon className='w-5 h-5 text-black dark:text-white' name={'angle-left'} />
                            </div>
                            </div>
                            <span className='flex items-center rounded-full header-border px-7 h-14 text-lg font-medium'>{t("favorites")}</span>
                        </div>
                        

                        {getPaginatedProjects && getPaginatedProjects.length == 0 && (
                            <EmptyComponent message={"No Projects Yet!"} />
                        )}
                        {get_respond?.loading?
                        <DuvduLoading loadingIn={""} type='projects'/>:
                        <div className="grid minmax-280 gap-5">
                            {getPaginatedProjects?.map((item, i) => (
                                item?.project && (
                                    (item?.cycle == "rentals" || item?.cycle == "studio-booking") ? (
                                        <ProjectCard key={`studio-${i}`} cardData={item.project} type="rentals" enbablelove={true}/>
                                    ) : (
                                        <ProjectCard key={`project-${i}`} cardData={item.project} enbablelove={true}/>
                                    )
                                )
                            ))}
                        </div>
                        }
                        {
                            getPaginatedProjects?.length === limit &&
                            <div className="load-parent">
                                <img className="load" ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    add_respond: state.api.AddProjectToBoard,
    delete_respond: state.api.DeleteProjectFromBoard,
    get_respond: state.api.GetFavList,
    swap_respond: state.api.SwapProjectToFav,

});

const mapDispatchToProps = {
    AddProjectToBoard,
    DeleteProjectFromBoard,
    GetFavList,
    SwapProjectToFav
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
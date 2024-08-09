import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import Card from "../../components/elements/saved-project-card";
import Icon from '../../components/Icons';
import { Goback} from '../../util/util';
import { useTranslation } from 'react-i18next';

import { GetSavedBoard } from "../../redux/action/apis/savedProject/boardProjects/getone";
import { DeleteProjectFromBoard } from "../../redux/action/apis/savedProject/boardProjects/remove";
import { AddProjectToBoard } from "../../redux/action/apis/savedProject/boardProjects/add";
import DuvduLoading from "../../components/elements/duvduLoading";
import EmptyComponent from "../../components/pages/contracts/emptyComponent";


const Projects = ({
    projects,
    AddProjectToBoard,
    DeleteProjectFromBoard,
    GetSavedBoard,
    delete_respond,
    get_respond

}) => {
    const { t } = useTranslation();
    const Router = useRouter();
    const boardId = Router.query.boardId;
    const showLimit = 24;
    const [allprojects, setallProjects] = useState(null);
    const [limit, setLimit] = useState(showLimit);

    const targetRef = useRef(null);

    useEffect(() => {
        if (get_respond)
            setallProjects(get_respond?.data?.projects)
    }, [get_respond]);

    useEffect(() => {
        if (delete_respond)
            GetSavedBoard({ id: boardId })
    }, [delete_respond]);

    useEffect(() => {
        if (boardId) {
            GetSavedBoard({ id: boardId })
        }
        setallProjects(null)
    }, [boardId]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        let hasBeenVisible = false;

        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setLimit((prevLimit) => prevLimit + showLimit);
                    }, 2000);
                    if (targetRef.current) {
                        targetRef.current.classList.add('active');
                    }
                    hasBeenVisible = true;
                    observer.unobserve(entry.target);
                }
                else {
                    if (targetRef.current) {
                        targetRef.current.classList.remove('active');
                    }

                }

            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [limit]);

    const getPaginatedProjects = allprojects;

    return (
        <>
            <Layout isbodyWhite={true}>
                <section className="mt-6 mb-12">
                    <div className="container mb-30">
                        <div className='flex gap-3 pb-6'>
                            <div className='flex justify-center items-center rounded-full border px-5 cursor-pointer aspect-square' onClick={Goback}>
                                <Icon className='w-5 h-5 text-black dark:text-white' name={'angle-left'} />
                            </div>
                            <span className='flex items-center rounded-full header-border px-7 h-14 text-lg font-medium'>
                                {get_respond?.data?.title}
                            </span>
                        </div>
                        <DuvduLoading loadingIn={"GetSavedBoard"}/>
                        {getPaginatedProjects?.length === 0 && (
                            <EmptyComponent message={"No Projects Yet!"} />
                        )}
                        <div className="grid minmax-280 gap-5">
                            {getPaginatedProjects?.map((item, i) => (
                                <Card key={i} cardData={item}/>
                            ))}
                        </div>
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
    get_respond: state.api.GetSavedBoard,
});

const mapDispatchToProps = {
    AddProjectToBoard,
    DeleteProjectFromBoard,
    GetSavedBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
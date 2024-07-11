import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import Selector from "../components/elements/CustomSelector";
import React, { useEffect, useState } from 'react';
import UploadFilesTeam from '../components/popsup/teamProject/uploadFilesTeam';
import { connect } from "react-redux";
import { GetTeamProjects } from "../redux/action/apis/teamproject/get";
import Link from "next/link";
import { CreateTeamProject } from "../redux/action/apis/teamproject/create";
import { DeleteTeamProjects } from "../redux/action/apis/teamproject/deleteProject";
import EditFilesTeam from "../components/popsup/teamProject/EditFilesTeam";
import { useRouter } from "next/router";
import DuvduLoading from "../components/elements/duvduLoading";

const Card = ({ data, DeleteTeamProjects }) => {
    const { cover, creatives, title, _id, status } = data;
    const route = useRouter()

    const onDelete = () => {
        DeleteTeamProjects(_id)
    }
    const onEdit = (_id) => {
        route.push({
            pathname: '/teams',
            query: { edit: _id },
        });
    }
    const handleSelectClick = (event) => {
        event.stopPropagation();
    };

    const handleDropdownSelect = (v) => {
        v === 'Delete' ? onDelete() : onEdit(_id)
    };

    return (
        <>
            <Link href={`/team/${_id}`}>
                <div className="boards-card relative cursor-pointer">
                    <>
                        <div
                            className="w-full h-full rounded-[50px] img-cart-style"
                            style={{ backgroundImage: `url(${cover})` }}
                        />
                        <div className="boards-info projects-num capitalize">
                            {creatives.length} creatives
                        </div>
                    </>
                    <div
                        className="absolute top-5 right-5"
                        onClick={handleSelectClick}
                    >
                        <Selector
                            onSelect={handleDropdownSelect}
                            options={status == 'available' ? null : [
                                {
                                    value: 'Delete',
                                },
                                {
                                    value: 'Edit',
                                },
                            ]}
                        >

                            {status == 'pending' && <Icon name="waiting" />}
                            {status == 'refuse' && <Icon name="circle-exclamation" className={"border border-[#D72828] text-[#D72828] rounded-full p-2 size-11"} />}
                            {status == 'available' && <Icon className={"border text-[#50C878] border-[#50C878] rounded-full p-2 size-11"} name="circle-check" />}
                        </Selector>
                    </div>
                    <div>
                        <div className="absolute bottom-0 w-full h-1/2 rounded-b-[50px] gradient1" />
                        <div className="boards-info projects-name shadow2 flex">
                            {title}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

const CreateBoard = ({ GetTeamProjects, get_respond, DeleteTeamProjects, delete_respond, create_respond, update_respond,api }) => {
    const route = useRouter()
    const searchTerm = "";
    const pagganation = get_respond?.pagination
    const page = 1;
    const showLimit = 6;
    const [limit, setLimit] = useState(showLimit);


    useEffect(() => {
        GetTeamProjects({ limit: limit, search: searchTerm?.length > 0 ? searchTerm : null, page: page })
    }, [delete_respond, create_respond, update_respond, limit, searchTerm]);

    useEffect(() => {
        const handleScroll = () => {
            if (pagganation?.totalPages > page) {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || window.innerHeight;
                const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

                if (scrolledToBottom) {
                    setLimit(showLimit + limit);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, pagganation?.totalPages]);



    return (
        <Layout shortheader={true} isbodyWhite={true}>

            <UploadFilesTeam />

            <EditFilesTeam />

            <section className="mt-3 mb-12">
                <div className="container mb-7">
                    <div className="flex gap-6 alignCenter mb-7 items-center">
                        <h1 className="text-2xl opacity-80 font-semibold capitalize whitespace-nowrap">Team Projects</h1>
                        <div
                            onClick={() => {
                                route.push({
                                    pathname: '/teams',
                                    query: { add: true },
                                });
                            }}
                            className="flex gap-5 items-center py-[21px] px-[35px] rounded-full bg-primary text-white text-center text-lg font-semibold cursor-pointer capitalize whitespace-nowrap">
                            New Project
                            <Icon className="w-4 text-white" name="plus" />
                        </div>
                    </div>
                    {
                        get_respond?.data?.length > 0 ? (
                            <div className="boards-grid">
                                {get_respond.data.map((feature, index) => (
                                    <Card key={index} data={feature} DeleteTeamProjects={DeleteTeamProjects} />
                                ))}
                            </div>
                        ) : (
                            get_respond?.data &&
                            <Empty />
                        )}
                </div>
                <DuvduLoading loadingIn = {"GetTeamProjects"} />
            </section>
        </Layout>
    );
};

const Empty = () =>
    <div className='container flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet p-10'>
        <div className='bg-gray-600 mt-5' />
        <img src='/assets/imgs/theme/TeamProjects.svg' className='lg:w-[540px] lg:h-[450px]' />
        <h3 className='text-[40px] font-semibold mt-8 mb-4'>
            Team Projects
            <p className="text-2xl opacity-50">
                “Team Projects” are a great way to build teams for your project.
            </p>
        </h3>
    </div>

const mapStateToProps = (state) => ({
    get_respond: state.api.GetTeamProjects,
    create_respond: state.api.CreateTeamProject,
    delete_respond: state.api.DeleteTeamProjects,
    update_respond: state.api.UpdateTeamProject,
    api: state.api,

});

const mapDispatchToProps = {
    GetTeamProjects,
    DeleteTeamProjects
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);


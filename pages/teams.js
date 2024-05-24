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
    console.log(data)
    const ioconstyle = "rounded-full -translate-y-1/2 translate-x-1/2 border p-3 text-2xl size-11"

    return (
        <>
            <Link href={`/team/${_id}`}>
                <div className="boards-card relative">
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
                        className="absolute top-0 right-0 pe-12 pt-12 flex justify-center items-center"
                        onClick={handleSelectClick}
                    >
                         <Selector
                            onSelect={(v) => v.value === 'Delete' ? onDelete() : onEdit(_id)}
                            options={[
                                {
                                    value: 'Delete',
                                },
                                {
                                    value: 'Edit',
                                },
                            ]}
                        >

                            {status == 'pending' && <Icon name="waiting" className={"-translate-y-1/2 translate-x-1/2"} />}
                            {status == 'refuse' && <Icon name="circle-exclamation" className={"border-[#D72828] text-[#D72828] " + ioconstyle} />}
                            {status == 'available' && <Icon className={"text-[#50C878] border-[#50C878]" + ioconstyle} name="circle-check" />}
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

const CreateBoard = ({ GetTeamProjects, get_respond, DeleteTeamProjects, delete_respond, create_respond }) => {
    const route = useRouter()

    useEffect(() => {
        GetTeamProjects();
    }, [GetTeamProjects, delete_respond, create_respond]);


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
            </section>
        </Layout>
    );
};

const Empty = () =>
    <div className='container flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet'>
        <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
        <img src='/assets/imgs/theme/TeamProjects.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
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

});

const mapDispatchToProps = {
    GetTeamProjects,
    DeleteTeamProjects
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);


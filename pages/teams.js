import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import Selector from "../components/elements/CustomSelector";
import React, { useEffect, useState } from 'react';
import UploadFilesTeam from '../components/popsup/uploadFilesTeam';
import { connect } from "react-redux";
import { GetTeamProjects } from "../redux/action/apis/teamproject/get";
import Link from "next/link";
import { CreateTeamProject } from "../redux/action/apis/teamproject/create";
import { DeleteTeamProjects } from "../redux/action/apis/teamproject/deleteProject";

const Card = ({ data, DeleteTeamProjects }) => {
    const { cover, creatives, title, _id } = data;
    const onDelete = () => {
        DeleteTeamProjects(_id)
    }

    return (
        <>
            <div className="boards-card">
                <Link href={`/team/${_id}`}>
                    <div className="w-full h-full rounded-[50px] img-cart-style" style={{ backgroundImage: `url(${cover})` }} />
                </Link>
                <div className="boards-info projects-num capitalize">{creatives.length} creatives</div>
                <div className="absolute top-0 right-0 p-12 flex justify-center items-center">
                    <Icon className="text-[#50C878] rounded-full -translate-y-1/2 translate-x-1/2 border border-[#50C878] p-3 text-2xl w-6 h-min" name="circle-check" />
                    <Selector
                    onSelect = { onDelete }
                        options={[
                            {
                                value: "delete",
                            },
                            
                        ]} className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer" />
                </div>
                <div className="absolute bottom-0 w-full h-1/2 rounded-[50px] gradient1" />
                <div className="boards-info projects-name shadow2 flex">
                    {title}
                </div>
            </div>
        </>
    );
};

const CreateBoard = ({ GetTeamProjects, get_respond, DeleteTeamProjects, delete_respond, create_respond }) => {
    useEffect(() => {
        GetTeamProjects();
    }, [GetTeamProjects, delete_respond, create_respond]);



    return (
        <Layout shortheader={true} isbodyWhite={true}>
            <UploadFilesTeam />
            <section className="mt-3 mb-12">
                <div className="container mb-7">
                    <div className="flex gap-6 alignCenter mb-7 items-center">
                        <h1 className="text-2xl opacity-80 font-semibold capitalize whitespace-nowrap">Team Projects</h1>
                        <div
                            data-popup-toggle="popup" data-popup-target="team_uploading_files"
                            className="flex gap-5 items-center py-[21px] px-[35px] rounded-full bg-primary text-white text-center text-lg font-semibold cursor-pointer capitalize whitespace-nowrap">
                            New Project
                            <Icon className="w-4 text-white" name="plus" />
                        </div>
                    </div>
                    {get_respond?.data?.length > 0 ? (
                        <div className="boards-grid">
                            {get_respond.data.map((feature, index) => (
                                <Card key={index} data={feature} DeleteTeamProjects={DeleteTeamProjects} />
                            ))}
                        </div>
                    ) : (
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


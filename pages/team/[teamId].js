import Icon from "../../components/Icons";
import Layout from "../../components/layout/Layout";
import Selector from "../../components/elements/CustomSelector";
import React, { useEffect, useState } from 'react';
import ArrowBtn from '../../components/elements/arrowBtn';
import Filter from "../../components/elements/filter";
import { convertToK } from '../../util/util';
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { GetTeamProject } from "../../redux/action/apis/teamproject/getone";
import UsersToAdd from "../../components/layout/team/usersToAdd";
import { UpdateTeamProject } from "../../redux/action/apis/teamproject/update";


const TheTeam = ({ GetTeamProject, respond, UpdateTeamProject, update_respond }) => {
    const [state, setState] = useState(1);
    const router = useRouter();
    const { teamId } = router.query;

    useEffect(() => {
        if (teamId) {
            GetTeamProject({ id: teamId });
        }
    }, [teamId, update_respond]);

    const updateTeamProject = (data) => {
        UpdateTeamProject(data, teamId)
    }

    return (
        <Layout shortheader={true}>
            <section className="container">
                {state === 0 && <Empty />}
                {state === 1 && (
                    <div className="flex flex-col lg:flex-row gap-7 items-center">
                        <LeftSide respond={respond} onAddOne={(v) => updateTeamProject(v)} />
                        <RightSide onClick={() => setState(2)} />
                    </div>
                )}
                {state === 2 && (
                    <div className="flex flex-col lg:flex-row gap-7">
                        <Cover />
                        <LeftSide isSolid={true} respond={respond} />
                        <RightSide isSolid={true} />
                    </div>
                )}
            </section>
        </Layout>
    );
};
const Person = ({ person }) => (
    <div className='flex gap-4 h-12 min-w-[300px]'>
        <img className='rounded-full h-full aspect-square' src={person.user.profileImage} alt='profile img' />
        <div className='w-full flex flex-col justify-center'>
            <span className='text-DS_black text-[15px] opacity-80 font-semibold'>{person.user.name || person.user.username}</span>
            <span className='text-DS_black text-[13px] opacity-50'>{person.totalAmount}</span>
        </div>
        <div className={`flex rounded-full justify-center items-center gap-2 border border-primary p-4 ${person.enableMessage ? 'cursor-pointer' : 'grayscale opacity-20'}`}>
            <span className='hidden sm:block text-primary text-sm font-semibold capitalize'>message</span>
            <div className='size-5'>
                <Icon name={'chat'} />
            </div>
        </div>
        {person.status == 'pending' && <Icon name="waiting" className="size-12" />}
        {person.status == 'refuse' && <Icon name="circle-exclamation" className="rounded-full border border-[#D72828] text-[#D72828] p-3 size-6" />}
        {person.status == 'available' && (
            <Selector
                options={[
                    { value: "option 1", onClick: () => { } },
                    { value: "option 2", onClick: () => { } },
                    { value: "option 3", onClick: () => { } }
                ]}
                className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF40] flex justify-center items-center size-12 cursor-pointer"
            />
        )}
    </div>
);

const Sections = ({ section, AddTeam, isSolid }) => (
    <>
        <div className="flex justify-between my-3">
            <span className="opacity-60 capitalize font-medium">
                {section.jobTitle}
            </span>
            {!isSolid && (
                <div className="flex gap-2 cursor-pointer items-center">
                    <Icon className="text-[#FF4646]" name="xmark" />
                    <span className="text-[#FF4646]">Remove</span>
                </div>
            )}
        </div>
        <div className="w-full h-[1px] bg-black opacity-15" />
        <div className='flex flex-col gap-5 my-5 max-h-[600px] overflow-y-scroll'>
            {section?.users?.map((person, index) => (
                <Person key={index} person={person} />
            ))}
            {!isSolid && <AddCreative onClick={AddTeam} />}
        </div>
    </>
);

const LeftSide = ({ isSolid, respond, onAddOne }) => {
    const [isAddToTeamPage, setIsAddToTeamPage] = useState(false);
    const [categoryId, setCategoryId] = useState();

    const togglePage = (value) => {
        console.log(value, data)
        if (typeof (value) == 'string')
            setCategoryId(value)
        else
            onAddOne?.({ ...value, category: categoryId, totalAmount: 20 })

        setIsAddToTeamPage(!isAddToTeamPage);
    };

    const data = respond?.data?.creatives || [];

    return (
        <div className="h-body w-full overflow-y-scroll pt-14">
            {!isAddToTeamPage ? (
                <>
                    <h1 className="page-header mb-8">Team Project</h1>
                    <Cover respond={respond} />
                    {data.map((section, index) => (
                        <div key={index}>
                            <Sections isSolid={isSolid} AddTeam={() => togglePage(section._id)} section={section} />
                            {index !== data.length - 1 && <div className="bg-[#00000033] dark:bg-[#FFFFFF33] h-1 w-full"></div>}
                        </div>
                    ))}
                </>
            ) : (
                <UsersToAdd goback={togglePage} />
            )}
        </div>
    );
};

const RightSide = ({ isSolid, onClick }) => (
    <div className="w-full max-w-[483px] h-body py-10">
        <div className="flex gap-7 bg-DS_white w-full h-full border rounded-2xl border-[#CFCFCF] dark:border-[#3D3D3D] relative">
            <div className="p-12">
                <h2 className="opacity-80 text-2xl font-semibold capitalize">Project Details</h2>
            </div>
            {!isSolid && (
                <div className="border-t absolute flex flex-col gap-4 bottom-0 w-full h-48 p-6 items-center">
                    <div className="flex justify-between w-full">
                        <span className="font-bold">Total Amount</span>
                        <span className="font-bold">$0.0</span>
                    </div>
                    <ArrowBtn onClick={onClick} className="cursor-pointer w-full sm:w-[388px]" text='Check-Out' isEnable={false} IconName="check" />
                </div>
            )}
        </div>
    </div>
);

const Cover = ({ respond }) => (
    <div className="relative h-20 w-full rounded-full overflow-hidden flex justify-center items-center mb-8">
            <div className="absolute inset-0 blur-sm" style={{ backgroundImage: `url(${respond?.data?.cover})`}}></div>
            <span className="absolute text-lg font-semibold text-white">
                {respond?.data?.title}
            </span>
    
    </div>
);

const AddCreative = ({ onClick }) => (
    <div onClick={onClick} className="flex items-center rounded-full border border-primary p-1 w-min cursor-pointer">
        <div className="size-11 flex items-center justify-center border rounded-full border-primary">
            <Icon className="text-xl text-primary" name='plus' />
        </div>
        <div className="text-center text-primary font-semibold mx-4 capitalize whitespace-nowrap">
            add creative
        </div>
    </div>
);

const Empty = () => (
    <div className="h-body flex flex-col justify-center">
        <div className='container flex flex-col justify-center items-center text-center w-full'>
            <img src='/assets/imgs/theme/TeamProjects.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' alt="Team Projects" />
            <h3 className='text-[40px] font-semibold mt-8 mb-4'>
                Team Projects
                <p className="text-2xl opacity-50">
                    “Team Projects” are a great way to build teams for your project.
                </p>
            </h3>
        </div>
    </div>
);


const mapStateToProps = (state) => ({
    respond: state.api.GetTeamProject,
    update_respond: state.api.UpdateTeamProject,

});

const mapDispatchToProps = {
    GetTeamProject,
    UpdateTeamProject
};
export default connect(mapStateToProps, mapDispatchToProps)(TheTeam);



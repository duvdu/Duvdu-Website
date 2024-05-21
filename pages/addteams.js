import Icon from "../components/Icons";
import Layout from "../components/layout/Layout";
import Selector from "../components/elements/CustomSelector";
import React, { useEffect, useState } from 'react';
import ArrowBtn from '../components/elements/arrowBtn';
import { UpdateKeysAndValues, convertToK } from '../util/util';
import { connect } from "react-redux";
import UsersToAdd from "../components/layout/team/usersToAdd";
import { CreateTeamProject } from "../redux/action/apis/teamproject/create";


const AddToTeam = ({ CreateTeamProject, create_respond, categories, addprojectState }) => {
    const formData = addprojectState?.formData
    const [state, setState] = useState(1);
    const [creatives, setCreatives] = useState({
        creatives: [],
    });
    console.log(formData)
    useEffect(() => {
        console.log(create_respond)
    }, [creatives])
    useEffect(() => {
        const updatedCreatives = formData?.category?.map(categoryId => {
            const category = categories.find(cat => cat._id === categoryId);
            return {
                category: category ? category.title : "Unknown Category",
                categoryId: categoryId,
                users: [],
            };
        });

        setCreatives({ creatives: updatedCreatives });
    }, []);
    const updateCreativesWithUserData = (data) => {
        const newUser = {
            category: data.category,
            workHours: data.workHours,
            totalAmount: data.totalAmount,
            categoryId: data.categoryId,
            ...data.user,
        };

        setCreatives((prevState) => {
            const updatedCreatives = prevState.creatives.map((creative) => {
                if (creative.category === newUser.category) {
                    return {
                        ...creative,
                        users: [...creative.users, newUser],
                    };
                }
                return creative;
            });

            // If the jobTitle doesn't exist, add a new category
            if (!updatedCreatives.some((creative) => creative.category === newUser.category)) {
                updatedCreatives.push({
                    category: newUser.category,
                    users: [newUser],
                });
            }

            return { creatives: updatedCreatives };
        });
    };

    const removeUser = (userId) => {
        setCreatives((prevState) => {
            const updatedCreatives = prevState.creatives.map((creative) => {
                return {
                    ...creative,
                    users: creative.users.filter((user) => user._id !== userId),
                };
            }).filter(creative => creative.users.length > 0); // Remove categories with no users

            return { creatives: updatedCreatives };
        });
    };


    const updateTeamProject = (data) => {
        updateCreativesWithUserData(data)
    }
    const onsubmit = () => {
        const form = new FormData()

        creatives.creatives.forEach((creative, index) => {
            const categoryKey = `creatives[${index}][category]`;
            const categoryValue = creative.categoryId;
            form.append(categoryKey, categoryValue);
            creative.users.forEach((user, userIndex) => {
                const userKeyPrefix = `creatives[${index}][users][${userIndex}]`;
                form.append(`${userKeyPrefix}[user]`, user._id);
                form.append(`${userKeyPrefix}[totalAmount]`, user.totalAmount);
                form.append(`${userKeyPrefix}[workHours]`, user.workHours);
            });
        });

if (formData?._attachments) {
    formData._attachments.forEach((attachment, index) => {
        form.append(`attachments`, attachment.file);
    });
}

        form.append('cover', formData?.cover)
        UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['receiver', '_attachments', 'attachments', 'category', 'jobTitle'])
        CreateTeamProject(form)

        // Printing FormData for demonstration
        for (const pair of form.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        // UpdateFormData('attachments', formData?.attachment?.map((e)=> e.file))
        // const form = new FormData()
        // UpdateKeysAndValues(formData, (key, value) => form.append(key, value), ['receiver'])
    }
    const LeftSide = ({ isSolid, respond, onAddOne }) => {
        const [isAddToTeamPage, setIsAddToTeamPage] = useState(false);
        const [categoryId, setCategoryId] = useState();

        const togglePage = (value) => {

            if (typeof (value) == 'string')
                setCategoryId(value)
            else
                onAddOne?.({ ...value, category: categoryId })

            setIsAddToTeamPage(!isAddToTeamPage);
        };

        const data = respond?.creatives || [];

        return (
            <div className="h-body w-full overflow-y-scroll pt-14">
                {!isAddToTeamPage ? (
                    <>
                        <h1 className="page-header mb-8">Team Project</h1>
                        <Cover respond={respond} />
                        {data.map((section, index) => (
                            <div key={index}>
                                <Sections isSolid={isSolid} AddTeam={() => togglePage(section.category)} section={section} />
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

    const Sections = ({ section, AddTeam, isSolid }) => (
        <>
            <div className="flex justify-between my-3">
                <span className="opacity-60 capitalize font-medium">
                    {section.category}
                </span>
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

    const Person = ({ person }) => {
        return (
            <div className='flex gap-4 h-12 min-w-[300px]'>
                <img className='rounded-full h-full aspect-square' src={person.profileImage} alt='profile img' />
                <div className='w-full flex flex-col justify-center'>
                    <span className='text-DS_black text-[15px] opacity-80 font-semibold'>{person.name || person.username}</span>
                    <span className='text-DS_black text-[13px] opacity-50'>{person.totalAmount}</span>
                </div>
                <div className={`flex rounded-full justify-center items-center gap-2 border border-primary p-4 ${person.enableMessage ? 'cursor-pointer' : 'grayscale opacity-20'}`}>
                    <span className='hidden sm:block text-primary text-sm font-semibold capitalize'>message</span>
                    <div className='size-5'>
                        <Icon name={'chat'} />
                    </div>
                </div>
                <Selector options={[
                    {
                        value: "delete",
                    },
                ]} onSelect={() => removeUser(person._id)} />
                {person.status == 'refuse' && <Selector options={options} onSelect={() => removeUser(person._id)}> <div className="w-14">  <Icon name="circle-exclamation" className="rounded-full border border-[#D72828] text-[#D72828] p-3 h-full" /> </div> </Selector>}
                {person.status == 'available' && <Selector options={options} onSelect={() => removeUser(person._id)} ><div className="w-14"> <Icon className="text-[#50C878] rounded-full border border-[#50C878] p-3 h-full" name="circle-check" /> </div></Selector>}
            </div>
        );
    }

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
                        <ArrowBtn onClick={onClick} className="cursor-pointer w-full sm:w-[388px]" text='create Team' IconName="check" />
                    </div>
                )}
            </div>
        </div>
    );

    const Cover = ({ respond }) => (
        <div className="relative h-20 w-full rounded-full overflow-hidden flex justify-center items-center mb-8">
            <div className="absolute inset-0 blur-sm" style={{ backgroundImage: `url(${respond?.cover})` }}></div>
            <span className="absolute text-lg font-semibold text-white">
                {respond?.title}
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
    return (
        <Layout shortheader={true}>

            <section className="container">

                <div className="flex flex-col lg:flex-row gap-7 items-center">
                    <LeftSide respond={creatives} onAddOne={(v) => updateTeamProject(v)} />
                    <RightSide onClick={onsubmit} />
                </div>

            </section>
        </Layout>
    );
};


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
    create_respond: state.api.CreateTeamProject,
    addprojectState: state.addproject,
    categories: state.categories,

});

const mapDispatchToProps = {
    CreateTeamProject,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddToTeam);



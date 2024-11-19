import Icon from "../../components/Icons";
import Layout from "../../components/layout/Layout";
import DuvduLoading from '../../components/elements/duvduLoading';
import Loading from '../../components/elements/loading';

import Selector from "../../components/elements/CustomSelector";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { GetTeamProject } from "../../redux/action/apis/teamproject/getone";
import UsersToAdd from "../../components/layout/team/usersToAdd";
import DeleteCategory from "../../components/popsup/deleteCategory";
import CategorySelectOne from '../../components/elements/CategorySelectOne';
import { GetAllMessageInChat } from "../../redux/action/apis/realTime/messages/getAllMessageInChat";
import { DeleteTeamProjects } from "../../redux/action/apis/teamproject/deleteProject";
import { AddTeamProject } from "../../redux/action/apis/teamproject/addCreative";
import { AddNewCategoryTeam } from "../../redux/action/apis/teamproject/addNewCategory";
import { DeleteCategoryTeam } from "../../redux/action/apis/teamproject/deleteCategory";
import { UpdateTeamUser } from "../../redux/action/apis/teamproject/updatecreative";
import DeleteTeam from "../../components/popsup/deleteTeam";

import { ClosePopUp, OpenPopUp } from "../../util/util";
import { useTranslation } from 'react-i18next';
import Link from "next/link";

import Popup from "../../components/elements/popup";
import AppButton from "../../components/elements/button";
import dateFormat from "dateformat";

const TheTeam = ({
    GetTeamProject,
    get_respond,
    AddTeamProject,
    add_creative,
    DeleteTeamProjects,
    delete_respond,
    UpdateTeamUser,
    update_respond,
    GetAllMessageInChat,
    AddNewCategoryTeam,
    add_category_respond,
    DeleteCategoryTeam,
    delete_category_respond,
    isLogin

}) => {
    const { t } = useTranslation();
    const [state, setState] = useState(1);
    const router = useRouter();
    const { teamId } = router.query;
    useEffect(() => {
        if (teamId) {
            GetTeamProject({ id: teamId });
        }
    }, [teamId, add_creative, delete_respond, update_respond , add_category_respond , delete_category_respond]);
    const updateTeamProject = (data) => {
        AddTeamProject(data, teamId);
    }
    const handleUpdate = (alldata) => {
        
        UpdateTeamUser(alldata, teamId)
    }
    const handleOpenChat = (PersonId) => {
        GetAllMessageInChat(PersonId);
    };
    const onDeleteTeam = () => {
        DeleteTeamProjects(teamId)
    }

    const addNewCategory = (categoryId)=>{
        AddNewCategoryTeam({teamId , categoryId})
        if(add_category_respond?.data)
            ClosePopUp('AddCategoryToTeam')
    }
    const deleteCategory = (categoryId)=>{
        DeleteCategoryTeam({teamId , categoryId})
    }
    useEffect(()=>{
        if(isLogin ===false)
            router.push('/')
    },[isLogin])

    return (
        <Layout shortheader={true}>
            <section className="container">
                {state === 0 && <Empty />}
                {state === 1 && (
                    <div className="flex flex-col lg:flex-row gap-7 items-center">
                        <LeftSide add_category_respond={add_category_respond} deleteCategory={deleteCategory} addNewCategory={addNewCategory} handleOpenChat={handleOpenChat} respond={get_respond} onAddOne={(v) => updateTeamProject(v)} handleUpdate={handleUpdate} />
                        <RightSide onDeleteTeam={onDeleteTeam} data={get_respond?.data || {}} respond={get_respond} onClick={() => setState(1)} teamId={teamId} />
                    </div>
                )}
                {state === 2 && (
                    <div className="flex flex-col lg:flex-row gap-7">
                        <Cover />
                        <LeftSide add_category_respond={add_category_respond} deleteCategory={deleteCategory} addNewCategory={addNewCategory} handleOpenChat={handleOpenChat} isSolid={true} respond={get_respond} handleUpdate={handleUpdate} />
                        <RightSide onDeleteTeam={onDeleteTeam} data={get_respond?.data || {}} respond={get_respond} isSolid={true} teamId={teamId}/>
                    </div>
                )}
            </section>
        </Layout>
    );
};



const LeftSide = ({isSolid, respond, onAddOne, handleDelete, handleUpdate  , handleOpenChat , addNewCategory , add_category_respond , deleteCategory}) => {
    const { t } = useTranslation();

    const [isAddToTeamPage, setIsAddToTeamPage] = useState(false);
    const [categoryId, setCategoryId] = useState();
    const [lang, setLang] = useState(false);

    const togglePage = (value) => {

        if (typeof (value) == 'string')
            setCategoryId(value)
        else{
            value.append('category',categoryId )
            onAddOne?.(value)
        }
        setIsAddToTeamPage(!isAddToTeamPage);
    };

    const data = respond?.data?.creatives || [];
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLang = localStorage.getItem('lang');
            setLang(storedLang ? storedLang === 'Arabic' : false);
        }
    }, []);
    const [hours, setHours] = useState();
    const [newCategoryId, setNewCategoryId] = useState();

    const onCancel = () => {
        setHours("")
        setHours("")
    }

    return (respond &&
        <div className="md:h-body w-full overflow-y-scroll py-14 addUserScroll">
            {respond?.loading?<DuvduLoading loadingIn={""} type={'teamProject'}/>:(
            !isAddToTeamPage ? (
                <>
                    <h1 className="page-header mb-8">{t("Team Project")}</h1>
                    <Cover respond={respond} />
                    {data.map((section, index) => (
                        <div key={index}>
                            <Sections deleteCategory={deleteCategory} isSolid={isSolid} AddTeam={()=> togglePage(section.category._id)} section={section} handleUpdate={(v) => { handleUpdate({ ...v, craetiveScope: section._id }) }} handleOpenChat={handleOpenChat} />
                            <div className="bg-[#00000033] dark:bg-[#FFFFFF33] h-1 w-full"></div>
                        </div>
                    ))}
                    
                    <AddCategory onClick={()=> OpenPopUp(`AddCategoryToTeam`)} />
                     <Popup id={"AddCategoryToTeam"} header={'Add New Category'} onCancel={onCancel}>
                            <div className='flex gap-9 max-w-72 h-full justify-center items-center flex-col mt-10'>                            
                                <CategorySelectOne value={data.map(item=> item.category._id)} onChange={(v) => { setNewCategoryId(v) }} />
                                <AppButton  onClick={() => addNewCategory(newCategoryId )} className={" mt-10 mx-16 px-20 sm:px-40"} >
                                    {add_category_respond?.loading ? <Loading/>:'Confirm'}
                                </AppButton>
                            </div>
                        </Popup>

                </>
            ) : (
                <>
                    <div className='w-10 h-10 flex justify-center items-center rounded-full border px-4 cursor-pointer aspect-square' onClick={()=> setIsAddToTeamPage(!isAddToTeamPage)}>
                        {lang?<Icon className='w-5 text-black dark:text-white' name={'angle-right'} />:
                        <Icon className='w-5 h-5 text-black dark:text-white' name={'angle-left'} />}
                    </div>
                    <UsersToAdd goback={togglePage} categoryId={categoryId} />
                </>
            ))}
        </div>
    );
};

const Sections = ({ section, AddTeam, isSolid, handleDelete, handleUpdate ,handleOpenChat , deleteCategory}) => {
    const { t } = useTranslation();
    return (
    <>
        <DeleteCategory onClick={()=> deleteCategory(section?.category?._id)} id={section?.category?._id} />
        <div className="flex justify-between items-center m-[10px]">
            <span className="opacity-60 capitalize font-medium">
                {section?.category?.title}
            </span>
            {section?.users.length ===0 && (
                <div className="flex gap-2 cursor-pointer items-center">
                    <Icon className="text-[#FF4646] w-4 h-4" name="xmark" />
                    <span className="text-[#FF4646] font-medium" onClick={()=> OpenPopUp('delete-category-team-' + section?.category?._id)}>{t("Remove")}</span>
                </div>
            )}
        </div>
        <div className="w-full h-[1px] bg-black opacity-15" />
        <div className='flex flex-col gap-5 my-5 max-h-[600px] overflow-y-scroll'>
            {section?.users?.map((person, index) => (
                <Person key={index} person={person} onUpdate={handleUpdate} handleOpenChat={handleOpenChat}  />
            ))}
            {!isSolid && <AddCreative onClick={AddTeam} />}
        </div>
    </>
)};

const Person = ({ person, onUpdate,handleOpenChat }) => {
    const { t } = useTranslation();

    const [hours, setHours] = useState();
    const [amount, setAmount] = useState();

    const onCancel = () => {
        setHours("")
        setHours("")
    }
    const onupdate = () => {
        onUpdate({ user: person.user._id, workHours: hours, totalAmount: amount })
        ClosePopUp(`Edit-creative-${person._id}`)
    }
    const options = [
        { value: 'Delete' },
        { value: 'Edit' },
    ];

    // const handleDropdownSelect = (v) => {
    //     v == "delete" ? onDelete(person._id) : OpenPopUp(`Edit-creative-${person._id}`)
    // };

    return (
        <>
            <Popup id={"Edit-creative-" + person._id} header={'Work Details'} onCancel={onCancel}>
                <div className='flex gap-9 h-full justify-center items-center flex-col mt-24'>
                    <div className='flex items-center gap-9 w-64'>
                        <input type="number" min={0} defaultValue={person.workHours} onChange={(e) => setHours(Math.abs(e.target.value))} placeholder={t("Ex. 5")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                        <span className="text-xl opacity-50">{t("hours")}</span>
                    </div>
                    <div className='flex items-center gap-9 w-64'>
                        <input type="number" min={0} defaultValue={person.totalAmount} onChange={(e) =>  setAmount(Math.abs(e.target.value))} placeholder={t("Ex. 10$")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                        <span className="text-xl opacity-50">{t("amount")}</span>
                    </div>
                    <AppButton  onClick={(e) => onupdate()} className={"mb-20 mt-10 mx-16 px-20 sm:px-40"} >
                        Confirm
                    </AppButton>
                </div>
            </Popup>
            <div className='flex justify-between gap-4 h-12 min-w-[300px]'>
                <Link href={`/contracts?contract=${person.contract}`} >
                    <div className='flex gap-4 cursor-pointer'>
                        <img className='rounded-full h-full aspect-square object-cover object-top' src={person.user.profileImage} alt='profile img' />
                        <div className='w-full flex flex-col justify-center'>
                            <span className='text-DS_black text-[15px] opacity-80 font-semibold'>{person.user.name?.split(' ')[0].length>6?person.user.name?.split(' ')[0].slice(0,6):person.user.name?.split(' ')[0] || person.user.username}</span>
                            <span className='text-DS_black text-[13px] font-bold opacity-50'>${person.totalAmount}</span>
                        </div>
                    </div>
                </Link>
                    
                <button onClick={()=>handleOpenChat(person.user._id)} className={`flex relative rounded-full justify-center items-center gap-2 border border-primary p-4`}>
                    <span className='hidden sm:block text-primary text-sm font-semibold capitalize'>{t("message")}</span>
                    <div className='size-5'>
                        <Icon className='text-primary' color="#1A73EB" name={'chat24'} />
                    </div>
                </button> 
                {/* {person.status == 'pending' && <Selector options={options} onSelect={handleDropdownSelect}> <Icon name="waiting" className="size-12" /> </Selector>}
                {person.status == 'refuse' && <div className="w-14">  <Icon name="circle-exclamation" className="rounded-full border border-[#D72828] text-[#D72828] p-3 h-full" /> </div>}
                {person.status == 'available' && <div className="w-14"> <Icon className="text-[#50C878] rounded-full border border-[#50C878] p-3 h-full" name="circle-check" /> </div>} */}
            </div>
        </>
    )
};

const RightSide = ({ isSolid, data, onClick , respond  ,onDeleteTeam , teamId }) => {
    const { t } = useTranslation();
    const length = data?.creatives?.map(item=> item.users.length)
    const sum = length?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return respond &&<>
    <DeleteTeam onClick={()=> onDeleteTeam()} id={teamId} />
     <div className="w-full max-w-[483px] md:h-body md:py-10 mb-4 md:mb-0">
        <div className="flex flex-col justify-between gap-7 bg-white dark:bg-[#1A2024] w-full h-full border rounded-2xl border-[#CFCFCF] dark:border-[#3D3D3D] relative">
            <div className="p-12 w-full flex flex-col h-full overflow-y-scroll">
            {respond?.loading?<DuvduLoading loadingIn={""} type={'contractDetails'}/>:
            <>
                <h2 className="opacity-80 text-2xl font-semibold capitalize">{t("Team Details")}</h2>
                <div className="w-full flex flex-col gap-5 h-full mt-6">
                    <section>
                        <h3 className="opacity-60 capitalize text-base">{t("Team Name")}</h3>
                        <span className="font-bold capitalize">
                            {data.title}
                        </span>
                    </section>
                    <section>
                        <h3 className="opacity-60 capitalize text-base">{t("Team details")}</h3>
                        <span className="font-bold">
                            {data.desc}
                        </span>
                    </section>
                    {/* <section>
                        <h3 className="opacity-60 capitalize mb-4">{t("shooting days")}</h3>
                        <span className="font-semibold">
                            {data.shootingDays} days
                        </span>
                    </section> */}
                    <section>
                    <h3 className="opacity-60 capitalize text-base">{t("Team Create At")}</h3>
                    <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 cursor-pointer">
                        <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] dark:border-[#1A2024] border-8 aspect-square">
                            <Icon className='' name={"calendar"} />
                        </div>
                        <div className="flex flex-col ps-5 w-full">
                            <span className="font-normal text-base">{dateFormat(data.createdAt, 'd mmmm , yyyy')}</span>
                            <span className="text-[#747688] text-xs">{dateFormat(data.createdAt, 'dddd , h:mm TT')}</span>
                        </div>
                    </div>
                    </section>
                    <section>
                    <h3 className="opacity-60 capitalize text-base">{t("Project Location")}</h3>
                    <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 cursor-pointer">
                        <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] dark:border-[#1A2024] border-8 aspect-square">
                            <Icon className='text-primary w-4' name={"location-dot"} />
                        </div>
                        <div className="flex flex-col ps-5 w-full">
                            <span className="font-normal text-base">{data.address}</span>
                            {/* <span className="text-[#747688] text-xs">{t("36 Guild Street London, UK")}</span> */}
                        </div>
                    </div>
                    </section>
                    {sum===0 &&<section>
                        <button className="rounded-full border-2 border-solid border-[#EB1A40] w-full w-full h-[66px] text-[#EB1A40] text-lg font-bold mt-2" onClick={()=>OpenPopUp('delete-team-' + teamId)}>
                            {t("Delete")}
                        </button>

                    </section>}
                    {/* <div className="flex items-center rounded-2xl bg-white dark:bg-[#1A2024] h-16 sm:w-96 p-2 cursor-pointer">
                        <div className="flex items-center justify-center h-full rounded-xl bg-[#1A73EB26] border-8 aspect-square">
                            <Icon className='text-primary w-4' name={"image"} />
                        </div>
                        <div className="flex flex-col pl-5 w-full">
                            <span className="font-normal text-base">{t("alike media")}</span>
                            <span className="text-[#747688] text-xs">{data.attachments?.length} files</span>
                        </div>
                    </div> */}
                </div>
                </>
                }
            </div>
            {!isSolid && false && (
                <div className="border-t flex flex-col gap-4 bottom-0 w-full h-20 p-6 items-center">
                    <div className="flex justify-between w-full">
                        <span className="font-bold">{t("Total Amount")}</span>
                        <span className="font-bold">$0.0</span>
                    </div>
                    {/* <ArrowBtn onClick={onClick} className="cursor-pointer w-full sm:w-[388px]" text='Check-Out' isEnable={false} IconName="check" /> */}
                </div>
            )}
        </div>
    </div>
    </>
};

const Cover = ({ respond }) => (
    <div className="relative h-20 w-full rounded-full overflow-hidden flex justify-center items-center mb-8">
        <div className="absolute inset-0 blur-sm" style={{ backgroundImage: `url(${respond?.data?.cover})` }}></div>
        <span className="absolute text-lg font-semibold text-white">
            {respond?.data?.title}
        </span>
    </div>
);

const AddCreative = ({ onClick }) => {
    const { t } = useTranslation();

    return (
    <div onClick={onClick} className="flex items-center rounded-full border border-primary p-1 w-min cursor-pointer">
        <div className="size-11 flex items-center justify-center border rounded-full border-primary">
            <Icon className="text-xl text-primary" name='plus' />
        </div>
        <div className="text-center text-primary font-semibold mx-4 capitalize whitespace-nowrap">{t("add creative")}</div>
    </div>
)};

const AddCategory = ({ onClick }) => {
    const { t } = useTranslation();

    return (
    <div onClick={onClick} className="flex items-center rounded-full border border-primary p-1 mt-6 w-min cursor-pointer">
        <div className="size-11 flex items-center justify-center border rounded-full border-primary">
            <Icon className="text-xl text-primary" name='plus' />
        </div>
        <div className="text-center text-primary font-semibold mx-4 capitalize whitespace-nowrap">{t("add new category")}</div>
    </div>
)};

const Empty = () => {
    const { t } = useTranslation();
    return (
    <div className="h-body flex flex-col justify-center">
        <div className='container flex flex-col justify-center items-center text-center w-full'>
            <img src='/assets/imgs/theme/TeamProjects.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' alt="Team Projects" />
            <h3 className='text-[40px] font-semibold mt-8 mb-4'>{t("Team Projects")}<p className="text-2xl opacity-50">
                    “Team Projects” are a great way to build teams for your project.
                </p>
            </h3>
        </div>
    </div>
)};


const mapStateToProps = (state) => ({
    get_respond: state.api.GetTeamProject,
    add_creative: state.api.AddTeamProject,
    delete_respond: state.api.DeleteTeamProjects,
    update_respond: state.api.UpdateTeamUser,
    add_category_respond:state.api.AddNewCategoryTeam,
    delete_category_respond:state.api.DeleteCategoryTeam,
    isLogin: state.auth.login,  
});

const mapDispatchToProps = {
    GetTeamProject,
    AddTeamProject,
    DeleteTeamProjects,
    UpdateTeamUser,
    GetAllMessageInChat,
    AddNewCategoryTeam,
    DeleteCategoryTeam
};
export default connect(mapStateToProps, mapDispatchToProps)(TheTeam);



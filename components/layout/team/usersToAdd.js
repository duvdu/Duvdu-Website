import Icon from "../../../components/Icons";
import React, { useEffect, useState } from 'react';
import Filter from "../../../components/elements/filter";
import { convertToK } from '../../../util/util';
import { connect } from "react-redux";
import { GetTeamProject } from "../../../redux/action/apis/teamproject/getone";
import { FindUser } from "../../../redux/action/apis/auth/profile/FindUser";
import Popup from "../../elements/popup";
import AppButton from "../../elements/button";

const AddToTeamCard = ({ info, goback, onChoose, ...rest }) => {
    return (
        <div className="bg-DS_white border dark:border-[#FFFFFF33] rounded-[45px] overflow-hidden" {...rest}>
            <div className="flex w-full overflow-hidden h-32">
                <img className="w-full" src={info.cover || process.env.DEFULT_COVER_PATH} alt={`Profile Image`} />
            </div>
            <div className='p-5'>
                <div className='flex items-start gap-4 -translate-y-4 h-11'>
                    <div className='w-[85px] h-[85px] bg-cover relative bg-no-repeat'>
                        <img className='w-full h-full rounded-full border-2 shadow -translate-y-8' src={info.profileImage || process.env.DEFULT_PROFILE_PATH} alt="profile picture" />
                    </div>
                    <div className='flex-2 flex-col gap-1'>
                        <span className='text-2xl font-bold capitalize'>{info.name}</span>
                        {info.location && (
                            <span className='flex items-center gap-2 opacity-40'>
                                <div className='w-3'>
                                    {/* Assuming Icon is a component that renders an icon */}
                                    <Icon name="location-dot" />
                                </div>
                                <span className="location">{info.location}</span>
                            </span>
                        )}
                    </div>
                </div>
                <div className='flex justify-center pt-25 items-center gap-3'>
                    <div className='Professional-background-decoration px-2 py-1'>
                        <span className='Professional-text-decoration font-bold text-lg'>{info.rank || "professional"}</span>
                    </div>
                    <span className='flex border rounded-full px-2 py-1 gap-1 text-lg'>
                        <span>{info.occupation || "photographer"}</span>
                    </span>
                    <div className='border rounded-full px-2 py-1 text-lg flex items-center gap-1'>
                        <span>{info.value || 3.7}</span>
                        <div className='w-5'>
                            <Icon className='text-primary' name={'rate-star'} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center pt-7 items-center'>
                    <div className='flex justify-center'>
                        {Object.entries({
                            "likes": 28000,
                            "followers": 514,
                            "views": 258000
                        },).map(([key, value]) => (
                            <div className='popularity mr-9 pr-9 last:mr-0 last:pr-0' key={key}>
                                <p className='number'>{convertToK(value, 0)}</p>
                                <p className='unit'>{key}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3 mt-6 justify-center items-center">

                    <span className="text-5xl">${info?.pricePerHour || 0}<span className="text-2xl opacity-50">/hr</span></span>

                    <div onClick={onChoose} className="flex items-center justify-center capitalize w-full rounded-full text-center border-2 border-primary cursor-pointer">
                        <span className="text-primary font-bold text-lg my-5">add to team</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AddToTeamPage = ({ goback, FindUser, respond }) => {
    const [id, setId] = useState(null);
    const [user, setuser] = useState(null);
    const [hours, setHours] = useState(null);

    useEffect(() => {
        FindUser()
    }, [])

    const openpopUp = (value) => {
        setId(value._id)
        setuser(value)
        const popup = document.querySelector('.ADD_HOURS_TO_CREATIVE');
        if (popup) {
            popup.classList.add('show');
        }
    }
    const onadd = (value) => {
        setHours(value)
        const popup = document.querySelector('.ADD_HOURS_TO_CREATIVE');
        if (popup) {
            popup.classList.remove('show');
        }
        goback({user:id,workHours:hours,user:user})
    }

    return (
        <>
            <Filter />
            <Popup className="ADD_HOURS_TO_CREATIVE" header={'work hours'}>
                <div className='flex gap-9 h-full justify-center items-center flex-col mt-24'>
                    <div className='flex items-center gap-9'>
                        <input type="number" onChange={(e) => setHours(e.target.value)} placeholder="Ex. 5" className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 w-36 p-4" />
                        <span className="text-xl opacity-50">
                            hours
                        </span>
                    </div>
                    <AppButton onClick={(e)=>onadd(e.target.value)} className={"mb-20 mt-10 mx-16 px-20 sm:px-40"} >
                        Confirm
                    </AppButton>
                </div>
            </Popup>
            <div className="grid minmax-360 gap-5 my-6">
                {respond?.data?.map((value, index) => (
                    <AddToTeamCard goback={goback} info={value} key={index} className='cursor-pointer' onChoose={()=>openpopUp(value)} />
                ))}
            </div>
        </>
    )
};

const Result = () =>
    <div className="h-body flex flex-col justify-center">
        <div className='container flex flex-col justify-center items-center text-center w-full'>
            <img src='/assets/imgs/theme/TeamProjects.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
            <h3 className='text-[40px] font-semibold mt-8 mb-4'>
                Team Projects
                <p className="text-2xl opacity-50">
                    “Team Projects” are a great way to build teams for your project.
                </p>
            </h3>
        </div>
    </div>



const mapStateToProps = (state) => ({
    respond: state.api.FindUser,

});

const mapDispatchToProps = {
    FindUser
};
export default connect(mapStateToProps, mapDispatchToProps)(AddToTeamPage);



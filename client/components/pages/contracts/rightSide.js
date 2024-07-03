import Link from "next/link";
import Icon from "../../Icons";
import Selector from "../../elements/CustomSelector";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { formattedDeadline } from "../../../util/format-date";

const RightSide = ({ getAllContracts_respond, user }) => {
    const IsImSp = () => {
        return sp?.username == user?.username
    }
    const handleStatus = (status) => {
        switch (status) {
            case 'canceled':
                return -1;
            case 'pending':
                return 0;
            case 'waiting-for-pay-10':
                return 0;
            case 'update-after-first-Payment':
                return 0;
            case 'waiting-for-total-payment':
                return 0;
            case 'ongoing':
                return 1;
            case 'completed':
                return -2;
            case 'rejected':
                return -1;
            default:
                return "Unknown";
        }
    }

    const data = getAllContracts_respond?.data?.filter(data => handleStatus(data.contract.status) < 0)

    const Title = ({ title }) => <h2 className="font-bold text-start text-lg capitalize opacity-80 mt-3">{title}</h2>

    const Recents = ({ img, name, address }) =>
        <Link href='/creative/youseff_abdulla'>
            <div className="cursor-pointer">
                <div className='h-14 w-full flex gap-1 rounded-full border border-[#00000033] dark:border-[#FFFFFF33] ' >
                    <img src={img} alt='user' className='rounded-full m-1 object-cover object-top' />
                    <div className='flex flex-col items-start justify-center w-full pr-3'>
                        <span className='opacity-80 font-semibold'> {name} </span>
                        <span className='opacity-50'> {address} </span>
                    </div>
                </div>
            </div>
        </Link>
    const MoreIcon = () => <Icon className='cursor-pointer' name={'more'} />

    const HisTory = ({ data, isCanceled }) =>{
        const Deadline = formattedDeadline(data?.contract?.deadline)
        return<>
            {/* max-w-[370px] ahmed */}
            <div className='w-full max-w-[370px] sm:max-w-none mx-auto p-6 rounded-[50px] border border-[#00000033] dark:border-[#FFFFFF33] relative' >
                {/* dropdown */}
                <div className="absolute right-6 hidden">
                    <Selector options={[
                        {
                            value: "option 1",
                            onclick: () => { },
                        },
                        {
                            value: "option 2",
                            onclick: () => { },
                        },
                        {
                            value: "option 3",
                            onclick: () => { },
                        }
                    ]}>
                        <div className="border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center size-14 cursor-pointer">
                            <Icon name={'ellipsis-vertical'} className={"size-6"} />
                        </div>
                    </Selector>
                </div>
                {/*********/}
                {/* profile */}
                <Link href={`/creative/${data.sp.username}`}>
                    <div className="cursor-pointer">
                        <div className='flex gap-3 items-center'>
                            <img className='w-14 h-14 rounded-full object-cover object-top' src={data.sp.profileImage} alt="profile picture" />
                            <div className='flex flex-col items-start justify-start'>
                                <h3 className='opacity-80 text-lg font-bold capitalize'>{data.sp.name}</h3>
                                <span className='opacity-50'>{dateFormat(data.contract.appointmentDate, 'd mmmm , yyyy')}</span>
                            </div>
                        </div>
                    </div>
                </Link>
                {/*********/}

                {/* types */}
                <div className='flex flex-wrap mt-4 gap-3'>
                    {
                        [data.contract.status, data.cycle].map((item, i) =>
                            <span key={i} className={`flex flex-col h-full border-[1.5px] ${isCanceled ? 'border-[#FF4646]' : 'border-[#000000D9] dark:border-[#FFFFFFD9]'} rounded-full px-3 py-[6px] mb-8 ${isCanceled ? 'text-[#FF4646]' : 'text-[#000000D9] dark:text-[#FFFFFFD9]'} capitalize`}>
                                {item}
                            </span>
                        )
                    }
                </div>
                {/*********/}

                {/* deadline */}
                <div className='flex gap-3 mt-9'>
                    <span className='text-[40px] flex items-center ml-3 gap-2'>
                        <span className={`text-${isCanceled ? '[#FF4646]' : 'primary'}`}>
                            <span className={`text-${isCanceled ? '[#FF4646]' : 'primary'} opacity-50`}>$</span>
                            <span className={`text-${isCanceled ? '[#FF4646]' : 'primary'}`}> {data.contract.totalPrice}</span>
                        </span>
                    </span>
                    <div className='h-auto w-[1px] bg-black opacity-15' />
                    <div className='text-start'>
                        <span className={`opacity-50 capitalize ${isCanceled ? 'text-[#FF4646]' : ''}`}>deadline</span>
                        <br />
                        <span className={`capitalize line-through opacity-60 ${isCanceled ? 'text-[#FF4646]' : ''}`}>{Deadline}</span>
                    </div>
                </div>
                {/*********/}
            </div>
        </>
    }


    return (
        <>
            {/* <Clients /> */}
            {/* ahmed */}

            <div className='h-auto lg:h-body overflow-y-scroll mx-auto min-w-max'>
                <div className='flex flex-col gap-[15px] mx-auto sm:mx-0 w-max sm:w-auto text-center mt-9'>
                    {/* <Title title="recent clients" /> */}
                    <div className='flex sm:flex-row gap-2 hidden'>
                        <Recents img='/assets/imgs/profile/defultUser.jpg' name='youseff ali' address='zayed city' />
                        <Recents img='/assets/imgs/profile/2.jpg' name='mohamed' address='new cairo' />
                        <div className='hidden sm:block lg:hidden'>
                            <Recents img='/assets/imgs/profile/2.jpg' name='mohamed' address='new cairo' />
                        </div>
                        <div data-popup-toggle="popup" data-popup-target='clients'>
                            <MoreIcon />
                        </div>
                    </div>
                    <Title title='history' />
                    {
                        data?.map((value,i) => (
                            <HisTory key={i} data={value} isCanceled={handleStatus(value.contract.status) === -1} />
                        ))
                    }
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    user: state.auth.user,
    getAllContracts_respond: state.api.getAllContracts,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(RightSide);

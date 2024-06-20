import React from 'react';
import dateFormat from "dateformat";
import { formatRemainingTime } from '../../../util/util';
import Selector from '../../elements/CustomSelector';
import { connect } from 'react-redux';
import { takeAction } from '../../../redux/action/apis/contracts/takeaction';

const Pending2 = ({ data,takeAction_respond,takeAction }) => {
    const statuses = [
        { value: 'accept' },
        { value: 'reject' },
    ];
    console.log(takeAction_respond)

    const handleDropdownSelect = (value) => {
        console.log("Selected status:", value);
        takeAction({id: data._id, data : {"action": value}})
    };

    const currentDate = new Date();
    const createdAtDate = new Date(data.contract.createdAt);
    const timeDifference = currentDate - createdAtDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let formattedCreatedAt;
    if (daysDifference === 0) {
        formattedCreatedAt = "Today";
    } else if (daysDifference === 1) {
        formattedCreatedAt = "Yesterday";
    } else if (daysDifference === 2) {
        formattedCreatedAt = "Day before yesterday";
    } else {
        formattedCreatedAt = dateFormat(createdAtDate, "M/d/yyyy");
    }

    return (
        <div className='flex justify-between w-[370px] sm:w-full mx-auto items-center border border-[#00000033] dark:border-[#FFFFFF33] rounded-[50px] p-6'>
            <div className='flex flex-col gap-2 sm:gap-0 sm:flex-row justify-center items-center sm:w-full'>
                {/* profile */}
                <div className='flex gap-3 items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.customer.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold capitalize'>
                            {data.customer.name || 'Unknown User'}
                        </h3>
                        <span className='opacity-50'>
                            {formattedCreatedAt}
                        </span>
                    </div>
                </div>
                {/*********/}
                {/* deadline */}
                <div className='text-lg ml-auto mr-auto'>
                    <span className='opacity-50 mx-1'>
                        will respond in
                    </span>
                    <span className='text-primary'>
                        {formatRemainingTime(data.remainingTime)}
                    </span>
                </div>
            </div>
            {/*********/}
            {/* dropdown */}
            <Selector 
            options={statuses} 
            onSelect={handleDropdownSelect}
            className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer" />
            {/*********/}
        </div>
    );
};

const mapStateToProps = (state) => ({
    takeAction_respond: state.api.takeAction
});

const mapDispatchToProps = {
    takeAction
};




export default connect(mapStateToProps, mapDispatchToProps)(Pending2);
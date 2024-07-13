import { connect } from "react-redux";
import Icon from "../../Icons";
import Selector from "../../elements/CustomSelector";
import { takeAction } from "../../../redux/action/apis/contracts/takeaction";
import dateFormat from "dateformat";
import { formattedCreatedAt, formattedDeadline } from './../../../util/format-date';

const Ongoing = ({ data, takeAction_respond, takeAction ,onClick}) => {
    const statuses = [
        { value: 'accept' },
        { value: 'reject' },
    ];

    const Deadline = formattedDeadline(data?.contract?.deadline)
    const CreatedAt = formattedCreatedAt(data?.contract?.createdAt)
    const handleDropdownSelect = (value) => {
        // takeAction({id: , value : })
    };
    return (
        <div onClick={onClick} className='flex justify-between rounded-[50px] bg-primary p-6 relative w-full mx-auto cursor-pointer'>
            <div className='flex flex-col gap-3 items-start justify-between w-full'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.customer.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold  text-white capitalize'>{data.customer.name}</h3>
                        <span className='opacity-50 text-white'>{CreatedAt}</span>
                    </div>
                </div>
                {/*********/}

                {/* type */}
                <span className='flex flex-col h-full text-white border-2 border-white rounded-full px-3 py-[6px] capitalize mb-8 opacity-70'>
                    {data.ref}
                </span>
                {/*********/}

                {/* deadline */}
                <div className='flex flex-col xl:flex-row justify-between items-center w-full gap-3'>
                    <div className='flex gap-3'>
                        <span className='text-[40px] flex items-center ml-3 gap-2'>  <span className='opacity-50 text-white'>$</span> <span className='text-white'>490</span> </span>
                        <div className='h-auto w-[1px] bg-white opacity-15' />
                        <div>
                            <span className='opacity-50 text-white'>deadline</span>
                            <br />
                            <span className='text-white'>{Deadline}</span>
                        </div>
                    </div>
                    {/* button */}
                    {(data.status === "submit-files" ?
                        <div className={`bg-white text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer`}>
                            submit files
                        </div>
                        :
                        <div className={`bg-white text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer`}>
                            scan QR
                        </div>
                    )}

                    {/*********/}
                </div>

                {/*********/}
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    takeAction_respond: state.api.takeAction
});

const mapDispatchToProps = {
    takeAction
};


export default connect(mapStateToProps, mapDispatchToProps)(Ongoing);
import Icon from "../../Icons";
import dateFormat from "dateformat";
import Selector from "../../elements/CustomSelector";

// const fakedata = {
//     "_id": "6664479cc9423563d0feb5b8",
//     "sourceUser": "6658a16ac47d9bb1295dd6fb",
//     "targetUser": {
//         "_id": "6658a16ac47d9bb1295dd6fb",
//         "name": "mos3ad",
//         "username": "mos3ad",
//         "profileImage": "https://duvdu-s3.s3.eu-central-1.amazonaws.com/auth/1717536748808_224f87d6b6e3.jpg",
//         "isOnline": false,
//         "projectsView": 0,
//         "rank": {
//             "nextRangPercentage": 0
//         }
//     },
//     "project": "6662608350f22811283145a2",
//     "book": "6664477ec9423563d0feb5b5",
//     "ref": "copyrights-booking",
//     "startDate": "2024-06-08T11:59:24.612Z",
//     "deadline": "2024-06-30T21:00:00.000Z",
//     "status": "pending",
//     "createdAt": "2024-06-08T11:59:24.614Z",
//     "updatedAt": "2024-06-08T11:59:24.614Z",
//     "__v": 0,
//     "remainingTime": -12902
// };

const Ongoing2 = ({ data }) => {
    
    const formattedDeadline = dateFormat(new Date(data?.contract?.createdAt), "mmmm dS, yyyy, h:MM TT");

    const currentDate = new Date();
    const createdAtDate = new Date(data?.contract?.createdAt);
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
        <div className='w-[370px] sm:w-full mx-auto flex justify-between border rounded-[50px] bg-primary p-6 relative'>
            <div className='flex flex-col gap-3 items-start justify-between'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.targetUser.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold text-white capitalize'>{data.targetUser.name}</h3>
                        <span className='opacity-50 text-white'>{formattedCreatedAt}</span>
                    </div>
                </div>
                {/*********/}
                <div className="py-[6px] mb-8" />
                {/* type */}
                <span className='flex flex-col h-full text-white border-2 border-white rounded-full px-3 py-[6px] capitalize mb-8 opacity-70 hidden'>
                    {data?.type}
                </span>
                {/*********/}

                {/* deadline */}
                <div className='flex gap-3'>
                    <span className='text-[40px] flex items-center ml-3 gap-2'>
                        <span className='opacity-50 text-white'>$</span>
                        <span className='text-white'>490</span>
                    </span>
                    <div className='h-auto w-[1px] bg-white opacity-15' />
                    <div>
                        <span className='opacity-50 text-white'>deadline</span>
                        <br />
                        <span className='text-white'>{formattedDeadline}</span>
                    </div>
                </div>
                {/*********/}
            </div>
            <Selector
                iconclassName={'text-white'}
                options={[
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
                ]} className="h-min">
                <div className="border rounded-full size-9 flex justify-center items-center">
                    <Icon className="size-6 text-white" name="ellipsis-vertical" />
                </div>
            </Selector>
        </div>
    );
};

export default Ongoing2;

// Usage example
// ReactDOM.render(<Ongoing2 type="wedding" data={fakedata} />, document.getElementById('root'));

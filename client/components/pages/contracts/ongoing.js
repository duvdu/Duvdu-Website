import { connect } from "react-redux";
import Icon from "../../Icons";
import Selector from "../../elements/CustomSelector";
import { takeAction } from "../../../redux/action/apis/contracts/takeaction";
import dateFormat from "dateformat";
import { formattedCreatedAt, formattedDeadline } from './../../../util/format-date';
import { useTranslation } from 'react-i18next';
import TimeLeft from "./TimeLeft";

const Ongoing = ({ data, takeAction_respond, takeAction ,onClick}) => {
    const status = data.contract.status
    const uiStatus = () => {
        const items = {
            status: status,
            stageExpiration: data?.contract?.stageExpiration,
            deadline: data?.contract?.deadline,
            actionAt: data?.contract?.actionAt,
            createdAt: data?.contract?.createdAt,
        };

        switch (status) {
            case 'pending':
                return <TimeLeft data={items} msgstatus={"pending"} />;
            case 'waiting-for-payment':
                return <TimeLeft data={items} msgstatus={"waiting for payment"} />;
            case 'waiting-for-pay-10':
                return <TimeLeft data={items} msgstatus={"waiting for pay 10"} />;
            case 'update-after-first-Payment':
                return <TimeLeft data={items} msgstatus={"update after first Payment"} />;
            case 'waiting-for-total-payment':
                return <TimeLeft data={items} msgstatus={"waiting for total payment"} />;
            case 'ongoing':
                return <TimeLeft data={items} msgstatus={"complate task"} />;
            case 'completed':
                return <NormalState value={"Completed"} />;
            case 'rejected':
                return <NormalState value={"Rejected"} />;
            case 'canceled':
                return <NormalState value={"Canceled"} />;
            default:
                return "Unknown"; // Handle unknown cases as needed
        }
    };
    const Deadline = formattedDeadline(data?.contract?.deadline)
    const CreatedAt = dateFormat(data.contract.createdAt, 'd mmmm , yyyy')
    const { t } = useTranslation();
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
                <span className='flex flex-col h-full text-white border-2 border-white rounded-full px-3 py-[6px] capitalize mb-3 opacity-70'>
                    {data.ref}
                </span>
                {/*********/}
                <div className='flex ml-3 flex-col xl:flex-row justify-between items-center w-full'>
                            {uiStatus()}
                        <div className={`border-2 border-primary text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer hidden`}>{t("respond")}</div>
                    </div>

                {/* deadline */}
                <div className='flex flex-col xl:flex-row justify-between items-center w-full gap-3'>
                    <div className='flex gap-3 w-full'>
                        <span className='text-[40px] flex items-center ml-3 gap-2'>  <span className='opacity-50 text-white'>{t('EGP')}</span> <span className='text-white'>{data?.contract?.totalPrice}</span> </span>
                        <div className='h-auto w-[1px] bg-white opacity-15' />
                        <div>
                            <span className='opacity-50 text-white'>{t("deadline")}</span>
                            <br />
                            <span className='text-white'>{Deadline}</span>
                        </div>
                    </div>
                    {/* button */}
                    {(data.status === "submit-files" ?
                        <div className={`bg-white text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer`}>{t("submit files")}</div>
                        :
                        <div className={`hidden bg-white text-primary font-bold rounded-full flex justify-center items-center w-full max-w-[345px] h-[65px] active capitalize cursor-pointer`}>{t("scan QR")}</div>
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
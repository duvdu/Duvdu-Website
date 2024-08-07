import Icon from "../../Icons";
import dateFormat from "dateformat";
import Selector from "../../elements/CustomSelector";
import { formattedCreatedAt, formattedDeadline } from "../../../util/format-date";
import { useTranslation } from 'react-i18next';

const Ongoing2 = ({ data,onClick }) => {
    const { t } = useTranslation();
    
    const Deadline = formattedDeadline(data?.contract?.deadline)
    const CreatedAt = formattedCreatedAt(data?.contract?.createdAt)
    
    return (    
        <div onClick={onClick} className='w-full mx-auto flex justify-between border rounded-[50px] bg-primary p-6 relative cursor-pointer'>
            <div className='flex flex-col gap-3 items-start justify-between'>
                {/* profile */}
                <div className='flex gap-3 justify-between items-center'>
                    <img className='w-14 h-14 rounded-full object-cover object-top' src={data.sp?.profileImage} alt="profile picture" />
                    <div className='flex-col gap-1'>
                        <h3 className='opacity-80 text-lg font-bold text-white capitalize'>{data.sp?.name}</h3>
                        <span className='opacity-50 text-white'>{CreatedAt}</span>
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
                        <span className='text-white'>{490}</span>
                    </span>
                    <div className='h-auto w-[1px] bg-white opacity-15' />
                    <div>
                        <span className='opacity-50 text-white'>{t("deadline")}</span>
                        <br />
                        <span className='text-white'>{Deadline}</span>
                    </div>
                </div>
                {/*********/}
            </div>
        </div>
    );
};

export default Ongoing2;

// Usage example
// ReactDOM.render(<Ongoing2 type="wedding" data={fakedata} />, document.getElementById('root'));

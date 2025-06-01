import React, { useEffect, useState } from 'react';
import Popup from '../elements/popup';
import Button from '../elements/button';
import Loading from '../elements/loading';
import ErrorMessage from '../elements/ErrorMessage';
import Icon from '../Icons'
import { useTranslation } from 'react-i18next';
import { acceptFiles } from '../../redux/action/apis/contracts/acceptFiles';
import { connect } from 'react-redux';


function SendReason({type='project' , id ='123' ,field, acceptFiles_respond , acceptFiles , state}) { 
    const [reason , setReason] = useState('')
    const [error , setError] = useState('')
    const handleSubmit = () => {
        if(!reason){
            setError('Reason is Required')
            const timer2 = setTimeout(()=>{
                setError('')
            },5000)
            return () => clearTimeout(timer2);
            return
        }
        acceptFiles({ id, field , type , data:{status:'rejected' , reason , cycle:type }})
    };
    useEffect(()=>{
        if(acceptFiles_respond?.error){
            var convertActionError = JSON.parse(acceptFiles_respond?.error ?? null)
            setError(convertActionError?.errors?.[0]?.message)
            const timer2 = setTimeout(() => {
                setError(null)
            },5000)
            return () => clearTimeout(timer2);
        }

    },[acceptFiles_respond?.error])
    const { t } = useTranslation();
    return (
        <>
            <Popup id="send_reason" header={"Reject Reason"}>
                <div className='flex flex-col justify-center items-center p-0 sm:px-20 '>
                    <form className='max-w-[400px]'>
                        <section>
                            <p className="capitalize opacity-60 mt-11">{t("reason")} 
                                {/* <span className='opacity-30 text-xs '>{t("“optional”")}</span> */}
                            </p>
                            <input onChange={(e)=> setReason(e.target.value)} placeholder={t("reason for reject")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 sm:w-96 mt-4 p-4 placeholder:capitalize placeholder:opacity-30 placeholder:text-DS_black" />
                        </section>
                        {/* <p className="capitalize opacity-50 mx-14 text-center">{t("if you are uploading before deadling loriem aplusim")}</p> */}
                        <div className='text-center'>
                            <ErrorMessage ErrorMsg={error}/>
                        </div>
                        <Button onClick={handleSubmit} className="w-full mb-7 mt-11" color={"#D30000"} shadow={true} shadowHeight={"14"}>
                        {acceptFiles_respond?.loading?
                            <Loading/>
                            :
                            <span className='text-white font-bold capitalize text-lg'>{t("reject submit")}</span>
                            }
                        </Button>
                    </form>
                </div>
            </Popup>

        </>
    );
}
const mapStateToProps = (state) => ({
    state: state,
    acceptFiles_respond:state.api.acceptFiles,
});

const mapDispatchToProps = {
    acceptFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(SendReason);

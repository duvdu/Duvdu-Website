import React, { useEffect, useState } from 'react';
import Popup from '../elements/popup';
import Button from '../elements/button';
import Loading from '../elements/loading';
import ErrorMessage from '../elements/ErrorMessage';
import Icon from '../Icons'
import { useTranslation } from 'react-i18next';
import { submitFile } from '../../redux/action/apis/contracts/submitFile';
import { connect } from 'react-redux';


function Uploading_project_files({type='project' , id ='123' , submitFile_respond , submitFile , state}) { 
    const [link , setLink] = useState('')
    const [notes , setNotes] = useState('')
    const [error , setError] = useState('')
    const handleSubmit = () => {
        const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        const regex = new RegExp(expression);
         if(!link){
            setError('Link is Required')
            const timer2 = setTimeout(()=>{
                setError('')
            },5000)
            return () => clearTimeout(timer2);
            return
        }
        if (!link.match(regex)) {
            setError('Link must be a Link')
            const timer2 = setTimeout(()=>{
                setError('')
            },5000)
            return () => clearTimeout(timer2);
            return
        }
        if(!notes){
            setError('Notes is Required')
            const timer2 = setTimeout(()=>{
                setError('')
            },5000)
            return () => clearTimeout(timer2);
            return
        }


        submitFile({ id, type , data:{
            notes,
            link
        } })
    };
    useEffect(()=>{
        if(submitFile_respond?.error){
            var convertActionError = JSON.parse(submitFile_respond?.error ?? null)
            setError(convertActionError?.errors?.[0]?.field +' '+ convertActionError?.errors?.[0]?.message)
            const timer2 = setTimeout(() => {
                setError(null)
            },5000)
            return () => clearTimeout(timer2);
        }

    },[submitFile_respond?.error])
    const { t } = useTranslation();
    return (
        <>
            <Popup id="uploading_project_files" header={"Uploading Project Files"}>
                <div className='flex flex-col justify-center items-center p-0 sm:px-52 '>
                    <form className='max-w-[400px]'>
                        <section>
                            <p className="capitalize opacity-60 mt-11">{t("add project link")}</p>
                            <input onChange={(e)=> setLink(e.target.value)} placeholder={t("example: google drive link...")} type='url' className="google-drive-link bg-[#9999991A] rounded-3xl border-black border-opacity-10 h-16 sm:w-96 mt-4 p-4 placeholder:capitalize placeholder:opacity-30 placeholder:text-DS_black" />
                        </section>
                        <section>
                            <p className="capitalize opacity-60 mt-11">{t("Notes")} 
                                {/* <span className='opacity-30 text-xs '>{t("“optional”")}</span> */}
                            </p>
                            <textarea onChange={(e)=> setNotes(e.target.value) } placeholder={t("start typing...")} className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-4 h-44 placeholder:capitalize placeholder:opacity-30 placeholder:text-DS_black" />
                        </section>
                        <p className="capitalize opacity-50 mx-14 text-center">{t("if you are uploading before deadling loriem aplusim")}</p>
                        <div className='text-center'>
                            <ErrorMessage ErrorMsg={error}/>
                        </div>
                        <Button onClick={handleSubmit} className="w-full mb-7 mt-11" shadow={true} shadowHeight={"14"}>
                        {submitFile_respond?.loading?
                            <Loading/>
                            :
                            <span className='text-white font-bold capitalize text-lg'>{t("submit")}</span>
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
    submitFile_respond: state.api.submitFile,
});

const mapDispatchToProps = {
    submitFile
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploading_project_files);

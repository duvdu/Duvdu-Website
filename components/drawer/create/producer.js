import Layout from "../../layout/Layout";
import Icon from '../../Icons';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Button from '../../elements/button';

import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import { useRouter } from "next/router";
import { filterByCycle, gettFileUploaded, handleMultipleFileUpload, handleRemoveEvent } from "../../../util/util";
import Successfully_posting from "../../popsup/post_successfully_posting";
import Drawer from "../../elements/drawer";
import { CreateProducer } from "../../../redux/action/apis/cycles/producer/create";


const AddProducer = ({ CreateProducer, respond ,auth}) => {
    const router = useRouter();
  
    const [post_success, setPost_success] = useState(false);
 
    const onSubmit = (e) => {
        CreateProducer()
    }

    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])


    useEffect(() => {
        if (auth.login === false)
            router.push({ pathname: "/" });
    }, [auth.login])

    const toggleDrawer = () => {
        setPost_success(false)
      
        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }


    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={toggleDrawer} message="Creating" />
            <Drawer isOpen={true} name={'add producer'} toggleDrawer={toggleDrawer}>
                
                <form >
                <h2 className="opacity-80 text-2xl font-semibold capitalize text-center mt-14">Your job title is going to be set as producer.</h2>    
                    <Button onClick={onSubmit} className="w-auto mb-7 mt-14 mx-20" shadow={true} shadowHeight={"14"}>
                        <span className='text-white font-bold capitalize text-lg'>
                            Done
                        </span>
                    </Button>
                </form>
            </Drawer>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    respond: state.api.CreateProducer,
    
});

const mapDispatchToProps = {
    CreateProducer,
};


export default connect(mapStateToProps, mapDispatchToProps)(AddProducer);


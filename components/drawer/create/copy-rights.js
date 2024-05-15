import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Button from '../../elements/button';
import { useRouter } from "next/router";
import ListInput from "../../elements/listInput";
import Successfully_posting from "../../popsup/post_successfully_posting";
import { UpdateFormData, InsertToArray, resetForm } from '../../../redux/action/logic/forms/Addproject';
import Switch from "../../elements/switcher";
import Drawer from "../../elements/drawer";
import CategorySelection from "./assets/selectCategory";
import { filterByCycle } from "../../../util/util";
import { CreateCopyrights } from '../../../redux/action/apis/cycles/copywriter/create';



const AddCopyrights = ({ CreateCopyrights, user, auth, respond, addprojectState, UpdateFormData, InsertToArray, categories,resetForm }) => {

    const formData = addprojectState.formData;
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [post_success, setPost_success] = useState(false);
    categories = filterByCycle(categories, 'copy-rights')
    useEffect(() => {
        if (categories.length)
            UpdateFormData('category', categories[0]._id)
        UpdateFormData('showOnHome', false)
        UpdateFormData('location.lat', '-0.1278')
        UpdateFormData('location.lng', '51.5074')
    }, [])


    const validateRequiredFields = () => {
        return {}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateRequiredFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        CreateCopyrights(formData);
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        UpdateFormData(name, value);
    };


    useEffect(() => {
        if (respond)
            setPost_success(true)
    }, [respond?.message])
    

    useEffect(() => {
        if (auth.login === false)
            router.push({
                pathname: "/",
            });
    }, [auth.login])


    const toggleDrawer = () => {
        resetForm()
        router.replace({
            pathname: `/creative/${auth.username}`,
        })
    }

    const inputStyle = "bg-transparent text-lg py-4 focus:border-b-primary border-b w-full placeholder:capitalize placeholder:focus:opacity-50 pl-2";

    return (
        <>
            <Successfully_posting isShow={post_success} onCancel={() => api.req = null} message="Creating"/>
            <Drawer isOpen={true} name={'copy right'} toggleDrawer={toggleDrawer}>
                <form className='flex flex-col gap-5 container mx-auto' onSubmit={handleSubmit}>
                    <section>
                        <div className="my-5">
                            <CategorySelection 
                            value={{
                                'category' :formData.category,
                                'subCategory':formData.subCategory,
                                'tags':formData.tags,
                            }} 
                            categories={categories} onChange={(value) => {
                                UpdateFormData('category', value.category)
                                UpdateFormData('subCategory', value.subCategory)
                                UpdateFormData('tags', value.tags)
                            }} />
                        </div>
                        <input placeholder='price' type="number" value={formData.pricePerHour} onChange={handleInputChange} name="price" className={inputStyle} />

                        <input type="number" placeholder='duration Days' value={formData.studioName} onChange={handleInputChange} name="duration" className={inputStyle} />

                        <input placeholder='address' value={formData.address} onChange={handleInputChange} name="address" className={inputStyle} />
                        <ListInput name={'searchKeyword'} placeholder={'Search keywords'} onChange={(keys) => UpdateFormData('searchKeywords', keys)} />

                    </section>
                    <section className='flex justify-center gap-3 mt-1'>
                        <Switch value={formData.showOnHome} onSwitchChange={(checked) => UpdateFormData('showOnHome', checked)} id='showOnHome' />
                        <p className='opacity-70'> Show on home feed & profile </p>
                    </section>
                    <Button onClick={handleSubmit} className="w-full mb-7 mt-4" shadow={true} shadowHeight={"14"}>
                        <span className='text-white font-bold capitalize text-lg'>
                            Publish
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
    respond: state.api.CreateCopyrights,
    addprojectState: state.addproject,
    categories: state.categories,
});

const mapDispatchToProps = {
    InsertToArray,
    UpdateFormData,
    resetForm,
    CreateCopyrights
};


export default connect(mapStateToProps, mapDispatchToProps)(AddCopyrights);


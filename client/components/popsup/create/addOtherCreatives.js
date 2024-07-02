import React, { useEffect, useState } from 'react';
import Comman from './assets/comman';
import InputFeid from '../../elements/inputFeid';
import AppButton from '../../elements/button';
import { connect } from 'react-redux';
import { FindUser } from '../../../redux/action/apis/auth/profile/FindUser';
import { getMyprofile } from '../../../redux/action/apis/auth/profile/getProfile';
import { ClosePopUp } from '../../../util/util';

function AddOtherCreatives({ onSubmit, FindUser, FindUser_respond, api }) {
console.log(FindUser_respond)
    const [creatives, setCreatives] = useState([]);
    const [searchTo, setSearchTo] = useState(null);
    const [_searchTo, _setSearchTo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        _id: ''
    });
    const [error, setError] = useState({
        name: ''
    });

    useEffect(() => {
        if (FindUser_respond?.message == "success")
            setIsLoading(false);
            setCreatives(FindUser_respond?.data)
    }, [FindUser_respond])

    useEffect(() => {
        if (api.req === "FindUser" && api.loading) {
            setIsLoading(true);
            setCreatives([])
        } else if (_searchTo != searchTo) {
            setIsLoading(false);
            _setSearchTo(searchTo);
            FindUser({search:searchTo});
        }
    }, [searchTo, api.req === "FindUser" && api.loading]);

    // Handler to manage input changes for any field
    const handleInputChange = (name, value) => {
        if (name == 'name') {
            if (value.length >= 3) {
                setSearchTo(value)
            }
            else {
                setCreatives([])
            }
        }
    };

    // Validation and submit handler
    const onclick = () => {
        // Reset errors
        setError({
            name: ''
        });

        // Check for errors
        if (!formData.name) {
            setError(prev => ({ ...prev, name: 'Username or phone number is required.' }));
            return
        }
        
        // If no errors, submit data
        onSubmit(formData);
        ClosePopUp("addOtherCreatives")
        setFormData({
            name: ''
        });
    };

    const onCancel = () => {
        setFormData({
            name: ''
        });
        setError({
            name: ''
        });
        setCreatives([])
    };

    const handleCreativeSelect = (selectedCreative) => {
        setFormData(prev => ({
            ...prev,
            name: selectedCreative.name,
            _id: selectedCreative._id // Assuming the creative object has an _id field
        }));
        setCreatives([])
    };

    return (
        <>
            <Comman id={"addOtherCreatives"} header={"Add Other Creatives"} onCancel={onCancel}>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='w-full'>
                            <InputFeid
                                placeholder={"username or phone number"}
                                name="name"
                                onChange={(value) => { handleInputChange('name', value) }}
                                errerMsg={error.name}
                                sendValue={formData.name}
                            />
                        </div>
                        {
                            isLoading &&
                            <div className="load-parent">
                                <img className="h-full" src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        }
                        <ul className="flex flex-wrap gap-2">
                            {creatives?.map((item, index) => (
                                <li
                                    className="flex items-center text-base opacity-80 font-medium border-[1.5px] border-[#0000004d] rounded-full cursor-pointer"
                                    key={index}
                                    onClick={() => handleCreativeSelect(item)} // Handle click event
                                >
                                    {item.profileImage &&
                                        <img className='aspect-square rounded-full size-6 border' src={item.profileImage} alt='user img' />}
                                    <div className="text-[#000000BF] capitalize mx-2 ">{item.name}</div>
                                </li>
                            ))}
                        </ul>
                        <span className='text-xs font-semibold text-[#595959] hidden'>
                            This creative doesn’t have an account?
                            <span onClick={() => { }} className='text-primary font-bold'> Send Invitation</span>
                        </span>
                    </div>
                    <div>
                        <AppButton onClick={onclick} className={'w-full'}>
                            Add
                        </AppButton>
                    </div>
                </div>
            </Comman>
        </>
    );
}

const mapStateToProps = (state) => ({
    FindUser_respond: state.api.FindUser,
    api: state.api
});

const mapDispatchToProps = {
    FindUser,
    getMyprofile
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOtherCreatives);

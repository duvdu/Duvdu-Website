import Popup from '../../../elements/popup';
import Button from '../../../elements/button';
import { useEffect, useState } from 'react';
import { getCategory } from '../../../../redux/action/apis/category/getCategories';
import { connect } from "react-redux";
import { useRouter } from 'next/router';


function PostPopup({auth}) {
    const router = useRouter();
    const [selectedCycle, setSelectedCyvle] = useState(null);

    const handleNextStep = () => {
        if (selectedCycle)
            router.push({
                pathname: `/creative/${auth.username}`,
                query: { type: selectedCycle }
            });
    };

    const reset = () => {
        setSelectedCyvle(null)
    };


    function ServiceType() {

        const handleCycleSelect = (index) => {
            setSelectedCyvle(index);
        };

        return (
            <div className='mx-28'>
                <div className='flex flex-col gap-3 justify-center min-w-96 mt-16'>
                    {[
                        {
                            "value": "studio booking",
                            "url": "studio-booking"
                        },
                        {
                            "value": "equipment rental",
                            "url": "equipment-rental"
                        },
                        {
                            "value": "copy rights & permits",
                            "url": "copyrights-permits"
                        },
                        // {
                        //     "value": "music & audio",
                        //     "url": "music-audio"
                        // },
                        // {
                        //     "value": "executive producing",
                        //     "url": "executive-producing"
                        // }
                    ]
                        .map((item, index) => (
                            <li
                                className={`flex items-center justify-center capitalize border border-[#00000040] rounded-3xl h-[90px] cursor-pointer ${selectedCycle === item.url ? 'border-primary hover:border-2' : 'hover:border-2 hover:border-primary'}`}
                                key={index}
                                onClick={() => handleCycleSelect(item.url)}
                            >
                                <span className={`text-base font-semibold ${selectedCycle === index ? 'text-primary' : ''}`}>
                                    {item.value}
                                </span>
                            </li>
                        ))}
                </div>
            </div>
        );
    }


    return (
        <>
            <Popup id="select-type" onCancel={reset} header={"Select Type"}>
                <div className='flex flex-col items-center'>
                    <ServiceType />
                    <Button onClick={handleNextStep} className="w-full mb-7 mt-11 max-w-[400px]" shadow={true} shadowHeight={"14"}>
                        <span className='text-white font-bold capitalize text-lg'>
                            Post
                        </span>
                    </Button>

                </div>
            </Popup>

        </>
    );
}


const mapStateToProps = (state) => ({
    api: state.api,
    auth: state.auth

});

const mapDispatchToProps = {
    getCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPopup);

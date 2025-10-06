import Popup from '../../../elements/popup';
import Button from '../../../elements/button';
import { useEffect, useState } from 'react';
import { getCategory } from '../../../../redux/action/apis/category/getCategories';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';


function PostPopup({auth}) {
    const { t } = useTranslation();
    const router = useRouter();
    const [selectedCycle, setSelectedCyvle] = useState(null);

    const handleNextStep = (index) => {
        if (index)
            router.push({
                pathname: `/creative/${auth.username}`,
                query: { type: index }
            });
    };

    const reset = () => {
        setSelectedCyvle(null)
    };


    function ServiceType() {

        const handleCycleSelect = (index) => {
            handleNextStep(index)
            // setSelectedCyvle(index);
        };

        return (
            <div className='mx-28 w-full lg:w-auto'>
                <div className='flex flex-col gap-3 justify-center lg:min-w-96 mt-8'>
                    {[
                        {
                            "value": "project",
                            "url": "project"
                        },
                        // {
                        //     "value": "copy right",
                        //     "url": "copyrights-permits"
                        // },
                        // {
                        //     "value": "rental",
                        //     "url": "rental"
                        // },
                        // {
                        //     "value": "producer",
                        //     "url": "add-producer"
                        // },
                    ]
                        .map((item, index) => (
                            <li
                                className={`flex  items-center justify-center capitalize border border-[#00000040] dark:border-[#ffffff40] rounded-3xl h-[90px] cursor-pointer ${selectedCycle === item.url ? 'border-primary hover:border-2' : 'hover:border-2 hover:border-primary'}`}
                                key={index}
                                onClick={() => handleCycleSelect(item.url)}
                            >
                                <span className={`text-base font-semibold ${selectedCycle === index ? 'text-primary' : ''}`}>
                                    {t(item.value)}
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
                <div className='flex flex-col items-center mb-11'>
                    <ServiceType />
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

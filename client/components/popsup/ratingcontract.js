import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ClosePopUp, } from '../../util/util';
import { useTranslation } from 'react-i18next';

import DuvduLoading from '../elements/duvduLoading';
import DuvduError from '../elements/duvduError';
import { RateContract } from '../../redux/action/apis/rateContract';

function RatingContract({ data = {} , rate_respond , RateContract}) {
    const { t } = useTranslation();
    const [rate, setRate] = useState(0);
    const [desc, setDesc] = useState("");

    const handleSubmitRate = () => {
        RateContract({
            contract: data._id || "", 
            cycle: data.cycle || "studio-booking",
            rate,
            comment:desc,
        });
    };
    useEffect(()=>{
        if(rate_respond?.data?.createdAt) 
            ClosePopUp("Rating-project")
    },[rate_respond?.data?.createdAt])
    

    const handleStarClick = (rating) => {
        setRate(rating);
    };

    const handlereset = () => {
        setRate(0);
        setDesc("");
    };

    const renderStars = () => {
        const className = "text-primary text-3xl"
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <div key={i} onClick={() => handleStarClick(i)}>
                    {i <= rate ? <Icon className={className} name="rate-star" /> : <Icon className={className} name="rate-star-off" />}
                </div>
            );
        }
        return stars;
    };

    const isEnabled = rate > 0 && desc.length > 5
    return (
        <>
            <Popup id="Rating-contract" header={`Rating`} onCancel={handlereset}>
                <div className='mx-[70px] mt-4 flex flex-col justify-center items-center'>
                    <div className='flex gap-5 my-5'>
                        {renderStars()}
                    </div>
                    <div>
                        <div className="capitalize opacity-60">{t("rating")}</div>
                        <textarea 
                            placeholder={t("Rating will show on creative’s profile...")} 
                            className="bg-[#9999991A] rounded-3xl h-24 border-none mt-3 w-full min-w-[300px] max-w-[464px] resize-none" 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)} 
                        />
                    </div>
                    <DuvduError req={"Rate"}/>
                    <DuvduLoading loadingIn={"Rate"} />
                    <Button isEnabled={isEnabled} onClick={handleSubmitRate} className="mb-7 mx-4 font-bold text-lg w-full max-w-[345px] mt-20" shadow={true}>
                        <span className='text-white font-bold capitalize text-lg'>{t("Done")}</span>
                    </Button>
                </div>
            </Popup>
        </>
    );
}

const mapStateToProps = (state) => ({
    rate_respond: state.api.RateContract
});

const mapDispatchToProps = {
    RateContract
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingContract);

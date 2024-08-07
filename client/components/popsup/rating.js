import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Rate } from '../../redux/action/apis/rate';
import { useTranslation } from 'react-i18next';

function Rating({ data = {} , rate_respond , Rate}) {
    const { t } = useTranslation();
    const [rate, setRate] = useState(2);
    const [desc, setDesc] = useState("");

    const handleSubmitRate = () => {
        Rate({
            project: data.project || "", 
            cycle: data.cycle || "",     
            rate,
            desc,
        });
    };

    const handleStarClick = (rating) => {
        setRate(rating);
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

    return (
        <>
            <Popup id="Rating" header={`Rating ${data.name || ""}`} >
                <div className='mx-[70px] mt-4 flex flex-col justify-center items-center'>
                    <div className='w-20 h-20 rounded-full overflow-hidden'>
                        <img className='object-cover object-top' src={data.profileImage} alt="user" />
                    </div>
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
                    <Button onClick={handleSubmitRate} className="mb-7 mx-4 font-bold text-lg w-full max-w-[345px] mt-20" shadow={true}>
                        <span className='text-white font-bold capitalize text-lg'>{t("Done")}</span>
                    </Button>
                </div>
            </Popup>
        </>
    );
}

const mapStateToProps = (state) => ({
    rate_respond: state.api.Rate
});

const mapDispatchToProps = {
    Rate
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);

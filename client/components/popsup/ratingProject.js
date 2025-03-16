import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Rate } from '../../redux/action/apis/rate';
import { ClosePopUp } from '../../util/util';
import DuvduLoading from '../elements/duvduLoading';
import DuvduError from '../elements/duvduError';
import { useTranslation } from 'react-i18next';
import Loading from '../elements/loading';
import ErrorMessage from '../elements/ErrorMessage';
import SuccessfullyPosting from "../popsup/post_successfully_posting";

function ratingProject({ data = {}, rate_respond, Rate }) {
    const [post_success, setPost_success] = useState(false);
    const { t } = useTranslation();
    const [rate, setRate] = useState(0);
    const [desc, setDesc] = useState("");
    
    const handleSubmitRate = () => {
        Rate({
            project: data._id || "",
            cycle: data.cycle || "rentals",
            rate,
            comment: desc,
        });
    };
    useEffect(() => {
        if (rate_respond?.data?.createdAt)
            ClosePopUp("Rating-project")
    }, [rate_respond?.data?.createdAt])

    useEffect(() => {
        if (rate_respond?.data)
            setPost_success(true)
    }, [rate_respond?.message])

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
    var convertError = JSON.parse(rate_respond?.error ?? null)
    function OnSucess() {
        setPost_success(false)
        setRate(0);
        setDesc("");
    }

    const isEnabled = rate > 0 && desc.length>0
    return (
        <>
            <SuccessfullyPosting isShow={post_success} onCancel={OnSucess} message="Rating" />
            <Popup id="Rating-project" header={`Rating`} onCancel={handlereset}>
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
                    <DuvduError req={"Rate"} />
                    <DuvduLoading loadingIn={"Rate"} />
                    <ErrorMessage ErrorMsg={convertError?.data?.errors[0]?.message}/>
                    <Button isEnabled={isEnabled} onClick={handleSubmitRate} className="mb-7 mx-4 font-bold text-lg w-full max-w-[345px] mt-20" shadow={true}>
                        <span className='text-white font-bold capitalize text-lg'>{rate_respond?.loading ?<Loading/>:t("Done")}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ratingProject);

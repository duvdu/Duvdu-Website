import { useEffect } from "react";
import { projectReview } from "../../../redux/action/apis/reviews/project";
import Comment from "../../elements/comment";
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';

const Reviews = ({ projectReview, projectReview_respond, data }) => {
    const { t } = useTranslation();
    
    useEffect(() => {
        projectReview({ projectID: data._id });
    }, [projectReview, data._id]);

    const renderComments = () => {
        if (!projectReview_respond || !projectReview_respond.data) {
            return <div>{t("Loading...")}</div>;
        }

        return projectReview_respond.data.map((review) => ({
            id: review._id,
            userName: review.user.username,
            name: review.user.name?.split(' ')[0].length>6?review.user.name?.split(' ')[0].slice(0,6):review.user.name?.split(' ')[0],
            date: new Date(review.createdAt).toDateString(),
            avatar: review.user.profileImage,
            commentText: review.comment,
            rate: review.rate,
        })).map((comment) => (
            <Comment key={comment.id} comment={comment} />
        ));
    };

    return (
        <>
            <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4 hidden">{t("Reviews")}</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    {renderComments()}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    projectReview_respond: state.api.projectReview,
});

const mapDispatchToProps = {
    projectReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

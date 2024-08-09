import Link from 'next/link';
import Icon from '../Icons';
const Comment = ({ comment }) => {

    const renderStars = () => {
        const className = "text-primary scale-50 size-6"
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <div key={i}>
                    {i <= comment.rate ? <Icon className={className} name="rate-star" /> : <Icon className={className} name="rate-star-off" />}
                </div>
            );
        }
        return stars;
    };

    return (
        <>
            <div className="rounded-3xl border border-solid border-[#00000040] dark:border-[#FFFFFF40] p-5 mx-5 ">
                <Link href={`/creative/${comment.userName}`}>
                    <div className="flex justify-between">
                        <div className="flex profile gap-3">
                            <img src={comment.avatar} alt={comment.userName} width="45" height="45" />
                            <div className='flex-column ' >
                                <p className="name">{comment.name}</p>
                                <p className="date">{comment.date}</p>
                            </div>
                        </div>
                        <div className='flex'>
                        {renderStars()}
                        </div>
                    </div>
                </Link>
                <p className="pt-4">{comment.commentText}</p>
            </div>
        </>
    );
};
export default Comment;

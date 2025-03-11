import Link from 'next/link';
import Icon from '../Icons';
const Comment = ({ comment  , project}) => {
    
    const renderStars = () => {
        const className = `text-primary scale-50 ${project===true?'size-6':'size-6'}`
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
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = comment.date.toLocaleDateString('en-US', options);

    return (
        <div className="rounded-3xl border border-solid border-[#00000040] w-full h-[150px] dark:border-[#FFFFFF40] p-5 ">
            <div className="flex justify-between ">
                <Link href={`/creative/${comment.userName}`}>
                    <div className="flex profile cursor-pointer gap-3">
                        <img src={comment.avatar} alt={comment.userName} width="45" height="45" />
                        <div className='flex-column ' >
                            <p className="name">{comment.name}</p>
                            <p className="date">{formattedDate}</p>
                        </div>
                    </div>
                </Link>
                <div className='flex'>
                {renderStars()}
                </div>
            </div>
            <p className="pt-4 line-clamp-2">{comment.commentText}</p>
        </div>
    );
};
export default Comment;

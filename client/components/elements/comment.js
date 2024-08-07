import Link from 'next/link';
const Comment = ({comment}) => {
    return (
        <>
            <div className="rounded-3xl border border-solid border-[#00000040] dark:border-[#FFFFFF40] p-5 mx-5 ">
                <Link href={`/creative/${comment.userName}`}>
                    <div className="flex cursor-pointer">
                        <div className="flex profile gap-3">
                            <img src={comment.avatar} alt={comment.userName} width="45" height="45" />
                            <div className='flex-column ' >
                                <p className="name">{comment.name}</p>
                                <p className="date">{comment.date}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <p className="pt-4">{comment.commentText}</p>
            </div>
        </>
    );
};
export default Comment;

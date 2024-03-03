const comment = ({comment}) => {
    
    return (
        <>
            <div className="rounded-3xl border border-solid border-[#00000040] dark:border-[#FFFFFF40] p-5 mb-7">
                <div className="flex">
                    <div className="flex profile">
                        <img src={comment.avatar} alt={comment.userName} width="45" height="45" />
                        <div className='flex-column'>
                            <p className="name">{comment.userName}</p>
                            <p className="date">{comment.date}</p>
                        </div>
                    </div>
                </div>
                <p className="pt-4">{comment.commentText}</p>
            </div>
        </>
    );
};
export default comment;

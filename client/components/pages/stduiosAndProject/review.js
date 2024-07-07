import Comment from "../../elements/comment";

const Reviews = ({ data }) => (
    <>
        <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4 hidden">Reviews</h2>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>

                {/* {data?.comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))} */}
                {[
                    {
                        "id": 1,
                        "userName": "jonathan donrew",
                        "date": "Sun - Aug 3",
                        "avatar": "/assets/imgs/profile/defultUser?.jpg",
                        "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
                    },
                    {
                        "id": 2,
                        "userName": "jonathan donrew",
                        "date": "Sun - Aug 3",
                        "avatar": "/assets/imgs/profile/defultUser?.jpg",
                        "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
                    },
                    {
                        "id": 3,
                        "userName": "jonathan donrew",
                        "date": "Sun - Aug 3",
                        "avatar": "/assets/imgs/profile/defultUser?.jpg",
                        "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
                    },
                ].map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    </>
);

export default Reviews
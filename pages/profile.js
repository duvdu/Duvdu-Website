
import Layout from '../components/layout/Layout';
import Comment from '../components/elements/comment';

function formatNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + 'K';
    } else {
        return number.toString();
    }
}


function Profile() {
    var profile = {
        "cover-pic": "/assets/imgs/projects/cover.jpeg",
        "profile-pic": "/assets/imgs/theme/profile-frame.svg",
        "personal-name": "youseff abdulla",
        "value": 3.7,
        "location": "5th settlement",
        "occupation": "photographer",
        "rank": "professional",
        "about": "hello i’m Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        "popularity": {
            "likes": 28000,
            "followers": 514,
            "views": 258000
        },
        "comments": [
            {
                "id": 1,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/projects/1.jpeg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
            {
                "id": 2,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/projects/1.jpeg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
            {
                "id": 3,
                "userName": "jonathan donrew",
                "date": "Sun - Aug 3",
                "avatar": "/assets/imgs/projects/1.jpeg",
                "commentText": "This project is Lorem a ipsum dolor sit amet, consectetur adipiscing elit, sed do ei..."
            },
        ],
        "projects": [
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/1.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/2.jpeg"
            },
            {
                "creatives": 23247,
                "title": "models & performing artists",
                "show": "/assets/imgs/projects/3.jpeg"
            },
            {
                "creatives": 1687,
                "title": "videography",
                "show": "/assets/imgs/projects/4.gif"
            },
        ]

    };


    return (
        <Layout>
            <div className='container'>
                <div className='cover' style={{ backgroundImage: `url('${profile['cover-pic']}')` }} ></div>
                <div className='flex gap-3 pt-7'>
                    <div className='left-side flex-1'>
                        <div className='left-side-container'>
                            <div className='flex items-center'>
                                <div className='profile-pic-holder'>
                                    <img className='profile-picture' src={profile['profile-pic']} alt="profile frame" />
                                    <img className='profile-frame' src="/assets/imgs/profile/contact-2.png" alt="profile picture" />
                                </div>
                                <div className='flex-2 flex-col gap-1'>
                                    <h3>{profile['personal-name']}</h3>
                                    <span className='flex items-center'>
                                        <img className='h-3' alt="profile cover" src="/assets/imgs/theme/icons/location.svg" />
                                        <span className="location">{profile['location']}</span>
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between pt-25 items-center'>
                                <p className='bronzer'>{profile['rank']}</p>
                                <p id='photographer'>{profile['occupation']}</p>
                                <div id='rating' className='flex items-center gap-1'>
                                    <p>{profile['value']}</p>
                                    <img src='/assets/imgs/theme/icons/rating.svg' width={18} height={18} />
                                </div>
                            </div>
                            <div className='flex justify-center pt-7 items-center'>

                            <div className='flex justify-between w-64'>
                                {Object.entries(profile.popularity).map(([key, value]) => (
                                    <div className='popularity' key={key}>
                                        <p className='number'>{formatNumber(value)}</p>
                                        <p className='unit'>{key}</p>
                                    </div>
                                ))}

                            </div>
                            </div>
                        </div>
                        <div className='h-divider mt-7'></div>
                        <div className='left-side-container'>
                            <h3 className='pt-6' id='about-header'>about</h3>
                            <p className='pt-6' id='about-paragraph'>{profile['about']}</p>
                        </div>
                        <div className='h-divider mt-7'></div>
                        <div className='left-side-container'>
                            {profile.comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>
                    <div className='right-side'>
                        {
                            profile.projects.length == 0 &&
                            <h3>No projects Found </h3>
                        }

                        {profile.projects.length > 0 && (
                            <div className='project-grid'>
                                {profile.projects.map((data, index) => (
                                    <Project key={index} data={data} isbig={(index+1)%4 < 2} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </Layout>
    );
}


const Project = ({ data , isbig}) => (

    <div className={isbig?'profile-project big':'profile-project small'}>
        <img className='cardimg' src={data.show} alt='show' />
        <div className='creatives'>
            {data.creatives} creatives
        </div>
        <div className='title'>
            {data.title}
        </div>
    </div>

);


export default Profile;

import AppButton from '../elements/button';
import Comment from '../elements/comment';
import Controller from '../elements/controllers';
import Icon from '../Icons';

function EditPopUp({ profile }) {

    return (
        <>
            <div className='container edit-pop overflow-y-scroll'>
                <div className='relative'>
                    <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer p-4">
                        <Icon name={'edit'} />
                    </Controller>
                    <img className='card w-full h-52 mt-5 object-cover bg-bottom' src={`${profile['cover-pic']}`} alt="cover pic" />
                    <div className='absolute bottom-0 edit w-28 h-28 transform translate-y-1/2 translate-x-1/2'>
                        <img className='rounded-full w-full h-full' src={profile['profile-pic']} alt="profile picture" />
                        <Controller className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full cursor-pointer p-4">
                            <Icon name={'edit'} />
                        </Controller>
                    </div>
                </div>
                
                <form className='p-20 flex flex-col items-center'>
                        <div className='mb-4'>
                            <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                                name
                            </span>
                            <input
                                type='text'
                                value={profile['personal-name']}
                                className="edit auth-field"
                            />
                        </div>
                        <div className='mb-4'>
                            <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            services
                            </span>
                            <input
                                type='text'
                                value={profile['occupation']}
                                className="edit auth-field"
                            />
                        </div>
                        <div className='mb-4'>
                            <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            location
                            </span>
                            <input
                                type='text'
                                value={profile['location']}
                                className="edit auth-field"
                            />
                        </div>
                        <div className='mb-4'>
                            <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            price per hour
                            </span>
                            <input
                                type='text'
                                value={profile['price']}
                                className="edit auth-field"
                            />
                        </div>
                        <div className='mb-4'>
                            <span className='text-base font-medium opacity-50 leading-10 capitalize'>
                            about
                            </span>
                            <textarea
                                type='text'
                                value={profile['about']}
                                className="edit auth-field"
                            />
                        </div>
                        <AppButton text={'Done'} className={'mt-28'}/>
                </form>
                
            </div>
        </>
    );
}

export default EditPopUp;

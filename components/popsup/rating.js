
import Popup from '../elements/popup';
import Button from '../elements/submitButton';
import Icon from '../Icons'
import { useState } from 'react';


function Rating() {
    const [rate, setRate] = useState(2); // Initial rating is set to 3

    // Function to handle click event on stars
    const handleStarClick = (rating) => {
        setRate(rating); // Set the rating to the clicked star's value
    };

    // Render stars based on the current rating
    const renderStars = () => {
        const className = "text-primary text-3xl"
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <div key={i} onClick={() => handleStarClick(i)}>
                    {i <= rate ? <Icon className={className} name="star" /> : <Icon className={className} type='far' name="star" />}
                </div>
            );
        }
        return stars;
    };


    return (
        <>
            <Popup id="Rating" header={"Rating Anna"}>
                <div className='mx-[70px] mt-4 flex flex-col justify-center items-center'>
                    <div className='w-20 h-20 rounded-full overflow-hidden'>
                        <img src="/assets/imgs/profile/contact-2.png" alt="user" />
                    </div>
                    <div className='flex gap-5 my-5'>
                        {renderStars()}
                    </div>
                    <div>
                        <div className="capitalize opacity-60">rating</div>
                        <textarea placeholder="Rating will show on creative’s profile..." className="bg-[#9999991A] rounded-3xl h-24 border-none mt-3 w-[464px] resize-none" />
                    </div>
                    <Button className="mb-7 mx-16 font-bold text-lg w-[345px] mt-20" shadow={true}>
                        <span className='text-white font-bold capitalize text-lg'>
                            Done
                        </span>
                    </Button>
                </div>
            </Popup>

        </>
    );
}

export default Rating;


import Popup from '../elements/popup';
import Button from '../elements/button';
import Icon from '../Icons'


function Verify() {
    return (
        <>
            <Popup id="verify" >
                <div className='flex flex-col justify-center items-center w-full lg:w-[828px]'>
                    <h1 className='text-primary text-3xl capitalize font-extrabold mt-7 mb-12'> verify your account </h1>
                    <div className='w-36 h-36 bg-cover relative p-3 bg-no-repeat boronze-frame'>
                        <img className='w-full h-full rounded-full' src={"/assets/imgs/profile/contact-2.png"} alt="profile picture" />
                    </div>
                    <div className='flex gap-1 items-center justify-center mt-9'>
                        <span className='capitalize text-xl font-bold'> yousseff Abdulla </span>
                        <Icon name={"check-verify"} />
                    </div>
                    <div className='flex flex-col items-start gap-5 mt-9'>
                        {[
                            'Get a verified badge',
                            'Get suggested to more clients',
                            'Instant projects with more fees',
                            'Increased account trust',
                        ].map((feature, index) => (
                            <div key={index} className='flex gap-3 items-center justify-center'>
                                <Icon name={"check"} />
                                <span className='capitalize text-lg font-semibold opacity-60'>{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className='mt-16' />
                    <div >
                        <span className='text-primary opacity-70 text-lg'>$17.99</span>
                        <span className='text-primary opacity-70 text-lg'>/</span>
                        <span className='text-primary opacity-70 text-lg'>year</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className='flex justify-center my-2'>
                            <Button className='my-5 w-[400px] text-white' type="submit" name="login" shadow={true} shadowHeight="14">
                                Verify Now
                            </Button>
                        </div>
                    </div>
                    <a className="text-DS_black text-sm opacity-50 mt-3" href="/terms&condations">terms & conditions</a>
                </div>
            </Popup>

        </>
    );
}

export default Verify;

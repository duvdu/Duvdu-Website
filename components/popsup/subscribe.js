
import Button from '../elements/submitButton';
import Icon from '../Icons'


function Popup({ isfree = false }) {
    return (
        <>
            <div id={`subscribe-${isfree ? 'free':'notfree'}`} className="popup z-30 ">
                <div data-popup-dismiss="popup" className="flex overlay blur" ></div>
                <div className='card content overflow-hidden bg-[#F7F9FB] dark:bg-[#131313] mx-10 bg-no-repeat relative ' style={{ backgroundImage: "url(assets/imgs/authswiper/login-3.png)" }}>
                    <div data-popup-dismiss="popup" className='flex gap-3 cursor-pointer absolute left-4 top-4'>
                        <Icon name={'x-blur'} />
                    </div>
                    {/* <div className='lg:w-[670px] h-[213px] verify-linear'></div> */}

                    <div className='lg:w-[670px] bg-[#F7F9FB] mt-[400px]'>
                        <div className='w-full h-[213px] absolute -translate-y-full verify-linear' />
                        {isfree ? <StartFree /> : <Subscribe />}
                    </div>
                </div>
            </div>
        </>
    );
}

const StartFree = () => {
    return (
        <div className='p-7 flex flex-col justify-center items-center'>
            <div className='max-w-[450px] flex flex-col justify-center items-center'>
                <h1 className='text-primary text-3xl font-extrabold capitalize text-center'>access 5 free contracts</h1>
                <p className='opacity-60 text-lg font-semibold mt-3 text-center'>
                    Enjoy 5 contracts for free, and then we have a subscription plan to access more.
                </p>
                <span className='text-primary text-lg capitalize line-through text-center mt-11 mb-4'>
                    $17.99
                    <span className='opacity-70 text-primary'>
                        /for 5 contracts
                    </span>
                </span>
                <Button className="w-full mb-7" shadow={true} shadowHeight={"14"}>
                    <span className='text-white font-bold capitalize text-lg'>
                        start free trial
                    </span>
                </Button>
            </div>
            <a className="text-DS_black text-sm opacity-50" href="/terms_conditions">terms & conditions</a>
        </div>

    )
}
const Subscribe = () => {
    return (
        <div className='p-7 flex flex-col justify-center items-center'>
            <div className='max-w-[450px] flex flex-col justify-center items-center'>
                <h1 className='text-primary text-3xl font-extrabold capitalize text-center'>access 5 free contracts</h1>
                <p className='opacity-60 text-lg font-semibold mt-3 text-center'>
                    Enjoy 5 contracts for free, and then we have a subscription plan to access more.
                </p>
                <span className='text-primary text-lg capitalize text-center mt-11 mb-4'>
                    $17.99
                    <span className='opacity-70 text-primary'>
                        /for 5 contracts
                    </span>
                </span>
                <Button className="w-full mb-7" shadow={true} shadowHeight={"14"}>
                    <span className='text-white font-bold capitalize text-lg'>
                    subscribe now
                    </span>
                </Button>
            </div>
            <a className="text-DS_black text-sm opacity-50" href="/terms_conditions">terms & conditions</a>
        </div>

    )
}


export default Popup;



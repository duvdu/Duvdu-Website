
import Popup from '../elements/popup';
import AppButton from '../elements/button';

function Report({ isPopupOpen, setIsPopupOpen }) {


    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={closePopup} className={'mt-14 w-[942px]'} header={'Report Project'}>
                    <section className='mt-6'>
                        <span className='font-semibold text-2xl capitalize'>what happened?</span>
                        <br />
                        <span className='font-medium text-lg'>Tell us about the copyright violation happened</span>
                        <textarea placeholder="Start typing..." className="bg-[#9999991A] rounded-3xl border-black border-opacity-10 mt-5" />
                    </section>
                    <section className='mt-9'>
                        <span className='font-semibold text-2xl capitalize'>send evidence</span>
                        <br />
                        <span className='font-medium text-lg'>Behind the scenes shots, raw files, ...etc.</span>
                    </section>
                    <div className='flex justify-center w-full '>
                        <AppButton text={'Done'} className={'mt-9 w-full'} color={"#D30000"} />
                    </div>

                </Popup>
            )}
        </>
    );
}

export default Report;

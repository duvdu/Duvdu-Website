const EmptyComponent = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet h-body p-10'>
            <div className='bg-gray-600 mt-5' />
            <img src='/assets/imgs/theme/Empty.svg' className='h-full lg:w-[540px] lg:max-h-[450px]' />
            <h3 className='text-2xl font-bold mt-8 mb-4'>No Contract Yet!</h3>
        </div>

    );
};

export default EmptyComponent;
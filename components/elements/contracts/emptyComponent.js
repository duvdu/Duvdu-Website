const EmptyComponent = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center w-full h-NoProjectYet border-NoProjectYet'>
            <div className='w-[540px] h-[450]px bg-gray-600 mt-10' />
            <img src='/assets/imgs/theme/Empty.svg' className='w-0 h-0 lg:w-[540px] lg:h-[450px]' />
            <h3 className='text-2xl font-bold mt-8 mb-4'>No Projects Yet!</h3>
        </div>

    );
};

export default EmptyComponent;
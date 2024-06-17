const Loadingcomponent = () => {

    const Type1 = () => <div className='w-40 h-4 bg-[#E6E6E6] rounded-full' />

    const Type2 = () => <div className='w-40 h-14 bg-[#F2F2F2] rounded-full' />

    const Type3 = () => <div className='w-14 h-14 bg-[#F2F2F2] rounded-full' />

    const Type4 = () => <div className='w-[370px] h-[241px] bg-[#F2F2F2] rounded-3xl' />

    return (
        <div className='h-body overflow-y-hidden'>
            <div className='flex flex-col gap-[15px] text-center w-full mt-11 '>
                <Type1 />
                <div className='flex gap-2 my-[10px]'>
                    <Type2 />
                    <Type2 />
                    <Type3 />
                </div>
                <Type1 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
                <Type4 />
            </div>
        </div>
    );
};
export default Loadingcomponent;

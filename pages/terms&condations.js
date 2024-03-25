import React from 'react';
import headerMen from '../../public/static/Terms.json';


const Page = () => {
    return (
        <div className='container py-24'>

            <h1 className='text-3xl font-medium'>
                Terms & Conditions

            </h1>
            <span className='opacity-80 text-xs'>
                Last updated: December 22, 2023
            </span>

            <section className='mt-8 text-lg font-medium'>
                {headerMen.value}
            </section>
        </div>
    );
};

export default Page;

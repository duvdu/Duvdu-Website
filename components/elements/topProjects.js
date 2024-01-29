import React from 'react';


const TopProjects = ({ projects }) => (
<div className='mt-6 card bg-white w-full p-8 cardborder-3'>
    {projects.projects.map((e,index)=>(
        <div key={index} className='spliter'>
            <div className='flex gap-4 items-center'>
                <span className='opacity-30'>
                    #{e.rank}
                </span>
                <div className='bg-black rounded-lg w-14 h-14'></div>
                <div>
                    <span className='text-base font-bold uppercase opacity-80 text-black'>{e.name}</span>
                    <br/>
                    <span className='text-sm font-semibold opacity-30'>{e.views} views</span>
                </div>
            </div>
        </div>
    ))}
</div>
);

export default TopProjects;

import React from 'react';
import Link from "next/link";


const TopProjects = ({ projects }) => (
<div className='mt-6 card bg-white dark:bg-[#1A2024] w-full p-8 cardborder-3 bg-white dark:bg-[#1A2024]'>
    {projects?.map((e,index)=>(
        <Link href={e.projectDetails?.insurance?`/rentals/${e.projectDetails._id}`:`/project/${e.projectDetails._id}`} key={index} >
        <div className='spliter cursor-pointer'>
            <div className='flex gap-4 items-center'>
                <span className='opacity-30'>
                    #{index + 1}
                </span>
                <div className='overflow-hidden rounded-lg w-14 h-14'>
                    <img src={e.projectDetails?.cover} alt={e.projectDetails?.title} className='h-full w-full'/>
                </div>
                <div>
                    <span className='text-base font-bold uppercase opacity-80 text-DS_black'>{e.projectDetails?.title || e.projectDetails?.name}</span>
                    <br/>
                    <span className='text-sm font-semibold opacity-30'>{e.totalViews} views</span>
                </div>
            </div>
        </div>
        </Link>
    ))}
</div>
);

export default TopProjects;

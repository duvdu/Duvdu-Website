import React from 'react'

export default function ProjectSkeleton() {
  return (
    <div className="container animate-pulse">
    <div className='py-6 space-y-6'>
      <div className='grid lg:grid-cols-6 gap-5 w-full'>
        <div className="col-span-2 lg:col-span-2 w-full bg-gray-200 dark:bg-[#444] rounded-[30px]  h-[300px] lg:h-[800px]"></div>
        <div className="h-[600px] lg:h-auto col-span-2 lg:col-span-4 grid lg:grid-rows-3 gap-5">
          <div className="lg:row-span-2 bg-gray-200 dark:bg-[#444] rounded-[30px] " />
          <div className="bg-gray-200 dark:bg-[#444] rounded-[30px] " />
        </div>
      </div>
    </div>
    </div>
  )
}

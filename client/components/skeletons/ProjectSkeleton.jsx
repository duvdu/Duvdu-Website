import React from 'react'

export default function ProjectSkeleton() {
  return (
    <div className="container animate-pulse">
    <div className='py-10 space-y-6'>
      {/* Project Title & Profile */}
      <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-36 "></div>
      <div className="flex items-center space-x-4">
        {/* Profile Image Skeleton */}
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#444] "></div>

        {/* Text skeleton */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-24 "></div>
          {/* Subtitle */}
          <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-16 "></div>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#444] "></div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-36 "></div>

      {/* Large Image Skeleton */}
      <div className='grid md:grid-cols-4 gap-5 w-full'>
        <div className="h-[600px] md:h-auto col-span-2 md:col-span-3 grid md:grid-rows-3 gap-5">
          <div className="md:row-span-2 bg-gray-200 dark:bg-[#444] rounded-[30px] " />
          <div className="bg-gray-200 dark:bg-[#444] rounded-[30px] " />
        </div>
        <div className="col-span-2 md:col-span-1 w-full bg-gray-200 dark:bg-[#444] rounded-[30px]  h-[300px] md:h-[800px]"></div>
      </div>
    </div>
    </div>
  )
}

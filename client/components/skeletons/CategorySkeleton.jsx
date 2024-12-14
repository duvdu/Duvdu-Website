import React from 'react'

export default function CategorySkeleton() {
  return (
     <div className="container animate-pulse">
      <div className="hidden md:flex justify-center items-center gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-[#444] rounded-2xl overflow-hidden w-full">
            {/* Image Skeleton */}
            <div className={`h-96 bg-gray-200 dark:bg-[#444]`}></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row md:hidden justify-center items-center gap-4">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-[#444] rounded-2xl overflow-hidden w-full">
            {/* Image Skeleton */}
            <div className={`h-60  bg-gray-200 dark:bg-[#444]`}></div>
          </div>
        ))}
      </div>
    </div> 
  )
}

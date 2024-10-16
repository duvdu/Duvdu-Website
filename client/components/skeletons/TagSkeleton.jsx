import React from 'react'

export default function TagSkeleton() {
  return (
    <div className="container animate-pulse">
    <div className="hidden md:flex justify-center items-center space-x-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-gray-200 dark:bg-[#444]  rounded-lg overflow-hidden w-full">
          {/* Image Skeleton */}
          <div className="h-12 md:h-24 bg-gray-200 dark:bg-[#444] "></div>
        </div>
      ))}
    </div>
    <div className="flex md:hidden justify-center items-center space-x-4">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="bg-gray-200 dark:bg-[#444]  rounded-lg overflow-hidden w-full">
          {/* Image Skeleton */}
          <div className="h-12 md:h-24 bg-gray-200 dark:bg-[#444] "></div>
        </div>
      ))}
    </div>
    </div>
  )
}

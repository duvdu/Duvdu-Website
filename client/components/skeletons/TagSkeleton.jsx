import React from 'react'

export default function TagSkeleton() {
  return (
    <div className="container">
    <div className="hidden md:flex justify-center items-center space-x-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-gray-200 dark:bg-[#444] animate-pulse rounded-2xl overflow-hidden w-full">
          {/* Image Skeleton */}
          <div className={`h-96 bg-gray-200 dark:bg-[#444] animate-pulse`}></div>
        </div>
      ))}
    </div>
    <div className="flex md:hidden justify-center items-center space-x-4">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="bg-gray-200 dark:bg-[#444] animate-pulse rounded-2xl overflow-hidden w-full">
          {/* Image Skeleton */}
          <div className={`h-60  bg-gray-200 dark:bg-[#444] animate-pulse`}></div>
        </div>
      ))}
    </div>
    </div>
  )
}

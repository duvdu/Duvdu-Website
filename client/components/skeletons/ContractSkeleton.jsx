import React from 'react'

export default function ContractSkeleton() {
  return (
    <div className="container animate-pulse mt-11 lg:mt-36">
      <div className="flex flex-col justify-center items-center gap-5">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-[#444] rounded-[50px] overflow-hidden w-full">
            {/* Image Skeleton */}
            <div className={`h-44 bg-gray-200 dark:bg-[#444] `}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

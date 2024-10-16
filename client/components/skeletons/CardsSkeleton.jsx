import React from 'react'

export default function CardsSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="w-full ">
            {/* Image Section */}
            <div className="relative rounded-3xl bg-gray-300 dark:bg-[#333] w-full h-64 mb-4">
            </div>
            {/* User Info */}
            <div className='flex justify-between items-center w-full'>
              <div className="flex items-center mb-2">
                {/* Profile Image */}
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#444] mr-2"></div>
                {/* Name */}
                <div className="w-16 h-4 bg-gray-200 dark:bg-[#444] rounded"></div>
              </div>
              {/* Rating */}
              <div className="flex items-center h-full">
                <div className="h-4 w-4 bg-gray-200 dark:bg-[#444] rounded-full"></div>
                <div className="h-4 w-8 bg-gray-200 dark:bg-[#444] rounded ml-2"></div>
              </div> 
            </div> 
            {/* Title */}
            <div className="h-4 bg-gray-200 dark:bg-[#444] rounded mb-2"></div>
            {/* Price */}
            <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-24 mb-2"></div>
            
        </div>
      ))}
    </div>
  )
}

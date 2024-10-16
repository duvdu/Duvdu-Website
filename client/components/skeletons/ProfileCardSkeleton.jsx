import React from 'react'

export default function ProfileCardSkeleton() {
  return (
    <div className="w-full lg:max-w-sm p-6 bg-gray-200 dark:bg-[#444] rounded-[40px] animate-pulse space-y-4">
      {/* Profile Image */}
      <div className="flex items-center space-x-2">
        <div className="bg-gray-300 dark:bg-[#333] rounded-full h-20 w-20"></div>
        <div className="space-y-2 text-center">
          <div className="bg-gray-300 dark:bg-[#333] h-6 w-32 mx-auto rounded-lg"></div>
          <div className="bg-gray-300 dark:bg-[#333] h-4 w-24 mx-auto rounded-lg"></div>
        </div>
      </div>

      {/* Profile Info */}

      {/* Badge Row */}
      <div className="flex justify-around mt-4">
        <div className="bg-gray-300 dark:bg-[#333] h-8 w-16 rounded-lg"></div>
        <div className="bg-gray-300 dark:bg-[#333] h-8 w-16 rounded-lg"></div>
        <div className="bg-gray-300 dark:bg-[#333] h-8 w-16 rounded-lg"></div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-around mt-4">
        <div className="text-center">
          <div className="bg-gray-300 dark:bg-[#333] h-4 w-8 mx-auto"></div>
          <div className="bg-gray-300 dark:bg-[#333] h-4 w-12 mx-auto mt-2"></div>
        </div>
        <div className="text-center">
          <div className="bg-gray-300 dark:bg-[#333] h-4 w-8 mx-auto"></div>
          <div className="bg-gray-300 dark:bg-[#333] h-4 w-12 mx-auto mt-2"></div>
        </div>
        <div className="text-center">
          <div className="bg-gray-300 dark:bg-[#333] h-4 w-8 mx-auto"></div>
          <div className="bg-gray-300 dark:bg-[#333] h-4 w-12 mx-auto mt-2"></div>
        </div>
      </div>

      {/* Toggle/Status */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <div className="bg-gray-300 dark:bg-[#333] h-4 w-20 rounded-lg"></div>
      </div>

      {/* About Section */}
      <div className="mt-4">
        <div className="bg-gray-300 dark:bg-[#333] h-4 w-16 mx-auto"></div>
        <div className="bg-gray-300 dark:bg-[#333] h-4 w-48 mx-auto mt-2"></div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="bg-gray-300 dark:bg-[#333] h-12 w-12 rounded-full"></div>
        <div className="bg-gray-300 dark:bg-[#333] h-12 w-12 rounded-full"></div>
      </div>
    </div>
  )
}

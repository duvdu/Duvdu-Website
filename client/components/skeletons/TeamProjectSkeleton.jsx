import React from 'react';

const TeamProjectSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 w-1/3 bg-gray-300 dark:bg-[#333] rounded"></div>

      {/* Team Image Skeleton */}
      <div className="w-full h-20 bg-gray-300 dark:bg-[#333] rounded-full"></div>

      {/* Copyrights Section Skeleton */}
      
      <div className="space-y-4">
        <div className="h-6 w-1/4 bg-gray-300 dark:bg-[#333] rounded"></div>

        {/* User Info Skeleton */}
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          <div className="w-12 h-12 bg-gray-300 dark:bg-[#333] rounded-full"></div>
          
          {/* User Details */}
          <div className="flex-1 space-y-2">
            <div className="w-1/2 h-4 bg-gray-300 dark:bg-[#333] rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 dark:bg-[#333] rounded"></div>
          </div>
        </div>
      </div>
      <div className="w-32 h-10 bg-gray-300 dark:bg-[#333] rounded-full"></div>

      <div className="space-y-4">
        <div className="h-6 w-1/4 bg-gray-300 dark:bg-[#333] rounded"></div>

        {/* User Info Skeleton */}
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          <div className="w-12 h-12 bg-gray-300 dark:bg-[#333] rounded-full"></div>
          
          {/* User Details */}
          <div className="flex-1 space-y-2">
            <div className="w-1/2 h-4 bg-gray-300 dark:bg-[#333] rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 dark:bg-[#333] rounded"></div>
          </div>
        </div>
      </div>
      <div className="w-32 h-10 bg-gray-300 dark:bg-[#333] rounded-full"></div>

      {/* Button Skeleton */}
    </div>
  );
};

export default TeamProjectSkeleton;

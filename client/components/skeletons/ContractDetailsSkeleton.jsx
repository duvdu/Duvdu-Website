import React from 'react';

const ContractDetailsSkeleton = () => {
  return (
    <div className="px-8 max-w-4xl mx-auto">
      <div className="animate-pulse space-y-6">
        {/* Header (Expire Date + Project ID) */}
        <div className="flex items-center justify-between">
          <div className="w-full h-8 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
        </div>

        {/* Project ID Block */}
        <div className="flex items-center gap-4">
          <div className="w-full h-24 bg-gray-300 dark:bg-[#333] rounded-full"></div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-2 gap-6">
            <div className="w-full h-8 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="w-full h-8 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
        </div>

        {/* Contract Information */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="w-3/5 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="w-full h-8 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="w-3/5 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="w-full h-8 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="w-3/5 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="w-full h-8 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="w-3/5 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="w-full h-8 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
          </div>
        </div>

        {/* Booking and Deadline Dates */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
              <div className="w-16 h-4 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
              <div className="w-16 h-4 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
              <div className="w-16 h-4 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
              <div className="w-16 h-4 bg-gray-300 dark:bg-[#333] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailsSkeleton;

import React from 'react';

const BookmarksSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="w-full h-20 bg-gray-300 dark:bg-[#333] rounded-full"></div>
      <div className="w-full h-20 bg-gray-300 dark:bg-[#333] rounded-full"></div>
      <div className="w-full h-20 bg-gray-300 dark:bg-[#333] rounded-full"></div>
      <div className="w-full h-20 bg-gray-300 dark:bg-[#333] rounded-full"></div>
      <div className="w-full h-20 bg-gray-300 dark:bg-[#333] rounded-full"></div>
    </div>
  );
};

export default BookmarksSkeleton;

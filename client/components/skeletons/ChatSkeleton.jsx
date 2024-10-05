import React from 'react';
export default function ChatSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={`flex items-start space-x-3 ${index%2 ==0 ? 'flex-row-reverse':''}`}>
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#444] animate-pulse"></div>
          <div className={` ${index%2 ==0 ? 'flex flex-col items-end w-full space-x-3':'w-full'}`}>
            <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-3/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#444] rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
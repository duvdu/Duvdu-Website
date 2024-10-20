import React from 'react';
import { useTranslation } from 'react-i18next';

const NotificationSkeleton = () => {
    const { t } = useTranslation();
  return (
    <div className="rounded-[45px] min-w-80 animate-pulse px-3 bg-white dark:bg-[#1A2024]">
      <div className="flex items-center space-x-4 p-4 rounded-lg">
        {/* Profile Picture Skeleton */}
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

        {/* Text Skeleton */}
        <div className="flex-1 space-y-2">
          <div className=" h-4 w-3/2 bg-gray-700 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Second Notification Skeleton */}
      <div className="flex items-center space-x-4 p-4 rounded-lg">
        {/* Profile Picture Skeleton */}
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

        {/* Text Skeleton */}
        <div className="flex-1 space-y-2">
          <div className=" h-4 w-3/2 bg-gray-700 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;

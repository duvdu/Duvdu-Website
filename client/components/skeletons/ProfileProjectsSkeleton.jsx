import React from 'react'

export default function ProfileProjectsSkeleton() {
  return (
    <div className="project-grid mt-20 md:mt-0 gap-2 md:gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className={`animate-pulse ${(index + 1) % 4 < 2?'profile-project !bg-gray-200 dark:!bg-[#444] big w-full xl:w-68% cursor-pointer relative' : 'profile-project !bg-gray-200 dark:!bg-[#444] small w-48% xl:w-28% cursor-pointer relative'}`}></div>
      ))}
    </div>
  )
}

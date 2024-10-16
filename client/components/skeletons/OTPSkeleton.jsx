import React from 'react'

export default function OTPSkeleton() {
  return (
    <div className="container animate-pulse">
        <div className="flex items-center space-x-2 mt-5">
        {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-[#444] rounded-2xl overflow-hidden w-14 h-14">
            </div>
        ))}
        </div>
    </div> 
  )
}

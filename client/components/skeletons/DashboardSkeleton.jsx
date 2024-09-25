import React from 'react'

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 container py-10">
      <div className='w-full h-[800px] flex flex-col gap-4'>
        <div className='h-full w-full flex flex-col rounded-2xl gap-4'>
          <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#333] animate-pulse'>
          </div>
          <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#333] animate-pulse'>
          </div>
        </div>
        <div className='h-1/2 md:h-full w-full rounded-3xl bg-gray-300 dark:bg-[#333] animate-pulse'>
        </div>
      </div>
      <div className='w-full h-[800px] flex flex-col gap-4'>
        <div className='h-3/5 w-full flex rounded-3xl gap-4'>
          <div className='h-full w-full flex flex-col rounded-3xl gap-4'>
            <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#333] animate-pulse'>
            </div>
            <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#333] animate-pulse'>
            </div>
          </div>
          <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#333] animate-pulse'>
          </div>
        </div>
        <div className='h-2/5 w-full rounded-3xl bg-gray-300 dark:bg-[#333] animate-pulse'>
        </div>
      </div>
    </div>
  )
}

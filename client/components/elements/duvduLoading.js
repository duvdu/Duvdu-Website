import { connect } from "react-redux";
import React from 'react';
const ProfileCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm p-6 bg-gray-200 dark:[#1f1f1f] rounded-[40px] space-y-4">
      {/* Profile Image */}
      <div className="flex items-center space-x-2">
        <div className="bg-gray-300 dark:bg-[#444] rounded-full h-20 w-20 animate-pulse"></div>
        <div className="space-y-2 text-center">
          <div className="bg-gray-300 dark:bg-[#444] h-6 w-32 mx-auto rounded-lg animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-[#444] h-4 w-24 mx-auto rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Profile Info */}

      {/* Badge Row */}
      <div className="flex justify-around mt-4">
        <div className="bg-gray-300 dark:bg-[#444] h-8 w-16 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-[#444] h-8 w-16 rounded-lg animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-[#444] h-8 w-16 rounded-lg animate-pulse"></div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-around mt-4">
        <div className="text-center">
          <div className="bg-gray-300 dark:bg-[#444] h-4 w-8 mx-auto animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-[#444] h-4 w-12 mx-auto animate-pulse mt-2"></div>
        </div>
        <div className="text-center">
          <div className="bg-gray-300 dark:bg-[#444] h-4 w-8 mx-auto animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-[#444] h-4 w-12 mx-auto animate-pulse mt-2"></div>
        </div>
        <div className="text-center">
          <div className="bg-gray-300 dark:bg-[#444] h-4 w-8 mx-auto animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-[#444] h-4 w-12 mx-auto animate-pulse mt-2"></div>
        </div>
      </div>

      {/* Toggle/Status */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <div className="bg-gray-300 dark:bg-[#444] h-4 w-20 rounded-lg animate-pulse"></div>
      </div>

      {/* About Section */}
      <div className="mt-4">
        <div className="bg-gray-300 dark:bg-[#444] h-4 w-16 mx-auto animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-[#444] h-4 w-48 mx-auto animate-pulse mt-2"></div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="bg-gray-300 dark:bg-[#444] h-12 w-12 rounded-full animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-[#444] h-12 w-12 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

const ProfileProjectsSkeleton = () => {
  return (
    <div className="project-grid gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className={`animate-pulse ${(index + 1) % 4 < 2?'profile-project !bg-gray-200 !dark:[#1f1f1f] big w-full xl:w-68% cursor-pointer relative' : 'profile-project !bg-gray-200 !dark:[#1f1f1f] small w-48% xl:w-28% cursor-pointer relative'}`}></div>
      ))}
    </div>
  );
};

const SkeletonDashboard = () => {
  return (
    <div className="flex gap-4 container py-10">
      <div className='w-full h-[800px] flex flex-col gap-4'>
        <div className='h-full w-full flex flex-col rounded-2xl gap-4'>
          <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#444] animate-pulse'>
          </div>
          <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#444] animate-pulse'>
          </div>
        </div>
        <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#444] animate-pulse'>
        </div>
      </div>
      <div className='w-full h-[800px] flex flex-col gap-4'>
        <div className='h-3/5 w-full flex rounded-3xl gap-4'>
          <div className='h-full w-full flex flex-col rounded-3xl gap-4'>
            <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#444] animate-pulse'>
            </div>
            <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#444] animate-pulse'>
            </div>
          </div>
          <div className='h-full w-full rounded-3xl bg-gray-300 dark:bg-[#444] animate-pulse'>
          </div>
        </div>
        <div className='h-2/5 w-full rounded-3xl bg-gray-300 dark:bg-[#444] animate-pulse'>
        </div>
      </div>
    </div>
  );
};
const SkeletonCards = () => {
  return (
    <div className="flex space-x-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="w-full animate-pulse">
            {/* Image Section */}
            <div className="relative rounded-3xl bg-gray-300 dark:bg-[#444] w-full h-64 mb-4">
            </div>
            {/* User Info */}
            <div className='flex justify-between items-center w-full'>
              <div className="flex items-center mb-2">
                {/* Profile Image */}
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:[#1f1f1f] mr-2"></div>
                {/* Name */}
                <div className="w-16 h-4 bg-gray-200 dark:[#1f1f1f] rounded"></div>
              </div>
              {/* Rating */}
              <div className="flex items-center h-full">
                <div className="h-4 w-4 bg-gray-200 dark:[#1f1f1f] rounded-full"></div>
                <div className="h-4 w-8 bg-gray-200 dark:[#1f1f1f] rounded ml-2"></div>
              </div> 
            </div> 
            {/* Title */}
            <div className="h-4 bg-gray-200 dark:[#1f1f1f] rounded mb-2"></div>
            {/* Price */}
            <div className="h-4 bg-gray-200 dark:[#1f1f1f] rounded w-24 mb-2"></div>
            
        </div>
      ))}
    </div>
  );
};
const SkeletonCategory = () => {
  return (
    <div className="container">
    <div className="flex justify-center items-center space-x-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-gray-200 dark:[#1f1f1f] rounded-2xl overflow-hidden w-full">
          {/* Image Skeleton */}
          <div className={`h-96 bg-gray-200 dark:[#1f1f1f] animate-pulse`}></div>
        </div>
      ))}
    </div>
    </div>
  );
};

const SkeletonTag = () => {
  return (
    <div className="container">
    <div className="flex justify-center items-center space-x-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-gray-200 dark:[#1f1f1f] rounded-lg overflow-hidden w-full">
          {/* Image Skeleton */}
          <div className="h-24 bg-gray-200 dark:[#1f1f1f] animate-pulse"></div>
        </div>
      ))}
    </div>
    </div>
  );
};

const SkeletonProject = () => {
  return (
    <div className="container">
    <div className='py-10 space-y-6'>
      {/* Project Title & Profile */}
      <div className="h-4 bg-gray-200 dark:[#1f1f1f] rounded w-36 animate-pulse"></div>
      <div className="flex items-center space-x-4">
        {/* Profile Image Skeleton */}
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:[#1f1f1f] animate-pulse"></div>

        {/* Text skeleton */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-4 bg-gray-200 dark:[#1f1f1f] rounded w-24 animate-pulse"></div>
          {/* Subtitle */}
          <div className="h-4 bg-gray-200 dark:[#1f1f1f] rounded w-16 animate-pulse"></div>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:[#1f1f1f] animate-pulse"></div>
      </div>
      <div className="h-4 bg-gray-200 dark:[#1f1f1f] rounded w-36 animate-pulse"></div>

      {/* Large Image Skeleton */}
      <div className='grid grid-cols-4 gap-5 w-full'>
        <div className="col-span-3 grid grid-rows-3 gap-5">
          <div className="row-span-2 bg-gray-200 dark:[#1f1f1f] rounded-[30px] animate-pulse" />
          <div className="bg-gray-200 dark:[#1f1f1f] rounded-[30px] animate-pulse" />
        </div>
        <div className="col-span-1 bg-gray-200 dark:[#1f1f1f] rounded-[30px] animate-pulse h-[800px]"></div>
      </div>
    </div>
    </div>
  );
};

const DuvduLoading = ({ loadingIn, api, test = false, type }) => {
  return (
    <>
      {(api?.loading && api?.req === loadingIn || loadingIn === '') && (
          (() => {
            switch (type) {
              case "project":
                return <SkeletonProject />;
              case "projects":
                return <SkeletonCards />;
              case "category":
                return <SkeletonCategory />;
              case "tag":
                return <SkeletonTag />;
              case "dashboard":
                return <SkeletonDashboard />;
              case "profileProjects":
                return <ProfileProjectsSkeleton />;
              case "profileCard":
                return <ProfileCardSkeleton />;
              default:
                return <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-primary rounded-full m-2 mx-auto" />
            }
          })()
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  api: state.api,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DuvduLoading);

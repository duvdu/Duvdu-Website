import { connect } from "react-redux";
import React from 'react';
import ChatSkeleton from "../skeletons/ChatSkeleton";
import ProjectSkeleton from "../skeletons/ProjectSkeleton";
import CardsSkeleton from "../skeletons/CardsSkeleton";
import CategorySkeleton from "../skeletons/CategorySkeleton";
import TagSkeleton from "../skeletons/TagSkeleton";
import DashboardSkeleton from "../skeletons/DashboardSkeleton";
import ProfileProjectsSkeleton from "../skeletons/ProfileProjectsSkeleton";
import ProfileCardSkeleton from "../skeletons/ProfileCardSkeleton";
import ContractSkeleton from "../skeletons/ContractSkeleton";
import OTPSkeleton from "../skeletons/OTPSkeleton";
import ContractDetailsSkeleton from "../skeletons/ContractDetailsSkeleton";
import NotificationSkeleton from "../skeletons/NotificationSkeleton";


const DuvduLoading = ({ loadingIn, api, test = false, type }) => {
  return (
    <>
      {(api?.loading && api?.req === loadingIn || loadingIn === '') && (
          (() => {
            switch (type) {
              case "project":
                return <ProjectSkeleton />;
              case "projects":
                return <CardsSkeleton />;
              case "category":
                return <CategorySkeleton />;
              case "tag":
                return <TagSkeleton />;
              case "dashboard":
                return <DashboardSkeleton />;
              case "profileProjects":
                return <ProfileProjectsSkeleton />;
              case "profileCard":
                return <ProfileCardSkeleton />;
              case "chat":
                return <ChatSkeleton />;
              case "contract":
                return <ContractSkeleton />;
              case "otp":
                return <OTPSkeleton />;
              case "contractDetails":
                return <ContractDetailsSkeleton />;
              case "notification":
                return <NotificationSkeleton />;
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

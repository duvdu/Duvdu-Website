import Link from "next/link";
import Icon from "../../Icons";
import Selector from "../../elements/CustomSelector";
import RatingProject from "../../popsup/ratingProject";
import { OpenPopUp } from "../../../util/util";
import ReportProject from "../../popsup/report-project";
import { connect } from "react-redux";

const Header = ({ data, islogin,toggleDrawerAddFav }) => {

    const handleDropdownSelect = (v) => {
        if (!islogin) {
            OpenPopUp("registration-required")
            return
        }
        if (v == "Rate") OpenPopUp("Rating-project")
        else if (v == "Report") OpenPopUp("report-project2")
    };

    return (
        <>
            <RatingProject data={data} />
            {islogin &&
                <ReportProject data={data} />
            }
            <h1 className="text-xl capitalize opacity-80 font-bold">
                {data?.name || data?.studioName}
            </h1>
            <div className="creator-info flex mt-6 mb-6 justify-between">
                <Link href={`/creative/${data?.user?.username || ''}`}>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img
                            alt="user"
                            className="w-16 aspect-square rounded-full object-cover object-top"
                            src={data?.user?.profileImage || process.env.DEFAULT_PROFILE_PATH}
                        />
                        <div>
                            <span className="capitalize font-semibold text-lg">
                                {data?.user?.name || 'NONE'}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                                <p>{data?.user?.totalRates || 0}</p>
                                <Icon className="text-primary size-4" name="star" />
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="flex gap-2">
                <div className="block sm:hidden">
                    <div onClick={toggleDrawerAddFav} className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33]  flex justify-center items-center w-14 h-14 cursor-pointer">
                        <Icon className="text-black dark:text-white" name="plus" />
                    </div>
                </div>
                <Selector
                    options={[
                        {
                            value: "Rate",
                        },
                        {
                            value: "Report",
                        },
                    ]}
                    onSelect={handleDropdownSelect}
                    className="relative border rounded-full border-[#00000033] dark:border-[#FFFFFF33] flex justify-center items-center w-14 h-14 cursor-pointer"
                />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    islogin: state.auth.login,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

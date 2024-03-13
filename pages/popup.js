
import Layout from '../components/layout/Layout';
import PostAlarm from '../components/popsup/PostAlarm';
import Popup from '../components/popsup/verify';
import Subscribe from '../components/popsup/subscribe';
import AddToTeam from '../components/popsup/AddToTeam';
import Report from '../components/popsup/report';
import Report2 from '../components/popsup/report-project';
import ThanksMSG from '../components/popsup/thanksMSG';
import Report_sent_successfully from '../components/popsup/Report_sent_successfully';
import Clients from '../components/popsup/clients';
import Uploading from '../components/popsup/uploading_project_files';
import Receive from '../components/popsup/receive_project_files';
import QrCode from '../components/popsup/QR_code';
import Rating from '../components/popsup/rating';
import Share from '../components/popsup/Share';
import ProjectDetils from '../components/popsup/project-details';
import UploadFilesTeam from '../components/popsup/uploadFilesTeam';
import HourWorks from '../components/popsup/hourWorks';
import ChooseCategory from '../components/popsup/chooseCategory';
import Dashboard from '../components/popsup/dashboard';
import DeleteBoard from '../components/popsup/DeleteBoard';
import EditProfile from '../components/popsup/EditProfile';
import CreatenewBoard from '../components/popsup/createnewBoard';
import Formsubmitted from '../components/popsup/formsubmitted';
import Reportproject from '../components/popsup/report-project';



function Test() {

    return (
        <>
            <Layout>
                <div className='container'>
                    <div className='flex flex-wrap w-full gap-1 mt-4'>
                        <BTN target='registration-required'> Dashboard </BTN>
                        <BTN target='delete-board'> DeleteBoard </BTN>
                        <BTN target='edit-details'> EditProfile </BTN>
                        <BTN target='create-new-board'> CreatenewBoard </BTN>
                        <BTN target='form-submitted'> Formsubmitted </BTN>
                        <BTN target='report-project2'> Reportproject </BTN>
                        <BTN target='subscribe-notfree'> Subscribe </BTN>
                        <BTN target='subscribe-free'> free Subscribe </BTN>
                        <BTN target='alarm'> PostAlarm </BTN>
                        <BTN target='verify'> Verify </BTN>
                        <BTN target='add-to-team'> AddToTeam </BTN>
                        <BTN target='report-project'> Report </BTN>
                        <BTN target='report-project2'> Report 2 </BTN>
                        <BTN target='thanks-meesage'> ThanksMSG </BTN>
                        <BTN target='Report-sent-successfully'> Report sent successfully </BTN>
                        <BTN target='clients'> clients </BTN>
                        <BTN target='uploading_project_files'> Uploading Project Files </BTN>
                        <BTN target='receive_project_files'> Receive Project Files </BTN>
                        <BTN target='QR-code'> QR code </BTN>
                        <BTN target='Rating'> Rating </BTN>
                        <BTN target='Share'> Share </BTN>
                        <BTN target='project-details'> Project Details </BTN>
                        <BTN target='team_uploading_files'> upload files </BTN>
                        <BTN target='work-hour'> hours work </BTN>
                        <BTN target='add-post'> add post </BTN>
                    </div>


                    {/* <Dashboard /> */}
                    <DeleteBoard />
                    <EditProfile />
                    <CreatenewBoard />
                    <Formsubmitted />
                    <Reportproject />
                    <Subscribe />
                    <Subscribe isfree={true} />
                    <PostAlarm />
                    <Popup />
                    <AddToTeam />
                    <Report />
                    <Report2 />
                    <ThanksMSG />
                    <Report_sent_successfully />
                    <Clients />
                    <Uploading />
                    <Receive />
                    <QrCode />
                    <Rating />
                    <Share />
                    <ProjectDetils />
                    <UploadFilesTeam />
                    <HourWorks />
                    <ChooseCategory />
                </div>
              
            </Layout>
        </>
    );
}

const BTN = ({ target, children, ...rest }) => <button {...rest} className='bg-green-700 p-3 rounded-xl text-white' data-popup-toggle="popup" data-popup-target={target}> {children} </button>


export default Test;

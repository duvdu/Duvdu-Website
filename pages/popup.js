
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
import React, { useState } from 'react';

function Test() {
    const [openShare, setIsopenShare] = useState(false);

    return (
        <>
            <Layout>
                <div className='container'>
                    <div className='flex flex-col w-80'>
                        <BTN target='subscribe-notfree'> Subscribe </BTN>
                        <BTN target='subscribe-free'> free Subscribe </BTN>
                        <BTN target='alarm'> PostAlarm </BTN>
                        <BTN target='verify'> Verify </BTN>
                        <BTN target='add-to-team'> AddToTeam </BTN>
                        <BTN target='report-project'> Report </BTN>
                        <BTN target='report-project2'> Report 2 </BTN>
                        <BTN target='thanks-meesage'> ThanksMSG </BTN>
                        <BTN target='Report-sent-successfully'> Report sent successfully </BTN>
                        <BTN target='uploading_project_files'> Uploading Project Files </BTN>
                        <BTN target='receive_project_files'> Receive Project Files </BTN>
                        <BTN target='QR-code'> QR code </BTN>
                        <BTN target='Rating'> Rating </BTN>
                    </div>


                    <Subscribe  />
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
            
                    
                </div>
            </Layout>
        </>
    );
}

const BTN = ({target , children,...rest}) => <button {...rest} className='bg-green-700 p-3 mt-1 rounded-xl text-white' data-popup-toggle="popup" data-popup-target={target}> {children} </button>


export default Test;

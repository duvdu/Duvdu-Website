import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import ContactUs from './../components/elements/contactus';


const ContactUsPage = ({ CreateTicket, user, api,respond }) => {
    return (
        <ContactUs/>
    );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsPage);


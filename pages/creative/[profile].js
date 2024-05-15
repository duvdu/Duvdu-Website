import Layout from '../../components/layout/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import AddPost from '../../components/popsup/addpost';
import { connect } from "react-redux";

import Myprofile from '../../components/pages/profile/myprofile';
import OtherProfile from '../../components/pages/profile/otherProfile';
import { getOtherprofile } from '../../redux/action/apis/auth/profile/getOtherProfile';

function Profile({ username }) {

    const route = useRouter()
    const { profile } = route.query
    return (
        <Layout>
            {profile === username &&
                <Myprofile />
            }
            {profile != username &&
                <OtherProfile />
            }
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    username: state.auth.username,
});

export default connect(mapStateToProps)(Profile);
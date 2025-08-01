import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from '../components/layout/Layout';
import { GetPageDetails } from '../redux/action/apis/pages/getAll';
import DuvduLoading from '../components/elements/duvduLoading';

const Page = ({ GetPageDetails , page_respond  }) => {
    const [page, setPage] = useState('');
    useEffect(() => {
        GetPageDetails('refund-policy')
    }, [])
    useEffect(() => {
        if(page_respond?.data)
            setPage(page_respond.data?.content)
    }, [page_respond?.message])
    return (
        <>
        <Layout>
        {page_respond?.loading?
            <div className='container py-10 flex justify-center items-center h-[50vh]'>
            <DuvduLoading loadingIn={""} type='page'/>
            </div>:

            <div className='container py-10 min-h-[50vh]'>
                <h1 className='text-2xl font-bold'>{page_respond?.data?.title}</h1>
                <section className='termsBody mt-8 text-lg font-medium' dangerouslySetInnerHTML={{ __html: page }} />
            </div>
            }
        </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    page_respond: state.api.GetPageDetails
});

const mapDispatchToProps = {
    GetPageDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);


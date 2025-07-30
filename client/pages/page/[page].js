import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from '../../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { GetPage } from '../../redux/action/apis/pages/get';
import { useRouter } from 'next/router';
import DuvduLoading from '../../components/elements/duvduLoading';

const Page = ({ GetPage , page_respond  }) => {
    const router = useRouter();
    const { page: pageId } = router.query;
    const [page, setPage] = useState('');
    useEffect(() => {
        if(pageId)
        GetPage(pageId)
    }, [pageId])
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
    page_respond: state.api.GetPage
});

const mapDispatchToProps = {
    GetPage
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);


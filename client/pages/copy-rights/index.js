import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Filter from "../../components/elements/filter";
import CopyRigtherBooking from "../../components/drawer/book/copyRigtherBooking";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetCopyrights } from '../../redux/action/apis/cycles/copywriter/get';
import { useRouter } from 'next/router';
import CopyRightCard from '../../components/pages/copy-writeer/copyRightCard';
import { OpenPopUp } from '../../util/util';
import { useTranslation } from 'react-i18next';

import EmptyComponent from './../../components/pages/contracts/emptyComponent';
import DuvduLoading from '../../components/elements/duvduLoading';




const Permit = ({ GetCopyrights, respond, api, islogin }) => {
    const { t } = useTranslation();
    const Router = useRouter();
    const showLimit = 12;
    const page = 1;
    const searchTerm = Router.query.search;
    const { subcategory, tag } = Router.query

    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});
    const CopyRight = respond?.data

    const pagganation = respond?.pagination

    useEffect(() => {
        if (limit)
            GetCopyrights({ limit: limit, search: searchTerm?.length > 0 ? search : searchTerm, page: page, subcategory: subcategory, tag: tag })
    }, [limit, subcategory, tag])

    const targetRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (pagganation?.totalPages > page) {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || window.innerHeight;
                const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

                if (scrolledToBottom) {
                    setLimit(prevPage => showLimit + limit);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, pagganation?.totalPages]);


    const handlesetdata = (item) => {
        if (islogin) {
            setdata(item)
            setIsOpen(!isOpen);
        }
        else {
            OpenPopUp("registration-required")
        }
    };
    const toggleDrawer = () => {
        setIsOpen(!isOpen);

    };

    return (
        <>
            <Layout>
                <section className="mt-12 mb-12">
                    <div className="container mb-30">
                        <Filter />
                        {CopyRight?.length === 0 ?
                            <EmptyComponent message="No CopyRight Now" /> :
                            <h1 className="page-header my-6">{t("most popular on duvdu")}</h1>
                        }
                        <div className="minmax-360">
                            {CopyRight?.map((item, i) =>
                                <CopyRightCard key={i} onClick={() => handlesetdata(item)} cardData={item} />
                            )}
                        </div>
                        <DuvduLoading loadingIn={"GetCopyrights"}/>
                        <Formsubmited />
                    </div>
                </section>
                {
                    islogin &&
                    <CopyRigtherBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
                }
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    islogin: state.auth.login,
    respond: state.api.GetCopyrights,
});

const mapDispatchToProps = {
    GetCopyrights
};
export default connect(mapStateToProps, mapDispatchToProps)(Permit);
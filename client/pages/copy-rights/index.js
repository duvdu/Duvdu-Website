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
import RelatedCategories from "../../components/elements/relatedCategories";


const Permit = ({ GetCopyrights, respond, api, isLogin  , user}) => {
    const { t } = useTranslation();
    const Router = useRouter();
    const showLimit = 12;
    const page = 1;
    const [QueryString, setQueryString] = useState()
    const [switchState, setSwitchState] = useState({
        instantProject: false,
        priceInclusive: undefined ,
    });

    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});
    const [localCopyRights, setLocalCopyRights] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const CopyRight = respond?.data

    const pagganation = respond?.pagination

    const searchTerm = Router.query.search;
    const { category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords } = Router.query
    const { asPath } = Router;

    // Remove leading slash
    const path = asPath.startsWith('/') ? asPath.substring(1) : asPath;

    // Extract the path part of the URL
    const cycle = path.split('?')[0];


    const Queries = () => {

        if (limit) {
            const params = {
                limit: limit,
                page: page,
            };

            // Add search parameter if search term is defined and not empty
            if (searchTerm?.length > 0) {
                params.search = searchTerm;
            }

            // Include the query parameters from the URL if they exist
            if (category) params.category = category;
            if (subCategory) params.subCategory = subCategory;
            if (tag) params.tag = tag;
            if (priceFrom) params.priceFrom = priceFrom;
            if (priceTo) params.priceTo = priceTo;
            if (duration) params.duration = duration;
            if (instant !== undefined) params.instant = instant;
            if (inclusive !== undefined) params.inclusive = inclusive;
            if (keywords) params.search = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();
            return queryString    
        }
    }
    useEffect(() => {
        if (limit) {
            // Call GetCopyrights with the constructed query string
            if(Queries()&& Router.isReady){
                setLocalCopyRights([])
                setLimit(showLimit)
                setQueryString(Queries())
                GetCopyrights(Queries());
            }
        }
    }, [ searchTerm, page, category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords]);
    useEffect(() => {
        if (limit) {
            // Call GetCopyrights with the constructed query string
            if(Queries()&& Router.isReady){
                setLocalCopyRights([])
                setLimit(showLimit)
                setQueryString(Queries())
                GetCopyrights(Queries());
            }
        }
    }, [limit]);

    useEffect(() => {
        if (CopyRight) {
            if (limit === showLimit) {
                setLocalCopyRights(CopyRight);
            } else {
                setLocalCopyRights(prev => [...prev, ...CopyRight.slice(prev.length)]);
            }
            setIsLoadingMore(false);
        }
    }, [CopyRight]);

    useEffect(() => {
        const handleScroll = () => {
            if (pagganation?.totalPages > page) {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || window.innerHeight;
                const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

                if (scrolledToBottom && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setLimit(prevPage => showLimit + prevPage);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, pagganation?.totalPages, isLoadingMore]);


    const handlesetdata = (item) => {
        if (isLogin) {
            if(!user.faceRecognition){
                OpenPopUp("face-verification");
            }else{
                setdata(item)
                setIsOpen(!isOpen);
            }
        }
        else {
            OpenPopUp("registration-required")
        }
    };
    const toggleDrawer = () => {
        setIsOpen(!isOpen);

    };
    const setParams = (queryString) => {
        Router.push(`/${cycle}?${queryString}`);
    };



    return (
        <>
            <Layout>
                <section className="mt-12 mb-12">
                    <div className="container mb-30">

                    <Filter setSwitchState={setSwitchState} switchState={switchState} cycle={cycle} setParams={setParams} />
                    <div className="h-7" />
                    {/* {<RelatedCategories className=" col-span-full" />} */}
                        {CopyRight?.length === 0 ?
                            <div className='mt-4'>
                                <EmptyComponent message="No CopyRight Now" />
                            </div> :
                            <h1 className="page-header  pb-9">{t("most popular on duvdu")}</h1>
                        }
                        {(respond?.loading && localCopyRights?.length === 0) ?
                            <DuvduLoading loadingIn={""} type='category'/> :    
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {localCopyRights?.map((item, i) =>
                                    <CopyRightCard QueryString={QueryString} key={i} onClick={() => handlesetdata(item)} cardData={item} />
                                )}
                            </div>
                        }
                        {isLoadingMore && <div className='mt-5'><DuvduLoading loadingIn={""} type='category'/></div>}
                        <Formsubmited />
                    </div>
                </section>
                {
                    isLogin === true &&
                    <CopyRigtherBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
                }
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    isLogin: state.auth.login,
    respond: state.api.GetCopyrights,
    user: state.user.profile,
});

const mapDispatchToProps = {
    GetCopyrights
};
export default connect(mapStateToProps, mapDispatchToProps)(Permit);
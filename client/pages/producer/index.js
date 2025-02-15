import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Filter from "../../components/elements/filter";
import ProducerBooking from "../../components/drawer/book/producer";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetProducer } from '../../redux/action/apis/cycles/producer/get';
import { calculateRating, OpenPopUp } from '../../util/util';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';
import ProducerCard from '../../components/pages/producer/producerCard';
import EmptyComponent from '../../components/pages/contracts/emptyComponent';
import Loading from '../../components/elements/duvduLoading';
import DuvduLoading from '../../components/elements/duvduLoading';
import { GetPlatforms } from '../../redux/action/apis/cycles/producer/platform';
import RelatedCategories from "../../components/elements/relatedCategories";

const Producers = ({ GetProducer,platform,GetPlatforms, respond, api, isLogin , user }) => {
    const { t } = useTranslation();
    const [localProducers, setLocalProducers] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const producers = respond?.data
    const pagganation = respond?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});
    const [switchState, setSwitchState] = useState({
        instantProject: false,
        priceInclusive: undefined,
    });

    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords , Platforms  } = Router.query

    const { asPath } = Router;
    // Remove leading slash
    const path = asPath.startsWith('/') ? asPath.substring(1) : asPath;

    // Extract the path part of the URL
    const cycle = path.split('?')[0];

    useEffect(()=>{
        GetPlatforms({search:[]})
    },[])
    useEffect(() => {
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
            if (Platforms){
                const arr =  Platforms.split(',')
                arr.forEach((platform, index) => {
                    params[`platforms[${index}]`] = platform;
                }); 
            } 
            if (tag) params.tag = tag;
            if (priceFrom) params.minBudget = priceFrom;
            if (priceTo) params.maxBudget = priceTo;
            if (duration) params.duration = duration;
            if (instant) params.instant = instant;
            if (inclusive) params.inclusive = inclusive;
            if (keywords) params.search = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            GetProducer(queryString);
        }
    }, [limit, searchTerm, page, category, Platforms, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive, keywords]);

    useEffect(() => {
        if (producers) {
            if (limit === showLimit) {
                setLocalProducers(producers);
            } else {
                setLocalProducers(prev => [...prev, ...producers.slice(prev.length)]);
            }
            setIsLoadingMore(false);
        }
    }, [producers]);

    useEffect(() => {
        const handleScroll = () => {
            if (pagganation?.totalPages > page) {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || window.innerHeight;
                const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

                if (scrolledToBottom && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setLimit(prev => showLimit + prev);
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

                        {localProducers?.length > 0 &&
                            <h1 className="page-header my-6">{t("most popular on duvdu")}</h1>
                        }

                        {producers && producers.length === 0 &&
                            <EmptyComponent message="No Producers Now" />
                        }
                        {(respond?.loading && localProducers?.length === 0) ? 
                            <DuvduLoading loadingIn={""} type='category'/> 
                        :    
                            <div className="grid minmax-360">
                                {localProducers?.map((item, i) =>
                                    <ProducerCard onClick={() => handlesetdata(item)} key={i} cardData={item} />
                                )}
                            </div>
                        }
                        {isLoadingMore && <div className='mt-5'><DuvduLoading loadingIn={""} type='category'/></div>}
                        <Formsubmited />
                    </div>
                </section>
                {isLogin === true &&
                    <ProducerBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />}

            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.GetProducer,
    isLogin: state.auth.login,
    platform: state.api.GetPlatforms,
    user: state.user.profile,
});

const mapDispatchToProps = {
    GetProducer,
    GetPlatforms
};
export default connect(mapStateToProps, mapDispatchToProps)(Producers);
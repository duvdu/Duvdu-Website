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

const Producers = ({ GetProducer, respond, api, islogin }) => {
    const { t } = useTranslation();
    const producers = respond?.data
    const pagganation = respond?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});

    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { category, subCategory, tag, minBudget, maxBudget, duration, instant, inclusive, keywords } = Router.query

    const { asPath } = Router;

    // Remove leading slash
    const path = asPath.startsWith('/') ? asPath.substring(1) : asPath;

    // Extract the path part of the URL
    const cycle = path.split('?')[0];


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
            if (tag) params.tag = tag;
            if (minBudget) params.minBudget = minBudget;
            if (maxBudget) params.maxBudget = maxBudget;
            if (duration) params.duration = duration;
            if (instant) params.instant = instant;
            if (inclusive) params.inclusive = inclusive;
            if (keywords) params.keywords = keywords;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            GetProducer(queryString);
        }
    }, [limit, searchTerm, page, category, subCategory, tag, minBudget, maxBudget, duration, instant, inclusive, keywords]);


    useEffect(() => {
        const handleScroll = () => {
            if (pagganation?.totalPages > page) {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                const clientHeight = document.documentElement.clientHeight || window.innerHeight;
                const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

                if (scrolledToBottom) {
                    setLimit(showLimit + limit);
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

    const handleFilterChange = (selectedFilters) => {

        // Initialize params object
        const params = {};
        
        selectedFilters.forEach(filter => {
            switch (filter.name) {
                case "Category":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.category = filter.data.join(',');
                    }
                    break;
                case "Sub-category":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.subCategory = filter.data.join(',');
                    }
                    break;
                case "Tags":
                    // Check if filter.data exists and is not empty
                    if (filter.data && filter.data.length > 0) {
                        params.tag = filter.data.join(',');;
                    }
                    break;
                case "Budget Range":
                    // Check if filter.data and filter.data.data exist
                    if (filter.data && filter.data) {
                        // Extract numeric values from the budget range string
                        const { min: priceFrom, max: priceTo } = filter.data;
                        // Assign values to params
                        if (minBudget) params.minBudget = minBudget;
                        if (maxBudget) params.maxBudget = maxBudget;
                    }
                    break;
                case "Duration":
                    // Check if filter.data and filter.data.data exist
                    if (filter.data && filter.data) {
                        params.duration = filter.data; // Assuming data is like "Duration: 10 days"
                    }
                    break;
                case "instantProject":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.instant = filter.data;
                    }
                    break;
                case "priceInclusive":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.inclusive = filter.data;
                    }
                    break;
                case "keywords":
                    // Handle the case where filter.data might be undefined
                    if (filter.data) {
                        params.keywords = filter.data.join(',');
                    }
                default:
                    break;
            }
        });

        // Update query parameters with selected filters
        const queryString = new URLSearchParams({
            ...params,
            // limit: limit,
            // page: page,
        }).toString();

        // Call GetCopyrights with updated query string
        Router.push(`/${cycle}?${queryString}`);

    };

    return (
        <>
            <Layout>
                <section className="mt-12 mb-12">
                    <div className="container mb-30">

                        <Filter cycle={cycle} onFilterChange={handleFilterChange} />
                        
                        {producers?.length > 0 &&
                            <h1 className="page-header my-6">{t("most popular on duvdu")}</h1>
                        }

                        {producers && producers.length === 0 &&
                            <EmptyComponent message="No Producers Now" />
                        }
                        <div className="grid minmax-360">
                            {producers?.map((item, i) =>
                                <ProducerCard onClick={() => handlesetdata(item)} key={i} cardData={item} />
                            )}
                        </div>
                        <DuvduLoading loadingIn={"GetProducer"} />
                        <Formsubmited />
                    </div>
                </section>
                {islogin &&
                    <ProducerBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />}

            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.GetProducer,
    islogin: state.auth.login,
});

const mapDispatchToProps = {
    GetProducer
};
export default connect(mapStateToProps, mapDispatchToProps)(Producers);
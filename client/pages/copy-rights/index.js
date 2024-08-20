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

    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});
    const CopyRight = respond?.data

    const pagganation = respond?.pagination

    const searchTerm = Router.query.search;
    const { category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive } = Router.query
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
            if (priceFrom) params.priceFrom = priceFrom;
            if (priceTo) params.priceTo = priceTo;
            if (duration) params.duration = duration;
            if (instant !== undefined) params.instant = instant;
            if (inclusive !== undefined) params.inclusive = inclusive;

            // Construct query string from params object
            const queryString = new URLSearchParams(params).toString();

            // Call GetCopyrights with the constructed query string
            GetCopyrights(queryString);
        }
    }, [limit, searchTerm, page, category, subCategory, tag, priceFrom, priceTo, duration, instant, inclusive]);



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
                        if (priceFrom) params.priceFrom = priceFrom;
                        if (priceTo) params.priceTo = priceTo;
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

                        {CopyRight?.length === 0 ?
                        <div className='mt-4'>
                            <EmptyComponent message="No CopyRight Now" />
                        </div> :
                            <h1 className="page-header my-6">{t("most popular on duvdu")}</h1>
                        }
                        <div className="minmax-360">
                            {CopyRight?.map((item, i) =>
                                <CopyRightCard key={i} onClick={() => handlesetdata(item)} cardData={item} />
                            )}
                        </div>
                        <DuvduLoading loadingIn={"GetCopyrights"} />
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
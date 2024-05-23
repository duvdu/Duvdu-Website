import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Card from "../../components/elements/project-card";
import Filter from "../../components/elements/filter";
import PermitsBooking from "../../components/drawer/book/permits";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetStudios } from '../../redux/action/apis/cycles/studio/get';
import { useRouter } from 'next/router';

const convertDataFormat = (data) => {

    return {
        _id: data._id,
        img: data.user.profileImage ? (data.user.profileImage) : process.env.DEFULT_PROFILE_PATH,  // Default image if null
        name: data.user.name || "NONE",  // Default name if not provided
        location: data.address || "NONE",  // Default location if not provided
        rank: "----",  // Assuming static value for demonstration
        projects: data.user.acceptedProjectsCounter || 0,  // Default projects count if not provided
        rating: calculateRating(data.rate),  // Calculate rating based on available data
        pricing: data.price || 170,  // Default pricing if not provided
        duration: parseInt(data.duration) || 0  // Parse and default duration if not provided
    };
};
const calculateRating = (rate) => {
    if (!rate) return 0
    if (rate.ratersCounter > 0) {
        return rate.totalRates / rate.ratersCounter;
    }
    return 0;
};


const Studios = ({ GetStudio, respond,api }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const producers = respond?.data 
    const pagganation = respond?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const targetRef = useRef(null);

    
    useEffect(() => {
        if (limit)
            GetStudio({ limit: limit, search: searchTerm?.length > 0 ? search : searchTerm, page: page })
    }, [limit])


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


    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState(null);
    


    const handlesetdata = (item) => {
        setdata(item)
        setIsOpen(!isOpen);
    };
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const submit = () => {
        toggleDrawer();
    };

    if(!producers) return
    return (
        <>
            <Layout>
                <section className="mt-12 mb-12">
                    <div className="container mb-30">
                        <Filter />
                        <h1 className="page-header my-6">most popular on duvdu</h1>
                        {producers.length === 0 && (
                            <h3>No projects Found </h3>
                        )}
                        <div className="minmax-360">
                            {producers.map((item, i) => {
                                return <Card onClick={() => handlesetdata(item)} key={i} cardData={item} />;

                            })}
                        </div>
                        <div className="w-0 h-0" />
                        <img className={(api.loading && api.req == "GetStudios" ? "w-10 h-10" : "w-0 h-0") + "load mx-auto transition duration-500 ease-in-out"} ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                        <Formsubmited />
                    </div>
                </section>
                {
                    isOpen &&
                    <PermitsBooking submit={submit} data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
                }
            </Layout>
        </>
    );
};
const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.GetStudios,
});

const mapDispatchToProps = {
    GetStudio: GetStudios
};
export default connect(mapStateToProps, mapDispatchToProps)(Studios);
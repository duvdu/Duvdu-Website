import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Filter from "../../components/elements/filter";
import CopyRigtherBooking from "../../components/drawer/book/copyRigtherBooking";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetCopyrights } from '../../redux/action/apis/cycles/copywriter/get';
import { useRouter } from 'next/router';
import CopyRightCard from '../../components/pages/copy-writeer/copyRightCard';




const Permit = ({ GetCopyrights, respond, api }) => {
    const Router = useRouter();
    const showLimit = 12;
    const page = 1;
    const searchTerm = Router.query.search;
    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});
    const permits = respond?.data || [];

    const pagganation = respond?.pagination

    useEffect(() => {
        if (limit)
            GetCopyrights({ limit: limit, search: searchTerm?.length > 0 ? search : searchTerm, page: page })
    }, [limit])

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
        setdata(item)
        setIsOpen(!isOpen);
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
                        <h1 className="page-header my-6">most popular on duvdu</h1>
                        {permits.length === 0 && (
                            <h3>No projects Found </h3>
                        )}
                        <div className="minmax-360">
                            {permits.map((item, i) => {
                                return <CopyRightCard onClick={() => handlesetdata(item)} key={i} cardData={item} />;

                            })}
                        </div>
                        <img className={(api.loading && api.req == "GetCopyrights" ? "w-10 h-10" : "w-0 h-0") + "load mx-auto transition duration-500 ease-in-out"} ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                        <Formsubmited />
                    </div>
                </section>
                <CopyRigtherBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.GetCopyrights,
});

const mapDispatchToProps = {
    GetCopyrights
};
export default connect(mapStateToProps, mapDispatchToProps)(Permit);
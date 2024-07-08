import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Filter from "../../components/elements/filter";
import ProducerBooking from "../../components/drawer/book/producer";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetProducer } from '../../redux/action/apis/cycles/producer/get';
import { calculateRating } from '../../util/util';
import { useRouter } from 'next/router';
import ProducerCard from '../../components/pages/producer/producerCard';
import EmptyComponent from '../../components/pages/contracts/emptyComponent';

const Producers = ({ GetProducer, respond,api }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const { subcategory, tag } = Router.query
    const producers = respond?.data
    const pagganation = respond?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});


    useEffect(() => {
        if (limit)
            GetProducer({ limit: limit, search: searchTerm?.length > 0 ? search : searchTerm, page: page,subcategory:subcategory,tag:tag })
    }, [limit,subcategory, tag])



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
                        {producers?.length > 0 ?
                            <h1 className="page-header my-6">most popular on duvdu</h1>:
                            <EmptyComponent message="No Producers Now"/>
                        }
                        <div className="grid minmax-360">
                            {producers?.map((item, i) => 
                                <ProducerCard onClick={() => handlesetdata(item)} key={i} cardData={item} />
                            )}
                        </div>
                        <img className={(api.loading && api.req == "GetProducer" ? "w-10 h-10" : "w-0 h-0") + "load mx-auto transition duration-500 ease-in-out"} src="/assets/imgs/loading.gif" alt="loading" />
                        <Formsubmited />
                    </div>
                </section>

                <ProducerBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />

            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.GetProducer,
});

const mapDispatchToProps = {
    GetProducer
};
export default connect(mapStateToProps, mapDispatchToProps)(Producers);
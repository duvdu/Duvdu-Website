import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Filter from "../../components/elements/filter";
import ProducerBooking from "../../components/drawer/book/producer";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetProducer } from '../../redux/action/apis/cycles/producer/get';
import { calculateRating, OpenPopUp } from '../../util/util';
import { useRouter } from 'next/router';
import ProducerCard from '../../components/pages/producer/producerCard';
import EmptyComponent from '../../components/pages/contracts/emptyComponent';
import Loading from '../../components/elements/duvduLoading';
import DuvduLoading from '../../components/elements/duvduLoading';

const Producers = ({ GetProducer, respond,api,islogin }) => {
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
                        {producers?.length > 0 &&
                            <h1 className="page-header my-6">most popular on duvdu</h1>
                        }

                        {producers && producers.length === 0 &&
                            <EmptyComponent message="No Producers Now"/>
                        }
                        <div className="grid minmax-360">
                            {producers?.map((item, i) => 
                                <ProducerCard onClick={() => handlesetdata(item)} key={i} cardData={item} />
                            )}
                        </div>
                        <DuvduLoading loadingIn = {"GetProducer"} />
                        <Formsubmited />
                    </div>
                </section>
                {islogin && 
                <ProducerBooking data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />  }

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
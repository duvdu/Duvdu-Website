import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Card2 from "../../components/elements/permits-card";
import Filter from "../../components/elements/filter";
import Drawer from "../../components/drawer/book/permits";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetCopyrights } from '../../redux/action/apis/cycles/copywriter/get';
import { calculateRating } from '../../util/util';
import { useRouter } from 'next/router';




const Permit = ({ GetCopyrights, respond }) => {
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
                                return <Card2 onClick={() => handlesetdata(item)} key={i} cardData={item} />;

                            })}
                        </div>
                        {
                            permits.length === limit &&
                            <div className="load-parent">
                                <img className="load" ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        }
                        <Formsubmited />
                    </div>
                </section>

                <Drawer data={data} isOpen={isOpen} toggleDrawer={toggleDrawer} />

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
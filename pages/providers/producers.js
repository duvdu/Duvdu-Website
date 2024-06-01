import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Card2 from "../../components/elements/permits-card";
import Filter from "../../components/elements/filter";
import Drawer from "../../components/drawer/book/producer";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetProducer } from '../../redux/action/apis/cycles/producer/get';
import { calculateRating } from '../../util/util';
import { useRouter } from 'next/router';


const convertDataFormat = (data) => {
    
    return {
        _id: data._id,
        img: data.user.profileImage || "/assets/imgs/profile/defultUser.jpg",
        name: data.user.name || "NONE",
        location: data.address || "NONE",
        rank: "----",
        projects: data.user.acceptedProjectsCounter || 0,
        rating: calculateRating(data.rate),
        pricing: data.price || 0,
        duration: parseInt(data.duration) || 0
    };
};

const Producers = ({ GetProducer, respond,api }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const producers = respond?.data || []
    const pagganation = respond?.pagination
    const page = 1;
    const showLimit = 12;
    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState({});
    const [permits, setPermits] = useState([]);

    useEffect(() => {
        if (limit)
            GetProducer({ limit: limit, search: searchTerm?.length > 0 ? search : searchTerm, page: page })
    }, [limit])

    useEffect(() => {
        if (respond) {
            const array = respond.data


            let convertedList = []
            for (let index = 0; index < array.length; index++) {
                const element = convertDataFormat(array[index]);
                convertedList.push(element)
            }
            setPermits(convertedList)
        }
    }, [respond?.message])

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
                        {producers.length === 0 && (
                            <h3>No projects Found </h3>
                        )}
                        <div className="minmax-360">
                            {producers.map((item, i) => {
                                return <Card2 onClick={() => handlesetdata(item)} key={i} cardData={item} />;

                            })}
                        </div>
                        <img className={(api.loading && api.req == "GetProducer" ? "w-10 h-10" : "w-0 h-0") + "load mx-auto transition duration-500 ease-in-out"} ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
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
    respond: state.api.GetProducer,
});

const mapDispatchToProps = {
    GetProducer
};
export default connect(mapStateToProps, mapDispatchToProps)(Producers);
import React, { useRef, useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Card from "../../components/elements/producers-card";
import Filter from "../../components/elements/filter";
import PermitsBooking from "../../components/drawer/book/permits";
import Formsubmited from '../../components/popsup/formsubmited';
import { connect } from 'react-redux';
import { GetStudios } from '../../redux/action/apis/cycles/studio/get';

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


const Projects = ({  GetStudio,respond }) => {
    const showLimit = 24;
    const [limit, setLimit] = useState(showLimit);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setdata] = useState(null);
    const [producers, setProducers] = useState([]);
    

    const targetRef = useRef(null);

    useEffect(() => {
        GetStudio()
    }, [])
    
    useEffect(() => {
        if (respond) {
            const array = respond.data
            
            let convertedList = []
            for (let index = 0; index < array.length; index++) {
                const element = convertDataFormat(array[index]);
                convertedList.push(element)
            }
            setProducers(convertedList)
        }
    }, [respond?.message])
    
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        let hasBeenVisible = false;

        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setLimit((prevLimit) => prevLimit + showLimit);
                    }, 2000);
                    if (targetRef.current) {
                        targetRef.current.classList.add('active');
                    }
                    hasBeenVisible = true;
                    observer.unobserve(entry.target);
                }
                else {
                    if (targetRef.current) {
                        targetRef.current.classList.remove('active');
                    }

                }

            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [limit]);



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
                        {
                            producers.length === limit &&
                            <div className="load-parent">
                                <img className="load" ref={targetRef} src="/assets/imgs/loading.gif" alt="loading" />
                            </div>
                        }
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
    respond: state.api.GetStudio,
});

const mapDispatchToProps = {
    GetStudio: GetStudios
};
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
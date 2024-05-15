import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { animateScroll as scroll } from 'react-scroll';

function LandingPage() {
    const [currentSection, setCurrentSection] = useState(1);

    useEffect(() => {
        const handleScroll = (event) => {
            const sections = ['section1', 'section2', 'section3', 'section4'];
            const direction = Math.sign(event.deltaY);
            const currentScrollPosition = window.pageYOffset;
            for (let i = 0; i < sections.length; i++) {
                const sectionId = sections[i];
                const sectionElement = document.getElementById(sectionId);
                if (direction > 0 && sectionElement.offsetTop > currentScrollPosition) {
                    scroll.scrollTo(sectionElement.offsetTop, {
                        duration: 1000,
                        delay: 0,
                        smooth: 'easeInOutQuad'
                    });
                    setCurrentSection(i + 1);
                    break;
                } else if (direction < 0 && sectionElement.offsetTop >= currentScrollPosition) {
                    // Handling scroll up (negative deltaY)
                    if (i > 0) {
                        const previousSectionElement = document.getElementById(sections[i - 1]);
                        scroll.scrollTo(previousSectionElement.offsetTop, {
                            duration: 1000,
                            delay: 0,
                            smooth: 'easeInOutQuad'
                        });
                        setCurrentSection(i);
                    }
                    break;
                }
            }
        };

        document.addEventListener('wheel', handleScroll);

        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, [currentSection]);


    return (
        <Layout>
            <section id="section1" className="h-screen bg-slate-700"></section>
            <section id="section2" className="h-screen bg-slate-500"></section>
            <section id="section3" className="h-screen bg-slate-700"></section>
            <section id="section4" className="h-screen bg-slate-500"></section>
        </Layout>

    );
}

export default LandingPage;

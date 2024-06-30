import React, { useState } from 'react';

const CustomSwiper = ({ children, isNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="relative w-full flex items-center overflow-hidden">
            {isNavigate &&
                <button onClick={prevSlide} className="absolute left-0 z-10 p-2">
                    &lt;
                </button>}

            <div className="flex transition-transform duration-300 gap-4" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {React.Children.map(children, (child, index) => (
                    <div className={`flex-shrink-0`}>
                        {child}
                    </div>
                ))}
            </div>
            {isNavigate &&
                <button onClick={nextSlide} className="absolute right-0 z-10 p-2">
                    &gt;
                </button>
            }
        </div>
    );
};

export default CustomSwiper;

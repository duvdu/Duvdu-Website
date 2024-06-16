import React, { useEffect, useRef } from 'react';
import Ruler from './Ruls';

function CustomSlider({ initValue = 0, values, onValueChange }) {

    const sliderContainerRef = useRef(null);

    useEffect(() => {
        const sliderContainers = document.querySelectorAll('.slider-container');
        sliderContainers.forEach(container => {
            const slider = container.querySelector('.slider-track');
            const thumb = container.querySelector('.slider-thumb');
            const sliderBefore = container.querySelector('.slider-before');
            const sliderAfter = container.querySelector('.slider-after');
            let isDragging = false;

            const updateSlider = (left) => {
                const sliderRect = slider.getBoundingClientRect();
                left = Math.max(0, Math.min(left, sliderRect.width));
                const part = sliderRect.width / values;
                const stopin = Math.round(left / part) * part;
                thumb.style.left = stopin + 'px';
                sliderAfter.style.left = stopin + 'px';
                sliderAfter.style.width = sliderRect.width - stopin + 'px';
                sliderBefore.style.width = stopin + 'px';
                // setSelectedValue(Math.round(left / part));
                if (typeof onValueChange === 'function') {
                    onValueChange(Math.round(left / part)+initValue);
                }
            };

            if (initValue !== undefined) {
                const sliderRect = slider.getBoundingClientRect();
                const value = (sliderRect.width / values) * initValue;
                updateSlider(value);
            }

            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault();
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    updateSlider(e.clientX - slider.getBoundingClientRect().left);
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });
    }, []);

    return (
        <>
            <div className='border px-4 rounded-3xl'>
            <div className='mt-10'/>
            <div className="slider-container mb-4" ref={sliderContainerRef}>
                <div className="slider-track">
                    <div className="slider-before"></div>
                    <div className="slider-after"></div>
                    <div className="slider-thumb"></div>
                </div>
                <Ruler startIndex={initValue} endIndex={values} />
            </div>
            </div>
        </>
    );
}

export default CustomSlider;

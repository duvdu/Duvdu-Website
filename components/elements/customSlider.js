import React, { useEffect, useRef, useState } from 'react';

function CustomSlider({ initValue = 0, values, onValueChange }) {

    const sliderContainerRef = useRef(null);
    const [value, setValue] = useState();

    useEffect(() => {
        onValueChange?.(value)
    }, [value]);
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
                const part = sliderRect.width / (values - initValue);
                const stopin = Math.round(left / part) * part;
                thumb.style.left = stopin + 'px';
                sliderAfter.style.left = stopin + 'px';
                sliderAfter.style.width = sliderRect.width - stopin + 'px';
                sliderBefore.style.width = stopin + 'px';
                const currentValue = Math.round(left / part) + initValue;
                setValue(currentValue);
            };

            if (initValue !== undefined) {
                const sliderRect = slider.getBoundingClientRect();
                const value = (sliderRect.width / values) * initValue;
                updateSlider(0);
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
                <div className='mt-10' />
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

const Ruler = ({ startIndex = 0, endIndex = 10 }) => {
    endIndex = endIndex * 2 + 1
    startIndex = startIndex * 2 + 1
    const step = (endIndex - startIndex) / 10
    const ruler = Array.from({ length: 11 }, (_, index) => index * step + startIndex);

    return (
        <div className="flex justify-between mt-3">
            {ruler.map((num) => (
                <div key={num} className="flex flex-col items-center opacity-20">
                    <div className="w-[1px] h-1 bg-black" />
                    {num % 2 === 1 && (
                        <span className="text-xs w-0 -translate-x-1">{Math.floor(num / 2)}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CustomSlider;

import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

function CustomSlider({ minimum = 0, initValue = 0, values, onValueChange }) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    onValueChange?.(value);
  }, [value]);

  return (
    <div className="border dark:border-gray-600 px-4 rounded-3xl">
      <div className="mt-10" />
      <div className="slider-container mb-4">
        <ReactSlider
          className="slider"
          thumbClassName="thumb"
          trackClassName="track"
          value={value}
          onChange={(val) => setValue(val)}
          min={minimum}
          max={values}
        />
        <Ruler startIndex={minimum} endIndex={values} />
      </div>
    </div>
  );
}

const Ruler = ({ startIndex, endIndex }) => {
  const step = (endIndex - startIndex) / 10;
  const ruler = Array.from({ length: 11 }, (_, i) => Math.round(i * step + startIndex));
  const unique = [...new Set(ruler)];
  return (
    <div dir="ltr" className="flex justify-between mt-3">
      {unique.map((num) => (
        <div key={num} className="flex flex-col items-center opacity-20">
          <div className="w-[1px] h-1 bg-black" />
          <span className="text-xs w-0 -translate-x-1">{num}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomSlider;

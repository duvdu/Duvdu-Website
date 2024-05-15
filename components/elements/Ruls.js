import React, { useEffect, useRef } from 'react';

const Ruler = () => {
    const ruler = Array.from({ length: 21 }, (_, index) => index + 1);
    return (
        <div className="flex justify-between mt-2">
            {ruler.map((num) => (
                <div key={num} className="flex flex-col items-center opacity-20">
                    <div className="w-[1px] h-1 bg-black" />
                    {
                        num % 2 == 1 &&
                        <span className="text-xs w-0 -translate-x-1">{Math.floor(num / 2)}</span>
                    }
                </div>
            ))}
        </div>
    )
}

export default Ruler;

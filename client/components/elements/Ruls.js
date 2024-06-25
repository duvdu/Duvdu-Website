import React from 'react';

const Ruler = ({ startIndex = 0, endIndex = 10 }) => {
    endIndex = endIndex * 2 + 1
    startIndex = startIndex * 2 + 1
    const ruler = Array.from({ length: endIndex - startIndex + 1 }, (_, index) => index + startIndex);
    
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

export default Ruler;

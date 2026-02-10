import { div } from 'motion/react-client';
import React from 'react';

export default function Packages() {
  const items = ['Slide 1', 'Slide 2', 'Slide 3'];
  return (
    <div className=" h-2/3 bg-white flex justify-center items-center flex-col p-5">
      <div className="h-30 w-3/4 bg-pink-500 flex items-center mb-2">
        <h1 className="text-6xl font-semibold">What we offer!</h1>
      </div>
      <div className="w-3/4 flex justify-center">
        <div className="overflow-x-no-scroll no-scrollbar whitespace-nowrap">
          {items.map((item, index) => (
            <div
              key={index}
              className="inline-block w-74 h-100 bg-[#7e7d88] text-white text-center leading-[10rem] mx-1 rounded"
            >
              <span className="flex w-full h-full justify-center items-center">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

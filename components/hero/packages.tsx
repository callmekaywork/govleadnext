import { div } from 'motion/react-client';
import React from 'react';

export default function Packages() {
  const items = ['Slide 1', 'Slide 2', 'Slide 3'];
  return (
    <div className=" md:min-h-3/4 w-full bg-white flex justify-center items-center flex-col py-5 px-2">
      <div className="h-30 md:w-3/4 w-full flex items-center lg:justify-center mb-2 mt-2">
        <h1 className="text-6xl font-semibold">What we offer!</h1>
      </div>
      <div className="w-full md:w-3/4 flex justify-center ">
        <div className="overflow-x-no-scroll no-scrollbar whitespace-nowrap flex flex-col w-full gap-3 md:flex-row lg:justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className="inline-block w-full md:w-74 h-100 bg-[#7e7d88] text-white text-center leading-[10rem] mx-1 rounded"
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

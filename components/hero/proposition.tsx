import * as motion from 'motion/react-client';

import React from 'react';

export default function Proposition() {
  const benefits: string[] = [
    'Practical business training.',
    'Weekly mentorship sessions.',
    'R10,000 seed funding for 5 winners.',
    'Access to networks, investors, and post-program support.',
  ];

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0.8 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.2,
        scale: { type: 'spring', visualDuration: 0.2, bounce: 0.2 },
      }}
      className=""
    >
      <div className="mb-4">
        <div className="h-[100px] w-[95%] mx-[2.5%] flex justify-center items-center">
          <h1 className="text-3xl">Why Join!</h1>
        </div>

        <div className="h-auto w-[95%] mx-[2.5%] flex flex-col gap-2 justify-start">
          {benefits.map((item, index) => (
            <span
              key={index}
              className="flex flex-row justify-left items-center gap-2"
            >
              <span className="h-[80px] w-[80px] rounded-2xl bg-[#c7c7c7]"></span>
              <span className="w-[200px]">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

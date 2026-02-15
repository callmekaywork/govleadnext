'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ShieldHalf } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function Packages() {
  const items = ['Slide 1', 'Slide 2', 'Slide 3'];

  const [numService, setNumService] = useState(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? Services.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex(prev => (prev === Services.length - 1 ? 0 : prev + 1));
  };

  const Services = [
    {
      name: 'Business Audit',
      url: '/packages_1.jpeg',
      description:
        'We conduct a comprehensive assessment of your business operations, financial structure, systems, and market positioning to identify strengths, gaps, and growth opportunities.',
      icon: <ShieldHalf />,
    },
    {
      name: 'Strategic Planning',
      url: '/packages_2.jpeg',
      description:
        'We develop clear, results-driven strategies aligned with your business vision and long-term objectives. This includes goal setting, operational structuring, competitive positioning, and measurable growth planning.',
      icon: <ShieldHalf />,
    },
    {
      name: 'Asset Building (Brand & Digital Assets)',
      url: '/packages_3.jpeg',
      description:
        'We assist businesses in developing strong, professional brand assets that enhance credibility and visibility in the marketplace. This includes logo design, website development, brand identity creation, and digital presence optimization. Our focus is to ensure your business is positioned professionally and competitively across all platforms.',
      icon: <ShieldHalf />,
    },
    {
      name: 'Training & Coaching',
      url: '/packages_4.jpeg',
      description:
        'We provide structured training programs and personalized coaching designed to equip entrepreneurs with essential leadership, operational, and growth management skills.',
      icon: <ShieldHalf />,
    },
    {
      name: 'Monitoring & Performance Support',
      url: '/packages_5.jpeg',
      description:
        'We offer ongoing monitoring and accountability support to ensure strategic plans are effectively implemented and measurable progress is achieved.',
      icon: <ShieldHalf />,
    },
  ];

  return (
    <div className="min-h-screen md:h-screen w-full bg-white flex justify-center items-center flex-col py-10 px-2">
      <div className="h-30 md:w-3/4 w-full flex items-center lg:justify-center mb-5 mt-2 ">
        <h1 className="text-6xl font-semibold">What we offer!</h1>
      </div>
      <div className="w-full md:w-3/4 flex justify-center ">
        <div className="w-10">
          <button
            onClick={handleNext}
            className="md:bg-black md:h-20 md:w-20 flex justify-center items-center"
          >
            <ChevronRight color={'black'} />
          </button>
        </div>

        <motion.div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          className="text-[10px]  flex items-center flex-col h-full md:gap-2 overflow-x-no-scroll no-scrollbar"
        >
          <p className="text-[13px] p-2 bg-blue-400 hidden md:flex h-30  justify-center items-center w-40 lg:w-60">
            {
              Services[
                currentIndex < 1 ? Services.length - 1 : currentIndex - 1
              ].name
            }
          </p>
          <p className="text-[13px] p-2 bg-amber-400 h-30 md:h-50 flex justify-center items-center w-100 md:w-40 lg:w-60">
            {Services[currentIndex].name}
          </p>
          <p className="text-[13px] p-2 bg-red-500 hidden md:flex h-30 justify-center items-center w-40 lg:w-60">
            {
              Services[
                currentIndex == Services.length - 1 ? 0 : currentIndex + 1
              ].name
            }
          </p>
        </motion.div>
        {/* {Services.map((itm, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center p-2 w-full md:w-74 h-100 bg-[#7e7d88] text-white text-center  mx-1 "
            >
              <Image src={`${itm.url}`} width={180} height={150} alt="" />

              <span className="bg-pink-500 flex w-full h-auto justify-center items-center">
                {itm.name}
              </span>
              <div>
                <p className="flex text-[12px] w-70 h-40 bg-amber-500">
                  {itm.description}
                </p>
              </div>
            </div>
          ))} */}
      </div>
    </div>
  );
}

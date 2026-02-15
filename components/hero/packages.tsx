'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShieldHalf } from 'lucide-react';
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

  const colors = [
    'bg-green-400',
    'bg-teal-500',
    'bg-rose-400',
    'bg-amber-300',
    'bg-red-500',
  ];

  return (
    <div className="min-h-170  w-full bg-white flex justify-center items-center flex-col py-5 px-2">
      <div className="h-30 md:w-3/4 w-full flex items-center lg:justify-center mb-5 mt-2 ">
        <h1 className="text-6xl font-semibold">What we offer!</h1>
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
        className="text-[10px] flex items-center flex-row h-full md:gap-2 overflow-x-no-scroll justify-center md:w-2/3 gap-5 no-scrollbar px-2 md:px-0 relative"
      >
        <div className="w-10">
          <button
            onClick={handleNext}
            className="bg-black h-10 w-10 rounded-full md:h-20 md:w-20 flex justify-center items-center absolute top-55 right-0 z-20"
          >
            <ChevronRight color={'white'} />
          </button>
        </div>

        <p className="text-[13px] p-2 bg-blue-400 hidden md:flex h-30  justify-center items-center w-40 lg:w-60">
          {
            Services[currentIndex < 1 ? Services.length - 1 : currentIndex - 1]
              .name
          }
        </p>
        <div
          className={`${colors[currentIndex]} relative text-[13px] p-2 bg-amber-400 h-110 md:h-100 flex flex-col justify-center items-center w-full md:w-60 lg:w-80`}
        >
          <div className="absolute top-0 z-10 left-0 h-full w-full flex justify-end flex-col py-10">
            <p className="bg-white text-[20px] h-15 flex justify-center items-center">
              {Services[currentIndex].name}
            </p>
            <p className="bg-gray-100 w-full py-5 text-[12px]">
              {Services[currentIndex].description}
            </p>
          </div>
          <Image
            src={Services[currentIndex].url}
            width={400}
            height={600}
            alt=""
            className="object-cover h-200 w-300 opacity-40"
          />
        </div>
        <p className="text-[13px] p-2 bg-red-500 hidden md:flex h-30 justify-center items-center w-40 lg:w-60">
          {
            Services[currentIndex == Services.length - 1 ? 0 : currentIndex + 1]
              .name
          }
        </p>

        <div className="w-10">
          <button
            onClick={handleNext}
            className="bg-black h-10 w-10 rounded-full md:h-20 md:w-20 flex justify-center items-center absolute top-55 left-0 z-20"
          >
            <ChevronLeft color={'white'} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

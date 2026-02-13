'use client';

import React from 'react';
import Image from 'next/image';

export default function Packages() {
  const items = ['Slide 1', 'Slide 2', 'Slide 3'];

  const Services = [
    {
      name: 'Business Audit',
      url: '/packages_1.jpeg',
      description:
        'We conduct a comprehensive assessment of your business operations, financial structure, systems, and market positioning to identify strengths, gaps, and growth opportunities.',
    },
    {
      name: 'Strategic Planning',
      url: '/packages_2.jpeg',
      description:
        'We develop clear, results-driven strategies aligned with your business vision and long-term objectives. This includes goal setting, operational structuring, competitive positioning, and measurable growth planning.',
    },
    {
      name: 'Asset Building (Brand & Digital Assets)',
      url: '/packages_3.jpeg',
      description:
        'We assist businesses in developing strong, professional brand assets that enhance credibility and visibility in the marketplace. This includes logo design, website development, brand identity creation, and digital presence optimization. Our focus is to ensure your business is positioned professionally and competitively across all platforms.',
    },
    {
      name: 'Training & Coaching',
      url: '/packages_4.jpeg',
      description:
        'We provide structured training programs and personalized coaching designed to equip entrepreneurs with essential leadership, operational, and growth management skills.',
    },
    {
      name: 'Monitoring & Performance Support',
      url: '/packages_5.jpeg',
      description:
        'We offer ongoing monitoring and accountability support to ensure strategic plans are effectively implemented and measurable progress is achieved.',
    },
  ];

  return (
    <div className=" md:min-h-3/4 w-full bg-white flex justify-center items-center flex-col py-5 px-2">
      <div className="h-30 md:w-3/4 w-full flex items-center lg:justify-center mb-2 mt-2">
        <h1 className="text-6xl font-semibold">What we offer!</h1>
      </div>
      <div className="w-full md:w-3/4 flex justify-center ">
        <div className="overflow-x-no-scroll no-scrollbar   flex flex-col w-full gap-3 md:flex-row lg:justify-center">
          {Services.map((itm, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center p-2 w-full md:w-74 h-100 bg-[#7e7d88] text-white text-center  mx-1 "
            >
              {/* <div
                className={`bg-[url(${itm.url})] bg-cover bg-center h-40 w-full`}
              ></div> */}

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
          ))}
        </div>
      </div>
    </div>
  );
}

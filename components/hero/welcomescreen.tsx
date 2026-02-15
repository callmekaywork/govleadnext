'use client';

import { Button } from '../ui/button';

import Image from 'next/image';
import Link from 'next/link';

import * as motion from 'motion/react-client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldHalf } from 'lucide-react';

export default function Welcomescreen() {
  const [numService, setNumService] = useState(1);

  const iconSize = 40;

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
      icon: <ShieldHalf size={iconSize} />,
    },
    {
      name: 'Strategic Planning',
      url: '/packages_2.jpeg',
      description:
        'We develop clear, results-driven strategies aligned with your business vision and long-term objectives. This includes goal setting, operational structuring, competitive positioning, and measurable growth planning.',
      icon: <ShieldHalf size={iconSize} />,
    },
    {
      name: 'Asset Building (Brand & Digital Assets)',
      url: '/packages_3.jpeg',
      description:
        'We assist businesses in developing strong, professional brand assets that enhance credibility and visibility in the marketplace. This includes logo design, website development, brand identity creation, and digital presence optimization. Our focus is to ensure your business is positioned professionally and competitively across all platforms.',
      icon: <ShieldHalf size={iconSize} />,
    },
    {
      name: 'Training & Coaching',
      url: '/packages_4.jpeg',
      description:
        'We provide structured training programs and personalized coaching designed to equip entrepreneurs with essential leadership, operational, and growth management skills.',
      icon: <ShieldHalf size={iconSize} />,
    },
    {
      name: 'Monitoring & Performance Support',
      url: '/packages_5.jpeg',
      description:
        'We offer ongoing monitoring and accountability support to ensure strategic plans are effectively implemented and measurable progress is achieved.',
      icon: <ShieldHalf size={iconSize} />,
    },
  ];

  return (
    <div className="h-auto md:h-screen md:mb-10 flex flex-col bg-[#0c0c0c]">
      <div className="h-15 md:h-30 w-full"></div>
      <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          ease: ['easeIn', 'easeOut'],
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="md:hidden  w-full b-4 "
      >
        <div className="flex flex-col-reverse h-auto w-[100%] relative">
          {/* Background image */}
          <div className="flex justify-center items-center  h-[500px] w-[100%] mt-4 overflow-hidden">
            <Image
              className="w-full h-full object-cover "
              src="/img_2.jpeg"
              alt="Hero Image optimized"
              width={2975}
              height={1960}
            />
          </div>

          {/* <div className="absolute top-[10px] right-3 flex justify-center items-center h-[50px] w-[50px] bg-orange-400 rounded-full">
            <HiAcademicCap size={40} fill="white" />
          </div> */}

          {/** Absolute Text on top of Image */}

          <div className="absolute h-auto w-[100%] bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent ">
            <div className="my-5 px-4 text-white flex flex-col">
              <span className="font-extrabold text-5xl">IncuVera</span>
              <span className="font-light">
                Nurturing Innovation Empowering Growth
              </span>
              <p className="w-full text-[12px] text-ellipsis">
                IncuVera is a forward-thinking business incubation company
                specializing in strategic business development, entrepreneurial
                support, and sustainable enterprise growth. We are committed to
                nurturing startups and growing businesses by providing
                structured guidance, practical tools, and access to valuable
                networks.
              </p>
            </div>

            {/* <Separator /> */}

            {/* <div className="flex flex-col h-auto px-4 w-full bg-gradient-to-t from-[rgba(0,0,0,0.55)] to-transparent ">
              <span className="h-[40px] w-full flex justify-center items-center my-2 font-bold text-3xl text-green-500">
                Join us Today!
              </span>
              <span className="w-full flex justify-center items-center mb-4 ">
                <Link href="/joinnow">
                  <Button className="h-[60px] w-[250px] bg-orange-400 text-black rounded-none ">
                    Join Now
                  </Button>
                </Link>
              </span>
            </div> */}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="hidden md:flex justify-center bg-[#f0f0f0] w-full pb-8 h-4/5"
      >
        <div className="flex flex-row-reverse items-center justify-center ">
          <div className="flex justify-center items-center bg-gray-200 h-[400px] w-[350px] lg:w-130 lg:h-140 mt-4 rounded-2xl overflow-hidden">
            {/* <div>Image placeholder</div> */}
            <Image
              className="w-full h-full object-cover "
              src="/img_2.jpeg"
              alt="Hero Image optimized"
              width={2975}
              height={1960}
            />
          </div>
          <div className="p-2 mr-2 lg:h-140">
            <h1 className="h-[100px] flex items-center text-5xl md:text-7xl md:mr-10 font-bold">
              Welcome
            </h1>

            <h1 className="my-1  text-black flex flex-col w-[300px]">
              <span className="font-extrabold text-5xl">IncuVera</span>
              <span className="font-light text-[13px] p-1 bg-[#38383b] text-white">
                Nurturing Innovation Empowering Growth
              </span>
            </h1>
            <p className="w-[300px] text-[15px]">
              IncuVera is a forward-thinking business incubation company
              specializing in strategic business development, entrepreneurial
              support, and sustainable enterprise growth. We are committed to
              nurturing startups and growing businesses by providing structured
              guidance, practical tools, and access to valuable networks.
            </p>
            <div>
              <Button className="h-[50px] w-[160px] mt-2 rounded-none bg-[#303030] text-white flex justify-center hover:cursor-pointer hover:bg-[#292833]">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          ease: ['easeIn', 'easeOut'],
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="relative h-30 md:h-1/5 w-full bg-gray-100 overflow-x-hidden "
      >
        <div className="absolute left-0 top-0 h-full w-20 md:w-52 bg-gradient-to-r from-white to-white/0 pointer-events-none " />
        <div className="absolute right-0 top-0 h-full w-20 md:w-52 bg-gradient-to-l from-white to-white/0 pointer-events-none " />
        <motion.div
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 15, // adjust speed here
            ease: 'linear',
          }}
          className="h-full flex  whitespace-nowrap flex-row justify-center items-center w-full gap-10 "
        >
          {Services.map((cont, idx) => (
            <div
              key={idx}
              className="md:text-2xl w-100 md:min-w-100 md:max-w-180 flex  flex-rowjustify-center items-center"
            >
              {cont.name}
            </div>
          ))}
          {Services.map((cont, idx) => (
            <div
              key={idx}
              className="md:text-2xl w-100 md:min-w-100 md:max-w-180 flex flex-row justify-center items-center"
            >
              {cont.name}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="h-80 md:min-h-100 md:bg-[#f0f0f0] flex justify-center items-center relative"
      >
        <div className="w-10">
          <button
            onClick={handlePrev}
            className="md:bg-black md:h-20 md:w-20 flex justify-center items-center"
          >
            <ChevronLeft color={'white'} />
          </button>
        </div>

        <div className="relative w-full md:w-3/4 min-h-40  flex md:flex-row justify-center items-center overflow-hidden">
         
          <div className="absolute left-0 top-0 h-full w-2 md:w-52 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 h-full w-2 md:w-52 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none md:hidden" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <motion.div
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="text-[10px]  flex items-center flex-row md:gap-2 "
              >
                <div className="text-[13px] p-2 bg-blue-400 hidden md:flex h-30  justify-center items-center  w-40 lg:w-60">
                  {
                    Services[
                      currentIndex < 1 ? Services.length - 1 : currentIndex - 1
                    ].name
                  }
                </div>
                <div
                  className={`${colors[currentIndex == Services.length - 1 ? 0 : currentIndex + 1]} text-[13px] p-2  h-70 md:h-50 flex flex-col-reverse justify-center items-center w-60 md:w-60 lg:w-80 relative`}
                >
                  <div
                    className={`${colors[currentIndex]} absolute z-5 bottom-3  flex justify-center items-center flex-col h-30 w-50 md:w-50 lg:w-50`}
                  >
                    <p>{Services[currentIndex].name}</p>
                    {Services[currentIndex].icon}
                  </div>
                  <div className="w-full h-full flex justify-center items-center">
                    <Image
                      src={Services[currentIndex].url}
                      width={300}
                      height={260}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-[13px] p-2 bg-red-500 hidden md:flex justify-center items-center  w-40 lg:w-60">
                  {
                    Services[
                      currentIndex == Services.length - 1 ? 0 : currentIndex + 1
                    ].name
                  }
                </p>
              </motion.div>
            </div>
          </div>
         
        </div>
        <div className="w-10">
          <button
            onClick={handleNext}
            className="md:bg-black md:h-20 md:w-20 flex justify-center items-center"
          >
            <ChevronRight color={'white'} />
          </button>
        </div>
      </motion.div> */}
    </div>
  );
}

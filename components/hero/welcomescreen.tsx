'use client';

import { Button } from '../ui/button';

import Image from 'next/image';
import Link from 'next/link';

import * as motion from 'motion/react-client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Welcomescreen() {
  const [numService, setNumService] = useState(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? Services.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex(prev => (prev === Services.length - 1 ? 0 : prev + 1));
  };

  const Services = [
    'Business Audit',
    'Strategic Planning',
    'Asset Building (Brand & Digital Assets)',
    'Training & Coaching',
    'Monitoring & Performance Support',
  ];

  return (
    <div className="md:h-auto md:mb-10 flex flex-col bg-[#0c0c0c]">
      <div className="h-15 md:h-30 w-full"></div>
      <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          ease: ['easeIn', 'easeOut'],
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="md:hidden w-full pb-4 "
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
            <div className="mt-3 px-4 text-white flex flex-col">
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

            <div className="flex flex-col h-auto px-4 w-full bg-gradient-to-t from-[rgba(0,0,0,0.55)] to-transparent ">
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
            </div>
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
        className="hidden md:flex justify-center bg-[#f0f0f0] w-full pb-8 h-auto"
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
          scale: { type: 'spring', visualDuration: 0.1, bounce: 0.2 },
        }}
        className="h-50 md:min-h-60  flex justify-center items-center relative"
      >
        <div className="w-10">
          <button onClick={handlePrev}>
            <ChevronLeft color={'white'} />
          </button>
        </div>

        <div className="relative w-full md:w-3/4 min-h-40  flex md:flex-row justify-center items-center overflow-hidden">
          {/* mobile */}
          {/* <div className="flex md:hidden justify-center items-center gap-3">
            <div>
              <ChevronLeft />
            </div>
            <div className="h-35 w-55 flex justify-center items-center bg-pink-400">
              {Services[numService]}
            </div>
            <div>
              <ChevronRight />
            </div>
          </div> */}
          {/* desktop */}
          <div className="absolute left-0 top-0 h-full w-2 md:w-52 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-2 md:w-52 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none" />
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
                className="text-[10px]  flex flex-row md:gap-2 "
              >
                <p className="text-[13px] p-2 bg-blue-400 hidden md:flex h-30  justify-center items-center w-40 lg:w-60">
                  {
                    Services[
                      currentIndex < 1 ? Services.length - 1 : currentIndex - 1
                    ]
                  }
                </p>
                <p className="text-[13px] p-2 bg-amber-400 h-30 flex justify-center items-center w-100 md:w-40 lg:w-60">
                  {Services[currentIndex]}
                </p>
                <p className="text-[13px] p-2 bg-red-500 hidden md:flex h-30 justify-center items-center w-40 lg:w-60">
                  {
                    Services[
                      currentIndex == Services.length - 1 ? 0 : currentIndex + 1
                    ]
                  }
                </p>
              </motion.div>
            </div>
          </div>
          {/* <div className="flex justify-center items-center gap-3">
            {Services.map((indx, idx) => (
              <div
                key={idx}
                className="h-35 w-55 flex justify-center items-center bg-pink-400"
              >
                {indx}
              </div>
            ))}
          </div> */}
        </div>
        <div className="w-10">
          <button onClick={handleNext}>
            <ChevronRight color={'white'} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
